import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";
import { ClickTracker } from "@/components/analytics/click-tracker";
import {
  GoogleTagManagerHead,
  GoogleTagManagerLegacy,
  GoogleTagManagerNoscript,
} from "@/components/analytics/google-tag-manager";
import { ConsentManager } from "@/components/consent/consent-manager";
import { CONSENT_ENABLED } from "@/lib/consent";
import { PHONE_E164, SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "SR Decorações - Lavagem, Manutenção e Venda de Persianas e Cortinas em São Paulo",
  description:
    "Especialistas em lavagem profissional, manutenção especializada e venda de persianas e cortinas. Lavagem e reforma de sofás. Instalação de carpete, paviflex e redes de proteção. Mais de 10 anos de experiência. Orçamento grátis via WhatsApp!",
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
  ],
  authors: [{ name: "SR Decorações" }],
  creator: "SR Decorações",
  publisher: "SR Decorações",
  openGraph: {
    title:
      "SR Decorações - Persianas, Cortinas, Sofás, Pisos e Redes de Proteção",
    description:
      "Lavagem profissional, manutenção especializada e venda de persianas e cortinas.",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "SR Decorações",
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "SR Decorações",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SR Decorações",
    description: "Lavagem profissional e manutenção de persianas e cortinas.",
    images: [`${siteUrl}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SR Decorações",
    url: siteUrl,
    telephone: PHONE_E164,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  };

  return (
    <html lang="pt-BR">
      <head>
        <GoogleTagManagerHead />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {/* GTM (noscript): só no modo legado; com consentimento nada carrega sem JS. */}
        <GoogleTagManagerNoscript />

        {children}

        <ClickTracker />
        {CONSENT_ENABLED && <ConsentManager />}

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        {/* GTM. Com o consentimento ligado, o carregamento é feito pelo script do
            <head> (lib/gtm-bootstrap.ts), só após a escolha do visitante. Com ele
            desligado (padrão), vale o comportamento legado. */}
        <GoogleTagManagerLegacy />
      </body>
    </html>
  );
}
