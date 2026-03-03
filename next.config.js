/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    DEVFOLIO_API_URL: process.env.DEVFOLIO_API_URL,
    DEVFOLIO_API_KEY: process.env.DEVFOLIO_API_KEY,
    DEVFOLIO_USER_UUID: process.env.DEVFOLIO_USER_UUID,
  },
};

module.exports = nextConfig;
