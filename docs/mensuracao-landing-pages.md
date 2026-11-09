# Mensuração — site e landing pages de campanha

Atualizado em 09/11/2026. Código: `lib/analytics.ts` (dataLayer, atribuição, código de referência),
`components/analytics/click-tracker.tsx` (cliques de WhatsApp e telefone no site todo),
`components/lp/*` (eventos das landing pages), `app/layout.tsx` (carregamento do GTM).

Contêiner: **GTM-5KMVZ4R8** · GA4: **G-95DJKRLNGJ** · Google Ads: **AW-17864340115**.

## Princípios

1. **Clique no WhatsApp é intenção, não lead.** O site não sabe se a conversa foi enviada. Lead (`generate_lead`)
   só existe quando a SR registra a conversa recebida (ver "Lead qualificado e venda").
2. **Um clique = um evento.** Links das landing pages enviam o próprio evento e têm `data-track="manual"`; o
   rastreador global ignora esses links.
3. **Sem dado pessoal no dataLayer.** Nome, telefone, e-mail e texto livre (bairro do formulário) nunca são enviados.
4. **Cada push zera os parâmetros que não usa** (o modelo de dados do GTM guarda valores entre eventos).
5. **GTM só no domínio oficial** (`www.srdecoracoes.com.br`). Em localhost e prévias da Vercel não carrega, a menos que
   a URL tenha `?gtm_debug=x` (Tag Assistant). Assim testes não geram dados no GA4/Ads.
6. **Carregamento de página não é conversão.**

## Landing pages

| URL | `service_id` | Prefixo do código | Mensagem base do WhatsApp |
|---|---|---|---|
| `/lp/lavagem-de-persianas` | `lavagem-persianas` | `LAV` | Olá! Acessei o site da SR Decorações e gostaria de solicitar um orçamento para lavagem de persianas. |
| `/lp/lavagem-de-cortinas` | `lavagem-cortinas` | `COR` | Olá! Acessei o site da SR Decorações e gostaria de solicitar um orçamento para lavagem de cortinas. |
| `/lp/manutencao-de-persianas` | `manutencao-persianas` | `MAN` | Olá! Gostaria de solicitar um orçamento para conserto ou manutenção de persianas. |

Ao clicar, a mensagem recebe `Código do site: LAV-7K2MQ` (5 caracteres, um por sessão do navegador). Sem JavaScript,
o link funciona com a mensagem base. Conteúdo editável em `lib/landing-pages.ts`; fotos e depoimentos só entram em
`proof` quando forem reais e autorizados. As páginas são `noindex, follow` e ficam fora do sitemap.

## Matriz de eventos

| Ação | Evento | Parâmetros principais | Destino | Papel |
|---|---|---|---|---|
| Clique em link de WhatsApp (qualquer página) | `whatsapp_click` | `page_type`, `cta_id`, `link_text` (+ nas LPs: `lp_slug`, `service_id`, `cta_position`, `lead_ref`) | GA4 + Google Ads | Conversão de intenção |
| Envio válido do formulário da LP (abre o WhatsApp) | `form_submit` **e** `whatsapp_click` (`cta_id=lp_form_submit`) | `form_id`, `item_type`, `quantity_range`, `lead_ref` | GA4 (+ Ads pelo `whatsapp_click`) | Interação + intenção |
| Primeiro campo do formulário tocado | `form_start` | `form_id` | GA4 | Interação |
| Clique em `tel:` | `phone_click` | `cta_id`, `cta_position` | GA4 | Interação |
| Pergunta do FAQ aberta | `faq_open` | `faq_question` | GA4 | Diagnóstico |
| Seção no centro da tela por 1 s (1×) | `section_view` | `section_id` (`hero`, `problemas`, `beneficios`, `processo`, `area`, `faq`, `orcamento`) | GA4 | Diagnóstico |

Em todos os eventos: `page_type` (`landing`, `home`, `service`, `privacy`, `other`) e, quando a sessão entrou com eles,
`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid` (guardados em
`sessionStorage`, só no navegador, chave `sr_attr_v1`).

Posições de CTA (`cta_position`): `lp_header`, `lp_hero`, `lp_after_problems`, `lp_after_process`, `lp_final`,
`lp_form`, `lp_sticky_mobile`, `lp_footer`.

## GTM — mudanças a fazer (manual, em novo espaço de trabalho)

Estado atual (versão 4): a tag de conversão "Contato WhatsApp (1)" (`AW-17864340115/wVbkCMHmo50cEJPlsMZC`) dispara
por **clique em qualquer elemento com texto "WhatsApp"** e por **clique em link com "924240055"**. O primeiro gatilho
conta cliques que não abrem o WhatsApp; os dois juntos podem disparar duas vezes no mesmo clique. O GA4 não recebe
nenhum evento de WhatsApp.

