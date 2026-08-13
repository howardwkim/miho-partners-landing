import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

import matter from "gray-matter";

import { AUTHOR_IDS } from "./authors";
import { CATEGORIES, type Category, type PostMeta, type PostSummary } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/insights");
const WORDS_PER_MINUTE = 200;

/**
 * Validate a post's YAML frontmatter at build time.
 *
 * Frontmatter is untyped by construction — TypeScript never sees inside an .mdx
 * file, and a YAML block carries no schema of its own. This function is the
 * whole guarantee. It runs inside generateStaticParams and the page renders,
 * both of which execute during `next build`, so a malformed post fails the
 * build with a message naming the file and the problem rather than shipping a
 * broken page.
 *
 * The metadata deliberately lives in frontmatter rather than an exported
 * object: it is the format every content editor writes and reads, which is what
 * lets a browser-based editor and a hand-authored file produce byte-identical
 * posts. It also means metadata is readable off disk without importing (and so
 * compiling) every article, which is what the listing and the sitemap need.
 */
function assertPostMeta(value: unknown, slug: string): PostMeta {
  const where = `content/insights/${slug}.mdx`;
  const fail = (msg: string): never => {
    throw new Error(`${where}: ${msg}`);
  };

  if (typeof value !== "object" || value === null) {
    fail("must open with a YAML frontmatter block delimited by ---");
  }

  const m = value as Record<string, unknown>;
  const str = (key: string): string =>
    typeof m[key] === "string" && m[key].trim() !== ""
      ? (m[key] as string)
      : fail(`${key} is required and must be a non-empty string`);

  const title = str("title");
  const deck = str("deck");

  // YAML parses an unquoted 2026-08-13 into a Date, so accept both and
  // normalise. Quoted or not, the author gets the same result.
  const rawDate = m.date instanceof Date ? m.date.toISOString().slice(0, 10) : m.date;
  if (typeof rawDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    fail(`date must be YYYY-MM-DD, got "${String(m.date)}"`);
  }
  const date = rawDate as string;
  if (Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())) {
    fail(`date "${date}" is not a real date`);
  }

  const category = str("category");
  if (!(CATEGORIES as readonly string[]).includes(category)) {
    fail(`category "${category}" is not one of: ${CATEGORIES.join(", ")}`);
  }

  const author = str("author");
  if (!(AUTHOR_IDS as string[]).includes(author)) {
    fail(`author "${author}" is not one of: ${AUTHOR_IDS.join(", ")}`);
  }

  if (m.image !== undefined) {
    if (typeof m.image !== "string") fail("image must be a string path when set");
    if (typeof m.imageAlt !== "string" || m.imageAlt.trim() === "") {
      fail("imageAlt is required whenever image is set");
    }
  }

  if (m.draft !== undefined && typeof m.draft !== "boolean") {
    fail("draft must be a boolean when set");
  }

  return {
    title,
    deck,
    date,
    category: category as Category,
    author: author as PostMeta["author"],
    image: m.image as string | undefined,
    imageAlt: m.imageAlt as string | undefined,
    draft: m.draft as boolean | undefined,
  };
}

function listSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Frontmatter plus body, read straight off disk — no compile step involved. */
function readSource(slug: string): { meta: PostMeta; body: string } {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { meta: assertPostMeta(data, slug), body: content };
}

function readingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function summarize(slug: string): PostSummary {
  const { meta, body } = readSource(slug);
  return { ...meta, slug, readingMinutes: readingMinutes(body) };
}

type PostModule = { default: ComponentType };

/**
 * The compiled article body. Metadata never comes from here — see readSource.
 * The directory this resolves against must never be empty; an empty
 * content/insights/ makes this dynamic import unresolvable and fails the build.
 */
function loadModule(slug: string): Promise<PostModule> {
  return import(`@/content/insights/${slug}.mdx`) as Promise<PostModule>;
}

/** Drafts are visible while developing and never in a production build. */
const showDrafts = process.env.NODE_ENV === "development";

export async function getAllPosts(): Promise<PostSummary[]> {
  return listSlugs()
    .map(summarize)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(
  slug: string,
): Promise<{ meta: PostSummary; Content: ComponentType } | null> {
  if (!listSlugs().includes(slug)) return null;

  const meta = summarize(slug);
  if (meta.draft && !showDrafts) return null;

  const mod = await loadModule(slug);
  return { meta, Content: mod.default };
}

/** Up to `limit` other published posts, newest first. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<PostSummary[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

export { formatDate } from "./format";
