import type { Metadata } from "next";
import Script from "next/script";
import { ServicePageLayout } from "@/components/service-page-layout";
import { getServiceMetadata, serviceSchema } from "@/lib/seo";
import { Breadcrumbs, BreadcrumbSchema } from "@/components/breadcrumbs";

export const metadata: Metadata = getServiceMetadata(
  "lavagem-persianas-cortinas",
);

const jsonLd = serviceSchema("lavagem-persianas-cortinas", {
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
});

const breadcrumbSchema = BreadcrumbSchema({
  items: [
    { label: "Serviços", href: "/#servicos" },
    { label: "Lavagem de Persianas e Cortinas" },
  ],
});

const benefits = [
  "Eliminação de ácaros, bactérias, germes e fungos prejudiciais à saúde",
  "Produtos certificados e à base de água, seguros para crianças e pets",
  "Serviço realizado no conforto da sua residência ou empresa",
  "Equipe profissional treinada e equipamentos de última geração",
  "Uma higienização custa apenas uma fração do valor de persianas novas",
  "Combate ao mau cheiro e devolve a aparência original das peças",
  "Atendimento rápido com dia e horário agendados",
  "Garantia de qualidade em todos os serviços realizados",
];

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
];

export default function LavagemPersianasPage() {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/#servicos" },
          { label: "Lavagem de Persianas e Cortinas" },
        ]}
      />
      <ServicePageLayout
        title="Lavagem de Persianas e Cortinas"
        subtitle="Serviço Principal"
        description="Suas persianas e cortinas novas de novo! Nossa lavagem profissional elimina ácaros, bactérias, fungos e mau cheiro, devolvendo a beleza e protegendo a saúde da sua família."
        heroImage="/images/lavagem-persianas.jpg"
        heroImageAlt="Lavagem profissional de persianas e cortinas com técnicas especializadas"
        benefits={benefits}
        details={details}
        whatsappMessage="Olá! Gostaria de solicitar um orçamento para lavagem de persianas e cortinas."
        jsonLd={jsonLd}
      />
    </>
  );
}
