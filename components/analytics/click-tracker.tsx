"use client";

import { useEffect } from "react";
import {
  captureAttribution,
  getAttribution,
  pageTypeFromPath,
  pushEvent,
} from "@/lib/analytics";

function isWhatsAppHref(href: string): boolean {
  return /(^https?:\/\/)?(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(
    href,
  );
}

/**
 * Rastreamento global (todas as páginas): um `whatsapp_click` por clique em
 * link do WhatsApp e um `phone_click` por clique em link `tel:`.
 * Links que já enviam o próprio evento (landing pages) usam
 * `data-track="manual"` e são ignorados aqui, evitando duplicidade.
 */
export function ClickTracker() {
  useEffect(() => {
    captureAttribution();

    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.dataset.track === "manual") return;

      const href = link.getAttribute("href") || "";
      const base = {
        page_type: pageTypeFromPath(window.location.pathname),
        cta_id: link.id || link.dataset.conversion || undefined,
        link_text: (link.textContent || "").trim().slice(0, 100) || undefined,
        ...getAttribution(),
      };

      if (isWhatsAppHref(href)) {
        pushEvent("whatsapp_click", base);
      } else if (href.startsWith("tel:")) {
        pushEvent("phone_click", base);
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
