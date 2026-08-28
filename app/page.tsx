import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeadForm from "./components/LeadForm";
import { getConfig, FALLBACK } from "./lib/config";

const PARTNERS = ["Airbnb", "Booking.com", "Le Collectionist", "Marriott", "Plumguide", "HomeToGo", "Abritel", "Beds24", "Stripe", "HostProtect", "GoodTime BNB"];
const OCC = [
  { m: "Jan", bar: 152, fill: 16, base: 136 }, { m: "Fév", bar: 154, fill: 13, base: 141 },
  { m: "Mar", bar: 136, fill: 32, base: 104 }, { m: "Avr", bar: 93, fill: 58, base: 35 },
  { m: "Mai", bar: 88, fill: 59, base: 29 }, { m: "Juin", bar: 109, fill: 61, base: 48 },
  { m: "Juil", bar: 125, fill: 64, base: 61 }, { m: "Août", bar: 128, fill: 61, base: 67 },
  { m: "Sep", bar: 96, fill: 58, base: 38 }, { m: "Oct", bar: 80, fill: 54, base: 26 },
  { m: "Nov", bar: 83, fill: 51, base: 32 }, { m: "Déc", bar: 150, fill: 22, base: 128 },
];

// Icônes des 4 bénéfices (le design reste en code ; le texte vient de la config).
const BENE_ICONS = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.6z" /></svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z" /></svg>,
];

