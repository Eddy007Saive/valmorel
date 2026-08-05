import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CITIES } from "./lib/cities";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header solid />

      <section className="sec" style={{ paddingTop: 120, paddingBottom: 100, textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 620 }}>
          <p className="eyebrow">Erreur 404</p>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, marginTop: 12 }}>
            Cette page s&apos;est perdue dans la neige.
          </h1>
          <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.7, color: "var(--muted)" }}>
            La page que vous cherchez n&apos;existe pas ou plus. Elle a peut-être changé d&apos;adresse — voici de quoi retrouver votre chemin.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-green">Retour à l&apos;accueil</Link>
            <Link href="/blog" className="btn btn-o">Voir le blog</Link>
          </div>

          <div style={{ marginTop: 56, textAlign: "left" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, textAlign: "center" }}>Nos interventions par commune</h2>
            <div className="pills" style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {CITIES.map((c) => (
                <Link key={c.slug} href={`/conciergerie/${c.slug}`} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 30, padding: "8px 16px", fontSize: 13.5, fontWeight: 600 }}>
                  Conciergerie à {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
