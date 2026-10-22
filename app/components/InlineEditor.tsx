"use client";

import { useEffect } from "react";

/**
 * Édition en contexte (#2).
 * Ne s'active QUE lorsque la page est ouverte DANS l'admin (iframe) avec ?edit=1.
 * - Textes : éléments `data-edit="chemin.config"` → cliquables/éditables.
 * - Images : éléments `data-edit-img="chemin.config"` → bouton « Changer la photo ».
 * À la validation, on envoie la modif à l'admin (postMessage) ; c'est l'admin
 * (authentifié) qui enregistre (et qui upload les images). Le front ne fait qu'émettre.
 */
export default function InlineEditor() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") !== "1") return;
    if (window.self === window.top) return;
    const host = params.get("host");
    if (!host) return;

    document.documentElement.setAttribute("data-gt-edit", "1");

    const style = document.createElement("style");
    style.textContent = `
      [data-gt-edit] [data-edit]{outline:1.5px dashed transparent;outline-offset:3px;border-radius:4px;cursor:pointer;transition:outline-color .15s,background .15s}
      [data-gt-edit] [data-edit]:hover{outline-color:#FF5A6E;background:rgba(255,90,110,.07)}
      [data-gt-edit] [data-edit][contenteditable="true"]{outline:1.5px solid #FF5A6E;background:rgba(255,90,110,.09);cursor:text}
      #gt-edit-badge{position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:2147483647;background:#111827;color:#fff;font:600 12.5px/1.2 system-ui,-apple-system,sans-serif;padding:9px 15px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.28);pointer-events:none;white-space:nowrap}
      .gt-img-btn{position:fixed;z-index:2147483646;background:#111827;color:#fff;border:0;border-radius:8px;font:600 12px/1 system-ui,-apple-system,sans-serif;padding:8px 11px;display:none;gap:6px;align-items:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.3)}
      .gt-img-btn:hover{background:#FF5A6E}
    `;
    document.head.appendChild(style);

    const badge = document.createElement("div");
    badge.id = "gt-edit-badge";
    const IDLE = "✏️ Cliquez un texte (ou « Changer la photo ») pour modifier";
    const EDITING = "Entrée pour valider · Échap pour annuler";
    badge.textContent = IDLE;
    document.body.appendChild(badge);

    // ─────────── TEXTE ───────────
    let active: HTMLElement | null = null;
    let original = "";
    const text = (el: HTMLElement) => el.textContent ?? "";
    const norm = (s: string) => s.replace(/\s+/g, " ").trim();

    function startEdit(el: HTMLElement) {
      if (active && active !== el) finish(active, true);
      active = el;
      original = text(el);
      el.setAttribute("contenteditable", "true");
      el.focus();
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      sel?.removeAllRanges();
      sel?.addRange(range);
      badge.textContent = EDITING;
    }
    function finish(el: HTMLElement, commit: boolean) {
      el.removeAttribute("contenteditable");
      const value = norm(text(el));
      if (commit) {
        if (value && value !== norm(original)) {
          const path = el.getAttribute("data-edit");
          if (path) window.parent.postMessage({ type: "gt-edit", path, value }, host!);
        } else {
          el.textContent = original;
        }
      } else {
        el.textContent = original;
      }
      if (active === el) active = null;
      badge.textContent = IDLE;
    }

    function onClick(e: MouseEvent) {
      const t = (e.target as HTMLElement).closest("[data-edit]") as HTMLElement | null;
      if (!t) return;
      e.preventDefault();
      e.stopPropagation();
      if (t !== active) startEdit(t);
    }
    function onKey(e: KeyboardEvent) {
      if (!active) return;
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); const el = active; finish(el, true); el.blur(); }
      else if (e.key === "Escape") { e.preventDefault(); const el = active; finish(el, false); el.blur(); }
    }
    function onBlur(e: FocusEvent) {
      const el = e.target as HTMLElement;
      if (el?.getAttribute?.("contenteditable") === "true" && el === active) finish(el, true);
    }

    // ─────────── IMAGES ───────────
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    let pendingPath = "";
    const imgEls = Array.from(document.querySelectorAll<HTMLElement>("[data-edit-img]"));
    const pairs: { el: HTMLElement; btn: HTMLButtonElement; path: string }[] = [];

    for (const el of imgEls) {
      const path = el.getAttribute("data-edit-img") || "";
      const btn = document.createElement("button");
      btn.className = "gt-img-btn";
      btn.type = "button";
      btn.textContent = "📷 Changer la photo";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        pendingPath = path;
        (btn as HTMLButtonElement).dataset.for = path;
        fileInput.value = "";
        fileInput.click();
      });
      document.body.appendChild(btn);
      pairs.push({ el, btn, path });
    }

    function reposition() {
      for (const { el, btn } of pairs) {
        const r = el.getBoundingClientRect();
        const visible = r.width > 4 && r.height > 4 && r.bottom > 0 && r.top < window.innerHeight;
        if (!visible) { btn.style.display = "none"; continue; }
        btn.style.display = "inline-flex";
        btn.style.top = Math.max(8, r.top + 12) + "px";
        btn.style.left = r.left + 12 + "px";
      }
    }

    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (!file || !pendingPath) return;
      const p = pairs.find((x) => x.path === pendingPath);
      if (p) p.btn.textContent = "Envoi…";
      window.parent.postMessage({ type: "gt-img", path: pendingPath, file }, host!);
    });

    // Réponse de l'admin après upload : on applique la nouvelle URL
    function onAdminMsg(e: MessageEvent) {
      if (e.origin !== host) return;
      const d = e.data as { type?: string; path?: string; url?: string };
      if (d?.type !== "gt-img-done" || !d.path || !d.url) return;
      const p = pairs.find((x) => x.path === d.path);
      if (!p) return;
      if (p.el.tagName === "IMG") (p.el as HTMLImageElement).src = d.url;
      else p.el.style.backgroundImage = `url("${d.url}")`;
      p.btn.textContent = "📷 Changer la photo";
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("blur", onBlur, true);
    window.addEventListener("message", onAdminMsg);
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    const repoTimer = window.setInterval(reposition, 600);
    reposition();
    window.parent.postMessage({ type: "gt-ready" }, host);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("blur", onBlur, true);
      window.removeEventListener("message", onAdminMsg);
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
      clearInterval(repoTimer);
      style.remove();
      badge.remove();
      fileInput.remove();
      pairs.forEach((p) => p.btn.remove());
      document.documentElement.removeAttribute("data-gt-edit");
    };
  }, []);

  return null;
}
