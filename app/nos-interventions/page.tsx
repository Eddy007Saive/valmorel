import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CITIES } from "../lib/cities";
import { ZONE_CONTENT } from "../lib/cityContent";
import { getConfig, FALLBACK } from "../lib/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gestion locative montagne — Valmorel & Le Grand Domaine",
  description: "Gestion locative montagne : confiez votre résidence secondaire à Valmorel, Doucy, Saint-François-Longchamp ou Les Avanchers. Revenus toute l'année, bien assuré, expertise locale depuis 2018.",
  alternates: { canonical: "/nos-interventions" },
};

export default async function NosInterventionsPage() {
  const cfg = await getConfig();
  const P = cfg.interventions ?? FALLBACK.interventions;
  return (
    <>
      <Header solid />
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <p className="eyebrow">{P.eyebrow}</p>
            <h2>{P.title}</h2>
            <p>{P.intro}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 26, marginTop: 46 }}>
            {CITIES.map((c, i) => (
              <Link key={c.slug} href={`/conciergerie/${c.slug}`} className={`rv rv-${(i % 4) + 1}`} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", display: "block" }}>
                <img src={c.image} alt={`Conciergerie à ${c.name}`} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold)" }}>{c.region}</div>
                  <div style={{ fontSize: 19, fontWeight: 800, marginTop: 6 }}>Conciergerie à {c.name}</div>
                  <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8, lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.intro}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="prose" style={{ maxWidth: 900, margin: "60px auto 0" }} dangerouslySetInnerHTML={{ __html: ZONE_CONTENT }} />
          <p style={{ marginTop: 40, textAlign: "center" }}><Link href="/#contact" className="btn btn-green">{P.cta}</Link></p>
        </div>
      </section>
      <Footer />
    </>
  );
}
