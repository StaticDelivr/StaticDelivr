import React from 'react';
import NavLink from './NavLink';
import { Github } from 'lucide-react';

const Header = () => (
  <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <img src="/api/placeholder/120/40" alt="StaticDelivr Logo" className="h-8" />
        </div>
        <div className="hidden md:flex items-center space-x-1">
          <NavLink>About</NavLink>
          <NavLink>Network</NavLink>
          <NavLink>Documentation</NavLink>
          <NavLink>Sponsors</NavLink>
          <a 
            href="https://github.com/coozywana/StaticDelivr" 
            target="_blank"
            className="ml-4 text-gray-600 hover:text-gray-900"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
