---
name: MiHo Partners
description: Warm-paper trust design for a two-founder AI consultancy — hand-marked emphasis, light type, flat grounds.
colors:
  spring-deep: "#005924"
  spring-cta: "#118631"
  spring-vibrant: "#6cd689"
  spring-vibrant-50: "#b6ebc4"
  spring-bright: "#f4ffb0"
  spring-mute: "#eef2e4"
  fall-deep: "#bb4038"
  fall-medium: "#f2e0ca"
  neutral-black: "#000000"
  neutral-mid-1: "#fbfcf5"
  prose-body: "#23231f"
  ux-gray-2: "#e7e7e7"
  ux-gray-3: "#aeaeae"
  ux-gray-4: "#7a7a7a"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  display-accent:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(3.1rem, 6.5vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "normal"
  headline:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  subhead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  prose:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  md: "6px"
  xl: "12px"
  "2xl": "16px"
  "3xl": "24px"
  full: "9999px"
spacing:
  gutter: "24px"
  gutter-wide: "40px"
  card: "28px"
  card-wide: "32px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.spring-vibrant}"
    textColor: "{colors.neutral-black}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  button-primary-hover:
    backgroundColor: "{colors.spring-vibrant-50}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-black}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  button-secondary-hover:
    textColor: "{colors.spring-cta}"
  chip-selected:
    backgroundColor: "{colors.spring-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "7px 12px"
  chip-unselected:
    backgroundColor: "transparent"
    textColor: "{colors.ux-gray-4}"
    rounded: "{rounded.md}"
    padding: "7px 12px"
  card:
    backgroundColor: "{colors.neutral-mid-1}"
    textColor: "{colors.neutral-black}"
    rounded: "{rounded.3xl}"
    padding: "28px"
  card-ink:
    backgroundColor: "{colors.spring-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.3xl}"
    padding: "32px"
---

# Design System: MiHo Partners

## Overview

**Creative North Star: "The Operator's Notebook"**

This is what a working person's desk looks like, not what a software company's
website looks like. The ground is warm paper — an off-white with green in it,
never the flat white of a template. Type is set light and large, the way you'd
write a sentence you meant. And where something matters, it isn't made bigger or
bolder: it's marked by hand, with a lime highlighter swipe under the phrase. That
gesture is the whole thesis. A two-person firm with no client roster can't lean on
a logo wall or a metrics bar, so it leans on the evidence of a person who has done
the work and is pointing at the part that counts.

The system is deliberately anti-two-things at once. It rejects the saturated
AI-startup look — no near-black grounds, no monospace, no purple-to-orange
gradients, no glow, no grid overlays — because that category is crowded and looking
different is itself an asset. It equally rejects professional-services beige: the
accountant-or-law-firm register that reads as safe and boring. What's left is a
narrow, warm middle: modern and clean, but restrained, with one confident green
doing the pointing and everything else staying quiet.

Density is generous throughout. Sections breathe at 80px, cards hold 28px of
internal air, and content columns cap at 768px for reading and 1024–1152px for
layout. Nothing floats — surfaces sit flat on their ground and change depth by
changing color, not by casting a shadow. The founders' faces appear in the first
viewport at equal size and eye-line, which is the single most load-bearing trust
device on the site and the reason the hero is a portrait ring rather than a
product shot.

**Key Characteristics:**
- Warm off-white paper ground (`#fbfcf5`), never pure white, never dark
- Light-weight (300) display type at large sizes, with tight tracking
- Instrument Serif italic as the editorial accent — the back half of a headline only
- One confident green (`#6cd689`) carrying every call to action
- Emphasis marked by hand (highlighter swipe), not by scale or weight
- Flat surfaces; depth is three stacked grounds, not elevation
- Faces over logos, names over metrics, boutique over venture scale

## Colors

Three families: a spring green that carries the brand, a warm fall family used as
support only, and a warm-tinted neutral set. Token names come from modernlife.com's
live CSS, kept verbatim because the naming is informative and the extraction is
documented.

### Primary

- **Forest Ink** (`#005924`): The dark ground. Price block, final call-to-action band,
  article closing band, selected filter chip. Also the hover color for inline links
  and the color of the serif step numerals. This is the site's "dark mode" — it is
  green, not black.
- **Signal Green** (`#118631`): Link color and nav-link hover. The one hue that means
  "this is clickable text."
- **Highlighter Lime** (`#6cd689`): The primary button background, and nothing else.
  Its scarcity is what makes it read as the action.
- **Pale Lime** (`#b6ebc4`): Button hover, and the inner halo behind the founder
  portrait. The button lightens toward this on hover.
- **Marker Lime** (`#f4ffb0`): The highlighter swipe only. A bright acid yellow-green
  laid as a band under the bottom 38% of a phrase.
- **Paper Sage** (`#eef2e4`): The alternating section ground and the Takeaway block
  background. Every second section sits on this so the page has rhythm without rules
  or borders.

### Secondary

The warm family is support, never structure. On Modern Life these tones are
illustration-only; using them as UI is a deliberate departure, rationed hard.

- **Brick** (`#bb4038`): Draft-badge text. Sparing emphasis only.
- **Tan** (`#f2e0ca`): The outer ring behind the founder portrait, at 60% opacity, and
  the draft-badge ground. Warmth behind a photograph.

### Neutral

- **Warm Paper** (`#fbfcf5`): The page ground and the fill of every content card.
- **Ink Black** (`#000000`): All headings and primary text.
- **Reading Ink** (`#23231f`): Long-form article body only — black softened barely, for
  17px text at 1.75 line-height. Headings inside articles stay pure black.
- **Quiet Gray** (`#7a7a7a`): Secondary text, leads, meta lines, captions. Carries most
  of the page's supporting copy.
- **Rule Gray** (`#e7e7e7`): Borders and dividers on the Warm Paper ground. On Paper Sage
  it all but disappears, so hairlines there are tinted from Forest Ink instead — 15% for a
  divider, 25% for a structural rule.
- **Disabled Gray** (`#aeaeae`): Disabled states.
- **White** (`#ffffff`): Text on the deep-green grounds. Never a background.

The unused tints in the palette file (`spring-bright-50`, `spring-light-25`,
`fall-vibrant`, `fall-bright`, `fall-light-50`, `fall-mute`, `ux-gray-1`) are reserve.
They are documented in the live style guide but carry no role yet; introducing one
means giving it a job here in the same change.

### Named Rules

**The One Green Rule.** Highlighter Lime (`#6cd689`) appears on primary buttons and
nowhere else. Every other green on a page is a ground, a link, or a marker. A second
element wearing the CTA green means the page now has two calls to action, which the
product forbids.

**The Never-White, Never-Black Ground Rule.** The light ground is Warm Paper
(`#fbfcf5`) and the dark ground is Forest Ink (`#005924`). Pure white exists only as
text on dark; pure black exists only as text. A `#ffffff` or `#000000` background is
always a defect.

**The Warm Ration Rule.** Fall tones only appear behind or beside a photograph, or on
a status badge. If a warm tone is carrying meaning a green could carry, it is wrong.

**The Ground-Tinted Hairline Rule.** A hairline is tinted from the ground it sits on —
Rule Gray on Warm Paper, a Forest Ink tint on Paper Sage. A hairline you have to hunt for
is not doing its job, and a hairline that fights its ground is not a hairline.

## Typography

**Display Font:** Manrope (with `system-ui, sans-serif`)
**Body Font:** Manrope (same family — one sans for everything)
**Accent Font:** Instrument Serif, italic, weight 400 (with `Georgia, serif`)

**Character:** A geometric sans set unusually light at large sizes, so headlines read
as calm statements rather than announcements — paired with a high-contrast serif
italic that shows up for exactly one phrase at a time. The pairing is the visual
equivalent of a plain speaker who leans in on the important clause.

### Hierarchy

- **Display** (300, 44px mobile / 60px desktop, 1.08, -0.025em): Page H1. Hero
  headline, article title, style-guide title. Always light weight — never bold.
- **Display accent** (Instrument Serif italic 400, 50px / 58px): The second line of the
  hero headline. Set slightly larger than the sans it follows so the optical weight
  matches.
- **Headline** (300, 30px / 36px, -0.025em): Section H2. Always contains an italic
  serif fragment.
- **Subhead** (300, 28px, -0.025em): The step below a section headline — an article H2, and
  the one emphasized column in the offer sequence. The only size between Headline and Title.
- **Title** (700, 18–20px): Card titles, founder names, objection questions, byline
  names. This is where bold lives.
- **Lead** (400, 18px, 1.625, Quiet Gray): The paragraph directly under a headline.
- **Body** (400, 16px, 1.625): Default running text. Content columns cap at 768px.
- **Prose** (400, 17px, 1.75, Reading Ink): Article body only. Article H2 is 28px and
  H3 is 21px, both at weight 400 with -0.02em tracking — the plugin's bold defaults
  are overridden so an article reads as the same document as the landing page.
- **Label** (600, 12–14px, Quiet Gray): Category, date, reading time, meta lines,
  captions.

### Named Rules

**The Back-Half Rule.** Instrument Serif italic takes the back half of a headline —
"Where it goes *from here*", "Fair *questions*" — never a whole line, and never with a
color shift. The accent is carried by font and italic alone. A fully-italic heading or
a colored italic breaks it.

**The Light-Heading Rule.** Size and weight move in opposite directions. Anything 30px
or larger is weight 300; bold (700) is reserved for 18–20px titles and names. A bold
40px heading has never appeared on this site and shouldn't.

**The Hand-Marked Emphasis Rule.** Importance is signaled by the highlighter swipe, not
by scale, weight, or color. One swiped phrase per page — a second one halves the value
of the first.

## Layout

A single centered column with three container widths, all with 24px gutters that open
to 40px above 640px:

- **1152px** (`max-w-6xl`) — nav, hero, footer. The widest thing on the site.
- **1024px** (`max-w-5xl`) — every content section on the homepage.
- **768px** (`max-w-3xl`) — the problem statement and all article content. Reading
  width.

Vertical rhythm is 80px between major sections, 56–64px for lighter ones. Card grids
are 3-up for the offer steps and 2-up for objections, founders, and the ladder,
collapsing to a single column below 640px. The hero is a two-column grid that stacks
below 768px, with a 64px gap.

Section identity comes from ground color, not from rules or containers: sections
alternate Warm Paper and Paper Sage down the page, with the two Forest Ink bands
(price block, final CTA) as the punctuation. There are no full-width horizontal rules
between sections — the color change does that work.

Breakpoints are Tailwind's defaults; only `sm` (640px) and `md` (768px) are actually
used. Nav collapses to a hamburger with a full-height overlay panel below 640px.

**The Two-Ground Alternation Rule.** Consecutive sections never share a ground. If a
new section lands next to one of the same color, it needs a different ground or it
needs to merge with its neighbor.

## Elevation & Depth

The system is flat by construction. Depth is expressed as three stacked grounds —
Warm Paper, Paper Sage, Forest Ink — and cards sit directly on them with no border and
no shadow. A card is legible because its fill differs from its ground, not because it
appears to hover.

Shadows exist as a rare lift, permitted only where an element must read as sitting
above a photograph. There is exactly one on the site today: the "Mike & Howard, MiHo
Partners" caption pill overlapping the founder portrait. A `ring-1` hairline in Rule
Gray is the alternative when an element sits on its own fill color and would otherwise
disappear.

### Shadow Vocabulary

- **Photo lift** (`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`):
  Only for an element overlapping an image. Never on a card, button, nav, or panel.
- **Hairline ring** (`box-shadow: 0 0 0 1px #e7e7e7`): Separates a surface from a ground
  of the same color. Structural, not decorative.

### Named Rules

**The Ground-Stacking Rule.** A section changes depth by changing its ground, never by
lifting off it. Three grounds is the whole vocabulary.

**The One Lift Rule.** A shadow needs a photograph under it. If nothing is overlapping
an image, there is no shadow.

## Shapes

Two radii, plus circles:

- **24px** (`rounded-3xl`) — anything holding content: offer cards, founder cards, the
  price block, the Takeaway block, article hero images.
- **16px** (`rounded-2xl`) — the lighter secondary cards (ladder items) and swatch tiles.
- **12px** (`rounded-xl`) — the optional post thumbnail.
- **6px** (`rounded-md`) — anything you click: buttons, filter chips, the hamburger tap
  target. Modern Life's buttons are a soft rounded rectangle, not a pill, and this
  follows that.
- **Full circle** — faces only. Founder avatars (44px in bylines, 80px in bios), the
  hero portrait ring, and the caption pill.

Borders are single hairlines, tinted from their ground, and they appear only where they
are doing structural work: above a listing row, above a byline block, around outline
buttons and unselected chips, and as the rules that carry the offer sequence and the
engagement list. Content cards never carry a border — their fill does the separating.

**The Two-Radius Rule.** 24px holds content, 6px gets clicked, circles hold faces.
Anything in between needs a reason stated where it's introduced.

## Components

### Buttons

- **Shape:** Soft rounded rectangle (6px), never a pill.
- **Primary:** Highlighter Lime fill with black text, 12px vertical and 14px horizontal
  padding, 15px semibold. Label is always "Book your audit" — this is the site's one
  call to action and its text does not vary by section.
- **Hover / Focus:** Background lightens to Pale Lime over a color transition. No lift,
  no scale, no shadow.
- **Secondary:** Transparent with a Rule Gray hairline border and black text, same
  padding. On hover both the border and text go Signal Green.
- **Inline text link:** Black or Quiet Gray text going Signal Green on hover, over a
  150ms transition. Inside article prose, links carry a Highlighter Lime underline at a
  3px offset and go Forest Ink on hover.

**The Hover-Lightens Rule.** The primary button lightens on hover. It never darkens, and
it never moves.

**The Color-Is-The-Signal Rule.** State changes are carried by color. Never opacity
alone, never underline alone, never transform, never shadow.

### Chips

- **Style:** 6px radius, 7px by 12px padding, 14px medium.
- **Selected:** Forest Ink fill, white text, no border.
- **Unselected:** Transparent with a Rule Gray border and Quiet Gray text; border and
  text both go Signal Green on hover.
- **Behavior:** Filters in place over a flat list. Only categories that have posts get a
  chip, and the chip row is hidden entirely when there's only one category in play — the
  filter never offers a choice that yields nothing.

### Cards / Containers

- **Corner Style:** 24px for content cards, 16px for lighter secondary cards.
- **Background:** Warm Paper on a Paper Sage section; Paper Sage on a Warm Paper section;
  Forest Ink for the two emphasis blocks.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** None on content cards.
- **Internal Padding:** 28px standard, 32px for the wide Forest Ink blocks, 24px for the
  lighter secondary cards.

### Rules and ruled lists

Structure without boxes, and the site's default answer whenever a section is a list or a
sequence. A card is the lazy container; a hairline does the same job with none of the
weight.

- **Segmented rule:** One hairline per column, aligned so they read as a single line broken
  at the column gaps. The breaks mark the beats, which is what lets the offer sequence drop
  its 01 / 02 / 03 entirely. Columns are equal, at one type size and one rule length: across
  a set read as a single line, any variation in width or size reads as a rendering bug rather
  than as emphasis. Emphasis in a set like this belongs in the copy, not the measurements.
  Desktop only — stacked on mobile the rules would read as the engagement list instead.
- **Ruled list:** Term left (roughly 19rem), description right (capped at 36rem), a hairline
  above every row and one closing the list, 28px of vertical padding per row. Marked up as a
  definition list, which is what it is. Used where the content is a menu rather than a
  sequence.

### Navigation

- **Style:** Transparent header on the page ground, 1152px wide, 28px vertical padding.
  Wordmark left ("MiHo" in extrabold sans, "Partners" in italic serif), four links
  center-right, primary button far right.
- **Links:** 14px medium black, going Signal Green on hover. Links are root-relative
  (`/#offer`, not `#offer`) so they work from an article page.
- **Mobile (below 640px):** Links and button collapse into a hamburger. The open panel is
  a fixed full-height Warm Paper overlay starting 84px from the top, with 24px links at
  weight 300 separated by Rule Gray hairlines, and a full-width primary button below
  them. Escape closes it and body scroll locks while it's open.

### Listing row

One row design shared by `/blog` and the homepage sampler, so the two can't drift apart.
Rule Gray hairline on top, 28px vertical padding. Meta line first (category in Forest
Ink semibold, then date and reading time in Quiet Gray, separated by middots), then a
20–24px light title that goes Signal Green on group hover, then the deck in italic
Instrument Serif at 18px in Quiet Gray, then the author name.

The thumbnail is optional and sits on the **trailing** edge at a fixed 128×96px,
hidden below 640px. Leading thumbnails would indent titles only on rows that have art,
leaving the list with a ragged left edge; trailing keeps every title aligned. The slot
collapses when absent — the row height stays fixed either way, and it is never a
reflowing masonry grid.

### Takeaway block

The one bespoke component in the article template, required in every article. A Paper
Sage panel at 24px radius with 28–36px padding, opening with an italic Instrument Serif
title at 24–30px in Forest Ink, holding two or three concrete actions. It inherits the
article's prose styling rather than defining its own.

### Signature devices

Three, and each is spent deliberately.

- **Highlighter swipe** (`.highlight-swipe`): A Marker Lime band filling the bottom 38%
  of a phrase, via a hard-stop linear gradient. Emphasis by hand rather than by scale.
  **One phrase per page.**
- **Guarantee sweep** (`.guarantee-shimmer`): A clipped-gradient band sliding through the
  letters on a 4s linear loop — ink, blue, red, orange, ink. **Reserved exclusively for
  the money-back guarantee.** A second use anywhere on the site destroys its meaning.
  Disabled under `prefers-reduced-motion`, falling back to solid text.
- **Scroll reveal** (`.reveal`, `.reveal-delay-1`, `.reveal-delay-2`): Sections fade in
  and rise 16px as they enter the viewport, via `animation-timeline: view()` — pure CSS,
  no JavaScript, no observer. Gated behind `@supports`, so browsers without scroll-driven
  animation render the final state immediately. Fail-visible, never fail-blank.

## Do's and Don'ts

### Do:

- **Do** ground every section in Warm Paper (`#fbfcf5`), Paper Sage (`#eef2e4`), or
  Forest Ink (`#005924`), alternating so consecutive sections never share one.
- **Do** set every heading 30px and up at weight 300 with -0.025em tracking, and end it
  with an Instrument Serif italic fragment.
- **Do** resolve every button and section to the single call to action, "Book your audit."
- **Do** use color as the only state signal — 150ms color transitions on hover, nothing
  that moves or lifts.
- **Do** keep content cards flat, borderless, and filled: 24px radius, 28px padding, fill
  contrasting with the section ground.
- **Do** cap reading columns at 768px and layout columns at 1024–1152px.
- **Do** add a `/designs` entry in the same change that introduces any new component,
  color, or device. Anything on the site not documented there is ad hoc.

### Don't:

- **Don't** use a pure white (`#ffffff`) or near-black background anywhere. White is
  text-on-dark; black is text.
- **Don't** reuse the guarantee gradient sweep on anything but the money-back guarantee,
  or the highlighter swipe more than once per page.
- **Don't** put Highlighter Lime (`#6cd689`) on anything but a primary button.
- **Don't** add shadows to cards, buttons, chips, or nav. A shadow requires a photograph
  underneath it.
- **Don't** reach for the saturated AI-startup register: near-black grounds,
  monospace or terminal type, purple-to-orange gradients, glow, or grid overlays. The
  warm fall family is admitted to the palette and is not covered by the gradient ban.
- **Don't** drift into the professional-services register either — stock office imagery,
  navy-and-gray, serif-authority letterhead.
- **Don't** introduce venture-scale trust devices: logo walls, client counts, award
  laurels, press bars, or enterprise mega-menus. This is a two-person firm and reads as
  one on purpose.
- **Don't** fabricate testimonials, client logos, or results. There are none yet, and
  the testimonial component is parked in `/designs` specifically because it needs real
  quotes.
- **Don't** number a list. 01 / 02 / 03 is decoration wearing a job title — reading order
  already carries sequence, and numbering a menu claims an order the copy doesn't have. If
  the slot genuinely needs to carry something, make it carry a fact.
- **Don't** wrap a list or a sequence in cards. Reach for a rule first; the card is what
  you fall back to when the content needs a ground of its own.
- **Don't** put a label above a value that announces what the value is ("PRICE" over
  "$399"). Delete the label.
- **Don't** set an italic serif heading in a color other than the surrounding text, or
  italicize a full line.
- **Don't** darken the primary button on hover, or animate it with transform.
