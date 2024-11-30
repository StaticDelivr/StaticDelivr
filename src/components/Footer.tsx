import React from 'react';
import Link from 'next/link'; // Import Link from next/link

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 px-4">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
      {/* Logo and Description */}
      <div>
        <img src="/api/placeholder/120/40" alt="StaticDelivr Logo" className="h-8 mb-4" />
        <p className="text-sm">
          A free CDN for open source projects, powered by a global network.
        </p>
      </div>

      {/* Resources Section */}
      <div>
        <h4 className="text-white font-medium mb-4">Resources</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
          <li><Link href="/network" className="hover:text-white">Network</Link></li>
          <li><Link href="/stats" className="hover:text-white">Statistics</Link></li>
        </ul>
      </div>

      {/* Company Section */}
      <div>
        <h4 className="text-white font-medium mb-4">Company</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="/about" className="hover:text-white">About</Link></li>
          <li><Link href="/sponsors" className="hover:text-white">Sponsors</Link></li>
          <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
        </ul>
      </div>

      {/* Connect Section */}
      <div>
        <h4 className="text-white font-medium mb-4">Connect</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="https://github.com/coozywana/StaticDelivr" className="hover:text-white">GitHub</a></li>
          <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          <li><a href="mailto:contact@staticdelivr.com" className="hover:text-white">Email Us</a></li>
        </ul>
      </div>
    </div>

    {/* Footer Bottom Section */}
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm text-center">
      <p>&copy; {new Date().getFullYear()} StaticDelivr. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
