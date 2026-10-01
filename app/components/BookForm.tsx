"use client";

import { useActionState } from "react";

import { BOOK_BUTTON_CLASS } from "./BookButton";
import { submitBookForm, type BookFormState, type Field } from "./book-action";

/* ---------------------------------------------------------------------------
   The form every "Book your audit" button lands on. Built for the Forest Ink
   ground of the #book band: Warm Paper fields, white labels, and the one
   primary button as the submit. The button keeps the site's single CTA label.
   --------------------------------------------------------------------------- */

const INPUT =
  "mt-2 block w-full rounded-md bg-background px-[14px] py-[12px] text-[15px] text-foreground placeholder:text-muted";

const INITIAL: BookFormState = { status: "idle" };

export function BookForm() {
  const [state, action, pending] = useActionState(submitBookForm, INITIAL);

  if (state.status === "sent") {
    return (
      <div role="status" className="max-w-md">
        <p className="text-2xl font-light tracking-tight">
          Got it{state.name ? `, ${state.name}` : ""}.
        </p>
        <p className="mt-3 text-ink-foreground/80">
          One of us will write back{state.email ? ` to ${state.email}` : ""} to find a time
          for the call.
        </p>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : undefined;
  const errors = state.status === "error" ? state.fields ?? {} : {};

  return (
    <form action={action} noValidate className="w-full max-w-md">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="name" label="Name" autoComplete="name" values={values} errors={errors} />
        <Input
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          values={values}
          errors={errors}
        />
      </div>
      <div className="mt-5">
        <Input
          name="business"
          label="Business"
          autoComplete="organization"
          values={values}
          errors={errors}
        />
      </div>
      <label className="mt-5 block text-sm font-medium text-ink-foreground">
        What eats your time?
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

      {state.status === "error" && (
        <p role="alert" className="mt-5 text-sm text-ink-foreground">
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
  autoComplete,
  values,
  errors,
}: {
  name: Field;
  label: string;
  type?: string;
  autoComplete?: string;
  values?: Record<Field, string>;
  errors: Partial<Record<Field, string>>;
}) {
  const error = errors[name];
  return (
    <label className="block text-sm font-medium text-ink-foreground">
      {label}
      <input
        type={type}
        name={name}
        required
        autoComplete={autoComplete}
        defaultValue={values?.[name]}
        aria-invalid={error ? true : undefined}
        className={INPUT}
      />
      {error && <span className="mt-1.5 block text-sm text-ink-foreground">{error}</span>}
    </label>
  );
}
