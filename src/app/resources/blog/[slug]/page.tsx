import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Clock, ArrowLeft } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CoverImage from "@/components/blog/CoverImage";
import BlogCard from "@/components/blog/BlogCard";
import ShareButtons from "@/components/blog/ShareButtons";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug, 3);
  const url = `${SITE.url}/resources/blog/${post.slug}`;

  return (
    <>
      <PageHero
        label={post.category}
        title={post.title}
        subtitle={
          <span className="inline-flex items-center gap-4 text-base">
            <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.readTime}
            </span>
          </span>
        }
      />

      <article className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-mid hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <CoverImage
            src={post.coverImage}
            alt={post.title}
            className="mt-6 h-64 w-full rounded-2xl sm:h-80"
          />

          {/* Author box */}
          <div className="mt-8 flex items-center gap-4 rounded-xl border border-white/10 bg-charcoal p-5">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/10 font-accent text-2xl text-gold">
              MP
            </span>
            <div>
              <p className="font-heading font-semibold text-white">
                Mike Prenesti — The Mortgage Jedi
              </p>
              <p className="text-sm text-gray-light">
                16 years helping Las Vegas homebuyers find the right loan. {SITE.nmls}.
              </p>
            </div>
          </div>

          <div className="prose prose-invert mt-10 max-w-none prose-headings:font-heading prose-headings:text-white prose-a:text-gold prose-strong:text-white prose-li:marker:text-gold">
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <ShareButtons url={url} title={post.title} />
          </div>

          <div className="mt-10 rounded-2xl border border-gold/30 bg-charcoal p-7 text-center">
            <h2 className="font-heading text-2xl font-bold text-white">
              Have questions about your situation?
            </h2>
            <p className="mt-2 text-gray-light">
              Let&apos;s talk it through — no pressure, no obligation.
            </p>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-5 inline-flex"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mx-auto mt-16 max-w-5xl">
            <h2 className="font-heading text-2xl font-bold text-white">
              Related Posts
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </>
  );
}
