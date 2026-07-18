import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

type Body = {
  propertyType?: string;
  email?: string;
  phone?: string;
  source?: string;
  company?: string; // honeypot anti-spam (doit rester vide)
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un bot remplit ce champ → on fait comme si tout allait bien.
  if (body.company) return NextResponse.json({ ok: true });

  const propertyType = (body.propertyType || "").trim().slice(0, 60);
  const email = (body.email || "").trim().slice(0, 160);
  const phone = (body.phone || "").trim().slice(0, 40);
  const source = (body.source || "site").trim().slice(0, 60);

  if (!isEmail(email) && !phone) {
    return NextResponse.json({ error: "Indiquez un email ou un téléphone valide." }, { status: 422 });
  }

  const lead = { site: "cledici", property_type: propertyType, email, phone, source };
  let stored = false;
  let mailed = false;
  const errors: string[] = [];

  // 1) Stockage Supabase (si configuré)
  const SB_URL = process.env.SUPABASE_URL;
  const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (SB_URL && SB_KEY) {
    try {
      const supabase = createClient(SB_URL, SB_KEY, { auth: { persistSession: false } });
      const { error } = await supabase.from("leads").insert(lead);
      if (error) errors.push("db:" + error.message);
      else stored = true;
    } catch (e) {
      errors.push("db:" + (e as Error).message);
    }
  }

  // 2) Email de notification (si configuré)
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.RESEND_RECIPIENT_EMAIL;
  const senderEmail = process.env.RESEND_SENDER_EMAIL;
  const senderName = process.env.RESEND_SENDER_NAME || "Site Cledici";
  const FROM = senderEmail ? `${senderName} <${senderEmail}>` : "Cledici <onboarding@resend.dev>";
  if (RESEND_KEY && TO) {
    try {
      const resend = new Resend(RESEND_KEY);
      const { error } = await resend.emails.send({
        from: FROM,
        to: TO.split(",").map((s) => s.trim()),
        replyTo: isEmail(email) ? email : undefined,
        subject: `Nouvelle demande — ${propertyType || "bien"} à Valmorel`,
        text:
          `Nouvelle demande depuis le site Cledici :\n\n` +
          `Type de bien : ${propertyType || "—"}\n` +
          `Email : ${email || "—"}\n` +
          `Téléphone : ${phone || "—"}\n` +
          `Source : ${source}\n`,
      });
      if (error) errors.push("mail:" + error.message);
      else mailed = true;
    } catch (e) {
      errors.push("mail:" + (e as Error).message);
    }
  }

  if (!stored && !mailed) {
    console.error("[lead] aucune destination n'a fonctionné", errors);
    return NextResponse.json(
      { error: "Le service est momentanément indisponible. Réessayez ou écrivez-nous directement." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, stored, mailed });
}
