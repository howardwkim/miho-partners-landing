import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog/posts";

const BASE = "https://mihopartners.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  // /designs is the internal style guide — noindex, and deliberately absent here.
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
