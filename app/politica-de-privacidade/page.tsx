import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CONTACT_EMAIL, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade | SR Decorações",
  description:
    "Como a SR Decorações trata dados pessoais e cookies no site e no atendimento pelo WhatsApp.",
  alternates: { canonical: `${SITE_URL}/politica-de-privacidade` },
};

const UPDATED_AT = "9 de novembro de 2026";

const sections: { title: string; paragraphs: string[] }[] = [
  {
    title: "Quem somos",
    paragraphs: [
      `Este site pertence à SR Decorações (SR Persianas & Decorações), que presta serviços de lavagem, manutenção e venda de persianas e cortinas, lavagem e reforma de sofás, instalação de pisos e redes de proteção. Para qualquer assunto sobre privacidade, fale com a gente pelo e-mail ${CONTACT_EMAIL} ou pelo telefone ${PHONE_DISPLAY}.`,
    ],
  },
  {
    title: "Dados que tratamos",
    paragraphs: [
      "Atendimento: quando você nos chama pelo WhatsApp ou por telefone, tratamos o que você mesmo enviar (nome, número de telefone, endereço do serviço, fotos e mensagens) para elaborar o orçamento, agendar e prestar o serviço.",
      "Formulário de orçamento: as respostas do formulário das páginas de campanha não são gravadas pelo site. Elas apenas montam a mensagem que abre no seu WhatsApp, e nada é enviado antes de você confirmar o envio na conversa.",
      "Navegação: o site usa o Google Tag Manager, o Google Analytics 4 e a tag de conversão do Google Ads para medir visitas, cliques nos botões de contato e o resultado dos anúncios. Essas ferramentas usam cookies e identificadores do navegador e do clique no anúncio. Não enviamos a elas nome, telefone, e-mail ou o texto que você digita.",
    ],
  },
  {
    title: "Para que usamos",
    paragraphs: [
      "Responder pedidos de orçamento, prestar e cobrar os serviços contratados, cumprir obrigações legais e entender quais páginas e anúncios trazem contatos, para melhorar o site e investir melhor em divulgação.",
      "O tratamento se baseia na execução de contrato e de procedimentos preliminares a pedido do titular, no cumprimento de obrigação legal e no legítimo interesse, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
    ],
  },
  {
    title: "Com quem compartilhamos",
    paragraphs: [
      "Com o Google (medição de audiência e de anúncios) e com o WhatsApp/Meta (troca de mensagens), que atuam conforme as próprias políticas de privacidade. Não vendemos dados pessoais.",
    ],
  },
  {
    title: "Por quanto tempo guardamos",
    paragraphs: [
      "Mensagens e dados de atendimento ficam guardados enquanto forem necessários para o orçamento, o serviço e as obrigações legais. Dados de navegação seguem os prazos de retenção configurados nas ferramentas do Google.",
    ],
  },
  {
    title: "Seus direitos",
    paragraphs: [
      "Você pode pedir confirmação de tratamento, acesso, correção, anonimização, eliminação e informações sobre compartilhamento dos seus dados, além de revogar consentimentos. Basta escrever para o e-mail acima. Você também pode bloquear ou apagar cookies nas configurações do seu navegador.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-16 lg:py-24">
        <article className="mx-auto max-w-3xl px-4 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Atualizada em {UPDATED_AT}.</p>
          {sections.map((section) => (
            <section key={section.title} className="mt-10">
              <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
