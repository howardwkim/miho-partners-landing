import Image from "next/image";

import { BookButton } from "./BookButton";
import { BlogSampler } from "./BlogSampler";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

/* ---------------------------------------------------------------------------
   The homepage lives here rather than in app/page.tsx so that the proportions
   comparison at /audit/proportions renders the same component the site does.
   A duplicated copy would drift from the real page within a day, and then the
   "before" in a comparison would be a story about the page rather than the page.

   `proportions` is a temporary switch. Once the call is made, the winning column
   of PROPORTIONS becomes the only one and the prop comes out.
   --------------------------------------------------------------------------- */

export type Proportions = "current" | "proposed";

const PROPORTIONS = {
  /** Every section the same height and the same headline size. */
  current: {
    offerPad: "py-20",
    offerHead: "text-3xl font-light tracking-tight sm:text-4xl",
    offerLead: "mt-4 text-lg text-muted",
    offerGap: "mb-14",
    priceWidth: "max-w-5xl",
    priceTop: "mt-14",
    faqPad: "py-20",
    faqHead: "text-3xl font-light tracking-tight sm:text-4xl",
    blogPad: "py-20",
    ladderPad: "py-20",
    ladderHead: "text-3xl font-light tracking-tight sm:text-4xl",
    ladderLead: "mt-4 max-w-2xl text-lg text-muted",
    ladderGap: "mt-12",
    ctaPad: "py-16",
  },
  /** One peak. The offer takes the room the FAQ and the ladder give up. */
  proposed: {
    offerPad: "py-24 sm:py-32",
    offerHead: "text-4xl font-light tracking-tight sm:text-5xl",
    offerLead: "mt-5 text-xl text-muted",
    offerGap: "mb-16",
    priceWidth: "max-w-6xl",
    priceTop: "mt-16",
    faqPad: "py-14",
    faqHead: "text-2xl font-light tracking-tight sm:text-3xl",
    blogPad: "py-16",
    ladderPad: "py-16",
    ladderHead: "text-2xl font-light tracking-tight sm:text-3xl",
    ladderLead: "mt-3 max-w-2xl text-muted",
    ladderGap: "mt-10",
    ctaPad: "py-20",
  },
} as const;

const OBJECTIONS = [
  {
    q: "I’ve heard this before.",
    a: "Every AI pitch sounds the same until it’s specific to your business. This isn’t “use ChatGPT more.” It’s your actual bottleneck, matched to a tool that fixes it.",
  },
  {
    q: "I’ve tried consultants before and got a binder I never opened.",
    a: "That’s why the audit ends with one or two tools, not thirty pages of theory. You’ll know what to do on day one.",
  },
  {
    q: "I don’t have time for this.",
    a: "You have 45 minutes. What you don’t have is another year of doing this by hand.",
  },
  {
    q: "Is $399 worth it?",
    a: "If we don’t find at least 5 hours a week, we refund it. That’s the only guarantee we’re willing to make, because it’s the only one we’re sure of.",
  },
];

const STEPS = [
  {
    t: "A 45-minute call",
    d: "We ask questions, you talk. No pitching, no jargon.",
  },
  {
    t: "One or two specific tools",
    d: "Picked for your business, not a generic list.",
  },
  {
    t: "A short review call",
    d: "We walk through what to install first and what it’ll save you.",
  },
];

/* Mike's bio was cut roughly in half to sit at Howard's length. Nothing was
   added and no credential was dropped — what came out was the closing
   "Today, Mike helps small business owners…" services paragraph, which restates
   what the offer section already sells. Restore it here if he wants it back. */
const FOUNDERS = [
  {
    name: "Mike Grabham",
    role: "Six-time founder · two exits",
    img: "/founders/mike-closeup.jpg",
    email: "mike@mihopartners.com",
    bio: "An MBA, six-time founder, and small business consultant — more than 20 years building companies, managing teams, raising capital, and navigating two successful exits. He isn’t theorizing from a case study. He knows what it feels like to make payroll, watch cash closely, and carry the weight of every major decision.",
  },
  {
    name: "Howard Kim",
    role: "Georgia Tech MS, computer science & machine learning",
    img: "/founders/howard.jpeg",
    email: "howard@mihopartners.com",
    bio: "He builds the AI systems most people only talk about: lead-enrichment tools with verified sourcing, workflow automations that cut real admin work by a third. He’s not theorizing about AI. He’s the one who configures it, ships it, and hands it off running.",
  },
];

const LADDER = [
  {
    title: "Fixing a broken process before we automate it",
    body: "Some of what’s slowing you down doesn’t need AI, it needs to be shorter.",
  },
  {
    title: "Building the automation itself",
    body: "So a task that used to eat an hour a week runs on its own.",
  },
  {
    title: "A knowledge system trained on your business",
    body: "So your team and your customers get answers without you in the loop.",
  },
  {
    title: "An ongoing partnership",
    body: "Twice a month, we sit with you and build whatever’s next.",
  },
];

