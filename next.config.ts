import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained server build (.next/standalone) for the Docker image.
  output: "standalone",
};

export default nextConfig;
