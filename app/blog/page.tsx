import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ARTICLES, fmtDate } from "../lib/articles";

export const metadata: Metadata = {
  title: "Blog — Conseils propriétaires à Valmorel",
  description: "Réglementation, taxe de séjour, classement, rentabilité : nos conseils pour louer votre bien à Valmorel et Le Grand Domaine.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Header solid />
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <p className="eyebrow">Le blog</p>
            <h2>Conseils pour propriétaires à Valmorel.</h2>
            <p>Réglementation, rentabilité, classement, saisonnalité : tout pour louer mieux en montagne.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 26, marginTop: 46 }}>
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="rv" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", display: "block" }}>
                <img src={p.cover} alt={p.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--gold)" }}>{fmtDate(p.date)}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, marginTop: 7, lineHeight: 1.25 }}>{p.title}</div>
                  <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 9, lineHeight: 1.55 }}>{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
