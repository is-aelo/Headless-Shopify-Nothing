import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
    // Add this to tell Next.js we are okay with Turbopack
    turbopack: {},
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  /* REMOVED WEBPACK BLOCK: 
     Next.js (especially with Turbopack) handles woff2, ttf, etc. 
     automatically when using next/font/local.
  */
};

export default nextConfig;
