"use client";

import Link from "next/link";

import { useBookModal } from "./BookModal";

/** The primary button's look, shared with the form's submit and the Cal.com test button. */
export const BOOK_BUTTON_CLASS =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-accent px-[14px] py-[12px] text-[15px] font-semibold text-foreground transition-colors hover:bg-accent-hover";

type BookButtonProps = {
  className?: string;
  /** Tags the request with UTM params so it can be traced back to its source (e.g. a blog post). */
  utm?: { source: string; medium: string; campaign: string };
  /** Runs before the modal opens, e.g. to close the mobile menu. */
  onClick?: () => void;
};

export function BookButton({ className = "", utm, onClick }: BookButtonProps) {
  const openModal = useBookModal();

  // Opens the booking modal. The href is the fallback for no JS, a modified
  // click, or a page outside the modal provider: it lands on the CTA band.
  const href = utm
    ? `/?${new URLSearchParams({
        utm_source: utm.source,
        utm_medium: utm.medium,
        utm_campaign: utm.campaign,
      })}#book`
    : "/#book";

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (!openModal || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onClick?.();
        openModal(utm);
      }}
      aria-haspopup="dialog"
      className={`${BOOK_BUTTON_CLASS} ${className}`}
    >
      Book your audit
    </Link>
  );
}
