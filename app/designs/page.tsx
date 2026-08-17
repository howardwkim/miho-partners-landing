import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "../components/BookButton";
import { PostRow } from "../components/PostRow";
import { Takeaway } from "../components/Takeaway";
import { AUTHORS } from "@/lib/blog/authors";
import type { PostSummary } from "@/lib/blog/types";

export const metadata: Metadata = {
  title: "Style guide — MiHo Partners",
  description: "The colours, type, and components the MiHo Partners site is built from.",
  robots: { index: false, follow: false },
};

type Swatch = {
  token: string;
  hex: string;
  use: string;
  /** Dark enough that a label sitting on it needs to be white. */
  dark?: boolean;
};

const SPRING: Swatch[] = [
  { token: "spring-deep", hex: "#005924", use: "Deepest green. Dark section grounds, link hover.", dark: true },
  { token: "spring-cta", hex: "#118631", use: "Nav-link hover, inline links.", dark: true },
  { token: "spring-vibrant", hex: "#6cd689", use: "Primary CTA button background." },
  { token: "spring-vibrant-50", hex: "#b6ebc4", use: "CTA hover, hero halo." },
  { token: "spring-bright", hex: "#f4ffb0", use: "Bright lime. Highlighter swipe." },
  { token: "spring-bright-50", hex: "#f9ffd8", use: "Pale lime tint." },
  { token: "spring-mute", hex: "#eef2e4", use: "Muted sage surface — alternating sections." },
  { token: "spring-light-25", hex: "#fbfcf8", use: "Near-white sage tint." },
];

const FALL: Swatch[] = [
  { token: "fall-deep", hex: "#bb4038", use: "Brick red. Sparing emphasis only.", dark: true },
  { token: "fall-vibrant", hex: "#ff8061", use: "Coral. Illustration on Modern Life." },
  { token: "fall-bright", hex: "#f8a08c", use: "Peach." },
  { token: "fall-medium", hex: "#f2e0ca", use: "Tan. Warm ground behind figures." },
  { token: "fall-light-50", hex: "#f8efe5", use: "Pale peach." },
  { token: "fall-mute", hex: "#fff6e9", use: "Cream-peach." },
];

const NEUTRAL: Swatch[] = [
  { token: "neutral-black", hex: "#000000", use: "Primary text.", dark: true },
  { token: "neutral-mid-1", hex: "#fbfcf5", use: "Page background." },
  { token: "ux-gray-2", hex: "#e7e7e7", use: "Borders, dividers." },
  { token: "ux-gray-3", hex: "#aeaeae", use: "Disabled." },
  { token: "ux-gray-4", hex: "#7a7a7a", use: "Secondary text." },
  { token: "white", hex: "#ffffff", use: "Text on dark grounds." },
];

const TYPE = [
  { name: "H1", cls: "text-[2.75rem] font-light leading-[1.08] tracking-tight sm:text-6xl", spec: "44px mobile / 60px desktop · weight 300 · leading 1.08 · tracking -0.03em" },
  { name: "H2", cls: "text-3xl font-light tracking-tight sm:text-4xl", spec: "30px / 36px · weight 300 · tracking tight" },
  { name: "H2 accent", cls: "font-accent text-3xl italic sm:text-4xl", spec: "Instrument Serif italic — the back half of a headline, never the whole line" },
  { name: "Lead", cls: "text-lg leading-relaxed text-muted", spec: "18px · leading 1.625 · ux-gray-4" },
  { name: "Body", cls: "leading-relaxed", spec: "16px · leading 1.625" },
  { name: "Small", cls: "text-sm text-muted", spec: "14px · ux-gray-4 — meta lines, captions" },
];

