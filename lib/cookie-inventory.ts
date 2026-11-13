/**
 * Inventário de cookies e armazenamentos do site: fonte única da Política de
 * Cookies e da documentação (docs/tracking/consentimento.md).
 *
 * Só entra aqui o que o site, o GTM ou os provedores realmente usam. O campo
 * `status` diz se o item foi OBSERVADO em teste neste projeto ou se vem só da
 * documentação do provedor (e portanto precisa ser validado em produção).
 * Não invente nomes nem prazos: se não for identificável, diga "a validar".
 */

export type InventoryCategory = "necessarios" | "analiticos" | "marketing";

export type InventoryStatus =
  | "observado"
  | "observado_prazo_a_validar"
  | "documentacao_do_provedor";

export interface InventoryItem {
  name: string;
  /** Onde fica: cookie do site, localStorage, sessionStorage ou cookie de terceiro. */
  kind: "cookie" | "localStorage" | "sessionStorage";
  category: InventoryCategory;
  provider: string;
  purpose: string;
  duration: string;
  status: InventoryStatus;
}

export const CATEGORY_LABEL: Record<InventoryCategory, string> = {
  necessarios: "Necessários",
  analiticos: "Analíticos",
  marketing: "Marketing (publicidade)",
};

export const STATUS_LABEL: Record<InventoryStatus, string> = {
  observado: "Observado em teste",
  observado_prazo_a_validar: "Nome observado em teste; prazo conforme o provedor (validação pendente)",
  documentacao_do_provedor: "Conforme documentação do provedor (não observado; validação pendente)",
};

export const COOKIE_INVENTORY: InventoryItem[] = [
  {
    name: "sr_consent_v1",
    kind: "localStorage",
    category: "necessarios",
    provider: "SR Decorações (próprio)",
    purpose: "Guarda a sua escolha de cookies para não perguntar de novo a cada página.",
    duration: "12 meses, ou até você limpar os dados do navegador",
    status: "observado",
  },
  {
    name: "sr_ref_v1",
    kind: "sessionStorage",
    category: "necessarios",
    provider: "SR Decorações (próprio)",
    purpose:
      "Gera o código curto de atendimento (ex.: LAV-7K2MQ) que acompanha a mensagem do WhatsApp, para a SR localizar o seu pedido.",
    duration: "Até fechar a aba",
    status: "observado",
  },
  {
    name: "_ga",
    kind: "cookie",
    category: "analiticos",
    provider: "Google Analytics 4 (via Google Tag Manager)",
    purpose: "Distingue visitantes para estatísticas de uso do site.",
    duration: "Até 2 anos (padrão do Google)",
    status: "observado_prazo_a_validar",
  },
  {
    name: "_ga_<ID da propriedade>",
    kind: "cookie",
    category: "analiticos",
    provider: "Google Analytics 4 (via Google Tag Manager)",
    purpose: "Mantém o estado da sessão de navegação no Google Analytics.",
    duration: "Até 2 anos (padrão do Google)",
    status: "observado_prazo_a_validar",
  },
  {
    name: "_clck e _clsk",
    kind: "cookie",
    category: "analiticos",
    provider: "Microsoft Clarity (via Google Tag Manager)",
    purpose:
      "Identificam o navegador e a sessão para gravações e mapas de calor do uso do site, com campos de formulário mascarados.",
    duration: "_clck: até 1 ano; _clsk: 1 dia (informado pela Microsoft)",
    status: "observado_prazo_a_validar",
  },
  {
    name: "_cltk",
    kind: "sessionStorage",
    category: "analiticos",
    provider: "Microsoft Clarity (via Google Tag Manager)",
    purpose: "Apoia a continuidade da sessão do Clarity durante a visita.",
    duration: "Até fechar a aba",
    status: "observado",
  },
  {
    name: "_gcl_au e _gcl_aw",
    kind: "cookie",
    category: "marketing",
    provider: "Google Ads (via Google Tag Manager)",
    purpose:
      "Relacionam o clique no anúncio ao contato feito no site, para medir o resultado da publicidade. Não usamos remarketing nem personalização de anúncios.",
    duration: "Até 90 dias (padrão do Google)",
    status: "observado_prazo_a_validar",
  },
  {
    name: "_gcl_ls",
    kind: "localStorage",
    category: "marketing",
    provider: "Google Ads (via Google Tag Manager)",
    purpose: "Guarda no navegador dados de medição de conversão do Google Ads.",
    duration: "Até 90 dias (padrão do Google)",
    status: "observado_prazo_a_validar",
  },
  {
    name: "_gcl_gb e _gac_<ID>",
    kind: "cookie",
    category: "marketing",
    provider: "Google Ads (via Google Tag Manager)",
    purpose: "Variações do cookie de medição de conversão do Google Ads, usadas em alguns cenários.",
    duration: "Até 90 dias (padrão do Google)",
    status: "documentacao_do_provedor",
  },
  {
    name: "sr_attribution_v1",
    kind: "localStorage",
    category: "marketing",
    provider: "SR Decorações (próprio)",
    purpose:
      "Guarda no seu navegador a origem da visita (parâmetros UTM e identificador de clique do anúncio) para ligar um orçamento ao anúncio que o gerou. Só é gravado com a categoria Marketing aceita.",
    duration: "90 dias, ou até você revogar o consentimento",
    status: "observado",
  },
];

export function itemsByCategory(category: InventoryCategory): InventoryItem[] {
  return COOKIE_INVENTORY.filter((item) => item.category === category);
}
