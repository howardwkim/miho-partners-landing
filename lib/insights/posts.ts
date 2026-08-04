import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

import { AUTHOR_IDS } from "./authors";
import { CATEGORIES, type Category, type PostMeta, type PostSummary } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/insights");
const WORDS_PER_MINUTE = 200;

/**
 * Validate a post's exported `meta` at build time.
 *
 * A type annotation inside the .mdx file would look like it does this job, but
 * it doesn't: TypeScript never compiles .mdx, so the annotation is decorative
 * and @types/mdx hands us `any` at the import site. This function is the actual
 * guarantee. It runs inside generateStaticParams and the page renders, both of
 * which execute during `next build` — so a malformed post fails the build with
 * a message naming the file and the problem, rather than shipping a broken page.
 */
function assertPostMeta(value: unknown, slug: string): PostMeta {
  const where = `content/insights/${slug}.mdx`;
  const fail = (msg: string): never => {
    throw new Error(`${where}: ${msg}`);
  };

  if (typeof value !== "object" || value === null) {
    fail("must `export const meta = { ... }`");
  }

  const m = value as Record<string, unknown>;
  const str = (key: string): string =>
    typeof m[key] === "string" && m[key].trim() !== ""
      ? (m[key] as string)
      : fail(`meta.${key} is required and must be a non-empty string`);

  const title = str("title");
  const deck = str("deck");
  const date = str("date");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    fail(`meta.date must be YYYY-MM-DD, got "${date}"`);
  }

  const category = str("category");
  if (!(CATEGORIES as readonly string[]).includes(category)) {
    fail(`meta.category "${category}" is not one of: ${CATEGORIES.join(", ")}`);
  }

  const author = str("author");
  if (!(AUTHOR_IDS as string[]).includes(author)) {
    fail(`meta.author "${author}" is not one of: ${AUTHOR_IDS.join(", ")}`);
  }

  if (m.image !== undefined) {
    if (typeof m.image !== "string") fail("meta.image must be a string path when set");
    if (typeof m.imageAlt !== "string" || m.imageAlt.trim() === "") {
      fail("meta.imageAlt is required whenever meta.image is set");
    }
  }

  if (m.draft !== undefined && typeof m.draft !== "boolean") {
    fail("meta.draft must be a boolean when set");
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

/**
 * Word count off the raw source, minus the import and export lines so the
 * metadata block doesn't inflate the estimate.
 */
function readingMinutes(slug: string): number {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const prose = raw
    .replace(/^import\s[\s\S]*?$/gm, "")
    .replace(/^export const meta[\s\S]*?^};?$/m, "");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

type PostModule = { meta?: unknown; default: ComponentType };

function loadModule(slug: string): Promise<PostModule> {
  return import(`@/content/insights/${slug}.mdx`) as Promise<PostModule>;
}

/** Drafts are visible while developing and never in a production build. */
const showDrafts = process.env.NODE_ENV === "development";

export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await Promise.all(
    listSlugs().map(async (slug) => {
      const mod = await loadModule(slug);
      return {
        ...assertPostMeta(mod.meta, slug),
        slug,
        readingMinutes: readingMinutes(slug),
      };
    }),
  );

  return posts
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(
  slug: string,
): Promise<{ meta: PostSummary; Content: ComponentType } | null> {
  if (!listSlugs().includes(slug)) return null;

  const mod = await loadModule(slug);
  const meta = assertPostMeta(mod.meta, slug);
  if (meta.draft && !showDrafts) return null;

  return {
    meta: { ...meta, slug, readingMinutes: readingMinutes(slug) },
    Content: mod.default,
  };
}

/** Up to `limit` other published posts, newest first. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<PostSummary[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

export { formatDate } from "./format";
