import { ARTICLES, getArticle } from "./articles";

/**
 * Source de vérité du blog = la base GoodTime (éditable dans l'admin), lue via
 * l'API publique du back avec l'en-tête x-tenant. Fallback : les articles locaux
 * (app/lib/articles.ts) si l'API est injoignable → le site ne casse jamais.
 */
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";
const TENANT = process.env.TENANT ?? "client_03";

export type BlogItem = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  contentHtml?: string;
  seoTitle?: string;
  seoDescription?: string;
};

type ApiCard = { slug: string; title: string; excerpt?: string | null; coverImage?: string | null; publishedAt?: string | null };
type ApiPost = ApiCard & { content: string; seoTitle?: string | null; seoDescription?: string | null };

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, { headers: { "x-tenant": TENANT }, cache: "no-store" });
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

const fromLocal = (a: (typeof ARTICLES)[number]): BlogItem => ({
  slug: a.slug, title: a.title, excerpt: a.excerpt, cover: a.cover, date: a.date, contentHtml: a.contentHtml,
  seoTitle: (a as { seoTitle?: string }).seoTitle, seoDescription: (a as { seoDescription?: string }).seoDescription,
});

/** Liste des articles (base → fallback local). */
export async function getPosts(): Promise<BlogItem[]> {
  try {
    const { items } = await api<{ items: ApiCard[] }>("/api/public/blog");
    if (items?.length) {
      return items.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt ?? "", cover: p.coverImage ?? "", date: p.publishedAt ?? "" }));
    }
  } catch { /* fallback */ }
  return ARTICLES.map(fromLocal);
}

/** Un article par slug (base → fallback local), ou null. */
export async function getPost(slug: string): Promise<BlogItem | null> {
  try {
    const { item } = await api<{ item: ApiPost }>(`/api/public/blog/${encodeURIComponent(slug)}`);
    if (item) return { slug: item.slug, title: item.title, excerpt: item.excerpt ?? "", cover: item.coverImage ?? "", date: item.publishedAt ?? "", contentHtml: item.content, seoTitle: item.seoTitle ?? undefined, seoDescription: item.seoDescription ?? undefined };
  } catch { /* fallback */ }
  const a = getArticle(slug);
  return a ? fromLocal(a) : null;
}
