# Rastreamento, consentimento e LGPD — SR Persianas & Decorações

Atualizado em 13/11/2026. Branch `feat/rastreamento-consentimento-lgpd`. **Nada foi publicado**: nem o site, nem o contêiner GTM, nem alterações no Google Ads/GA4.

Documentos: [eventos.md](eventos.md) (eventos, parâmetros, conversões, atribuição) · [consentimento.md](consentimento.md) (banner, Consent Mode, inventário) · [validacao.md](validacao.md) (testes e evidências) · [gtm-import-sr.json](gtm-import-sr.json) (itens novos do GTM).

IDs da SR (públicos no HTML do site): GTM `GTM-5KMVZ4R8` · GA4 `G-95DJKRLNGJ` · Google Ads `AW-17864340115` · Clarity `zd51ucsjgx` (já presente no contêiner publicado).

## 1. Antes × depois

| Tema | Antes (produção em 13/11/2026) | Depois (esta branch) |
|---|---|---|
| Consentimento | Nenhum. GTM carrega para todos. | Banner (Aceitar todos / Rejeitar não necessários / Personalizar), painel, “Preferências de cookies” no rodapé, revogação. Atrás de `NEXT_PUBLIC_CONSENT_ENABLED`. |
| Consent Mode v2 | Ausente. | `default` negado → `update` → só então `gtm.js`; flags `sr_consent_*` no dataLayer para o contêiner isolar cada categoria. |
| Clarity | Tag já publicada no GTM v5, dispara em todas as páginas **sem consentimento**, com `userId = ID de cliente do GA4`. | Passa a disparar só com “Analíticos”; Consent API V2 chamada pelo site (`consentv2`). Ver §4. |
| Conversão WhatsApp (Ads) | Dispara por clique em texto “WhatsApp” **e** por URL com `924240055`: o botão flutuante conta **2×** (medido). | Dispara só por `whatsapp_click` (1 por interação), mesma ação de conversão. |
| GA4 | Só `page_view` e medição otimizada; nenhum evento do site. | Tag de eventos com 13 parâmetros padronizados, 11 eventos. |
| Eventos | `page_type`, `cta_id`, `lp_slug`, `gclid`/UTM como parâmetros… | Taxonomia única (`lib/tracking-taxonomy.ts`), sem `gclid`/UTM/`lead_ref` em parâmetros. |
| Atribuição | UTM/`gclid` no sessionStorage e enviados em todo evento. | Registro próprio `sr_attribution_v1` (só com Marketing), pronto para CRM; nada vai ao GA4/Clarity. |
| Cookies | Sem política. | `/politica-de-cookies` com inventário observado; política de privacidade revisada com pendências explícitas. |
| Qualidade | Sem testes, `lint` quebrado. | 37 testes (`pnpm test`), `pnpm typecheck`, `pnpm lint` (ESLint 9 + config Next). |

## 2. Achados da auditoria

1. **O contêiner publicado mudou durante este trabalho**: v4 (manhã) → **v5** (tarde), que adicionou o template do Microsoft Clarity. Confirme quem publicou e que o projeto Clarity `zd51ucsjgx` é da SR.
2. **Sem gate de consentimento, as verificações integradas das tags Google não bloqueiam requisições.** Medido na v5 com “só Analíticos”: saíram pings do Google Ads (`ccm/collect`) e até o ping de conversão do WhatsApp com `ad_storage` negado; com “só Marketing”: GA4 `collect` e Clarity `collect`. Por isso o isolamento é feito por gatilho (variáveis `sr - analytics allowed` / `sr - marketing allowed`), não pelo consentimento embutido.
3. **Conversão em dobro:** `gtm.click` (texto contém “WhatsApp”) + `gtm.linkClick` (URL contém `924240055`) disparam a mesma tag.
4. **Duplicidade GA4/Ads:** só há tags via GTM (sem `gtag.js` direto no site). `@vercel/analytics` e `@next/third-parties` estão instalados mas não usados.
5. **Google Ads (leitura via API):** marcação automática ligada; campanha ativa com sufixo UTM; ações “Contato WhatsApp (1)” (Site, principal, 1 por clique), “Calls from ads” (principal) e “Clicks to call”; Enhanced Conversions não aplicável (o site não coleta e-mail/telefone). **Nenhuma conversão foi alterada.**
6. A página `/servicos/lavagem-persianas-cortinas` existe além de `/servicos/persianas/lavagem` (mesma taxonomia aplicada às duas).

## 3. Arquitetura

- `lib/consent.ts` — escolha (localStorage `sr_consent_v1`, 12 meses, versão), sinais do Consent Mode, limpeza de cookies/armazenamento na revogação.
- `lib/gtm-bootstrap.ts` — script inline do `<head>` (testado em `vm`): default negado, update, flags, injeção do GTM **só com consentimento** e só no domínio oficial/`?gtm_debug`. O clique logo após o aceite não se perde: os eventos entram no `dataLayer` e o GTM os reprocessa ao carregar; com escolha salva o GTM carrega no `load` **ou na primeira interação**.
- `components/consent/*` — banner, painel e botão do rodapé.
- `lib/analytics.ts` — `pushEvent` tipado (1 função, lista fechada de eventos e parâmetros), `navigateAfterEvents` (fallback do formulário).
- `components/analytics/click-tracker.tsx` — único ouvinte global; `track-view.tsx` — `service_view` / `landing_page_view`.
- `lib/attribution.ts` — registro próprio de atribuição e `lead_ref`.
- `lib/cookie-inventory.ts` — fonte única do inventário (política e docs).

