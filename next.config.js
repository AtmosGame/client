/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig


module.exports = {
  async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'http://34.87.155.107/:path*',
        },
      ]
    },
};