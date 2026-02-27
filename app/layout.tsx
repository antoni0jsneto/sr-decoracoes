import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const siteUrl = "https://srdecoracoess.com";

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
    "persianas persianão",
    "cortinas cortinão",
    "lavagem de sofás",
    "reforma de sofás",
    "limpeza de sofás",
    "instalação de carpete",
    "instalação de paviflex",
    "redes de proteção",
    "redes de proteção infantil",
    "persianas são paulo",
    "cortinas são paulo",
    "sofas são paulo",
    "limpeza de persianas profissional",
    "higienização de persianas",
    "conserto de persianas",
    "orçamento grátis persianas",
  ],
  authors: [{ name: "SR Decorações" }],
  creator: "SR Decorações",
  publisher: "SR Decorações",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title:
      "SR Decorações - Persianas, Cortinas, Sofás, Pisos e Redes de Proteção",
    description:
      "Lavagem profissional, manutenção especializada e venda de persianas e cortinas. Lavagem e reforma de sofás. Instalação de carpete, paviflex e redes de proteção. Orçamento grátis via WhatsApp!",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "SR Decorações",
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "SR Decorações - Especialistas em Persianas, Cortinas, Sofás e Pisos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SR Decorações - Persianas, Cortinas, Sofás, Pisos e Redes de Proteção",
    description:
      "Lavagem profissional, manutenção especializada e venda de persianas e cortinas. Orçamento grátis via WhatsApp!",
    images: [`${siteUrl}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "seu-google-site-verification-aqui",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteUrl,
    name: "SR Decorações",
    description:
      "Especialistas em lavagem profissional, manutenção especializada e venda de persianas e cortinas. Também oferecemos lavagem e reforma de sofás, instalação de carpete, paviflex e redes de proteção.",
    url: siteUrl,
    telephone: "+55 11 99999-9999",
    priceRange: "$$",
    image: `${siteUrl}/images/logo-sr-decoracoes.avif`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sua rua e número",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "00000-000",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "São Paulo" },
      { "@type": "City", name: "Guarulhos" },
      { "@type": "City", name: "Osasco" },
    ],
    sameAs: [
      "https://www.facebook.com/srdecoracoes",
      "https://www.instagram.com/srdecoracoes",
      "https://wa.me/5511999999999",
    ],
    knowsAbout: [
      "Lavagem de Persianas",
      "Manutenção de Persianas",
      "Venda de Persianas",
      "Lavagem de Cortinas",
      "Manutenção de Cortinas",
      "Venda de Cortinas",
      "Lavagem de Sofás",
      "Reforma de Sofás",
      "Instalação de Carpete",
      "Instalação de Paviflex",
      "Redes de Proteção",
    ],
    hasMap: "https://maps.google.com/?q=sr+decoracoes+sao+paulo",

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  };

  return (
    <html lang="pt-BR">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <meta
          name="google-site-verification"
          content="seu-google-site-verification-aqui"
        />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="shortcut icon" href="/images/logo.ico" />
        <link
          rel="icon"
          type="image/avif"
          href="/images/logo-sr-decoracoes.avif"
        />
        <link rel="apple-touch-icon" href="/images/logo-sr-decoracoes.avif" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17864340115"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'AW-17864340115');`,
          }}
        />
        <Script
          id="gtag-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-17864340115/9dQ-CM325f0bEJPlsMZC',
      'event_callback': callback
  });
  return false;
}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
