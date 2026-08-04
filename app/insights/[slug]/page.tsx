import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BookButton } from "@/app/components/BookButton";
import { PostRow } from "@/app/components/PostRow";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteNav } from "@/app/components/SiteNav";
import { AUTHORS } from "@/lib/insights/authors";
import { formatDate } from "@/lib/insights/format";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/insights/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const { meta } = post;
  return {
    title: `${meta.title} — MiHo Partners`,
    description: meta.deck,
    authors: [{ name: AUTHORS[meta.author].name }],
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.deck,
      publishedTime: meta.date,
      images: meta.image ? [{ url: meta.image, alt: meta.imageAlt ?? meta.title }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { meta, Content } = post;
  const author = AUTHORS[meta.author];
  const related = await getRelatedPosts(slug);

  return (
    <div className="flex flex-col">
      <SiteNav />

      <main className="mx-auto w-full max-w-3xl px-6 pb-8 sm:px-10">
        <header className="reveal py-10 sm:py-14">
          <Link
            href="/insights"
            className="text-xs font-semibold text-deep transition-colors hover:text-link"
          >
            {meta.category}
          </Link>

          <h1 className="mt-4 text-[2.4rem] font-light leading-[1.1] tracking-tight sm:text-5xl">
            {meta.title}
          </h1>

          <p className="mt-5 font-accent text-2xl italic leading-snug text-muted sm:text-[1.75rem]">
            {meta.deck}
          </p>

          {/* Face and name carry the trust; the firm sits under it. No
              credential line — under every article it reads as selling. */}
          <div className="mt-8 flex items-center gap-4 border-t border-ux-gray-2 pt-6">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Image src={author.photo} alt={author.name} fill sizes="44px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold">{author.name}</div>
              <div className="text-sm text-muted">{author.affiliation}</div>
              <div className="mt-[2px] text-xs text-muted">
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                {" · "}
                {meta.readingMinutes} min read
              </div>
            </div>
          </div>
        </header>

        {meta.image ? (
          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-surface">
            <Image
              src={meta.image}
              alt={meta.imageAlt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="prose prose-miho max-w-none">
          <Content />
        </div>
      </main>

      {/* One CTA, the same one every other section of the site resolves to. */}
      <section className="reveal mt-8 bg-ink py-14 text-ink-foreground">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between gap-7 px-6 sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
              Want this done for <span className="font-accent italic">your business</span>?
            </h2>
            <p className="mt-3 max-w-md text-ink-foreground/80">
              The Time Saver Audit is $399. One 45-minute call, five hours a week back or your
              money back.
            </p>
          </div>
          <BookButton />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="reveal mx-auto w-full max-w-3xl px-6 py-14 sm:px-10">
          <h2 className="text-2xl font-light tracking-tight">
            More <span className="font-accent italic">insights</span>
          </h2>
          <div className="mt-6">
            {related.map((p) => (
              <PostRow key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </div>
  );
}
