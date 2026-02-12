import {
  Heart,
  BadgeDollarSign,
  Home,
  Wind,
  Clock,
  ShieldCheck,
} from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Saúde",
    description:
      "A lavagem profissional combate ácaros, bactérias, germes e fungos, principais causadores de alergias respiratórias.",
  },
  {
    icon: BadgeDollarSign,
    title: "Economia",
    description:
      "Uma higienização custa apenas uma fração do valor de persianas novas. Não troque, higienize!",
  },
  {
    icon: Home,
    title: "Comodidade",
    description:
      "Nossa equipe realiza os serviços no conforto da sua residência ou empresa, sem complicação.",
  },
  {
    icon: Wind,
    title: "Bem-Estar",
    description:
      "Respire melhor com persianas e cortinas limpas. Um ambiente limpo faz toda a diferença.",
  },
  {
    icon: Clock,
    title: "Agilidade",
    description:
      "Serviços rápidos e efetivos. Cuide do seu dia enquanto cuidamos do seu patrimônio.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia",
    description:
      "Oferecemos garantia de qualidade para todos os nossos serviços e utilizamos produtos certificados.",
  },
]

export function BenefitsSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Por que nos escolher
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">
              Benefícios de uma Lavagem Profissional
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Veja por que milhares de clientes confiam na SR Decorações para
            cuidar de suas persianas, cortinas e sofás.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="flex gap-4 rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
