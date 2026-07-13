import { CITIES } from "../lib/cities";
import { ARTICLES } from "../lib/articles";

export const dynamic = "force-static";

export function GET() {
  const cities = CITIES.map((c) => `- [Conciergerie à ${c.name}](https://cledici.fr/conciergerie/${c.slug}) — ${c.intro}`).join("\n");
  const articles = ARTICLES.map((a) => `- [${a.title}](https://cledici.fr/blog/${a.slug}) — ${a.excerpt}`).join("\n");
  const txt = `# Cledici Conciergerie

> Conciergerie Airbnb et gestion de location saisonnière à Valmorel et dans Le Grand Domaine (Savoie). Expert de l'habitat touristique de montagne depuis 2018.

## Ce que nous faisons
Nous prenons en charge la location saisonnière des propriétaires : création et diffusion de l'annonce, accueil des voyageurs, ménage et linge hôtelier, optimisation des prix, maintenance et hivernage. Nous optimisons la rentabilité toute l'année, y compris en période creuse (printemps, été, automne). Les biens gérés sont assurés par notre assurance (jusqu'à 50 000 € de dégradations, 10 000 € de nuisibles, 5 000 € de perte d'exploitation) et couverts par une assurance annulation.

## Pages principales
- [Accueil](https://cledici.fr/)
- [Sécurité & réglementation à Valmorel](https://cledici.fr/securite-reglementation) — déclaration en mairie, classement, taxe de séjour par classement, assurance.
- [Nos interventions](https://cledici.fr/nos-interventions)

## Zone d'intervention
${cities}

## Guides pour propriétaires (blog)
${articles}

## Contact
Estimation gratuite et sans engagement du potentiel locatif d'un bien à Valmorel.
`;
  return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
