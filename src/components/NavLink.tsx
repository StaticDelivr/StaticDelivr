import { ReactNode } from 'react';

interface NavLinkProps {
  children: ReactNode;
  href?: string;
}

const NavLink = ({ children, href = "#" }: NavLinkProps) => (
  <a 
    href={href}
    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 px-4 py-2 text-sm font-medium"
  >
    {children}
  </a>
);

export default NavLink;