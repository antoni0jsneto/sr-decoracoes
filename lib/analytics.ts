/**
 * Camada de mensuração do site (dataLayer do GTM-5KMVZ4R8).
 *
 * Regras:
 * - Um clique = um evento. Cliques no WhatsApp são INTENÇÃO de contato, não lead.
 * - Nenhum dado pessoal vai para o dataLayer (sem nome, telefone, e-mail ou texto livre).
 * - Cada push zera os parâmetros que não usa, porque o modelo de dados do GTM
 *   guarda valores entre eventos.
 * - Quem envia (ou não) os dados para GA4/Google Ads é o GTM, respeitando a
 *   configuração de consentimento do contêiner.
 */

export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "form_start"
  | "form_submit"
  | "faq_open"
  | "section_view";

export type PageType = "landing" | "home" | "service" | "privacy" | "other";

const EVENT_PARAMS = [
  "page_type",
  "lp_slug",
  "service_id",
  "cta_id",
  "cta_position",
  "link_text",
  "form_id",
  "item_type",
  "quantity_range",
  "lead_ref",
  "section_id",
  "faq_question",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export type EventParams = Partial<
  Record<(typeof EVENT_PARAMS)[number], string | undefined>
>;

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function pushEvent(event: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  const payload: Record<string, unknown> = { event };
  for (const key of EVENT_PARAMS) payload[key] = undefined;
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") payload[key] = value;
  }
  w.dataLayer.push(payload);
}

/* ------------------------------------------------------------------ */
/* Atribuição: UTM e identificadores de clique do Google Ads           */
/* ------------------------------------------------------------------ */

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

const ATTRIBUTION_STORAGE = "sr_attr_v1";
const REF_STORAGE = "sr_ref_v1";

function safeSession(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/**
 * Guarda na sessão (aba) os parâmetros de campanha da URL de entrada, para
 * que continuem disponíveis se o visitante navegar antes de clicar no
 * WhatsApp. Uma nova entrada com parâmetros substitui a anterior.
 * Fica só no navegador (sessionStorage), sem cookie e sem envio próprio.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 100);
  }
  if (Object.keys(found).length === 0) return;
  safeSession()?.setItem(ATTRIBUTION_STORAGE, JSON.stringify(found));
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = safeSession()?.getItem(ATTRIBUTION_STORAGE);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------------ */
/* Código de referência do atendimento                                 */
/* ------------------------------------------------------------------ */

const REF_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sem 0/O, 1/I/L

function randomCode(length = 5): string {
  const bytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
}

/**
 * Código curto (ex.: LAV-7K2MQ) incluído na mensagem do WhatsApp e no evento
 * `whatsapp_click`. Permite à SR registrar o contato na planilha comercial e,
 * depois, cruzar com a campanha (GA4) para importar conversões offline.
 * O mesmo código vale para toda a sessão do visitante.
 */
export function getLeadRef(prefix: string): string {
  const storage = typeof window !== "undefined" ? safeSession() : null;
  let code = storage?.getItem(REF_STORAGE) ?? null;
  if (!code) {
    code = randomCode();
    storage?.setItem(REF_STORAGE, code);
  }
  return `${prefix}-${code}`;
}

export function pageTypeFromPath(pathname: string): PageType {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/lp/")) return "landing";
  if (pathname.startsWith("/servicos/")) return "service";
  if (pathname.startsWith("/politica-de-privacidade")) return "privacy";
  return "other";
}
