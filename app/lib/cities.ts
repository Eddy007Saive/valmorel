export type City = {
  slug: string;
  name: string;
  region: string;
  image: string;
  intro: string;
  marche: string;
  highlights: string[];
  neighbors: string[];
  faq: { q: string; a: string }[];
};

export const CITIES: City[] = [
  {
    slug: "valmorel",
    name: "Valmorel",
    region: "Le Grand Domaine · Savoie",
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Vous possédez un appartement ou un chalet à Valmorel ? Cledici gère votre location saisonnière de A à Z et optimise votre rentabilité toute l'année, y compris hors saison de ski.",
    marche:
      "Station-village piétonne créée en 1976, Valmorel est le cœur du Grand Domaine (près de 165 km de pistes reliées à Saint-François-Longchamp) et labellisée Famille Plus. Son architecture chalet, son ambiance conviviale et sa clientèle familiale en font un marché locatif très demandé l'hiver — et de plus en plus attractif l'été (randonnée, VTT, bien-être en montagne).",
    highlights: [
      "Cœur du Grand Domaine — forte demande hiver et été",
      "Station-village piétonne, clientèle familiale fidèle",
      "Potentiel réel en inter-saison (randonnée, VTT, événements)",
    ],
    neighbors: ["doucy", "les-avanchers", "saint-francois-longchamp"],
    faq: [
      { q: "Faut-il déclarer son meublé à Valmorel ?", a: "Oui, en mairie des Avanchers-Valmorel (Cerfa 14004*04 ou Declaloc). Cledici s'occupe de la démarche pour vous." },
      { q: "Cledici gère-t-il aussi hors saison de ski ?", a: "Oui — c'est notre spécialité : nous activons la demande au printemps, l'été et l'automne pour que votre bien ne dorme jamais." },
    ],
  },
  {
    slug: "doucy",
    name: "Doucy-Combelouvière",
    region: "Le Grand Domaine · Savoie",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Propriétaire à Doucy-Combelouvière ? Cledici prend en charge la location de votre bien et maximise ses revenus, saison après saison.",
    marche:
      "Station-village authentique et familiale reliée au Grand Domaine, Doucy-Combelouvière séduit une clientèle en quête de calme et de nature, à quelques minutes de Valmorel. Un positionnement idéal pour des séjours ski l'hiver et des séjours nature au printemps et en été.",
    highlights: [
      "Reliée au Grand Domaine (ski au départ de la station)",
      "Ambiance village calme et authentique",
      "Complémentaire de Valmorel pour capter la demande",
    ],
    neighbors: ["valmorel", "les-avanchers"],
    faq: [
      { q: "Doucy est-il relié au domaine skiable de Valmorel ?", a: "Oui, Doucy-Combelouvière fait partie du Grand Domaine, relié aux pistes de Valmorel." },
    ],
  },
  {
    slug: "saint-francois-longchamp",
    name: "Saint-François-Longchamp",
    region: "Le Grand Domaine · Savoie",
    image: "https://images.unsplash.com/photo-1610476905310-cdc6d6e9a6a3?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Vous louez un bien à Saint-François-Longchamp ? Cledici gère votre location et optimise votre rentabilité sur l'ensemble de la saison.",
    marche:
      "Reliée à Valmorel par le Grand Domaine, au pied du col de la Madeleine, Saint-François-Longchamp offre un large domaine skiable et un accès été très prisé des cyclistes et randonneurs. Un marché à double saison, parfait pour une gestion optimisée toute l'année.",
    highlights: [
      "Reliée à Valmorel via Le Grand Domaine",
      "Col de la Madeleine — forte demande cyclistes l'été",
      "Domaine skiable étendu, clientèle variée",
    ],
    neighbors: ["valmorel"],
    faq: [
      { q: "Peut-on skier de Saint-François-Longchamp à Valmorel ?", a: "Oui, les deux stations sont reliées skis aux pieds au sein du Grand Domaine." },
    ],
  },
  {
    slug: "les-avanchers",
    name: "Les Avanchers-Valmorel",
    region: "Vallée · Savoie",
    image: "https://images.unsplash.com/photo-1517320964276-a002fa203177?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Propriétaire aux Avanchers-Valmorel ? Cledici gère votre location saisonnière et vous accompagne dans toutes vos démarches, à deux pas de la station.",
    marche:
      "Commune-support de la station de Valmorel, Les Avanchers-Valmorel conjugue vie de village à l'année et proximité immédiate du domaine skiable. Un emplacement idéal pour une clientèle qui cherche l'authenticité tout en profitant de Valmorel.",
    highlights: [
      "Commune de la station de Valmorel",
      "Vie de village à l'année + proximité des pistes",
      "Démarches (déclaration, classement) simplifiées avec Cledici",
    ],
    neighbors: ["valmorel", "doucy"],
    faq: [
      { q: "Où déclarer mon meublé aux Avanchers-Valmorel ?", a: "À la mairie des Avanchers-Valmorel (Cerfa 14004*04 ou Declaloc). Cledici réalise la démarche à votre place." },
    ],
  },
];

export const getCity = (slug: string) => CITIES.find((c) => c.slug === slug);
