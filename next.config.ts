import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  distDir: 'out',
  experimental: {
    mdxRs: true
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Configuration Turbopack
  turbopack: {
    // Configuration pour MDX si nécessaire
  }
};

export default nextConfig;
