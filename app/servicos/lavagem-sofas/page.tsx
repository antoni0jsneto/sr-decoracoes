import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service-page-layout";
import { getServiceMetadata, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = getServiceMetadata("lavagem-sofas");

const jsonLd = serviceSchema("lavagem-sofas", {
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
});

const benefits = [
  "Lavagem profunda com equipamentos profissionais de alta potência",
  "Remoção eficaz de manchas, gordura e sujeiras incrustadas",
  "Eliminação de ácaros, bactérias e fungos do estofado",
  "Remoção de mau cheiro e odores desagradáveis",
  "Serviço de impermeabilização para proteção prolongada",
  "Secagem rápida com equipamentos industriais",
  "Atendemos todos os tipos de tecido e estofados",
  "Serviço realizado no conforto da sua casa ou empresa",
];

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
];

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
  );
}
