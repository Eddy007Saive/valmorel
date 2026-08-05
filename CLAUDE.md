# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js version warning

This repo runs **Next.js 16.2.10** — a version newer than your training data, with breaking API/convention changes. Before writing any Next.js code (routing, metadata, data fetching, config), consult `node_modules/next/dist/docs/` rather than relying on prior knowledge. Notable: `params` in page/route handlers is a `Promise` that must be `await`ed (see every page under `app/`).

## What this is

Marketing/lead-gen site for **Cledici Conciergerie**, an Airbnb/seasonal-rental property management business in Valmorel (Savoie, France) and the surrounding "Grand Domaine" ski area. All content is in French. The site is SEO/GEO-oriented (structured data, `llms.txt`, AI-crawler allowances) and exists to drive leads through a contact form.

## Commands

```bash
npm run dev      # next dev — local dev server
npm run build    # next build
npm run start    # next start — serve production build
npm run lint     # eslint
```

There is no test suite configured.

## Architecture

Next.js App Router, TypeScript, Tailwind v4 (via `@tailwindcss/postcss`). No component library — styling is mostly hand-written CSS in `app/globals.css` plus inline `style={}` objects.

### Content model: data files, not CMS

Page content lives in plain TypeScript data files under `app/lib/`, not a headless CMS or MDX:
- `app/lib/cities.ts` — the `CITIES` array driving every commune (Valmorel, Doucy, Saint-François-Longchamp, Les Avanchers). Each entry has `slug`, marketing copy, `highlights`, `neighbors` (used for internal linking), and an FAQ used both for on-page rendering and `FAQPage` JSON-LD.
- `app/lib/cityContent.ts` — long-form HTML strings (`CITY_CONTENT[slug]`, `ZONE_CONTENT`) injected via `dangerouslySetInnerHTML` into the per-commune and `/nos-interventions` pages. This is deliberate: per-commune "gestion locative" content is merged into these pages rather than split into separate blog posts, to concentrate SEO authority.
- `app/lib/articles.ts` — the `ARTICLES` array for `/blog`, each with a raw HTML `contentHtml` string, plus `getArticle(slug)` / `fmtDate()` helpers. Blog `<h3>question</h3><p>answer</p>` pairs are regex-extracted at render time to auto-generate `FAQPage` JSON-LD (see `app/blog/[slug]/page.tsx`).

When adding a commune or article, add an entry to the relevant array — do not create new page files. Routes are generated via `generateStaticParams()` from these arrays.

### Route structure

- `app/page.tsx` — homepage (single large page: hero, services, lead form).
- `app/conciergerie/[ville]/page.tsx` — one page per commune from `CITIES`, includes `LocalBusiness` + `FAQPage` + `BreadcrumbList` JSON-LD.
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` — article list/detail from `ARTICLES`, includes `Article` (+ auto-derived `FAQPage`) JSON-LD.
- `app/nos-interventions/page.tsx` — zone hub linking to every commune page.
- `app/securite-reglementation/page.tsx` — static regulatory/compliance content.
- `app/api/lead/route.ts` — POST endpoint backing the lead form (see below).
- `app/llms.txt/route.ts` — plain-text GEO endpoint listing pages/cities/articles for AI crawlers, `force-static`.
- `app/sitemap.ts`, `app/robots.ts` — generated from `CITIES`/`ARTICLES`; `robots.ts` explicitly allowlists AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) for GEO purposes.

`BASE`/canonical URL is hardcoded as `https://valmorel.cledici.fr` in `sitemap.ts`, `robots.ts`, and `layout.tsx`'s `metadataBase` — update all three if the domain changes.

### Lead capture (`app/api/lead/route.ts` + `app/components/LeadForm.tsx`)

Dual-destination submission, non-fatal if one side fails:
1. **MongoDB** (if `MONGO_URL` set) — inserts into `cledici.leads` via `app/lib/mongo.ts`, which caches the `MongoClient` on `globalThis` to survive serverless invocations.
2. **Resend email** (if `RESEND_API_KEY` + `RESEND_RECIPIENT_EMAIL` set) — notification email, `replyTo` set to the lead's email when valid.

The route only 502s if *both* destinations fail or are unconfigured; it succeeds if at least one works. Includes a honeypot field (`company`) and basic email/phone validation. See `.env.example` for the full variable list.

### Shared UI

`app/components/Header.tsx` (client component, transparent-on-home/solid-elsewhere + mobile drawer), `Footer.tsx`, `LeadForm.tsx` (client component, posts to `/api/lead`), `RevealInit.tsx` (scroll-reveal animation init, mounted once in `layout.tsx`).

### SEO/GEO conventions to preserve

- Every content page emits JSON-LD via inline `<script type="application/ld+json">`.
- `robots.ts` intentionally allows AI/LLM crawlers — don't restrict this without explicit instruction.
- `llms.txt` must stay in sync with `CITIES`/`ARTICLES` (it's derived automatically, so no manual sync needed unless the format changes).
- Images are remote (Unsplash, Cloudinary) — allowed hosts are whitelisted in `next.config.ts` under `images.remotePatterns`; add new hosts there before using them in `next/image`.
