import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { ClickTracker } from "@/components/analytics/click-tracker";
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

        <ClickTracker />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        {/* Google Tag Manager: carregado após o load para não competir com o LCP.
            Só no domínio oficial (ou com ?gtm_debug, para o Tag Assistant), para
            que localhost e prévias da Vercel não enviem dados ao GA4/Google Ads. */}
        <Script
          id="gtm-base"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){if(w.location.hostname!=='${new URL(SITE_URL).hostname}'&&!/[?&]gtm_debug=/.test(w.location.search))return;w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5KMVZ4R8');`,
          }}
        />
      </body>
    </html>
  );
}
