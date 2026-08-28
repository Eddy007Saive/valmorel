"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

const KEY = "cledici_popup";
const DAYS = 7; // ne pas réafficher avant N jours après vue/fermeture

/**
 * Popup lead-magnet (bas-tunnel) : apparaît ~6 s après l'arrivée, réutilise le
 * LeadForm existant (donc les leads partent déjà vers Mongo + email + CRM admin).
 * Fréquence mémorisée en localStorage. Respecte prefers-reduced-motion.
 */
export default function LeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(KEY);
      if (seen && Date.now() - Number(seen) < DAYS * 864e5) return;
    } catch {
      /* localStorage indispo → on affiche quand même */
    }
    const t = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Estimez vos revenus à Valmorel"
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(15,23,32,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      {/* Le LeadForm porte la classe .rv (révélée au scroll) → on force sa visibilité dans le popup */}
      <style>{`.cledici-popup .rv{opacity:1 !important;transform:none !important;}`}</style>
      <div
        className="cledici-popup"
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", background: "#fff", borderRadius: 18, maxWidth: 440, width: "100%", boxShadow: "0 30px 80px rgba(0,0,0,.35)", overflow: "hidden", maxHeight: "92vh", overflowY: "auto" }}
      >
        <div style={{ height: 6, background: "var(--gold)" }} />
        <button
          onClick={close}
          aria-label="Fermer"
          style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%", border: "none", background: "#f1f5f9", color: "#64748b", fontSize: 22, lineHeight: 1, cursor: "pointer", zIndex: 1 }}
        >
          ×
        </button>
        <div style={{ padding: "24px 24px 26px" }}>
          <p style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold)" }}>Offre propriétaires</p>
          <LeadForm
            pfx="lf-popup"
            title="Estimez gratuitement vos revenus à Valmorel"
            hint="Gratuit et sans engagement — un expert local vous recontacte sous 24 h."
          />
        </div>
      </div>
    </div>
  );
}
