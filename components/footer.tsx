import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { CookiePreferencesButton } from "@/components/consent/cookie-preferences-button";
import { CONSENT_ENABLED } from "@/lib/consent";
import { CONTACT_EMAIL, PHONE_DISPLAY, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo-128.webp"
                  alt="SR Decorações"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain rounded-full"
                />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/90">
                  Persianas & <br /> Decorações
                </span>
              </div>
            </div>

            <p className="leading-relaxed text-primary-foreground/70">
              Especialistas em lavagem, manutenção e venda de persianas e
              cortinas. Também realizamos lavagem e reforma de sofás, instalação
              de carpete e paviflex, e redes de proteção.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Persianas e Cortinas
            </h3>
            <nav className="mb-6 flex flex-col gap-3">
              <Link
                href="/servicos/persianas/lavagem"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Lavagem de Persianas e Cortinas
              </Link>
              <Link
                href="/servicos/persianas/manutencao"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                Manutenção de Persianas e Cortinas
              </Link>
              <Link
                href="/servicos/persianas/venda"
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
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp"
                data-button-id="footer-whatsapp"
                data-button-location="rodape"
                data-contact-intent="contato_geral"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                data-button-id="footer-email"
                data-button-location="rodape"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_EMAIL}
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
          <Link
            href="/politica-de-privacidade"
            className="mt-2 inline-block underline-offset-4 hover:text-primary-foreground hover:underline"
          >
            Política de privacidade
          </Link>
          {CONSENT_ENABLED && (
            <>
              <span aria-hidden="true" className="mx-2">·</span>
              <Link
                href="/politica-de-cookies"
                className="inline-block underline-offset-4 hover:text-primary-foreground hover:underline"
              >
                Política de cookies
              </Link>
              <span aria-hidden="true" className="mx-2">·</span>
              <CookiePreferencesButton className="inline-block underline underline-offset-4 hover:text-primary-foreground" />
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
