"use client";

import type { MouseEvent, ReactNode } from "react";
import { getAttribution, getLeadRef, pushEvent } from "@/lib/analytics";
import { PHONE_E164, whatsappUrl } from "@/lib/site";

/** Contexto da landing enviado em todos os eventos da página. */
export interface LpContext {
  slug: string;
  serviceId: string;
  refPrefix: string;
}

export function lpEventBase(context: LpContext) {
  return {
    page_type: "landing",
    lp_slug: context.slug,
    service_id: context.serviceId,
    ...getAttribution(),
  };
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
}: LinkProps & { message: string }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const ref = getLeadRef(context.refPrefix);
    event.currentTarget.href = whatsappUrl(messageWithRef(message, ref));
    pushEvent("whatsapp_click", {
      ...lpEventBase(context),
      cta_id: ctaId,
      cta_position: position,
      lead_ref: ref,
      link_text: (event.currentTarget.textContent || "").trim().slice(0, 100),
    });
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
          ...lpEventBase(context),
          cta_id: ctaId,
          cta_position: position,
        })
      }
    >
      {children}
    </a>
  );
}
