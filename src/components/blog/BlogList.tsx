"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { BlogMeta } from "@/lib/blog-types";
import BlogCard from "./BlogCard";
import { cn } from "@/lib/utils";

export default function BlogList({ posts }: { posts: BlogMeta[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  // Build the category filter from the categories actually present in the
  // posts (in first-appearance order), so new categories show up automatically.
  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];

  const q = query.trim().toLowerCase();

  const matches = posts.filter((p) => {
    const inCategory = category === "All" || p.category === category;
    const inQuery =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return inCategory && inQuery;
  });

  // Only show the big featured card in the default view (no search, all posts).
  const showFeatured = category === "All" && q === "";
  const featured = showFeatured ? matches[0] : null;
  const gridPosts = showFeatured ? matches.slice(1) : matches;

  return (
    <div>
      {/* Search articles */}
      <div className="relative mb-6 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-mid" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          aria-label="Search articles"
          className="w-full rounded-full border border-white/15 bg-black/60 py-3 pl-12 pr-4 text-white placeholder:text-gray-mid focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
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

      {featured ? (
        <div className="mt-10">
          <BlogCard post={featured} featured />
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gridPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {matches.length === 0 ? (
        <p className="mt-12 text-center text-gray-mid">
          {q
            ? `No articles match "${query}". Try a different search.`
            : "No posts in this category yet. Check back soon."}
        </p>
      ) : null}
    </div>
  );
}
