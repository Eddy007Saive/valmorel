import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ARTICLES, getArticle, fmtDate } from "../../lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.seoTitle ?? a.title,
    description: a.seoDescription ?? a.excerpt,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { title: a.seoTitle ?? a.title, description: a.seoDescription ?? a.excerpt, images: [a.cover], type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    image: a.cover,
    datePublished: a.date,
    author: { "@type": "Organization", name: "Cledici Conciergerie" },
    publisher: { "@type": "Organization", name: "Cledici Conciergerie" },
    mainEntityOfPage: `https://valmorel.cledici.fr/blog/${a.slug}`,
  };

  // FAQPage : on extrait les couples <h3>question</h3><p>réponse</p> du contenu.
  const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const faq: { q: string; ans: string }[] = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(a.contentHtml)) !== null) {
    const q = strip(m[1]);
    if (q.includes("?")) faq.push({ q, ans: strip(m[2]) });
  }
  const faqLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.ans },
          })),
        }
      : null;
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  // Tableaux scrollables sur mobile (évite le débordement horizontal).
  const html = a.contentHtml
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <Header solid />

      <article className="sec" style={{ paddingTop: 48 }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <p style={{ fontSize: 12.5, color: "var(--muted)" }}>
            <Link href="/blog" style={{ color: "var(--green)", fontWeight: 600 }}>← Blog</Link>
          </p>
          <p className="eyebrow rv" style={{ marginTop: 22 }}>{fmtDate(a.date)}</p>
          <h1 className="rv rv-1" style={{ fontSize: "clamp(28px,3.8vw,44px)", fontWeight: 800, lineHeight: 1.14, marginTop: 12 }}>{a.title}</h1>
          <p className="rv rv-2" style={{ marginTop: 16, fontSize: 18, lineHeight: 1.6, color: "var(--muted)" }}>{a.excerpt}</p>
          <img className="rv rv-s" src={a.cover} alt={a.title} style={{ width: "100%", height: "clamp(260px,42vh,440px)", objectFit: "cover", borderRadius: 16, margin: "28px 0 8px" }} />

          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="rv rv-s" style={{ marginTop: 40, background: "var(--green)", color: "#fff", borderRadius: 18, padding: "34px 32px", textAlign: "center" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>Prêt à déléguer votre bien à Valmorel ?</h2>
            <p style={{ color: "rgba(255,255,255,.85)", marginTop: 10, fontSize: 15 }}>Estimation gratuite et sans engagement de votre potentiel locatif.</p>
            <p style={{ marginTop: 22 }}><Link href="/#contact" className="btn btn-g">Estimer mes revenus</Link></p>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="sec" style={{ background: "var(--snow)", paddingTop: 64, paddingBottom: 80 }}>
          <div className="wrap">
            <h2 style={{ fontSize: 26, fontWeight: 800, textAlign: "center" }}>À lire aussi</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24, marginTop: 36 }}>
              {others.map((p, i) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={`rv rv-${i + 1}`} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", display: "block" }}>
                  <img src={p.cover} alt={p.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ fontSize: 16.5, fontWeight: 700, lineHeight: 1.3 }}>{p.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