const SAMPLE_POST: PostSummary = {
  slug: "most-ai-tools-solve-a-problem-you-dont-have",
  title: "Most AI tools solve a problem you don't have",
  deck: "The question isn't which tool is best. It's which twenty minutes of your week you'd pay to never do again.",
  date: "2026-07-24",
  category: "AI tools",
  author: "howard",
  readingMinutes: 4,
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="reveal border-t border-ux-gray-2 py-14">
      <h2 className="mb-8 text-3xl font-light tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Swatches({ title, note, items }: { title: string; note: string; items: Swatch[] }) {
  return (
    <div className="mb-10">
      <div className="mb-1 text-lg font-bold">{title}</div>
      <p className="mb-5 max-w-2xl text-sm text-muted">{note}</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.token} className="overflow-hidden rounded-2xl border border-ux-gray-2">
            <div
              className="flex h-24 items-end p-3"
              style={{ background: s.hex }}
            >
              <code
                className={`text-xs font-semibold ${s.dark ? "text-white" : "text-foreground/70"}`}
              >
                {s.hex}
              </code>
            </div>
            <div className="bg-background p-3">
              <code className="text-xs font-semibold">{s.token}</code>
              <p className="mt-1 text-xs leading-snug text-muted">{s.use}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Designs() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-24 sm:px-10">
      <header className="py-10">
        <Link href="/" className="text-sm text-muted transition-colors hover:text-link">
          &larr; Back to the site
        </Link>
        <h1 className="mt-8 text-[2.75rem] font-light leading-[1.08] tracking-tight sm:text-6xl">
          The <span className="font-accent italic">style guide</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Every colour, type size and component the MiHo Partners site is built from. Tokens are
          extracted from modernlife.com&rsquo;s live CSS, so the names here are Modern Life&rsquo;s
          own. This page is the reference both of us work from &mdash; if something on the site
          isn&rsquo;t here, it&rsquo;s ad hoc and should be fixed.
        </p>
      </header>

      <Section id="colour" title="Colour">
        <Swatches
          title="Spring — the primary family"
          note="The greens carry the brand. One confident accent colour on the CTA, deep green for dark grounds and links, sage for alternating surfaces."
          items={SPRING}
        />
        <Swatches
          title="Fall — the warm secondary"
          note="Admitted to the palette on 2026-07-31. On Modern Life these are illustration-only and never UI accents; using them as UI accents is a deliberate departure. Use sparingly — the greens stay primary."
          items={FALL}
        />
        <Swatches
          title="Neutrals"
          note="Grounds, text and borders. The page background is never pure white and never dark."
          items={NEUTRAL}
        />
      </Section>

      <Section id="type" title="Type">
        <p className="mb-8 max-w-2xl text-muted">
          Two families. <span className="font-semibold">Manrope</span> for everything, and{" "}
          <span className="font-accent italic">Instrument Serif</span> italic as the editorial
          accent &mdash; applied to the back half of a headline only, never a whole line, and never
          with a colour shift. The accent is carried by font and italic alone.
        </p>
        <div className="space-y-8">
          {TYPE.map((t) => (
            <div key={t.name} className="border-t border-ux-gray-2 pt-5">
              <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <code className="text-xs font-semibold">{t.name}</code>
                <span className="text-xs text-muted">{t.spec}</span>
              </div>
              <div className={t.cls}>Real hours back in your week</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="buttons" title="Buttons and links">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <BookButton />
            <p className="mt-2 text-xs text-muted">Primary &mdash; hover lightens, never darkens</p>
          </div>
          <div>
            <a
              href="#colour"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-ux-gray-2 px-[14px] py-[12px] text-[15px] font-semibold transition-colors hover:border-link hover:text-link"
            >
              Secondary
            </a>
            <p className="mt-2 text-xs text-muted">Outline &mdash; border and text go green</p>
          </div>
          <div>
            <a href="#type" className="font-medium text-foreground transition-colors hover:text-link">
              An inline text link
            </a>
            <p className="mt-2 text-xs text-muted">
              Colour is the hover signal &mdash; never underline-only or opacity-only
            </p>
          </div>
        </div>
      </Section>

      <Section id="devices" title="Devices">
        <div className="space-y-10">
          <div>
            <div className="mb-3 text-lg font-bold">Highlighter swipe</div>
            <p className="mb-4 max-w-2xl text-sm text-muted">
              Emphasis by hand rather than by scale. Every small-practice site that landed well
              marks one key phrase this way. A two-person firm can&rsquo;t lean on a logo wall, so
              this does the work instead. One phrase per page.
            </p>
            <p className="text-2xl font-light">
              We find where <span className="highlight-swipe">you&rsquo;re losing hours</span>.
            </p>
          </div>

          <div>
            <div className="mb-3 text-lg font-bold">Gradient sweep</div>
            <p className="mb-4 max-w-2xl text-sm text-muted">
              A clipped-gradient band slides through the letters on a 4s loop. Swiped from
              beside.com. Reserved for the guarantee &mdash; if it appears twice on a page it stops
              meaning anything.
            </p>
            <p className="text-sm">
              <span className="guarantee-shimmer font-semibold">money-back guarantee</span>
            </p>
          </div>

          <div>
            <div className="mb-3 text-lg font-bold">Scroll reveal</div>
            <p className="max-w-2xl text-sm text-muted">
              Sections fade up 16px as they enter the viewport. Pure CSS via{" "}
              <code className="text-xs">animation-timeline: view()</code> &mdash; no JavaScript, no
              observer. Every section on this page is using it right now. Browsers without
              scroll-driven animation support render the final state immediately, and it&rsquo;s
              disabled entirely under <code className="text-xs">prefers-reduced-motion</code>.
            </p>
          </div>
        </div>
      </Section>

      <Section id="rules" title="Rules and ruled lists">
        <p className="mb-10 max-w-2xl text-muted">
          Structure without boxes. A card is the lazy container &mdash; where a section is a
          list or a sequence, a hairline does the same job with none of the weight. A hairline
          is always tinted from the ground it sits on:{" "}
          <code className="text-xs">ux-gray-2</code> on the page background, and a deep-green
          tint on the sage surface, where gray would all but disappear.
        </p>

        <div className="space-y-12">
          <div>
            <div className="mb-3 text-lg font-bold">Segmented rule</div>
            <p className="mb-5 max-w-2xl text-sm text-muted">
              One rule per column, aligned so they read as a single line broken at the column
              gaps. The breaks mark the beats. This is why the offer section carries no 01 /
              02 / 03 &mdash; reading order already gives you the sequence, so numbering it was
              decoration wearing a job title. Columns are equal, one type size, one rule
              length: any variation across a set like this reads as a bug, not as emphasis.
            </p>
            <div className="rounded-3xl bg-surface p-7">
              <div className="grid grid-cols-3 gap-x-12">
                {["A 45-minute call", "One or two specific tools", "A short review call"].map(
                  (t) => (
                    <div key={t} className="border-t border-deep/25 pt-6">
                      <div className="text-lg font-light tracking-tight">{t}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 text-lg font-bold">Ruled list</div>
            <p className="mb-5 max-w-2xl text-sm text-muted">
              Term left, description right, a hairline above every row and one closing the
              list. Used where the content is a menu rather than a sequence &mdash; numbering a
              menu claims an order the copy doesn&rsquo;t have.
            </p>
            <div className="rounded-3xl bg-surface p-7">
              <dl className="border-b border-deep/15">
                {[
                  ["Building the automation itself", "So a task that used to eat an hour a week runs on its own."],
                  ["An ongoing partnership", "Twice a month, we sit with you and build whatever’s next."],
                ].map(([term, desc]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[15rem_minmax(0,1fr)] gap-x-10 border-t border-deep/15 py-6"
                  >
                    <dt className="text-lg font-light tracking-tight">{term}</dt>
                    <dd className="text-sm leading-relaxed text-muted">{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      <Section id="surfaces" title="Surfaces">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-background p-7 ring-1 ring-ux-gray-2">
            <div className="font-bold">Background</div>
            <p className="mt-2 text-sm text-muted">The default ground. Warm off-white.</p>
          </div>
          <div className="rounded-3xl bg-surface p-7">
            <div className="font-bold">Surface</div>
            <p className="mt-2 text-sm text-muted">Sage. Alternating sections.</p>
          </div>
          <div className="rounded-3xl bg-ink p-7 text-ink-foreground">
            <div className="font-bold">Ink</div>
            <p className="mt-2 text-sm text-ink-foreground/80">Deep green. Price block, final CTA.</p>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-sm text-muted">
          Card radius is <code className="text-xs">rounded-3xl</code> (24px) for content cards and{" "}
          <code className="text-xs">rounded-md</code> (6px) for buttons &mdash; Modern Life&rsquo;s
          buttons are a soft rounded rectangle, not a pill.
        </p>
      </Section>

      <Section id="blog" title="Blog components">
        <p className="mb-10 max-w-2xl text-muted">
          Used only in the blog section. The listing row is shared between{" "}
          <code className="text-xs">/blog</code> and the homepage sampler, so there is one row
          design rather than two that drift apart.
        </p>

        <div className="space-y-12">
          <div>
            <div className="mb-3 text-lg font-bold">Listing row</div>
            <p className="mb-5 max-w-2xl text-sm text-muted">
              Category, date, reading time, title, deck, author. The thumbnail is optional and the
              slot collapses when a post has no image &mdash; fixed row height either way, never a
              reflowing grid. Shown here without an image, which is the common case.
            </p>
            <div className="rounded-2xl border border-ux-gray-2 px-6">
              <PostRow post={SAMPLE_POST} />
            </div>
          </div>

          <div>
            <div className="mb-3 text-lg font-bold">Category chips</div>
            <p className="mb-5 max-w-2xl text-sm text-muted">
              Filter in place over a flat list. Five fixed categories, declared as a type union and
              validated at build time &mdash; a post with an invented category fails the build. Only
              categories that actually have posts get a chip.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-ink px-3 py-[7px] text-sm font-medium text-ink-foreground">
                All
              </span>
              <span className="rounded-md border border-ux-gray-2 px-3 py-[7px] text-sm font-medium text-muted">
                Time drains
              </span>
              <span className="rounded-md border border-ux-gray-2 px-3 py-[7px] text-sm font-medium text-muted">
                AI tools
              </span>
            </div>
          </div>

          <div>
            <div className="mb-3 text-lg font-bold">Byline</div>
            <p className="mb-5 max-w-2xl text-sm text-muted">
              Articles alternate between Mike and Howard. The face and the name carry the trust;
              the firm sits under it. No credential line &mdash; under every article that reads as
              selling rather than writing.
            </p>
            <div className="flex items-center gap-4 border-t border-ux-gray-2 pt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={AUTHORS.howard.photo}
                alt={AUTHORS.howard.name}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-bold">{AUTHORS.howard.name}</div>
                <div className="text-sm text-muted">{AUTHORS.howard.affiliation}</div>
                <div className="mt-[2px] text-xs text-muted">July 24, 2026 · 4 min read</div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 text-lg font-bold">Takeaway block</div>
            <p className="mb-5 max-w-2xl text-sm text-muted">
              Required in every article. MiHo sells prescription, not diagnosis &mdash; an article
              that ends on a platitude contradicts the thing being sold. This is a structural slot
              that has to be filled with something concrete. One per article.
            </p>
            {/* Wrapped in prose because that's how it appears in an article —
                the component inherits body styling rather than defining it. */}
            <div className="prose prose-miho max-w-none">
              <Takeaway title="Before you buy anything">
                <ul>
                  <li>Write the task down by hand, in one sentence.</li>
                  <li>Time it once, honestly.</li>
                  <li>Name who checks it&rsquo;s still running in 60 days.</li>
                </ul>
              </Takeaway>
            </div>
          </div>

          <div>
            <div className="mb-3 text-lg font-bold">Article prose</div>
            <p className="max-w-2xl text-sm text-muted">
              Tailwind&rsquo;s typography plugin as the base, with every{" "}
              <code className="text-xs">--tw-prose-*</code> variable remapped onto the tokens above
              &mdash; the plugin&rsquo;s defaults are grays on white, which the brief rules out. Applied
              as <code className="text-xs">prose prose-miho</code>. Headings take the site&rsquo;s
              light weight and tight tracking rather than the plugin&rsquo;s bold defaults.
            </p>
          </div>
        </div>
      </Section>

      <Section id="unused" title="Not yet used">
        <p className="max-w-2xl text-muted">
          The testimonial component &mdash; Modern Life&rsquo;s &ldquo;what advisers are
          saying&rdquo; block. Parked deliberately: it needs real client quotes, and MiHo
          doesn&rsquo;t have any yet. Trust comes from founder operating history until it does.
        </p>
      </Section>
    </div>
  );
}
