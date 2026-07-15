"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Révélations au scroll : ajoute .in aux éléments .rv quand ils entrent dans le viewport. */
export default function RevealInit() {
  const pathname = usePathname();
  useEffect(() => {
    // threshold:0 => se déclenche dès qu'un pixel entre (robuste même pour les
    // blocs plus hauts que l'écran, où un ratio de 0.16 ne serait jamais atteint).
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    els.forEach((el) => io.observe(el));
    // Filet de sécurité : si le JS/observer ne déclenche pas (élément géant, tab
    // inactif…), on révèle tout après un court délai pour ne jamais laisser de vide.
    const fallback = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("in"));
    }, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);
  return null;
}
