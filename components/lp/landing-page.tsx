import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SERVICE_AREA, type LandingPage } from "@/lib/landing-pages";
import { BUSINESS_HOURS, CONTACT_EMAIL, PHONE_DISPLAY } from "@/lib/site";
import { LpIcon } from "./lp-icon";
import { LpHeroArt } from "./lp-hero-art";
import { LpFaq } from "./lp-faq";
import { LpQuoteForm } from "./lp-quote-form";
import { LpSectionTracker, LpStickyCta } from "./lp-behavior";
import { LpPhoneLink, LpWhatsAppLink, type LpContext } from "./lp-links";

const WA_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f7a4a] font-bold text-white shadow-[0_10px_30px_-10px_rgba(15,122,74,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#0b6a41] hover:shadow-[0_14px_34px_-10px_rgba(15,122,74,0.8)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0f7a4a]/40";

function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-[1.75rem] font-bold leading-tight text-[#043761] md:text-4xl">
        <span className="text-balance">{title}</span>
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}

export function LandingPageView({ page }: { page: LandingPage }) {
  const context: LpContext = {
    slug: page.slug,
    serviceId: page.serviceId,
    refPrefix: page.refPrefix,
  };
  const hasProof =
    page.proof.photos.length > 0 || page.proof.testimonials.length > 0;

  return (
    <>
      {/* Cabeçalho enxuto: marca, telefone e WhatsApp */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-128.webp"
              alt="SR"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-contain shadow-sm"
            />
            <span className="text-[0.7rem] font-bold uppercase leading-tight tracking-[0.16em] text-[#043761] sm:text-xs">
              Persianas &amp;
              <br className="sm:hidden" /> Decorações
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <LpPhoneLink
              context={context}
              ctaId="lp_header_phone"
              position="lp_header"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#043761] transition-colors hover:bg-secondary md:inline-flex"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {PHONE_DISPLAY}
            </LpPhoneLink>
            <LpWhatsAppLink
              context={context}
              message={page.whatsappMessage}
              ctaId="lp_header_whatsapp"
              position="lp_header"
              className={`${WA_BUTTON} px-4 py-2.5 text-sm shadow-none`}
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4 fill-current" />
              <span>WhatsApp</span>
            </LpWhatsAppLink>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Hero */}
        <section
          data-section-id="hero"
          className="relative overflow-hidden bg-[#043761] text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_10%,rgba(63,191,134,0.22),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgba(201,167,124,0.18),transparent_60%)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 md:grid-cols-[1.15fr_0.85fr] md:pb-20 md:pt-16 lg:px-8">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                {page.eyebrow}
              </p>
              <h1 className="font-serif text-[2.1rem] font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
                <span className="text-balance">{page.h1}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                {page.subtitle}
              </p>

              <div id="hero-cta" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LpWhatsAppLink
                  context={context}
                  message={page.whatsappMessage}
                  ctaId="lp_hero_whatsapp"
                  position="lp_hero"
                  className={`${WA_BUTTON} px-7 py-4 text-base sm:text-lg`}
                >
                  <MessageCircle aria-hidden="true" className="h-5 w-5 fill-current" />
                  {page.ctaLabel}
                </LpWhatsAppLink>
                <LpPhoneLink
                  context={context}
                  ctaId="lp_hero_phone"
                  position="lp_hero"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  ou ligue {PHONE_DISPLAY}
                </LpPhoneLink>
              </div>

              <ul className="mt-8 grid gap-2.5 text-sm text-white/85 sm:grid-cols-3 sm:gap-4">
                {[
                  "Orçamento sem compromisso",
                  "Residências e empresas",
                  "São Paulo e Grande SP",
                ].map((item, index) => (
                  <li
                    key={item}
                    className={`lp-rise flex items-center gap-2 lp-delay-${index + 1}`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20">
                      <Check aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lp-rise lp-delay-2 mx-auto w-full max-w-[19rem] sm:max-w-sm md:max-w-none">
              <LpHeroArt variant={page.heroArt} />
            </div>
          </div>
        </section>

        {/* 2. Problemas que resolvemos */}
        <section data-section-id="problemas" className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <SectionHeading title={page.problemsTitle} intro={page.problemsIntro} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.problems.map((problem) => (
                <div
                  key={problem.title}
                  className="lp-reveal flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(4,55,97,0.05)] sm:block sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#043761]/[0.07] text-[#043761] sm:mb-4">
                    <LpIcon name={problem.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{problem.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mt-2">
                      {problem.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-[#043761]/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <p className="text-base font-semibold text-[#043761] md:text-lg">
                Reconheceu algum desses sinais? Mande uma foto e tire suas dúvidas.
              </p>
              <LpWhatsAppLink
                context={context}
                message={page.whatsappMessage}
                ctaId="lp_problems_whatsapp"
                position="lp_after_problems"
                className={`${WA_BUTTON} shrink-0 px-6 py-3.5 text-base`}
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5 fill-current" />
                Enviar foto pelo WhatsApp
              </LpWhatsAppLink>
            </div>
          </div>
        </section>

        {/* 3. Benefícios e modelos atendidos */}
        <section data-section-id="beneficios" className="bg-secondary py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.4fr_1fr] lg:px-8">
            <div>
              <SectionHeading title={page.benefitsTitle} />
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {page.benefits.map((benefit) => (
                  <div key={benefit.title} className="lp-reveal flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <LpIcon name={benefit.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{benefit.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <aside className="self-start rounded-2xl bg-[#043761] p-7 text-white md:p-8">
              <h3 className="font-serif text-2xl font-bold">{page.typesTitle}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {page.types.map((type) => (
                  <li key={type} className="flex items-center gap-3 text-white/90">
                    <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-300" />
                    {type}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-relaxed text-white/70">
                Não sabe qual é o seu modelo? Envie uma foto que identificamos para você.
              </p>
            </aside>
          </div>
        </section>

        {/* 4. Portfólio e provas: só com material real e autorizado */}
        {hasProof && (
          <section data-section-id="portfolio" className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
              <SectionHeading title="Trabalhos realizados" center />
              {page.proof.photos.length > 0 && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {page.proof.photos.map((photo) => (
                    <figure key={photo.src} className="overflow-hidden rounded-2xl bg-card shadow-sm">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={640}
                        height={480}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="p-4 text-sm text-muted-foreground">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {page.proof.testimonials.length > 0 && (
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {page.proof.testimonials.map((item) => (
                    <blockquote key={item.text} className="rounded-2xl bg-card p-6 shadow-sm">
                      <p className="text-sm leading-relaxed text-foreground">“{item.text}”</p>
                      <footer className="mt-4 text-sm font-semibold text-foreground">
                        {item.author}
                        <span className="block text-xs font-normal text-muted-foreground">
                          {item.context}
                        </span>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. Como funciona */}
        <section data-section-id="processo" className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <SectionHeading eyebrow="Simples e rápido" title={page.processTitle} center />
            <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
              <span
                aria-hidden="true"
                className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block"
              />
              {page.process.map((step, index) => (
                <li key={step.title} className="lp-reveal relative flex gap-4 md:flex-col md:items-center md:text-center">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-card text-primary shadow-[0_6px_20px_-8px_rgba(4,55,97,0.35)] ring-1 ring-border">
                    <LpIcon name={step.icon} className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#043761] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:mx-auto md:max-w-xs">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12 text-center">
              <LpWhatsAppLink
                context={context}
                message={page.whatsappMessage}
                ctaId="lp_process_whatsapp"
                position="lp_after_process"
                className={`${WA_BUTTON} px-7 py-4 text-base`}
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5 fill-current" />
                Começar pelo WhatsApp
              </LpWhatsAppLink>
            </div>
          </div>
        </section>

        {/* 6. Área de atendimento */}
        <section data-section-id="area" className="bg-secondary py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:items-center lg:px-8">
            <div>
              <SectionHeading title="Área de atendimento" intro={SERVICE_AREA.summary} />
              <ul className="mt-6 flex flex-wrap gap-2">
                {SERVICE_AREA.places.map((place) => (
                  <li
                    key={place}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground"
                  >
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                    {place}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Outra cidade da região? Pergunte pelo WhatsApp.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7">
              <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                <Clock aria-hidden="true" className="h-5 w-5 text-primary" />
                Horário de atendimento
              </h3>
              <dl className="mt-4 divide-y divide-border text-sm">
                {BUSINESS_HOURS.map((row) => (
                  <div key={row.label} className="flex justify-between py-2.5">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-semibold text-foreground">{row.hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Pode mandar sua mensagem a qualquer hora: respondemos no horário de atendimento.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Perguntas frequentes */}
        <section data-section-id="faq" className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas frequentes" center />
            <div className="mt-10">
              <LpFaq context={context} items={page.faq} />
            </div>
          </div>
        </section>

        {/* 8. Conversão final */}
        <section
          id="orcamento"
          data-section-id="orcamento"
          className="relative overflow-hidden bg-[#043761] py-16 text-white md:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_100%_0%,rgba(63,191,134,0.2),transparent_60%)]"
          />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:px-8">
            <div>
              <h2 className="font-serif text-[1.9rem] font-bold leading-tight md:text-[2.6rem]">
                <span className="text-balance">Peça seu orçamento de {page.form.serviceLabel}</span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
                Responda três perguntas e o WhatsApp abre com a mensagem pronta. Se preferir,
                fale direto com a gente.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <LpWhatsAppLink
                  context={context}
                  message={page.whatsappMessage}
                  ctaId="lp_final_whatsapp"
                  position="lp_final"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <MessageCircle aria-hidden="true" className="h-5 w-5 fill-current" />
                  Conversar no WhatsApp
                </LpWhatsAppLink>
                <LpPhoneLink
                  context={context}
                  ctaId="lp_final_phone"
                  position="lp_final"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/25 px-5 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone aria-hidden="true" className="h-5 w-5" />
                  Ligar {PHONE_DISPLAY}
                </LpPhoneLink>
              </div>
            </div>
            <div className="rounded-3xl bg-card p-6 text-foreground shadow-2xl md:p-8">
              <LpQuoteForm
                context={context}
                baseMessage={page.whatsappMessage}
                itemLabel={page.form.itemLabel}
                itemOptions={page.form.itemOptions}
                quantityLabel={page.form.quantityLabel}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé com contato, site institucional e privacidade */}
      <footer className="bg-[#02253f] pb-28 pt-12 text-sm text-white/70 lg:pb-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 lg:px-8">
          <div>
            <p className="font-bold uppercase tracking-[0.16em] text-white">SR Decorações</p>
            <p className="mt-3 leading-relaxed">
              Lavagem, manutenção e venda de persianas e cortinas para residências e empresas em
              São Paulo e na Grande São Paulo.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="font-semibold text-white">Contato</p>
            <LpPhoneLink
              context={context}
              ctaId="lp_footer_phone"
              position="lp_footer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {PHONE_DISPLAY}
            </LpPhoneLink>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail aria-hidden="true" className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
          </div>
          <nav aria-label="Links do site" className="flex flex-col gap-2.5">
            <p className="font-semibold text-white">Mais informações</p>
            <Link href={page.servicePage.href} className="hover:text-white">
              {page.servicePage.label}
            </Link>
            <Link href="/" className="hover:text-white">
              Todos os serviços da SR Decorações
            </Link>
            <Link href="/politica-de-privacidade" className="hover:text-white">
              Política de privacidade
            </Link>
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-xs text-white/50 lg:px-8">
          © {new Date().getFullYear()} SR Decorações. Todos os direitos reservados.
        </p>
      </footer>

      <LpStickyCta context={context} message={page.whatsappMessage} label="Pedir orçamento" />
      <LpSectionTracker context={context} />
    </>
  );
}
