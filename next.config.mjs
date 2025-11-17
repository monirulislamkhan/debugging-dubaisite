export default {
  //reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.dubaihousing-ae.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
  env: {
    API_URL: 'https://www.api.dubaihousing-ae.com/',
    token1: 'a08e87c3c377c51ae13e97012be64c6b',
    token2: '48e3e9b27381606fc4b6b583ae5d6257',
  },
  async redirects() {
    return [
      {
        source: '/builder/damac-properties',
        destination: '/developers/damac-properties',
        permanent: true,
      },
      {
        source: '/builder/sobha-properties',
        destination: '/developers/sobha-realty',
        permanent: true,
      },
    ];
  },
};
