#!/usr/bin/env node
/**
 * Pre-publish check for one article: `pnpm check-post <slug>`
 *
 * Answers the two questions the publishing skill has to answer before pushing,
 * and answers them in one command that behaves the same on Windows and macOS.
 *
 *   1. Will this article break the site? Article metadata is validated during
 *      the build, and a bad value fails the WHOLE build — so the site stops
 *      updating for everyone, not just this page.
 *   2. Did the "What to do about it" box actually render? A malformed one does
 *      not fail the build. It publishes, and just comes out wrong.
 *
 * This wraps the standard `next build`; it does not replace or reconfigure it.
 * Everything after the build is reading a file off disk. The point of owning
 * this is the output: whoever runs it gets a sentence they can act on rather
 * than a stack trace to forward to someone else.
 *
 * Written in Node with no shell commands on purpose. The skill previously ran
 * `next build`, then `next start`, then `curl | grep`, then had to stop the
 * server — a sequence that only works on macOS and leaves an orphaned process
 * holding port 3000 on Windows.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content/blog");

/** Exit codes: 0 pass, 1 the article needs fixing, 2 the check itself broke. */
const PASS = 0;
const ARTICLE_PROBLEM = 1;
const CHECK_BROKEN = 2;

function say(...lines) {
  console.log(lines.join("\n"));
}

function listSlugs() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") && f !== "_template.mdx")
    .map((f) => f.replace(/\.mdx$/, ""));
}

function fail(code, headline, ...detail) {
  say("", `FAILED — ${headline}`, ...detail.filter(Boolean), "");
  process.exit(code);
}

// ---------------------------------------------------------------- the article

const slug = process.argv[2];

if (!slug) {
  const available = listSlugs();
  fail(
    CHECK_BROKEN,
    "no article named.",
    "Usage: pnpm check-post <slug>",
    available.length ? `Articles present: ${available.join(", ")}` : "No articles exist yet.",
  );
}

const articlePath = path.join(CONTENT_DIR, `${slug}.mdx`);

if (!fs.existsSync(articlePath)) {
  const available = listSlugs();
  fail(
    CHECK_BROKEN,
    `there is no article called "${slug}".`,
    `Looked for: content/blog/${slug}.mdx`,
    available.length ? `Articles present: ${available.join(", ")}` : "No articles exist yet.",
  );
}

// Read the draft flag before building. A draft is deliberately excluded from a
// production build, so its page is never generated — without knowing that up
// front, the render check below would report a missing page as a failure.
let isDraft = false;
try {
  isDraft = matter(fs.readFileSync(articlePath, "utf8")).data.draft === true;
} catch (error) {
  fail(
    ARTICLE_PROBLEM,
    "the article's metadata block could not be read.",
    `The block at the top of content/blog/${slug}.mdx, between the --- lines, is not valid.`,
    `Details: ${error.message}`,
  );
}

say(`Checking "${slug}"${isDraft ? " (currently a draft)" : ""}...`);

// ------------------------------------------------------------------ the build

// Invoke Next's JS entry point through this same Node binary rather than the
// `next` shim. The shim is a .cmd/.ps1 pair on Windows whose behaviour depends
// on the calling shell; a .js file run by node behaves identically everywhere.
const nextBin = path.join(ROOT, "node_modules/next/dist/bin/next");

if (!fs.existsSync(nextBin)) {
  fail(
    CHECK_BROKEN,
    "the site's dependencies are not installed.",
    "Run this first, then try again:  pnpm install",
  );
}

const build = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: ROOT,
  encoding: "utf8",
  env: { ...process.env, NODE_ENV: "production" },
});

if (build.error) {
  fail(CHECK_BROKEN, "the build could not be started.", `Details: ${build.error.message}`);
}

const buildOutput = `${build.stdout ?? ""}${build.stderr ?? ""}`;

if (build.status !== 0) {
  // posts.ts already writes plain-language validation errors prefixed with the
  // article's path. Surface that line by itself when present — the surrounding
  // stack trace is noise to whoever is publishing.
  const validation = buildOutput
    .split("\n")
    .map((line) => line.trim())
    .find((line) => /^(Error:\s*)?content\/blog\/.+\.mdx:/.test(line));

  if (validation) {
    fail(
      ARTICLE_PROBLEM,
      "the article's metadata is not valid.",
      validation.replace(/^Error:\s*/, ""),
      "Fix that value and run this again. Nothing has been pushed.",
    );
  }

  fail(
    ARTICLE_PROBLEM,
    "the site did not build.",
    "The build output is below. If it names a file you did not touch, someone",
    "else's article is broken — pull the latest changes and try again.",
    "",
    buildOutput.trim(),
  );
}

// ------------------------------------------------------------- what rendered

if (isDraft) {
  say(
    "",
    "PASSED — the article is valid and the site builds.",
    "",
    'It is still marked a draft, so no page was generated — that is expected, not a problem.',
    'The "What to do about it" box can only be checked once draft is set to false.',
    "",
  );
  process.exit(PASS);
}

const renderedPath = path.join(ROOT, ".next/server/app/blog", `${slug}.html`);

if (!fs.existsSync(renderedPath)) {
  fail(
    CHECK_BROKEN,
    "the build succeeded but produced no page for this article.",
    `Expected: .next/server/app/blog/${slug}.html`,
    "This is unexpected — the article is not a draft and the build passed.",
  );
}

const html = fs.readFileSync(renderedPath, "utf8");

// Match the box by its markup rather than its heading text: the heading is
// overridable per article, the wrapper's classes are set in one place
// (app/components/Takeaway.tsx) and are the same for every article.
const hasTakeaway = /<aside[^>]*\bbg-surface\b[^>]*>/.test(html);

if (!hasTakeaway) {
  fail(
    ARTICLE_PROBLEM,
    'the "What to do about it" box did not render.',
    "The build passed, so this would publish and simply come out wrong.",
    "Usual cause: no blank line above or below the <Takeaway> block in the article.",
  );
}

say(
  "",
  "PASSED — safe to publish.",
  "  · the article's metadata is valid and the whole site builds",
  '  · the "What to do about it" box rendered',
  "",
);
process.exit(PASS);
