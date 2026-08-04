"use client";

import { useMemo, useState } from "react";

import { PostRow } from "@/app/components/PostRow";
import type { Category, PostSummary } from "@/lib/insights/types";

type Filter = Category | "All";

/**
 * Chips over a sidebar, filtering in place over a flat list. No per-category
 * routes: at this post count they'd be near-empty landing pages, and every one
 * would need its own copy to not read as an error state.
 *
 * Only categories that actually have posts get a chip, so the filter never
 * offers a choice that yields nothing.
 */
export function InsightsList({ posts }: { posts: PostSummary[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const used = useMemo(() => {
    const seen = new Set<Category>();
    for (const p of posts) seen.add(p.category);
    return [...seen];
  }, [posts]);

  const shown = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const chips: Filter[] = ["All", ...used];

  if (posts.length === 0) {
    return <p className="border-t border-ux-gray-2 py-10 text-muted">Nothing published yet.</p>;
  }

  return (
    <div>
      {used.length > 1 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {chips.map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`rounded-md px-3 py-[7px] text-sm font-medium transition-colors ${
                  active
                    ? "bg-ink text-ink-foreground"
                    : "border border-ux-gray-2 text-muted hover:border-link hover:text-link"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      ) : null}

      <div>
        {shown.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
