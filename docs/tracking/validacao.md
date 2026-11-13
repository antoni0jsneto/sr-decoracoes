# Validação e evidências

Data: 13/11/2026. Ambiente: `next start` local (build de produção), Chrome (DevTools MCP) em contexto isolado, viewport desktop e 375×812. **Nenhum dado de teste foi enviado a GA4/Ads/Clarity depois que o bloqueio ficou ativo** (ver “Ressalva”). Scripts usados: [`scripts/tracking-harness.js`](../../scripts/tracking-harness.js) (registra e bloqueia requisições de medição, sobrevive só à navegação em que é injetado) e [`scripts/tracking-snapshot.js`](../../scripts/tracking-snapshot.js) (coleta rede, cookies, armazenamento, estado de consentimento, dataLayer).

> **Limite desta validação:** testei o **lado do site** contra o contêiner **publicado hoje (v5)**, que ainda **não tem o gate por categoria**. Por isso as colunas de rede abaixo mostram o *antes*. O comportamento do contêiner novo (importação + edições) só pode ser provado no Preview da sua conta: roteiro no fim deste arquivo. **Isso continua pendente.**

## Resumo

| Item | Resultado |
|---|---|
| Testes unitários (`pnpm test`) | 37 aprovados, 0 falhas |
| `pnpm typecheck` | só 1 erro **anterior** à branch (`components/ui/calendar.tsx`); nenhum nos arquivos novos |
| `pnpm lint` | arquivos alterados sem erro; restam 5 erros anteriores em `components/ui/*` e `hooks/use-mobile.tsx` (regras novas do React) |
| `pnpm build` | aprovado com a flag desligada e ligada |
| Cenários de consentimento (site) | 1º acesso, rejeitar, só analíticos, só marketing, aceitar todos, alterar, revogar, recarregar: aprovados |
| Isolamento por categoria **no contêiner** | **validado no Preview** (ver seção própria) |
| `page_view` no App Router | 1 por rota, sem duplicar (carga, link, voltar, avançar) |
| Modo legado (flag desligada) | sem banner, sem flags, 1 `whatsapp_click` por clique |
| LCP/CLS mobile (LP, flag ligada) | LCP 368 ms (elemento: parágrafo do hero, **não** o banner), CLS 0 |
| Preview do contêiner novo, modo legado | aprovado (ver seção própria) |
| Preview com a flag ligada (prévia Vercel), 4 cenários | aprovado: isolamento por categoria (tags e cliques) |
| DebugView, Clarity (mascaramento), revogação no Preview | **não validados** |

## Cenários de consentimento (site)

Página: `/lp/lavagem-de-persianas?utm_source=google&utm_medium=cpc&gclid=TESTE123&gtm_debug=x`, contêiner real **v5** (sem gate).

| # | Cenário | Consentimento / flags | Rede (site + v5) | Cookies / armazenamento | Eventos no dataLayer |
|---|---|---|---|---|---|
| 1 | **Primeiro acesso** | `default` tudo negado (`security_storage` concedido), nenhum `update`, sem flags | **Nenhuma** requisição externa; `gtm.js` não injetado, mesmo com `?gtm_debug` | nenhum cookie; nenhum armazenamento | nenhum |
| 2 | **Rejeitar não necessários** | `update` tudo negado; flags `false/false` | nenhuma; GTM não carrega | só `sr_consent_v1`; `sr_ref_v1` (código do WhatsApp) após clique; **sem** `sr_attribution_v1` | **nenhum** (clique no WhatsApp não gera evento) |
| 2b | Recarregar após rejeitar | idem | nenhuma | banner não volta | — |
| 3 | **Só analíticos** | `analytics_storage` concedido; `ad_*` negados; flags `true/false` | v5 (sem gate): GA4 `collect` **e pings do Ads** (`ccm/collect`, `pagead/conversion` com `ad_storage` negado) e Clarity `collect` | `_ga`, `_ga_95DJKRLNGJ`, `_clck`, `_clsk`; **sem** `_gcl_*`; sem `sr_attribution_v1` | `landing_page_view`, `whatsapp_click` |
| 4 | **Só marketing** | `ad_storage`/`ad_user_data` concedidos; `analytics_storage` negado; flags `false/true` | v5 (sem gate): GA4 `collect` ×2, Clarity `collect`, Ads | `_gcl_au`, `_gcl_aw`, `_gcl_ls`, **mas também** `_ga_95DJKRLNGJ` e `_clck` (efeito da v5 sem gate); `sr_attribution_v1` com `gclid` | idem |
| 5 | **Aceitar todos** | todos concedidos, `ad_personalization` negado; flags `true/true` | GA4, Ads, Clarity | `_ga*`, `_gcl_*`, `_clck`, `_clsk`, `_gcl_ls`, `_cltk`; `sr_attribution_v1` (com `lead_ref`) | `landing_page_view`, `section_view`, `whatsapp_click` |
| 6 | **Alterar preferências** (tudo → só analíticos) | `update` marketing negado; flags `true/false` | recarga solicitada | `_gcl_au`, `_gcl_aw` **apagados**; `sr_attribution_v1` apagado; `_ga*` mantidos | — |
| 7 | **Revogar** (tudo → rejeitar) | `update` tudo negado | recarga solicitada | **todos** os cookies apagados; sobraram só `sr_consent_v1` e `sr_ref_v1` (necessários). Bug achado e corrigido: `_gcl_ls` e `_cltk` ficavam | — |

