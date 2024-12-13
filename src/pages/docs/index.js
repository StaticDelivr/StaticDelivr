import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import DocsLayout from '../../components/DocsLayout';
import Link from 'next/link';
import Head from 'next/head'; // Import Head from next/head

export async function getStaticProps() {
  const docsDir = path.join(process.cwd(), 'docs');
  const filenames = fs.readdirSync(docsDir);

  const docsContentMap = {};

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

  filenames.forEach((filename) => {
    const filePath = path.join(docsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    if (!docsContentMap[data.category]) {
      docsContentMap[data.category] = [];
    }

    docsContentMap[data.category].push({
      title: data.title,
      description: data.description,
      link: `/docs/${filename.replace(/\.md$/, '')}`,
    });
  });

  const docsContent = Object.entries(docsContentMap)
    .sort(([a], [b]) => {
      // Sort categories based on the manual category order
      return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
    })
    .map(([category, items]) => {
      // Sort items within each category based on the manual page order
      const sortedItems = items.sort((itemA, itemB) => {
        const order = pageOrder[category];
        return order.indexOf(itemA.title) - order.indexOf(itemB.title);
      });

      return {
        category,
        items: sortedItems,
      };
    });

  return {
    props: {
      docsContent,
    },
  };
}

const DocsIndex = ({ docsContent }) => {
  return (
    <>
      <Head>
        <title>Documentation - StaticDelivr</title> {/* Meta title */}
        <meta
          name="description"
          content="Explore the comprehensive documentation for StaticDelivr, including guides and resources to help you get started, contribute, and more."
        /> {/* Meta description */}
      </Head>

      <DocsLayout docsContent={docsContent} currentSlug="/docs">
        <div className="pt-24 px-4 md:px-6 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl font-bold mb-6 text-foreground">
              Documentation
            </h1>
            <p className="text-xl text-foreground/80">
              Explore our comprehensive guides and resources to help you get started.
            </p>
          </div>

          {/* Documentation List */}
          <div className="max-w-4xl">
            {docsContent.map((category) => (
              <div 
                key={category.category} 
                className="mb-12"
              >
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  {category.category}
                </h2>
                <div className="grid gap-4">
                  {category.items.map((doc, index) => (
                    <Link 
                      key={index} 
                      href={doc.link}
                      className="group block"
                    >
                      <div className="p-6 rounded-lg border border-foreground/10 
                        bg-background/50 hover:border-foreground/20 
                        transition-all duration-200">
                        <h3 className="text-lg font-medium text-foreground 
                          group-hover:text-foreground/90 mb-2">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-foreground/70">
                          {doc.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DocsLayout>
    </>
  );
};

export default DocsIndex;
