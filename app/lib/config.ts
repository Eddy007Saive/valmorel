/**
 * Config du site Cledici (tenant client_03 de la factory GoodTime).
 * Lue depuis goodtime-api (/api/public/config, éditable dans l'admin) avec
 * FALLBACK local = le contenu actuel, pour que le site ne casse jamais.
 * On ne pilote que le TEXTE éditable (titres, intros, stats, avis, FAQ, CTA), * le design/structure (icônes SVG, graphique d'occupation, images) reste en code.
 */
import { CITIES, type City } from "./cities";
import { CITY_CONTENT } from "./cityContent";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";
const TENANT = process.env.TENANT ?? "client_03";

export type CityCfg = City & { content?: string };
/** Villes locales enrichies du contenu éditorial → fallback des pages villes. */
const LOCAL_CITIES: CityCfg[] = CITIES.map((c) => ({ ...c, content: CITY_CONTENT[c.slug] ?? "" }));

type TT = { title: string; text: string };

export type HomeCfg = {
  stats: { n: string; l: string }[];
  benefits: { eyebrow: string; title: string; intro: string; items: TT[] };
  season: { eyebrow: string; title: string; intro: string; card1: { tag: string } & TT; card2: { tag: string } & TT; note: string };
  services: { eyebrow: string; title: string; items: TT[]; image?: string };
  insurance: { eyebrow: string; title: string; intro: string; figs: { v: string; l: string }[] };
  expertise: { eyebrow: string; title: string; text1: string; text2: string; cta: string; image?: string };
  approach: { eyebrow: string; title: string; intro: string; steps: TT[] };
  avis: { eyebrow: string; title: string; items: { author: string; place: string; text: string }[] };
  zone: { eyebrow: string; title: string; intro: string; image?: string; credit?: string };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  final: { eyebrow: string; title: string; intro: string; points: string[]; image?: string };
};

export type SiteCfg = {
  brand?: { name?: string; tagline?: string; logo?: string };
  hero?: {
    eyebrow?: string; title?: string; subtitle?: string; image?: string; credit?: string;
    ctaPrimary?: { label?: string; href?: string };
    ctaSecondary?: { label?: string; href?: string };
  };
  home?: HomeCfg;
  interventions?: { eyebrow?: string; title?: string; intro?: string; cta?: string };
  reglementation?: { eyebrow?: string; title?: string; intro?: string; cta?: string; disclaimer?: string; faq?: { q: string; a: string }[] };
  cities?: CityCfg[];
  popup?: { enabled?: boolean | string; eyebrow?: string; title?: string; hint?: string; delaySeconds?: number | string; frequencyDays?: number | string };
  contact?: { email?: string; phone?: string; address?: string };
};

