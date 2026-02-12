import type { Metadata } from "next"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title:
    "Lavagem de Persianas e Cortinas em São Paulo | SR Decorações",
  description:
    "Lavagem profissional de persianas e cortinas. Eliminamos ácaros, bactérias e mau cheiro. Orçamento grátis via WhatsApp. Atendemos toda Grande São Paulo.",
  keywords: [
    "lavagem de persianas",
    "lavagem de cortinas",
    "limpeza de persianas",
    "higienização de persianas",
    "limpeza de cortinas",
    "lavagem de persianas são paulo",
    "limpeza de persianas sp",
  ],
  openGraph: {
    title: "Lavagem de Persianas e Cortinas | SR Decorações",
    description:
      "Lavagem profissional de persianas e cortinas. Eliminamos ácaros, bactérias e mau cheiro. Orçamento grátis!",
    type: "website",
    locale: "pt_BR",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lavagem de Persianas e Cortinas",
  provider: {
    "@type": "LocalBusiness",
    name: "SR Decorações",
    telephone: "+5511924240055",
    email: "srdecoracoess@gmail.com",
    areaServed: "São Paulo",
  },
  description:
    "Lavagem profissional de persianas e cortinas com produtos certificados. Eliminamos ácaros, bactérias, fungos e mau cheiro.",
  areaServed: {
    "@type": "City",
    name: "São Paulo",
  },
}

const benefits = [
  "Eliminação de ácaros, bactérias, germes e fungos prejudiciais à saúde",
  "Produtos certificados e à base de água, seguros para crianças e pets",
  "Serviço realizado no conforto da sua residência ou empresa",
  "Equipe profissional treinada e equipamentos de última geração",
  "Uma higienização custa apenas uma fração do valor de persianas novas",
  "Combate ao mau cheiro e devolve a aparência original das peças",
  "Atendimento rápido com dia e horário agendados",
  "Garantia de qualidade em todos os serviços realizados",
]

const details = [
  {
    title: "Tipos de Persianas",
    text: "Lavamos todos os tipos: persianas horizontais, verticais, rolô, romana, double vision e cortinas de tecido de todos os modelos.",
  },
  {
    title: "Processo de Lavagem",
    text: "Utilizamos técnicas exclusivas com equipamentos de última geração e produtos à base de água certificados, garantindo limpeza profunda sem danificar o material.",
  },
  {
    title: "Combate a Alergias",
    text: "Nossa lavagem profissional elimina os principais causadores de alergias respiratórias: ácaros, bactérias, germes, fungos e poeira acumulada.",
  },
  {
    title: "Prazo de Entrega",
    text: "O serviço de lavagem é realizado com agilidade. Retiramos, lavamos e devolvemos suas persianas e cortinas em ótimo estado e no prazo combinado.",
  },
  {
    title: "Atendimento Local",
    text: "Realizamos o serviço no conforto da sua casa ou empresa. Após a execução, deixamos o ambiente limpo e organizado.",
  },
  {
    title: "Orçamento Sem Compromisso",
    text: "Envie fotos das suas persianas e cortinas pelo WhatsApp e receba um orçamento rápido, transparente e sem compromisso.",
  },
]

export default function LavagemPersianasPage() {
  return (
    <ServicePageLayout
      title="Lavagem de Persianas e Cortinas"
      subtitle="Serviço Principal"
      description="Suas persianas e cortinas novas de novo! Nossa lavagem profissional elimina ácaros, bactérias, fungos e mau cheiro, devolvendo a beleza e protegendo a saúde da sua família."
      heroImage="/images/lavagem-persianas.jpg"
      heroImageAlt="Lavagem profissional de persianas e cortinas"
      benefits={benefits}
      details={details}
      whatsappMessage="Olá! Gostaria de solicitar um orçamento para lavagem de persianas e cortinas."
      jsonLd={jsonLd}
    />
  )
}
