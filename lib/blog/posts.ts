import fs from "node:fs";
import path from "node:path";
import { createElement, type ComponentType } from "react";
import * as jsxRuntime from "react/jsx-runtime";

import { compile, run } from "@mdx-js/mdx";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Takeaway } from "@/app/components/Takeaway";
import { AUTHOR_IDS } from "./authors";
import { CATEGORIES, type Category, type PostMeta, type PostSummary } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;

/** Components a post can use in its body without importing anything. */
const MDX_COMPONENTS = { Takeaway };

/**
 * Validate a post's YAML frontmatter at build time.
 *
 * Frontmatter is untyped by construction — TypeScript never sees inside an .mdx
 * file, and a YAML block carries no schema of its own. This function is the
 * whole guarantee. It runs during `next build`, so a malformed post fails the
 * build with a message naming the file and the problem rather than shipping a
 * broken page.
 *
 * The metadata lives in frontmatter rather than an exported object because that
 * is the format every content editor reads and writes, which is what lets the
 * browser editor and a hand-authored file produce byte-identical posts.
 */
function assertPostMeta(value: unknown, slug: string): PostMeta {
  const where = `content/blog/${slug}.mdx`;
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

/**
 * An absent or empty content directory means "no posts yet" — never an error.
 *
 * Article bodies are compiled from source at build time rather than imported as
 * modules, specifically so this stays true. A dynamic `import()` of a path built
 * from a slug forces the bundler to scan this directory up front, and an empty
 * directory then fails the whole build with an error naming this file rather
 * than the missing content. Compiling from disk removes that coupling: the
 * bundler never looks in here, so the site degrades to an empty listing instead
 * of refusing to build.
 */
function listSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

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

/** Compile one article body into a renderable component. */
async function compileBody(body: string, slug: string): Promise<ComponentType> {
  let MDXContent: ComponentType<{ components: typeof MDX_COMPONENTS }>;
  try {
    const compiled = await compile(body, {
      outputFormat: "function-body",
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    });
    ({ default: MDXContent } = await run(compiled, jsxRuntime as never));
  } catch (cause) {
    // Name the article. The raw MDX error points at a line in a string with no
    // filename, which reads like a bug in the site rather than in a post.
    throw new Error(`content/blog/${slug}.mdx: ${(cause as Error).message}`, { cause });
  }
  return function Content() {
    return createElement(MDXContent, { components: MDX_COMPONENTS });
  };
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

  const { meta, body } = readSource(slug);
  if (meta.draft && !showDrafts) return null;

  return {
    meta: { ...meta, slug, readingMinutes: readingMinutes(body) },
    Content: await compileBody(body, slug),
  };
}

/** Up to `limit` other published posts, newest first. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<PostSummary[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

export { formatDate } from "./format";
