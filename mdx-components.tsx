import type { MDXComponents } from "mdx/types";

import { Takeaway } from "./app/components/Takeaway";

/**
 * Required by @next/mdx under the App Router — the plugin will not work without
 * this file at the project root.
 *
 * Element styling is handled by the `prose prose-miho` wrapper on the article
 * body rather than by overriding tags here, so this map carries only the custom
 * components a post can use without importing them.
 */
const components: MDXComponents = {
  Takeaway,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
