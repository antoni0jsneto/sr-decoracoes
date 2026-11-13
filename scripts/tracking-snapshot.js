() => {
  const plain = (i) =>
    Object.prototype.toString.call(i) === "[object Arguments]" ? Array.from(i) : i;
  const dl = (window.dataLayer || []).map(plain);
  const events = dl.filter((i) => !Array.isArray(i) && i.event).map((i) => {
    const o = { event: i.event };
    for (const [k, v] of Object.entries(i)) if (k !== "event" && v !== undefined && !k.startsWith("gtm.")) o[k] = v;
    return o;
  });
  const consentCalls = dl
    .filter((i) => Array.isArray(i) && i[0] === "consent")
    .map((i) => `${i[1]}:${JSON.stringify(i[2])}`);
  const flags = dl.find((i) => !Array.isArray(i) && "sr_consent_schema" in i);
  const ics = (window.google_tag_data && window.google_tag_data.ics && window.google_tag_data.ics.entries) || {};
  const icsState = {};
  for (const [k, v] of Object.entries(ics)) icsState[k] = v.update ?? v.default;
  const hosts = {};
  for (const e of performance.getEntriesByType("resource")) {
    const u = new URL(e.name);
    if (u.host === location.host) continue;
    const key = u.host + u.pathname.split("/").slice(0, 2).join("/");
    hosts[key] = (hosts[key] || 0) + 1;
  }
  let ls = {};
  for (const k of Object.keys(localStorage)) ls[k] = localStorage.getItem(k).slice(0, 300);
  return {
    url: location.pathname + location.search,
    bannerOpen: !!document.querySelector('[role="dialog"]'),
    gtmScript: !!document.querySelector('script[src*="gtm.js"]'),
    consentCalls,
    flags: flags ? { a: flags.sr_consent_analytics, m: flags.sr_consent_marketing } : null,
    icsState,
    externalRequests: hosts,
    blockedTelemetry: Object.entries(
      (window.__netlog ? window.__netlog() : []).reduce((acc, r) => {
        try {
          const u = new URL(r.url);
          const en = u.searchParams.get("en");
          const k = `${u.host}${u.pathname}${en ? " en=" + en : ""}`;
          acc[k] = (acc[k] || 0) + 1;
        } catch (e) {
          acc[r.url.slice(0, 80)] = 1;
        }
        return acc;
      }, {}),
    ).map(([k, v]) => `${v}x ${k}`),
    cookies: document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter(Boolean),
    localStorage: ls,
    sessionStorage: Object.keys(sessionStorage),
    clarity: window.clarity ? { q: (window.clarity.q || []).map((a) => JSON.stringify(Array.from(a))) } : null,
    events,
  };
}