1. **Variáveis** (Variável da camada de dados, versão 2): `dlv - page_type`, `dlv - lp_slug`, `dlv - service_id`,
   `dlv - cta_id`, `dlv - cta_position`, `dlv - lead_ref`, `dlv - form_id`, `dlv - item_type`,
   `dlv - quantity_range`, `dlv - section_id`, `dlv - faq_question`, `dlv - link_text`, `dlv - gclid`.
2. **Acionadores** (Evento personalizado):
   - `CE - whatsapp_click` — nome do evento `whatsapp_click`.
   - `CE - Eventos do site (GA4)` — regex `^(whatsapp_click|phone_click|form_start|form_submit|faq_open|section_view)$`.
3. **Tag** `GA4 - Eventos do site` (Evento do Google Analytics, ID G-95DJKRLNGJ): nome do evento `{{Event}}`;
   parâmetros = as variáveis acima; acionador `CE - Eventos do site (GA4)`.
4. **Tag de conversão "Contato WhatsApp (1)"**: **remover** os dois acionadores atuais (texto do clique / URL do
   link) e usar só `CE - whatsapp_click`. Mantém a mesma ação de conversão e o histórico.
5. Manter Vinculador de conversões e as tags do Google (AW e GA4).
6. **Visualizar** em `https://www.srdecoracoes.com.br/lp/lavagem-de-persianas?gtm_debug=x`: um clique no WhatsApp
   deve gerar 1 `whatsapp_click`, 1 disparo da conversão e 1 evento GA4. Conferir também a home. Só então publicar.

## GA4

- Medição otimizada: **desligar "Interações com formulários"** (gera `form_submit` automático em qualquer formulário,
  inclusive envio inválido — observado em teste em 09/11/2026). Manter rolagem e cliques de saída.
- Dimensões personalizadas (escopo evento): `page_type`, `lp_slug`, `service_id`, `cta_id`, `cta_position`,
  `lead_ref`, `form_id`, `item_type`, `quantity_range`, `section_id`, `faq_question`, `gclid`.
- Evento-chave: `whatsapp_click` (intenção). **Não** marcar `form_submit`, `phone_click` nem `section_view`.
- Vincular GA4 ↔ Google Ads (conta 746-574-0541).

## Google Ads

- "Contato WhatsApp (1)": manter (uma por clique), alimentada só pelo `whatsapp_click`.
- "Conversation started" (recurso de mensagem do anúncio): manter.
- "Calls from ads": secundária.
- **Nova, quando houver registro:** "Lead qualificado (offline)" — importação por `gclid`/`gbraid`/`wbraid`,
  contagem "uma", janela 90 dias; depois "Venda (offline)" com valor.

## Lead qualificado e venda (processo proposto)

1. Toda mensagem vinda das landing pages traz `Código do site: XXX-XXXXX`.
2. A SR registra cada conversa numa planilha (sem dados pessoais): data, código, serviço, cidade/bairro, status
   (recebido → qualificado → orçamento → fechado/perdido), valores e motivo de perda.
3. A agência cruza o código com o GA4 (`lead_ref` → `gclid` e campanha) e importa os status no Google Ads como
   conversões offline. Só com esse volume faz sentido lance automático por conversão.

Limitações: o código só existe para quem veio das landing pages (o restante do site usa a mensagem padrão); quem apaga
o código da mensagem não é rastreável; GA4 só recebe eventos de quem não bloqueia o Google Analytics.

## Consentimento (LGPD) — pendente de decisão

O site não tem banner de cookies nem Modo de Consentimento. Recomendação: banner com opções Análise/Marketing e Consent
Mode v2 (`ad_personalization` negado), carregando o GTM só após o aceite, como na 123 Gravando. Isso reduz os números
do GA4/Ads e deve ser decidido com a SR antes da implementação. A política de privacidade (`/politica-de-privacidade`)
já descreve as ferramentas em uso e precisa da revisão da SR.

## Validação feita em 09/11/2026 (local, `next start`)

- [x] 1 `whatsapp_click` por clique (LP e home), com parâmetros corretos e `lead_ref` na mensagem.
- [x] Formulário: envio incompleto bloqueado; envio válido gera `form_submit` + `whatsapp_click` e abre o WhatsApp
  com tipo, quantidade, bairro e código; bairro ausente do dataLayer.
- [x] `faq_open`, `form_start`, `section_view` (1× por seção) com parâmetros.
- [x] UTM e `gclid` da URL de entrada preservados em todos os eventos.
- [x] GTM não carrega em localhost após a mudança.
- [ ] Tag Assistant e GA4 DebugView no domínio oficial (depende da publicação).
