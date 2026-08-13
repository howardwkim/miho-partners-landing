import type { Metadata } from "next";

import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteNav } from "@/app/components/SiteNav";
import { getAllPosts } from "@/lib/blog/posts";

import { BlogList } from "./BlogList";

export const metadata: Metadata = {
  title: "Blog — MiHo Partners",
  description:
    "Practical writing on where small businesses lose time, and what to do about it. From Mike Grabham and Howard Kim.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col">
      <SiteNav />

      <main className="mx-auto w-full max-w-4xl px-6 pb-16 sm:px-10">
        <header className="py-10 sm:py-14">
          <h1 className="text-[2.75rem] font-light leading-[1.08] tracking-tight sm:text-6xl">
            Blog
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            What we notice about where small businesses actually lose time &mdash; and what to do
            about it. Written by{" "}
            <span className="font-accent italic text-foreground">the two of us</span>, not a content
            team.
          </p>
        </header>

        <BlogList posts={posts} />
      </main>

      <SiteFooter />
    </div>
  );
}
