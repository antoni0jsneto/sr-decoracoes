import assert from "node:assert/strict";
import { describe, it } from "node:test";
import vm from "node:vm";
import { CONSENT_STORAGE_KEY, CONSENT_VERSION, createChoice } from "./consent.ts";
import { gtmBootstrapScript } from "./gtm-bootstrap.ts";

const OFFICIAL = "www.srdecoracoes.com.br";
const OPTIONS = {
  gtmId: "GTM-TESTE",
  officialHost: OFFICIAL,
  storageKey: CONSENT_STORAGE_KEY,
  version: CONSENT_VERSION,
  maxAgeMs: 365 * 24 * 60 * 60 * 1000,
};

type Call = unknown[];

/** Normaliza itens do dataLayer (`arguments` ou objeto) para JSON puro, sem objetos de outro realm. */
function plain(item: unknown): unknown {
  const value =
    Object.prototype.toString.call(item) === "[object Arguments]"
      ? Array.from(item as ArrayLike<unknown>)
      : item;
  return JSON.parse(JSON.stringify(value));
}

/** Executa o script do <head> num navegador simulado e devolve o que ele fez. */
function run({
  hostname = OFFICIAL,
  search = "",
  stored,
  readyState = "complete",
}: {
  hostname?: string;
  search?: string;
  stored?: unknown;
  readyState?: string;
}) {
  const appended: string[] = [];
  const listeners: Record<string, (() => void)[]> = {};
  const storage = new Map<string, string>();
  if (stored !== undefined) storage.set(CONSENT_STORAGE_KEY, JSON.stringify(stored));

  const window: Record<string, unknown> = {
    location: { hostname, search },
    localStorage: { getItem: (k: string) => storage.get(k) ?? null },
    addEventListener: (type: string, fn: () => void) => {
      (listeners[type] ||= []).push(fn);
    },
  };
  const document = {
    readyState,
    head: {
      appendChild: (el: { src: string }) => appended.push(el.src),
    },
    documentElement: { appendChild: () => {} },
    createElement: () => ({}),
  };
  const context = vm.createContext({ window, document, Date, JSON, Array });
  vm.runInContext(gtmBootstrapScript(OPTIONS), context);
  const dataLayer = (window.dataLayer as unknown[]).map(plain);
  const named = dataLayer.filter(Array.isArray) as Call[];
  return { window, dataLayer, named, appended, listeners };
}

const consentCalls = (named: unknown[][]) => named.filter((c) => c[0] === "consent");

