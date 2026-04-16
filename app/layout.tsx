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
    telephone: "+55 11 99999-9999",
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-base"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5KMVZ4R8');`,
          }}
        />

        {/* Schema.org */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        {/* Icons */}
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/logo-sr-decoracoes.avif" />
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {/* GTM (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5KMVZ4R8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
