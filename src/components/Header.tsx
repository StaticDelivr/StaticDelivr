"use client";

import React, { useState, useEffect } from 'react';
import { Github, Menu, BookOpen, ArrowRight, Newspaper, Mail, RefreshCw, GitBranch, Globe, BarChart3, Heart, Info, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import ThemeToggle from './ThemeToggle';

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus:bg-zinc-50 focus:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 dark:focus:bg-zinc-900 dark:focus:text-zinc-50",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-500 dark:text-zinc-400 mt-1.5">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// Mobile navigation item component
const MobileNavItem = ({ 
  href, 
  icon, 
  label, 
  onClick 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  onClick?: () => void;
}) => (
  <Link 
    href={href} 
    className="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-colors"
    onClick={onClick}
  >
    <span className="flex-shrink-0 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
      {icon}
    </span>
    <span className="font-medium">{label}</span>
    <ArrowRight className="w-4 h-4 ml-auto text-zinc-400 dark:text-zinc-600" />
  </Link>
);

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Track mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileItemClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled 
        ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-zinc-200 dark:border-zinc-800" 
        : "bg-transparent border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2"
          >
            <Image 
              src={mounted && resolvedTheme === 'dark' ? "/assets/img/icons/horizontal-white.svg" : "/assets/img/icons/horizontal-black.svg"}
              alt="StaticDelivr" 
              width={128}
              height={32}
              className="h-8 dark:invert-0" 
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100")}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/network" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100")}>
                      Network
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/stats" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100")}>
                      Stats
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 data-[state=open]:bg-transparent data-[state=open]:text-zinc-900 dark:data-[state=open]:text-zinc-100">Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                      <ListItem href="/tools/purge-cache" title="Purge Cache">
                        Instantly clear cached files from our global network.
                      </ListItem>
                      <ListItem href="/github" title="GitHub Converter">
                        Convert raw GitHub URLs to production-ready CDN links.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 data-[state=open]:bg-transparent data-[state=open]:text-zinc-900 dark:data-[state=open]:text-zinc-100">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                      <ListItem href="/docs" title="Documentation">
                        Comprehensive guides and API references.
                      </ListItem>
                      <ListItem href="/blog" title="Blog">
                        Latest updates, tutorials, and announcements.
                      </ListItem>
                      <ListItem href="/newsletter" title="Newsletter">
                        Subscribe to get notified about new features.
                      </ListItem>
                      <ListItem href="/sponsors" title="Sponsors">
                        Our partners who make this service possible.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              {/* Theme toggle */}
              <ThemeToggle />

              {/* GitHub button */}
              <a 
                href="https://github.com/StaticDelivr/StaticDelivr" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="w-5 h-5" />
              </a>

              {/* CTA Button */}
              <Link href="/docs/getting-started">
                <Button 
                  size="sm" 
                  className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-medium"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-600 dark:text-zinc-400">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0 bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 [&>button]:hidden">
                <SheetHeader className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-row items-center justify-between space-y-0">
                  <SheetTitle className="text-left">
                    <Image 
                      src={mounted && resolvedTheme === 'dark' ? "/assets/img/icons/horizontal-white.svg" : "/assets/img/icons/horizontal-black.svg"}
                      alt="StaticDelivr" 
                      width={128}
                      height={28}
                      className="h-7" 
                    />
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
                      <X className="w-5 h-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </SheetClose>
                </SheetHeader>
                
                <div className="flex flex-col py-4 h-full overflow-y-auto">
                  {/* Main Navigation */}
                  <div className="px-2 space-y-1">
                    <MobileNavItem 
                      href="/about" 
                      icon={<Info className="w-5 h-5" />} 
                      label="About" 
                      onClick={handleMobileItemClick}
                    />
                    <MobileNavItem 
                      href="/network" 
                      icon={<Globe className="w-5 h-5" />} 
                      label="Network" 
                      onClick={handleMobileItemClick}
                    />
                    <MobileNavItem 
                      href="/stats" 
                      icon={<BarChart3 className="w-5 h-5" />} 
                      label="Stats" 
                      onClick={handleMobileItemClick}
                    />
                    <MobileNavItem 
                      href="/sponsors" 
                      icon={<Heart className="w-5 h-5" />} 
                      label="Sponsors" 
                      onClick={handleMobileItemClick}
                    />
                  </div>
                  
                  {/* Divider */}
                  <div className="my-4 border-t border-zinc-100 dark:border-zinc-800" />
                  
                  {/* Tools Section */}
                  <div className="px-4 mb-2">
                    <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Tools</h3>
                  </div>
                  <div className="px-2 space-y-1">
                    <MobileNavItem 
                      href="/tools/purge-cache" 
                      icon={<RefreshCw className="w-5 h-5" />} 
                      label="Purge Cache" 
                      onClick={handleMobileItemClick}
                    />
                    <MobileNavItem 
                      href="/github" 
                      icon={<GitBranch className="w-5 h-5" />} 
                      label="GitHub Converter" 
                      onClick={handleMobileItemClick}
                    />
                  </div>
                  
                  {/* Divider */}
                  <div className="my-4 border-t border-zinc-100 dark:border-zinc-800" />
                  
                  {/* Resources Section */}
                  <div className="px-4 mb-2">
                    <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Resources</h3>
                  </div>
                  <div className="px-2 space-y-1">
                    <MobileNavItem 
                      href="/blog" 
                      icon={<Newspaper className="w-5 h-5" />} 
                      label="Blog" 
                      onClick={handleMobileItemClick}
                    />
                    <MobileNavItem 
                      href="/newsletter" 
                      icon={<Mail className="w-5 h-5" />} 
                      label="Newsletter" 
                      onClick={handleMobileItemClick}
                    />
                    <MobileNavItem 
                      href="/docs" 
                      icon={<BookOpen className="w-5 h-5" />} 
                      label="Documentation" 
                      onClick={handleMobileItemClick}
                    />
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-6 px-4">
                    <Link href="/docs/getting-started" onClick={handleMobileItemClick}>
                      <Button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Theme Toggle */}
                  <div className="mt-4 px-4">
                    <div className="flex justify-center">
                      <ThemeToggle />
                    </div>
                  </div>
                  
                  {/* GitHub Link */}
                  <div className="mt-4 px-4 pb-8">
                    <a 
                      href="https://github.com/StaticDelivr/StaticDelivr" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      onClick={handleMobileItemClick}
                    >
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
