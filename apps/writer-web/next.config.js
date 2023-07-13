/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'placehold.co'],
  },
  experimental: {
    externalDir: true,
  },
}

module.exports = nextConfig
