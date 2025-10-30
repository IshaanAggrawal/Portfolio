// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow images from any HTTPS domain
      },
    ],
  },
};

export default nextConfig;
