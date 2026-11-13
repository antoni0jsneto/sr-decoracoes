/**
 * Taxonomia única de rastreamento: rota → serviço, categoria e tipo de página.
 * Módulo sem dependências (testável). Nomes em minúsculas e com hífen, estáveis:
 * viram dimensões do GA4, não os renomeie depois de publicados.
 */

export type ServiceCategory =
  | "persianas-cortinas"
  | "sofas"
  | "pisos"
  | "redes-protecao"
  | "institucional";

export type LandingPageType = "home" | "servico" | "lp_campanha" | "politica" | "outra";

export interface TrackingContext {
  landing_page_type: LandingPageType;
  service_name?: string;
  service_category?: ServiceCategory;
}

const SERVICE_PAGES: Record<string, { name: string; category: ServiceCategory }> = {
  "/servicos/persianas/lavagem": { name: "lavagem-persianas-cortinas", category: "persianas-cortinas" },
  "/servicos/lavagem-persianas-cortinas": { name: "lavagem-persianas-cortinas", category: "persianas-cortinas" },
  "/servicos/persianas/manutencao": { name: "manutencao-persianas-cortinas", category: "persianas-cortinas" },
  "/servicos/persianas/venda": { name: "venda-persianas-cortinas", category: "persianas-cortinas" },
  "/servicos/lavagem-sofas": { name: "lavagem-sofas", category: "sofas" },
  "/servicos/reforma-sofas": { name: "reforma-sofas", category: "sofas" },
  "/servicos/instalacao-pisos": { name: "instalacao-pisos", category: "pisos" },
  "/servicos/redes-de-protecao": { name: "redes-protecao", category: "redes-protecao" },
};

/** Slug da landing → `service_name` (igual ao `serviceId` em lib/landing-pages.ts). */
const LANDING_SERVICES: Record<string, string> = {
  "lavagem-de-persianas": "lavagem-persianas",
  "lavagem-de-cortinas": "lavagem-cortinas",
  "manutencao-de-persianas": "manutencao-persianas",
};

export function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0];
  return path.length > 1 ? path.replace(/\/+$/, "") : "/";
}

export function trackingContextFromPath(pathname: string): TrackingContext {
  const path = normalizePath(pathname);
  if (path === "/") {
    return { landing_page_type: "home", service_name: "institucional", service_category: "institucional" };
  }
  if (path.startsWith("/lp/")) {
    const service = LANDING_SERVICES[path.slice(4)];
    return {
      landing_page_type: "lp_campanha",
      service_name: service,
      service_category: service ? "persianas-cortinas" : undefined,
    };
  }
  const service = SERVICE_PAGES[path];
  if (service) {
    return { landing_page_type: "servico", service_name: service.name, service_category: service.category };
  }
  if (path.startsWith("/politica-de-")) return { landing_page_type: "politica" };
  return { landing_page_type: "outra" };
}

export type TrafficType = "google_ads" | "campanha_utm" | "direto_ou_organico";

/**
 * Classifica a entrada só para análise por tipo de tráfego. Lê a URL atual e
 * devolve um rótulo: nenhum identificador de clique ou UTM sai daqui.
 */
export function trafficTypeFromSearch(search: string): TrafficType {
  const params = new URLSearchParams(search);
  if (params.has("gclid") || params.has("gbraid") || params.has("wbraid")) return "google_ads";
  if (params.has("utm_source") || params.has("utm_medium") || params.has("utm_campaign")) {
    return "campanha_utm";
  }
  return "direto_ou_organico";
}
