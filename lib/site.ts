/**
 * Dados institucionais únicos do site. Qualquer número, domínio ou contato
 * deve vir daqui (evita configurações duplicadas e divergentes).
 */

/** Domínio oficial (o domínio antigo srdecoracoess.com redireciona para cá). */
export const SITE_URL = "https://www.srdecoracoes.com.br";

export const SITE_NAME = "SR Decorações";

/** Contêiner do Google Tag Manager da SR (verificado no site em produção). */
export const GTM_ID = "GTM-5KMVZ4R8";

/** Número do WhatsApp comercial, no formato internacional exigido pelo wa.me. */
export const WHATSAPP_NUMBER = "5511924240055";
export const PHONE_E164 = "+5511924240055";
export const PHONE_DISPLAY = "(11) 92424-0055";
export const CONTACT_EMAIL = "srdecoracoess@gmail.com";

/** Horário informado no rodapé do site institucional. */
export const BUSINESS_HOURS = [
  { label: "Segunda a sexta", hours: "8h às 18h" },
  { label: "Sábado", hours: "8h às 13h" },
] as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
