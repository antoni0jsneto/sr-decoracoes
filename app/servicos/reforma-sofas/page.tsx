import type { Metadata } from "next"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "Reforma de Sofás em São Paulo | SR Decorações",
  description:
    "Reforma e restauração profissional de sofás. Troca de tecido, espuma e estrutura. Renovamos seu sofá com qualidade. Orçamento grátis via WhatsApp.",
  keywords: [
    "reforma de sofá",
    "restauração de sofá",
    "troca de tecido sofá",
    "troca de espuma sofá",
    "reforma de estofado",
    "reforma de sofá são paulo",
    "reforma de sofá sp",
    "retapeçamento de sofá",
  ],
  openGraph: {
    title: "Reforma de Sofás | SR Decorações",
    description:
      "Reforma e restauração profissional de sofás. Troca de tecido, espuma e estrutura. Orçamento grátis!",
    type: "website",
    locale: "pt_BR",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reforma de Sofás",
  provider: {
    "@type": "LocalBusiness",
    name: "SR Decorações",
    telephone: "+5511924240055",
    email: "srdecoracoess@gmail.com",
    areaServed: "São Paulo",
  },
  description:
    "Reforma e restauração profissional de sofás com troca de tecido, espuma e estrutura.",
  areaServed: {
    "@type": "City",
    name: "São Paulo",
  },
}

const benefits = [
  "Reforma completa com troca de tecido, espuma e estrutura",
  "Ampla variedade de tecidos de alta qualidade para escolha",
  "Restauração da estrutura de madeira e molas do sofá",
  "Troca de espuma por materiais de densidade adequada",
  "Personalização do design e acabamento do estofado",
  "Orçamento detalhado e transparente antes de iniciar",
  "Retirada e entrega do sofá no seu endereço",
  "Garantia de qualidade no serviço e nos materiais",
]

const details = [
  {
    title: "Troca de Tecido",
    text: "Oferecemos uma ampla variedade de tecidos como couro sintético, suede, linho, veludo e chenille. Você escolhe o tecido ideal para o seu ambiente.",
  },
  {
    title: "Troca de Espuma",
    text: "Substituímos a espuma desgastada por espumas de alta densidade que garantem conforto e durabilidade por muito mais tempo.",
  },
  {
    title: "Restauração Estrutural",
    text: "Reparamos a estrutura de madeira, trocamos molas quebradas e reforçamos a base do sofá para garantir solidez e segurança.",
  },
  {
    title: "Redesign e Personalização",
    text: "Se desejar, podemos alterar o design do seu sofá, acrescentando ou removendo braços, capitonê, botões e outros detalhes decorativos.",
  },
  {
    title: "Retirada e Entrega",
    text: "Buscamos o sofá no seu endereço, realizamos a reforma na nossa oficina e devolvemos pronto para uso. Prático e sem preocupação.",
  },
  {
    title: "Orçamento Presencial",
    text: "Visitamos seu espaço para avaliar o estado do sofá, apresentar opções de tecido e fornecer um orçamento detalhado e transparente.",
  },
]

export default function ReformaSofasPage() {
  return (
    <ServicePageLayout
      title="Reforma de Sofás"
      subtitle="Sofás"
      description="Não precisa comprar um sofá novo! Nossa reforma profissional renova seu estofado com troca de tecido, espuma e estrutura, deixando seu sofá como novo."
      heroImage="/images/reforma-sofas.jpg"
      heroImageAlt="Reforma profissional de sofás"
      benefits={benefits}
      details={details}
      whatsappMessage="Olá! Gostaria de solicitar um orçamento para reforma de sofá."
      jsonLd={jsonLd}
    />
  )
}