Leitura: o **site** envia o estado certo e na ordem certa (também provado em `lib/gtm-bootstrap.test.ts`), mas a v5 reage mal: com só analíticos saem pings do Ads, com só marketing saem pings do GA4 e do Clarity. É o que o contêiner novo precisa eliminar (README §2, §6). **Critérios de aceite no Preview do contêiner novo:** só analíticos ⇒ zero requisições a `googleadservices`, `doubleclick`, `googlesyndication`, `pagead` e nenhum `_gcl_*`; só marketing ⇒ zero `google-analytics.com/g/collect`, nenhum `_ga*`, nenhuma chamada a `clarity.ms`; rejeitar ⇒ nenhuma requisição a Google/Microsoft além do HTML.

## Eventos e parâmetros (rede/dataLayer)

- `whatsapp_click` de hero, header e botão flutuante: 1 evento por clique com `button_location` correto (`hero`, `header`, `flutuante`); LP: `lp_hero` etc. Nenhum `gclid`, UTM, `lead_ref` ou texto no payload (também coberto por `lib/analytics.test.ts`).
- `service_card_click` + `service_view` ao ir da home para `/servicos/lavagem-sofas`; `service_view` de novo ao avançar no histórico (1 por visita à página).
- `landing_page_view` com `traffic_type=google_ads` (URL com `gclid`) sem expor o identificador.
- Mensagem do WhatsApp da LP ganha “Código do site: XXX-XXXXX” só ao clicar.
- Conversão na v5 (modo legado): hero 1 ping, header 1, **flutuante 2** (texto “WhatsApp” + URL com `924240055`) — o contêiner novo elimina isso (1 por `whatsapp_click`).
- Não testado em navegador: `form_start`, `form_error`, envio do formulário, `faq_interaction`, `phone_click`, `email_click`, `section_view` das demais seções (cobertos só por revisão de código/tipos). Fazer no passo 2 do roteiro abaixo.

## `page_view` no App Router

Com o GA4 atual (medição otimizada) e a v5: carga inicial 1 `page_view`; link interno home → serviço 1; voltar 1; avançar 1; logo → home 1 (hits GA4 enfileirados ~5 s pelo próprio GA4; contagem por requisição interceptada). **Nenhuma duplicidade observada**, então **não** há `page_view` manual. Ressalva: depende do GA4 Admin ter “Alterações de página com base no histórico” ligado (estava, a julgar pelos hits); conferir no DebugView.

## Desempenho (flag ligada, mobile 375×812, `next start` local, sem throttling)

- Primeira versão do banner (texto longo): LCP 658 ms, mas o **elemento de LCP era o parágrafo do banner**. Atrasar o banner piorou (LCP 2 083 ms, mesmo elemento). Solução: texto curto no aviso (detalhes só no painel “Personalizar”).
- Versão final: **LCP 368 ms, elemento = parágrafo do hero, CLS 0,00**; banner `position: fixed` (não desloca layout), altura 301 px do viewport de 812. Captura: [`evidencias/banner-mobile.png`](evidencias/banner-mobile.png) (tirada na primeira versão; o texto agora é mais curto).
- Não rodei Lighthouse de performance (a ferramenta exclui performance) nem INP real; sem throttling de CPU/rede.

## Ressalva honesta sobre os testes

Em **dois cenários iniciais** (aceite “só analíticos” e “só marketing”) o harness de bloqueio ainda não estava ativo no documento (ele só vale para a navegação em que é injetado, não para recarregamentos feitos por JavaScript). Esses testes carregaram o contêiner real a partir de `localhost:3100`, então **alguns hits de teste podem ter chegado de fato ao GA4 `G-95DJKRLNGJ` (`page_location` = localhost), ao Google Ads e ao Clarity `zd51ucsjgx`**. Depois disso todos os cenários foram refeitos com bloqueio e verificação. Sugestões: filtrar tráfego de `localhost` no GA4 e ignorar essas sessões no Clarity.

## Preview do contêiner novo, modo legado (feito em 13/11/2026)

Rascunho no **Default Workspace** do GTM (importação em *Combinar + renomear*, 25 itens novos e 0 excluídos; 6 tags com gatilhos de consentimento), aberto no Tag Assistant contra `https://www.srdecoracoes.com.br/` (site **atual**, sem consentimento). Nada foi publicado.

