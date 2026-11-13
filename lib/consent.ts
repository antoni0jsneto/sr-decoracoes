/**
 * Consentimento de cookies e rastreadores (LGPD).
 *
 * Módulo sem dependências: roda no navegador e nos testes (`node --test`).
 *
 * Regras:
 * - Duas categorias opcionais: `analytics` (GA4, Clarity) e `marketing`
 *   (Google Ads). Necessários não dependem de consentimento.
 * - Tudo negado por padrão. Nada é pré-marcado.
 * - A escolha vive em localStorage (`sr_consent_v1`) por 12 meses; mudar a
 *   versão reapresenta o banner.
 * - Com `NEXT_PUBLIC_CONSENT_ENABLED` desligada o site se comporta como antes
 *   (sem banner, GTM carregado como sempre): é a chave da publicação
 *   coordenada site ↔ GTM descrita em docs/tracking/README.md.
 */

/** Liga o gerenciamento de consentimento (lida em tempo de build). */
export const CONSENT_ENABLED = process.env.NEXT_PUBLIC_CONSENT_ENABLED === "true";

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "sr_consent_v1";
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/** Disparado pelo rodapé para reabrir o painel de preferências. */
export const OPEN_CONSENT_EVENT = "sr:open-cookie-preferences";
/** Disparado depois que a escolha é salva (detail: ConsentChoice). */
export const CONSENT_CHANGED_EVENT = "sr:consent-changed";

export type ConsentCategory = "analytics" | "marketing";

export interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
  version: number;
  timestamp: number;
}

export type ConsentState = "granted" | "denied";

export interface ConsentSignals {
  analytics_storage: ConsentState;
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  functionality_storage: ConsentState;
  personalization_storage: ConsentState;
  security_storage: ConsentState;
}

export function createChoice(
  analytics: boolean,
  marketing: boolean,
  now: number = Date.now(),
): ConsentChoice {
  return { analytics, marketing, version: CONSENT_VERSION, timestamp: now };
}

/** Valida o valor guardado. Qualquer defeito, versão antiga ou prazo vencido = sem escolha. */
export function parseConsent(
  raw: string | null | undefined,
  now: number = Date.now(),
): ConsentChoice | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<ConsentChoice> | null;
    if (!value || typeof value !== "object") return null;
    if (value.version !== CONSENT_VERSION) return null;
    if (typeof value.analytics !== "boolean") return null;
    if (typeof value.marketing !== "boolean") return null;
    if (typeof value.timestamp !== "number") return null;
    if (now - value.timestamp > CONSENT_MAX_AGE_MS) return null;
    return {
      analytics: value.analytics,
      marketing: value.marketing,
      version: value.version,
      timestamp: value.timestamp,
    };
  } catch {
    return null;
  }
}

/**
 * Sinais do Consent Mode v2. `ad_personalization` fica sempre negado (sem
 * remarketing) e os tipos sem uso no site também; `security_storage` é
 * necessário e permanece concedido.
 */
export function consentSignals(choice: ConsentChoice | null): ConsentSignals {
  const analytics: ConsentState = choice?.analytics ? "granted" : "denied";
  const marketing: ConsentState = choice?.marketing ? "granted" : "denied";
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  };
}

export function hasAnyConsent(choice: ConsentChoice | null): boolean {
  return Boolean(choice && (choice.analytics || choice.marketing));
}

/** Categorias que estavam ativas e deixaram de estar. */
export function revokedCategories(
  previous: ConsentChoice | null,
  next: ConsentChoice,
): ConsentCategory[] {
  const revoked: ConsentCategory[] = [];
  if (previous?.analytics && !next.analytics) revoked.push("analytics");
  if (previous?.marketing && !next.marketing) revoked.push("marketing");
  return revoked;
}

export function consentChanged(
  previous: ConsentChoice | null,
  next: ConsentChoice,
): boolean {
  return (
    previous?.analytics !== next.analytics ||
    previous?.marketing !== next.marketing
  );
}

/* ------------------------------------------------------------------ */
/* Leitura e gravação seguras (localStorage pode falhar)               */
/* ------------------------------------------------------------------ */

export function readConsent(): ConsentChoice | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): boolean {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
    return true;
  } catch {
    return false;
  }
}

/** Sem o mecanismo de consentimento ligado, o site segue o comportamento legado (tudo permitido). */
export function analyticsAllowed(): boolean {
  if (!CONSENT_ENABLED) return true;
  return Boolean(readConsent()?.analytics);
}

export function marketingAllowed(): boolean {
  if (!CONSENT_ENABLED) return true;
  return Boolean(readConsent()?.marketing);
}

/* ------------------------------------------------------------------ */
/* Cookies de terceiros no domínio do site                             */
/* ------------------------------------------------------------------ */

/** Nomes (prefixos) gravados no domínio do site por cada categoria. */
export const COOKIE_PATTERNS: Record<ConsentCategory, RegExp> = {
  // GA4: _ga, _ga_<ID>, _gid, _gat*. Clarity: _clck, _clsk.
  analytics: /^(_ga$|_ga_|_gid$|_gat|_clck$|_clsk$)/,
  // Google Ads: _gcl_au, _gcl_aw, _gcl_gb, _gcl_ag, _gac_*.
  marketing: /^(_gcl_|_gac_)/,
};

/**
 * Armazenamento (não cookie) que as ferramentas criam no navegador e que
 * também precisa sair quando a categoria é revogada.
 * `_gcl_ls`: Google Ads (localStorage); `_cltk`: Microsoft Clarity (sessionStorage).
 */
export const STORAGE_KEYS: Record<ConsentCategory, { local: string[]; session: string[] }> = {
  analytics: { local: [], session: ["_cltk"] },
  marketing: { local: ["_gcl_ls"], session: [] },
};

/** Domínios onde o cookie pode ter sido gravado: host, .host e domínio pai. */
export function cookieDomains(hostname: string): (string | undefined)[] {
  const parts = hostname.split(".");
  const domains: (string | undefined)[] = [undefined, hostname, `.${hostname}`];
  if (parts.length > 2) domains.push(`.${parts.slice(-3).join(".")}`);
  if (parts.length > 1) domains.push(`.${parts.slice(-2).join(".")}`);
  return [...new Set(domains)];
}

export function cookieNames(cookieString: string): string[] {
  return cookieString
    .split(";")
    .map((part) => part.split("=")[0].trim())
    .filter(Boolean);
}

/** Apaga o armazenamento local/de sessão das ferramentas das categorias revogadas. */
export function clearTrackingStorage(categories: ConsentCategory[]): void {
  if (typeof window === "undefined") return;
  for (const category of categories) {
    try {
      for (const key of STORAGE_KEYS[category].local) window.localStorage.removeItem(key);
      for (const key of STORAGE_KEYS[category].session) window.sessionStorage.removeItem(key);
    } catch {
      /* ignorar */
    }
  }
}

/** Apaga os cookies das categorias revogadas (dentro do que o navegador permite). */
export function clearTrackingCookies(categories: ConsentCategory[]): void {
  if (typeof document === "undefined") return;
  const patterns = categories.map((category) => COOKIE_PATTERNS[category]);
  const domains = cookieDomains(window.location.hostname);
  for (const name of cookieNames(document.cookie)) {
    if (!patterns.some((pattern) => pattern.test(name))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}
