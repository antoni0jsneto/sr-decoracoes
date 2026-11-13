"use client";

import { CONSENT_ENABLED, OPEN_CONSENT_EVENT } from "@/lib/consent";

/** Reabre o painel de cookies (rodapé). Só aparece com o consentimento ligado. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  if (!CONSENT_ENABLED) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      Preferências de cookies
    </button>
  );
}
