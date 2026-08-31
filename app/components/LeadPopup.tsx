"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

const KEY = "cledici_popup";
const IMG_DEFAULT =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Domaine_de_Valmorel_et_Lauzi%C3%A8re_en_hiver_%28janvier_2022%29.JPG/1280px-Domaine_de_Valmorel_et_Lauzi%C3%A8re_en_hiver_%28janvier_2022%29.JPG";

type PopupCfg = {
  enabled?: boolean | string;
  mode?: "capture" | "magnet";
  eyebrow?: string;
  title?: string;
  hint?: string;
  image?: string;
  magnetUrl?: string;
  magnetLabel?: string;
  delaySeconds?: number | string;
  frequencyDays?: number | string;
};

/**
 * Popup lead-magnet (bas-tunnel), éditable dans l'admin (cfg.popup). Mise en page
 * 2 colonnes : image à gauche, formulaire à droite (empilé sur mobile). Réutilise
 * le LeadForm existant (leads → Mongo + email + CRM admin). Fréquence en localStorage.
 */
export default function LeadPopup({ popup }: { popup?: PopupCfg }) {
  const raw = popup?.enabled;
  const enabled = raw === undefined ? true : !(raw === false || ["non", "false", "off", "0", ""].includes(String(raw).toLowerCase()));
  const delayMs = (Number(popup?.delaySeconds) || 6) * 1000;
  const days = Number(popup?.frequencyDays) || 7;
  const eyebrow = popup?.eyebrow || "Offre propriétaires";
  const title = popup?.title || "Estimez gratuitement vos revenus à Valmorel";
  const hint = popup?.hint || "Gratuit et sans engagement, un expert local vous recontacte sous 24 h.";
  const image = popup?.image || IMG_DEFAULT;
  const isMagnet = popup?.mode === "magnet" && !!popup?.magnetUrl;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      const seen = localStorage.getItem(KEY);
      if (seen && Date.now() - Number(seen) < days * 864e5) return;
    } catch {
      /* localStorage indispo → on affiche quand même */
    }
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [enabled, delayMs, days]);

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
      aria-label={title}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(15,23,32,.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <style>{`
        .cledici-popup .rv{opacity:1 !important;transform:none !important;}
        /* Formulaire à plat dans le popup : on retire la carte/ombre du .lead */
        .cledici-popup .lead{background:transparent;border-radius:0;box-shadow:none;padding:26px 28px 28px;}
        .cledici-pop-card{position:relative;display:flex;background:#fff;border-radius:18px;overflow:hidden;max-width:760px;width:100%;max-height:92vh;box-shadow:0 30px 80px rgba(0,0,0,.4);}
        .cledici-pop-media{position:relative;flex:0 0 44%;min-height:100%;background-size:cover;background-position:center;}
        .cledici-pop-media::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,33,30,.15) 0%,rgba(12,33,30,.75) 100%);}
        .cledici-pop-media .ov{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;justify-content:space-between;padding:20px;color:#fff;}
        .cledici-pop-badge{align-self:flex-start;background:var(--gold);color:var(--ink);font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;border-radius:30px;}
        .cledici-pop-trust .st{color:#F2C879;letter-spacing:2px;font-size:14px;}
        .cledici-pop-trust b{display:block;font-size:17px;font-weight:800;margin-top:2px;}
        .cledici-pop-trust span{font-size:12.5px;opacity:.85;}
        .cledici-pop-form{flex:1;min-width:0;overflow-y:auto;max-height:92vh;}
        .cledici-pop-close{position:absolute;top:12px;right:12px;z-index:2;width:34px;height:34px;border-radius:50%;border:none;background:rgba(255,255,255,.92);color:#0F172A;font-size:22px;line-height:1;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.18);}
        @media (max-width:640px){
          .cledici-pop-card{flex-direction:column;max-height:94vh;}
          .cledici-pop-media{flex:none;min-height:120px;height:120px;}
          .cledici-pop-media .ov{padding:14px;}
          .cledici-pop-trust{display:none;}
          .cledici-pop-form{max-height:none;}
          .cledici-popup .lead{padding:22px 20px 24px;}
        }
      `}</style>

      <div className="cledici-popup cledici-pop-card" onClick={(e) => e.stopPropagation()}>
        <button className="cledici-pop-close" onClick={close} aria-label="Fermer">×</button>

        {/* Colonne image (gauche) */}
        <div className="cledici-pop-media" style={{ backgroundImage: `url("${image}")` }}>
          <div className="ov">
            <span className="cledici-pop-badge">{eyebrow}</span>
            <div className="cledici-pop-trust">
              <span className="st">★★★★★</span>
              <b>4,9 / 5</b>
              <span>Propriétaires accompagnés depuis 2018</span>
            </div>
          </div>
        </div>

        {/* Colonne formulaire (droite) */}
        <div className="cledici-pop-form">
          <LeadForm
            pfx="lf-popup"
            title={title}
            hint={hint}
            emailOnly
            submitLabel={isMagnet ? "Recevoir le dossier" : "Estimer mes revenus"}
            magnetUrl={isMagnet ? popup?.magnetUrl : undefined}
            magnetLabel={popup?.magnetLabel}
          />
        </div>
      </div>
    </div>
  );
}
