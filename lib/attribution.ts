/**
 * Atribuição própria (anúncio → orçamento → serviço), independente do GA4.
 *
 * - O registro guarda UTMs, GCLID/GBRAID/WBRAID e o `lead_ref` do atendimento.
 *   Nada disso vai ao GA4 nem ao Clarity.
 * - Identificadores publicitários só são gravados com Marketing concedido
 *   (ou, com o consentimento desligado, no comportamento legado).
 * - Fica em localStorage por 90 dias (janela de conversão do Google Ads) e é
 *   apagado na revogação.
 * - A ponte para CRM é `registerLeadAttribution`: só envia se
 *   NEXT_PUBLIC_LEAD_ATTRIBUTION_ENDPOINT estiver configurada. Hoje não está, e
 *   nenhum dado sai do navegador. Contrato em docs/tracking/eventos.md.
 */

import { marketingAllowed } from "./consent.ts";

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

export interface AttributionRecord extends Partial<Record<AttributionKey, string>> {
  /** Código curto enviado na mensagem do WhatsApp (ex.: LAV-7K2MQ). */
  lead_ref?: string;
  service_id?: string;
  landing_path?: string;
  captured_at: number;
}

export const ATTRIBUTION_STORAGE_KEY = "sr_attribution_v1";
export const ATTRIBUTION_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const REF_STORAGE_KEY = "sr_ref_v1";

/* ------------------------------------------------------------------ */
/* Funções puras                                                       */
/* ------------------------------------------------------------------ */

/** Extrai UTMs e identificadores de clique da query string (máx. 100 caracteres cada). */
export function extractAttribution(search: string): Partial<Record<AttributionKey, string>> {
  const params = new URLSearchParams(search);
  const found: Partial<Record<AttributionKey, string>> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 100);
  }
  return found;
}

export function parseAttribution(
  raw: string | null | undefined,
  now: number = Date.now(),
): AttributionRecord | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<AttributionRecord> | null;
    if (!value || typeof value !== "object") return null;
    if (typeof value.captured_at !== "number") return null;
    if (now - value.captured_at > ATTRIBUTION_MAX_AGE_MS) return null;
    return value as AttributionRecord;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Armazenamento                                                       */
/* ------------------------------------------------------------------ */

function local(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function session(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function getAttributionRecord(): AttributionRecord | null {
  if (typeof window === "undefined") return null;
  return parseAttribution(local()?.getItem(ATTRIBUTION_STORAGE_KEY));
}

export function clearAttribution(): void {
  try {
    local()?.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    /* ignorar */
  }
}

function writeRecord(record: AttributionRecord): void {
  try {
    local()?.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* ignorar */
  }
}

/**
 * Guarda os parâmetros de campanha da URL de entrada. Uma nova entrada com
 * parâmetros substitui a anterior, preservando o `lead_ref` já gerado.
 * Sem Marketing concedido não grava nada.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined" || !marketingAllowed()) return;
  const found = extractAttribution(window.location.search);
  if (Object.keys(found).length === 0) return;
  const previous = getAttributionRecord();
  writeRecord({
    ...found,
    lead_ref: previous?.lead_ref,
    service_id: previous?.service_id,
    landing_path: window.location.pathname,
    captured_at: Date.now(),
  });
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
 * Código curto (ex.: LAV-7K2MQ) incluído na mensagem do WhatsApp para a SR
 * registrar a conversa na planilha/CRM. É referência funcional do atendimento
 * (não contém identificador publicitário) e vale para toda a sessão da aba.
 */
export function getLeadRef(prefix: string): string {
  const storage = typeof window !== "undefined" ? session() : null;
  let code = storage?.getItem(REF_STORAGE_KEY) ?? null;
  if (!code) {
    code = randomCode();
    try {
      storage?.setItem(REF_STORAGE_KEY, code);
    } catch {
      /* sem storage: o código vale só para esta mensagem */
    }
  }
  return `${prefix}-${code}`;
}

/* ------------------------------------------------------------------ */
/* Ponte para o atendimento comercial / CRM                            */
/* ------------------------------------------------------------------ */

/**
 * Associa o `lead_ref` ao registro de atribuição (somente com Marketing
 * concedido) e, se houver endpoint configurado, envia o registro ao CRM.
 * Devolve o registro gravado ou `null` quando o consentimento não permite.
 */
export function recordLeadAttribution(leadRef: string, serviceId: string): AttributionRecord | null {
  if (typeof window === "undefined" || !marketingAllowed()) return null;
  const previous = getAttributionRecord();
  const record: AttributionRecord = {
    ...previous,
    lead_ref: leadRef,
    service_id: serviceId,
    landing_path: previous?.landing_path ?? window.location.pathname,
    captured_at: previous?.captured_at ?? Date.now(),
  };
  writeRecord(record);
  registerLeadAttribution(record);
  return record;
}

export function registerLeadAttribution(record: AttributionRecord): void {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ATTRIBUTION_ENDPOINT;
  if (!endpoint || typeof navigator === "undefined") return;
  try {
    const body = JSON.stringify(record);
    if (!navigator.sendBeacon?.(endpoint, body)) {
      void fetch(endpoint, { method: "POST", body, keepalive: true });
    }
  } catch {
    /* a ponte nunca pode quebrar o clique */
  }
}
