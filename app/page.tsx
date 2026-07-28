import Image from "next/image";

const OBJECTIONS = [
  {
    q: "“I’ve heard this before.”",
    a: "Every AI pitch sounds the same until it’s specific to your business. This isn’t “use ChatGPT more.” It’s your actual bottleneck, matched to a tool that fixes it.",
  },
  {
    q: "“I’ve tried consultants before and got a binder I never opened.”",
    a: "That’s why the audit ends with three to seven tools, not thirty pages of theory. You’ll know what to do on day one.",
  },
  {
    q: "“I don’t have time for this.”",
    a: "You have 45 minutes. What you don’t have is another year of doing this by hand.",
  },
  {
    q: "“Is $999 worth it?”",
    a: "If we don’t find at least 5 hours a week, we refund it. That’s the only guarantee we’re willing to make, because it’s the only one we’re sure of.",
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

function BookButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#book"
      className={`inline-flex items-center justify-center rounded-md bg-accent px-[14px] py-[12px] text-[15px] font-semibold text-foreground transition-colors hover:bg-accent-hover ${className}`}
    >
      Book your audit
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Nav */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 sm:px-10">
        <div className="text-lg font-extrabold tracking-tight">
          MiHo <span className="font-accent italic">Partners</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground sm:flex">
          <a href="#offer" className="transition-colors hover:text-link">
            The audit
          </a>
          <a href="#founders" className="transition-colors hover:text-link">
            About
          </a>
          <a href="#ladder" className="transition-colors hover:text-link">
            Beyond the audit
          </a>
        </nav>
        <BookButton />
      </header>

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
            In 45 minutes, we find where AI can give you real hours back in your week. Then we
            hand you three to seven tools you can start using immediately. No jargon, no 40-page
            deck.
          </p>
          <div className="mt-9 flex items-center gap-5">
            <BookButton />
            <span className="text-sm text-muted">$999 &middot; 45 minutes &middot; money-back guarantee</span>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full bg-accent-hover" />
          <div className="absolute inset-[6%] overflow-hidden rounded-full bg-surface">
            <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
              <Image
                src="/founders/mike.jpeg"
                alt="Mike Grabham, co-founder of MiHo Partners"
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
              <Image
                src="/founders/howard.jpeg"
                alt="Howard Kim, co-founder of MiHo Partners"
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background px-5 py-2 text-sm font-semibold shadow-sm">
            Mike &amp; Howard, MiHo Partners
          </div>
        </div>
      </section>

      <p className="mx-auto -mt-4 mb-16 w-full max-w-6xl px-6 text-sm text-muted sm:px-10">
        Built by operators, not consultants &mdash;{" "}
        <span className="font-accent italic text-base text-foreground">
          two founders who&rsquo;ve run the businesses they&rsquo;re talking about
        </span>
      </p>

      {/* Problem */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center sm:px-10">
        <p className="text-xl leading-relaxed sm:text-2xl">
          You&rsquo;ve read the AI headlines. You&rsquo;ve watched competitors post about some new
          workflow. You know something in your business could run better with the right tool.
        </p>
        <p className="mt-6 text-xl leading-relaxed text-muted sm:text-2xl">
          You also know you don&rsquo;t have time to figure out which tool, whether it&rsquo;s
          worth the setup, or whether it just becomes one more thing that gets abandoned in a
          month.
        </p>
        <p className="mt-6 text-xl leading-relaxed sm:text-2xl">
          That&rsquo;s the actual problem. Not a lack of AI.{" "}
          <span className="font-accent italic text-2xl sm:text-3xl">
            A lack of time to sort the real tools from the noise.
          </span>
        </p>
      </section>

      {/* Offer */}
      <section id="offer" className="bg-surface py-20">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              The offer: the <span className="font-accent italic">AI Audit</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              It isn&rsquo;t a report telling you what&rsquo;s wrong. It&rsquo;s a short list of
              tools telling you what to do next.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "A 45-minute call",
                d: "We ask questions, you talk. No pitching, no jargon.",
              },
              {
                n: "02",
                t: "3 to 7 specific tools",
                d: "Picked for your business, not a generic list.",
              },
              {
                n: "03",
                t: "A short review call",
                d: "We walk through what to install first and what it’ll save you.",
              },
            ].map((step) => (
              <div key={step.n} className="rounded-3xl bg-background p-7">
                <div className="font-accent italic text-3xl text-deep">{step.n}</div>
                <div className="mt-3 text-lg font-bold">{step.t}</div>
                <p className="mt-2 text-muted">{step.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-ink-foreground sm:flex-row sm:items-center">
            <div>
              <div className="text-sm uppercase tracking-wide text-ink-foreground/60">Price</div>
              <div className="mt-1 text-4xl font-extrabold">$999</div>
            </div>
            <div className="max-w-md text-ink-foreground/85">
              <span className="font-semibold text-ink-foreground">The guarantee: </span>
              if we can&rsquo;t find you at least 5 hours a week back, you get every dollar back.
              No questions asked. Worst case, you lose 45 minutes.
            </div>
            <BookButton className="shrink-0" />
          </div>
        </div>
      </section>

      {/* Objections */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-10">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
          Fair <span className="font-accent italic">questions</span>
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {OBJECTIONS.map((o) => (
            <div key={o.q}>
              <div className="text-lg font-bold">{o.q}</div>
              <p className="mt-2 leading-relaxed text-muted">{o.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founders */}
      <section id="founders" className="bg-surface py-20">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
            Who&rsquo;s <span className="font-accent italic">behind this</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="rounded-3xl bg-background p-8">
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image src="/founders/mike.jpeg" alt="Mike Grabham" fill className="object-cover" />
              </div>
              <div className="mt-5 text-xl font-bold">Mike Grabham</div>
              <p className="mt-3 leading-relaxed text-muted">
                Mike has started six companies over the past 20 years, from a $14M regional
                telecommunications firm to early-stage software startups. He sold his first after
                more than tripling its revenue, and raised over $3M in outside capital across the
                rest. He&rsquo;s not theorizing from a case study. He&rsquo;s run the P&amp;L, made
                payroll, and negotiated the acquisitions himself.
              </p>
            </div>
            <div className="rounded-3xl bg-background p-8">
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image src="/founders/howard.jpeg" alt="Howard Kim" fill className="object-cover" />
              </div>
              <div className="mt-5 text-xl font-bold">Howard Kim</div>
              <p className="mt-3 leading-relaxed text-muted">
                Howard has a master&rsquo;s in computer science and machine learning from Georgia
                Tech, and he builds the AI systems most people only talk about: lead-enrichment
                tools with verified sourcing, workflow automations that cut real admin work by a
                third. He&rsquo;s not theorizing about AI. He&rsquo;s the one who configures it,
                ships it, and hands it off running.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ladder */}
      <section id="ladder" className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-10">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
          Where it goes <span className="font-accent italic">from here</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Most owners who do the audit want us to help them act on it. About half do. If that&rsquo;s
          you, here&rsquo;s the range of what that can look like.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {LADDER.map((item, i) => (
            <div key={item.title} className="flex gap-4 rounded-2xl bg-surface p-6">
              <div className="font-accent italic text-2xl text-deep">{i + 1}</div>
              <div>
                <div className="font-bold">{item.title}</div>
                <p className="mt-1 text-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-muted">
          None of this happens without the audit first. It&rsquo;s how we find out what&rsquo;s
          actually worth fixing.
        </p>
      </section>

      {/* Final CTA */}
      <section id="book" className="bg-ink py-16 text-ink-foreground">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Start with the <span className="font-accent italic">audit</span>.
            </h2>
            <p className="mt-3 max-w-md text-ink-foreground/80">
              $999, one 45-minute call, five hours a week guaranteed or your money back.
            </p>
          </div>
          <BookButton />
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-6 py-10 text-sm text-muted sm:px-10">
        MiHo Partners &mdash; Mike Grabham &amp; Howard Kim
      </footer>
    </div>
  );
}
