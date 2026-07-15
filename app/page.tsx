import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeadForm from "./components/LeadForm";

const PARTNERS = ["Airbnb", "Booking.com", "Le Collectionist", "Marriott", "Plumguide", "HomeToGo", "Abritel", "Beds24", "Stripe", "HostProtect", "GoodTime BNB"];
const OCC = [
  { m: "Jan", bar: 152, fill: 16, base: 136 }, { m: "Fév", bar: 154, fill: 13, base: 141 },
  { m: "Mar", bar: 136, fill: 32, base: 104 }, { m: "Avr", bar: 93, fill: 58, base: 35 },
  { m: "Mai", bar: 88, fill: 59, base: 29 }, { m: "Juin", bar: 109, fill: 61, base: 48 },
  { m: "Juil", bar: 125, fill: 64, base: 61 }, { m: "Août", bar: 128, fill: 61, base: 67 },
  { m: "Sep", bar: 96, fill: 58, base: 38 }, { m: "Oct", bar: 80, fill: 54, base: 26 },
  { m: "Nov", bar: 83, fill: 51, base: 32 }, { m: "Déc", bar: 150, fill: 22, base: 128 },
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

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero">
        <Bg id="photo-1551524559-8af4e6624178" alt="Chalet à Valmorel" priority />
        <div className="wrap inner">
          <div className="rv in">
            <p className="eyebrow">Expert de l&apos;habitat touristique de montagne depuis 2018</p>
            <h1>Louez votre bien à Valmorel, <em>sans contrainte</em> — et maximisez vos revenus.</h1>
            <p className="sub">Vous êtes propriétaire d&apos;un hébergement de vacances à Valmorel et ses environs ? Confiez-nous votre bien : nous en optimisons la rentabilité, y compris en période creuse. Diffusion sur les plus grandes plateformes, tarification dynamique, accueil des voyageurs, entretien et suivi de votre bien.</p>
            <div className="plats">
              <div className="lab">Diffusé sur</div>
              <div className="row"><span>Airbnb</span><span>Booking.com</span><span>Abritel</span><span>Leboncoin</span><span>HomeToGo</span><span>Expedia</span></div>
            </div>
            {/* CTA mobile (le formulaire inline est masqué sur mobile) */}
            <div className="hero-cta">
              <a href="#estimer" className="btn btn-g">Estimer mes revenus</a>
              <a href="#services" className="btn btn-o" style={{ color: "#fff" }}>Découvrir nos services</a>
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
          <div className="it rv"><div className="n">2018</div><div className="l">Experts de la montagne depuis</div></div>
          <div className="it rv"><div className="n">4,9/5</div><div className="l">Satisfaction propriétaires</div></div>
          <div className="it rv"><div className="n">100 %</div><div className="l">Gestion déléguée</div></div>
          <div className="it rv"><div className="n">24 h</div><div className="l">Réponse à votre demande</div></div>
        </div></div>
      </section>

      {/* BENEFITS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center rv">
            <p className="eyebrow">Pourquoi nous confier votre bien</p>
            <h2>La montagne a ses codes. Nous les maîtrisons.</h2>
            <p>Saisons, vacances scolaires, attentes des vacanciers : nous optimisons chaque détail pour des revenus maximisés et des voyageurs conquis.</p>
          </div>
          <div className="benes">
            <div className="bene rv"><span className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg></span><h3>Revenus optimisés 12 mois</h3><p>Tarification dynamique en haute saison <strong>et</strong> remplissage des périodes creuses : on optimise toute l&apos;année.</p></div>
            <div className="bene rv"><span className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg></span><h3>Zéro contrainte</h3><p>Annonce, réservations, accueil, ménage, linge : nous nous occupons de tout, à votre place.</p></div>
            <div className="bene rv"><span className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.6z" /></svg></span><h3>Voyageurs 5★</h3><p>Accueil soigné des voyageurs, linge hôtelier et réactivité : des avis qui font venir plus de réservations.</p></div>
            <div className="bene rv"><span className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z" /></svg></span><h3>Entretien &amp; hivernage</h3><p>Maintenance, déneigement, suivi du logement même hors saison : votre bien est entre de bonnes mains.</p></div>
          </div>
        </div>
      </section>

      {/* OPTIMISATION SAISONNIÈRE */}
      <section className="sec" style={{ background: "var(--white)" }}>
        <div className="wrap">
          <div className="sec-head center rv">
            <p className="eyebrow">Optimisation saisonnière</p>
            <h2>Des revenus toute l&apos;année — pas seulement l&apos;hiver.</h2>
            <p>La haute saison fait le gros des revenus. Mais ce sont les <strong>périodes creuses</strong> qui font la différence sur l&apos;année — et c&apos;est exactement là que nous faisons la différence.</p>
          </div>
          <div className="season-grid">
            <div className="scard rv">
              <span className="tag">Haute saison · Hiver</span>
              <h3>Chaque nuit valorisée au maximum</h3>
              <p>Tarification dynamique calée sur les vacances scolaires, les ponts et les pics d&apos;affluence. On capte le plein potentiel des semaines les plus demandées, sans jamais sous-vendre votre bien.</p>
            </div>
            <div className="scard gold rv">
              <span className="tag">Basse &amp; inter-saison · Printemps · Été · Automne</span>
              <h3>On remplit les périodes à faible taux d&apos;occupation</h3>
              <p>Randonnée, VTT, trail, événements, courts séjours et télétravail à la montagne : on active la demande hors-saison pour que votre bien ne dorme jamais. Des revenus sur <strong>12 mois, pas sur 4</strong>.</p>
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
            <p className="occ-note">Illustration. Notre objectif : lisser l&apos;occupation sur l&apos;année et combler les creux du printemps, de l&apos;été et de l&apos;automne — là où la plupart des biens restent vides.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sec" id="services" style={{ background: "var(--snow)" }}>
        <div className="wrap">
          <div className="svc">
            <div className="media rv"><img src="https://res.cloudinary.com/dxhtjrnvt/image/upload/f_auto,q_auto,w_1000/v1782299030/cledici/equipe-montagne.jpg" alt="L'équipe Cledici Conciergerie à Valmorel" loading="lazy" /></div>
            <div className="rv">
              <p className="eyebrow">Une gestion complète, de A à Z</p>
              <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>Tout ce qui fait la réussite de votre location en montagne.</h2>
              <ul>
                <li><span className="num">01</span><div><b>Création &amp; diffusion de l&apos;annonce</b><p>Photos professionnelles et mise en ligne sur Airbnb, Booking, Abritel…</p></div></li>
                <li><span className="num">02</span><div><b>Accueil des voyageurs &amp; check-in</b><p>Remise des clés, état des lieux, conseils station — à toute heure.</p></div></li>
                <li><span className="num">03</span><div><b>Ménage &amp; linge hôtelier</b><p>Un logement impeccable à chaque arrivée, linge fourni et entretenu.</p></div></li>
                <li><span className="num">04</span><div><b>Optimisation des prix</b><p>Tarifs ajustés aux saisons, vacances scolaires et événements de la station.</p></div></li>
                <li><span className="num">05</span><div><b>Maintenance &amp; hivernage</b><p>Interventions, petits travaux et suivi du bien, été comme hiver.</p></div></li>
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
              <p className="eyebrow">Sérénité &amp; protection</p>
              <h2>Votre bien protégé, pas seulement géré.</h2>
              <p>Confier votre logement, c&apos;est aussi le protéger. Les biens que nous prenons en gestion sont <strong>assurés par notre propre assurance</strong> — dégradations, nuisibles, perte d&apos;exploitation — et couverts par une <strong>assurance annulation</strong>. Vous louez l&apos;esprit totalement tranquille.</p>
            </div>
            <div className="ins-figs">
              <div className="ins-fig"><div className="v">50 000 €</div><div className="l">de dégradations potentielles couvertes, à l&apos;année</div></div>
              <div className="ins-fig"><div className="v">10 000 €</div><div className="l">de traitement des nuisibles pris en charge</div></div>
              <div className="ins-fig"><div className="v">5 000 €</div><div className="l">de perte d&apos;exploitation indemnisée</div></div>
              <div className="ins-fig"><div className="v">Annulation</div><div className="l">assurance en cas d&apos;annulation des voyageurs</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="exp" id="expertise">
        <Bg id="photo-1605540436563-5bca919ae766" alt="Montagne Valmorel" />
        <div className="wrap"><div className="inner rv in">
          <p className="eyebrow">Notre expertise</p>
          <h2>Experts de l&apos;habitat touristique de montagne depuis 2018.</h2>
          <p>Nous connaissons Valmorel et Le Grand Domaine par cœur : les saisons, les attentes des vacanciers, les spécificités d&apos;un bien en altitude. Cette expertise locale, nous la mettons au service de votre rentabilité.</p>
          <p>La puissance d&apos;une conciergerie structurée, avec la proximité d&apos;un acteur local présent toute l&apos;année.</p>
          <a href="#contact" className="btn btn-g" style={{ marginTop: 28 }}>Parler à un expert local</a>
        </div></div>
      </section>

      {/* APPROCHE */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center rv">
            <p className="eyebrow">Notre approche</p>
            <h2>On révèle le plein potentiel de votre bien.</h2>
            <p>Pas de tarif standard : on part de votre logement, on l&apos;analyse, on l&apos;améliore — et on vous dit précisément ce qu&apos;il peut vous rapporter.</p>
          </div>
          <div className="steps">
            <div className="step rv"><div className="n">1</div><h3>On audite votre bien</h3><p>Analyse complète de votre logement et de son potentiel locatif sur toute l&apos;année.</p></div>
            <div className="step rv"><div className="n">2</div><h3>On vous conseille</h3><p>Des recommandations concrètes pour améliorer les performances : aménagement, équipements, positionnement.</p></div>
            <div className="step rv"><div className="n">3</div><h3>On vous dit combien vous gagnez</h3><p>Une estimation claire de vos revenus <strong>nets par an</strong> — puis on va chercher le plein potentiel de votre bien.</p></div>
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="sec avis" id="avis">
        <div className="wrap">
          <div className="sec-head center rv">
            <p className="eyebrow">Ils nous font confiance</p>
            <h2>Des propriétaires sereins, saison après saison.</h2>
          </div>
          <div className="grid">
            <div className="q rv"><div className="st">★★★★★</div><p>« Je n&apos;habite pas la région et je ne pouvais pas gérer mon chalet à distance. Depuis qu&apos;ils s&apos;en occupent, mes revenus ont augmenté et je n&apos;ai plus aucune contrainte. »</p><div className="who"><span className="av">M</span><div><b>Marc</b><small>Chalet · Valmorel</small></div></div></div>
            <div className="q rv"><div className="st">★★★★★</div><p>« Accueil des vacanciers irréprochable, logement toujours nickel. On sent qu&apos;ils connaissent la montagne et la station. »</p><div className="who"><span className="av">S</span><div><b>Sophie</b><small>Appartement · Doucy</small></div></div></div>
            <div className="q rv"><div className="st">★★★★★</div><p>« Sérieux et réactifs. La tarification suit vraiment les saisons, ça change tout sur le rendement. »</p><div className="who"><span className="av">L</span><div><b>Laurent</b><small>T3 · Le Grand Domaine</small></div></div></div>
          </div>
        </div>
      </section>

      {/* ZONE */}
      <section className="sec zone" id="zone">
        <div className="wrap">
          <div className="sec-head rv"><p className="eyebrow">Notre terrain de jeu</p><h2>Valmorel &amp; Le Grand Domaine.</h2></div>
          <div className="box">
            <div className="rv">
              <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "var(--muted)" }}>Nous intervenons sur l&apos;ensemble de la station de Valmorel et du Grand Domaine — une zone que nous connaissons saison après saison depuis 2018.</p>
              <div className="pills">
                <Link href="/conciergerie/valmorel">Valmorel</Link>
                <Link href="/conciergerie/doucy">Doucy</Link>
                <Link href="/conciergerie/saint-francois-longchamp">Saint-François-Longchamp</Link>
                <Link href="/conciergerie/les-avanchers">Les Avanchers</Link>
                <span>Le Grand Domaine</span>
              </div>
            </div>
            <div className="map rv"><img src="https://images.unsplash.com/photo-1610476905310-cdc6d6e9a6a3?auto=format&fit=crop&w=900&q=80" alt="Station de Valmorel" /></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ background: "var(--snow)" }}>
        <div className="wrap">
          <div className="sec-head center rv"><p className="eyebrow">Bon à savoir</p><h2>Questions fréquentes</h2></div>
          <div className="faq rv">
            <details open><summary>Combien coûte votre conciergerie ?<span className="p">+</span></summary><p className="a">Pas de tarif standard : après audit de votre bien, nous établissons une proposition sur mesure basée sur son potentiel locatif annuel. L&apos;étude est gratuite et sans engagement.</p></details>
            <details><summary>Mon bien est-il éligible ?<span className="p">+</span></summary><p className="a">Appartement, studio ou chalet sur Valmorel et Le Grand Domaine : nous étudions chaque bien et vous disons en toute transparence son potentiel locatif.</p></details>
            <details><summary>Puis-je continuer à profiter de mon logement ?<span className="p">+</span></summary><p className="a">Bien sûr. Vous bloquez vos périodes quand vous le souhaitez, nous gérons le reste de l&apos;année.</p></details>
            <details><summary>Mon bien est-il assuré ?<span className="p">+</span></summary><p className="a">Oui. Les biens que nous prenons en gestion sont couverts par notre assurance : jusqu&apos;à 50 000 € de dégradations, 10 000 € de nuisibles, 5 000 € de perte d&apos;exploitation, plus une assurance annulation.</p></details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="estimer">
        <Bg id="photo-1517320964276-a002fa203177" alt="" />
        <div className="wrap"><div className="inner">
          <div className="rv">
            <p className="eyebrow" style={{ color: "#F2C879" }}>Prêt à déléguer ?</p>
            <h2>Confiez-nous votre bien à Valmorel.</h2>
            <p>Estimation gratuite et sans engagement. Un expert local vous recontacte sous 24 h.</p>
            <ul><li>Revenus optimisés sur toute la saison</li><li>Accueil &amp; ménage pris en charge</li><li>Un interlocuteur dédié, présent sur place</li></ul>
          </div>
          <LeadForm pfx="lf-final" title="Estimez vos revenus" hint="Réponse personnalisée sous 24 h." />
        </div></div>
      </section>

      <Footer />
    </>
  );
}
