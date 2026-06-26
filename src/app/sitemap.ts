import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/loan-options",
    "/tools/calculator",
    "/tools/affordability",
    "/tools/rent-vs-buy",
    "/tools/checklist",
    "/resources/blog",
    "/resources/first-time-buyer-guide",
    "/resources/faq",
    "/testimonials",
    "/contact",
    "/get-started",
    "/second-opinion",
    "/realtor-partners",
    "/privacy-policy",
    "/terms",
  ];

  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE.url}/resources/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
