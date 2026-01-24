import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { label: 'npm CDN', href: '/npm' },
      { label: 'GitHub CDN', href: '/github' },
      { label: 'React Component', href: '/package' },
      { label: 'WordPress Plugin', href: '/wordpress' },
      { label: 'Google Fonts', href: '/google-fonts' },
    ],
  },
  platform: {
    title: 'Platform',
    links: [
      { label: 'Network', href: '/network' },
      { label: 'Impact', href: '/impact' },
      { label: 'Statistics', href: '/stats' },
      { label: 'Migrate', href: '/migrate' },
      { label: 'Status', href: 'https://status.staticdelivr.com' },
    ],
  },
  developers: {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api-tools' },
      { label: 'Purge Cache', href: '/tools/purge-cache' },
      { label: 'Contribute', href: '/contribute' },
    ],
  },
  community: {
    title: 'Community',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Sponsors', href: '/sponsors' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Contact', href: '/contact' },
    ],
  },
};

const Footer = () => (
  <footer className="bg-zinc-950 text-zinc-300 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" role="presentation">
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section - spans 4 columns on desktop */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/assets/img/icons/horizontal-white.svg"
                alt="StaticDelivr"
                width={128}
                height={32}
                className="h-8"
              />
            </Link>
            <p className="text-sm text-zinc-400 mb-6 max-w-xs leading-relaxed">
              Infrastructure for open source. Serving billions of requests with a global, sustainable network.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/StaticDelivr/StaticDelivr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" aria-hidden={true} />
              </a>
              <a
                href="https://twitter.com/staticdelivr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" aria-hidden={true} />
              </a>
              <a
                href="mailto:contact@staticdelivr.com"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" aria-hidden={true} />
              </a>
            </div>
          </div>

          {/* Link Sections - Spans remaining 8 columns */}
          <div className="col-span-2 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-white font-semibold text-sm mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-400 hover:text-white transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50">
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-1">Stay Updated</h4>
              <p className="text-sm text-zinc-400">Get the latest news and feature updates delivered to your inbox.</p>
            </div>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 text-sm font-medium rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden={true} />
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex flex-col md:flex-row items-center gap-4 text-zinc-400">
              <p>
                &copy; {new Date().getFullYear()} StaticDelivr. All rights reserved.
              </p>
              <div className="hidden md:block w-1 h-1 bg-zinc-800 rounded-full" />
              <div className="flex gap-4">
                <Link href="/legal/terms-of-service" className="hover:text-zinc-300 transition-colors">Terms</Link>
                <Link href="/legal/privacy-policy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
              </div>
            </div>
            <p className="flex items-center gap-1 text-zinc-400">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" aria-hidden={true} /> for the open source community
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
