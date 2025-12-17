---
title: "Caching & Performance"
description: "Learn how StaticDelivr optimizes asset delivery with intelligent caching and multi-CDN architecture."
category: "Developer Resources"
lastUpdated: "17 December 2025"
---

## Caching & Performance

StaticDelivr leverages powerful caching mechanisms and a global network of providers to ensure fast and reliable delivery of your assets.

---

## Cache Durations by Source

Different asset types have optimized cache durations:

| Source | Cache Duration | Notes |
|--------|---------------|-------|
| **npm packages** (versioned) | 1 year | Immutable - content never changes for a specific version |
| **npm packages** (`@latest`) | 1 day | Refreshed daily to pick up new versions |
| **GitHub files** | 8 days | Good balance between freshness and performance |
| **WordPress themes/plugins** | 1 year | Versioned content is immutable |
| **WordPress core** | 1 year | Core files rarely change |
| **Google Fonts** | 1 year | Font files are immutable |
| **Optimized images** | 8 days | Allows for reprocessing if needed |

---

## Performance Optimization

With **570+ Points of Presence (PoPs)** globally, StaticDelivr ensures sub-50ms latency for users worldwide.

### Key Performance Features

- **Edge Caching**: Assets are cached at edge locations closest to your users
- **Brotli & Gzip Compression**: Automatic compression for text-based assets
- **HTTP/2 & HTTP/3**: Modern protocols for faster parallel loading
- **Browser Caching**: Optimal `Cache-Control` headers for client-side caching

---

## Multi-CDN Architecture

StaticDelivr uses **multiple content delivery providers** with intelligent load balancing:

1. **Primary CDN**: Handles most requests with optimal performance
2. **Fallback CDN**: Automatically activated if primary fails
3. **Origin Failover**: If all CDNs fail, assets load from origin (WordPress plugin)

This ensures **99.99% uptime** even during provider outages.

---

## Image Optimization

For images served through `/img/images`, we provide:

- **Automatic format conversion**: WebP/AVIF based on browser support
- **Quality optimization**: Configurable compression (1-100)
- **Resizing**: On-the-fly dimension adjustments
- **Max limits**: 4000x4000px, 10MB file size

**Example:**
```
https://cdn.staticdelivr.com/img/images?url=https://example.com/photo.jpg&w=800&q=80&format=webp
```

---

## Cache Purging

Need to clear cached content? Use our [Purge Cache tool](/tools/purge-cache).

- Propagation time: Up to 5 minutes globally
- Requires exact file URL
- Bulk purging available via API (coming soon)

---

## Monitoring

Track our network performance:

- [Network Map](/network) - View global PoP locations
- [Statistics](/stats) - Real-time request metrics
