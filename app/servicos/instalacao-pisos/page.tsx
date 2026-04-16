import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service-page-layout";
import { getServiceMetadata, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = getServiceMetadata("instalacao-pisos");

const jsonLd = serviceSchema("instalacao-pisos", {
  title: "Instalação de Carpete e Paviflex | SR Decorações",
  description:
    "Instalação profissional de carpete e paviflex para residências e empresas. Acabamento perfeito e duradouro. Orçamento grátis via WhatsApp. Atendemos toda Grande São Paulo.",
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
});

const benefits = [
  "Instalação profissional de carpete em placas e em rolo",
  "Instalação de paviflex para áreas comerciais e residenciais",
  "Acabamento perfeito com nivelamento e alinhamento precisos",
  "Equipe técnica experiente e qualificada",
  "Variedade de modelos e cores para combinar com seu ambiente",
  "Preparação completa do contrapiso quando necessário",
  "Limpeza completa do ambiente após a instalação",
  "Garantia de qualidade no serviço e no material utilizado",
];

const details = [
  {
    title: "Carpete em Placas",
    text: "Instalação de carpete em placas modulares, ideal para escritórios e ambientes corporativos. Fácil manutenção e troca de placas individuais quando necessário.",
  },
  {
    title: "Carpete em Rolo",
    text: "Instalação de carpete em rolo para ambientes residenciais e comerciais. Ampla variedade de cores e texturas para se adequar ao seu projeto.",
  },
  {
    title: "Paviflex",
    text: "Instalação de piso paviflex, resistente e durável, ideal para áreas de grande circulação, escritórios, escolas e comércios em geral.",
  },
  {
    title: "Preparação do Contrapiso",
    text: "Quando necessário, realizamos o nivelamento e preparação do contrapiso para garantir uma base perfeita para a instalação.",
  },
  {
    title: "Rodapés e Acabamentos",
    text: "Instalação de rodapés e perfis de acabamento coordenados com o piso escolhido para um resultado impecável.",
  },
  {
    title: "Consultoria e Orçamento",
    text: "Visitamos seu espaço para avaliar as condições do local, tirar medidas e apresentar as melhores opções de carpete e paviflex para cada ambiente.",
  },
];

export default function InstalacaoPisosPage() {
  return (
    <ServicePageLayout
      title="Instalação de Carpete e Paviflex"
      subtitle="Pisos"
      description="Transforme seus ambientes com carpete ou paviflex de qualidade! Realizamos instalação profissional para residências e empresas, com acabamento impecável e durabilidade garantida."
      heroImage="/images/instalacao-pisos.jpg"
      heroImageAlt="Instalação profissional de carpete e paviflex"
      benefits={benefits}
      details={details}
      whatsappMessage="Olá! Gostaria de solicitar um orçamento para instalação de carpete ou paviflex."
      jsonLd={jsonLd}
    />
  );
}
