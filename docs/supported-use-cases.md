---
title: "Supported Use Cases"
description: "Learn about different use cases for StaticDelivr CDN."
category: "Use Cases"
lastUpdated: "30 November 2024"
---
## Supported Use Cases

StaticDelivr supports various use cases for delivering static content globally. Whether you are working with GitHub, npm, WordPress, Google Fonts, or other static assets, we have you covered.

### 1. **Serving JavaScript Libraries:**
   - Easily serve libraries like React, Vue, and jQuery from npm:
     ```html
     <script src="https://cdn.staticdelivr.com/npm/react@16.7.0/umd/react.production.min.js"></script>
     ```

### 2. **Hosting Static Files from GitHub:**
   - Directly serve your GitHub repository files with StaticDelivr. Example:
     ```html
     <script src="https://cdn.staticdelivr.com/gh/jquery/jquery/3.6.0/dist/jquery.min.js"></script>
     ```

### 3. **Images and Stylesheets:**
   - Use StaticDelivr to serve images, CSS, JS, and other assets hosted in GitHub repositories or npm packages.

### 4. **WordPress Themes, Plugins, and Core Files:**
   - Serve WordPress themes, plugins, and core files effortlessly:
   
     **WordPress Themes:**
     ```html
     <link rel="stylesheet" href="https://cdn.staticdelivr.com/wp/themes/twentytwentythree/1.0/style.css">
     ```
     **WordPress Plugins:**
     ```html
     <script src="https://cdn.staticdelivr.com/wp/plugins/woocommerce/tags/9.3.3/assets/js/frontend/woocommerce.min.js"></script>
     ```
     **WordPress Core Files:**
     ```html
     <script src="https://cdn.staticdelivr.com/wp/core/trunk/wp-includes/js/jquery/jquery.min.js"></script>
     ```

### 5. **Loading Google Fonts:**
   - Use StaticDelivr to load Google Fonts with ease:

     **Example:**
     ```html
     <link href="https://cdn.staticdelivr.com/gfonts/css2?family=Open+Sans" rel="stylesheet">
     ```
