import Link from "next/link";
import { format } from "date-fns";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogMeta } from "@/lib/blog-types";
import CoverImage from "./CoverImage";

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogMeta;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/resources/blog/${post.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-charcoal transition-colors hover:border-gold/40 ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <CoverImage
        src={post.coverImage}
        alt={post.title}
        className={`h-52 w-full ${featured ? "lg:h-auto lg:w-1/2" : ""}`}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-gold/15 px-3 py-1 font-heading font-semibold uppercase tracking-wide text-gold">
            {post.category}
          </span>
          <span className="text-gray-mid">
            {format(new Date(post.date), "MMM d, yyyy")}
          </span>
        </div>
        <h3
          className={`mt-3 font-heading font-bold text-white group-hover:text-gold ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-gray-light">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs text-gray-mid">
            <Clock className="h-3.5 w-3.5" /> {post.readTime}
          </span>
          <span className="inline-flex items-center gap-1 font-heading text-sm font-semibold uppercase tracking-wide text-gold">
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
