import React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title:
    "SR Decorações - Lavagem, Manutenção e Venda de Persianas e Cortinas em São Paulo",
  description:
    "Especialistas em lavagem, manutenção e venda de persianas e cortinas. Lavagem e reforma de sofás. Instalação de carpete, paviflex e redes de proteção. Orçamento grátis via WhatsApp!",
  keywords: [
    "lavagem de persianas",
    "manutenção de persianas",
    "lavagem de cortinas",
    "manutenção de cortinas",
    "venda de persianas",
    "venda de cortinas",
    "lavagem de sofás",
    "reforma de sofás",
    "instalação de carpete",
    "instalação de paviflex",
    "redes de proteção",
    "persianas são paulo",
    "cortinas são paulo",
    "limpeza de persianas",
    "higienização de persianas",
    "conserto de persianas",
  ],
  openGraph: {
    title: "SR Decorações - Persianas, Cortinas, Sofás, Pisos e Redes de Proteção",
    description:
      "Lavagem, manutenção e venda de persianas e cortinas. Lavagem e reforma de sofás. Instalação de carpete, paviflex e redes de proteção. Orçamento grátis!",
    type: "website",
    locale: "pt_BR",
    url: "https://srdecoracoess.com",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
