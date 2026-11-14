import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection, LegalShell, Pending } from "@/components/legal-shell";
import { CONSENT_ENABLED } from "@/lib/consent";
import { CONTACT_EMAIL, LEGAL_CNPJ, LEGAL_NAME, PHONE_DISPLAY, SITE_URL } from "@/lib/site";
import { LEGACY_SECTIONS, LEGACY_UPDATED_AT } from "./legacy-sections";

export const metadata: Metadata = {
  title: "Política de Privacidade | SR Decorações",
  description:
    "Como a SR Decorações trata dados pessoais e cookies no site e no atendimento pelo WhatsApp.",
  alternates: { canonical: `${SITE_URL}/politica-de-privacidade` },
};

const UPDATED_AT = "13 de novembro de 2026";

export default function PrivacyPolicyPage() {
  // Sem o consentimento ligado, segue o texto já publicado (sem pendências jurídicas à mostra).
  if (!CONSENT_ENABLED) {
    return (
      <LegalShell title="Política de Privacidade" updatedAt={LEGACY_UPDATED_AT}>
        {LEGACY_SECTIONS.map((section) => (
          <LegalSection key={section.title} title={section.title}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </LegalSection>
        ))}
      </LegalShell>
    );
  }

  return (
    <LegalShell title="Política de Privacidade" updatedAt={UPDATED_AT}>
      <p className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Texto preparado para revisão jurídica antes da publicação definitiva. Itens marcados como
        pendentes dependem de dados da SR ou de decisão do responsável.
      </p>

      <LegalSection title="1. Controlador dos dados">
        <p>
          O controlador é <strong className="text-foreground">{LEGAL_NAME}</strong> (CNPJ {LEGAL_CNPJ}),
          que atua sob o nome SR Decorações (SR Persianas &amp; Decorações) e presta serviços de
          lavagem, manutenção e venda de persianas e cortinas, lavagem e reforma de sofás, instalação
          de pisos e redes de proteção.
        </p>
        <p>
          Endereço: a SR Decorações não tem ponto de atendimento ao público; os serviços são prestados
          a domicílio. Para assuntos de privacidade, use os canais abaixo.
        </p>
        <p>
          Encarregado pelo tratamento de dados (DPO): Raphael Lima, pelo e-mail {CONTACT_EMAIL} ou
          pelo telefone {PHONE_DISPLAY}.
        </p>
        <p>
          Canais de contato sobre privacidade: {CONTACT_EMAIL} · {PHONE_DISPLAY}.
        </p>
      </LegalSection>

      <LegalSection title="2. Dados que tratamos e para quê">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Atendimento e orçamentos (WhatsApp e telefone):</strong> o que você
            enviar (nome, telefone, endereço do serviço, fotos, mensagens) para elaborar o orçamento,
            agendar e prestar o serviço, e cobrar o que for contratado.
          </li>
          <li>
            <strong className="text-foreground">Formulário de orçamento das páginas de campanha:</strong> as respostas
            não são gravadas pelo site; elas apenas montam a mensagem que abre no seu WhatsApp. Nada é
            enviado antes de você confirmar o envio na conversa. O site gera um código curto de
            atendimento (ex.: LAV-7K2MQ), incluído na mensagem, para a SR localizar o seu pedido.
          </li>
          <li>
            <strong className="text-foreground">Navegação (somente com o seu aceite):</strong> estatísticas de uso do site
            (Google Analytics 4), comportamento de navegação (Microsoft Clarity) e
            resultado dos anúncios (Google Ads). Não enviamos a essas ferramentas nome, telefone, e-mail
            nem o texto que você digita.
          </li>
          <li>
            <strong className="text-foreground">Atribuição de anúncios (somente com o aceite de Marketing):</strong> o site
            guarda no seu navegador a origem da visita (parâmetros UTM e identificador de clique do
            anúncio) para ligar um orçamento ao anúncio que o gerou.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Bases legais">
        <p>
          Atendimento e execução do serviço: execução de contrato e de procedimentos preliminares a
          pedido do titular (art. 7º, V, da LGPD), e cumprimento de obrigação legal. Cookies e
          tecnologias analíticas e de publicidade: consentimento (art. 7º, I), que você pode recusar e
          revogar a qualquer momento.
        </p>
        <p>
          <Pending>revisão jurídica da base legal de cada finalidade, inclusive eventual legítimo interesse</Pending>
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies e tecnologias semelhantes">
        <p>
          O site mostra um aviso de cookies na primeira visita, com opções de aceitar, rejeitar e
          personalizar, e permite mudar a escolha pelo link “Preferências de cookies” do rodapé.
          Detalhes, inventário e prazos na{" "}
          <Link href="/politica-de-cookies" className="font-semibold text-[#043761] underline">
            Política de Cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="5. Compartilhamento com fornecedores">
        <p>
          Compartilhamos dados apenas com fornecedores necessários às finalidades acima: Google
          (Tag Manager, Analytics e Ads), Microsoft (Clarity), WhatsApp/Meta
          (mensagens) e a hospedagem do site. Não vendemos dados pessoais.
        </p>
      </LegalSection>

      <LegalSection title="6. Transferência internacional">
        <p>
          Google, Microsoft e Meta podem tratar dados em servidores fora do Brasil. A transferência
          ocorre sob as garantias previstas na LGPD e nas políticas desses provedores.{" "}
          <Pending>confirmar o mecanismo de transferência aplicável com a assessoria jurídica</Pending>
        </p>
      </LegalSection>

      <LegalSection title="7. Por quanto tempo guardamos">
        <p>
          Dados de atendimento: enquanto forem necessários para o orçamento, o serviço e as
          obrigações legais. Dados de navegação: conforme os prazos das ferramentas (veja a Política de
          Cookies). O registro de atribuição no navegador dura até 90 dias.{" "}
          <Pending>definir prazos de retenção do atendimento e da planilha comercial</Pending>
        </p>
      </LegalSection>

      <LegalSection title="8. Seus direitos">
        <p>
          Você pode pedir confirmação de tratamento, acesso, correção, anonimização, bloqueio ou
          eliminação, portabilidade, informação sobre compartilhamento e revogação do consentimento.
          Escreva para {CONTACT_EMAIL}. Também pode reclamar à Autoridade Nacional de Proteção de
          Dados (ANPD).
        </p>
      </LegalSection>

      <LegalSection title="9. Segurança">
        <p>
          O site usa conexão segura (HTTPS) e limita o que as ferramentas de medição recebem. Nenhum
          sistema é totalmente invulnerável; em caso de incidente relevante, adotaremos as medidas
          previstas na LGPD.
        </p>
      </LegalSection>

      <LegalSection title="10. Atualizações desta política">
        <p>
          Esta política pode mudar quando alterarmos as ferramentas ou a lei exigir. A data no topo
          mostra a última revisão.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
