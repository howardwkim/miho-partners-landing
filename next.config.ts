import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // .mdx files are imported as modules, never routed directly — posts live in
  // content/insights/ and render through app/insights/[slug]. The extensions are
  // still needed so the loader picks them up.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Plugins are named as strings, not imported. Turbopack runs the MDX
    // pipeline in Rust and can't be handed JavaScript functions, so anything
    // with non-serializable options is unusable here. Both of these take none.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
