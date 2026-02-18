import type { Metadata } from "next"

const siteUrl = "https://sr-decoracoes.com.br"

export interface ServiceMetadata {
  title: string
  description: string
  keywords: string[]
  shortDescription: string
  serviceType: string
}

const services: Record<string, ServiceMetadata> = {
  "persianas/lavagem": {
    title: "Lavagem de Persianas e Cortinas | SR Decorações",
    description:
      "Lavagem profissional de persianas e cortinas em São Paulo. Eliminamos ácaros, bactérias e mau cheiro com técnicas especializadas. Orçamento grátis via WhatsApp!",
    shortDescription:
      "Higienização profissional que elimina ácaros, bactérias e mau cheiro. Suas persianas e cortinas novas de novo!",
    keywords: [
      "lavagem de persianas",
      "lavagem de cortinas",
      "limpeza de persianas",
      "limpeza de cortinas",
      "higienização de persianas",
      "lavagem de persianas são paulo",
      "lavagem de cortinas são paulo",
      "persianas limpas",
      "remoção de ácaros",
      "higienização profissional",
    ],
    serviceType: "Lavagem de Persianas e Cortinas",
  },
  "persianas/manutencao": {
    title: "Manutenção de Persianas e Cortinas | SR Decorações",
    description:
      "Manutenção especializada de persianas e cortinas em São Paulo. Conserto, troca de peças e ajustes profissionais. Não troque suas persianas, conserte com quem entende! Orçamento grátis.",
    shortDescription:
      "Conserto, troca de peças e ajustes. Não troque suas persianas, conserte com quem entende do assunto.",
    keywords: [
      "manutenção de persianas",
      "manutenção de cortinas",
      "conserto de persianas",
      "conserto de cortinas",
      "reparo de persianas",
      "troca de peças",
      "manutenção são paulo",
      "persianas quebradas",
      "cortinas danificadas",
      "serviço de reparo",
    ],
    serviceType: "Manutenção de Persianas e Cortinas",
  },
  "persianas/venda": {
    title: "Venda de Persianas e Cortinas | SR Decorações",
    description:
      "Venda de persianas e cortinas para residências e empresas em São Paulo. Diversos modelos, medição e instalação inclusos. Transforme seus ambientes com qualidade!",
    shortDescription:
      "Diversos modelos de persianas e cortinas para residências e empresas. Medição e instalação inclusa.",
    keywords: [
      "venda de persianas",
      "venda de cortinas",
      "persianas para venda",
      "cortinas para comprar",
      "instalação de persianas",
      "persianas são paulo",
      "cortinas são paulo",
      "preço de persianas",
      "tipos de persianas",
      "cortinas modernas",
    ],
    serviceType: "Venda de Persianas e Cortinas",
  },
  "lavagem-sofas": {
    title: "Lavagem de Sofás Profissional | SR Decorações",
    description:
      "Limpeza profunda e higienização completa de sofás em São Paulo. Removemos manchas, ácaros e mau cheiro com técnicas avançadas. Seu sofá como novo!",
    shortDescription:
      "Limpeza profunda e higienização completa do seu sofá. Removemos manchas, ácaros e mau cheiro.",
    keywords: [
      "lavagem de sofás",
      "limpeza de sofás",
      "higienização de sofás",
      "sofás limpeza profissional",
      "remoção de manchas",
      "lavagem de sofás são paulo",
      "limpeza profunda",
      "sofás sujos",
      "higiene de estofados",
      "sofá como novo",
    ],
    serviceType: "Lavagem de Sofás",
  },
  "reforma-sofas": {
    title: "Reforma de Sofás | SR Decorações",
    description:
      "Reforma completa de sofás em São Paulo com tecidos de alta qualidade. Renovamos o estofado e deixamos seu sofá como novo!",
    shortDescription:
      "Reforma completa do seu sofá com tecidos de alta qualidade. Renovamos o estofado e deixamos como novo.",
    keywords: [
      "reforma de sofás",
      "restauração de sofás",
      "estofamento",
      "troca de tecido",
      "renovação de sofás",
      "reforma são paulo",
      "sofá novo",
      "sofá desgastado",
      "conserto de sofás",
      "revestimento de sofás",
    ],
    serviceType: "Reforma de Sofás",
  },
  "instalacao-pisos": {
    title: "Instalação de Carpete e Paviflex | SR Decorações",
    description:
      "Instalação profissional de carpete e paviflex em São Paulo. Acabamento perfeito e duradouro para residências e empresas. Orçamento grátis!",
    shortDescription:
      "Instalação profissional de carpetes e paviflex para residências e empresas. Acabamento perfeito e duradouro.",
    keywords: [
      "instalação de carpete",
      "instalação de paviflex",
      "carpete são paulo",
      "paviflex são paulo",
      "pisos laminados",
      "serviço de instalação",
      "carpete residencial",
      "paviflex comercial",
      "acabamento profissional",
      "pisos duráveis",
    ],
    serviceType: "Instalação de Pisos",
  },
  "redes-de-protecao": {
    title: "Redes de Proteção | SR Decorações",
    description:
      "Instalação de redes de proteção em São Paulo para maior segurança. Proteção infantil e de animais de estimação. Qualidade garantida!",
    shortDescription:
      "Redes de proteção para janelas e varandas. Segurança para crianças e animais de estimação.",
    keywords: [
      "redes de proteção",
      "redes de proteção infantil",
      "proteção de janelas",
      "proteção de varandas",
      "redes de proteção são paulo",
      "segurança infantil",
      "proteção de animais",
      "instalação de redes",
      "redes de qualidade",
      "proteção para pets",
    ],
    serviceType: "Redes de Proteção",
  },
}

export function getServiceMetadata(slug: string): Metadata {
  const service = services[slug]

  if (!service) {
    return {}
  }

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
      locale: "pt_BR",
      url: `${siteUrl}/servicos/${slug}`,
      siteName: "SR Decorações",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
    alternates: {
      canonical: `${siteUrl}/servicos/${slug}`,
    },
  }
}

export function getServiceData(slug: string): ServiceMetadata | null {
  return services[slug] || null
}

export function getAllServices() {
  return Object.entries(services).map(([slug, data]) => ({
    slug,
    ...data,
  }))
}

export const serviceSchema = (
  slug: string,
  service: ServiceMetadata
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/servicos/${slug}`,
  name: service.serviceType,
  description: service.description,
  provider: {
    "@type": "LocalBusiness",
    name: "SR Decorações",
    url: siteUrl,
  },
  areaServed: [
    {
      "@type": "City",
      name: "São Paulo",
    },
  ],
  priceRange: "$$",
  image: `${siteUrl}/images/og-image.jpg`,
  availability: "https://schema.org/InStock",
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${siteUrl}/servicos/${slug}`,
  },
})
