import Link from "next/link";

import { PostRow } from "@/app/components/PostRow";
import { getAllPosts } from "@/lib/blog/posts";

/**
 * Sits between the founders section and the ladder, so the page reads: who we
 * are, how we think, where this goes, book. It extends the founder proof rather
 * than interrupting the ladder-to-CTA run, which is the page's closing sequence.
 *
 * No CTA of its own — every section on this page resolves to the single audit CTA.
 */
export async function BlogSampler() {
  const posts = (await getAllPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="reveal mx-auto w-full max-w-5xl px-6 py-20 sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
          How we <span className="font-accent italic">think about it</span>
        </h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-foreground transition-colors hover:text-link"
        >
          Read all blog &rarr;
        </Link>
      </div>

      <div className="mt-8">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
