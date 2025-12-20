const defaultSEOConfig = {
    title: 'StaticDelivr - The Free Open Source CDN',
    titleTemplate: '%s | StaticDelivr',
    defaultTitle: 'StaticDelivr - The Free Open Source CDN',
    description: 'A free, fast, and transparent CDN for open source. Serve npm packages, GitHub files, WordPress plugins, and Google Fonts from 570+ global edge nodes.',
    canonical: 'https://staticdelivr.com',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://staticdelivr.com',
        site_name: 'StaticDelivr',
        images: [
            {
                url: 'https://staticdelivr.com/assets/img/og-image.png',
                width: 1200,
                height: 630,
                alt: 'StaticDelivr - Infrastructure for Open Source',
            },
        ],
    },
    twitter: {
        handle: '@staticdelivr',
        site: '@staticdelivr',
        cardType: 'summary_large_image',
    },
    additionalMetaTags: [
        {
            name: 'keywords',
            content: 'free CDN, open source CDN, npm CDN, GitHub CDN, WordPress CDN, jsDelivr alternative, global CDN, content delivery network',
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
        },
    ],
};

export default defaultSEOConfig;
