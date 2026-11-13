import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/** Moldura das páginas legais (política de privacidade e de cookies). */
export function LegalShell({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-background py-16 lg:py-24">
        <article className="mx-auto max-w-3xl px-4 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Atualizada em {updatedAt}.</p>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

/** Destaque de informação que ainda depende de dados da SR ou de revisão jurídica. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-sm font-semibold text-amber-900">
      [PENDENTE: {children}]
    </span>
  );
}
