---
title: "WordPress Integration Guide"
description: "Complete guide to installing and configuring the StaticDelivr CDN WordPress plugin for automatic asset optimization and image compression."
category: "Integration"
lastUpdated: "17 December 2024"
---

## WordPress Integration Guide

The **StaticDelivr CDN** WordPress plugin automatically accelerates your WordPress site by rewriting asset URLs to our global CDN and optimizing images on the fly. No API keys, no DNS changes—just install and activate.

### Why Use StaticDelivr for WordPress?

- **Zero Configuration**: Works out of the box with sensible defaults
- **Automatic Image Optimization**: Convert images to WebP/AVIF with up to 95% size reduction
- **Smart Fallback**: If CDN fails, assets automatically load from your origin server
- **570+ Global PoPs**: Sub-50ms latency for visitors worldwide
- **100% Free**: No hidden costs, no usage limits

---

## Installation

### Method 1: WordPress Plugin Directory (Recommended)

1. Log in to your WordPress admin dashboard
2. Navigate to **Plugins → Add New**
3. Search for **"StaticDelivr"**
4. Click **Install Now** on the StaticDelivr CDN plugin
5. Click **Activate**

That's it! Both Assets CDN and Image Optimization are enabled by default.

### Method 2: Manual Installation

1. Download the plugin from [WordPress.org](https://wordpress.org/plugins/staticdelivr/)
2. Upload the `staticdelivr` folder to `/wp-content/plugins/`
3. Activate the plugin through the **Plugins** menu in WordPress

---

## Configuration

After activation, navigate to **Settings → StaticDelivr CDN** to access the configuration panel.

### Assets CDN (CSS & JavaScript)

When enabled, the plugin automatically rewrites URLs for:

- **Theme Assets**: CSS, JavaScript, and fonts from your active theme
- **Plugin Assets**: Scripts and styles from all active plugins
- **WordPress Core**: Core JavaScript libraries like jQuery

**Example Transformation:**

```
Before: https://example.com/wp-content/themes/theme-name/style.css
After:  https://cdn.staticdelivr.com/wp/themes/theme-name/1.0/style.css
```

### Image Optimization

When enabled, images are automatically:

- Compressed using intelligent algorithms
- Converted to modern formats (WebP/AVIF) based on browser support
- Served from our global CDN

**Configuration Options:**

| Option | Description | Default |
|--------|-------------|---------|
| Quality | Image compression quality (1-100) | 80 |
| Format | Output format (Auto, WebP, AVIF, JPEG, PNG) | Auto |

**Auto Format** is recommended—it automatically serves WebP to supported browsers and falls back to JPEG for older browsers.

**Example Transformation:**

```
Before: https://example.com/wp-content/uploads/photo.jpg (2MB)
After:  https://cdn.staticdelivr.com/img/images?url=...&q=80&format=webp (~50KB)
```

### Recommended Settings

For most sites, we recommend:

- ✅ **Assets CDN**: Enabled
- ✅ **Image Optimization**: Enabled
- 🎚️ **Quality**: 80 (good balance of quality and file size)
- 🖼️ **Format**: Auto (best browser compatibility)

---

## How It Works

### URL Rewriting

The plugin hooks into WordPress's asset enqueueing system to rewrite URLs before they're output to the page.

**Theme Assets:**
```
Original:  /wp-content/themes/twentytwentythree/1.0/style.css
CDN:       cdn.staticdelivr.com/wp/themes/twentytwentythree/1.0/style.css
```

**Plugin Assets:**
```
Original:  /wp-content/plugins/woocommerce/assets/js/frontend/woocommerce.min.js
CDN:       cdn.staticdelivr.com/wp/plugins/woocommerce/tags/9.3.3/assets/js/frontend/woocommerce.min.js
```

**Core Files:**
```
Original:  /wp-includes/js/jquery/jquery.min.js
CDN:       cdn.staticdelivr.com/wp/core/trunk/wp-includes/js/jquery/jquery.min.js
```

### Image Processing

Images are processed through our image optimization service which:

1. Fetches the original image from your server
2. Applies compression based on your quality setting
3. Converts to the requested format
4. Caches the result on our global CDN
5. Serves future requests from cache

---

## Smart Fallback System

One of StaticDelivr's most important features is the **Smart Fallback** system. If our CDN ever fails to serve an asset, the plugin automatically loads it from your origin server.

### How Fallback Works

1. The plugin injects a small JavaScript snippet in your page head
2. This script monitors asset loading
3. If a CDN asset fails, it automatically swaps to the origin URL
4. Your site continues working without interruption

### Fallback for Images

Image fallback works differently:

1. When an optimized image fails to load
2. The plugin extracts the original URL from the CDN URL
3. Replaces the `src` with your original image
4. Works with `srcset` for responsive images too

This ensures your site **never breaks** due to CDN issues.

---

## Troubleshooting

### Assets Not Loading from CDN

1. **Clear your cache**: Clear both browser cache and any caching plugin (WP Super Cache, W3 Total Cache, etc.)
2. **Check plugin conflicts**: Temporarily disable other optimization plugins
3. **Verify assets are enqueued properly**: The plugin only works with assets registered via `wp_enqueue_script()` and `wp_enqueue_style()`

### Images Not Optimizing

1. **Check image format**: Supported formats are JPG, JPEG, PNG, GIF, WebP, AVIF, BMP, and TIFF
2. **Check image size**: Images larger than 10MB are not processed
3. **Check image dimensions**: Maximum dimensions are 4000x4000 pixels
4. **Verify the image is in wp-content/uploads**: Only media library images are optimized

### Seeing Original URLs in Source

This is normal! The URL rewriting happens at render time. To verify CDN delivery:

1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Reload the page
4. Look for requests to `cdn.staticdelivr.com`

### Performance Issues After Installation

If you notice slower performance:

1. **Disable other CDN plugins**: Using multiple CDNs can cause conflicts
2. **Check for double optimization**: Disable image optimization if using another service like Cloudflare Polish
3. **Review caching configuration**: Ensure your caching plugin isn't caching unoptimized URLs

---

## Compatibility

### Tested With

- WordPress 5.8 - 6.9
- PHP 7.4 - 8.3
- All major themes and page builders
- WooCommerce
- Elementor
- Divi
- Gutenberg

### Known Compatibility Issues

- **Cloudflare Rocket Loader**: May conflict with fallback script. Add `data-cfasync="false"` exception.
- **Autoptimize**: Works best when StaticDelivr handles CDN delivery (disable Autoptimize's CDN feature)
- **Custom CDN plugins**: Disable other CDN rewriting to avoid conflicts

---

## Frequently Asked Questions

### Is StaticDelivr really free?

Yes! StaticDelivr is a free, open-source CDN. There are no hidden fees, usage limits, or premium tiers.

### Will this work with my theme?

Yes, as long as your theme properly enqueues its assets using WordPress standards (`wp_enqueue_style()` and `wp_enqueue_script()`).

### What happens if StaticDelivr goes down?

Our Smart Fallback system automatically loads assets from your origin server if the CDN is unavailable. Your site will continue working.

### Can I use this with Cloudflare?

Yes! StaticDelivr works alongside Cloudflare. For best results:
- Let StaticDelivr handle image optimization
- Disable Cloudflare's Polish feature to avoid double processing

### How do I purge the CDN cache?

Use our [Purge Cache Tool](/tools/purge-cache) to instantly clear cached files from our global network.

---

## Support

- **Documentation**: [staticdelivr.com/docs](/docs)
- **GitHub Issues**: [Report bugs or request features](https://github.com/StaticDelivr/StaticDelivr-CDN-WP-Plugin/issues)
- **Email**: contact@staticdelivr.com

---

## Changelog

### Version 1.3.0 (Latest)
- Redesigned settings page with modern card-based UI
- Added "Settings" link on plugins list page
- Both features enabled by default on fresh install
- Interactive image quality slider
- Status overview dashboard
- Improved toggle UX

### Version 1.2.1
- Improved image fallback reliability
- Fixed fallback for Cloudflare-protected images
- Enhanced srcset fallback support

### Version 1.2.0
- Added automatic image optimization
- Configurable quality and format settings
- Images include automatic fallback

### Version 1.1.0
- Added automatic fallback mechanism
- Improved reliability with early script injection

### Version 1.0.0
- Initial release
