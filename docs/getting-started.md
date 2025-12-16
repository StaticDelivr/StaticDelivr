---
title: "Getting Started"
description: "Learn how to quickly set up and use StaticDelivr CDN for your projects."
category: "Introduction"
lastUpdated: "17 December 2024"
---

## Getting Started with StaticDelivr

StaticDelivr is a free, open-source CDN designed for delivering static assets globally. With 570+ points of presence worldwide, your files are served from the edge location closest to your users.

## Quick Start

### npm Packages

Serve any npm package instantly:

```
https://cdn.staticdelivr.com/npm/package@version/file
```

**Example:**
```html
<script src="https://cdn.staticdelivr.com/npm/react@18.2.0/umd/react.production.min.js"></script>
```

### GitHub Files

Serve files directly from any public GitHub repository:

```
https://cdn.staticdelivr.com/gh/user/repo/branch/file
```

**Example:**
```html
<script src="https://cdn.staticdelivr.com/gh/jquery/jquery/main/dist/jquery.min.js"></script>
```

### WordPress Assets

Serve WordPress themes, plugins, and core files:

**Themes:**
```html
<link rel="stylesheet" href="https://cdn.staticdelivr.com/wp/themes/theme-name/version/style.css">
```

**Plugins:**
```html
<script src="https://cdn.staticdelivr.com/wp/plugins/plugin-name/tags/version/file.js"></script>
```

### Google Fonts

Load Google Fonts through our CDN:

```html
<link href="https://cdn.staticdelivr.com/gfonts/css2?family=Open+Sans" rel="stylesheet">
```

## URL Structure Reference

| Source | URL Pattern |
|--------|-------------|
| npm | `/npm/package@version/file` |
| GitHub | `/gh/user/repo/branch/file` |
| WordPress Themes | `/wp/themes/name/version/file` |
| WordPress Plugins | `/wp/plugins/name/tags/version/file` |
| WordPress Core | `/wp/core/trunk/file` |
| Google Fonts | `/gfonts/css2?family=FontName` |

## Version Syntax

For npm packages, you can use semantic versioning:

- **Exact version:** `@1.2.3`
- **Latest minor:** `@1.2` (gets latest patch)
- **Latest major:** `@1` (gets latest minor/patch)
- **Latest:** `@latest` or omit version

## Best Practices

1. **Always specify versions in production** - This ensures your site won't break if a package updates.

2. **Use minified files** - Most packages include `.min.js` or `.min.css` versions for smaller file sizes.

3. **Combine with your build process** - For complex applications, use StaticDelivr for third-party libraries while bundling your own code.

## What's Next?

- [Supported Use Cases](/docs/supported-use-cases) - See all the ways you can use StaticDelivr
- [Caching & Performance](/docs/caching-performance) - Understand how caching works
- [API & Tools](/docs/api-tools) - Explore advanced features
