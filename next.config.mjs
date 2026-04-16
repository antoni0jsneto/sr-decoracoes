/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://googletagmanager.com https://www.google-analytics.com https://google-analytics.com https://www.google.com https://www.google.com.br https://www.gstatic.com https://ssl.google-analytics.com https://tagmanager.google.com",
              "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://googletagmanager.com https://www.google-analytics.com https://google-analytics.com https://www.google.com https://www.google.com.br https://www.gstatic.com https://ssl.google-analytics.com https://tagmanager.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com",
              "img-src 'self' data: https://www.googletagmanager.com https://googletagmanager.com https://www.google-analytics.com https://google-analytics.com https://www.google.com https://www.google.com.br https://ssl.gstatic.com https://www.gstatic.com https://analytics.google.com https://stats.g.doubleclick.net https://*.google.com https://*.googleusercontent.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.googletagmanager.com https://googletagmanager.com https://www.google-analytics.com https://google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://www.google.com.br https://region1.google-analytics.com https://region1.analytics.google.com",
              "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
