import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/6927ddcc377dce6e20188e35/**",
      },
    ],
  },
};

export default nextConfig;
