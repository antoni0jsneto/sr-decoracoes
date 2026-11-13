/**
 * Script inline do <head> que prepara o dataLayer, o Consent Mode v2 e o
 * carregamento do GTM. Gerado como texto para poder ser testado em `vm`.
 *
 * Ordem garantida (Consent Mode básico):
 *   1. `consent default` com tudo negado (+ ads_data_redaction);
 *   2. com escolha salva: `consent update` e as flags `sr_consent_*` entram no
 *      dataLayer **antes** de qualquer evento e do `gtm.js`;
 *   3. o `gtm.js` só é injetado se ao menos uma categoria foi concedida e só
 *      no domínio oficial (ou com ?gtm_debug, para o Tag Assistant).
 *
 * O contêiner dispara cada tag só quando a flag da sua categoria é verdadeira
 * (variáveis `sr - analytics allowed` / `sr - marketing allowed`). O estado é
 * fixo por carregamento de página: mudar a escolha com o GTM ativo recarrega.
 */

export interface GtmBootstrapOptions {
  gtmId: string;
  officialHost: string;
  storageKey: string;
  version: number;
  maxAgeMs: number;
}

export function gtmBootstrapScript(options: GtmBootstrapOptions): string {
  const config = JSON.stringify(options);
  return `(function(w,d){
var C=${config};
w.dataLayer=w.dataLayer||[];
function g(){w.dataLayer.push(arguments)}
w.__srGtag=g;
g('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});
g('set','ads_data_redaction',true);
var host=w.location.hostname===C.officialHost||/[?&]gtm_debug=/.test(w.location.search);
function read(){try{var c=JSON.parse(w.localStorage.getItem(C.storageKey)||'null');if(!c||c.version!==C.version||typeof c.analytics!=='boolean'||typeof c.marketing!=='boolean'||typeof c.timestamp!=='number'||Date.now()-c.timestamp>C.maxAgeMs)return null;return c}catch(e){return null}}
function st(v){return v?'granted':'denied'}
w.__srSetConsent=function(c){
g('consent','update',{analytics_storage:st(c.analytics),ad_storage:st(c.marketing),ad_user_data:st(c.marketing),ad_personalization:'denied'});
w.dataLayer.push({sr_consent_schema:'v1',sr_consent_analytics:c.analytics,sr_consent_marketing:c.marketing});
if(c.analytics&&!w.clarity){w.clarity=function(){(w.clarity.q=w.clarity.q||[]).push(arguments)}}
if(w.clarity){w.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:st(c.analytics)})}
};
var loaded=false;
w.__srLoadGtm=function(c){
if(loaded||!host||!c||(!c.analytics&&!c.marketing))return false;
loaded=true;
w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+C.gtmId;
(d.head||d.documentElement).appendChild(s);
return true};
var saved=read();
if(saved){
w.__srSetConsent(saved);
if(saved.analytics||saved.marketing){
var go=function(){w.__srLoadGtm(saved)};
if(d.readyState==='complete'){go()}else{
w.addEventListener('load',go);
['pointerdown','keydown','scroll','touchstart'].forEach(function(t){w.addEventListener(t,go,{once:true,passive:true})})}
}}
})(window,document);`;
}
