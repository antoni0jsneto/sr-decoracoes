/**
 * Script de teste (não vai ao site): injetado ANTES dos scripts da página
 * (initScript do DevTools) para registrar e BLOQUEAR as requisições de
 * medição (GA4, Google Ads/DoubleClick, Clarity), de modo que testes locais
 * contra o contêiner real do GTM não enviem dados a nenhuma propriedade.
 * O log sobrevive a recarregamentos em window.name.
 * Uso: docs/tracking/validacao.md.
 */
(() => {
  const BLOCK =
    /(google-analytics\.com|analytics\.google\.com|doubleclick\.net|googleadservices\.com|google\.com(\.br)?\/(pagead|ccm|rmkt|measurement)|clarity\.ms|c\.bing\.com)/;
  let log = [];
  try {
    log = JSON.parse(window.name || "{}").net || [];
  } catch (e) {
    log = [];
  }
  const save = () => {
    try {
      window.name = JSON.stringify({ net: log });
    } catch (e) {}
  };
  const rec = (kind, url) => {
    log.push({ kind, url: String(url).slice(0, 160), t: Math.round(performance.now()) });
    save();
  };
  window.__netlog = () => log;

  const origFetch = window.fetch;
  window.fetch = function (input, init) {
    const url = typeof input === "string" ? input : input && input.url;
    if (BLOCK.test(url)) {
      rec("fetch", url);
      return Promise.resolve(new Response("", { status: 204 }));
    }
    return origFetch.apply(this, arguments);
  };

  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.__url = url;
    return origOpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function () {
    if (BLOCK.test(this.__url)) {
      rec("xhr", this.__url);
      return;
    }
    return origSend.apply(this, arguments);
  };

  const origBeacon = navigator.sendBeacon && navigator.sendBeacon.bind(navigator);
  navigator.sendBeacon = function (url, data) {
    if (BLOCK.test(url)) {
      rec("beacon", url);
      return true;
    }
    return origBeacon ? origBeacon(url, data) : false;
  };

  const desc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
  if (desc && desc.set) {
    Object.defineProperty(HTMLImageElement.prototype, "src", {
      get: desc.get,
      set(value) {
        if (BLOCK.test(value)) {
          rec("img", value);
          return;
        }
        desc.set.call(this, value);
      },
    });
  }
})();
