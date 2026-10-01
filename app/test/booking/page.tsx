import type { Metadata } from "next";
import Link from "next/link";

import { CalBookButton, CAL_LINK } from "../../components/CalBookButton";

/* A preview of the scheduler, not a page anyone should find: unlinked, noindex,
   and left out of the sitemap. */
export const metadata: Metadata = {
  title: "Booking test — MiHo Partners",
  robots: { index: false, follow: false },
};

export default function BookingTest() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-24 sm:px-10">
      <header className="py-10">
        <Link href="/" className="text-sm text-muted transition-colors hover:text-link">
          &larr; Back to the site
        </Link>
        <h1 className="mt-8 text-[2.75rem] font-light leading-[1.08] tracking-tight sm:text-6xl">
          Booking <span className="font-accent italic">test page</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          What &ldquo;Book your audit&rdquo; would do with a Cal.com scheduler behind it. The
          calendar is Cal.com&rsquo;s public demo (<code className="text-sm">{CAL_LINK}</code>),
          not ours, so don&rsquo;t book anything real on it.
        </p>
      </header>

      <section className="rounded-3xl bg-ink p-8 text-ink-foreground">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
          Start with the <span className="font-accent italic">Time Saver Audit</span>.
        </h2>
        <p className="mt-3 max-w-md text-ink-foreground/80">
          $399, one 45-minute call, five hours a week guaranteed or your money back.
        </p>
        <CalBookButton className="mt-8" />
      </section>
    </div>
  );
}
