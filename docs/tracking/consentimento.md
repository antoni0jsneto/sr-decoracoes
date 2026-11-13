# Consentimento (LGPD) e Consent Mode v2

## Decisão: CMP própria

Não usamos CMP especializada (Cookiebot, CookieYes etc.): duas categorias opcionais reais, site pequeno, sem público do EEE/Reino Unido (a certificação de CMP do Google é exigida para eles), sem script extra de terceiro, sem custo e sem risco de CLS. Reavaliar se surgirem novas categorias, públicos da UE ou necessidade de prova de consentimento no servidor.

## Categorias

| Categoria | Padrão | O que cobre | Sinais do Consent Mode |
|---|---|---|---|
| Necessários | sempre ativa, não desativável | `sr_consent_v1` (a escolha), `sr_ref_v1` (código de atendimento) | `security_storage` concedido |
| Analíticos | **desmarcada** | GA4 e Microsoft Clarity | `analytics_storage` |
| Marketing | **desmarcada** | Google Ads (medição de conversão) e `sr_attribution_v1` | `ad_storage` e `ad_user_data` |
| (sem categoria) | — | `ad_personalization`, `functionality_storage`, `personalization_storage` | sempre `denied`: não há remarketing nem funcionalidade que use cookie |

Sem categorias fictícias. Aceitar e Rejeitar têm o mesmo peso visual; rejeitar não bloqueia nada; o painel reabre pelo rodapé; a escolha vale 12 meses e é pedida de novo se a versão mudar (`CONSENT_VERSION`).

## Consent Mode: básico × avançado

- **Básico (adotado):** nenhuma tag do Google ou do Clarity é carregada nem dispara antes da escolha; o GTM só é injetado depois de uma categoria concedida. Sem consentimento não há ping algum.
- **Avançado (não adotado):** as tags carregam e enviam pings sem cookies mesmo com tudo negado, para modelagem de conversões. Aumenta os números do Ads/GA4, mas é tratamento sem consentimento: exige análise jurídica e técnica. Não habilitar apenas para melhorar números. `url_passthrough` também fica desligado.

## Ordem de execução (testada em `lib/gtm-bootstrap.test.ts` e no navegador)

1. Script inline no `<head>`: `consent default` (tudo negado, `wait_for_update: 500`) e `ads_data_redaction`.
2. Com escolha salva: `consent update`, depois as flags `sr_consent_schema/analytics/marketing` no dataLayer, **antes** de qualquer evento e do `gtm.js`.
3. `gtm.js` só se houver categoria concedida; com escolha salva, no `load` ou na 1ª interação.
4. Primeira escolha no banner: update + flags + GTM imediatamente; eventos logo depois (a fila do dataLayer é reprocessada pelo contêiner).
5. Mudança com rastreamento ativo (adicionar ou revogar): limpa cookies/armazenamento da categoria revogada e **recarrega** — o estado das tags é fixo por página.

## Isolamento por categoria (no contêiner)

As verificações integradas das tags Google **não** são tratadas como garantia (medido: a v5 sem gate enviou pings do Ads com só Analíticos). O isolamento é por gatilho:

| Tag | Dispara só se |
|---|---|
| Google tag `G-95DJKRLNGJ`, GA4 - Eventos do site, Clarity | `sr - analytics allowed` |
| Google tag `AW-17864340115`, Vinculador, conversão WhatsApp | `sr - marketing allowed` |

`sr - …allowed` é verdadeira quando a flag da categoria é `true` **ou** quando `sr_consent_schema` não existe (site em modo legado: a compatibilidade da publicação coordenada). As verificações de consentimento integradas permanecem ligadas como segunda camada; no Clarity, exigir `analytics_storage` na própria tag.

## Clarity e Consent API V2

- O site cria a fila `window.clarity` (mesmo padrão do snippet oficial) quando há Analíticos e chama `clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' | 'denied' })`. Chaves com `_S` maiúsculo e valores em minúsculas (confirmado na documentação da Microsoft); `ad_Storage` é sempre `denied`: não usamos Microsoft Ads.
- Revogação de Analíticos: `consentv2` negado + `clarity('consent', false)` (apaga `_clck/_clsk`), remoção de `_cltk` e recarga.
- Instalação: **template oficial no GTM** (já publicado na v5). A confirmar com o projeto real: se o template já lê o Consent Mode (evitar chamada duplicada) e se o projeto exige consentimento.
- Mascaramento: usar “Strict/Balanced”, não desativar. O bairro/cidade do formulário da LP não vai ao dataLayer.
- Nunca enviar `gclid` ao Clarity (não há `clarity('set', …)` no código).

## Inventário de cookies e armazenamento

Fonte: `lib/cookie-inventory.ts` (renderizado em `/politica-de-cookies`). “Observado” = visto no navegador de teste; prazos de terceiros são os do provedor e **precisam ser conferidos em produção**.

| Nome | Tipo | Categoria | Origem | Situação |
|---|---|---|---|---|
| `sr_consent_v1` | localStorage | Necessário | SR | observado |
| `sr_ref_v1` | sessionStorage | Necessário | SR | observado |
| `_ga`, `_ga_<ID>` | cookie | Analítico | GA4 | nome observado |
| `_clck`, `_clsk`, `_cltk` | cookie / sessionStorage | Analítico | Clarity | observado (prazo a validar) |
| `_gcl_au`, `_gcl_aw`, `_gcl_ls` | cookie / localStorage | Marketing | Google Ads | observado (prazo a validar) |
| `_gcl_gb`, `_gac_<ID>` | cookie | Marketing | Google Ads | só documentação do provedor |
| `sr_attribution_v1` | localStorage | Marketing | SR | observado |

Cookies de outros domínios (DoubleClick etc.) não são visíveis ao site: validar no Tag Assistant/DevTools em produção.

## Testes de revogação (resultado)

Cookies `_ga*`, `_gcl_*`, `_clck`, `_clsk` apagados; `sr_attribution_v1` apagado ao revogar Marketing; reload solicitado; `consent update` negado enviado. Ver [validacao.md](validacao.md). Correção feita a partir do teste: `_gcl_ls` e `_cltk` não eram apagados e passaram a ser (`STORAGE_KEYS`).

## O que isto não garante

Texto e decisões de base legal são **material para revisão jurídica**; não há declaração de conformidade. Dados do controlador/encarregado dependem da SR.