export function HomePage({ proportions = "current" }: { proportions?: Proportions }) {
  const p = PROPORTIONS[proportions];

  return (
    <div className="flex flex-col">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-10 sm:px-10 md:grid-cols-2 md:pt-16">
        <div>
          <h1 className="text-[2.75rem] font-light leading-[1.08] tracking-tight sm:text-6xl">
            You don&rsquo;t need to learn AI.
            <br />
            <span className="font-accent italic text-[3.1rem] sm:text-[3.6rem]">
              You need someone to tell you what matters.
            </span>
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
            In 45 minutes, we find where we can give you real hours back in your week. Then we hand
            you one or two tools you can start using immediately. No jargon, no 20-page deck.
          </p>
          <div className="mt-9 flex items-center gap-5">
            <BookButton />
            {/* Gradient sweep, from the beside.com extraction */}
            <span className="text-sm leading-snug text-muted">
              $399 &middot; 45 minutes
              <br />
              <span className="guarantee-shimmer font-semibold">money-back guarantee</span>
            </span>
          </div>

          {/* Closes the hero block instead of floating in the gap below it. A
              hairline and the hero's own column are all it needed — on its own
              between two sections it read as copy nobody had placed. */}
          <p className="mt-10 border-t border-ux-gray-2 pt-5 text-sm leading-relaxed text-muted">
            Built by operators, not consultants &mdash; two founders who&rsquo;ve run the businesses
            they&rsquo;re talking about.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          {/* Tan ring behind the founders — the warm family's first UI appearance,
              mirroring Modern Life's halo behind their hero illustration. */}
          <div className="absolute -inset-[7%] rounded-full bg-warm/60" />
          <div className="absolute inset-0 rounded-full bg-accent-hover" />
          <div className="absolute inset-[6%] overflow-hidden rounded-full bg-surface">
            <Image
              src="/founders/founders-composite.png"
              alt="Mike Grabham and Howard Kim, co-founders of MiHo Partners"
              fill
              sizes="(max-width: 768px) 90vw, 440px"
              className="object-cover"
              priority
            />
          </div>
          {/* Two lines, centred: the people on top, the company beneath. The
              company is set in the serif italic — the same treatment the logo
              gives it — so the two lines read as two different kinds of thing
              rather than one run-on caption. */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-7 py-3 text-center shadow-sm">
            <div className="text-sm font-semibold leading-tight">Mike &amp; Howard</div>
            <div className="font-accent text-sm italic leading-tight text-muted">MiHo Partners</div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center sm:px-10">
        <p className="reveal text-xl leading-relaxed sm:text-2xl">
          You&rsquo;ve read the AI headlines. You&rsquo;ve watched competitors post about some new
          workflow. You know something in your business could run better with the right tool.
        </p>
        <p className="reveal-delay-1 reveal mt-6 text-xl leading-relaxed text-muted sm:text-2xl">
          You also know you don&rsquo;t have time to figure out which tool, whether it&rsquo;s worth
          the setup, or whether it just becomes one more thing that gets abandoned in a month.
        </p>
        <p className="reveal-delay-2 reveal mt-6 text-xl leading-relaxed sm:text-2xl">
          That&rsquo;s the actual problem. Not a lack of AI.{" "}
          <span className="font-accent italic text-2xl sm:text-3xl">
            A lack of{" "}
            <span className="highlight-swipe">time to sort the real tools from the noise</span>.
          </span>
        </p>
      </section>

      {/* Offer */}
      {/* The scroll reveal used to be on this and every other section. One
          identical entrance repeated down a page is a setting, not a decision,
          so it now lives only on the three problem paragraphs above, where the
          staggered delays actually build the argument line by line. */}
      <section id="offer" className={`bg-surface ${p.offerPad}`}>
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
          <div className={`${p.offerGap} max-w-2xl`}>
            <h2 className={p.offerHead}>
              The offer: the <span className="font-accent italic">Time Saver Audit</span>
            </h2>
            <p className={p.offerLead}>
              It isn&rsquo;t a report telling you what&rsquo;s wrong. It&rsquo;s a short list of
              tools telling you what to do next.
            </p>
          </div>

          {/* No 01/02/03. Reading order already carries the sequence, so the numerals
              were decoration wearing a job title. Each column takes its own hairline
              instead: on desktop they align into one broken line whose gaps mark the
              beats, so nothing extra has to be drawn. Three equal columns, one type
              size, one rule length — any variation here reads as a bug, not emphasis.
              Rules are desktop-only; stacked on mobile they'd read as the ladder below. */}
          <ol className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-0">
            {STEPS.map((step) => (
              <li key={step.t} className="sm:border-t sm:border-deep/25 sm:pt-7">
                <h3 className="text-xl font-light tracking-tight sm:text-2xl">{step.t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Its own container so the proposed proportions can let it break wider
            than the text column above it. On `current` the width matches and it
            simply sits in line. */}
        <div className={`mx-auto w-full px-6 sm:px-10 ${p.priceWidth}`}>
          <div
            className={`${p.priceTop} flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-ink-foreground sm:flex-row sm:items-center`}
          >
            {/* No "PRICE" label above it — a dollar figure in the offer section doesn't
                need to be told what it is. */}
            <div className="text-4xl font-extrabold">$399</div>
            <div className="max-w-md text-ink-foreground/85">
              <span className="font-semibold text-ink-foreground">The guarantee: </span>
              if we can&rsquo;t find you at least 5 hours a week back, you get every dollar back. No
              questions asked. Worst case, you lose 45 minutes.
            </div>
            <BookButton className="shrink-0" />
          </div>
        </div>
      </section>

      {/* Objections */}
      <section className={`mx-auto w-full max-w-5xl px-6 sm:px-10 ${p.faqPad}`}>
        <h2 className={p.faqHead}>Fair questions</h2>

        {/* Set as an exchange, not a grid of features — a 2x2 grid made four
            objections read as a list of benefits, which is the opposite of the
            point. The objection is the customer talking, so it keeps its
            quotation marks and sits at full strength; the answer is indented
            beneath it, which is what a reply looks like.

            Not set in the italic serif, deliberately. The serif is already doing
            three jobs on this page (the logo, the hero, the product name) and
            handing it a fourth is how it stopped meaning anything the first
            time. Quotation marks cost nothing and say the same thing. */}
        <div className="mt-10">
          {OBJECTIONS.map((o) => (
            <div key={o.q} className="border-t border-ux-gray-2 py-7 first:border-t-0 first:pt-0">
              <p className="max-w-2xl text-xl font-light tracking-tight">&ldquo;{o.q}&rdquo;</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted sm:ml-10">{o.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founders */}
      <section id="founders" className="bg-surface py-20">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl">Who&rsquo;s behind this</h2>

          {/* A pair, not a list. This was ruled rows briefly and that was wrong:
              it was the same markup as the ladder four sections down, and two of
              anything is the one length at which a list is never the right shape.
              No rules and no boxes — the unequal bio lengths simply end at
              different heights, which is what two people writing different
              amounts looks like. It only read as ragged when a box was drawn
              around it.

              Portraits are squared rather than circular so they don't restate
              the hero's circle, and kept small — they identify the person, they
              aren't the subject of the section. */}
          <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div key={f.name}>
                <div className="relative aspect-[4/5] w-28 overflow-hidden rounded-sm bg-background">
                  <Image src={f.img} alt={f.name} fill sizes="112px" className="object-cover" />
                </div>
                <div className="mt-5 text-xl font-light tracking-tight">{f.name}</div>
                <div className="mt-1 text-sm leading-snug text-muted">{f.role}</div>
                <p className="mt-4 max-w-md leading-relaxed text-muted">{f.bio}</p>
                <a
                  href={`mailto:${f.email}`}
                  className="mt-3 inline-block text-sm font-medium text-link transition-colors hover:text-deep"
                >
                  {f.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog sampler */}
      <BlogSampler padding={p.blogPad} />

      {/* Ladder */}
      <section id="ladder" className={`bg-surface ${p.ladderPad}`}>
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
          <h2 className={p.ladderHead}>Where it goes from here</h2>
          <p className={p.ladderLead}>
            Most owners who do the audit want us to help them act on it. About half do. If
            that&rsquo;s you, here&rsquo;s the range of what that can look like.
          </p>

          {/* A menu, not a sequence. The old 1-4 numbering claimed an order the copy
              explicitly denies ("the range of what that can look like"), so it's gone and
              the rows carry it instead. Term/description is also the honest markup. */}
          <dl className={`${p.ladderGap} border-b border-deep/15`}>
            {LADDER.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 gap-x-10 gap-y-2 border-t border-deep/15 py-7 sm:grid-cols-[19rem_minmax(0,1fr)]"
              >
                <dt className="text-xl font-light tracking-tight">{item.title}</dt>
                <dd className="max-w-xl leading-relaxed text-muted">{item.body}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-muted">
            None of this happens without the audit first. It&rsquo;s how we find out what&rsquo;s
            actually worth fixing.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section id="book" className={`bg-ink text-ink-foreground ${p.ctaPad}`}>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Start with the <span className="font-accent italic">Time Saver Audit</span>.
            </h2>
            <p className="mt-3 max-w-md text-ink-foreground/80">
              $399, one 45-minute call, five hours a week guaranteed or your money back.
            </p>
          </div>
          <BookButton />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
