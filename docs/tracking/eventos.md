# Eventos, parâmetros, conversões e atribuição

Código: `lib/analytics.ts` (lista fechada de eventos/parâmetros), `lib/tracking-taxonomy.ts` (rota → serviço), `components/analytics/click-tracker.tsx`.

## Princípios

1. Clique no WhatsApp é **intenção**, não conversa iniciada nem lead. `generate_lead` **não é emitido pelo site**; só existirá quando a SR registrar uma solicitação realmente recebida (importação offline).
2. Um clique = um evento. Links das landing pages usam `data-track="manual"` (precisam inserir o código de atendimento na mensagem).
3. Nenhum dado pessoal, `gclid`/`gbraid`/`wbraid`, UTM ou `lead_ref` viaja como parâmetro de evento (GA4 ou Clarity).
4. `page_view` é automático (medição otimizada do GA4, mudanças de histórico): o site **não** envia `page_view` manual. Testado com o App Router: 1 por rota, sem duplicar em link interno, voltar e avançar ([validacao.md](validacao.md)).
5. Sem consentimento, nenhum evento entra no dataLayer; com ele, quem decide o que cada tag recebe é o contêiner.

## Eventos

| Evento | Quando | Parâmetros além dos de contexto | Valor analítico |
|---|---|---|---|
| `whatsapp_click` | Clique em qualquer link wa.me (todas as páginas) ou envio válido do formulário da LP | `button_location`, `button_id`, `contact_intent`; no formulário também `form_id`, `item_type`, `quantity_range` | Intenção de contato (evento-chave) |
| `phone_click` | Clique em `tel:` | `button_location`, `button_id` | Intenção de ligação |
| `email_click` | Clique em `mailto:` | `button_location`, `button_id` | Interação |
| `cta_click` | CTA interno com `data-cta-id` (ex.: “Conheça nossos serviços”) | `button_location`, `button_id` | Diagnóstico |
| `service_card_click` | Card de serviço da home | `service_name` (do card), `button_location=servicos` | Serviços mais procurados |
| `service_view` | Abertura de página de serviço (1×) | contexto | Serviços mais acessados |
| `landing_page_view` | Abertura de LP de campanha (1×) | `traffic_type` (`google_ads`, `campanha_utm`, `direto_ou_organico`) | Desempenho de LP por tipo de tráfego |
| `form_start` | Primeiro foco no formulário da LP | `form_id` | Início real da interação |
| `form_error` | Validação falhou | `form_id`, `error_fields` (só nomes dos campos) | Fricção no formulário |
| `faq_interaction` | Abertura de pergunta (home e LP) | `faq_question`, `button_location=faq` | Dúvidas frequentes |
| `section_view` | Seção ocupa o centro da tela por 1 s (1× por seção, LPs) | `section_id` | Rolagem/abandono; cobre `portfolio_view` (`portfolio`) e `contact_section_view` (`orcamento`) sem criar eventos redundantes |

**Não implementados de propósito:** `form_submit` (o formulário só abre o WhatsApp; o envio válido é um `whatsapp_click` com `form_id`), `generate_lead` (ver acima), `page_view` manual.

Contexto automático em todo evento (derivado da rota): `landing_page_type` (`home`, `servico`, `lp_campanha`, `politica`, `outra`), `service_name`, `service_category` (`persianas-cortinas`, `sofas`, `pisos`, `redes-protecao`, `institucional`).

`button_location` (valores atuais): `header`, `header_mobile`, `hero`, `hero_servico`, `servicos`, `como_funciona`, `meio_pagina`, `cta_final`, `rodape`, `flutuante`, `faq`, `lp_header`, `lp_hero`, `lp_after_problems`, `lp_after_process`, `lp_final`, `lp_formulario`, `lp_sticky_mobile`, `lp_footer`. `contact_intent`: `orcamento`, `envio_foto`, `contato_geral`.

## Cobertura do `whatsapp_click` (pré-requisito para trocar os gatilhos da conversão)

Todo ponto de contato por WhatsApp do site e como é medido:

| Ponto | Componente | `button_location` / `button_id` | Quem envia o evento |
|---|---|---|---|
| Header desktop / mobile | `header.tsx` | `header` / `header-whatsapp-cta`; `header_mobile` / `mobile-header-whatsapp` | rastreador global |
| Hero da home | `hero-section.tsx` → `WhatsAppButton` | `hero` / `hero-whatsapp-cta` | rastreador global |
| Como funciona | `how-it-works.tsx` | `como_funciona` / `how-it-works-whatsapp` | rastreador global |
| CTA final | `cta-section.tsx` | `cta_final` / `cta-final-whatsapp` | rastreador global |
| Páginas de serviço (hero, meio) | `service-page-layout.tsx` | `hero_servico`, `meio_pagina` | rastreador global |
| Botão flutuante | `WhatsAppButton variant="fixed"` | `flutuante` / `whatsapp-float` | rastreador global |
| Rodapé | `footer.tsx` | `rodape` / `footer-whatsapp` | rastreador global |
| LP: header, hero, problemas, processo, final, sticky | `lp-links.tsx` (`LpWhatsAppLink`) | `lp_*` | o próprio link |
| LP: formulário | `lp-quote-form.tsx` | `lp_formulario` / `lp_form_submit` | o formulário (não há clique em `<a>`) |

