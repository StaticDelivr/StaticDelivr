---
title: "API & Tools"
description: "Complete reference for StaticDelivr CDN URL patterns, image optimization API, and developer tools."
category: "Developer Resources"
lastUpdated: "17 December 2025"
---

## API & Tools Reference

This guide covers all URL patterns and tools available in StaticDelivr.

---

## CDN URL Patterns

### npm Packages

```
https://cdn.staticdelivr.com/npm/package@version/file
```

| Parameter | Description | Example |
|-----------|-------------|----------|
| `package` | npm package name | `react`, `@scope/package` |
| `version` | Semver version | `18.2.0`, `^1.0.0`, `latest` |
| `file` | Path to file | `dist/index.js` |

**Examples:**
```
/npm/react@18.2.0/umd/react.production.min.js
/npm/lodash@4.17.21/lodash.min.js
/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css
```

### GitHub Files

```
https://cdn.staticdelivr.com/gh/user/repo/branch/file
```

| Parameter | Description | Example |
|-----------|-------------|----------|
| `user` | GitHub username/org | `jquery` |
| `repo` | Repository name | `jquery` |
| `branch` | Branch, tag, or commit | `main`, `v3.6.0`, `abc123` |
| `file` | Path to file | `dist/jquery.min.js` |

### WordPress Assets

**Themes:**
```
https://cdn.staticdelivr.com/wp/themes/theme-name/version/file
```

**Plugins:**
```
https://cdn.staticdelivr.com/wp/plugins/plugin-name/tags/version/file
```

**Core:**
```
https://cdn.staticdelivr.com/wp/core/trunk/file
```

### Google Fonts

```
https://cdn.staticdelivr.com/gfonts/css2?family=FontName:wght@400;700&display=swap
```

Drop-in replacement for `fonts.googleapis.com`.

---

## Image Optimization API

```
https://cdn.staticdelivr.com/img/images?url=SOURCE_URL&w=WIDTH&h=HEIGHT&q=QUALITY&format=FORMAT
```

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `url` | string | Yes | - | Source image URL |
| `w` | number | No | original | Width in pixels (max 4000) |
| `h` | number | No | original | Height in pixels (max 4000) |
| `q` | number | No | 80 | Quality 1-100 |
| `format` | string | No | auto | `webp`, `avif`, `jpeg`, `png` |

**Limits:**
- Maximum dimensions: 4000x4000 pixels
- Maximum file size: 10MB
- Supported input formats: JPG, PNG, GIF, WebP, AVIF, BMP, TIFF

**Example:**
```
https://cdn.staticdelivr.com/img/images?url=https://example.com/photo.jpg&w=800&h=600&q=85&format=webp
```

---

## Cache Purge Tool

Clear cached files from our global network.

### Using the Web Interface

Visit [**/tools/purge-cache**](/tools/purge-cache) to purge files via our web interface.

### How to Purge

1. **Enter the full CDN URL** of the asset to purge
2. **Click "Purge Cache"** to initiate the purge
3. **Wait up to 5 minutes** for propagation across all edge locations

### Examples of URLs to Purge

```
https://cdn.staticdelivr.com/npm/react@18.2.0/umd/react.production.min.js
https://cdn.staticdelivr.com/gh/user/repo/main/dist/file.js
https://cdn.staticdelivr.com/img/images?url=https://example.com/photo.jpg&w=800
```

### Notes

- **Exact URL required**: The URL must match exactly, including query parameters
- **Propagation time**: Up to 5 minutes globally
- **Bulk purging**: Contact support for bulk/wildcard purge requests

---

## Rate Limits

StaticDelivr does not impose rate limits for normal usage. However, we reserve the right to limit abusive traffic patterns.  