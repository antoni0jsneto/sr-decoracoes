"use client";

import { useEffect } from "react";
import { currentTrafficType, pushEventWhenAllowed } from "@/lib/analytics";

let lastKey = "";
let lastAt = 0;

/**
 * Envia `service_view` (páginas de serviço) ou `landing_page_view` (landings)
 * uma única vez por montagem da página. Não é conversão. Com o consentimento
 * ainda pendente, envia assim que o visitante decidir. A trava de 1 s evita
 * envio duplo do React StrictMode em desenvolvimento.
 */
export function TrackView({ event }: { event: "service_view" | "landing_page_view" }) {
  useEffect(() => {
    const key = `${event}:${window.location.pathname}`;
    const now = Date.now();
    if (key === lastKey && now - lastAt < 1000) return;
    lastKey = key;
    lastAt = now;
    return pushEventWhenAllowed(
      event,
      event === "landing_page_view" ? { traffic_type: currentTrafficType() } : {},
    );
  }, [event]);

  return null;
}