/** Contenu par défaut = état actuel du site (fallback si l'API est down). */
export const FALLBACK: Required<Pick<SiteCfg, "brand" | "hero" | "home" | "interventions" | "reglementation" | "cities" | "popup">> = {
  cities: LOCAL_CITIES,
  popup: {
    enabled: true,
    eyebrow: "Offre propriétaires",
    title: "Estimez gratuitement vos revenus à Valmorel",
    hint: "Gratuit et sans engagement, un expert local vous recontacte sous 24 h.",
    delaySeconds: 6,
    frequencyDays: 7,
  },
  interventions: {
    eyebrow: "Nos interventions",
    title: "Valmorel & Le Grand Domaine.",
    intro: "Nous gérons les locations saisonnières sur l'ensemble de la station de Valmorel et des communes reliées au Grand Domaine. Choisissez votre commune.",
    cta: "Estimer les revenus de mon bien",
  },
  reglementation: {
    eyebrow: "Sécurité & réglementation",
    title: "Réglementation des meublés de tourisme à Valmorel.",
    intro: "Déclaration, classement, taxe de séjour, assurance : tout ce qu'un propriétaire doit savoir pour louer sereinement à Valmorel (commune des Avanchers-Valmorel, Savoie). Cledici prend en charge l'ensemble des démarches.",
    cta: "Faire estimer et mettre en conformité mon bien",
    disclaimer: "Informations à jour 2026, vérifiées auprès des sources officielles (Mairie des Avanchers-Valmorel, Office de Tourisme de Valmorel, CCVA). À titre indicatif, pour un audit personnalisé, contactez-nous.",
    faq: [
      { q: "Faut-il déclarer son meublé de tourisme à Valmorel ?", a: "Oui. Toute location de meublé de tourisme doit être déclarée à la mairie des Avanchers-Valmorel (formulaire Cerfa n°14004*04 ou service en ligne Declaloc). La mairie délivre un récépissé qui vaut preuve de déclaration." },
      { q: "Quelle taxe de séjour pour un meublé non classé à Valmorel ?", a: "Pour un hébergement non classé, la taxe de séjour est de 5 % du prix de la nuitée par personne, plafonnée à 4,60 €, à laquelle s'ajoute la majoration départementale de 10 % (Savoie)." },
      { q: "Pourquoi faire classer son meublé à Valmorel ?", a: "Depuis la réforme (loi Le Meur, revenus 2025), le classement (valable 5 ans) donne droit à un abattement micro-BIC de 50 % au lieu de 30 %, à une taxe de séjour à tarif fixe (souvent plus avantageuse), à la commercialisation via l'Office de Tourisme et à l'éligibilité ANCV." },
      { q: "Cledici s'occupe-t-il des démarches ?", a: "Oui. Déclaration en mairie, dossier de classement, taxe de séjour et mise en conformité : nous prenons en charge l'ensemble des démarches pour votre bien à Valmorel." },
    ],
  },
  brand: { name: "Cledici Conciergerie", tagline: "Conciergerie Airbnb à Valmorel" },
  hero: {
    eyebrow: "Expert de l'habitat touristique de montagne depuis 2018",
    title: "Louez votre bien à Valmorel, sans contrainte, et maximisez vos revenus.",
    subtitle:
      "Vous êtes propriétaire d'un hébergement de vacances à Valmorel et ses environs ? Confiez-nous votre bien : nous en optimisons la rentabilité, y compris en période creuse. Diffusion sur les plus grandes plateformes, tarification dynamique, accueil des voyageurs, entretien et suivi de votre bien.",
    ctaPrimary: { label: "Estimer mes revenus", href: "#estimer" },
    ctaSecondary: { label: "Découvrir nos services", href: "#services" },
  },
  home: {
    stats: [
      { n: "2018", l: "Experts de la montagne depuis" },
      { n: "4,9/5", l: "Satisfaction propriétaires" },
      { n: "100 %", l: "Gestion déléguée" },
      { n: "24 h", l: "Réponse à votre demande" },
    ],
    benefits: {
      eyebrow: "Pourquoi nous confier votre bien",
      title: "La montagne a ses codes. Nous les maîtrisons.",
      intro: "Saisons, vacances scolaires, attentes des vacanciers : nous optimisons chaque détail pour des revenus maximisés et des voyageurs conquis.",
      items: [
        { title: "Revenus optimisés 12 mois", text: "Tarification dynamique en haute saison et remplissage des périodes creuses : on optimise toute l'année." },
        { title: "Zéro contrainte", text: "Annonce, réservations, accueil, ménage, linge : nous nous occupons de tout, à votre place." },
        { title: "Voyageurs 5★", text: "Accueil soigné des voyageurs, linge hôtelier et réactivité : des avis qui font venir plus de réservations." },
        { title: "Entretien & hivernage", text: "Maintenance, déneigement, suivi du logement même hors saison : votre bien est entre de bonnes mains." },
      ],
    },
    season: {
      eyebrow: "Optimisation saisonnière",
      title: "Des revenus toute l'année, pas seulement l'hiver.",
      intro: "La haute saison fait le gros des revenus. Mais ce sont les périodes creuses qui font la différence sur l'année, et c'est exactement là que nous faisons la différence.",
      card1: { tag: "Haute saison · Hiver", title: "Chaque nuit valorisée au maximum", text: "Tarification dynamique calée sur les vacances scolaires, les ponts et les pics d'affluence. On capte le plein potentiel des semaines les plus demandées, sans jamais sous-vendre votre bien." },
      card2: { tag: "Basse & inter-saison · Printemps · Été · Automne", title: "On remplit les périodes à faible taux d'occupation", text: "Randonnée, VTT, trail, événements, courts séjours et télétravail à la montagne : on active la demande hors-saison pour que votre bien ne dorme jamais. Des revenus sur 12 mois, pas sur 4." },
      note: "Illustration. Notre objectif : lisser l'occupation sur l'année et combler les creux du printemps, de l'été et de l'automne, là où la plupart des biens restent vides.",
    },
    services: {
      eyebrow: "Une gestion complète, de A à Z",
      title: "Tout ce qui fait la réussite de votre location en montagne.",
      items: [
        { title: "Création & diffusion de l'annonce", text: "Photos professionnelles et mise en ligne sur Airbnb, Booking, Abritel…" },
        { title: "Accueil des voyageurs & check-in", text: "Remise des clés, état des lieux, conseils station, à toute heure." },
        { title: "Ménage & linge hôtelier", text: "Un logement impeccable à chaque arrivée, linge fourni et entretenu." },
        { title: "Optimisation des prix", text: "Tarifs ajustés aux saisons, vacances scolaires et événements de la station." },
        { title: "Maintenance & hivernage", text: "Interventions, petits travaux et suivi du bien, été comme hiver." },
      ],
    },
    insurance: {
      eyebrow: "Sérénité & protection",
      title: "Votre bien protégé, pas seulement géré.",
      intro: "Confier votre logement, c'est aussi le protéger. Les biens que nous prenons en gestion sont assurés par notre propre assurance, dégradations, nuisibles, perte d'exploitation, et couverts par une assurance annulation. Vous louez l'esprit totalement tranquille.",
      figs: [
        { v: "50 000 €", l: "de dégradations potentielles couvertes, à l'année" },
        { v: "10 000 €", l: "de traitement des nuisibles pris en charge" },
        { v: "5 000 €", l: "de perte d'exploitation indemnisée" },
        { v: "Annulation", l: "assurance en cas d'annulation des voyageurs" },
      ],
    },
    expertise: {
      eyebrow: "Notre expertise",
      title: "Experts de l'habitat touristique de montagne depuis 2018.",
      text1: "Nous connaissons Valmorel et Le Grand Domaine par cœur : les saisons, les attentes des vacanciers, les spécificités d'un bien en altitude. Cette expertise locale, nous la mettons au service de votre rentabilité.",
      text2: "La puissance d'une conciergerie structurée, avec la proximité d'un acteur local présent toute l'année.",
      cta: "Parler à un expert local",
    },
    approach: {
      eyebrow: "Notre approche",
      title: "On révèle le plein potentiel de votre bien.",
      intro: "Pas de tarif standard : on part de votre logement, on l'analyse, on l'améliore, et on vous dit précisément ce qu'il peut vous rapporter.",
      steps: [
        { title: "On audite votre bien", text: "Analyse complète de votre logement et de son potentiel locatif sur toute l'année." },
        { title: "On vous conseille", text: "Des recommandations concrètes pour améliorer les performances : aménagement, équipements, positionnement." },
        { title: "On vous dit combien vous gagnez", text: "Une estimation claire de vos revenus nets par an, puis on va chercher le plein potentiel de votre bien." },
      ],
    },
    avis: {
      eyebrow: "Ils nous font confiance",
      title: "Des propriétaires sereins, saison après saison.",
      items: [
        { author: "Marc", place: "Chalet · Valmorel", text: "Je n'habite pas la région et je ne pouvais pas gérer mon chalet à distance. Depuis qu'ils s'en occupent, mes revenus ont augmenté et je n'ai plus aucune contrainte." },
        { author: "Sophie", place: "Appartement · Doucy", text: "Accueil des vacanciers irréprochable, logement toujours nickel. On sent qu'ils connaissent la montagne et la station." },
        { author: "Laurent", place: "T3 · Le Grand Domaine", text: "Sérieux et réactifs. La tarification suit vraiment les saisons, ça change tout sur le rendement." },
      ],
    },
    zone: {
      eyebrow: "Notre terrain de jeu",
      title: "Valmorel & Le Grand Domaine.",
      intro: "Nous intervenons sur l'ensemble de la station de Valmorel et du Grand Domaine, une zone que nous connaissons saison après saison depuis 2018.",
    },
    faq: {
      eyebrow: "Bon à savoir",
      title: "Questions fréquentes",
      items: [
        { q: "Combien coûte votre conciergerie ?", a: "Pas de tarif standard : après audit de votre bien, nous établissons une proposition sur mesure basée sur son potentiel locatif annuel. L'étude est gratuite et sans engagement." },
        { q: "Mon bien est-il éligible ?", a: "Appartement, studio ou chalet sur Valmorel et Le Grand Domaine : nous étudions chaque bien et vous disons en toute transparence son potentiel locatif." },
        { q: "Puis-je continuer à profiter de mon logement ?", a: "Bien sûr. Vous bloquez vos périodes quand vous le souhaitez, nous gérons le reste de l'année." },
        { q: "Mon bien est-il assuré ?", a: "Oui. Les biens que nous prenons en gestion sont couverts par notre assurance : jusqu'à 50 000 € de dégradations, 10 000 € de nuisibles, 5 000 € de perte d'exploitation, plus une assurance annulation." },
      ],
    },
    final: {
      eyebrow: "Prêt à déléguer ?",
      title: "Confiez-nous votre bien à Valmorel.",
      intro: "Estimation gratuite et sans engagement. Un expert local vous recontacte sous 24 h.",
      points: ["Revenus optimisés sur toute la saison", "Accueil & ménage pris en charge", "Un interlocuteur dédié, présent sur place"],
    },
  },
};

export async function getConfig(): Promise<SiteCfg> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/public/config`, { headers: { "x-tenant": TENANT }, cache: "no-store" });
    if (res.ok) {
      const { config } = (await res.json()) as { config?: SiteCfg };
      if (config?.hero?.title) return { ...config, home: config.home ?? FALLBACK.home };
    }
  } catch {
    /* fallback */
  }
  return FALLBACK;
}
