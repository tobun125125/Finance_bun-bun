import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure we use the Node version of prisma, not the edge version
  serverExternalPackages: ["@prisma/client", "bcrypt"],

  turbopack: {},

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
};

export default nextConfig;
