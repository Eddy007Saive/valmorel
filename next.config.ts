import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inline le CSS dans le <head> : supprime la requête CSS render-blocking (LCP/FCP).
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
