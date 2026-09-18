import Link from "next/link";

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
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-accent px-[14px] py-[12px] text-[15px] font-semibold text-foreground transition-colors hover:bg-accent-hover ${className}`}
    >
      Book your audit
    </Link>
  );
}
