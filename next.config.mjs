import "./lib/env.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     dangerouslyAllowSVG: true,
    domains: ['tailwindui.com', "images.unsplash.com", "lh3.googleusercontent.com", "salient.tailwindui.com"],
  },
}
export default nextConfig;