## 4. Pontos que exigem decisão sua

- **Clarity já está no ar sem consentimento** (v5). Até publicar o contêiner novo, a tag deveria ser pausada ou ter o gatilho trocado. O contêiner novo exige isso (§6, passo 3). Recomendo também **apagar `userId = {{Analytics Client ID}}`** na tag: liga a gravação ao ID do GA4 sem necessidade.
- Clarity é só “implementado”: **não validei** mascaramento, eventos nem a leitura do consentimento pelo template (depende do projeto e do painel dele). Ver [validacao.md](validacao.md).
- Páginas legais têm **pendências** (razão social, CNPJ, endereço, encarregado, bases legais, retenção) e dependem de revisão jurídica.

## 5. Flag e matriz de compatibilidade

`NEXT_PUBLIC_CONSENT_ENABLED` (padrão desligado; lida no build). Desligada, o site se comporta como o de produção (sem banner, GTM como hoje); só mudam nomes de eventos e parâmetros.

| Site \ Contêiner | v5 (atual) | Novo (`gtm-import-sr.json` + edições) |
|---|---|---|
| Produção atual | situação de hoje (2× conversão no flutuante, Clarity sem consentimento) | válido (modo legado: variáveis `allowed` = verdadeiro) |
| Nova versão, flag **desligada** | válido, igual ao de hoje | válido |
| Nova versão, flag **ligada** | **PROIBIDO** (tags sem gatilho de consentimento enviam pings) | **alvo** |

## 6. Sequência de publicação (cada passo exige sua autorização)

1. **Site com flag desligada** (merge + deploy). Validar em produção: nada visível muda, 1 `whatsapp_click` por clique. Risco: nenhum além dos novos nomes de parâmetro (o GA4 nunca recebeu os antigos).
2. **GTM em novo espaço de trabalho** (sem publicar):
   a. Importar `gtm-import-sr.json` (*Admin → Importar contêiner → Mesclar → renomear conflitantes*): cria 18 variáveis, 6 gatilhos e a tag “SR - GA4 - Eventos do site”.
   b. Editar as tags **existentes** (nomes aparecem no seu espaço):

   | Tag existente | Trocar o(s) acionador(es) por |
   |---|---|
   | Tag do Google `G-95DJKRLNGJ` (Initialization) | `SR - Init - analytics allowed` |
   | Tag do Google `AW-17864340115` (Initialization) | `SR - Init - marketing allowed` |
   | Vinculador de conversões (All Pages) | `SR - All Pages - marketing allowed` |
   | Microsoft Clarity (All Pages) | `SR - All Pages - analytics allowed`; em *Configurações avançadas → Consentimento* exigir `analytics_storage`; remover `userId` |
   | Conversão “Contato WhatsApp (1)” | **remover** “clique com texto WhatsApp” e “clique em link 924240055”; adicionar só `SR - CE whatsapp_click - marketing allowed` |
   c. Preview (Tag Assistant) em `https://www.srdecoracoes.com.br/?gtm_debug=x` (modo legado) **e** numa prévia da Vercel com a flag ligada (§[validacao.md](validacao.md#roteiro-de-validação-no-gtm-pendente)).
3. **Publicar o contêiner novo** — com o site em flag desligada. Validar 1 disparo da conversão por clique (hero, header, flutuante, LP, formulário) e que a tag do Clarity ainda dispara (modo legado).
4. **Ligar a flag** (variável na Vercel + redeploy). Validar os 4 cenários (rejeitar, só analíticos, só marketing, aceitar todos) em produção com Tag Assistant e rede.
5. GA4: criar as 9 dimensões, marcar `whatsapp_click` como evento-chave, ajustar a medição otimizada (ver [eventos.md](eventos.md)).

**Reversão (a ordem importa):** passo 4 → desligar a flag e redeploy (ou *Instant Rollback* da Vercel). Passo 3 → restaurar a versão anterior do GTM **somente com a flag desligada**. Nunca deixar a flag ligada com o GTM v5/anterior.

## 7. Pendências externas

- Plataformas: publicar GTM; ajustes do GA4 Admin; confirmar vínculo GA4↔Ads; Clarity (mascaramento, “exigir consentimento”, filtros).
- Dados da SR: razão social, CNPJ, endereço, encarregado, prazos de retenção; revisão jurídica das duas políticas.
- Validação em produção dos cookies/prazos de terceiros (Google, Microsoft).
- Integração comercial (CRM/planilha) para `lead_ref`: contrato descrito em [eventos.md](eventos.md); nenhum endpoint foi criado.

## 8. Checklist de publicação

- [ ] `pnpm test`, `pnpm typecheck`, `pnpm lint` (arquivos novos), `pnpm build` (com e sem a flag).
- [ ] Passos 1–5 do §6, com autorização a cada etapa.
- [ ] Política de cookies e de privacidade revisadas e sem `[PENDENTE]`.
- [ ] Rodapé mostra “Política de cookies” e “Preferências de cookies” (só com a flag ligada).

## 9. Como acompanhar os resultados

No GA4: *Relatórios → Aquisição* (canal, campanha), *Engajamento → Páginas e telas* (landing pages), *Eventos* (`whatsapp_click` por `button_location`/`service_name`), *Tecnologia* (dispositivo), *Exploração → Funil* (landing_page_view → section_view `orcamento` → whatsapp_click). Os números serão **menores** que os de hoje: quem recusa não é medido (efeito esperado do consentimento prévio). Compare períodos só depois de estabilizar a taxa de aceite.
