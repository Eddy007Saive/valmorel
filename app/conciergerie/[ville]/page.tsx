import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CITIES, getCity } from "../../lib/cities";
import { CITY_CONTENT } from "../../lib/cityContent";

export function generateStaticParams() {
  return CITIES.map((c) => ({ ville: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const c = getCity(ville);
  if (!c) return {};
  return {
    title: `Conciergerie à ${c.name} — Airbnb & location saisonnière`,
    description: `${c.intro} Cledici, expert de l'habitat touristique de montagne depuis 2018.`,
    alternates: { canonical: `/conciergerie/${c.slug}` },
  };
}

export default async function VillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const c = getCity(ville);
  if (!c) notFound();

  const neighbors = c.neighbors.map((s) => getCity(s)).filter(Boolean) as NonNullable<ReturnType<typeof getCity>>[];

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `Cledici Conciergerie — ${c.name}`,
      description: c.intro,
      image: c.image,
      priceRange: "€€€",
      areaServed: { "@type": "City", name: c.name },
      address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: "Savoie", addressCountry: "FR" },
      url: `https://valmorel.cledici.fr/conciergerie/${c.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://valmorel.cledici.fr" },
        { "@type": "ListItem", position: 2, name: "Nos interventions", item: "https://valmorel.cledici.fr/nos-interventions" },
        { "@type": "ListItem", position: 3, name: c.name, item: `https://valmorel.cledici.fr/conciergerie/${c.slug}` },
      ],
    },
  ];

  return (
    <>
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <Header />

      {/* HERO façon landing */}
      <section className="hero" style={{ minHeight: 620 }}>
        <div className="bg"><img src={c.image} alt={`Conciergerie à ${c.name}`} /></div>
        <div className="wrap inner" style={{ gridTemplateColumns: "1fr" }}>
          <div className="rv in" style={{ maxWidth: 760 }}>
            <p className="eyebrow">Conciergerie Airbnb · {c.region}</p>
            <h1>Conciergerie à {c.name}.</h1>
            <p className="sub">{c.intro}</p>
            <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
              <Link href="/#contact" className="btn btn-g">Estimer mes revenus à {c.name}</Link>
              <Link href="/#services" className="btn btn-o" style={{ color: "#fff" }}>Nos prestations</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARCHÉ PORTEUR */}
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <p className="eyebrow rv">Le marché de {c.name}</p>
          <h2 className="rv rv-1" style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>Pourquoi {c.name} est un marché porteur.</h2>
          <p className="rv rv-2" style={{ marginTop: 18, fontSize: "16.5px", lineHeight: 1.75, color: "var(--ink)" }}>{c.marche}</p>
          <ul className="rv rv-3" style={{ marginTop: 20, listStyle: "none" }}>
            {c.highlights.map((h) => (
              <li key={h} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ color: "var(--gold)", fontWeight: 800 }}>—</span>
                <span style={{ fontSize: 15.5 }}>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GESTION LOCATIVE : contenu éditorial propre à la commune */}
      {CITY_CONTENT[c.slug] && (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="prose" dangerouslySetInnerHTML={{ __html: CITY_CONTENT[c.slug] }} />
          </div>
        </section>
      )}

      {/* DONNÉES SEO/IA : réglementation & taxe */}
      <section className="sec" style={{ background: "var(--snow)" }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <p className="eyebrow rv">Réglementation &amp; taxe de séjour</p>
          <h2 className="rv rv-1" style={{ fontSize: "clamp(24px,2.7vw,34px)", fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>Louer à {c.name} en toute conformité.</h2>
          <p className="rv rv-2" style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: "var(--muted)" }}>
            Comme partout à Valmorel et dans la vallée, la location d&apos;un meublé de tourisme suppose une déclaration en mairie et une taxe de séjour qui dépend du classement du bien.
          </p>
          <div className="table-wrap rv rv-3">
          <table className="data-table">
            <thead><tr><th>Obligation</th><th>Détail</th></tr></thead>
            <tbody>
              <tr><td>Déclaration en mairie</td><td>Cerfa 14004*04 ou service Declaloc → récépissé</td></tr>
              <tr><td>Taxe de séjour — non classé</td><td>5 % de la nuitée / personne, plafonné à 4,60 € (+10 % Savoie)</td></tr>
              <tr><td>Taxe de séjour — classé</td><td>Tarif fixe par étoile, fixé par la CCVA (+10 % Savoie)</td></tr>
              <tr><td>Abattement fiscal (micro-BIC, revenus 2025)</td><td>50 % si classé, 30 % si non classé</td></tr>
            </tbody>
          </table>
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/securite-reglementation" style={{ color: "var(--green)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>
              Voir le guide complet : sécurité &amp; réglementation à Valmorel →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div className="sec-head center rv"><p className="eyebrow">Questions fréquentes</p><h2>Conciergerie à {c.name}</h2></div>
          <div className="faq rv" style={{ margin: "34px auto 0" }}>
            {c.faq.map((f, i) => (
              <details key={i} open={i === 0}><summary>{f.q}<span className="p">+</span></summary><p className="a">{f.a}</p></details>
            ))}
            <details><summary>Mon bien est-il assuré ?<span className="p">+</span></summary><p className="a">Oui. Les biens que nous gérons sont couverts par notre assurance : jusqu&apos;à 50 000 € de dégradations, 10 000 € de nuisibles, 5 000 € de perte d&apos;exploitation, plus une assurance annulation.</p></details>
          </div>
        </div>
      </section>

      {/* PROXIMITÉ */}
      {neighbors.length > 0 && (
        <section className="sec" style={{ background: "var(--snow)", paddingTop: 40, paddingBottom: 40 }}>
          <div className="wrap">
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>Nous intervenons aussi à proximité</h2>
            <div className="pills" style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {neighbors.map((n) => (
                <Link key={n.slug} href={`/conciergerie/${n.slug}`} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 30, padding: "8px 16px", fontSize: 13.5, fontWeight: 600 }}>
                  Conciergerie à {n.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="final" style={{ minHeight: 380 }}>
        <div className="bg"><img src={c.image} alt="" /></div>
        <div className="wrap"><div className="inner" style={{ gridTemplateColumns: "1fr", textAlign: "center", padding: "80px 0" }}>
          <div className="rv" style={{ maxWidth: 620, margin: "0 auto" }}>
            <p className="eyebrow" style={{ color: "#F2C879" }}>Prêt à déléguer ?</p>
            <h2>Confiez-nous votre bien à {c.name}.</h2>
            <p>Estimation gratuite et sans engagement. Un expert local vous recontacte sous 24 h.</p>
            <p style={{ marginTop: 26 }}><Link href="/#contact" className="btn btn-g">Estimer mes revenus</Link></p>
          </div>
        </div></div>
      </section>

      <Footer />
    </>
  );
}
