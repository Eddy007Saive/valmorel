import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inline le CSS dans le <head> : supprime la requête CSS render-blocking (LCP/FCP).
  experimental: {
    inlineCss: true,
  },
  // Polyfills Next.js (audit Lighthouse "Ancien JavaScript", non note) : la regle
  // Turbopack avec loader local qui les retirait fait planter le build sur
  // Hostinger ("evaluate_webpack_loader failed - creating new process",
  // 15/10/2026). Retiree ; a reprendre avec `next build --webpack` +
  // NormalModuleReplacementPlugin si on y tient (voir guide Lighthouse).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
