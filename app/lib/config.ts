/**
 * Config du site Cledici (tenant client_03 de la factory GoodTime).
 * Lue depuis goodtime-api (/api/public/config, éditable dans l'admin) avec
 * FALLBACK local = le contenu actuel, pour que le site ne casse jamais.
 * On ne mappe ici que ce que les pages consomment réellement.
 */
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";
const TENANT = process.env.TENANT ?? "client_03";

export type SiteCfg = {
  brand?: { name?: string; tagline?: string; logo?: string };
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    ctaPrimary?: { label?: string; href?: string };
    ctaSecondary?: { label?: string; href?: string };
  };
  contact?: { email?: string; phone?: string; address?: string };
};

/** Contenu par défaut = état actuel du site (sert de fallback si l'API est down). */
export const FALLBACK: SiteCfg = {
  brand: { name: "Cledici Conciergerie", tagline: "Conciergerie Airbnb à Valmorel" },
  hero: {
    eyebrow: "Expert de l'habitat touristique de montagne depuis 2018",
    title: "Louez votre bien à Valmorel, sans contrainte — et maximisez vos revenus.",
    subtitle:
      "Vous êtes propriétaire d'un hébergement de vacances à Valmorel et ses environs ? Confiez-nous votre bien : nous en optimisons la rentabilité, y compris en période creuse. Diffusion sur les plus grandes plateformes, tarification dynamique, accueil des voyageurs, entretien et suivi de votre bien.",
    ctaPrimary: { label: "Estimer mes revenus", href: "#estimer" },
    ctaSecondary: { label: "Découvrir nos services", href: "#services" },
  },
};

export async function getConfig(): Promise<SiteCfg> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/public/config`, {
      headers: { "x-tenant": TENANT },
      cache: "no-store",
    });
    if (res.ok) {
      const { config } = (await res.json()) as { config?: SiteCfg };
      if (config?.hero?.title) return config;
    }
  } catch {
    /* fallback */
  }
  return FALLBACK;
}
