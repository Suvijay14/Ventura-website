import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      /** Strategy Intel uploads up to 10MB before server-side text extraction */
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
