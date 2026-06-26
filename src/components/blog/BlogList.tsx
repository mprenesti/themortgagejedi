"use client";

import { useState } from "react";
import type { BlogMeta } from "@/lib/blog-types";
import { BLOG_CATEGORIES } from "@/lib/blog-types";
import BlogCard from "./BlogCard";
import { cn } from "@/lib/utils";

export default function BlogList({ posts }: { posts: BlogMeta[] }) {
  const [category, setCategory] = useState("All");

  const featured = posts[0];
  const rest = posts.slice(1);

  const filtered =
    category === "All"
      ? posts
      : posts.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-4 py-2 font-heading text-sm font-medium uppercase tracking-wide transition-colors",
              category === cat
                ? "border-gold bg-gold text-black"
                : "border-white/15 text-gray-light hover:border-gold/50 hover:text-gold",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {category === "All" && featured ? (
        <div className="mt-10">
          <BlogCard post={featured} featured />
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(category === "All" ? rest : filtered).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-gray-mid">
          No posts in this category yet. Check back soon.
        </p>
      ) : null}
    </div>
  );
}
