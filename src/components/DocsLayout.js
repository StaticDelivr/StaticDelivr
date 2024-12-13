import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

const DocsLayout = ({ children, docsContent, currentSlug }) => {
  const [sortedDocsContent, setSortedDocsContent] = useState([]);

  // Define the manual order for categories
  const categoryOrder = [
    "Introduction",
    "Use Cases",
    "Developer Resources",
    "Contribution",
    "Help & Support"
  ];

  // Define the manual order for pages within each category
  const pageOrder = {
    "Introduction": [
      "Getting Started",
      "FAQ"
    ],
    "Use Cases": [
      "Supported Use Cases"
    ],
    "Developer Resources": [
      "API & Tools",
      "Caching & Performance"
    ],
    "Contribution": [
      "Contributing"
    ],
    "Help & Support": [
      "Contact & Support"
    ]
  };

  // Sort categories and pages when the component mounts
  useEffect(() => {
    const sortedCategories = docsContent
      .sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category))
      .map((category) => {
        const sortedItems = category.items.sort((a, b) => {
          return pageOrder[category.category].indexOf(a.title) - pageOrder[category.category].indexOf(b.title);
        });
        return { ...category, items: sortedItems };
      });
    setSortedDocsContent(sortedCategories);
  }, [docsContent]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation</h2>
            <nav>
              {sortedDocsContent.map((category) => (
                <div key={category.category} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {category.category}
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {category.items.map((doc) => (
                      <li key={doc.link}>
                        <Link
                          href={doc.link}
                          className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                            currentSlug === doc.link
                              ? "bg-blue-600 text-white font-medium"
                              : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                          }`}
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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto p-8">
            <div className="prose prose-lg">
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
