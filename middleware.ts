import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const isGtmPreview =
    url.searchParams.has("gtm_debug") || url.searchParams.has("gtm_preview");

  const csp = isGtmPreview ? getDevCSP() : getProdCSP();

  const response = NextResponse.next();

  response.headers.set(
    "Content-Security-Policy",
    csp.replace(/\n/g, "").replace(/\s{2,}/g, " "),
  );

  return response;
}

function getDevCSP() {
  return `
    default-src 'self';

    script-src 'self' 'unsafe-inline' 'unsafe-eval'
      https://www.googletagmanager.com
      https://www.google-analytics.com
      https://tagassistant.google.com
      https://static.cloudflareinsights.com
      https://googleads.g.doubleclick.net;

    connect-src 'self'
      https://www.google-analytics.com
      https://www.googletagmanager.com
      https://tagassistant.google.com
      https://www.google.com
      https://www.google.com.br
      https://www.googleadservices.com
      https://googleads.g.doubleclick.net;

    img-src 'self' data:
      https://www.google-analytics.com
      https://www.googletagmanager.com
      https://www.google.com
      https://fonts.gstatic.com
      https://googleads.g.doubleclick.net;

    frame-src
      https://www.googletagmanager.com
      https://tagassistant.google.com;

    style-src 'self' 'unsafe-inline'
      https://fonts.googleapis.com
      https://www.googletagmanager.com;

    font-src 'self'
      https://fonts.gstatic.com;
  `;
}

function getProdCSP() {
  return `
    default-src 'self';

    script-src 'self' 'unsafe-inline'
      https://www.googletagmanager.com
      https://www.google-analytics.com
      https://static.cloudflareinsights.com
      https://googleads.g.doubleclick.net;

    connect-src 'self'
      https://www.google-analytics.com
      https://www.googletagmanager.com
      https://www.google.com
      https://www.google.com.br
      https://www.googleadservices.com
      https://googleads.g.doubleclick.net;

    img-src 'self' data:
      https://www.google-analytics.com
      https://www.googletagmanager.com
      https://www.google.com
      https://fonts.gstatic.com
      https://googleads.g.doubleclick.net;

    frame-src
      https://www.googletagmanager.com;

    style-src 'self' 'unsafe-inline'
      https://fonts.googleapis.com;

    font-src 'self'
      https://fonts.gstatic.com;
  `;
}
