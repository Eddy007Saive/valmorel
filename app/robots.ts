import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // On autorise explicitement les robots IA (référencement GEO).
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"], allow: "/" },
    ],
    sitemap: "https://cledici.fr/sitemap.xml",
    host: "https://cledici.fr",
  };
}
