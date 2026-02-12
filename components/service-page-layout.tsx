import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Header } from "./header"
import { Footer } from "./footer"
import { WhatsAppButton } from "./whatsapp-button"
import { CtaSection } from "./cta-section"

interface ServicePageLayoutProps {
  title: string
  subtitle: string
  description: string
  heroImage: string
  heroImageAlt: string
  benefits: string[]
  details: {
    title: string
    text: string
  }[]
  whatsappMessage: string
  jsonLd: object
}

export function ServicePageLayout({
  title,
  subtitle,
  description,
  heroImage,
  heroImageAlt,
  benefits,
  details,
  whatsappMessage,
  jsonLd,
}: ServicePageLayoutProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-foreground text-primary-foreground">
          <div className="absolute inset-0">
            <Image
              src={heroImage || "/placeholder.svg"}
              alt={heroImageAlt}
              fill
              className="object-cover opacity-25"
              priority
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Início
            </Link>
            <div className="max-w-3xl">
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                {subtitle}
              </span>
              <h1 className="mb-6 font-serif text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
                <span className="text-balance">{title}</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
                {description}
              </p>
              <WhatsAppButton
                variant="cta"
                label="Solicitar Orçamento Grátis"
                message={whatsappMessage}
                id={`service-hero-whatsapp-${title.toLowerCase().replace(/\s/g, "-")}`}
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 font-serif text-2xl font-bold text-foreground md:text-3xl">
                  <span className="text-balance">
                    Por que escolher a SR Decorações?
                  </span>
                </h2>
                <div className="flex flex-col gap-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-80 overflow-hidden rounded-2xl lg:h-auto">
                <Image
                  src={heroImage || "/placeholder.svg"}
                  alt={heroImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-12 text-center font-serif text-2xl font-bold text-foreground md:text-3xl">
              <span className="text-balance">Detalhes do Serviço</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {details.map((detail) => (
                <div
                  key={detail.title}
                  className="rounded-xl bg-card p-6 shadow-sm"
                >
                  <h3 className="mb-3 text-base font-bold text-foreground">
                    {detail.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {detail.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="bg-background py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="mb-4 font-serif text-2xl font-bold text-foreground md:text-3xl">
              <span className="text-balance">
                Precisa deste serviço? Fale conosco agora!
              </span>
            </h2>
            <p className="mb-8 text-muted-foreground">
              Solicite um orçamento gratuito pelo WhatsApp. Respondemos
              rapidamente e sem compromisso.
            </p>
            <WhatsAppButton
              variant="cta"
              label="Chamar no WhatsApp"
              message={whatsappMessage}
              id={`service-mid-whatsapp-${title.toLowerCase().replace(/\s/g, "-")}`}
            />
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton variant="fixed" />
    </>
  )
}
