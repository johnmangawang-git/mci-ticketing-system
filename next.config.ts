import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Fix for Next.js 15 - moved from experimental
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
