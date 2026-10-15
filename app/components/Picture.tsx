import type { ImageSet } from "../lib/images";
import { srcSetOf } from "../lib/images";

/**
 * <picture> AVIF + WebP (repli) à partir d'un jeu d'images locales, dimensions intrinsèques
 * déclarées (pas de CLS). `priority` = image LCP : fetchpriority="high", pas de lazy loading.
 * Le preload de l'image LCP est émis par la page serveur (React ne précharge pas automatiquement
 * une <img> placée dans un <picture>).
 */
export default function Picture({ set, alt, sizes, priority, title }: { set: ImageSet; alt: string; sizes: string; priority?: boolean; title?: string }) {
  const prio = priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const, decoding: "async" as const };
  return (
    <picture>
      <source type="image/avif" srcSet={srcSetOf(set.avif)} sizes={sizes} />
      <img
        src={set.fallback.src}
        srcSet={srcSetOf(set.webp)}
        sizes={sizes}
        width={set.fallback.width}
        height={set.fallback.height}
        alt={alt}
        title={title ?? set.credit.title}
        {...prio}
      />
    </picture>
  );
}
