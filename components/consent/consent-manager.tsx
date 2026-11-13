"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { clearAttribution } from "@/lib/attribution";
import {
  CONSENT_CHANGED_EVENT,
  OPEN_CONSENT_EVENT,
  clearTrackingCookies,
  clearTrackingStorage,
  consentChanged,
  createChoice,
  hasAnyConsent,
  readConsent,
  revokedCategories,
  saveConsent,
  type ConsentChoice,
} from "@/lib/consent";

const BUTTON =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border-2 border-[#043761] bg-[#043761] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#032c4e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#043761]/30";
const BUTTON_SECONDARY =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border-2 border-[#043761] bg-card px-4 py-2.5 text-sm font-semibold text-[#043761] transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#043761]/30";

/**
 * Banner e painel de preferências de cookies.
 * - Opcionais desmarcados por padrão; Aceitar e Rejeitar têm o mesmo destaque.
 * - O estado das tags é fixo por carregamento de página: se havia rastreamento
 *   ativo e a escolha muda, limpamos os cookies da categoria revogada e
 *   recarregamos para que nenhuma tag antiga continue ou nova dispare fora do
 *   gatilho de inicialização.
 */
function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function ConsentManager() {
  // No servidor (e na hidratação) o aviso fica fechado: não entra no HTML nem
  // desloca o layout; no navegador abre se ainda não houver escolha válida.
  const hasChoice = useSyncExternalStore(subscribe, () => readConsent() !== null, () => true);
  const [reopened, setReopened] = useState(false);
  const open = !hasChoice || reopened;
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const firstButton = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    function reopen() {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setCustomize(true);
      setReopened(true);
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Primeira visita: o aviso não rouba o foco nem destaca um botão. Só quando o
  // visitante abre o painel (rodapé ou "Personalizar") o foco vai para ele.
  useEffect(() => {
    if (open && customize) firstButton.current?.focus({ preventScroll: true });
  }, [open, customize]);

  const apply = useCallback((next: ConsentChoice) => {
    const previous = readConsent();
    const hadTracking = hasAnyConsent(previous);
    const revoked = revokedCategories(previous, next);
    const changed = consentChanged(previous, next);

    saveConsent(next);

    if (revoked.includes("analytics")) {
      try {
        window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
        window.clarity?.("consent", false);
      } catch {
        /* ignorar */
      }
    }
    if (revoked.length > 0) {
      clearTrackingCookies(revoked);
      clearTrackingStorage(revoked);
    }
    if (revoked.includes("marketing")) clearAttribution();

    window.__srSetConsent?.(next);
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: next }));
    setReopened(false);
    setCustomize(false);

    if (hadTracking && changed) {
      window.location.reload();
      return;
    }
    window.__srLoadGtm?.(next);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:p-0"
    >
      <div className="max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-4 text-foreground shadow-[0_12px_40px_-8px_rgba(4,55,97,0.35)]">
        <h2 id={titleId} className="text-sm font-bold text-[#043761]">
          Sua privacidade
        </h2>
        {/* Texto curto de propósito: um bloco grande de texto fixo viraria o elemento de LCP. */}
        <p className="mt-1.5 text-[0.8rem] leading-snug text-muted-foreground">
          Usamos cookies para o site funcionar e, se você permitir, para medir visitas e anúncios.
          Recusar não limita o acesso.{" "}
          <Link href="/politica-de-cookies" className="font-semibold text-[#043761] underline underline-offset-2">
            Política de cookies
          </Link>{" "}
          ·{" "}
          <Link href="/politica-de-privacidade" className="font-semibold text-[#043761] underline underline-offset-2">
            Privacidade
          </Link>
        </p>

        {customize && (
          <fieldset className="mt-4 space-y-3 rounded-xl border border-border p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Categorias
            </legend>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked disabled className="mt-1 h-5 w-5 shrink-0 accent-[#043761]" />
              <span>
                <span className="font-semibold">Necessários</span> (sempre ativos)
                <span className="block text-muted-foreground">
                  Funcionamento do site e registro desta escolha. Não são usados para publicidade.
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#043761]"
              />
              <span>
                <span className="font-semibold">Analíticos</span>
                <span className="block text-muted-foreground">
                  Google Analytics e Microsoft Clarity: visitas, páginas, cliques e comportamento de
                  navegação para melhorar o site.
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#043761]"
              />
              <span>
                <span className="font-semibold">Marketing</span>
                <span className="block text-muted-foreground">
                  Google Ads: medir os contatos gerados pelos anúncios. Não usamos remarketing nem
                  personalização de anúncios.
                </span>
              </span>
            </label>
          </fieldset>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {customize ? (
            <>
              <button
                ref={firstButton}
                type="button"
                className={BUTTON}
                onClick={() => apply(createChoice(analytics, marketing))}
              >
                Salvar escolhas
              </button>
              <button type="button" className={BUTTON_SECONDARY} onClick={() => apply(createChoice(false, false))}>
                Rejeitar não necessários
              </button>
            </>
          ) : (
            <>
              <button ref={firstButton} type="button" className={BUTTON} onClick={() => apply(createChoice(true, true))}>
                Aceitar todos
              </button>
              <button type="button" className={BUTTON} onClick={() => apply(createChoice(false, false))}>
                Rejeitar não necessários
              </button>
              <button
                type="button"
                className={BUTTON_SECONDARY}
                onClick={() => {
                  setAnalytics(false);
                  setMarketing(false);
                  setCustomize(true);
                }}
              >
                Personalizar
              </button>
            </>
          )}
        </div>
        {customize && (
          <button
            type="button"
            className="mt-3 text-xs font-medium text-muted-foreground underline underline-offset-2"
            onClick={() => {
              setCustomize(false);
              setReopened(false);
            }}
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  );
}
