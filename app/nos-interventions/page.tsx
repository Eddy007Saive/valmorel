import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CITIES } from "../lib/cities";

export const metadata: Metadata = {
  title: "Nos interventions — Conciergerie à Valmorel & Le Grand Domaine",
  description: "Cledici intervient à Valmorel, Doucy, Saint-François-Longchamp et Les Avanchers. Conciergerie Airbnb et location saisonnière dans tout Le Grand Domaine.",
  alternates: { canonical: "/nos-interventions" },
};

export default function NosInterventionsPage() {
  return (
    <>
      <Header solid />
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <p className="eyebrow">Nos interventions</p>
            <h2>Valmorel &amp; Le Grand Domaine.</h2>
            <p>Nous gérons les locations saisonnières sur l&apos;ensemble de la station de Valmorel et des communes reliées au Grand Domaine. Choisissez votre commune.</p>
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
          <p style={{ marginTop: 40 }}><Link href="/#contact" className="btn btn-green">Estimer les revenus de mon bien</Link></p>
        </div>
      </section>
      <Footer />
    </>
  );
}
