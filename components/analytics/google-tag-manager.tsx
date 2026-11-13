import Script from "next/script";
import {
  CONSENT_ENABLED,
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
} from "@/lib/consent";
import { gtmBootstrapScript } from "@/lib/gtm-bootstrap";
import { GTM_ID, SITE_URL } from "@/lib/site";

const OFFICIAL_HOST = new URL(SITE_URL).hostname;

/**
 * Consentimento LIGADO: script inline no <head> (default negado → update →
 * flags → GTM só depois de consentimento). Ver lib/gtm-bootstrap.ts.
 */
export function GoogleTagManagerHead() {
  if (!CONSENT_ENABLED) return null;
  return (
    <script
      id="sr-consent-gtm"
      dangerouslySetInnerHTML={{
        __html: gtmBootstrapScript({
          gtmId: GTM_ID,
          officialHost: OFFICIAL_HOST,
          storageKey: CONSENT_STORAGE_KEY,
          version: CONSENT_VERSION,
          maxAgeMs: CONSENT_MAX_AGE_MS,
        }),
      }}
    />
  );
}

/**
 * Consentimento DESLIGADO (comportamento legado, idêntico ao site publicado):
 * GTM após o `load`, só no domínio oficial ou com ?gtm_debug.
 */
export function GoogleTagManagerNoscript() {
  if (CONSENT_ENABLED) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

export function GoogleTagManagerLegacy() {
  if (CONSENT_ENABLED) return null;
  return (
    <>
      <Script
        id="gtm-base"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){if(w.location.hostname!=='${OFFICIAL_HOST}'&&!/[?&]gtm_debug=/.test(w.location.search))return;w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </>
  );
}
