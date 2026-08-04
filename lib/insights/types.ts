/**
 * The category list is closed on purpose. Articles here are primarily
 * machine-written and nobody proofreads frontmatter, so a free-text category
 * field would quietly accumulate ghost categories ("Pricing " with a trailing
 * space, "AI Tools" with the wrong case). Adding a category is a deliberate
 * edit to this array.
 */
export const CATEGORIES = [
  "Time drains",
  "AI tools",
  "Operations",
  "Delegation & hiring",
  "Pricing",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type AuthorId = "mike" | "howard";

export type PostMeta = {
  title: string;
  /** One sentence stating the article's claim. Rendered in serif italic under the title. */
  deck: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  category: Category;
  author: AuthorId;
  /** Optional. Both the article template and the listing row render without it. */
  image?: string;
  /** Required whenever `image` is set. */
  imageAlt?: string;
  /** Visible in dev, excluded from production builds, the listing and the sitemap. */
  draft?: boolean;
};

export type PostSummary = PostMeta & {
  slug: string;
  readingMinutes: number;
};
