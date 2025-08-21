import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '9cx4bspk67.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
