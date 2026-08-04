import Image from "next/image";
import Link from "next/link";

import { AUTHORS } from "@/lib/insights/authors";
import { formatDate } from "@/lib/insights/format";
import type { PostSummary } from "@/lib/insights/types";

/**
 * One row in the listing, reused by the homepage sampler so there is a single
 * row design rather than two that drift apart.
 *
 * Images are optional per post, so the thumbnail slot is fixed-size and either
 * filled or collapsed — never a reflowing grid that looks broken when half the
 * posts have art and half don't.
 */
export function PostRow({ post }: { post: PostSummary }) {
  const author = AUTHORS[post.author];

  return (
    <article className="group border-t border-ux-gray-2 py-7">
      {/* Thumbnail sits on the trailing edge, not the leading edge. Images are
          optional per post, and a leading thumbnail indents the title only on
          rows that have one — which leaves the list with a ragged left edge.
          Trailing keeps every title aligned whether or not there's art. */}
      <Link href={`/insights/${post.slug}`} className="flex items-start gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="font-semibold text-deep">{post.category}</span>
            <span aria-hidden>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>&middot;</span>
            <span>{post.readingMinutes} min read</span>
            {post.draft ? (
              <span className="rounded bg-warm px-2 py-[2px] font-semibold text-warm-deep">
                Draft
              </span>
            ) : null}
          </div>

          <h3 className="mt-2 text-xl font-light tracking-tight transition-colors group-hover:text-link sm:text-2xl">
            {post.title}
          </h3>

          <p className="mt-2 max-w-2xl font-accent text-lg italic leading-snug text-muted">
            {post.deck}
          </p>

          <p className="mt-3 text-sm text-muted">{author.name}</p>
        </div>

        {post.image ? (
          <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-surface sm:block">
            <Image
              src={post.image}
              alt={post.imageAlt ?? ""}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        ) : null}
      </Link>
    </article>
  );
}
