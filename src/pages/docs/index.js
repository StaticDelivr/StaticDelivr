import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import {
  BookOpen, Lightbulb, Code, GitPullRequest,
  LifeBuoy, FileText, ArrowRight, Terminal
} from 'lucide-react';

import DocsLayout from '../../components/DocsLayout';

import { FadeIn } from '../../components/FadeIn';

// --- Animation Wrapper ---
// Removed to use shared component

// --- Component: Doc Card ---
const DocCard = ({ title, description, href, icon: Icon }) => (
  <Link href={href} className="group relative block h-full">
    <div className="h-full relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" />
      </div>

      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  </Link>
);

const getCategoryIcon = (category) => {
  switch (category) {
    case "Introduction": return BookOpen;
    case "Use Cases": return Lightbulb;
    case "Developer Resources": return Code;
    case "Integration": return Terminal;
    case "Contribution": return GitPullRequest;
    case "Help & Support": return LifeBuoy;
    default: return FileText;
  }
};

export async function getStaticProps() {
  const docsDir = path.join(process.cwd(), 'docs');
  const filenames = fs.readdirSync(docsDir);

  const docsContentMap = {};

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
    "Use Cases": ["Supported Use Cases"],
    "Integration": ["WordPress Integration Guide", "Frontend Usage Guide"],
    "Developer Resources": ["API & Tools", "Caching & Performance"],
    "Contribution": ["Contributing"],
    "Help & Support": ["Contact & Support"]
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
    .sort(([a], [b]) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b))
    .map(([category, items]) => {
      const sortedItems = items.sort((itemA, itemB) => {
        const order = pageOrder[category] || [];
        return order.indexOf(itemA.title) - order.indexOf(itemB.title);
      });
      return { category, items: sortedItems };
    });

  return { props: { docsContent } };
}

const DocsIndex = ({ docsContent }) => {
  return (
    <DocsLayout docsContent={docsContent} currentSlug="/docs">
      <NextSeo
        title="Documentation | StaticDelivr"
        description="Comprehensive guides, API reference, and integration tutorials for StaticDelivr."
        canonical="https://staticdelivr.com/docs"
        openGraph={{
          url: 'https://staticdelivr.com/docs',
          title: 'Documentation | StaticDelivr',
          description: 'Comprehensive guides, API reference, and integration tutorials for StaticDelivr.',
        }}
      />

      <div className="relative py-12 md:py-20 max-w-5xl mx-auto px-6">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Hero Section */}
        <div className="relative z-10 text-center mb-24">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
              <Terminal className="w-3 h-3" />
              <span>$ cd /docs</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Documentation
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Everything you need to integrate, optimize, and deploy with StaticDelivr.
            </p>
          </FadeIn>
        </div>

        {/* Categories Grid */}
        <div className="space-y-20 relative z-10">
          {docsContent.map((category, catIndex) => (
            <div key={category.category}>
              <FadeIn delay={0.1}>
                <div className="flex items-center gap-3 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {React.createElement(getCategoryIcon(category.category), { className: "w-4 h-4" })}
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                    {category.category}
                  </h2>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((doc, index) => (
                  <FadeIn key={index} delay={0.1 + (index * 0.05)}>
                    <DocCard
                      title={doc.title}
                      description={doc.description}
                      icon={FileText}
                      href={doc.link}
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </DocsLayout>
  );
};

export default DocsIndex;