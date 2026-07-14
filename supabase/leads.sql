-- Table des demandes de contact (leads) — à exécuter dans Supabase (SQL Editor).
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  site text not null default 'cledici',
  property_type text,
  email text,
  phone text,
  source text
);

-- RLS activé : seule la clé service_role (utilisée par l'API serveur) peut écrire/lire.
alter table public.leads enable row level security;

-- Index pratique pour filtrer par site / trier par date.
create index if not exists leads_site_created_idx on public.leads (site, created_at desc);
