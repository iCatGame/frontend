/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'black-protective-chicken-728.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      }
    ]
  },
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};
  
module.exports = nextConfig;