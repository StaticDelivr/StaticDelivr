/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://staticdelivr.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://staticdelivr.com/sitemap-0.xml',
    ],
  },
  exclude: ['/api/*', '/_next/*', '/admin/*'],
  changefreq: 'daily',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority for important pages
    const priorityMap = {
      '/': 1.0,
      '/docs': 0.9,
      '/docs/getting-started': 0.9,
      '/network': 0.8,
      '/about': 0.8,
      '/sponsors': 0.7,
      '/blog': 0.7,
    };

    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: priorityMap[path] || 0.6,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
  