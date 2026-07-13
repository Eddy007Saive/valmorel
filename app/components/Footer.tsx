import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <div className="brand" style={{ display: "flex", alignItems: "center", gap: 11, fontWeight: 800, fontSize: 20 }}>
            <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: "var(--green)", color: "#fff" }}>▲</span>
            Cledici Conciergerie
          </div>
          <div style={{ fontSize: 13.5 }}>Expert de l&apos;habitat touristique de montagne depuis 2018 · Valmorel</div>
        </div>
        <div className="foot-bot">
          <span>© Cledici Conciergerie — Tous droits réservés.</span>
          <span>
            <a href="https://cledici.fr" style={{ color: "rgba(255,255,255,.62)" }}>cledici.fr</a> ·{" "}
            <Link href="/mentions-legales">Mentions légales</Link> · <Link href="/confidentialite">Confidentialité</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
