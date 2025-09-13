import type { NextConfig } from "next";
import { config } from "process";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      "bufferutil": "commonjs bufferutil"
    })
  },
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
