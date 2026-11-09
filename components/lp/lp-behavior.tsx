"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { LpPhoneLink, LpWhatsAppLink, lpEventBase, type LpContext } from "./lp-links";

/**
 * `section_view`: uma vez por seção (`data-section-id`), quando ela ocupa o
 * centro da tela por 1 segundo.
 */
export function LpSectionTracker({ context }: { context: LpContext }) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const seen = new Set<string>();
    const timers = new Map<Element, ReturnType<typeof setTimeout>>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.sectionId;
          if (!id || seen.has(id)) continue;
          if (entry.isIntersecting) {
            timers.set(
              entry.target,
              setTimeout(() => {
                seen.add(id);
                observer.unobserve(entry.target);
                pushEvent("section_view", { ...lpEventBase(context), section_id: id });
              }, 1000),
            );
          } else {
            clearTimeout(timers.get(entry.target));
            timers.delete(entry.target);
          }
        }
      },
      // Faixa central da tela (20% da altura): funciona também para seções
      // mais altas que a tela, que nunca chegariam a 50% de visibilidade.
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    document.querySelectorAll<HTMLElement>("[data-section-id]").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, [context]);

  return null;
}

/**
 * Barra fixa no rodapé (só mobile). Aparece depois que o CTA do hero sai da
 * tela e some quando o formulário final está visível.
 */
export function LpStickyCta({
  context,
  message,
  label,
}: {
  context: LpContext;
  message: string;
  label: string;
}) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const hero = document.getElementById("hero-cta");
    const form = document.getElementById("orcamento");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === form) setFormVisible(entry.isIntersecting);
      }
    });
    if (hero) observer.observe(hero);
    if (form) observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const visible = !heroVisible && !formVisible;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(4,55,97,0.12)] backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <LpWhatsAppLink
          context={context}
          message={message}
          ctaId="lp_sticky_whatsapp"
          position="lp_sticky_mobile"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0f7a4a] px-4 py-3.5 text-[0.95rem] font-bold text-white"
        >
          <MessageCircle aria-hidden="true" className="h-5 w-5 fill-current" />
          {label}
        </LpWhatsAppLink>
        <LpPhoneLink
          context={context}
          ctaId="lp_sticky_phone"
          position="lp_sticky_mobile"
          ariaLabel="Ligar para a SR Decorações"
          className="inline-flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-xl border border-border text-[#043761]"
        >
          <Phone aria-hidden="true" className="h-5 w-5" />
        </LpPhoneLink>
      </div>
    </div>
  );
}
