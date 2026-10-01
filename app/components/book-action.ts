"use server";

/* ---------------------------------------------------------------------------
   The "Book your audit" form posts here. One submission fans out to two places:
   an email to the shared inbox (Resend, reply-to set to the submitter so hitting
   reply answers them) and a Slack post. Slack is optional: with no
   SLACK_WEBHOOK_URL it's skipped silently. Email is the delivery that counts;
   the submission only fails if nothing at all was delivered.

   Env (Vercel, never git):
     RESEND_API_KEY     required for email
     CONTACT_TO         defaults to hello@mihopartners.com
     CONTACT_FROM       defaults to "MiHo Partners <form@mihopartners.com>";
                        the domain has to be verified in Resend
     SLACK_WEBHOOK_URL  optional
   --------------------------------------------------------------------------- */

export type BookFormState =
  | { status: "idle" }
  | { status: "sent"; name: string; email: string }
  | {
      status: "error";
      message: string;
      fields?: Partial<Record<Field, string>>;
      // React resets a form after its action runs, so a failed submit hands the
      // typed values back rather than making someone retype them.
      values: Record<Field, string>;
    };

export type Field = "name" | "email" | "business" | "message";

const LIMITS: Record<Field, number> = { name: 120, email: 200, business: 160, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO = process.env.CONTACT_TO || "hello@mihopartners.com";
const FROM = process.env.CONTACT_FROM || "MiHo Partners <form@mihopartners.com>";

export async function submitBookForm(
  _prev: BookFormState,
  formData: FormData,
): Promise<BookFormState> {
  // Honeypot. Hidden from people, filled in by bots. Pretend it worked so the
  // bot has nothing to learn from.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "sent", name: "", email: "" };
  }

  const values = {} as Record<Field, string>;
  const fields: Partial<Record<Field, string>> = {};
  for (const key of Object.keys(LIMITS) as Field[]) {
    const v = String(formData.get(key) ?? "").trim();
    values[key] = v;
    if (v.length > LIMITS[key]) fields[key] = "That's longer than we can take here.";
  }
  if (!values.name) fields.name = "We need a name to write back to.";
  if (!EMAIL_RE.test(values.email)) fields.email = "That email doesn't look right.";
  if (!values.business) fields.business = "Which business is this for?";
  if (Object.keys(fields).length) {
    return { status: "error", message: "A couple of things to fix first.", fields, values };
  }

  const results = await Promise.allSettled([sendEmail(values), postToSlack(values)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  for (const r of results) {
    if (r.status === "rejected") console.error("book form delivery failed:", r.reason);
  }

  if (!delivered) {
    return {
      status: "error",
      message: `That didn't go through on our end. Email us at ${TO} and we'll pick it up from there.`,
      values,
    };
  }
  return { status: "sent", name: values.name, email: values.email };
}

function summary(v: Record<Field, string>) {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Business: ${v.business}`,
    "",
    "What eats their time:",
    v.message || "(left blank)",
  ].join("\n");
}

/** Resolves true when sent, false when not configured; throws on a failed send. */
async function sendEmail(v: Record<Field, string>): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY is not set; skipping email.");
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: v.email,
      subject: `Audit request: ${v.name}, ${v.business}`,
      text: summary(v),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return true;
}

/** Resolves true when posted, false when not configured; throws on a failed post. */
async function postToSlack(v: Record<Field, string>): Promise<boolean> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return false;
  // Slack treats &, < and > as control characters in message text.
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: `*New audit request*\n${esc(summary(v))}` }),
  });
  if (!res.ok) throw new Error(`Slack ${res.status}: ${await res.text()}`);
  return true;
}
