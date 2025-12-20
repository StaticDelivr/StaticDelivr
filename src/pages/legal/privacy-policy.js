import React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import remarkGfm from 'remark-gfm';

import LegalLayout from '../../components/LegalLayout';

import { FadeIn } from '../../components/FadeIn';

// --- Animation Wrapper ---
// Removed to use shared component

const PrivacyPolicy = ({ frontmatter, mdxSource }) => {
  return (
    <LegalLayout title={frontmatter.title}>
      {/* Dynamic Metadata */}
      <Head>
        <title>{frontmatter.title} | Legal - StaticDelivr</title>
        <meta name="description" content={frontmatter.description || 'StaticDelivr Privacy Policy - Learn how we collect, use, and protect your data when using our free CDN service.'} />
        <meta name="keywords" content="privacy policy, StaticDelivr privacy, data protection, GDPR, user privacy, CDN privacy" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph Tags */}
        <meta property="og:url" content="https://staticdelivr.com/legal/privacy-policy" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${frontmatter.title} | Legal - StaticDelivr`} />
        <meta property="og:description" content={frontmatter.description || 'StaticDelivr Privacy Policy - Learn how we collect, use, and protect your data.'} />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/legal/privacy-policy" />
        <meta name="twitter:title" content={`${frontmatter.title} | Legal - StaticDelivr`} />
        <meta name="twitter:description" content={frontmatter.description || 'StaticDelivr Privacy Policy - Learn how we collect, use, and protect your data.'} />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 md:px-0 py-8">

        {/* Breadcrumb */}
        <FadeIn>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <span>legal</span>
            <ChevronRight className="w-3 h-3" />
            <span>privacy-policy</span>
          </div>
        </FadeIn>

        {/* Header */}
        <header className="mb-12">
          <FadeIn delay={0.1}>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              {frontmatter.title}
            </h1>
          </FadeIn>

          {frontmatter.description && (
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                {frontmatter.description}
              </p>
            </FadeIn>
          )}
        </header>

        {/* Content */}
        <FadeIn delay={0.3}>
          <article className="
            prose prose-zinc dark:prose-invert max-w-none
            
            /* Typography Tweaks */
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-12
            prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-8
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            
            /* Tables */
            prose-table:w-full prose-table:border-collapse prose-table:my-8 prose-table:text-sm
            prose-thead:border-b prose-thead:border-zinc-300 dark:prose-thead:border-zinc-700
            prose-th:text-left prose-th:py-4 prose-th:px-6 prose-th:font-semibold prose-th:text-zinc-900 dark:prose-th:text-white prose-th:bg-zinc-50 dark:prose-th:bg-zinc-900/50
            prose-tr:border-b prose-tr:border-zinc-200 dark:prose-tr:border-zinc-800
            prose-td:py-4 prose-td:px-6 prose-td:text-zinc-600 dark:prose-td:text-zinc-400
          ">
            <MDXRemote {...mdxSource} />
          </article>
        </FadeIn>

        {/* Footer Info */}
        <footer className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <FadeIn delay={0.4}>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <Calendar className="w-3 h-3" />
              {frontmatter.lastUpdated ? (
                <span>Last updated: {frontmatter.lastUpdated}</span>
              ) : (
                <span>Last updated: Recently</span>
              )}
            </div>
          </FadeIn>
        </footer>

      </div>
    </LegalLayout>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'legal', 'privacy-policy.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    props: {
      frontmatter,
      mdxSource,
    },
  };
}

export default PrivacyPolicy;
