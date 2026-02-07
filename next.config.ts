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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=2592000, stale-while-revalidate=86400'
          },
          {
            key: 'Surrogate-Control',
            value: 'max-age=2592000'
          }
        ],
      },
    ];
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
  serverExternalPackages: ["@appsignal/nodejs"],
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
