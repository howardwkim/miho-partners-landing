"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

import { BOOK_BUTTON_CLASS } from "./BookButton";

/* ---------------------------------------------------------------------------
   The primary button, opening a Cal.com booking popup instead of the booking
   modal. Only used on /test/booking for now, to see what a scheduler would
   look like before MiHo has a Cal.com account.

   CAL_LINK is Cal.com's own public demo page. Swap it for MiHo's
   "<username>/<event>" once the account exists; nothing else changes.
   --------------------------------------------------------------------------- */

export const CAL_LINK = "rick/get-rick-rolled";

const NAMESPACE = "audit";

export function CalBookButton({ className = "" }: { className?: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#005924" }, dark: { "cal-brand": "#6cd689" } },
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace={NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={`${BOOK_BUTTON_CLASS} ${className}`}
    >
      Book your audit
    </button>
  );
}
