import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { getGuideSlugs } from "@/lib/guides";

// Build-time only. Reading content/blog at runtime on Vercel ISR left the
// sitemap with static routes and no posts, because those MDX files are not
// in the serverless bundle. force-static keeps generation in `next build`,
// when the files are on disk. New dated posts enter the sitemap on the next
// deploy, not at 8 AM Pacific by themselves.
export const dynamic = "force-static";

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
    "/guides",
    "/apply",
    "/locations",
    "/locations/nevada/las-vegas",
    "/locations/nevada/henderson",
    "/locations/nevada/summerlin",
    "/locations/nevada/north-las-vegas",
    "/locations/nevada/reno",
    "/locations/nevada/pahrump",
    "/testimonials",
    "/contact",
    "/get-started",
    "/second-opinion",
    "/home-value",
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

  const guides: MetadataRoute.Sitemap = getGuideSlugs().map((slug) => ({
    url: `${SITE.url}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts, ...guides];
}
