import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inline le CSS dans le <head> : supprime la requête CSS render-blocking (LCP/FCP).
  experimental: {
    inlineCss: true,
  },
  // Retire le module de polyfills injecté par Next (Array.prototype.at/flat/flatMap, Object.fromEntries/
  // hasOwn, trimStart/trimEnd...) : tous Baseline depuis Safari 15.4, inutiles avec le browserslist du
  // projet (safari >= 16.4), signalés par Lighthouse en « Ancien JavaScript » (17,7 Kio).
  // (resolveAlias ne s'applique pas : le module est chargé par un require relatif dans
  // next/dist/client/app-globals.js ; on vide donc le fichier lui-même via un loader.)
  turbopack: {
    rules: {
      "*.js": {
        condition: { path: new RegExp("node_modules/next/dist/build/polyfills/polyfill-module[.]js$") },
        loaders: ["./lib/empty-loader.js"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
