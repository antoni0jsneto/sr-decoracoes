export {};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    /** Definidas pelo script inline do <head> (lib/gtm-bootstrap.ts). */
    __srGtag?: (...args: unknown[]) => void;
    __srSetConsent?: (choice: {
      analytics: boolean;
      marketing: boolean;
    }) => void;
    __srLoadGtm?: (choice: { analytics: boolean; marketing: boolean }) => boolean;
    /** Microsoft Clarity (fila criada antes do template do GTM carregar). */
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}
