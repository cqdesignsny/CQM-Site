import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "creativequalitymarketing.com",
      },
    ],
  },
};

export default nextConfig;




