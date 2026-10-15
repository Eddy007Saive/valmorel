import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Inline le CSS dans le <head> : supprime la requête CSS render-blocking (LCP/FCP).
  experimental: {
    inlineCss: true,
  },
  // Build en webpack (package.json : `next build --webpack`) : sur Hostinger,
  // Turbopack echoue a lancer ses processus Node annexes (PostCSS, loaders :
  // "creating new process / node process exited before we could connect",
  // 15/10/2026), y compris sans aucune regle personnalisee. webpack traite
  // PostCSS en interne. Meme choix que sur les autres sites du client.
  webpack: (config, { webpack }) => {
    // Audit Lighthouse "Ancien JavaScript" : Next.js embarque d'office
    // polyfill-module (Array.prototype.at/flat/flatMap, Object.fromEntries/hasOwn,
    // trimStart/trimEnd...), tous Baseline depuis Safari 15.4. Remplace par un
    // module vide. A retirer si un support iOS < 15.4 devient necessaire.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /[\/]polyfills[\/]polyfill-module$/,
        path.join(process.cwd(), "lib", "empty-module.js")
      )
    );
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  // 2026-10-15 : Google avait indexé /blog/hivernage-chalet-valmorel (404 depuis
  // le renommage du slug), signalé par ChatSEO (GSC) — aucun lien interne ne
  // pointe vers l'ancienne URL, donc probablement une diffusion externe ou un
  // ancien sitemap. Même article sous le bon slug.
  async redirects() {
    return [
      {
        source: "/blog/hivernage-chalet-valmorel",
        destination: "/blog/hivernage-chalet-valmorel-guide-anticipation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
