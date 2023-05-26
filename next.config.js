/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/store/v1/:path*',
        destination: 'http://34.87.155.107/:path*' // Proxy to Backend
      }
    ]
  }
}
