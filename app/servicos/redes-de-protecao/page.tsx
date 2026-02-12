import type { Metadata } from "next"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "Instalação de Redes de Proteção em São Paulo | SR Decorações",
  description:
    "Instalação profissional de redes de proteção para janelas, sacadas e varandas. Segurança para crianças, idosos e pets. Orçamento grátis via WhatsApp. Atendemos toda Grande São Paulo.",
  keywords: [
    "redes de proteção",
    "rede de proteção são paulo",
    "instalação de rede de proteção",
    "rede para janela",
    "rede para sacada",
    "rede para varanda",
    "rede de proteção para crianças",
    "rede de proteção para pets",
    "rede de proteção sp",
    "tela de proteção",
  ],
  openGraph: {
    title: "Instalação de Redes de Proteção | SR Decorações",
    description:
      "Instalação profissional de redes de proteção para janelas, sacadas e varandas. Segurança para sua família. Orçamento grátis!",
    type: "website",
    locale: "pt_BR",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalação de Redes de Proteção",
  provider: {
    "@type": "LocalBusiness",
    name: "SR Decorações",
    telephone: "+5511924240055",
    email: "srdecoracoess@gmail.com",
    areaServed: "São Paulo",
  },
  description:
    "Instalação profissional de redes de proteção para janelas, sacadas, varandas e áreas de risco. Segurança para crianças, idosos e pets.",
  areaServed: {
    "@type": "City",
    name: "São Paulo",
  },
}

const benefits = [
  "Redes de proteção de alta resistência com material de qualidade",
  "Instalação em janelas, sacadas, varandas e áreas de risco",
  "Segurança garantida para crianças, idosos e animais de estimação",
  "Material resistente a intempéries e raios UV",
  "Diversas cores disponíveis para harmonizar com a fachada",
  "Instalação rápida e limpa, sem danificar a estrutura",
  "Atendemos apartamentos, casas e áreas comerciais",
  "Garantia de fábrica no material e na instalação",
]

const details = [
  {
    title: "Redes para Janelas",
    text: "Instalação de redes de proteção em janelas de todos os tamanhos e formatos. Fixação segura com ganchos e buchas de alta resistência.",
  },
  {
    title: "Redes para Sacadas e Varandas",
    text: "Proteção completa para sacadas e varandas de apartamentos. Redes sob medida que se adequam perfeitamente ao espaço.",
  },
  {
    title: "Redes para Áreas de Lazer",
    text: "Instalação em áreas de piscina, playground e espaços de convivência. Segurança para toda a família em áreas de lazer.",
  },
  {
    title: "Proteção para Pets",
    text: "Redes especiais para proteger seus animais de estimação, impedindo quedas de janelas e sacadas. Material resistente a mordidas e arranhões.",
  },
  {
    title: "Material de Alta Qualidade",
    text: "Utilizamos redes de polietileno de alta densidade, com proteção UV e resistência a intempéries. Durabilidade garantida por anos.",
  },
  {
    title: "Visita Técnica e Orçamento",
    text: "Realizamos visita técnica gratuita para avaliar o local, tirar medidas e apresentar a melhor solução de proteção para seu espaço.",
  },
]

export default function RedesProtecaoPage() {
  return (
    <ServicePageLayout
      title="Instalação de Redes de Proteção"
      subtitle="Redes de Proteção"
      description="Proteja sua família e seus pets com redes de proteção de alta qualidade! Instalação profissional em janelas, sacadas e varandas, com material resistente e durável."
      heroImage="/images/redes-protecao.jpg"
      heroImageAlt="Instalação de redes de proteção em janelas e sacadas"
      benefits={benefits}
      details={details}
      whatsappMessage="Olá! Gostaria de solicitar um orçamento para instalação de redes de proteção."
      jsonLd={jsonLd}
    />
  )
}
