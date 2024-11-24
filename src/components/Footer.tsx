import React from 'react';

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
          <li><a href="/documentation" className="hover:text-white">Documentation</a></li>
          <li><a href="/network" className="hover:text-white">Network</a></li>
          <li><a href="/stats" className="hover:text-white">Statistics</a></li>
        </ul>
      </div>

      {/* Company Section */}
      <div>
        <h4 className="text-white font-medium mb-4">Company</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="/about" className="hover:text-white">About</a></li>
          <li><a href="/sponsors" className="hover:text-white">Sponsors</a></li>
          <li><a href="/contact" className="hover:text-white">Contact</a></li>
        </ul>
      </div>

      {/* Connect Section */}
      <div>
        <h4 className="text-white font-medium mb-4">Connect</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="https://github.com/coozywana/StaticDelivr" className="hover:text-white">GitHub</a></li>
          <li><a href="/blog" className="hover:text-white">Blog</a></li>
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
