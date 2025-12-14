import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import DocsLayout from '../../components/DocsLayout';
import Link from 'next/link';
import Head from 'next/head';
import { AuroraBackground } from '../../components/ui/aurora-background';
import { BentoGrid } from '../../components/ui/bento-grid';
import { BlurFade } from '../../components/ui/blur-fade';
import { BookOpen, Lightbulb, Code, GitPullRequest, LifeBuoy, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CustomBentoCard = ({
  name,
  className,
  Icon,
  description,
  href,
  cta,
  ...props
}) => (
  <Link
    href={href}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-white dark:bg-zinc-900 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300",
      className
    )}
    {...props}
  >
    <div className="p-6 relative z-10 h-full flex flex-col">
      <div className="mb-4 p-2 w-fit rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
        <Icon className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {name}
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 flex-grow mb-4">
        {description}
      </p>
      <div className="flex items-center text-sm font-medium text-zinc-900 dark:text-white group-hover:translate-x-1 transition-transform">
        {cta}
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  </Link>
);

const getCategoryIcon = (category) => {
  switch (category) {
    case "Introduction": return BookOpen;
    case "Use Cases": return Lightbulb;
    case "Developer Resources": return Code;
    case "Contribution": return GitPullRequest;
    case "Help & Support": return LifeBuoy;
    default: return FileText;
  }
};

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
        <title>Documentation - StaticDelivr</title>
        <meta
          name="description"
          content="Explore the comprehensive documentation for StaticDelivr, including guides and resources to help you get started, contribute, and more."
        />
      </Head>

      <DocsLayout docsContent={docsContent} currentSlug="/docs">
        <div className="relative">
          {/* Hero Section */}
          <AuroraBackground className="h-auto min-h-[40vh] py-16 mb-12 rounded-3xl overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
              <BlurFade delay={0.1} inView>
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                  Documentation
                </h1>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Explore our comprehensive guides and resources to help you get started with StaticDelivr.
                </p>
              </BlurFade>
            </div>
          </AuroraBackground>

          {/* Documentation List */}
          <div className="max-w-5xl mx-auto px-4 pb-20">
            {docsContent.map((category, catIndex) => (
              <div key={category.category} className="mb-16">
                <BlurFade delay={0.1 * (catIndex + 3)} inView>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      {React.createElement(getCategoryIcon(category.category), {
                        className: "w-6 h-6 text-zinc-900 dark:text-white"
                      })}
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {category.category}
                    </h2>
                  </div>
                </BlurFade>
                
                <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((doc, index) => (
                    <BlurFade key={index} delay={0.1 * (index + 1)} inView>
                      <CustomBentoCard
                        name={doc.title}
                        description={doc.description}
                        Icon={FileText}
                        href={doc.link}
                        cta="Read Guide"
                        className="h-full"
                      />
                    </BlurFade>
                  ))}
                </BentoGrid>
              </div>
            ))}
          </div>
        </div>
      </DocsLayout>
    </>
  );
};

export default DocsIndex;
