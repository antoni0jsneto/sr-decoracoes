"use client";

import type { SyntheticEvent } from "react";
import { ChevronDown } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { lpEventBase, type LpContext } from "./lp-links";

/** FAQ com <details> nativo (acessível e sem JS para abrir/fechar). */
export function LpFaq({
  context,
  items,
}: {
  context: LpContext;
  items: { question: string; answer: string }[];
}) {
  function handleToggle(
    event: SyntheticEvent<HTMLDetailsElement>,
    question: string,
  ) {
    if (!event.currentTarget.open) return;
    pushEvent("faq_open", {
      ...lpEventBase(context),
      faq_question: question.slice(0, 100),
    });
  }

  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {items.map((item) => (
        <details
          key={item.question}
          className="group"
          onToggle={(event) => handleToggle(event, item.question)}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-foreground transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:px-6 [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-muted-foreground md:px-6">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