| Momento | Tags disparadas | Não disparadas |
|---|---|---|
| Carga da página | Vinculador, Tag do Google AW, GA4 - Configuração, Microsoft Clarity | TechSol - Whatsapp, SR - GA4 - Eventos do site |
| `whatsapp_click` (2 eventos registrados; o usuário confirmou que **todos** os botões clicados dispararam as duas tags) | **TechSol - Whatsapp (1× por clique)** e SR - GA4 - Eventos do site | demais |
| `gtm.linkClick` (conferido no 1º clique) | nenhuma | todas |

Conclusão: no modo legado o contêiner novo se comporta como a v5 na carga, a conversão dispara 1× por `whatsapp_click` e os gatilhos antigos (texto “WhatsApp” e URL `924240055`) já não disparam nada. A cobertura por botão foi confirmada pelo usuário, sem captura da lista de cliques por botão. Clarity: a tag perdeu `Custom Id` (era o ID de cliente do GA4) e, por dependência do template, também o `Session Id`.

## Preview do contêiner novo com a flag ligada (prévia da Vercel, 13/11/2026)

Site: prévia da branch na Vercel com `NEXT_PUBLIC_CONSENT_ENABLED=true` (só no ambiente Preview), contêiner: rascunho do Default Workspace, ambos no Tag Assistant. O site não tinha nenhum cookie nem requisição antes da escolha (conferido no navegador). **Resultados do Tag Assistant relatados pelo usuário** (não consegui ler a janela por aqui). Cada linha de clique = 1 clique em botão de WhatsApp.

| Cenário | Tags disparadas na carga | `whatsapp_click`: TechSol - Whatsapp (conversão) | `whatsapp_click`: SR - GA4 - Eventos do site |
|---|---|---|---|
| 1. Rejeitar | nenhuma (o GTM nem carrega) | — | — |
| 2. Só analíticos | GA4 - Configuração, Clarity | **não disparou** ✔ | disparou ✔ |
| 3. Só marketing | Tag do Google AW, Vinculador | disparou ✔ | **não disparou** ✔ |
| 4. Os dois | AW, GA4 - Configuração, Clarity, Vinculador | disparou (1×) ✔ | disparou ✔ |

Conclusão: com o gate por gatilho, **o isolamento por categoria está provado** nos quatro cenários: só analíticos não aciona Ads nem a conversão; só marketing não aciona GA4 nem Clarity. Para comparação, a v5 publicada, sem gate, mandou pings do Ads com só analíticos e pings do GA4/Clarity com só marketing.

Erro de leitura registrado: a TechSol “não disparou” relatada no início referia-se à carga da página, em que ela nunca aparece; só aparece no clique.

Custo do teste: cerca de 2 conversões reais no Google Ads e alguns eventos reais no GA4 e no Clarity.

Ainda **não** validados: revogação no Preview, `form_start`/`form_error`/`faq_interaction`/`phone_click` no Tag Assistant, DebugView do GA4, mascaramento e leitura do consentimento pelo Clarity, e a rede por domínio (só o resultado das tags, não as requisições).

## Roteiro de validação no GTM (restante, pendente)

Já feito: o item 1 abaixo (modo legado). Falta o modo novo (item 2 em diante).



Pré-requisito: espaço de trabalho com o JSON importado e as tags editadas (README §6, passo 2).

1. **Modo legado, produção** — site com flag desligada, `https://www.srdecoracoes.com.br/?gtm_debug=x`: na aba *Tags*, ao clicar em cada botão de WhatsApp (header, hero, flutuante, LP, envio do formulário), “Contato WhatsApp (1)” aparece **uma** vez; GA4 - Eventos do site dispara com os parâmetros; Clarity dispara.
2. **Modo novo, prévia da Vercel com a flag ligada** + `?gtm_debug=x`:
   - Primeiro acesso: Tag Assistant não mostra o contêiner (GTM nem carrega); aba *Consent* (ou DevTools → `google_tag_data.ics.entries`) com tudo negado.
   - Só analíticos: *Tags Fired* = Google tag G-, GA4 - Eventos, Clarity; *Tags Not Fired* = Google tag AW, Vinculador, conversão. Rede sem `googleadservices/doubleclick/googlesyndication`.
   - Só marketing: o inverso; rede sem `google-analytics.com/g/collect` nem `clarity.ms`.
   - Aceitar todos: todas disparam; conversão 1× por clique; `landing_page_view` e `whatsapp_click` com todos os parâmetros.
   - Rejeitar / revogar: nenhuma tag, nenhum cookie `_ga*`/`_gcl_*`/`_clck`.
3. **GA4 DebugView** (`?gtm_debug` ativa o modo de depuração): eventos e parâmetros, 1 `page_view` por rota.
4. **Clarity:** projeto com “exigir consentimento” ligado; sem Analíticos o Clarity não grava cookies; gravar uma sessão e conferir campos mascarados (bairro/cidade do formulário); eventos `whatsapp_click`, `service_view`, `landing_page_view`, `form_start`, `form_error`, `cta_click`; confirmar se o template oficial lê o Consent Mode sem chamada duplicada.
