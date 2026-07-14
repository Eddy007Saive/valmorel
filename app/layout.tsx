import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import RevealInit from "./components/RevealInit";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valmorel.cledici.fr"),
  title: {
    default: "Cledici Conciergerie — Conciergerie Airbnb à Valmorel",
    template: "%s — Cledici Conciergerie",
  },
  description:
    "Expert de l'habitat touristique de montagne depuis 2018. Confiez votre bien à Valmorel : rentabilité optimisée toute l'année (y compris en période creuse), accueil des voyageurs, entretien et suivi.",
  keywords: ["conciergerie Valmorel", "conciergerie Airbnb Valmorel", "gestion location Valmorel", "location saisonnière Valmorel"],
  verification: { google: "9JwZDkYSpKho3KbBb0M75yIxpDXz1m3ndkBbWwaQspU" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
      </head>
      <body>
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
