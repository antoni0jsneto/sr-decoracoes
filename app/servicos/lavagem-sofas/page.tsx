import type { Metadata } from "next"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "Lavagem de Sofás em São Paulo | SR Decorações",
  description:
    "Lavagem e higienização profissional de sofás. Removemos manchas, ácaros, bactérias e mau cheiro. Orçamento grátis via WhatsApp. Atendemos toda Grande São Paulo.",
  keywords: [
    "lavagem de sofá",
    "limpeza de sofá",
    "higienização de sofá",
    "lavagem de sofá são paulo",
    "limpeza de estofado",
    "impermeabilização de sofá",
    "lavagem de sofá sp",
    "limpeza profunda sofá",
  ],
  openGraph: {
    title: "Lavagem de Sofás | SR Decorações",
    description:
      "Lavagem e higienização profissional de sofás. Removemos manchas e mau cheiro. Orçamento grátis!",
    type: "website",
    locale: "pt_BR",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lavagem de Sofás",
  provider: {
    "@type": "LocalBusiness",
    name: "SR Decorações",
    telephone: "+5511924240055",
    email: "srdecoracoess@gmail.com",
    areaServed: "São Paulo",
  },
  description:
    "Lavagem e higienização profissional de sofás com remoção de manchas, ácaros e mau cheiro.",
  areaServed: {
    "@type": "City",
    name: "São Paulo",
  },
}

const benefits = [
  "Lavagem profunda com equipamentos profissionais de alta potência",
  "Remoção eficaz de manchas, gordura e sujeiras incrustadas",
  "Eliminação de ácaros, bactérias e fungos do estofado",
  "Remoção de mau cheiro e odores desagradáveis",
  "Serviço de impermeabilização para proteção prolongada",
  "Secagem rápida com equipamentos industriais",
  "Atendemos todos os tipos de tecido e estofados",
  "Serviço realizado no conforto da sua casa ou empresa",
]

const details = [
  {
    title: "Lavagem Profunda",
    text: "Utilizamos equipamentos de alta pressão e produtos profissionais para uma lavagem profunda que remove toda a sujeira acumulada no tecido.",
  },
  {
    title: "Remoção de Manchas",
    text: "Tratamento específico para manchas de café, vinho, gordura, tinta e outras substâncias. Utilizamos produtos especializados para cada tipo de mancha.",
  },
  {
    title: "Higienização Completa",
    text: "Além da limpeza, realizamos a higienização completa do estofado, eliminando ácaros, bactérias e fungos que causam alergias e doenças.",
  },
  {
    title: "Impermeabilização",
    text: "Após a lavagem, oferecemos o serviço de impermeabilização que cria uma barreira protetora contra líquidos e facilita a limpeza do dia a dia.",
  },
  {
    title: "Todos os Tipos de Tecido",
    text: "Atendemos sofás de couro, suede, linho, veludo, chenille e todos os demais tipos de tecido. Cada material recebe tratamento adequado.",
  },
  {
    title: "Atendimento Domiciliar",
    text: "Realizamos todo o serviço no conforto da sua casa ou escritório. Sem necessidade de transportar o sofá. Prático e conveniente.",
  },
]

export default function LavagemSofasPage() {
  return (
    <ServicePageLayout
      title="Lavagem de Sofás"
      subtitle="Sofás"
      description="Devolva a beleza e a higiene do seu sofá! Nossa lavagem profissional remove manchas, ácaros e mau cheiro, deixando seu estofado limpo e revitalizado."
      heroImage="/images/lavagem-sofas.jpg"
      heroImageAlt="Lavagem profissional de sofás"
      benefits={benefits}
      details={details}
      whatsappMessage="Olá! Gostaria de solicitar um orçamento para lavagem de sofá."
      jsonLd={jsonLd}
    />
  )
}
