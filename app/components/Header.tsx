"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/#services", label: "Nos services" },
  { href: "/nos-interventions", label: "Nos interventions" },
  { href: "/securite-reglementation", label: "Sécurité & réglementation" },
  { href: "/blog", label: "Blog" },
];

/** En-tête. `solid` = fond blanc (pages sans hero sombre). Par défaut transparent (accueil). */
export default function Header({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={`site-header${solid ? " solid" : ""}${open ? " open" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="brand" onClick={close}>
          <span className="m">▲</span>
          <div>
            Cledici Conciergerie
            <small>Valmorel · Le Grand Domaine</small>
          </div>
        </Link>

        <nav className="menu">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <div className="nav-right">
          <Link href="/#contact" className="btn btn-g">Estimer mes revenus</Link>
          <button
            type="button"
            className="burger"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <nav className={`mobile-menu${open ? " show" : ""}`} aria-hidden={!open}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={close}>{l.label}</Link>
        ))}
        <Link href="/#contact" className="btn btn-g" onClick={close}>Estimer mes revenus</Link>
      </nav>
    </header>
  );
}
