import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CookiePreferencesButton } from "@/components/consent/cookie-preferences-button";
import { LegalSection, LegalShell, Pending } from "@/components/legal-shell";
import {
  CATEGORY_LABEL,
  STATUS_LABEL,
  itemsByCategory,
  type InventoryCategory,
} from "@/lib/cookie-inventory";
import { CONSENT_ENABLED } from "@/lib/consent";
import { CONTACT_EMAIL, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies | SR Decorações",
  description:
    "Quais cookies e tecnologias semelhantes o site da SR Decorações usa, para quê, por quanto tempo e como aceitar, recusar ou mudar a sua escolha.",
  alternates: { canonical: `${SITE_URL}/politica-de-cookies` },
};

const UPDATED_AT = "13 de novembro de 2026";
const CATEGORIES: InventoryCategory[] = ["necessarios", "analiticos", "marketing"];

function InventoryTable({ category }: { category: InventoryCategory }) {
  const items = itemsByCategory(category);
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <caption className="sr-only">{CATEGORY_LABEL[category]}</caption>
        <thead className="bg-secondary text-foreground">
          <tr>
            <th scope="col" className="px-3 py-2 font-semibold">Nome</th>
            <th scope="col" className="px-3 py-2 font-semibold">Tipo</th>
            <th scope="col" className="px-3 py-2 font-semibold">Quem define</th>
            <th scope="col" className="px-3 py-2 font-semibold">Finalidade</th>
            <th scope="col" className="px-3 py-2 font-semibold">Duração</th>
            <th scope="col" className="px-3 py-2 font-semibold">Situação da informação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border align-top">
          {items.map((item) => (
            <tr key={item.name}>
              <td className="px-3 py-2 font-mono text-xs text-foreground">{item.name}</td>
              <td className="px-3 py-2">{item.kind}</td>
              <td className="px-3 py-2">{item.provider}</td>
              <td className="px-3 py-2">{item.purpose}</td>
              <td className="px-3 py-2">{item.duration}</td>
              <td className="px-3 py-2">{STATUS_LABEL[item.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicyPage() {
  // A política descreve o banner e o consentimento: só existe com a flag ligada.
  if (!CONSENT_ENABLED) notFound();

  return (
    <LegalShell title="Política de Cookies" updatedAt={UPDATED_AT}>
      <p className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Texto preparado para revisão jurídica antes da publicação definitiva. Os itens marcados como
        pendentes dependem de confirmação em produção ou de dados da SR.
      </p>

      <LegalSection title="1. O que são cookies">
        <p>
          Cookies são pequenos arquivos que o site grava no seu navegador. Tecnologias parecidas,
          como o armazenamento local (localStorage) e de sessão (sessionStorage), cumprem funções
          semelhantes. Chamamos tudo isso, nesta página, de cookies.
        </p>
      </LegalSection>

      <LegalSection title="2. Como o site usa cookies">
        <p>
          Usamos cookies necessários para o site funcionar e para lembrar a sua escolha. Os demais
          só são usados se você aceitar a categoria correspondente. Sem aceite, os serviços de
          medição do Google e da Microsoft nem chegam a ser carregados. Recusar não limita o acesso
          ao site nem aos nossos canais de contato.
        </p>
      </LegalSection>

      <LegalSection title="3. Categorias e finalidades">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Necessários:</strong> funcionamento do site e registro da sua
            escolha. Não dependem de consentimento e não são usados para publicidade ou perfilamento.
          </li>
          <li>
            <strong className="text-foreground">Analíticos:</strong> entender quantas pessoas visitam o site, de
            onde vêm, quais páginas e botões usam e onde encontram dificuldade, para melhorar o site.
          </li>
          <li>
            <strong className="text-foreground">Marketing:</strong> medir quais anúncios do Google Ads geram
            contatos. Não usamos remarketing nem personalização de anúncios.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Cookies necessários">
        <InventoryTable category="necessarios" />
      </LegalSection>

      <LegalSection title="5. Cookies analíticos">
        <p>
          Dependem do seu aceite. Usamos o Google Analytics 4 e o Microsoft Clarity
          (gravações e mapas de calor, com campos de formulário mascarados e sem captura do que você
          digita).
        </p>
        <InventoryTable category="analiticos" />
      </LegalSection>

      <LegalSection title="6. Cookies de publicidade">
        <p>
          Dependem do seu aceite da categoria Marketing. Servem para medir o resultado dos anúncios
          do Google Ads.
        </p>
        <InventoryTable category="marketing" />
      </LegalSection>

      <LegalSection title="7. Serviços de terceiros utilizados">
        <ul className="list-disc space-y-2 pl-5">
          <li>Google Tag Manager, Google Analytics 4 e Google Ads (Google LLC).</li>
          <li>
            Microsoft Clarity (Microsoft Corporation), somente com o aceite de Analíticos.{" "}
            <Pending>confirmar em produção que a tag só dispara com esse aceite</Pending>
          </li>
          <li>WhatsApp (Meta): apenas quando você toca em um botão que abre a conversa.</li>
        </ul>
        <p>
          Esses provedores tratam dados conforme as próprias políticas e podem armazená-los fora do
          Brasil (veja a Política de Privacidade).
        </p>
      </LegalSection>

      <LegalSection title="8. Prazo de duração e retenção">
        <p>
          Os prazos estão nas tabelas acima. Os de cookies de terceiros são os informados pelo
          provedor e podem mudar. Itens marcados como “validação pendente” serão conferidos no
          ambiente de produção antes da versão definitiva desta política.
        </p>
      </LegalSection>

      <LegalSection title="9. Como aceitar, recusar ou alterar suas preferências">
        <p>
          Na primeira visita aparece um aviso com três opções com o mesmo destaque: Aceitar todos,
          Rejeitar não necessários e Personalizar. Em Personalizar, as categorias opcionais começam
          desmarcadas. Você pode reabrir o painel a qualquer momento:
        </p>
        <p>
          <CookiePreferencesButton className="rounded-lg border-2 border-[#043761] px-4 py-2 text-sm font-semibold text-[#043761] hover:bg-secondary" />
        </p>
        <p>
          Também há o link “Preferências de cookies” no rodapé de todas as páginas. A escolha vale
          por 12 meses e é pedida de novo se mudarmos as categorias.
        </p>
      </LegalSection>

      <LegalSection title="10. Como revogar o consentimento">
        <p>
          Abra “Preferências de cookies”, desmarque a categoria e salve (ou escolha “Rejeitar não
          necessários”). Interrompemos o uso daquela categoria, apagamos os cookies dela que o site
          consegue remover e recarregamos a página. Cookies que o navegador mantém em outros
          domínios podem exigir a limpeza manual (item seguinte).
        </p>
      </LegalSection>

      <LegalSection title="11. Como gerenciar cookies pelo navegador">
        <p>
          Todos os navegadores permitem bloquear ou apagar cookies nas configurações de privacidade
          (Chrome, Edge, Firefox, Safari e outros). Bloquear os necessários pode impedir que o site
          lembre a sua escolha.
        </p>
      </LegalSection>

      <LegalSection title="12. Seus direitos">
        <p>
          Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir
          confirmação de tratamento, acesso, correção, anonimização, eliminação, informação sobre
          compartilhamento e revogação do consentimento. Veja a{" "}
          <Link href="/politica-de-privacidade" className="font-semibold text-[#043761] underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="13. Contato">
        <p>
          SR Decorações: {CONTACT_EMAIL} · {PHONE_DISPLAY}.
        </p>
        <p>
          Controlador e encarregado pelo tratamento de dados: <Pending>razão social, CNPJ e nome ou canal do encarregado (DPO)</Pending>
        </p>
      </LegalSection>

      <LegalSection title="14. Atualizações desta política">
        <p>
          Podemos atualizar esta política quando mudarmos as ferramentas ou a lei exigir. A data no
          topo mostra a última revisão. Mudanças nas categorias de cookies reabrem o aviso de
          consentimento.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
