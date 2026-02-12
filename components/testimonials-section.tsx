import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maria Santos",
    role: "Residência - Zona Sul",
    text: "Contratei a SR Decorações para lavagem das minhas persianas e fiquei impressionada com o resultado. Ficaram como novas! Recomendo de olhos fechados.",
    rating: 5,
  },
  {
    name: "Carlos Ferreira",
    role: "Escritório - Centro",
    text: "A equipe foi muito profissional e pontual. Fizeram a manutenção de todas as persianas do escritório e o serviço ficou impecável. Preço justo e ótimo atendimento.",
    rating: 5,
  },
  {
    name: "Ana Paula Lima",
    role: "Residência - Zona Oeste",
    text: "Fiz a lavagem do meu sofá e a instalação de pisos em dois quartos. Trabalho excelente, equipe educada e resultado surpreendente. Super indico!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Depoimentos
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">
              O que Nossos Clientes Dizem
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-2xl bg-card p-8 shadow-sm"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={`star-${testimonial.name}-${i}`}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="mb-6 flex-1 text-sm italic leading-relaxed text-foreground">
                {`"${testimonial.text}"`}
              </p>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
