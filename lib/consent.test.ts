import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CONSENT_MAX_AGE_MS,
  CONSENT_VERSION,
  COOKIE_PATTERNS,
  consentChanged,
  consentSignals,
  cookieDomains,
  cookieNames,
  createChoice,
  hasAnyConsent,
  parseConsent,
  revokedCategories,
} from "./consent.ts";

const NOW = 1_800_000_000_000;

describe("parseConsent", () => {
  it("aceita uma escolha válida", () => {
    const raw = JSON.stringify(createChoice(true, false, NOW));
    assert.deepEqual(parseConsent(raw, NOW + 1000), createChoice(true, false, NOW));
  });

  it("ignora ausência, lixo e tipos errados (sem escolha = banner)", () => {
    assert.equal(parseConsent(null, NOW), null);
    assert.equal(parseConsent("", NOW), null);
    assert.equal(parseConsent("{quebrado", NOW), null);
    assert.equal(parseConsent("null", NOW), null);
    assert.equal(
      parseConsent(JSON.stringify({ analytics: "sim", marketing: false, version: CONSENT_VERSION, timestamp: NOW }), NOW),
      null,
    );
    assert.equal(
      parseConsent(JSON.stringify({ analytics: true, version: CONSENT_VERSION, timestamp: NOW }), NOW),
      null,
    );
  });

  it("descarta versão diferente e escolha vencida", () => {
    const old = JSON.stringify({ ...createChoice(true, true, NOW), version: CONSENT_VERSION + 1 });
    assert.equal(parseConsent(old, NOW), null);
    const raw = JSON.stringify(createChoice(true, true, NOW));
    assert.notEqual(parseConsent(raw, NOW + CONSENT_MAX_AGE_MS), null);
    assert.equal(parseConsent(raw, NOW + CONSENT_MAX_AGE_MS + 1), null);
  });
});

describe("consentSignals", () => {
  it("sem escolha: tudo negado, exceto security_storage", () => {
    const s = consentSignals(null);
    assert.equal(s.analytics_storage, "denied");
    assert.equal(s.ad_storage, "denied");
    assert.equal(s.ad_user_data, "denied");
    assert.equal(s.ad_personalization, "denied");
    assert.equal(s.functionality_storage, "denied");
    assert.equal(s.personalization_storage, "denied");
    assert.equal(s.security_storage, "granted");
  });

  it("só analíticos não concede nada de publicidade", () => {
    const s = consentSignals(createChoice(true, false, NOW));
    assert.equal(s.analytics_storage, "granted");
    assert.equal(s.ad_storage, "denied");
    assert.equal(s.ad_user_data, "denied");
  });

  it("só marketing não concede analytics_storage", () => {
    const s = consentSignals(createChoice(false, true, NOW));
    assert.equal(s.analytics_storage, "denied");
    assert.equal(s.ad_storage, "granted");
    assert.equal(s.ad_user_data, "granted");
  });

  it("aceitar tudo nunca concede ad_personalization (sem remarketing)", () => {
    const s = consentSignals(createChoice(true, true, NOW));
    assert.equal(s.analytics_storage, "granted");
    assert.equal(s.ad_storage, "granted");
    assert.equal(s.ad_personalization, "denied");
  });
});

describe("mudanças de escolha", () => {
  it("hasAnyConsent", () => {
    assert.equal(hasAnyConsent(null), false);
    assert.equal(hasAnyConsent(createChoice(false, false, NOW)), false);
    assert.equal(hasAnyConsent(createChoice(false, true, NOW)), true);
  });

  it("revokedCategories e consentChanged", () => {
    const all = createChoice(true, true, NOW);
    assert.deepEqual(revokedCategories(all, createChoice(true, false, NOW)), ["marketing"]);
    assert.deepEqual(revokedCategories(all, createChoice(false, false, NOW)), ["analytics", "marketing"]);
    assert.deepEqual(revokedCategories(createChoice(false, false, NOW), all), []);
    assert.deepEqual(revokedCategories(null, all), []);
    assert.equal(consentChanged(all, all), false);
    assert.equal(consentChanged(null, createChoice(false, false, NOW)), true);
    assert.equal(consentChanged(all, createChoice(true, false, NOW)), true);
  });
});

describe("cookies", () => {
  it("cada categoria cobre só os próprios cookies", () => {
    for (const name of ["_ga", "_ga_95DJKRLNGJ", "_gid", "_gat_gtag_x", "_clck", "_clsk"]) {
      assert.ok(COOKIE_PATTERNS.analytics.test(name), name);
      assert.ok(!COOKIE_PATTERNS.marketing.test(name), name);
    }
    for (const name of ["_gcl_au", "_gcl_aw", "_gcl_gb", "_gac_UA-1"]) {
      assert.ok(COOKIE_PATTERNS.marketing.test(name), name);
      assert.ok(!COOKIE_PATTERNS.analytics.test(name), name);
    }
    assert.ok(!COOKIE_PATTERNS.analytics.test("sessao"));
    assert.ok(!COOKIE_PATTERNS.marketing.test("sessao"));
  });

  it("domínios de limpeza e nomes", () => {
    assert.deepEqual(cookieDomains("www.srdecoracoes.com.br"), [
      undefined,
      "www.srdecoracoes.com.br",
      ".www.srdecoracoes.com.br",
      ".srdecoracoes.com.br",
      ".com.br",
    ]);
    assert.deepEqual(cookieDomains("localhost"), [undefined, "localhost", ".localhost"]);
    assert.deepEqual(cookieNames("a=1; _ga=GA1.1; b=2"), ["a", "_ga", "b"]);
    assert.deepEqual(cookieNames(""), []);
  });
});
