export type BlogMeta = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  readTime: string;
};

export type BlogPost = BlogMeta & { content: string };

export const BLOG_CATEGORIES = [
  "All",
  "Buyer Education",
  "Market Pulse",
  "Product Spotlight",
  "Realtor Resources",
];
