import { WhatsAppButton } from "./whatsapp-button"

const steps = [
  {
    number: "01",
    title: "Solicite um Orçamento",
    description:
      "Entre em contato pelo WhatsApp, e-mail ou telefone. Envie fotos e detalhes do serviço desejado. É rápido e fácil!",
  },
  {
    number: "02",
    title: "Receba o Orçamento",
    description:
      "Passamos todos os detalhes do serviço, valores e solucionamos suas dúvidas. Se necessário, agendamos uma visita técnica.",
  },
  {
    number: "03",
    title: "Aprovação e Execução",
    description:
      "Após a aprovação, agendamos o melhor dia para realizar o serviço com nossa equipe especializada.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Como Funciona
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">
              3 Passos Simples para Contratar
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Contratar nossos serviços é simples e rápido. Veja como funciona:
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" />
              )}
              <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {step.number}
              </div>
              <h3 className="mb-3 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <WhatsAppButton
            variant="cta"
            label="Quero Meu Orçamento Grátis"
            message="Olá! Vi o site e gostaria de solicitar um orçamento."
            id="how-it-works-whatsapp"
          />
        </div>
      </div>
    </section>
  )
}
