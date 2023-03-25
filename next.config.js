/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
     dangerouslyAllowSVG: true,
    domains: ['tailwindui.com', "images.unsplash.com"],
  },
}

module.exports = nextConfig
