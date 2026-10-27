/**
 * The primary button's look. Lives in its own plain module so server pages can
 * use it: imported from a "use client" file, a server component gets a client
 * reference instead of the string.
 */
export const BOOK_BUTTON_CLASS =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-accent px-[14px] py-[12px] text-[15px] font-semibold text-foreground transition-colors hover:bg-accent-hover";
