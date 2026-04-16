const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
  img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com;
  connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self' https://fonts.gstatic.com;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
