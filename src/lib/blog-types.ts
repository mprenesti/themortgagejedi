export type BlogFaq = { q: string; a: string };

export type BlogMeta = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  readTime: string;
  // Optional FAQ pairs. When present, the post page renders a FAQPage JSON-LD
  // block (the same pattern as the locations page). The text must match the
  // visible FAQ in the post body word for word.
  faqs?: BlogFaq[];
};

export type BlogPost = BlogMeta & { content: string };

export const BLOG_CATEGORIES = [
  "All",
  "Buyer Education",
  "Market Pulse",
  "Product Spotlight",
  "Realtor Resources",
];
