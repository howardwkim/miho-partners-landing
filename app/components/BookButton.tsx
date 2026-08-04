import Link from "next/link";

export function BookButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/#book"
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-accent px-[14px] py-[12px] text-[15px] font-semibold text-foreground transition-colors hover:bg-accent-hover ${className}`}
    >
      Book your audit
    </Link>
  );
}
