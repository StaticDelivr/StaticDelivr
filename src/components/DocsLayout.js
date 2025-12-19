import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { Menu, X, ChevronRight, Book } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Sorting Configuration ---
const categoryOrder = [
  "Introduction",
  "Integration",
  "Use Cases",
  "Developer Resources",
  "Contribution",
  "Help & Support"
];

const pageOrder = {
  "Introduction": ["Getting Started", "FAQ"],
  "Integration": ["WordPress Integration Guide", "Frontend Usage Guide"],
  "Use Cases": ["Supported Use Cases"],
  "Developer Resources": ["API & Tools", "Caching & Performance"],
  "Contribution": ["Contributing"],
  "Help & Support": ["Contact & Support"]
};

const DocsLayout = ({ children, docsContent, currentSlug }) => {
  const [sortedDocsContent, setSortedDocsContent] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Handle Sorting
  useEffect(() => {
    if (!docsContent) return;
    
    const sortedCategories = [...docsContent]
      .sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      })
      .map((category) => ({
        ...category,
        items: [...category.items].sort((a, b) => {
          const order = pageOrder[category.category];
          if (!order) return 0;
          const aIndex = order.indexOf(a.title);
          const bIndex = order.indexOf(b.title);
          return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
        })
      }));
    setSortedDocsContent(sortedCategories);
  }, [docsContent]);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [router.asPath]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <Header />
      
      {/* Mobile Toggle Button (Floating) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-white hover:scale-105 transition-transform"
        aria-label="Toggle navigation"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main Container */}
      {/* Removed 'max-w-7xl mx-auto' so it spans full width */}
      <div className="flex flex-1 pt-20 w-full">
        
        {/* --- Sidebar --- */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform bg-white/95 dark:bg-black/95 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-72 md:bg-transparent md:border-none md:h-[calc(100vh-5rem)] md:sticky md:top-20 overflow-y-auto pb-10 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800",
            isSidebarOpen ? 'translate-x-0 pt-20' : '-translate-x-full'
          )}
        >
          {/* Added md:pl-8 to give sidebar breathing room from left edge */}
          <div className="p-6 md:p-0 md:py-8 md:pl-8 md:pr-4">
            <div className="flex items-center gap-2 mb-8 px-2 text-zinc-900 dark:text-white font-bold tracking-tight">
               <Book className="w-5 h-5" />
               <span>Documentation</span>
            </div>

            <nav className="space-y-8">
              {sortedDocsContent.map((category) => (
                <div key={category.category}>
                  <h3 className="px-2 text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                    {category.category}
                  </h3>
                  <ul className="space-y-0.5">
                    {category.items.map((doc) => {
                      const isActive = currentSlug === doc.link;
                      return (
                        <li key={doc.link}>
                          <Link
                            href={doc.link}
                            className={cn(
                              "group flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200",
                              isActive
                                ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50"
                            )}
                          >
                            <span className="truncate">{doc.title}</span>
                            {isActive && <ChevronRight className="w-3 h-3 opacity-50" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* --- Main Content Area --- */}
        <main className="flex-1 w-full min-w-0 bg-white dark:bg-black md:rounded-tl-3xl border-l border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05)] overflow-hidden relative">
           {/* Subtle internal glow */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent opacity-50" />
           
           <div className="p-4 md:p-10 lg:p-14 min-h-[calc(100vh-5rem)]">
              {/* Added container here so text doesn't stretch too wide */}
              <div className="max-w-4xl mx-auto md:mx-0">
                {children}
              </div>
           </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocsLayout;