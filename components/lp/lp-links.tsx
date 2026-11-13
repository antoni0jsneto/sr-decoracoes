"use client";

import type { MouseEvent, ReactNode } from "react";
import { pushEvent, type ContactIntent } from "@/lib/analytics";
import { getLeadRef, recordLeadAttribution } from "@/lib/attribution";
import { PHONE_E164, whatsappUrl } from "@/lib/site";

/** Contexto da landing enviado em todos os eventos da página. */
export interface LpContext {
  slug: string;
  serviceId: string;
  refPrefix: string;
}

/** Mensagem final do WhatsApp com o código de referência do atendimento. */
export function messageWithRef(message: string, ref: string) {
  return `${message}\n\nCódigo do site: ${ref}`;
}

interface LinkProps {
  context: LpContext;
  ctaId: string;
  position: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Link do WhatsApp das landing pages. Sem JavaScript funciona com a mensagem
 * padrão; com JavaScript acrescenta o código de referência e envia um único
 * `whatsapp_click` (o rastreador global ignora links `data-track="manual"`).
 */
export function LpWhatsAppLink({
  context,
  message,
  ctaId,
  position,
  className,
  children,
  ariaLabel,
  intent = "orcamento",
}: LinkProps & { message: string; intent?: ContactIntent }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // O código do atendimento vai na mensagem e no registro próprio de
    // atribuição (só com Marketing concedido). Não vai para o GA4.
    const ref = getLeadRef(context.refPrefix);
    event.currentTarget.href = whatsappUrl(messageWithRef(message, ref));
    pushEvent("whatsapp_click", {
      button_location: position,
      button_id: ctaId,
      contact_intent: intent,
    });
    recordLeadAttribution(ref, context.serviceId);
  }

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="manual"
      data-cta-id={ctaId}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

export function LpPhoneLink({
  context,
  ctaId,
  position,
  className,
  children,
  ariaLabel,
}: LinkProps) {
  return (
    <a
      href={`tel:${PHONE_E164}`}
      data-track="manual"
      data-cta-id={ctaId}
      className={className}
      aria-label={ariaLabel}
      onClick={() =>
        pushEvent("phone_click", {
          button_location: position,
          button_id: ctaId,
        })
      }
    >
      {children}
    </a>
  );
}
