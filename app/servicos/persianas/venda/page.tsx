import type { Metadata } from "next"
import { ServicePageLayout } from "@/components/service-page-layout"
import { getServiceMetadata, serviceSchema } from "@/lib/seo"

export const metadata: Metadata = getServiceMetadata("persianas/venda")

const jsonLd = serviceSchema("persianas/venda", {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Venda de Persianas e Cortinas",
  provider: {
    "@type": "LocalBusiness",
    name: "SR Decorações",
    telephone: "+5511924240055",
    email: "srdecoracoess@gmail.com",
    areaServed: "São Paulo",
  },
  description:
    "Venda de persianas e cortinas de diversos modelos com medição e instalação profissional inclusa.",
  areaServed: {
    "@type": "City",
    name: "São Paulo",
  },
})

const benefits = [
  "Grande variedade de modelos: rolô, romana, double vision, horizontal e vertical",
  "Medição gratuita do ambiente na sua residência ou empresa",
  "Instalação profissional inclusa no serviço",
  "Mostruário levado até você para escolha do modelo ideal",
  "Materiais de alta qualidade com durabilidade garantida",
  "Preços competitivos e condições de pagamento facilitadas",
  "Orientação profissional para escolha do melhor modelo para cada ambiente",
  "Garantia do fabricante em todos os produtos vendidos",
]

const details = [
  {
    title: "Cortina Rolô",
    text: "Prática e elegante, a cortina rolô oferece controle de luminosidade com design clean e moderno. Ideal para escritórios e ambientes contemporâneos.",
  },
  {
    title: "Cortina Romana",
    text: "Sofisticação e charme para seu ambiente. A cortina romana cria um efeito visual elegante com dobras horizontais e tecidos nobres.",
  },
  {
    title: "Cortina Double Vision",
    text: "Controle perfeito de luz e privacidade com faixas alternadas de tecido translúcido e opaco. Visual moderno e funcional.",
  },
  {
    title: "Persiana Horizontal",
    text: "Clássica e versátil, a persiana horizontal permite controle total da luminosidade. Disponível em alumínio, madeira e PVC.",
  },
  {
    title: "Persiana Vertical",
    text: "Ideal para grandes janelas e portas de vidro. As lâminas verticais oferecem elegância e praticidade no controle de luz.",
  },
  {
    title: "Medição e Instalação",
    text: "Nossa equipe vai até você para medição precisa do ambiente e instalação profissional, garantindo acabamento perfeito.",
  },
]

export default function VendaPersianasPage() {
  return (
    <ServicePageLayout
      title="Venda de Persianas e Cortinas"
      subtitle="Produtos"
      description="Encontre a persiana ou cortina perfeita para seu ambiente. Trabalhamos com os melhores modelos do mercado, com medição gratuita e instalação profissional inclusa."
      heroImage="/images/venda-persianas.jpg"
      heroImageAlt="Showroom de persianas e cortinas para venda"
      benefits={benefits}
      details={details}
      whatsappMessage="Olá! Gostaria de solicitar um orçamento para compra de persianas/cortinas."
      jsonLd={jsonLd}
    />
  )
}
