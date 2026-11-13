"use client"

import { MessageCircle } from "lucide-react"
import { whatsappUrl } from "@/lib/site"
import type { ContactIntent } from "@/lib/analytics"

interface WhatsAppButtonProps {
  message?: string
  label?: string
  className?: string
  variant?: "fixed" | "inline" | "cta"
  id?: string
  /** Posição do botão na página (`button_location` do evento). */
  location?: string
  intent?: ContactIntent
}

export function WhatsAppButton({
  message = "Olá! Gostaria de solicitar um orçamento.",
  label = "Fale Conosco no WhatsApp",
  className = "",
  variant = "inline",
  id,
  location,
  intent = "orcamento",
}: WhatsAppButtonProps) {
  const url = whatsappUrl(message)

  if (variant === "fixed") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        id={id || "whatsapp-float"}
        data-button-id={id || "whatsapp-float"}
        data-button-location={location || "flutuante"}
        data-contact-intent={intent}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#0f7a4a] px-5 py-3.5 font-semibold text-[#fff] shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-current" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    )
  }

  if (variant === "cta") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        id={id || "whatsapp-cta"}
        data-button-id={id || "whatsapp-cta"}
        data-button-location={location || "cta"}
        data-contact-intent={intent}
        className={`inline-flex items-center gap-2 rounded-lg bg-[#0f7a4a] px-8 py-4 text-lg font-bold text-[#fff] shadow-md transition-all hover:scale-105 hover:bg-[#0b6a41] hover:shadow-lg ${className}`}
      >
        <MessageCircle className="h-5 w-5 fill-current" />
        {label}
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      id={id || "whatsapp-inline"}
      data-button-id={id || "whatsapp-inline"}
      data-button-location={location || "inline"}
      data-contact-intent={intent}
      className={`inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 hover:opacity-90 ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  )
}
