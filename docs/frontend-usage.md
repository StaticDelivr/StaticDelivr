---
title: "Frontend Usage Guide"
description: "Learn how to use the StaticDelivr npm package and React component for automatic image optimization in your frontend applications."
category: "Integration"
lastUpdated: "17 December 2024"
---

## Frontend Usage Guide

The `staticdelivr` npm package provides a React component for automatic image optimization through our CDN. Perfect for React, Next.js, and other modern JavaScript frameworks.

### Features

- **Automatic CDN URLs**: Generate optimized CDN URLs for your images
- **Format Conversion**: Automatically convert to WebP/AVIF for modern browsers
- **Responsive Images**: Easy width and height configuration
- **Quality Control**: Fine-tune compression for the perfect balance
- **Drop-in Replacement**: Replace `<img>` tags seamlessly

---

## Installation

Install the package via npm or yarn:

```bash
npm install staticdelivr
```

Or with yarn:

```bash
yarn add staticdelivr
```

---

## Quick Start

### Basic Usage

```jsx
import React from 'react';
import { StaticDelivrImage } from 'staticdelivr';

function App() {
  return (
    <StaticDelivrImage
      src="https://example.com/images/hero.jpg"
      width={800}
      height={600}
      quality={80}
      format="webp"
      alt="Hero image"
    />
  );
}

export default App;
```

The component automatically generates an optimized CDN URL:
```
https://cdn.staticdelivr.com/img/images?url=https://example.com/images/hero.jpg&w=800&h=600&q=80&format=webp
```

---

## Configuration

### Global Base URL

For relative image paths, configure a global base URL. This is useful when all your images are hosted on the same domain.

```jsx
// In your app entry point (e.g., _app.tsx, index.tsx)
import { StaticDelivr } from 'staticdelivr';

// Set the base URL once
StaticDelivr.set({ baseURL: 'https://example.com' });
```

Now you can use relative paths:

```jsx
// This will resolve to https://example.com/images/photo.jpg
<StaticDelivrImage
  src="/images/photo.jpg"
  width={400}
/>
```

### Next.js Configuration

In a Next.js app, configure the base URL in `_app.tsx` or `_app.js`:

```jsx
// pages/_app.tsx
import { StaticDelivr } from 'staticdelivr';

// Configure base URL for your domain
StaticDelivr.set({ baseURL: 'https://your-domain.com' });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

---

## Component Props

The `StaticDelivrImage` component accepts the following props:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | string | Yes | - | Image source URL (absolute or relative) |
| `width` | number | No | - | Desired width in pixels |
| `height` | number | No | - | Desired height in pixels |
| `quality` | number | No | 100 | Compression quality (1-100) |
| `format` | string | No | - | Output format: `webp`, `avif`, `jpeg`, `png` |
| `alt` | string | No | `''` | Alt text for accessibility |
| `className` | string | No | - | CSS class names |

---

## Examples

### Responsive Product Images

```jsx
import { StaticDelivrImage } from 'staticdelivr';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <StaticDelivrImage
        src={product.imageUrl}
        width={400}
        height={400}
        quality={85}
        format="webp"
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
```

### Hero Section with Large Image

```jsx
import { StaticDelivrImage } from 'staticdelivr';

function HeroSection() {
  return (
    <section className="hero">
      <StaticDelivrImage
        src="https://example.com/hero-background.jpg"
        width={1920}
        height={1080}
        quality={80}
        format="webp"
        alt="Hero background"
        className="hero-bg"
      />
      <div className="hero-content">
        <h1>Welcome</h1>
      </div>
    </section>
  );
}
```

### Thumbnail Gallery

```jsx
import { StaticDelivrImage } from 'staticdelivr';

function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <StaticDelivrImage
          key={index}
          src={image.url}
          width={150}
          height={150}
          quality={70}
          format="webp"
          alt={image.caption}
          className="thumbnail"
        />
      ))}
    </div>
  );
}
```

### Avatar Component

```jsx
import { StaticDelivrImage } from 'staticdelivr';

