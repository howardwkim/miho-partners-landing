import Link from "next/link";

/** The primary button's look, shared with the form's submit and the Cal.com test button. */
export const BOOK_BUTTON_CLASS =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-accent px-[14px] py-[12px] text-[15px] font-semibold text-foreground transition-colors hover:bg-accent-hover";

type BookButtonProps = {
  className?: string;
  /** Tags the CTA with UTM params so the click can be traced back to its source (e.g. a blog post). */
  utm?: { source: string; medium: string; campaign: string };
};

export function BookButton({ className = "", utm }: BookButtonProps) {
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
      className={`${BOOK_BUTTON_CLASS} ${className}`}
    >
      Book your audit
    </Link>
  );
}
