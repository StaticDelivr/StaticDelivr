import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { Menu, X } from 'lucide-react';

const DocsLayout = ({ children, docsContent, currentSlug }) => {
  const [sortedDocsContent, setSortedDocsContent] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Define the manual order for categories
  const categoryOrder = [
    "Introduction",
    "Use Cases",
    "Developer Resources",
    "Contribution",
    "Help & Support"
  ];

  const pageOrder = {
    "Introduction": ["Getting Started", "FAQ"],
    "Use Cases": ["Supported Use Cases"],
    "Developer Resources": ["API & Tools", "Caching & Performance"],
    "Contribution": ["Contributing"],
    "Help & Support": ["Contact & Support"]
  };

  useEffect(() => {
    const sortedCategories = docsContent
      .sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category))
      .map((category) => ({
        ...category,
        items: category.items.sort((a, b) => 
          pageOrder[category.category].indexOf(a.title) - 
          pageOrder[category.category].indexOf(b.title)
        )
      }));
    setSortedDocsContent(sortedCategories);
  }, [docsContent]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle navigation"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-40
            w-72 bg-white/95 backdrop-blur-sm border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:w-64 overflow-y-auto
            top-16 pt-4 h-[calc(100vh-4rem)]
          `}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation</h2>
            <nav>
              {sortedDocsContent.map((category) => (
                <div key={category.category} className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {category.category}
                  </h3>
                  <ul className="space-y-1">
                    {category.items.map((doc) => (
                      <li key={doc.link}>
                        <Link
                          href={doc.link}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`
                            block px-4 py-2 rounded-lg text-sm transition-all duration-200
                            ${currentSlug === doc.link
                              ? "bg-blue-600 text-white font-medium"
                              : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            }
                          `}
                        >
                          {doc.title}
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
        <main className="flex-1 overflow-y-auto bg-white relative">
          <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
            <div className="prose prose-lg dark:prose-invert prose-headings:font-semibold 
              prose-a:text-blue-600 hover:prose-a:text-blue-500
              prose-code:text-blue-600 dark:prose-code:text-blue-400
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500
              prose-img:rounded-lg prose-img:shadow-md
              max-w-none">
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