/** Fond pleine largeur Unsplash, responsive (srcset) : le mobile télécharge une version légère. */
function Bg({ id, alt, priority }: { id: string; alt: string; priority?: boolean }) {
  const base = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=58`;
  return (
    <div className="bg">
      <img
        src={`${base}&w=1440`}
        srcSet={`${base}&w=640 640w, ${base}&w=1024 1024w, ${base}&w=1440 1440w, ${base}&w=1920 1920w`}
        sizes="100vw"
        alt={alt}
        {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const cfg = await getConfig();
  const h = cfg.hero ?? {};
  const H = cfg.home ?? FALLBACK.home;
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="bg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Domaine_de_Valmorel_et_Lauzi%C3%A8re_en_hiver_%28janvier_2022%29.JPG/1280px-Domaine_de_Valmorel_et_Lauzi%C3%A8re_en_hiver_%28janvier_2022%29.JPG"
            alt="Le domaine skiable de Valmorel et le massif de la Lauzière en hiver"
            fetchPriority="high"
          />
        </div>
        <span className="hero-credit">© Florian Pépellin · CC BY-SA 4.0</span>
        <div className="wrap inner">
          <div className="rv in">
            <p className="eyebrow">{h.eyebrow}</p>
            <h1>{h.title}</h1>
            <p className="sub">{h.subtitle}</p>
            <div className="plats">
              <div className="lab">Diffusé sur</div>
              <div className="row"><span>Airbnb</span><span>Booking.com</span><span>Abritel</span><span>Leboncoin</span><span>HomeToGo</span><span>Expedia</span></div>
            </div>
            {/* CTA mobile (le formulaire inline est masqué sur mobile) */}
            <div className="hero-cta">
              <a href={h.ctaPrimary?.href ?? "#estimer"} className="btn btn-g">{h.ctaPrimary?.label ?? "Estimer mes revenus"}</a>
              <a href={h.ctaSecondary?.href ?? "#services"} className="btn btn-o" style={{ color: "#fff" }}>{h.ctaSecondary?.label ?? "Découvrir nos services"}</a>
            </div>
            <div className="trust-mini"><span className="st">★★★★★</span><b style={{ color: "#fff" }}>4,9 / 5</b><span>· propriétaires accompagnés depuis 2018</span></div>
          </div>
          <LeadForm pfx="lf-hero" anchor title="Propriétaire à Valmorel ? Estimez vos revenus." hint="Gratuit et sans engagement. Un expert local vous recontacte sous 24 h." />
        </div>
        <div className="scrollcue" aria-hidden="true">⌄</div>
      </section>

      {/* PARTENAIRES */}
      <section className="marquee">
        <div className="lab">Nos partenaires &amp; plateformes</div>
        <div className="track">
          {[...PARTNERS, ...PARTNERS].map((p, i) => <span key={i}>{p}</span>)}
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="band">
        <div className="wrap"><div className="row">
          {H.stats.map((s, i) => (
            <div className="it rv" key={i}><div className="n">{s.n}</div><div className="l">{s.l}</div></div>
          ))}
        </div></div>
      </section>

      {/* BENEFITS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center rv">
            <p className="eyebrow">{H.benefits.eyebrow}</p>
            <h2>{H.benefits.title}</h2>
            <p>{H.benefits.intro}</p>
          </div>
          <div className="benes">
            {H.benefits.items.map((b, i) => (
              <div className="bene rv" key={i}><span className="ic">{BENE_ICONS[i]}</span><h3>{b.title}</h3><p>{b.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* OPTIMISATION SAISONNIÈRE */}
      <section className="sec" style={{ background: "var(--white)" }}>
        <div className="wrap">
          <div className="sec-head center rv">
            <p className="eyebrow">{H.season.eyebrow}</p>
            <h2>{H.season.title}</h2>
            <p>{H.season.intro}</p>
          </div>
          <div className="season-grid">
            <div className="scard rv">
              <span className="tag">{H.season.card1.tag}</span>
              <h3>{H.season.card1.title}</h3>
              <p>{H.season.card1.text}</p>
            </div>
            <div className="scard gold rv">
              <span className="tag">{H.season.card2.tag}</span>
              <h3>{H.season.card2.title}</h3>
              <p>{H.season.card2.text}</p>
            </div>
          </div>
          <div className="occ rv">
            <div className="occ-head">
              <span>Taux d&apos;occupation sur l&apos;année</span>
              <span className="legend"><span><i className="x" />Occupation de base</span><span><i className="g" />Périodes que nous remplissons</span></span>
            </div>
            <div className="occ-bars">
              {OCC.map((c) => (
                <div className="col" key={c.m}><div className="bar" style={{ height: c.bar }}><div className="fill" style={{ height: c.fill }} /><div className="base" style={{ height: c.base }} /></div><div className="mo">{c.m}</div></div>
              ))}
            </div>
            <p className="occ-note">{H.season.note}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sec" id="services" style={{ background: "var(--snow)" }}>
        <div className="wrap">
          <div className="svc">
            <div className="media rv"><img src="https://res.cloudinary.com/dxhtjrnvt/image/upload/f_auto,q_auto,w_1000/v1782299030/cledici/equipe-montagne.jpg" alt="L'équipe Cledici Conciergerie à Valmorel" loading="lazy" /></div>
            <div className="rv">
              <p className="eyebrow">{H.services.eyebrow}</p>
              <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>{H.services.title}</h2>
              <ul>
                {H.services.items.map((s, i) => (
                  <li key={i}><span className="num">{String(i + 1).padStart(2, "0")}</span><div><b>{s.title}</b><p>{s.text}</p></div></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ASSURANCE */}
      <section className="sec" style={{ background: "var(--white)" }}>
        <div className="wrap">
          <div className="ins rv">
            <div>
              <p className="eyebrow">{H.insurance.eyebrow}</p>
              <h2>{H.insurance.title}</h2>
              <p>{H.insurance.intro}</p>
            </div>
            <div className="ins-figs">
              {H.insurance.figs.map((f, i) => (
                <div className="ins-fig" key={i}><div className="v">{f.v}</div><div className="l">{f.l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="exp" id="expertise">
        <Bg id="photo-1605540436563-5bca919ae766" alt="Montagne Valmorel" />
        <div className="wrap"><div className="inner rv in">
          <p className="eyebrow">{H.expertise.eyebrow}</p>
          <h2>{H.expertise.title}</h2>
          <p>{H.expertise.text1}</p>
          <p>{H.expertise.text2}</p>
          <a href="#contact" className="btn btn-g" style={{ marginTop: 28 }}>{H.expertise.cta}</a>
        </div></div>
      </section>

      {/* APPROCHE */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center rv">
            <p className="eyebrow">{H.approach.eyebrow}</p>
            <h2>{H.approach.title}</h2>
            <p>{H.approach.intro}</p>
          </div>
          <div className="steps">
            {H.approach.steps.map((s, i) => (
              <div className="step rv" key={i}><div className="n">{i + 1}</div><h3>{s.title}</h3><p>{s.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="sec avis" id="avis">
        <div className="wrap">
          <div className="sec-head center rv">
            <p className="eyebrow">{H.avis.eyebrow}</p>
            <h2>{H.avis.title}</h2>
          </div>
          <div className="grid">
            {H.avis.items.map((a, i) => (
              <div className="q rv" key={i}><div className="st">★★★★★</div><p>« {a.text} »</p><div className="who"><span className="av">{a.author.charAt(0)}</span><div><b>{a.author}</b><small>{a.place}</small></div></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE */}
      <section className="sec zone" id="zone">
        <div className="wrap">
          <div className="sec-head rv"><p className="eyebrow">{H.zone.eyebrow}</p><h2>{H.zone.title}</h2></div>
          <div className="box">
            <div className="rv">
              <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "var(--muted)" }}>{H.zone.intro}</p>
              <div className="pills">
                <Link href="/conciergerie/valmorel">Valmorel</Link>
                <Link href="/conciergerie/doucy">Doucy</Link>
                <Link href="/conciergerie/saint-francois-longchamp">Saint-François-Longchamp</Link>
                <Link href="/conciergerie/les-avanchers">Les Avanchers</Link>
                <span>Le Grand Domaine</span>
              </div>
            </div>
            <div className="map rv">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Station_de_Valmorel_enneig%C3%A9e_vue_des_pistes_%28janvier_2022%29.JPG/1280px-Station_de_Valmorel_enneig%C3%A9e_vue_des_pistes_%28janvier_2022%29.JPG"
                alt="La station de Valmorel enneigée vue des pistes"
                loading="lazy"
              />
              <span className="credit">© Florian Pépellin · CC BY-SA 4.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ background: "var(--snow)" }}>
        <div className="wrap">
          <div className="sec-head center rv"><p className="eyebrow">{H.faq.eyebrow}</p><h2>{H.faq.title}</h2></div>
          <div className="faq rv">
            {H.faq.items.map((f, i) => (
              <details key={i} open={i === 0}><summary>{f.q}<span className="p">+</span></summary><p className="a">{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="estimer">
        <Bg id="photo-1517320964276-a002fa203177" alt="" />
        <div className="wrap"><div className="inner">
          <div className="rv">
            <p className="eyebrow" style={{ color: "#F2C879" }}>{H.final.eyebrow}</p>
            <h2>{H.final.title}</h2>
            <p>{H.final.intro}</p>
            <ul>{H.final.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
          <LeadForm pfx="lf-final" title="Estimez vos revenus" hint="Réponse personnalisée sous 24 h." />
        </div></div>
      </section>

      <Footer />
    </>
  );
}
