---
title: "Supported Use Cases"
description: "Learn about different use cases for StaticDelivr CDN including npm packages, GitHub files, WordPress assets, Google Fonts, and image optimization."
category: "Use Cases"
lastUpdated: "17 December 2025"
---
## Supported Use Cases

StaticDelivr supports various use cases for delivering static content globally. Whether you're working with npm, GitHub, WordPress, Google Fonts, or need image optimization, we have you covered.

---

### 1. Serving JavaScript Libraries from npm

Easily serve any library from npm's 2M+ packages:

```html
<!-- React 18 -->
<script src="https://cdn.staticdelivr.com/npm/react@18.2.0/umd/react.production.min.js"></script>

<!-- Vue 3 -->
<script src="https://cdn.staticdelivr.com/npm/vue@3.4.21/dist/vue.global.prod.js"></script>

<!-- jQuery -->
<script src="https://cdn.staticdelivr.com/npm/jquery@3.7.1/dist/jquery.min.js"></script>
```

---

### 2. Hosting Static Files from GitHub

Serve files directly from any public GitHub repository:

```html
<script src="https://cdn.staticdelivr.com/gh/jquery/jquery/3.7.1/dist/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.staticdelivr.com/gh/user/repo/main/dist/styles.css">
```

Supports branches, tags, and commit SHAs.

---

### 3. WordPress Themes, Plugins, and Core Files

Serve WordPress assets effortlessly:

**Themes:**
```html
<link rel="stylesheet" href="https://cdn.staticdelivr.com/wp/themes/twentytwentyfour/1.0/style.css">
```

**Plugins:**
```html
<script src="https://cdn.staticdelivr.com/wp/plugins/woocommerce/tags/9.3.3/assets/js/frontend/woocommerce.min.js"></script>
```

**Core Files:**
```html
<script src="https://cdn.staticdelivr.com/wp/core/trunk/wp-includes/js/jquery/jquery.min.js"></script>
```

**Or use our WordPress Plugin** for automatic URL rewriting and image optimization: [Learn more](/wordpress)

---

### 4. Loading Google Fonts (Privacy-First)

Serve Google Fonts without tracking—GDPR compliant:

```html
<link href="https://cdn.staticdelivr.com/gfonts/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Drop-in replacement: just change `fonts.googleapis.com` to `cdn.staticdelivr.com/gfonts`.

---

### 5. Image Optimization

Optimize any image on-the-fly with automatic format conversion:

```html
<!-- Original 2MB image optimized to ~50KB WebP -->
<img src="https://cdn.staticdelivr.com/img/images?url=https://example.com/photo.jpg&w=800&q=80&format=webp">
```

**Parameters:**
- `w` - Width in pixels
- `h` - Height in pixels  
- `q` - Quality (1-100)
- `format` - Output format (`webp`, `avif`, `jpeg`, `png`)

---

### 6. React/Next.js Image Component

Use our npm package for automatic image optimization in React apps:

```jsx
import { StaticDelivrImage } from 'staticdelivr';

<StaticDelivrImage
  src="https://example.com/photo.jpg"
  width={800}
  height={600}
  quality={85}
  format="webp"
  alt="Optimized image"
/>
```

[Learn more about the React component](/docs/frontend-usage)
