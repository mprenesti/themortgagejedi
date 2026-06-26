import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BlogList from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Mortgage Resources & Market Insights",
  description:
    "Educational articles to help you make smarter mortgage decisions, from The Mortgage Jedi, Mike Prenesti.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        label="Resources"
        title="Mortgage Resources & Market Insights"
        subtitle="Educational articles to help you make smarter mortgage decisions."
      />
      <div className="container-page py-16 sm:py-20">
        <BlogList posts={posts} />
      </div>
    </>
  );
}
