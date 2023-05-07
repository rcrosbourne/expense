import "./lib/env.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
     dangerouslyAllowSVG: true,
    domains: ['tailwindui.com', "images.unsplash.com", "lh3.googleusercontent.com"],
  },
}

export default nextConfig;
