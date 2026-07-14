"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function LeadForm({
  title,
  hint,
  pfx,
  anchor,
}: {
  title: string;
  hint: string;
  pfx: string;
  anchor?: boolean;
}) {
  const [propertyType, setPropertyType] = useState("Appartement");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!email && !phone) {
      setStatus("error");
      setMsg("Indiquez au moins un email ou un téléphone.");
      return;
    }
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyType, email, phone, company, source: pfx }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Une erreur est survenue.");
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setMsg((err as Error).message || "Une erreur est survenue. Réessayez.");
    }
  }

  if (status === "ok") {
    return (
      <div className="lead rv in" {...(anchor ? { id: "contact" } : {})}>
        <div style={{ textAlign: "center", padding: "18px 4px" }}>
          <div style={{ fontSize: 44, lineHeight: 1 }}>✓</div>
          <h2 style={{ marginTop: 14 }}>Demande envoyée !</h2>
          <p className="hint" style={{ marginTop: 10 }}>
            Merci. Un expert local vous recontacte sous 24 h pour estimer le potentiel de votre bien à Valmorel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="lead rv" onSubmit={onSubmit} {...(anchor ? { id: "contact" } : {})} noValidate>
      <h2>{title}</h2>
      <p className="hint">{hint}</p>

      <label htmlFor={`${pfx}-type`}>Type de bien</label>
      <select id={`${pfx}-type`} aria-label="Type de bien" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
        <option>Appartement</option>
        <option>Chalet</option>
        <option>Studio</option>
        <option>Autre</option>
      </select>

      <label htmlFor={`${pfx}-email`}>Adresse e-mail</label>
      <input id={`${pfx}-email`} type="email" aria-label="Adresse e-mail" placeholder="vous@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />

      <label htmlFor={`${pfx}-tel`}>Téléphone</label>
      <input id={`${pfx}-tel`} type="tel" aria-label="Téléphone" placeholder="06 00 00 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />

      {/* Honeypot anti-spam : masqué aux humains */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <button type="submit" className="btn btn-green" disabled={status === "loading"}>
        {status === "loading" ? "Envoi en cours…" : "Être recontacté"}
      </button>

      {status === "error" && (
        <p style={{ color: "#c0392b", fontSize: 13.5, marginTop: 10, fontWeight: 600 }}>{msg}</p>
      )}

      <div className="commission">
        Proposition sur mesure<b>Étude gratuite de votre potentiel locatif</b>
      </div>
    </form>
  );
}
