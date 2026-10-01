"use client";

import { useActionState } from "react";

import { BOOK_BUTTON_CLASS } from "./BookButton";
import { submitBookForm, type BookFormState, type Field } from "./book-action";

/* ---------------------------------------------------------------------------
   The form inside the booking modal. Warm Paper ground: Rule Gray hairline
   fields that go Signal Green on focus, black labels, and the one primary
   button as the submit, keeping the site's single CTA label. Name and email
   are required; the other two say "(optional)" in their label.
   --------------------------------------------------------------------------- */

const INPUT =
  "mt-2 block w-full rounded-md border border-ux-gray-2 bg-background px-[14px] py-[12px] text-[15px] text-foreground transition-colors placeholder:text-muted focus:border-link focus:outline-none aria-[invalid=true]:border-warm-deep";

const OPTIONAL = <span className="font-normal text-muted"> (optional)</span>;

/** Where the click came from, e.g. a blog post's UTM tags. Rides along with the request. */
export type BookSource = { source: string; medium: string; campaign: string };

const INITIAL: BookFormState = { status: "idle" };

export function BookForm({ source }: { source?: BookSource }) {
  const [state, action, pending] = useActionState(submitBookForm, INITIAL);

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
  const errors = state.status === "error" ? state.fields ?? {} : {};

  return (
    <form action={action} noValidate className="w-full">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="name" label="Name" required autoComplete="name" values={values} errors={errors} />
        <Input
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          values={values}
          errors={errors}
        />
      </div>
      <div className="mt-5">
        <Input
          name="business"
          label={<>Business name{OPTIONAL}</>}
          autoComplete="organization"
          values={values}
          errors={errors}
        />
      </div>
      <label className="mt-5 block text-sm font-semibold">
        What eats your time?{OPTIONAL}
        <textarea
          name="message"
          rows={4}
          defaultValue={values?.message}
          placeholder="The task you'd happily never do again."
          className={`${INPUT} resize-y`}
        />
      </label>

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

      {state.status === "error" && (
        <p role="alert" className="mt-5 text-sm text-warm-deep">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`${BOOK_BUTTON_CLASS} mt-6 disabled:bg-ux-gray-3`}
      >
        {pending ? "Sending…" : "Book your audit"}
      </button>
    </form>
  );
}

function Input({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  values,
  errors,
}: {
  name: Field;
  label: React.ReactNode;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  values?: Record<Field, string>;
  errors: Partial<Record<Field, string>>;
}) {
  const error = errors[name];
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        defaultValue={values?.[name]}
        aria-invalid={error ? true : undefined}
        className={INPUT}
      />
      {error && <span className="mt-1.5 block text-sm font-normal text-warm-deep">{error}</span>}
    </label>
  );
}
