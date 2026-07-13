import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Sécurité & réglementation à Valmorel (meublé de tourisme)",
  description:
    "Déclaration en mairie, classement, taxe de séjour par classement du bien, assurance : le guide complet de la réglementation des meublés de tourisme à Valmorel (Les Avanchers).",
  alternates: { canonical: "/securite-reglementation" },
};

const FAQ = [
  { q: "Faut-il déclarer son meublé de tourisme à Valmorel ?", a: "Oui. Toute location de meublé de tourisme doit être déclarée à la mairie des Avanchers-Valmorel (formulaire Cerfa n°14004*04 ou service en ligne Declaloc). La mairie délivre un récépissé qui vaut preuve de déclaration." },
  { q: "Quelle taxe de séjour pour un meublé non classé à Valmorel ?", a: "Pour un hébergement non classé, la taxe de séjour est de 5 % du prix de la nuitée par personne, plafonnée à 4,60 €, à laquelle s'ajoute la majoration départementale de 10 % (Savoie)." },
  { q: "Pourquoi faire classer son meublé à Valmorel ?", a: "Le classement (valable 5 ans) donne droit à un abattement fiscal de 71 % au lieu de 50 %, à une taxe de séjour à tarif fixe (souvent plus avantageuse), à la commercialisation via l'Office de Tourisme et à l'éligibilité ANCV." },
  { q: "Cledici s'occupe-t-il des démarches ?", a: "Oui. Déclaration en mairie, dossier de classement, taxe de séjour et mise en conformité : nous prenons en charge l'ensemble des démarches pour votre bien à Valmorel." },
];

export default function ReglementationPage() {
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Sécurité & réglementation des meublés de tourisme à Valmorel",
      about: "Réglementation location saisonnière Valmorel",
      author: { "@type": "Organization", name: "Cledici Conciergerie" },
      publisher: { "@type": "Organization", name: "Cledici Conciergerie" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Taxe de séjour à Valmorel par classement du bien",
      description: "Barème de la taxe de séjour des meublés de tourisme à Valmorel (Les Avanchers) selon le classement, régime au réel, CCVA + majoration départementale Savoie 10%.",
      keywords: ["taxe de séjour Valmorel", "classement meublé de tourisme", "réglementation location Valmorel"],
    },
  ];

  return (
    <>
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <Header solid />

      <section className="sec" style={{ paddingTop: 64 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Sécurité &amp; réglementation</p>
          <h1 style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, lineHeight: 1.12, marginTop: 12 }}>Réglementation des meublés de tourisme à Valmorel.</h1>
          <p style={{ marginTop: 18, fontSize: "17px", lineHeight: 1.7, color: "var(--muted)", maxWidth: "60ch" }}>
            Déclaration, classement, taxe de séjour, assurance : tout ce qu&apos;un propriétaire doit savoir pour louer sereinement à Valmorel (commune des Avanchers-Valmorel, Savoie). Cledici prend en charge l&apos;ensemble des démarches.
          </p>

          <div className="prose">
            <h2>1. Déclarer votre meublé en mairie</h2>
            <p>Toute location de meublé de tourisme doit être <strong>déclarée à la mairie des Avanchers-Valmorel</strong>, via le formulaire <strong>Cerfa n°14004*04</strong> ou le service en ligne <strong>Declaloc</strong>. La mairie délivre un <strong>récépissé</strong> qui vaut preuve de déclaration — à conserver et à mentionner sur vos annonces.</p>

            <h2>2. Faire classer votre meublé (fortement recommandé)</h2>
            <p>Le classement en meublé de tourisme (de 1 à 5 étoiles) est réalisé par l&apos;<strong>Office de Tourisme de Valmorel</strong> (accrédité AFNOR). Il est <strong>valable 5 ans</strong> et coûte à partir de <strong>120 €</strong>. Il change tout pour la rentabilité :</p>
            <table className="data-table">
              <thead><tr><th>Avantage</th><th>Meublé non classé</th><th>Meublé classé</th></tr></thead>
              <tbody>
                <tr><td>Abattement fiscal (micro-BIC)</td><td>50 %</td><td><strong>71 %</strong></td></tr>
                <tr><td>Taxe de séjour</td><td>5 % de la nuitée (proportionnel)</td><td>Tarif fixe par étoile (souvent plus avantageux)</td></tr>
                <tr><td>Commercialisation Office de Tourisme</td><td>—</td><td>Oui</td></tr>
                <tr><td>Éligibilité chèques ANCV</td><td>—</td><td>Oui</td></tr>
              </tbody>
            </table>

            <h2>3. La taxe de séjour à Valmorel, selon le classement du bien</h2>
            <p>À Valmorel, la taxe de séjour est perçue au réel par la <strong>Communauté de Communes des Vallées d&apos;Aigueblanche (CCVA)</strong>, par personne et par nuit, avec une <strong>majoration départementale de 10 %</strong> (Savoie) qui s&apos;ajoute aux montants ci-dessous.</p>
            <table className="data-table">
              <thead><tr><th>Classement du bien</th><th>Taxe de séjour (par personne / nuit)</th></tr></thead>
              <tbody>
                <tr><td>Meublé <strong>non classé</strong></td><td><strong>5 % du prix de la nuitée</strong>, plafonné à <strong>4,60 €</strong></td></tr>
                <tr><td>Meublé classé (1★ à 5★)</td><td>Tarif <strong>fixe</strong>, croissant avec le nombre d&apos;étoiles, fixé par la CCVA (barème communal)</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>Majoration départementale de 10 % (Savoie) en sus. Barème communal détaillé : plateforme CCVA (ccvasavoie.taxesejour.fr). Cledici collecte et reverse la taxe de séjour pour vous.</p>

            <h2>4. Votre bien assuré, pas seulement géré</h2>
            <p>Les biens que nous prenons en gestion sont couverts par <strong>notre propre assurance</strong> : jusqu&apos;à <strong>50 000 €</strong> de dégradations à l&apos;année, <strong>10 000 €</strong> de traitement des nuisibles, <strong>5 000 €</strong> de perte d&apos;exploitation, ainsi qu&apos;une <strong>assurance annulation</strong> en cas d&apos;annulation des voyageurs. Vous louez l&apos;esprit tranquille.</p>

            <h2>5. Cledici s&apos;occupe de toutes vos démarches</h2>
            <p>Déclaration en mairie, dossier de classement, collecte de la taxe de séjour, mise en conformité : nous prenons en charge l&apos;ensemble des obligations pour que votre location à Valmorel soit 100 % conforme — en plus de la gestion complète de votre bien.</p>
          </div>

          {/* FAQ */}
          <div className="faq" style={{ margin: "40px 0 0" }}>
            {FAQ.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}<span className="p">+</span></summary>
                <p className="a">{f.a}</p>
              </details>
            ))}
          </div>

          <p style={{ marginTop: 34 }}>
            <Link href="/#contact" className="btn btn-green">Faire estimer et mettre en conformité mon bien</Link>
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 18 }}>Informations à jour 2026, vérifiées auprès des sources officielles (Mairie des Avanchers-Valmorel, Office de Tourisme de Valmorel, CCVA). À titre indicatif — pour un audit personnalisé, contactez-nous.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
