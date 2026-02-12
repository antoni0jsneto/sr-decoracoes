import Image from "next/image"
import { WhatsAppButton } from "./whatsapp-button"
import { Shield, Star, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground text-primary-foreground">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-blinds.jpg"
          alt="Sala moderna com persianas elegantes"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center lg:px-8 lg:py-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Star className="h-4 w-4" />
          Mais de 10 anos de experiência
        </div>

        <h1 className="mb-6 max-w-4xl font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
          <span className="text-balance">
            Especialistas em Persianas, Cortinas, Sofás e Pisos
          </span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
          Lavagem profissional, manutenção especializada e venda de persianas e
          cortinas. Também cuidamos dos seus sofás e instalamos pisos com
          qualidade garantida.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <WhatsAppButton
            variant="cta"
            label="Solicite Orçamento Grátis"
            message="Olá! Gostaria de solicitar um orçamento para os serviços da SR Decorações."
            id="hero-whatsapp-cta"
          />
          <a
            href="#servicos"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
          >
            Conheça Nossos Serviços
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/5 px-5 py-3 backdrop-blur-sm">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Garantia de Qualidade</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/5 px-5 py-3 backdrop-blur-sm">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Atendimento Rápido</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/5 px-5 py-3 backdrop-blur-sm">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Orçamento Gratuito</span>
          </div>
        </div>
      </div>
    </section>
  )
}
