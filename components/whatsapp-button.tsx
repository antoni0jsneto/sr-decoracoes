"use client"

import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5511924240055"
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`

interface WhatsAppButtonProps {
  message?: string
  label?: string
  className?: string
  variant?: "fixed" | "inline" | "cta"
  id?: string
}

export function WhatsAppButton({
  message = "Olá! Gostaria de solicitar um orçamento.",
  label = "Fale Conosco no WhatsApp",
  className = "",
  variant = "inline",
  id,
}: WhatsAppButtonProps) {
  const url = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`

  if (variant === "fixed") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        id={id || "whatsapp-float"}
        data-conversion="whatsapp-float"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-[#fff] shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
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
        data-conversion="whatsapp-cta"
        className={`inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-8 py-4 text-lg font-bold text-[#fff] shadow-md transition-all hover:scale-105 hover:bg-[#20bd5a] hover:shadow-lg ${className}`}
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
      data-conversion="whatsapp-inline"
      className={`inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 hover:opacity-90 ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  )
}
