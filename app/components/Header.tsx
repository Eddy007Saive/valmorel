"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#services", label: "Nos services" },
  { href: "/nos-interventions", label: "Nos interventions" },
  { href: "/securite-reglementation", label: "Sécurité & réglementation" },
  { href: "/blog", label: "Blog" },
];

/** En-tête fixe. `solid` = fond blanc permanent (pages sans hero sombre).
 *  Accueil (transparent) : devient solide au scroll. Menu mobile = tiroir latéral. */
export default function Header({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  // Solidifie l'accueil après un léger scroll
  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // Verrou du scroll quand le tiroir est ouvert + fermeture à Échap
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const cls = `site-header${solid ? " solid" : ""}${scrolled ? " scrolled" : ""}${open ? " open" : ""}`;

  return (
    <header className={cls}>
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

      {/* Tiroir mobile */}
      <div className={`scrim${open ? " show" : ""}`} onClick={close} aria-hidden="true" />
      <nav className={`drawer${open ? " show" : ""}`} aria-label="Navigation" aria-hidden={!open}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="nav-link" onClick={close}>
            {l.label} <span className="chev">→</span>
          </Link>
        ))}
        <Link href="/#estimer" className="btn btn-g" onClick={close}>Estimer mes revenus</Link>
        <p className="tel">Un expert local vous répond sous 24 h</p>
      </nav>
    </header>
  );
}
