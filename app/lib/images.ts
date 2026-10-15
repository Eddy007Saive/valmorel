/**
 * Images locales de la home, rapatriées depuis Wikimedia Commons le 2026-10-14 (avant : thumbs JPEG
 * 1280 px chargés depuis upload.wikimedia.org, 358-406 Kio, sans cache, LCP mobile ~3,6 s).
 *
 * Fichiers sources dans `app/images/`, importés statiquement : Next les sert sous
 * `/_next/static/media/<nom>.<hash>.{avif,webp}` avec `Cache-Control: public, max-age=31536000, immutable`.
 *
 * ATTRIBUTION OBLIGATOIRE (licence CC BY-SA 4.0, auteur Florian Pépellin, « own work », 15/01/2022) :
 *  - https://commons.wikimedia.org/wiki/File:Domaine_de_Valmorel_et_Lauzi%C3%A8re_en_hiver_(janvier_2022).JPG
 *    (original 3264×2448, 4,8 Mo)
 *  - https://commons.wikimedia.org/wiki/File:Station_de_Valmorel_enneig%C3%A9e_vue_des_pistes_(janvier_2022).JPG
 *    (original 3100×2276, 4,6 Mo)
 *  Modifications : redimensionnement (640/960/1280/1920 px) et conversion AVIF q48 / WebP q66 avec sharp,
 *  sans recadrage. Le crédit est affiché sur la page (`.hero-credit`, `.zone .map .credit`) et répété
 *  dans l'attribut `title` de l'image. Ne pas retirer ces mentions.
 */
import type { StaticImageData } from "next/image";

import heroAvif640 from "../images/valmorel-lauziere-hiver-640.avif";
import heroAvif960 from "../images/valmorel-lauziere-hiver-960.avif";
import heroAvif1280 from "../images/valmorel-lauziere-hiver-1280.avif";
import heroAvif1920 from "../images/valmorel-lauziere-hiver-1920.avif";
import heroWebp640 from "../images/valmorel-lauziere-hiver-640.webp";
import heroWebp960 from "../images/valmorel-lauziere-hiver-960.webp";
import heroWebp1280 from "../images/valmorel-lauziere-hiver-1280.webp";
import heroWebp1920 from "../images/valmorel-lauziere-hiver-1920.webp";

import zoneAvif640 from "../images/station-valmorel-pistes-640.avif";
import zoneAvif960 from "../images/station-valmorel-pistes-960.avif";
import zoneAvif1280 from "../images/station-valmorel-pistes-1280.avif";
import zoneWebp640 from "../images/station-valmorel-pistes-640.webp";
import zoneWebp960 from "../images/station-valmorel-pistes-960.webp";
import zoneWebp1280 from "../images/station-valmorel-pistes-1280.webp";

export type ImageCredit = {
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  /** Mention courte affichée à l'écran. */
  label: string;
  /** Mention complète (attribut `title`). */
  title: string;
};

export type ImageCandidate = { src: string; width: number };

export type ImageSet = {
  /** Candidats AVIF, du plus petit au plus grand. */
  avif: ImageCandidate[];
  /** Candidats WebP (repli), du plus petit au plus grand. */
  webp: ImageCandidate[];
  /** `src` par défaut (navigateurs sans srcset) et dimensions intrinsèques déclarées. */
  fallback: StaticImageData;
  credit: ImageCredit;
};

const PEPELLIN = {
  author: "Florian Pépellin",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  label: "© Florian Pépellin · CC BY-SA 4.0 · Wikimedia Commons",
};

/**
 * Turbopack n'analyse pas les AVIF à l'import (`width` factice = 100) : les largeurs sont reprises
 * des WebP de même index, générés aux mêmes dimensions.
 */
function candidates(files: StaticImageData[], dims: StaticImageData[]): ImageCandidate[] {
  return files.map((f, i) => ({ src: f.src, width: dims[i].width }));
}

const HERO_WEBP = [heroWebp640, heroWebp960, heroWebp1280, heroWebp1920];
const ZONE_WEBP = [zoneWebp640, zoneWebp960, zoneWebp1280];

export const HERO_IMAGE: ImageSet = {
  avif: candidates([heroAvif640, heroAvif960, heroAvif1280, heroAvif1920], HERO_WEBP),
  webp: candidates(HERO_WEBP, HERO_WEBP),
  fallback: heroWebp1280,
  credit: {
    ...PEPELLIN,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Domaine_de_Valmorel_et_Lauzi%C3%A8re_en_hiver_(janvier_2022).JPG",
    title: "Domaine de Valmorel et Lauzière en hiver (janvier 2022) — photo Florian Pépellin, CC BY-SA 4.0, via Wikimedia Commons (redimensionnée et convertie)",
  },
};

export const ZONE_IMAGE: ImageSet = {
  avif: candidates([zoneAvif640, zoneAvif960, zoneAvif1280], ZONE_WEBP),
  webp: candidates(ZONE_WEBP, ZONE_WEBP),
  fallback: zoneWebp960,
  credit: {
    ...PEPELLIN,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Station_de_Valmorel_enneig%C3%A9e_vue_des_pistes_(janvier_2022).JPG",
    title: "Station de Valmorel enneigée vue des pistes (janvier 2022) — photo Florian Pépellin, CC BY-SA 4.0, via Wikimedia Commons (redimensionnée et convertie)",
  },
};

/** Crédit par défaut des deux photos (même auteur, même licence). */
export const CREDIT_DEFAULT = PEPELLIN.label;

/** `srcset` prêt à l'emploi pour une liste de candidats. */
export function srcSetOf(list: ImageCandidate[]): string {
  return list.map((i) => `${i.src} ${i.width}w`).join(", ");
}

/**
 * Les anciennes URLs Wikimedia (encore possibles dans la config GoodTime éditée en admin) sont
 * redirigées vers les jeux locaux : plus aucune requête vers upload.wikimedia.org.
 */
const WIKIMEDIA_SETS: [RegExp, ImageSet][] = [
  [/Domaine_de_Valmorel_et_Lauzi/i, HERO_IMAGE],
  [/Station_de_Valmorel_enneig/i, ZONE_IMAGE],
];

/**
 * Résout une URL d'image venant de la config : jeu local si l'URL est vide ou pointe vers l'une des
 * photos Wikimedia connues, sinon l'URL telle quelle (image personnalisée en admin).
 */
export function resolveImage(url: string | undefined | null, def: ImageSet): { set: ImageSet; src?: undefined } | { src: string; set?: undefined } {
  if (!url) return { set: def };
  const hit = WIKIMEDIA_SETS.find(([re]) => re.test(url));
  return hit ? { set: hit[1] } : { src: url };
}

/** Variante « une seule URL » (background-image, config texte) : WebP 960 px du jeu local. */
export function resolveImageUrl(url: string | undefined | null, def: ImageSet = HERO_IMAGE): string {
  const r = resolveImage(url, def);
  return r.set ? r.set.webp[1].src : r.src;
}
