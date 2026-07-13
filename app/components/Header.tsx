import Link from "next/link";

/** En-tête. `solid` = fond blanc (pages sans hero sombre). Par défaut transparent (accueil). */
export default function Header({ solid = false }: { solid?: boolean }) {
  return (
    <header className={`site-header${solid ? " solid" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="brand">
          <span className="m">▲</span>
          <div>
            Cledici Conciergerie
            <small>Valmorel · Le Grand Domaine</small>
          </div>
        </Link>
        <nav className="menu">
          <Link href="/#services">Nos services</Link>
          <Link href="/nos-interventions">Nos interventions</Link>
          <Link href="/securite-reglementation">Sécurité &amp; réglementation</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <Link href="/#contact" className="btn btn-g">Estimer mes revenus</Link>
      </div>
    </header>
  );
}
