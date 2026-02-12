import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Lavagem de Persianas e Cortinas",
    description:
      "Higienização profissional que elimina ácaros, bactérias e mau cheiro. Suas persianas e cortinas novas de novo!",
    image: "/images/lavagem-persianas.jpg",
    href: "/servicos/lavagem-persianas-cortinas",
    highlight: true,
  },
  {
    title: "Manutenção de Persianas e Cortinas",
    description:
      "Conserto, troca de peças e ajustes. Não troque suas persianas, conserte com quem entende do assunto.",
    image: "/images/manutencao-persianas.jpg",
    href: "/servicos/manutencao-persianas-cortinas",
    highlight: true,
  },
  {
    title: "Venda de Persianas e Cortinas",
    description:
      "Diversos modelos de persianas e cortinas para residências e empresas. Medição e instalação inclusa.",
    image: "/images/venda-persianas.jpg",
    href: "/servicos/venda-persianas-cortinas",
    highlight: false,
  },
  {
    title: "Lavagem de Sofás",
    description:
      "Limpeza profunda e higienização completa do seu sofá. Removemos manchas, ácaros e mau cheiro.",
    image: "/images/lavagem-sofas.jpg",
    href: "/servicos/lavagem-sofas",
    highlight: false,
  },
  {
    title: "Reforma de Sofás",
    description:
      "Reforma completa do seu sofá com tecidos de alta qualidade. Renovamos o estofado e deixamos como novo.",
    image: "/images/reforma-sofas.jpg",
    href: "/servicos/reforma-sofas",
    highlight: false,
  },
  {
    title: "Instalação de Carpete e Paviflex",
    description:
      "Instalação profissional de carpetes e paviflex para residências e empresas. Acabamento perfeito e duradouro.",
    image: "/images/instalacao-pisos.jpg",
    href: "/servicos/instalacao-pisos",
    highlight: false,
  },
  {
    title: "Redes de Proteção",
    description:
      "Instalação de redes de proteção para janelas, sacadas e varandas. Segurança para sua família e seus pets.",
    image: "/images/redes-protecao.jpg",
    href: "/servicos/redes-de-protecao",
    highlight: false,
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Nossos Serviços
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">
              Soluções Completas para sua Casa e Empresa
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Oferecemos serviços especializados de lavagem, manutenção e venda
            de persianas e cortinas, lavagem e reforma de sofás,
            instalação de carpete e paviflex, e redes de proteção.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${
                service.highlight
                  ? "border-primary/30 bg-card ring-1 ring-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {service.highlight && (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Destaque
                </div>
              )}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  Saiba Mais
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
