import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo-sr-decoracoes.avif"
                alt="SR Decorações"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full"
              />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-bold text-primary-foreground">SR</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
                  Decorações
                </span>
              </div>
            </div>
            <p className="leading-relaxed text-primary-foreground/70">
              Especialistas em lavagem, manutenção e venda de persianas e
              cortinas. Também realizamos lavagem e reforma de sofás,
              instalação de carpete e paviflex, e redes de proteção.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Persianas e Cortinas
            </h3>
            <nav className="mb-6 flex flex-col gap-3">
              <Link
                href="/servicos/lavagem-persianas-cortinas"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Lavagem de Persianas e Cortinas
              </Link>
              <Link
                href="/servicos/manutencao-persianas-cortinas"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Manutenção de Persianas e Cortinas
              </Link>
              <Link
                href="/servicos/venda-persianas-cortinas"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Venda de Persianas e Cortinas
              </Link>
            </nav>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Outros Serviços
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/servicos/lavagem-sofas"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Lavagem de Sofás
              </Link>
              <Link
                href="/servicos/reforma-sofas"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Reforma de Sofás
              </Link>
              <Link
                href="/servicos/instalacao-pisos"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Instalação de Carpete e Paviflex
              </Link>
              <Link
                href="/servicos/redes-de-protecao"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Redes de Proteção
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Contato
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5511924240055"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                (11) 92424-0055
              </a>
              <a
                href="mailto:srdecoracoess@gmail.com"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                srdecoracoess@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Horário de Atendimento
            </h3>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <p>Segunda a Sexta: 8h às 18h</p>
              <p>Sábado: 8h às 13h</p>
              <p className="mt-4 text-xs">
                Atendemos residências e empresas em toda a Grande São Paulo.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} SR Decorações. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
