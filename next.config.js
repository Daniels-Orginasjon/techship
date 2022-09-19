/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["loremflickr.com"],
  },
};

module.exports = nextConfig;
