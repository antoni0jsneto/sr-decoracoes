import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ANALYTICS_EVENTS, EVENT_PARAMS, buildPayload, pushEvent } from "./analytics.ts";
import { ATTRIBUTION_KEYS, extractAttribution, parseAttribution } from "./attribution.ts";
import { trackingContextFromPath, trafficTypeFromSearch } from "./tracking-taxonomy.ts";

describe("buildPayload", () => {
  it("zera todos os parâmetros que o evento não usa", () => {
    const payload = buildPayload("whatsapp_click", "/", { button_id: "hero" });
    for (const key of EVENT_PARAMS) assert.ok(key in payload, key);
    assert.equal(payload.event, "whatsapp_click");
    assert.equal(payload.button_id, "hero");
    assert.equal(payload.faq_question, undefined);
  });

  it("completa serviço e tipo de página pela rota, sem o chamador informar", () => {
    const payload = buildPayload("phone_click", "/servicos/lavagem-sofas");
    assert.equal(payload.landing_page_type, "servico");
    assert.equal(payload.service_name, "lavagem-sofas");
    assert.equal(payload.service_category, "sofas");
  });

  it("nunca leva identificadores publicitários, UTM nem lead_ref", () => {
    const hostile = {
      button_id: "x",
      gclid: "abc",
      gbraid: "abc",
      wbraid: "abc",
      utm_source: "google",
      lead_ref: "LAV-12345",
    } as unknown as Parameters<typeof buildPayload>[2];
    const payload = buildPayload("whatsapp_click", "/lp/lavagem-de-persianas", hostile);
    for (const key of ["gclid", "gbraid", "wbraid", "utm_source", "lead_ref"]) {
      assert.equal(key in payload, false, key);
    }
    assert.equal(EVENT_PARAMS.some((k) => /gclid|gbraid|wbraid|utm_|lead_ref/.test(k)), false);
  });

  it("não existe evento generate_lead nem page_view manual", () => {
    assert.equal((ANALYTICS_EVENTS as readonly string[]).includes("generate_lead"), false);
    assert.equal((ANALYTICS_EVENTS as readonly string[]).includes("page_view"), false);
  });
});

describe("pushEvent fora do navegador", () => {
  it("não faz nada e devolve false", () => {
    assert.equal(pushEvent("whatsapp_click"), false);
  });
});

describe("taxonomia", () => {
  it("mapeia as rotas do site", () => {
    assert.deepEqual(trackingContextFromPath("/"), {
      landing_page_type: "home",
      service_name: "institucional",
      service_category: "institucional",
    });
    assert.equal(trackingContextFromPath("/lp/lavagem-de-cortinas").service_name, "lavagem-cortinas");
    assert.equal(trackingContextFromPath("/lp/lavagem-de-cortinas").landing_page_type, "lp_campanha");
    assert.equal(trackingContextFromPath("/servicos/persianas/venda/").service_name, "venda-persianas-cortinas");
    assert.equal(trackingContextFromPath("/politica-de-cookies").landing_page_type, "politica");
    assert.equal(trackingContextFromPath("/qualquer").landing_page_type, "outra");
  });

  it("classifica o tráfego sem expor identificadores", () => {
    assert.equal(trafficTypeFromSearch("?gclid=abc"), "google_ads");
    assert.equal(trafficTypeFromSearch("?wbraid=abc"), "google_ads");
    assert.equal(trafficTypeFromSearch("?utm_source=x&utm_medium=cpc"), "campanha_utm");
    assert.equal(trafficTypeFromSearch(""), "direto_ou_organico");
  });
});

describe("atribuição", () => {
  it("extrai UTMs e identificadores e limita o tamanho", () => {
    const found = extractAttribution(`?utm_source=google&gclid=${"a".repeat(300)}&outro=1`);
    assert.equal(found.utm_source, "google");
    assert.equal(found.gclid?.length, 100);
    assert.equal("outro" in found, false);
    assert.deepEqual(extractAttribution(""), {});
    assert.equal(ATTRIBUTION_KEYS.length, 8);
  });

  it("expira em 90 dias e descarta lixo", () => {
    const now = 2_000_000_000_000;
    const raw = JSON.stringify({ captured_at: now, gclid: "x" });
    assert.ok(parseAttribution(raw, now + 89 * 86_400_000));
    assert.equal(parseAttribution(raw, now + 91 * 86_400_000), null);
    assert.equal(parseAttribution("{ruim", now), null);
    assert.equal(parseAttribution(null, now), null);
    assert.equal(parseAttribution("{}", now), null);
  });
});
