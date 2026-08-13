import { config, collection, fields } from "@keystatic/core";
import { wrapper } from "@keystatic/core/content-components";

import { AUTHOR_IDS } from "./lib/blog/authors";
import { CATEGORIES } from "./lib/blog/types";

/**
 * The browser editor for the blog section, at /keystatic.
 *
 * It is a second front door onto exactly the same files the repo already holds
 * — saving here commits an .mdx file to GitHub, the push deploys, and the
 * result is byte-compatible with a post written by hand or by an agent. That
 * equivalence is the whole point, and it is only possible because the site
 * reads its metadata from YAML frontmatter, which is what this editor writes.
 *
 * The field list below must stay in step with the build-time validator in
 * lib/blog/posts.ts. Where a value comes from a closed list, it is derived
 * from the same constant the validator checks against rather than retyped, so
 * the two cannot drift.
 */
export default config({
  storage: {
    kind: "github",
    repo: "howardwkim/miho-partners-landing",
  },
  ui: {
    brand: { name: "MiHO Partners" },
  },
  collections: {
    blog: collection({
      label: "Blog",
      path: "content/blog/*",
      slugField: "title",
      format: { contentField: "content" },
      columns: ["title", "date", "author"],
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "Sentence case. Becomes the page heading and the browser tab title.",
            validation: { isRequired: true },
          },
          slug: {
            label: "URL slug",
            description:
              "The published address: mihopartners.com/blog/<slug>. Never change it after publishing — the old link dies.",
          },
        }),
        deck: fields.text({
          label: "Deck",
          description:
            "One sentence stating the article's claim. Shows under the title, and doubles as the search-result description.",
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: "Date",
          description: "Sorts the listing and prints under the byline.",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Category",
          description: "Fixed list. Adding one is a code change, not an editorial choice.",
          options: CATEGORIES.map((c) => ({ label: c, value: c })),
          defaultValue: CATEGORIES[0],
        }),
        author: fields.select({
          label: "Author",
          description:
            "Who actually wrote it — this sets the byline name and photo. Not whose turn it is.",
          options: AUTHOR_IDS.map((id) => ({
            label: id === "mike" ? "Mike Grabham" : "Howard Kim",
            value: id,
          })),
          defaultValue: AUTHOR_IDS[0],
        }),
        image: fields.image({
          label: "Header image",
          description: "Optional. Most posts have none.",
          directory: "public/blog",
          publicPath: "/blog/",
        }),
        imageAlt: fields.text({
          label: "Image description",
          description: "Required whenever a header image is set. Describe what the image shows.",
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Checked means it is not published — invisible on the live site.",
          defaultValue: true,
        }),
        content: fields.mdx({
          label: "Article",
          description: "The article body. Start headings at level 2 — the title is level 1.",
          options: {
            image: { directory: "public/blog", publicPath: "/blog/" },
          },
          components: {
            // wrapper, not block: Takeaway holds the article's own markdown as
            // children. A block carries only its schema fields, and parsing an
            // existing post fails with "mdxJsxFlowElement has unexpected
            // children".
            Takeaway: wrapper({
              label: "Takeaway",
              description:
                "The concrete two or three things a reader should do. Every article carries exactly one, near the end.",
              schema: {
                title: fields.text({
                  label: "Heading",
                  description: "Leave blank for the default, “What to do about it”.",
                }),
              },
            }),
          },
        }),
      },
    }),
  },
});
