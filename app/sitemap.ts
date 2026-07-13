import type { MetadataRoute } from "next";
import { CITIES } from "./lib/cities";
import { ARTICLES } from "./lib/articles";

const BASE = "https://cledici.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/securite-reglementation", "/nos-interventions", "/blog"];
  const entries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  for (const c of CITIES) {
    entries.push({ url: `${BASE}/conciergerie/${c.slug}`, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const a of ARTICLES) {
    entries.push({ url: `${BASE}/blog/${a.slug}`, lastModified: a.date, changeFrequency: "monthly", priority: 0.6 });
  }
  return entries;
}
