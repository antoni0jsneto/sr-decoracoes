import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service-page-layout";
import { getServiceMetadata, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = getServiceMetadata("persianas/manutencao");

const jsonLd = serviceSchema("persianas/manutencao", {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Manutenção de Persianas e Cortinas",
  provider: {
    "@type": "LocalBusiness",
    name: "SR Decorações",
    telephone: "+5511924240055",
    email: "srdecoracoess@gmail.com",
    areaServed: "São Paulo",
  },
  description:
    "Manutenção, conserto e troca de peças de persianas e cortinas. Equipe profissional e peças originais.",
  areaServed: {
    "@type": "City",
    name: "São Paulo",
  },
});

const benefits = [
  "Conserto de todos os tipos e modelos de persianas e cortinas",
  "Troca de peças danificadas com componentes de qualidade",
  "Ajustes de mecanismos, trilhos, cordas e suportes",
  "Equipe técnica especializada e constantemente treinada",
  "Atendimento em residências e empresas em toda Grande São Paulo",
  "Serviço rápido com dia e horário agendados",
  "Custo muito inferior à compra de persianas novas",
  "Garantia de qualidade nos serviços e peças utilizadas",
];

const details = [
  {
    title: "Tipos de Reparo",
    text: "Realizamos consertos em persianas horizontais, verticais, rolô, romana, double vision e cortinas. Troca de cordas, mecanismos, suportes e trilhos.",
  },
  {
    title: "Troca de Peças",
    text: "Utilizamos peças de reposição de alta qualidade para garantir o funcionamento perfeito das suas persianas e cortinas por longos anos.",
  },
  {
    title: "Diagnóstico Técnico",
    text: "Nossa equipe realiza um diagnóstico completo para identificar o problema e apresentar a melhor solução com transparência nos custos.",
  },
  {
    title: "Atendimento Rápido",
    text: "Sabemos que uma persiana quebrada é um incômodo. Por isso, agendamos o reparo o mais rápido possível para resolver o seu problema.",
  },
  {
    title: "Preventiva e Corretiva",
    text: "Além de reparos, oferecemos manutenção preventiva para evitar problemas futuros e prolongar a vida útil das suas persianas.",
  },
  {
    title: "Economia Garantida",
    text: "Não troque suas persianas! A manutenção custa muito menos que a compra de peças novas e deixa tudo funcionando perfeitamente.",
  },
];

export default function ManutencaoPersianasPage() {
  return (
    <ServicePageLayout
      title="Manutenção de Persianas e Cortinas"
      subtitle="Serviço Principal"
      description="Sua persiana quebrou? Não se preocupe! Nossa equipe especializada realiza consertos, troca de peças e ajustes em todos os tipos de persianas e cortinas, com rapidez e preço justo."
      heroImage="/images/manutencao-persianas.jpg"
      heroImageAlt="Manutenção profissional de persianas e cortinas"
      benefits={benefits}
      details={details}
      whatsappMessage="Olá! Gostaria de solicitar um orçamento para manutenção de persianas e cortinas."
      jsonLd={jsonLd}
    />
  );
}
