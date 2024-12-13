---
title: "Cache Purge Tool"
description: "Use the StaticDelivr interface to manage cache and update your assets."
category: "Developer Resources"
lastUpdated: "30 November 2024"
---

## Cache Purge Tool

StaticDelivr offers an intuitive interface for cache management, allowing you to ensure users always access the latest versions of your assets.

### Accessing the Cache Purge Tool

To purge the cache for a specific asset, visit the **Purge Cache** page at:  
[**/tools/purge-cache**](https://cdn.staticdelivr.com/tools/purge-cache)

### How to Use the Tool

1. **Enter the Asset URL:**  
   Provide the full URL of the asset you want to purge. Examples:  
   - GitHub asset:  
     ```
     https://cdn.staticdelivr.com/gh/user/repo/branch/file
     ```  
   - npm package asset:  
     ```
     https://cdn.staticdelivr.com/npm/package@version/file
     ```

2. **Click "Purge Cache":**  
   Initiate the process to clear the outdated version of your asset.

### Important Notes

- **Propagation Time:** Cache purging may take up to **5 minutes** to fully propagate across all edge locations.  
- **Complete URL Required:** Ensure you provide the exact path to the asset.  
- **Bulk/Wildcard Requests:** For bulk or wildcard cache purging, please refer to our API (coming soon).  