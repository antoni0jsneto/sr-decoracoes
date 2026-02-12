"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  { label: "Início", href: "/" },
  {
    label: "Persianas e Cortinas",
    children: [
      { label: "Lavagem", href: "/servicos/lavagem-persianas-cortinas" },
      { label: "Manutenção", href: "/servicos/manutencao-persianas-cortinas" },
      { label: "Venda", href: "/servicos/venda-persianas-cortinas" },
    ],
  },
  {
    label: "Sofás",
    children: [
      { label: "Lavagem", href: "/servicos/lavagem-sofas" },
      { label: "Reforma", href: "/servicos/reforma-sofas" },
    ],
  },
  { label: "Instalação de Pisos", href: "/servicos/instalacao-pisos" },
  { label: "Redes de Proteção", href: "/servicos/redes-de-protecao" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter(label: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave() {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/logo-sr-decoracoes.avif"
            alt="SR Decorações"
            width={48}
            height={48}
            className="h-10 w-10 rounded-full lg:h-12 lg:w-12"
            priority
          />
          <div className="flex flex-col gap-0 p-0">
            <span className="text-lg font-bold leading-none">SR</span>
            <span className="text-xs uppercase tracking-widest leading-tight">
              Decorações
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-border bg-card py-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://wa.me/5511924240055?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento."
            target="_blank"
            rel="noopener noreferrer"
            id="header-whatsapp-cta"
            data-conversion="header-whatsapp"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            <Phone className="h-4 w-4" />
            Orçamento Grátis
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-foreground lg:hidden"
          aria-label="Abrir menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="border-b border-border last:border-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileDropdown(
                        openMobileDropdown === item.label ? null : item.label
                      )
                    }
                    className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        openMobileDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileDropdown === item.label && (
                    <div className="flex flex-col pb-3 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-border py-3 text-sm font-medium text-foreground transition-colors last:border-0 hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href="https://wa.me/5511924240055?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              id="mobile-header-whatsapp"
              data-conversion="header-whatsapp-mobile"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Orçamento Grátis pelo WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