O teste `lib/tracking-coverage.test.ts` falha se alguém criar um link wa.me fora de `whatsappUrl()`, sem posição ou fora desses emissores. Validado no navegador: 1 evento por interação; na v5 atual o botão flutuante gera 2 pings de conversão (texto “WhatsApp” + URL), hero e header 1.

## Dimensões personalizadas do GA4 (9 de 50, escopo evento)

`service_name`, `service_category`, `landing_page_type`, `button_location`, `button_id`, `contact_intent`, `form_id`, `section_id`, `traffic_type`. Opcionais, só se for analisar: `faq_question`, `error_fields`, `item_type`, `quantity_range`. **Sem `lead_ref`.**

## Eventos-chave e conversões do Google Ads (nada alterado)

| Item | Situação atual (lida pela API) | Recomendação |
|---|---|---|
| GA4 evento-chave | nenhum | marcar só `whatsapp_click`. **Não** marcar `phone_click`, `form_*`, `section_view`, `service_view` |
| Ads “Contato WhatsApp (1)” (Site, principal, 1 por clique) | ativa; **meta CONTACT/WEBSITE não é usada para lances** | manter a ação; só os gatilhos mudam (§6 do README) |
| Ads “Calls from ads” | principal, usada nos lances | manter |
| Ads “Clicks to call” | fora de “Conversões” | manter |
| Importar o evento-chave do GA4 para o Ads | não existe | **não criar** enquanto a ação de Site existir (duplicaria) |
| Enhanced Conversions | não aplicável | o site não coleta e-mail/telefone |
| Lead qualificado / venda (offline) | não existe | criar quando houver registro (abaixo) |

## Atribuição própria e preparação para CRM

`lib/attribution.ts` guarda no navegador, **só com Marketing concedido**, em `localStorage` (`sr_attribution_v1`, 90 dias, apagado na revogação):

```json
{ "utm_source": "google", "utm_medium": "cpc", "utm_campaign": "...", "utm_term": "...", "utm_content": "...",
  "gclid": "...", "gbraid": "...", "wbraid": "...",
  "lead_ref": "LAV-7K2MQ", "service_id": "lavagem-persianas",
  "landing_path": "/lp/lavagem-de-persianas", "captured_at": 1794596299490 }
```

`lead_ref` (código curto) também vai na mensagem do WhatsApp (“Código do site: LAV-7K2MQ”) como referência funcional do atendimento, sem identificador publicitário. Nem o código nem o `gclid` vão ao GA4.

**Ponte para CRM (não implementada, apenas preparada):** se `NEXT_PUBLIC_LEAD_ATTRIBUTION_ENDPOINT` estiver configurada e houver Marketing concedido, o clique envia o registro acima (POST JSON, `sendBeacon`) a esse endpoint. Sem endpoint, nada sai do navegador. Contrato esperado do endpoint: aceitar o JSON acima, gravar `lead_ref` + identificadores com prazo de retenção definido (≤ 90 dias), responder 2xx sem corpo, aceitar só a origem do site. Antes de ativar: base legal e aviso na política de privacidade.

### Fluxo comercial futuro (anúncio → orçamento → serviço)

1. Clique no WhatsApp (`whatsapp_click`) — mensurável hoje.
2. Contato efetivamente recebido — a SR registra o `lead_ref` na planilha/CRM (data, código, serviço, bairro/cidade, status).
3. Lead qualificado → orçamento enviado → serviço contratado: status no CRM.
4. O CRM junta o `lead_ref` ao registro de atribuição (endpoint acima) e obtém `gclid`/`gbraid`/`wbraid`.
5. Importação de conversões offline no Google Ads (por `gclid`/`gbraid`/`wbraid`, janela 90 dias): ações “Lead qualificado (offline)” e depois “Venda (offline)” com valor. Só então faz sentido lance automático por conversão.

Limitações: só quem veio de anúncio e aceitou Marketing tem identificador; quem apaga o código da mensagem não é ligado ao registro; as etapas 2–5 **não são observáveis hoje**.

## Marcação automática e UTM

Marcação automática ligada na conta; a campanha ativa tem sufixo `utm_source=google&utm_medium=cpc&utm_campaign=search_sr_lavagem&utm_term={keyword}&utm_content={creative}`. O GA4 atribui a sessão sozinho; o site só usa a URL de entrada para classificar `traffic_type` e para o registro próprio.
