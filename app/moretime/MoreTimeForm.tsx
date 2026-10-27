"use client";

import { useSyncExternalStore } from "react";

import { BookForm } from "../components/BookForm";

const noSubscribe = () => () => {};

/**
 * The site's booking form, set up for the /moretime page: a phone field, a
 * button that asks for the free call, and the lead id from the report link
 * (?ref=ww-027) riding along so the email says which business wrote in.
 * The page is static, so the ref is read in the browser ("none" on the server).
 */
export function MoreTimeForm() {
  const ref = useSyncExternalStore(
    noSubscribe,
    () => new URLSearchParams(window.location.search).get("ref")?.slice(0, 40) || "none",
    () => "none",
  );

  return (
    <BookForm
      source={{ source: "moretime", medium: "report", campaign: ref }}
      submitLabel="Send me a time"
      withPhone
    />
  );
}
