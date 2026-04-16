const ContentSecurityPolicy = `
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

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
