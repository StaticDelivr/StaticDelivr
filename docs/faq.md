---
title: "FAQ"
description: "Frequently Asked Questions about StaticDelivr CDN, WordPress plugin, and npm package."
category: "Introduction"
lastUpdated: "17 December 2025"
---
## Frequently Asked Questions (FAQ)

Here are common questions about using StaticDelivr:

### General

#### What is StaticDelivr?
StaticDelivr is a free, open-source CDN designed to serve static assets globally with 570+ Points of Presence. We support npm packages, GitHub files, WordPress assets, and Google Fonts.

#### Is StaticDelivr really free?
Yes! StaticDelivr is 100% free for open-source projects with no usage limits, no API keys required, and no hidden costs.

#### How is StaticDelivr different from jsDelivr?
StaticDelivr is an alternative to jsDelivr with multi-CDN architecture, automatic failover, and additional features like image optimization and a WordPress plugin.

### npm CDN

#### Can I use any npm package?
Yes, you can serve any public npm package via our CDN. Just use the URL format:
```
https://cdn.staticdelivr.com/npm/package@version/file
```

#### What version formats are supported?
- Exact version: `@1.2.3`
- Latest minor: `@1.2` (gets latest patch)
- Latest major: `@1` (gets latest minor/patch)
- Latest: `@latest` or omit version entirely

### GitHub CDN

#### Can I use StaticDelivr for private repositories?
No, StaticDelivr currently supports only public repositories on GitHub. Private repositories are not supported.

#### How long are files cached?
GitHub files are cached for 8 days. Even if files are deleted from GitHub, they remain available on our CDN during the cache period.

### WordPress Plugin

#### What does the WordPress plugin do?
The plugin automatically rewrites your theme, plugin, and core file URLs to use our CDN, plus provides automatic image optimization to WebP/AVIF formats.

#### How much can image optimization reduce file sizes?
Image optimization can reduce file sizes by up to 95%. A 2MB image can become as small as 20KB without noticeable quality loss.

#### What happens if the CDN goes down?
The plugin includes a Smart Fallback system that automatically loads assets from your origin server if the CDN fails. Your site never breaks.

### npm Package (React Component)

#### What is the staticdelivr npm package?
It's a React component library that provides `StaticDelivrImage` for automatic image optimization through our CDN. Perfect for React and Next.js applications.

#### How do I install it?
```bash
npm install staticdelivr
```

### Support

#### How can I report issues?
You can report issues through our [GitHub repository](https://github.com/StaticDelivr/StaticDelivr/issues).

#### How do I purge cached files?
Use our [Purge Cache tool](/tools/purge-cache) to instantly clear cached files from our global network.
