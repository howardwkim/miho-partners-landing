import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import Image from "next/image";

import { BOOK_BUTTON_CLASS } from "../components/BookButton";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";

/* ---------------------------------------------------------------------------
   Where the one page competitor sheet points. Owners land here from the printed
   sheet, the 6x9 postcard, and the follow-up email (each with ?ref=<lead id>,
   which GA4 records with the page view). Written at a 6th grade level on purpose.
   Not in the sitemap or the nav.

   It borrows the postcard's look so the two read as one piece: the postcard
   blue and green, the clock, the "6 minutes x 6 times a day = 3 hours" band and
   the blue "Let's get something off your plate" bar with the circled number.
   One font per headline, always (Mike's rule): no serif/sans mixes in a title.
   --------------------------------------------------------------------------- */

const condensed = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  title: "Your one page report — MiHo Partners",
  description:
    "What the MiHo Partners one page report checks, what the numbers mean, and how to get 20 free minutes with Mike.",
  robots: { index: false, follow: false },
};

/* Sampled from the printed postcard so the page and the card match. */
const CARD_BLUE = "#3b6cb7";
const CARD_GREEN = "#2f8f3f";

const PHONE_DISPLAY = "(206) 354-8751";
const SMS_HREF = "sms:+12063548751?&body=MORE%20TIME";
const TEL_HREF = "tel:+12063548751";
const EMAIL = "mike@mihopartners.com";
const MAIL_HREF = `mailto:${EMAIL}?subject=More%20time`;

const DAY_STARTS = [
  { b: "A question", r: "you’ve answered before." },
  { b: "A reminder", r: "that won’t happen unless you send it." },
  { b: "Something you handed off", r: "… that landed right back on your desk." },
  { b: "You handle it because", r: "it’s faster to do it yourself. But you have to do it again tomorrow." },
];

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

/** Section titles: the postcard's italic serif, in the postcard blue, and nothing else. */
const H2 = "font-accent text-3xl italic sm:text-4xl";

/** The postcard's clock: blue face, a blue arrow over the top and a green one underneath. */
function Clock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path d="M22 38 A46 46 0 0 1 96 30" fill="none" stroke={CARD_BLUE} strokeWidth="6" strokeLinecap="round" />
      <path d="M90 20 L100 32 L86 36" fill="none" stroke={CARD_BLUE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98 82 A46 46 0 0 1 24 90" fill="none" stroke={CARD_GREEN} strokeWidth="6" strokeLinecap="round" />
      <path d="M30 100 L20 88 L34 84" fill="none" stroke={CARD_GREEN} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="60" r="32" fill="#f3f6ef" stroke={CARD_BLUE} strokeWidth="6" />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1="60" y1="33" x2="60" y2="38" stroke={CARD_BLUE} strokeWidth="4" strokeLinecap="round" transform={`rotate(${a} 60 60)`} />
      ))}
      <line x1="60" y1="60" x2="60" y2="42" stroke={CARD_BLUE} strokeWidth="5" strokeLinecap="round" />
      <line x1="60" y1="60" x2="72" y2="70" stroke={CARD_BLUE} strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="4" fill={CARD_BLUE} />
    </svg>
  );
}

function ContactLinks({ light = false }: { light?: boolean }) {
  const link = light
    ? "font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
    : "font-semibold text-link transition-colors hover:text-deep";
  return (
    <span className={`text-sm leading-relaxed ${light ? "text-white/85" : "text-muted"}`}>
      or call{" "}
      <a href={TEL_HREF} className={link}>
        {PHONE_DISPLAY}
      </a>
      , or email{" "}
      <a href={MAIL_HREF} className={link}>
        {EMAIL}
      </a>
    </span>
  );
}

