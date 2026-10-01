"use client";

import { run as suggestEmail } from "@zootools/email-spell-checker";
import { useActionState, useEffect, useRef, useState } from "react";

import { BOOK_BUTTON_CLASS } from "./BookButton";
import { submitBookForm, type BookFormState, type Field } from "./book-action";

/* ---------------------------------------------------------------------------
   The form inside the booking modal. Warm Paper ground: Rule Gray hairline
   fields that go Signal Green on focus, black labels, and the one primary
   button as the submit, keeping the site's single CTA label. Name comes
   first, then Email; both are required. Business name says "(optional)" in
   its label. Return on Name or Email moves to the next field; Return on
   Business name submits.

   Validation stays out of the way until submit. The button is never disabled
   for a bad field: a submit checks the fields with the browser's own rules
   (required, type="email"), writes what's wrong under each one, and moves
   focus to the first. The server re-checks and also asks DNS whether the
   email's domain takes mail. Leaving the email field offers a typo fix
   ("Did you mean name@gmail.com?") that never blocks.
   --------------------------------------------------------------------------- */

// Phones get a compact field (44px tall, the minimum tap target); 16px text so iOS doesn't zoom.
const INPUT =
  "mt-1 block min-h-11 w-full rounded-md border border-ux-gray-2 bg-background px-3 py-2 text-base sm:mt-2 sm:px-[14px] sm:py-[10px] text-foreground transition-colors placeholder:text-muted focus:border-link focus:outline-none aria-[invalid=true]:border-warm-deep";

const OPTIONAL = <span className="font-normal text-muted"> (optional)</span>;

/** Where the click came from, e.g. a blog post's UTM tags. Rides along with the request. */
export type BookSource = { source: string; medium: string; campaign: string };

const INITIAL: BookFormState = { status: "idle" };

type Errors = Partial<Record<Field, string>>;

/** The browser's verdict on a field, in our words. */
function clientError(el: HTMLInputElement): string | undefined {
  const v = el.validity;
  if (el.name === "name" && v.valueMissing) return "We need a name to write back to.";
  if (el.name === "email" && v.valueMissing) return "We need an email to write back to.";
  if (v.typeMismatch) return "That email is missing a part. It should look like name@business.com.";
  if (v.tooLong) return "That's longer than we can take here.";
  return undefined;
}

export function BookForm({ source }: { source?: BookSource }) {
  const [state, action, pending] = useActionState(submitBookForm, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  // Set by a submit the browser rejected; cleared when one gets through to the server.
  const [clientErrors, setClientErrors] = useState<Errors | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const serverErrors: Errors = state.status === "error" ? state.fields ?? {} : {};

  // A server-side field error moves focus to that field, same as a client one.
  useEffect(() => {
    if (state.status !== "error" || !state.fields) return;
    focusFirst(formRef.current, state.fields);
  }, [state]);

  if (state.status === "sent") {
    return (
      <div role="status">
        <p className="text-2xl font-light tracking-tight">
          Got it{state.name ? `, ${state.name}` : ""}.
        </p>
        <p className="mt-3 text-muted">
          One of us will write back{state.email ? ` to ${state.email}` : ""} to find a time
          for the call.
        </p>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : undefined;
  const errors = clientErrors ?? serverErrors;

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      className="w-full"
      onSubmit={(e) => {
        const found: Errors = {};
        for (const el of Array.from(e.currentTarget.elements)) {
          if (!(el instanceof HTMLInputElement)) continue;
          const msg = clientError(el);
          if (msg) found[el.name as Field] = msg;
        }
        if (Object.keys(found).length) {
          e.preventDefault();
          setClientErrors(found);
          focusFirst(e.currentTarget, found);
        } else {
          setClientErrors(null);
        }
      }}
    >
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-5">
        <Input
          name="name"
          label="Name"
          required
          autoComplete="name"
          enterKeyHint="next"
          values={values}
          errors={errors}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          enterKeyHint="next"
          values={values}
          errors={errors}
          onBlur={(e) => setSuggestion(suggestEmail({ email: e.target.value.trim() })?.full ?? null)}
        >
          {suggestion && (
            <button
              type="button"
              className="block min-h-11 text-left text-sm font-normal text-link underline underline-offset-2"
              onClick={() => {
                const input = formRef.current?.elements.namedItem("email");
                if (input instanceof HTMLInputElement) input.value = suggestion;
                setSuggestion(null);
              }}
            >
              Did you mean {suggestion}?
            </button>
          )}
        </Input>
      </div>
      <div className="mt-2.5 sm:mt-5">
        <Input
          name="business"
          label={<>Business name{OPTIONAL}</>}
          autoComplete="organization"
          enterKeyHint="go"
          values={values}
          errors={errors}
        />
      </div>

      {/* Honeypot. Off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {source && (
        <>
          <input type="hidden" name="utm_source" value={source.source} />
          <input type="hidden" name="utm_medium" value={source.medium} />
          <input type="hidden" name="utm_campaign" value={source.campaign} />
        </>
      )}

      {state.status === "error" && !clientErrors && !state.fields && (
        <p role="alert" className="mt-4 text-sm text-warm-deep">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`${BOOK_BUTTON_CLASS} mt-4 sm:mt-6 disabled:bg-ux-gray-3`}
      >
        {pending ? "Sending…" : "Book your audit"}
      </button>
    </form>
  );
}

const MAX_LENGTH: Record<Field, number> = { name: 120, email: 200, business: 160 };

const ORDER: Field[] = ["name", "email", "business"];

function focusFirst(form: HTMLFormElement | null, errors: Errors) {
  const first = ORDER.find((f) => errors[f]);
  const el = first && form?.elements.namedItem(first);
  if (el instanceof HTMLElement) el.focus();
}

function Input({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  enterKeyHint,
  values,
  errors,
  onBlur,
  children,
}: {
  name: Field;
  label: React.ReactNode;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  /** "next" makes Return move to the following field instead of submitting. */
  enterKeyHint?: "next" | "go";
  values?: Record<Field, string>;
  errors: Errors;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Extra help under the field, e.g. the email typo fix. */
  children?: React.ReactNode;
}) {
  const error = errors[name];
  const errorId = `book-${name}-error`;
  return (
    <div>
      <label className="block text-sm font-semibold">
        {label}
        <input
          type={type}
          name={name}
          required={required}
          maxLength={MAX_LENGTH[name]}
          autoComplete={autoComplete}
          enterKeyHint={enterKeyHint}
          onKeyDown={
            enterKeyHint === "next"
              ? (e) => {
                  if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
                  const next = e.currentTarget.form?.elements.namedItem(ORDER[ORDER.indexOf(name) + 1]);
                  if (next instanceof HTMLElement) {
                    e.preventDefault();
                    next.focus();
                  }
                }
              : undefined
          }
          defaultValue={values?.[name]}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={INPUT}
        />
      </label>
      {error && (
        <span id={errorId} className="mt-1 block text-sm font-normal text-warm-deep">
          {error}
        </span>
      )}
      {children}
    </div>
  );
}
