# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: small business owners doing roughly $1M–$3M revenue, 10–30 employees, who built
the business around themselves and now can't step back from it.

The page leads with one of three confirmed personas (`docs/miho/brand/icp.md` in the
hmventures workspace) — the **Ready-to-Grow Owner** ($800K–$1.5M, 5–15 employees,
fundamentals right, actively evaluating tools, not paralyzed but unsure which lever to
pull). This is a deliberate choice: their stated pain ("AI feels overwhelming, I don't
know where to start") maps directly onto the audit's promise of a low-risk answer to
"where do I start."

Two secondary personas are folded in as recognition further down the page, not the
headline's target — they're a better fit for the implementation/retainer stages once
trust is established:
- **The Plateaued Owner** (40–55, $1.5M–$3M, 8–15 years in, growth stalled, business
  built around dependency on them rather than systems).
- **The Accidental CEO** (became a manager by accident of being good at the underlying
  work, avoids management conversations, undercharges).

## Product Purpose

The landing page and blog for **MiHo Partners**, a two-founder AI-consulting venture
(Mike Grabham + Howard Kim). The site sells a productized offer ladder — a $399 "Time
Saver Audit" (low-risk diagnostic) → implementation work → a retainer — and exists to
book the audit call. The blog is the trust-building content arm underneath that single
goal; it does not carry its own CTA.

## Positioning

MiHo Partners is a distinct joint venture, not a rebrand or extension of Mike Grabham's
existing solo consulting practice (michaelgrabham.com) — confirmed explicitly because
that solo brand has different pricing, ICP, and no AI mechanism, and cannot double as
MiHo's ground truth.

The mechanism a neighboring product can't truthfully copy: the founders' own operating
history. Neither is pattern-matching from case studies or theory — they're
pattern-matching from businesses they've actually built, advised, and watched fail. The
audit doesn't produce a diagnostic report; it prescribes a specific fix ("one specific
thing this week," not a 12-week framework), which is why the entry offer is always
called "audit" but never allowed to stand alone without a solutions qualifier in copy.

MiHo has no client roster or case studies to lean on yet, so trust is carried entirely
by founder-forward presentation and by the audit's own checkable guarantee, not by
proof of past client results.

## Operating Context

- The full offer ladder (audit → implementation → retainer) is shown on the page, but
  every section — including the ladder's own — resolves to one CTA: book the Time
  Saver Audit. No parallel offer, no lead magnet, no newsletter signup.
- Blog articles are authored two ways that must stay byte-compatible: a hand- or
  agent-written `.mdx` file committed directly to `content/blog/`, or the Keystatic
  browser editor at `/keystatic` (GitHub-backed storage — saving there commits the same
  kind of `.mdx` file). Both write files the build treats identically.
- Articles alternate authorship between Mike and Howard so the section reads as two
  people writing, not a content feed.
- Deploy is Vercel, from the GitHub repo `howardwkim/miho-partners-landing` (this `web/`
  directory is that repo, nested inside the `hmventures` workspace for shared planning
  docs). Live at mihopartners.com.
- Google Analytics (GA4) is wired via `@next/third-parties`.

## Capabilities and Constraints

- Next.js 16.2.12 (App Router), Tailwind v4, `@next/mdx` for blog content — chosen over
  third-party content layers (content-collections, Velite, next-mdx-remote) specifically
  because it ships on the same release train as the app's Next version and documents
  Turbopack support.
- Blog has five fixed categories as a closed type union (Time drains, AI tools,
  Operations, Delegation & hiring, Pricing), filtered by chips over one flat
  reverse-chronological list. No per-category routes, no pagination, no RSS — all
  explicitly rejected as unneeded weight at current post volume.
- `content/blog/_template.mdx` is permanent and must never be deleted or leave the
  directory empty — the article route resolves posts through a dynamic import, and an
  empty content directory fails the build outright. It also doubles as the authoring
  reference (every metadata field commented, valid category list, worked example).
- Post images are optional per article by deliberate choice — the article template and
  the listing row must both render correctly with or without one (fixed-height row,
  thumbnail slot filled or collapsed, never a reflowing masonry grid).
- The `.guarantee-shimmer` CSS device (gradient sweep) is reserved exclusively for the
  money-back guarantee; a second use anywhere else on the site destroys its meaning.
- `/designs` is the live style guide (noindex, excluded from the sitemap) enumerating
  every color, type size, device, and component the site is built from. Anything shipped
  that isn't documented there is ad hoc and should be fixed in the same change that adds
  it.
- Audit price is $399. A $999 figure appears in some source docs (Gannon transcript
  extraction, early planning notes) — that's the price from the interview MiHo's offer
  model was adapted from, not MiHo's own price; the two are deliberately kept distinct
  in those source files rather than corrected, since they document a different thing.
- Guarantee mechanism: refund if the audit can't identify at least 5 hours/week of
  reclaimable time. This is checked directly against the audit report itself, not
  conditioned on whether the client later acts on the recommendations.
- Byline block on every article is headshot + author name + "MiHo Partners" — explicitly
  no credential line. A résumé line repeated under every article was judged to read as
  selling rather than writing; the photo and name already carry the trust work.

## Brand Commitments

- Name: **MiHo Partners** (capital M, i, H; lowercase o) — confirmed 2026-08-17 as
  canonical. Everything actually shipped (page title, footer, byline, style guide,
  `layout.tsx` metadata) already uses this form consistently. The planning docs'
  decisions ledger and the Keystatic CMS brand config instead read "MiHO Partners"
  (capital O) — that's a documentation inconsistency to be aware of when reading those
  files, not a second valid spelling.
- Founders: Mike Grabham and Howard Kim, presented as equals — same height/eye-line, no
  visual hierarchy between them, both named and pictured throughout.
- Voice rules (`docs/miho/brand/brand-voice.md` in the hmventures workspace): short
  paragraphs (2–4 sentences), mixed sentence length, take a clear side and never hedge
  with "on the other hand," plain words over jargon, no passive voice, dry humor placed
  deliberately (2–3 moments per article, never setup-punchline). Banned words: synergy,
  leverage (as a verb), pivot, scale (as a standalone verb), ecosystem, holistic,
  empower, unlock potential, game-changer, thought leader, guru, crush it, 10x, hack,
  disrupt, elevate, delve into, "in today's fast-paced world," and the em dash.
- Claims allowed: pattern-observed language ("I've seen this pattern in dozens of
  businesses," "Most owners I talk to..."). Claims never allowed: revenue guarantees or
  specific ROI promises, "this works for every business" without a stage/type caveat,
  or credentials the founders don't hold (MBA, CPA, licensed financial advisor).
- Design brief (locked): trust is the single goal every design and copy choice serves.
  Restrained modern tech — not accountant/law-firm boring, not the saturated AI-startup
  look (no near-black grounds, monospace/terminal type, purple-to-orange gradients,
  glow, or grid overlays). Warm neutral grounds, never pure white or black. Boutique
  presentation: named humans over logo walls, no member counts, no award laurels, no
  enterprise mega-menus — deliberately not selling venture scale.

## Evidence on Hand

- Founder headshots plus a transparent-background cutout of Mike, at
  `hmventures/miho-landing-page/assets/founders/` (source) and `web/public/founders/`
  (served).
- No client roster or case studies exist yet. Future work must not fabricate
  testimonials, client logos, or results — this absence is a confirmed product fact, not
  a gap to quietly fill.
- Offer-architecture source material: a Greg Isenberg × Corey Gannon interview
  transcript at
  `personal-ai/projects/video-clipper/work/greg-isenberg-corey-ganim-ai-business/transcript.txt`.
  MiHo's $399 price and 5-hour guarantee floor are adapted from, and deliberately
  different from, Gannon's own $999/7-hour source model.
- One blog post exists in the repo (`content/blog/lorem-ipsum-test-post.mdx`) and is a
  placeholder used to verify the build, not a real published article. No real article
  has shipped yet.

## Product Principles

1. **Trust over scale.** Every design and copy choice serves demonstrating founder
   credibility, never venture-scale signaling — no metrics, logo walls, or awards, on a
   two-person firm that can't use those trust devices honestly.
2. **One CTA everywhere.** Every page and section, including the offer ladder itself,
   resolves to booking the Time Saver Audit — no competing offer, no lead magnet.
3. **Peer credibility, not theory.** Content and positioning lean on the founders' lived
   operating experience, never generic frameworks or both-sides hedging.
4. **The low-risk entry point substitutes for the missing track record.** The audit's
   specific, checkable guarantee (5+ hours/week found, or refunded) is the mechanism
   that compensates for having no client roster yet — not copy that disguises the gap.
5. **Machine-authored content gets structural guardrails, not trust in proofreading.**
   Because articles are frequently AI-written, correctness is enforced at build time
   (closed category union, runtime frontmatter checks, a required takeaway block) rather
   than assumed from review.
