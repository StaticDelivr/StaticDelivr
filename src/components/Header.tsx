import React, { useState } from 'react';
import { Github, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface NavLinkProps {
  children: React.ReactNode;
  href?: string;
}

const NavLink = ({ children, href = "#" }: NavLinkProps) => (
  <Link 
    href={href}
    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 px-4 py-2 text-sm font-medium"
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
}

const Dropdown = ({ label, items, isOpen, onToggle }: DropdownProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 px-4 py-2 text-sm font-medium"
      >
        {label}
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
        >
          {items.map((section, idx) => (
            <div key={idx}>
              {section.heading && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  {section.heading}
                </div>
              )}
              {section.links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
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

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
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

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !(event.target as Element).closest('.relative')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <img src="/assets/img/horizontal-black.svg" alt="StaticDelivr Logo" className="h-8" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contribute">Contribute</NavLink>
            <NavLink href="/network">Network</NavLink>
            <NavLink href="/stats">Stats</NavLink>
            <NavLink href="/sponsors">Sponsors</NavLink>
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
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;