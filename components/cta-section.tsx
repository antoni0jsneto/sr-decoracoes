import { WhatsAppButton } from "./whatsapp-button"
import { Phone, Mail } from "lucide-react"

export function CtaSection() {
  return (
    <section className="bg-primary py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
          <span className="text-balance">
            Solicite Seu Orçamento Gratuito Agora
          </span>
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-primary-foreground/80">
          Entre em contato com nossa equipe pelo WhatsApp e receba seu
          orçamento de forma rápida e sem compromisso. Atendemos residências e
          empresas em toda a Grande São Paulo.
        </p>

        <WhatsAppButton
          variant="cta"
          label="Chamar no WhatsApp Agora"
          message="Olá! Gostaria de solicitar um orçamento gratuito para os serviços da SR Decorações."
          id="cta-final-whatsapp"
          className="bg-[#fff] text-foreground hover:bg-[#f0f0f0]"
        />

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <a
            href="tel:+5511924240055"
            className="flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            (11) 92424-0055
          </a>
          <a
            href="mailto:srdecoracoess@gmail.com"
            className="flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <Mail className="h-4 w-4" />
            srdecoracoess@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
