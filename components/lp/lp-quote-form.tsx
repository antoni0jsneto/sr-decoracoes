"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { navigateAfterEvents, pushEvent } from "@/lib/analytics";
import { getLeadRef, recordLeadAttribution } from "@/lib/attribution";
import { QUANTITY_OPTIONS } from "@/lib/landing-pages";
import { whatsappUrl } from "@/lib/site";
import { messageWithRef, type LpContext } from "./lp-links";

interface Props {
  context: LpContext;
  baseMessage: string;
  itemLabel: string;
  itemOptions: string[];
  quantityLabel: string;
}

type Errors = Partial<Record<"item" | "quantity" | "location", string>>;

/**
 * Formulário curto que monta a mensagem do WhatsApp. Não há envio a servidor:
 * o envio válido gera apenas `whatsapp_click` (intenção), nunca `form_submit`
 * nem `generate_lead` (o lead só existe quando a conversa chega à SR).
 * O bairro/cidade digitado vai só na mensagem, nunca para o dataLayer.
 */
export function LpQuoteForm({
  context,
  baseMessage,
  itemLabel,
  itemOptions,
  quantityLabel,
}: Props) {
  const formId = `lp_orcamento_${context.slug.replace(/-/g, "_")}`;
  const ids = useId();
  const started = useRef(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleStart() {
    if (started.current) return;
    started.current = true;
    pushEvent("form_start", { form_id: formId });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const item = String(data.get("item") || "");
    const quantity = String(data.get("quantity") || "");
    const location = String(data.get("location") || "").trim();

    const next: Errors = {};
    if (!item) next.item = "Escolha uma opção.";
    if (!quantity) next.quantity = "Escolha uma opção.";
    if (location.length < 3) next.location = "Informe o bairro e a cidade.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Só os nomes dos campos com erro, nunca os valores digitados.
      pushEvent("form_error", { form_id: formId, error_fields: Object.keys(next).join(",") });
      const first = event.currentTarget.querySelector<HTMLElement>(
        `[name="${Object.keys(next)[0]}"]`,
      );
      first?.focus();
      return;
    }

    const ref = getLeadRef(context.refPrefix);
    const message = messageWithRef(
      `${baseMessage}\n• ${itemLabel}: ${item}\n• Quantidade: ${quantity}\n• Bairro/cidade: ${location.slice(0, 80)}`,
      ref,
    );
    pushEvent("whatsapp_click", {
      button_location: "lp_formulario",
      button_id: "lp_form_submit",
      contact_intent: "orcamento",
      form_id: formId,
      item_type: item,
      quantity_range: quantity,
    });
    recordLeadAttribution(ref, context.serviceId);

    const url = whatsappUrl(message);
    const opened = window.open(url, "_blank");
    if (opened) {
      opened.opener = null;
    } else {
      // Popup bloqueado: navega na mesma aba só depois de o GTM processar o evento.
      navigateAfterEvents(url);
    }
  }

  const fieldClass =
    "mt-1.5 block w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-destructive";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onFocus={handleStart}
      aria-label="Pedido de orçamento pelo WhatsApp"
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor={`${ids}-item`} className="text-sm font-semibold text-foreground">
          {itemLabel}
        </label>
        <select
          id={`${ids}-item`}
          name="item"
          defaultValue=""
          aria-invalid={Boolean(errors.item)}
          aria-describedby={errors.item ? `${ids}-item-err` : undefined}
          className={fieldClass}
        >
          <option value="" disabled>
            Selecione
          </option>
          {itemOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.item && (
          <p id={`${ids}-item-err`} className="mt-1 text-sm text-destructive">
            {errors.item}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">{quantityLabel}</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {QUANTITY_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center justify-center rounded-xl border border-input bg-background px-3 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40"
            >
              <input
                type="radio"
                name="quantity"
                value={option}
                className="sr-only"
                aria-invalid={Boolean(errors.quantity)}
              />
              {option}
            </label>
          ))}
        </div>
        {errors.quantity && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.quantity}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor={`${ids}-location`} className="text-sm font-semibold text-foreground">
          Bairro e cidade
        </label>
        <input
          id={`${ids}-location`}
          name="location"
          type="text"
          autoComplete="address-level2"
          placeholder="Ex.: Mooca, São Paulo"
          maxLength={80}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={errors.location ? `${ids}-location-err` : undefined}
          className={fieldClass}
        />
        {errors.location && (
          <p id={`${ids}-location-err`} className="mt-1 text-sm text-destructive">
            {errors.location}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f7a4a] px-6 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-[#0b6a41] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0f7a4a]/40"
      >
        <Send aria-hidden="true" className="h-5 w-5" />
        Enviar pedido pelo WhatsApp
      </button>
      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Abrimos o WhatsApp com a mensagem pronta. Nada é enviado antes de você
        tocar em enviar na conversa.
      </p>
    </form>
  );
}
