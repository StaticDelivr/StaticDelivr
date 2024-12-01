import React, { useState, useRef, useEffect } from 'react';
import { Github, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

interface NavLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ children, href = "#", className = "", onClick }: NavLinkProps) => (
  <Link 
    href={href}
    className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 px-4 py-2 text-sm font-medium ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

interface DropdownProps {
  label: string;
  items: {
    heading?: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }[];
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onItemClick?: () => void;
}

const Dropdown = ({ 
  label, 
  items, 
  isOpen, 
  onToggle, 
  isMobile = false, 
  onItemClick 
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={dropdownRef}
      className={`${isMobile ? 'w-full' : 'relative'}`}
    >
      <button
        onClick={onToggle}
        className={`
          flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 
          ${isMobile ? 'w-full text-left px-4 py-3' : 'px-4 py-2 text-sm font-medium'}
        `}
      >
        {label}
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div 
          className={`
            ${isMobile 
              ? 'w-full bg-gray-50 border-t border-gray-100' 
              : 'absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100'
            }
          `}
        >
          {items.map((section, idx) => (
            <div key={idx}>
              {section.heading && (
                <div className={`
                  ${isMobile 
                    ? 'px-4 py-2 text-sm text-gray-600 bg-gray-100' 
                    : 'px-4 py-2 text-sm text-gray-500'
                  }
                `}>
                  {section.heading}
                </div>
              )}
              {section.links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block text-gray-700 hover:text-blue-600 
                    ${isMobile 
                      ? 'px-4 py-3 text-sm hover:bg-gray-100' 
                      : 'px-4 py-2 text-sm hover:bg-gray-50'
                    }
                  `}
                  onClick={onItemClick}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggles the dropdown state for both desktop and mobile
  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(prev => (prev === dropdownName ? null : dropdownName));
  };

  // Handle mobile item clicks to close mobile menu and dropdowns
  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null); // Ensure both mobile and desktop dropdowns are closed
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setOpenDropdown(null); // Close any open dropdowns
  };

  const toolsItems = [
    {
      links: [{ label: 'Purge Cache', href: '/tools/purge-cache' }]
    },
    {
      heading: 'Convert from:',
      links: [{ label: 'GitHub', href: '/github' }]
    }
  ];

  const resourcesItems = [
    {
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Documentation', href: '/docs' }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <Link href="/" onClick={() => setOpenDropdown(null)}>
              <img src="/assets/img/horizontal-black.svg" alt="StaticDelivr Logo" className="h-8" />
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/about" onClick={() => setOpenDropdown(null)}>About</NavLink>
            <NavLink href="/contribute" onClick={() => setOpenDropdown(null)}>Contribute</NavLink>
            <NavLink href="/network" onClick={() => setOpenDropdown(null)}>Network</NavLink>
            <NavLink href="/stats" onClick={() => setOpenDropdown(null)}>Stats</NavLink>
            <NavLink href="/sponsors" onClick={() => setOpenDropdown(null)}>Sponsors</NavLink>
            <Dropdown 
              label="Tools" 
              items={toolsItems} 
              isOpen={openDropdown === 'tools'}
              onToggle={() => handleDropdownToggle('tools')}
            />
            <Dropdown 
              label="Resources" 
              items={resourcesItems}
              isOpen={openDropdown === 'resources'}
              onToggle={() => handleDropdownToggle('resources')}
            />
            <a 
              href="https://github.com/coozywana/StaticDelivr" 
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-gray-600 hover:text-gray-900"
              onClick={() => setOpenDropdown(null)}
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
            <div className="flex flex-col">
              <NavLink 
                href="/about" 
                className="border-t border-gray-100 py-3"
                onClick={handleMobileItemClick}
              >
                About
              </NavLink>
              <NavLink 
                href="/contribute" 
                className="border-t border-gray-100 py-3"
                onClick={handleMobileItemClick}
              >
                Contribute
              </NavLink>
              <NavLink 
                href="/network" 
                className="border-t border-gray-100 py-3"
                onClick={handleMobileItemClick}
              >
                Network
              </NavLink>
              <NavLink 
                href="/stats" 
                className="border-t border-gray-100 py-3"
                onClick={handleMobileItemClick}
              >
                Stats
              </NavLink>
              <NavLink 
                href="/sponsors" 
                className="border-t border-gray-100 py-3"
                onClick={handleMobileItemClick}
              >
                Sponsors
              </NavLink>

              <Dropdown 
                label="Tools" 
                items={toolsItems} 
                isOpen={openDropdown === 'tools'}
                onToggle={() => handleDropdownToggle('tools')}
                isMobile
                onItemClick={handleMobileItemClick}
              />
              
              <Dropdown 
                label="Resources" 
                items={resourcesItems}
                isOpen={openDropdown === 'resources'}
                onToggle={() => handleDropdownToggle('resources')}
                isMobile
                onItemClick={handleMobileItemClick}
              />
              
              <a 
                href="https://github.com/coozywana/StaticDelivr" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 text-sm text-gray-600 hover:text-blue-600 border-t border-gray-100"
                onClick={handleMobileItemClick}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
