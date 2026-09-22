import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    /*
     * Understudy lives in a sibling directory to another Next.js app in this
     * repo, so there are two lockfiles and Turbopack would otherwise infer
     * the wrong workspace root. Pin it to this project.
     */
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
