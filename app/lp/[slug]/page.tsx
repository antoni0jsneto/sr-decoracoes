import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageView } from "@/components/lp/landing-page";
import { getLandingPage, landingPages } from "@/lib/landing-pages";
import { PHONE_E164, SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Só as landings configuradas existem; qualquer outro /lp/* responde 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  const url = `${SITE_URL}/lp/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    // Página de campanha paga: fora do índice para não competir com a página
    // de serviço equivalente na busca orgânica. O AdsBot ignora o noindex.
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function LandingRoute({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.metaDescription,
    areaServed: [
      { "@type": "City", name: "São Paulo" },
      { "@type": "AdministrativeArea", name: "Região Metropolitana de São Paulo" },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE_E164,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageView page={page} />
    </>
  );
}