export default function MoreTimePage() {
  return (
    <div className="flex flex-col">
      <SiteNav />

      <main>
        {/* Hero: the family photo carries the words. The left side of the photo is
            soft lawn and sky, and a dark wash over it keeps the white text readable. */}
        <header className="relative isolate overflow-hidden">
          <Image
            src="/moretime/hero-family.jpg"
            alt="A contractor having dinner with his family at a picnic table in the backyard at sunset"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[70%_50%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/60 to-black/40 sm:via-black/35 sm:to-black/0" />
          <div className="mx-auto flex min-h-[34rem] w-full max-w-6xl flex-col justify-center px-6 py-16 sm:min-h-[38rem] sm:px-10">
            <h1 className="max-w-xl text-[2.75rem] font-light leading-[1.08] tracking-tight text-white sm:text-6xl">
              Get your evenings back.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
              You read to the bottom of your report. Something must have caught your eye.
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">
              We didn&rsquo;t pick you at random. We think simple automations could give you real
              time back.
            </p>
            <div className="mt-8 flex max-w-lg flex-col items-start gap-3">
              <a href={SMS_HREF} className={BOOK_BUTTON_CLASS}>
                Text &ldquo;MORE TIME&rdquo;
              </a>
              <ContactLinks light />
            </div>
          </div>
        </header>

        {/* Speaks to them as an owner first, then the postcard's opening list. */}
        <section className="mx-auto w-full max-w-4xl px-6 pt-16 sm:px-10 sm:pt-20">
          <h2 className={H2} style={{ color: CARD_BLUE }}>
            Business owners, how much of your day starts like this?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            You started your business to do the work you&rsquo;re good at. But every owner we talk
            to says the same thing: the small stuff around the work keeps landing on them.
          </p>
          <ul className="mt-6 space-y-2 text-lg leading-relaxed">
            {DAY_STARTS.map((l) => (
              <li key={l.b}>
                <span className="font-bold" style={{ color: "#1f5c2e" }}>
                  {l.b}
                </span>{" "}
                <span className="text-muted">{l.r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* The postcard's band: clock, the sum, the year. */}
        <section className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10">
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-surface px-6 py-8 text-center sm:flex-row sm:gap-8 sm:px-10 sm:text-left">
            <Clock className="h-28 w-28 shrink-0 sm:h-36 sm:w-36" />
            <div className={condensed.className}>
              <div className="text-2xl font-semibold uppercase tracking-wide sm:text-3xl" style={{ color: CARD_BLUE }}>
                6 minutes x 6 times a day =
              </div>
              <div className="text-6xl font-extrabold uppercase leading-none sm:text-8xl" style={{ color: CARD_BLUE }}>
                3 hours back every week
              </div>
              <div className="mt-3 text-2xl font-bold sm:text-3xl" style={{ color: CARD_GREEN }}>
                That&rsquo;s 156 hours a year. Nearly a full work month.
              </div>
            </div>
          </div>
        </section>

        {/* What it checks */}
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-6 sm:px-10">
            <h2 className={H2} style={{ color: CARD_BLUE }}>
              What your report checks
            </h2>
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

        {/* Fixes, with the postcard clock as a faint watermark behind the list */}
        <section className="relative isolate mx-auto w-full max-w-4xl overflow-hidden px-6 py-16 sm:overflow-visible sm:px-10 sm:py-20">
          <Clock className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 opacity-[0.08] sm:-right-24 sm:h-[28rem] sm:w-[28rem]" />
          <h2 className={H2} style={{ color: CARD_BLUE }}>
            The simple fixes
          </h2>
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
            <h2 className={H2} style={{ color: CARD_BLUE }}>
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
        <section className="mx-auto w-full max-w-4xl px-6 pt-16 sm:px-10 sm:pt-20">
          <h2 className={H2} style={{ color: CARD_BLUE }}>
            Let&rsquo;s find the first thing you can get off your plate.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            In 20 minutes, we&rsquo;ll look at one thing you&rsquo;re tired of handling and why it
            keeps coming back to you. Mike follows up with a specific change to try, how to get
            started and how it could save you time. If there&rsquo;s nothing worth fixing,
            we&rsquo;ll tell you that too.
          </p>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            <span className="font-semibold text-foreground">Mike&rsquo;s promise: </span>
            if those 20 minutes are a waste of your time, tell him, and he&rsquo;ll send you a
            Starbucks gift card. No hard feelings.
          </p>
        </section>

        {/* The postcard's blue bar, with the circled number */}
        <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
          <div
            className={`${condensed.className} flex flex-col items-center gap-6 rounded-2xl px-6 py-7 text-center text-white lg:flex-row lg:justify-between lg:px-10 lg:text-left`}
            style={{ backgroundColor: CARD_BLUE }}
          >
            <div className="text-4xl font-semibold uppercase leading-[0.95] lg:text-5xl">
              Let&rsquo;s get something
              <br />
              off your plate.
            </div>
            <div className="text-lg font-semibold uppercase leading-snug tracking-wide lg:whitespace-nowrap lg:border-l lg:border-white/60 lg:pl-6">
              No cost. No obligation to hire us.
              <br />
              <a href={SMS_HREF} className="underline decoration-white/50 underline-offset-4">
                Text &ldquo;More time&rdquo;
              </a>{" "}
              or{" "}
              <a href={MAIL_HREF} className="normal-case underline decoration-white/50 underline-offset-4">
                {EMAIL}
              </a>
            </div>
            <a href={TEL_HREF} className="relative shrink-0 px-9 py-4 text-4xl font-bold sm:text-5xl">
              {/* Hand-drawn loop around the number, like the pen circle on the card */}
              <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <path
                  d="M40 18 C110 2 230 4 280 26 C304 42 292 76 240 88 C170 102 70 98 26 80 C2 66 8 34 52 20 C90 10 150 8 200 12"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="relative">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </section>

        {/* Who */}
        <section className="mx-auto w-full max-w-4xl px-6 pb-16 sm:px-10">
          <h2 className="font-accent text-2xl italic sm:text-3xl" style={{ color: CARD_BLUE }}>
            Who we are
          </h2>
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
