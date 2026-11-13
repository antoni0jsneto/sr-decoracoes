/**
 * Camada de mensuração do site (dataLayer do GTM-5KMVZ4R8).
 *
 * Regras:
 * - Um clique = um evento. Clique no WhatsApp é INTENÇÃO de contato, não lead.
 *   `generate_lead` NÃO é emitido pelo site: só existe quando a SR registra uma
 *   solicitação realmente recebida (ver docs/tracking/eventos.md).
 * - Nenhum dado pessoal vai para o dataLayer (nome, telefone, e-mail, texto livre).
 * - GCLID/GBRAID/WBRAID, UTMs e `lead_ref` NUNCA viajam como parâmetro de evento
 *   (GA4 ou Clarity): ficam no registro próprio de atribuição (lib/attribution.ts).
 * - Com o consentimento ligado, nada é enviado sem ao menos uma categoria
 *   concedida; quem decide o que cada tag recebe é o GTM (flags sr_consent_*).
 * - Cada push zera os parâmetros que não usa (o modelo de dados do GTM guarda
 *   valores entre eventos).
 * - `page_view` NÃO é enviado daqui: é a medição otimizada do GA4 (histórico do
 *   navegador), para não haver duplicidade entre rotas do App Router.
 */

import {
  CONSENT_CHANGED_EVENT,
  CONSENT_ENABLED,
  hasAnyConsent,
  readConsent,
} from "./consent.ts";
import {
  trackingContextFromPath,
  trafficTypeFromSearch,
  type TrackingContext,
} from "./tracking-taxonomy.ts";

export const ANALYTICS_EVENTS = [
  "whatsapp_click",
  "phone_click",
  "email_click",
  "cta_click",
  "service_card_click",
  "service_view",
  "landing_page_view",
  "form_start",
  "form_error",
  "faq_interaction",
  "section_view",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export const EVENT_PARAMS = [
  "service_name",
  "service_category",
  "landing_page_type",
  "button_location",
  "button_id",
  "contact_intent",
  "form_id",
  "error_fields",
  "section_id",
  "faq_question",
  "item_type",
  "quantity_range",
  "traffic_type",
] as const;

export type EventParam = (typeof EVENT_PARAMS)[number];
export type EventParams = Partial<Record<EventParam, string | undefined>>;

export type ContactIntent = "orcamento" | "envio_foto" | "contato_geral";

/** Eventos espelhados no Clarity (só o nome, sem parâmetros). */
const CLARITY_EVENTS: readonly AnalyticsEvent[] = [
  "whatsapp_click",
  "service_view",
  "landing_page_view",
  "form_start",
  "form_error",
  "cta_click",
];

function contextParams(context: TrackingContext): EventParams {
  return {
    landing_page_type: context.landing_page_type,
    service_name: context.service_name,
    service_category: context.service_category,
  };
}

/**
 * Monta o payload do dataLayer. Função pura (testável): parâmetros fora da
 * lista são descartados e vazios viram `undefined` para limpar o modelo do GTM.
 */
export function buildPayload(
  event: AnalyticsEvent,
  pathname: string,
  params: EventParams = {},
): Record<string, unknown> {
  const merged: EventParams = { ...contextParams(trackingContextFromPath(pathname)) };
  for (const key of EVENT_PARAMS) {
    const value = params[key];
    if (value !== undefined && value !== "") merged[key] = value;
  }
  const payload: Record<string, unknown> = { event };
  for (const key of EVENT_PARAMS) payload[key] = merged[key] || undefined;
  return payload;
}

function consentAllowsEvents(): boolean {
  if (!CONSENT_ENABLED) return true;
  return hasAnyConsent(readConsent());
}

function mirrorToClarity(event: AnalyticsEvent) {
  if (!CONSENT_ENABLED || !CLARITY_EVENTS.includes(event)) return;
  if (!readConsent()?.analytics) return;
  try {
    window.clarity?.("event", event);
  } catch {
    /* o Clarity nunca pode quebrar o site */
  }
}

/** Envia um evento ao dataLayer. Devolve `false` quando o consentimento não permite. */
export function pushEvent(event: AnalyticsEvent, params: EventParams = {}): boolean {
  if (typeof window === "undefined") return false;
  if (!consentAllowsEvents()) return false;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(buildPayload(event, window.location.pathname, params));
  mirrorToClarity(event);
  return true;
}

/**
 * Para eventos de visualização (carregamento da página): se o consentimento
 * ainda não existe, tenta de novo quando o visitante decidir, uma única vez.
 */
export function pushEventWhenAllowed(event: AnalyticsEvent, params: EventParams = {}): () => void {
  if (pushEvent(event, params)) return () => {};
  const retry = () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, retry);
    pushEvent(event, params);
  };
  window.addEventListener(CONSENT_CHANGED_EVENT, retry);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, retry);
}

export function currentTrafficType() {
  return trafficTypeFromSearch(window.location.search);
}

/**
 * Navega na mesma aba só depois de o GTM processar os eventos já empilhados
 * (ou após 1 s), para não perder um clique que abandona a página. Sem
 * consentimento não há o que esperar.
 */
export function navigateAfterEvents(url: string): void {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    window.location.href = url;
  };
  if (CONSENT_ENABLED && !hasAnyConsent(readConsent())) return go();
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "sr_navigate", eventCallback: go, eventTimeout: 1000 });
  window.setTimeout(go, 1000);
}
