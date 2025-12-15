import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.staticdelivr.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  // Enable production source maps so diagnostic tools (Lighthouse) can map minified bundles
  // back to original source for debugging and to avoid "Missing source maps" warnings.
  productionBrowserSourceMaps: true,
  // Remove X-Powered-By header
  poweredByHeader: false,
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Output optimization
  output: undefined,
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'lucide-react',
      'motion',
      'sonner',
      'react-intersection-observer',
      'react-scroll-parallax',
    ],
  },
};

export default nextConfig;
