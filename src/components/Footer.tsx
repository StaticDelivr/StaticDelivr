import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Network Map', href: '/network' },
      { label: 'Statistics', href: '/stats' },
      { label: 'Purge Cache', href: '/tools/purge-cache' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'API Reference', href: '/docs/api-tools' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/docs/faq' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Sponsors', href: '/sponsors' },
      { label: 'Contact', href: '/contact' },
      { label: 'Contribute', href: '/contribute' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/legal/terms-of-service' },
      { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    ],
  },
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section - spans 2 columns */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img 
                src="/assets/img/icons/horizontal-white.svg" 
                alt="StaticDelivr" 
                className="h-8" 
              />
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              A free, fast, and reliable CDN for open source projects. Serving billions of requests with 350+ global PoPs.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/StaticDelivr/StaticDelivr" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com/staticdelivr" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contact@staticdelivr.com"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-white font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
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

      {/* Newsletter Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h5 className="text-white font-semibold mb-1">Stay Updated</h5>
              <p className="text-sm text-slate-400">Get notified about new features and updates.</p>
            </div>
            <Link 
              href="/newsletter"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-slate-500">
              &copy; {new Date().getFullYear()} StaticDelivr. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-slate-500">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for the open source community
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
