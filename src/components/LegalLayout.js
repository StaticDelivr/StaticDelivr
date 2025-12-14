import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LegalLayout = ({ children, title, meta }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigation = [
    { 
      category: "Legal Documents",
      items: [
        { title: 'Privacy Policy', link: '/legal/privacy-policy' },
        { title: 'Terms of Service', link: '/legal/terms-of-service' }
      ]
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Head>
        <title>{title} - StaticDelivr</title>
        <meta name="description" content={meta} />
      </Head>
      <Header />
      
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-4 rounded-full shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        aria-label="Toggle navigation"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed md:static inset-y-0 left-0 z-40",
            "w-72 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-r border-zinc-200 dark:border-zinc-800",
            "transform transition-transform duration-300 ease-in-out",
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            "md:translate-x-0 md:w-64 overflow-y-auto",
            "top-16 pt-4 h-[calc(100vh-4rem)]"
          )}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Legal</h2>
            <nav>
              {navigation.map((category) => (
                <div key={category.category} className="mb-8">
                  <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                    {category.category}
                  </h3>
                  <ul className="space-y-1">
                    {category.items.map((item) => (
                      <li key={item.link}>
                        <Link
                          href={item.link}
                          onClick={() => setIsSidebarOpen(false)}
                          className={cn(
                            "block px-4 py-2 rounded-lg text-sm transition-all duration-200",
                            router.pathname === item.link
                              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                          )}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 w-full md:max-w-[calc(100vw-16rem)] bg-white dark:bg-zinc-950">
          <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
            <div className="prose prose-lg prose-zinc dark:prose-invert 
              prose-headings:font-semibold prose-headings:tracking-tight
              prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
              prose-code:text-zinc-900 dark:prose-code:text-zinc-200 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
              prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-700 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800
              max-w-none">
              <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white tracking-tight">{title}</h1>
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LegalLayout;