function Avatar({ user, size = 'medium' }) {
  const sizes = {
    small: 32,
    medium: 48,
    large: 96
  };

  const dimension = sizes[size];

  return (
    <StaticDelivrImage
      src={user.avatarUrl}
      width={dimension}
      height={dimension}
      quality={90}
      format="webp"
      alt={`${user.name}'s avatar`}
      className={`avatar avatar-${size}`}
    />
  );
}
```

---

## Format Selection Guide

Choose the right format for your use case:

| Format | Best For | Browser Support |
|--------|----------|-----------------|
| `webp` | General use, photos, graphics | 97%+ browsers |
| `avif` | Best compression, modern apps | 85%+ browsers |
| `jpeg` | Legacy support, photos | 100% browsers |
| `png` | Transparency, graphics | 100% browsers |

**Recommendation**: Use `webp` for the best balance of compression and compatibility.

---

## Quality Guidelines

| Quality | File Size | Visual Quality | Use Case |
|---------|-----------|----------------|----------|
| 90-100 | Large | Excellent | Hero images, product photos |
| 75-89 | Medium | Very Good | General content images |
| 50-74 | Small | Good | Thumbnails, backgrounds |
| Below 50 | Tiny | Acceptable | Low-priority images |

**Recommendation**: Start with quality 80 and adjust based on your needs.

---

## Advanced Usage

### Direct URL Generation

If you need to generate CDN URLs without the component:

```jsx
import { StaticDelivr } from 'staticdelivr';

// Get the configured base URL
const { baseURL } = StaticDelivr.get();

// Build your own URL
function buildCdnUrl(imagePath, options = {}) {
  const { width, height, quality = 80, format = 'webp' } = options;
  
  const fullUrl = imagePath.startsWith('http') 
    ? imagePath 
    : `${baseURL}${imagePath}`;
  
  let cdnUrl = `https://cdn.staticdelivr.com/img/images?url=${encodeURIComponent(fullUrl)}`;
  
  if (width) cdnUrl += `&w=${width}`;
  if (height) cdnUrl += `&h=${height}`;
  if (quality) cdnUrl += `&q=${quality}`;
  if (format) cdnUrl += `&format=${format}`;
  
  return cdnUrl;
}

// Usage
const optimizedUrl = buildCdnUrl('/photos/hero.jpg', {
  width: 1200,
  quality: 85,
  format: 'webp'
});
```

### Using with CSS Background Images

```jsx
import { StaticDelivr } from 'staticdelivr';

function HeroWithBackground() {
  const { baseURL } = StaticDelivr.get();
  const imageUrl = `${baseURL}/images/hero-bg.jpg`;
  const cdnUrl = `https://cdn.staticdelivr.com/img/images?url=${encodeURIComponent(imageUrl)}&w=1920&q=75&format=webp`;

  return (
    <div 
      className="hero"
      style={{ backgroundImage: `url(${cdnUrl})` }}
    >
      <h1>Welcome</h1>
    </div>
  );
}
```

### Lazy Loading Integration

```jsx
import { StaticDelivrImage } from 'staticdelivr';

function LazyImage({ src, ...props }) {
  return (
    <StaticDelivrImage
      src={src}
      loading="lazy" // Native lazy loading
      {...props}
    />
  );
}
```

---

## Image Optimization Limits

Our image optimization service has the following limits:

| Limit | Value |
|-------|-------|
| Maximum width | 4000px |
| Maximum height | 4000px |
| Maximum file size | 10MB |
| Supported formats | JPG, JPEG, PNG, GIF, WebP, AVIF, BMP, TIFF |

Images exceeding these limits will return an error.

---

## Migrating from Next/Image

If you're migrating from Next.js's built-in Image component:

**Before (Next/Image):**
```jsx
import Image from 'next/image';

<Image
  src="/photos/hero.jpg"
  width={800}
  height={600}
  quality={80}
  alt="Hero"
/>
```

**After (StaticDelivrImage):**
```jsx
import { StaticDelivrImage, StaticDelivr } from 'staticdelivr';

// In _app.tsx
StaticDelivr.set({ baseURL: 'https://your-domain.com' });

// In component
<StaticDelivrImage
  src="/photos/hero.jpg"
  width={800}
  height={600}
  quality={80}
  format="webp"
  alt="Hero"
/>
```

---

## Troubleshooting

### Images Not Loading

1. **Check the source URL**: Ensure the image URL is accessible publicly
2. **Verify base URL**: Make sure `StaticDelivr.set()` is called before components render
3. **Check for CORS issues**: The origin server must allow our CDN to fetch images

### Poor Image Quality

1. **Increase quality setting**: Try quality 85-95 for important images
2. **Use appropriate format**: PNG for graphics with text, WebP/AVIF for photos
3. **Check source image**: Low-quality source images can't be improved

### Images Too Large

1. **Add width/height props**: Always specify dimensions to avoid serving full-size images
2. **Reduce quality**: Try quality 70-80 for most use cases
3. **Use WebP/AVIF**: These formats provide better compression

---

## Support

- **npm Package**: [npmjs.com/package/staticdelivr](https://www.npmjs.com/package/staticdelivr)
- **GitHub**: [StaticDelivr/StaticDelivr-CDN-NPM-Package](https://github.com/StaticDelivr/StaticDelivr-CDN-NPM-Package)
- **Documentation**: [staticdelivr.com/docs](/docs)
- **Email**: contact@staticdelivr.com
