const isDev = process.env.NODE_ENV !== "production";

const cspDev = `
  default-src 'self';

  script-src 'self' 'unsafe-inline' 'unsafe-eval'
    https://www.googletagmanager.com
    https://www.google-analytics.com
    https://tagassistant.google.com;

  connect-src 'self'
    https://www.google-analytics.com
    https://www.googletagmanager.com
    https://tagassistant.google.com;

  img-src 'self' data:
    https://www.google-analytics.com
    https://www.googletagmanager.com;

  frame-src
    https://www.googletagmanager.com
    https://tagassistant.google.com;

  style-src 'self' 'unsafe-inline';
  font-src 'self' https://fonts.gstatic.com;
`;

const cspProd = `
  default-src 'self';

  script-src 'self' 'unsafe-inline'
    https://www.googletagmanager.com
    https://www.google-analytics.com;

  connect-src 'self'
    https://www.google-analytics.com
    https://www.googletagmanager.com;

  img-src 'self' data:
    https://www.google-analytics.com
    https://www.googletagmanager.com;

  frame-src
    https://www.googletagmanager.com;

  style-src 'self' 'unsafe-inline';
  font-src 'self' https://fonts.gstatic.com;
`;

const ContentSecurityPolicy = (isDev ? cspDev : cspProd).replace(/\n/g, "");

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