describe("script do <head> (Consent Mode básico)", () => {
  it("sem escolha salva: default tudo negado, nenhuma flag e GTM NÃO é carregado", () => {
    const { named, appended, window } = run({});
    const calls = consentCalls(named);
    assert.equal(calls.length, 1);
    assert.equal(calls[0][1], "default");
    const state = calls[0][2] as Record<string, unknown>;
    for (const key of ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"]) {
      assert.equal(state[key], "denied", key);
    }
    assert.equal(state.wait_for_update, 500);
    assert.equal(appended.length, 0);
    assert.equal(typeof window.__srLoadGtm, "function");
    assert.equal(JSON.stringify(window.dataLayer).includes("sr_consent_schema"), false);
  });

  it("o default vem antes de qualquer update e antes do gtm.js", () => {
    const { dataLayer, appended } = run({ stored: createChoice(true, true) });
    const flat = dataLayer.map((i) => JSON.stringify(i));
    const iDefault = flat.findIndex((s) => s.includes('"default"'));
    const iUpdate = flat.findIndex((s) => s.includes('"update"'));
    const iFlags = flat.findIndex((s) => s.includes("sr_consent_schema"));
    const iStart = flat.findIndex((s) => s.includes("gtm.start"));
    assert.ok(iDefault >= 0 && iDefault < iUpdate, "default antes do update");
    assert.ok(iUpdate < iFlags, "update antes das flags");
    assert.ok(iFlags < iStart, "flags antes do gtm.start");
    assert.deepEqual(appended, ["https://www.googletagmanager.com/gtm.js?id=GTM-TESTE"]);
  });

  it("só analíticos: update concede só analytics_storage e flags corretas", () => {
    const { named, dataLayer } = run({ stored: createChoice(true, false) });
    const update = consentCalls(named).find((c) => c[1] === "update")![2] as Record<string, string>;
    assert.equal(update.analytics_storage, "granted");
    assert.equal(update.ad_storage, "denied");
    assert.equal(update.ad_user_data, "denied");
    assert.equal(update.ad_personalization, "denied");
    const flags = dataLayer.find((i) => !Array.isArray(i) && "sr_consent_schema" in (i as object)) as Record<string, unknown>;
    assert.equal(flags.sr_consent_analytics, true);
    assert.equal(flags.sr_consent_marketing, false);
  });

  it("só marketing: update concede só ad_storage/ad_user_data e flags corretas", () => {
    const { named, dataLayer } = run({ stored: createChoice(false, true) });
    const update = consentCalls(named).find((c) => c[1] === "update")![2] as Record<string, string>;
    assert.equal(update.analytics_storage, "denied");
    assert.equal(update.ad_storage, "granted");
    assert.equal(update.ad_user_data, "granted");
    assert.equal(update.ad_personalization, "denied");
    const flags = dataLayer.find((i) => !Array.isArray(i) && "sr_consent_schema" in (i as object)) as Record<string, unknown>;
    assert.equal(flags.sr_consent_analytics, false);
    assert.equal(flags.sr_consent_marketing, true);
  });

  it("recusa total salva: aplica o estado, mas não carrega o GTM", () => {
    const { appended, named } = run({ stored: createChoice(false, false) });
    assert.equal(appended.length, 0);
    const update = consentCalls(named).find((c) => c[1] === "update")![2] as Record<string, string>;
    assert.equal(update.analytics_storage, "denied");
  });

  it("escolha vencida ou de outra versão é ignorada (sem GTM)", () => {
    const expired = createChoice(true, true, Date.now() - OPTIONS.maxAgeMs - 1000);
    assert.equal(run({ stored: expired }).appended.length, 0);
    assert.equal(run({ stored: { ...createChoice(true, true), version: 99 } }).appended.length, 0);
  });

  it("não carrega o GTM fora do domínio oficial, salvo com ?gtm_debug", () => {
    const stored = createChoice(true, true);
    assert.equal(run({ hostname: "localhost", stored }).appended.length, 0);
    assert.equal(run({ hostname: "x.vercel.app", stored }).appended.length, 0);
    assert.equal(run({ hostname: "localhost", search: "?gtm_debug=x", stored }).appended.length, 1);
  });

  it("página ainda carregando: espera load ou 1ª interação e injeta uma única vez", () => {
    const { appended, listeners } = run({ stored: createChoice(true, false), readyState: "loading" });
    assert.equal(appended.length, 0);
    assert.ok(listeners.load?.length);
    assert.ok(listeners.pointerdown?.length);
    listeners.pointerdown[0]();
    listeners.load[0]();
    listeners.keydown[0]();
    assert.equal(appended.length, 1);
  });

  it("aceite no banner: __srSetConsent + __srLoadGtm carregam uma única vez, na ordem certa", () => {
    const { window } = run({});
    const choice = createChoice(true, false);
    (window.__srSetConsent as (c: unknown) => void)(choice);
    const load = window.__srLoadGtm as (c: unknown) => boolean;
    assert.equal(load(choice), true);
    assert.equal(load(choice), false);
    const dataLayer = (window.dataLayer as unknown[]).map(plain);
    const flat = dataLayer.map((i) => JSON.stringify(i));
    assert.ok(flat.findIndex((s) => s.includes("sr_consent_schema")) < flat.findIndex((s) => s.includes("gtm.start")));
  });

  it("__srLoadGtm recusa carregar sem nenhuma categoria concedida", () => {
    const { window, appended } = run({});
    assert.equal((window.__srLoadGtm as (c: unknown) => boolean)(createChoice(false, false)), false);
    assert.equal(appended.length, 0);
  });

  it("Clarity: com analytics, fila consentv2 com chaves e valores corretos; sem analytics, nada", () => {
    const withAnalytics = run({ stored: createChoice(true, false) });
    const clarity = withAnalytics.window.clarity as { q?: unknown[] };
    const call = plain(clarity.q![0]) as unknown[];
    assert.equal(call[0], "consentv2");
    assert.deepEqual(call[1], { ad_Storage: "denied", analytics_Storage: "granted" });

    const marketingOnly = run({ stored: createChoice(false, true) });
    assert.equal(marketingOnly.window.clarity, undefined);
  });
});
