import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The editor at /keystatic is entirely client-rendered, so it needs its JS to
  // actually load. Next blocks /_next/* dev requests from hosts it doesn't
  // recognize, which silently produces a blank page rather than an error.
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.0.118"],
  // .mdx files are imported as modules, never routed directly — posts live in
  // content/insights/ and render through app/insights/[slug]. The extensions are
  // still needed so the loader picks them up.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Plugins are named as strings, not imported. Turbopack runs the MDX
    // pipeline in Rust and can't be handed JavaScript functions, so anything
    // with non-serializable options is unusable here. All of these take none.
    //
    // remark-frontmatter only stops the leading --- block rendering as body
    // text; it does not expose the values. lib/insights/posts.ts parses that
    // same block off disk instead, because the listing and the sitemap need
    // every post's metadata without importing every post's component.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
