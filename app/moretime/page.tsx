import type { Metadata } from "next";

import { BOOK_BUTTON_CLASS } from "../components/BookButton";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";

/* ---------------------------------------------------------------------------
   Where the one page competitor sheet points. Owners land here from the printed
   sheet, the postcard, and the follow-up email (each with ?ref=<lead id>, which
   GA4 records with the page view). Written at a 6th grade level on purpose, and
   no price anywhere: the only ask is the free 20 minute call, the same ask the
   postcard and the letter make. Not in the sitemap or the nav.
   --------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Your one page report — MiHo Partners",
  description:
    "What the MiHo Partners one page report checks, what the numbers mean, and how to get 20 free minutes with Mike.",
  robots: { index: false, follow: false },
};

const PHONE_DISPLAY = "206-354-8751";
const SMS_HREF = "sms:+12063548751?&body=MORE%20TIME";
const TEL_HREF = "tel:+12063548751";

const CHECKS = [
  {
    t: "Your spot on Google Maps",
    d: "Most people call one of the first few names they see.",
  },
  {
    t: "Your Google reviews",
    d: "How many you have, your average stars, and how many bad ones (2 stars or less). More good reviews means more calls.",
  },
  {
    t: "Whether ChatGPT names you",
    d: "More customers now ask ChatGPT “who should I call?” We ask it real customer questions and count who it names.",
  },
  {
    t: "Whether a customer can book online",
    d: "If they can’t, someone on your team has to call them back. That’s phone tag, and it eats your day.",
  },
  {
    t: "How fast your website loads on a phone",
    d: "Google scores it out of 100. Under 50 is slow, and slow sites lose customers who give up and call someone else.",
  },
];

const FIXES = [
  "Quotes written faster from your notes, with you checking every number",
  "Polite reminders that go out on their own when a quote or an invoice sits too long",
  "A booking page so jobs land on your calendar without a phone call",
  "One friendly text after each job asking for a Google review, the way Google allows",
  "Your business listed and up to date on the sites ChatGPT reads",
];

const BUILT = [
  {
    t: "A vet clinic with two locations",
    d: "Their system lumped the money from both locations together, so nobody could see how each one was really doing. Staff spent 2 to 3 hours a day sorting it out by hand. We built a daily check that splits the money by location. Now it takes less than 30 minutes a day.",
  },
  {
    t: "A wine trip business",
    d: "When someone asks about a trip, they get an email right away to pick a time and pay. Once they pay, the call is on the calendar and the reminders go out on their own. Nobody has to chase anyone.",
  },
  {
    t: "A lumber yard that sells to builders",
    d: "Every new building permit in town is a job someone is about to start. Our tool pulls new permits each day with the contact’s name and number, and sends each builder a short hello from the lumber yard. It works for any trade: roofing, plumbing, electrical or landscaping.",
  },
];

function TextMike({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-5 ${className}`}>
      <a href={SMS_HREF} className={BOOK_BUTTON_CLASS}>
        Text &ldquo;MORE TIME&rdquo;
      </a>
      <span className="text-sm leading-snug text-muted">
        or call Mike at{" "}
        <a href={TEL_HREF} className="font-semibold text-link transition-colors hover:text-deep">
          {PHONE_DISPLAY}
        </a>
      </span>
    </div>
  );
}

export default function MoreTimePage() {
  return (
    <div className="flex flex-col">
      <SiteNav />

      <main>
        {/* Hero */}
        <header className="mx-auto w-full max-w-4xl px-6 pb-14 pt-10 sm:px-10 sm:pt-14">
          <h1 className="text-[2.75rem] font-light leading-[1.08] tracking-tight sm:text-6xl">
            Your one page report,
            <br />
            <span className="font-accent italic text-[3.1rem] sm:text-[3.6rem]">
              in plain words.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            If Mike dropped off a one page report, this page explains what it means and what you
            can do next. If you didn&rsquo;t get one yet, text us and we&rsquo;ll make you one for
            free.
          </p>
          <TextMike className="mt-9" />
        </header>

        {/* What it checks */}
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-6 sm:px-10">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">What the report checks</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              It puts your business next to 3 local competitors and looks at what a customer sees
              before they ever call you.
            </p>
            <dl className="mt-10 border-b border-deep/15">
              {CHECKS.map((c) => (
                <div
                  key={c.t}
                  className="grid grid-cols-1 gap-x-10 gap-y-2 border-t border-deep/15 py-6 sm:grid-cols-[17rem_minmax(0,1fr)]"
                >
                  <dt className="text-xl font-light tracking-tight">{c.t}</dt>
                  <dd className="max-w-xl leading-relaxed text-muted">{c.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Fixes */}
        <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-20">
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl">The simple fixes</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Most of what keeps owners working at night is the same few jobs: writing quotes,
            sending invoices, chasing payment and calling people back. Here&rsquo;s what we set up:
          </p>
          <ul className="mt-8 max-w-2xl list-disc space-y-3 pl-5 leading-relaxed marker:text-deep">
            {FIXES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl leading-relaxed text-muted">
            We set it up inside the tools you already use. No new software to learn. You own it.
            And we check it for 30 days to make sure it keeps working.
          </p>
        </section>

        {/* Already built */}
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-6 sm:px-10">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Simple tools we&rsquo;ve already built
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Real tools, built for real businesses in the last few months.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-3">
              {BUILT.map((b) => (
                <div key={b.t} className="sm:border-t sm:border-deep/25 sm:pt-7">
                  <h3 className="text-xl font-light tracking-tight">{b.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The call */}
        <section className="bg-ink py-16 text-ink-foreground sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-6 sm:px-10">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Start with a free <span className="font-accent italic">20 minute</span> call
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/85">
              We&rsquo;ll look at one thing you&rsquo;re tired of handling and why it keeps landing
              back on your desk. Then Mike follows up with a specific change to try and how it could
              save you time. If there&rsquo;s nothing worth fixing, we&rsquo;ll tell you that too.
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink-foreground/85">
              <span className="font-semibold text-ink-foreground">Mike&rsquo;s promise: </span>
              if those 20 minutes are a waste of your time, tell him, and he&rsquo;ll send you a
              Starbucks gift card. No hard feelings.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href={SMS_HREF} className={BOOK_BUTTON_CLASS}>
                Text &ldquo;MORE TIME&rdquo;
              </a>
              <span className="text-sm text-ink-foreground/80">
                or call{" "}
                <a href={TEL_HREF} className="font-semibold text-ink-foreground underline">
                  {PHONE_DISPLAY}
                </a>
              </span>
            </div>
          </div>
        </section>

        {/* Who */}
        <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">Who we are</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            MiHo Partners is Mike Grabham and Howard Kim. Mike lives in Walla Walla, has started six
            companies and sold two, and has an MBA from Seattle University. Howard builds the tools:
            he has a master&rsquo;s in computer science from Georgia Tech.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
