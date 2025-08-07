/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ippodotea.com",
      },
      {
        protocol: "https",
        hostname: "www.marukyu-koyamaen.co.jp",
        
      },
      {
        protocol: "https",
        hostname: "namimatcha.com"
      },
      {
        protocol: "https",
        hostname: "www.matchaeologist.com"
      }
    ],
  },
};

export default nextConfig;
