import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogMeta, BlogPost } from "./blog-types";

export type { BlogMeta, BlogPost } from "./blog-types";
export { BLOG_CATEGORIES } from "./blog-types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function parseFile(fileName: string): BlogPost {
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug =
    (data.slug as string) || fileName.replace(/\.mdx?$/, "");
  return {
    title: data.title ?? slug,
    slug,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    category: data.category ?? "Buyer Education",
    excerpt: data.excerpt ?? "",
    coverImage: data.coverImage,
    readTime: data.readTime ?? "5 min",
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  return readFiles()
    .map(parseFile)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, limit);
  const sameCategory = posts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = posts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
