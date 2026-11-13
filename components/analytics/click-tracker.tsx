"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { CONSENT_CHANGED_EVENT } from "@/lib/consent";
import { pushEvent, type ContactIntent } from "@/lib/analytics";

function isWhatsAppHref(href: string): boolean {
  return /(^https?:\/\/)?(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(
    href,
  );
}

/**
 * Único ouvinte global de cliques (todas as páginas). Um clique = um evento:
 * - link do WhatsApp → `whatsapp_click` (`data-button-location`, `data-button-id`,
 *   `data-contact-intent`);
 * - `tel:` → `phone_click`; `mailto:` → `email_click`;
 * - `[data-service-card]` → `service_card_click`;
 * - `[data-cta-id]` (link interno relevante) → `cta_click`.
 * Links que enviam o próprio evento (landing pages, que precisam inserir o
 * código de atendimento na mensagem) usam `data-track="manual"` e são ignorados.
 */
export function ClickTracker() {
  useEffect(() => {
    captureAttribution();
    // Marketing concedido depois da entrada: guarda a atribuição da URL atual.
    window.addEventListener(CONSENT_CHANGED_EVENT, captureAttribution);

    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.dataset.track === "manual") return;

      const href = link.getAttribute("href") || "";
      const buttonId = link.dataset.buttonId || link.id || undefined;

      if (isWhatsAppHref(href)) {
        pushEvent("whatsapp_click", {
          button_location: link.dataset.buttonLocation || "nao_identificado",
          button_id: buttonId,
          contact_intent: (link.dataset.contactIntent as ContactIntent) || "orcamento",
        });
      } else if (href.startsWith("tel:")) {
        pushEvent("phone_click", {
          button_location: link.dataset.buttonLocation || "nao_identificado",
          button_id: buttonId,
        });
      } else if (href.startsWith("mailto:")) {
        pushEvent("email_click", {
          button_location: link.dataset.buttonLocation || "nao_identificado",
          button_id: buttonId,
        });
      } else if (link.dataset.serviceCard) {
        pushEvent("service_card_click", {
          service_name: link.dataset.serviceCard,
          button_location: link.dataset.buttonLocation || "servicos",
          button_id: buttonId,
        });
      } else if (link.dataset.ctaId) {
        pushEvent("cta_click", {
          button_location: link.dataset.buttonLocation || "nao_identificado",
          button_id: link.dataset.ctaId,
        });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener(CONSENT_CHANGED_EVENT, captureAttribution);
    };
  }, []);

  return null;
}
