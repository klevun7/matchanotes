/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ippodotea.com',
      },
      {
        protocol: 'https',
        hostname: 'www.marukyu-koyamaen.co.jp',
      },
    ],
  },
};

export default nextConfig;
