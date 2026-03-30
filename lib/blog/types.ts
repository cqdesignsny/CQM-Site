export type BlogCategory =
  | "AI & Automation"
  | "Marketing Strategy"
  | "SEO & Search"
  | "Social Media"
  | "Web & Design"
  | "Business Growth";

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  category: BlogCategory;
  tags: string[];
  author: string;
  publishedAt: string; // ISO date string
  readTimeMinutes: number;
  featured: boolean;
}
