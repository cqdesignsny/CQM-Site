import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "creativequalitymarketing.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/process",
        destination: "/how-marketing-works",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;




