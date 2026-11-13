import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";

/**
 * Cobertura da conversão de WhatsApp: antes de a conversão do Google Ads
 * depender só do evento `whatsapp_click`, TODO link de WhatsApp do site precisa
 * passar pelo rastreador (atributos `data-button-*`) ou enviar o evento por
 * conta própria (`data-track="manual"`). Este teste falha se alguém criar um
 * link fora do padrão.
 */

const ROOT = join(import.meta.dirname, "..");
const SOURCE_DIRS = ["app", "components"];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx|ts)$/.test(name) && !/\.test\./.test(name)) out.push(full);
  }
  return out;
}

const files = SOURCE_DIRS.flatMap((dir) => walk(join(ROOT, dir)));
const rel = (file: string) => relative(ROOT, file).replaceAll("\\", "/");

/** Tags <a ...> completas (atributos podem ter várias linhas e `=>` dentro de chaves). */
function anchors(source: string): string[] {
  return source.match(/<a\b(?:[^>{]|\{[^}]*\})*>/g) ?? [];
}

describe("cobertura do whatsapp_click", () => {
  it("nenhum link do WhatsApp escrito à mão: tudo vem de whatsappUrl()", () => {
    const offenders = files.filter((file) => /wa\.me|api\.whatsapp\.com/.test(readFileSync(file, "utf8")));
    assert.deepEqual(offenders.map(rel), []);
  });

  it("todo <a> com whatsappUrl() tem data-button-location ou é manual", () => {
    const problems: string[] = [];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const tag of anchors(source)) {
        const isWhatsApp = /whatsappUrl\(|href=\{url\}/.test(tag);
        if (!isWhatsApp) continue;
        const covered = /data-button-location|data-track="manual"/.test(tag);
        if (!covered) problems.push(`${rel(file)}: ${tag.replace(/\s+/g, " ").slice(0, 100)}`);
      }
    }
    assert.deepEqual(problems, []);
  });

  it("todo uso de <WhatsAppButton> informa a posição (location)", () => {
    const problems: string[] = [];
    for (const file of files) {
      if (rel(file) === "components/whatsapp-button.tsx") continue;
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/<WhatsAppButton\b[\s\S]*?\/>/g)) {
        if (!/location=/.test(match[0])) problems.push(`${rel(file)}: ${match[0].replace(/\s+/g, " ").slice(0, 80)}`);
      }
    }
    assert.deepEqual(problems, []);
  });

  it("todo <LpWhatsAppLink> informa ctaId e position", () => {
    const problems: string[] = [];
    for (const file of files) {
      if (rel(file) === "components/lp/lp-links.tsx") continue;
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/<LpWhatsAppLink\b[\s\S]*?>/g)) {
        if (!/ctaId=/.test(match[0]) || !/position=/.test(match[0])) {
          problems.push(`${rel(file)}: ${match[0].replace(/\s+/g, " ").slice(0, 80)}`);
        }
      }
    }
    assert.deepEqual(problems, []);
  });

  it("links tel: e mailto: escritos à mão têm data-button-location", () => {
    const problems: string[] = [];
    for (const file of files) {
      for (const tag of anchors(readFileSync(file, "utf8"))) {
        if (!/href=\{?[`"](tel:|mailto:)/.test(tag)) continue;
        if (!/data-button-location|data-track="manual"/.test(tag)) {
          problems.push(`${rel(file)}: ${tag.replace(/\s+/g, " ").slice(0, 100)}`);
        }
      }
    }
    assert.deepEqual(problems, []);
  });

  it("só o rastreador global e os componentes de LP enviam whatsapp_click", () => {
    const senders = files
      .filter((file) => /pushEvent\(\s*"whatsapp_click"/.test(readFileSync(file, "utf8")))
      .map(rel)
      .sort();
    assert.deepEqual(senders, [
      "components/analytics/click-tracker.tsx",
      "components/lp/lp-links.tsx",
      "components/lp/lp-quote-form.tsx",
    ]);
  });
});
