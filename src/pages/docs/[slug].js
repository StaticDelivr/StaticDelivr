import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Copy, Check } from 'lucide-react';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import DocsLayout from '../../components/DocsLayout';

// --- Custom Code Block Component ---
const Pre = ({ children, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef(null);

  const handleCopy = async () => {
    if (!preRef.current) return;
    const text = preRef.current.innerText;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group my-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#0d1117] overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/50" />
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto">
        <pre
          ref={preRef}
          {...props}
          // FIXED 1: Use inline styles for padding (Specificity: 1000). 
          // This ensures padding exists without fighting JIT or specific classes.
          style={{ padding: '20px', margin: 0 }}
          // FIXED 2: Added !text-zinc-50 to FORCE white text. 
          // Without '!', Tailwind Typography (prose) forces dark text in light mode, making it invisible on your dark bg.
          className="!bg-transparent !text-zinc-50 text-[13px] md:text-sm font-mono leading-loose min-w-full"
        >
          {children}
        </pre>
      </div>
    </div>
  );
};

// --- MDX Components Map ---
const components = {
  pre: Pre,
};

import { FadeIn } from '../../components/FadeIn';

// --- Animation Wrapper ---
// Removed to use shared component

const DocPage = ({ frontmatter, mdxSource, docsContent, slug }) => {
  return (
    <DocsLayout docsContent={docsContent} currentSlug={`/docs/${slug}`}>
      <NextSeo
        title={`${frontmatter.title} | Documentation`}
        description={frontmatter.description || 'StaticDelivr documentation.'}
        canonical={`https://staticdelivr.com/docs/${slug}`}
        openGraph={{
          url: `https://staticdelivr.com/docs/${slug}`,
          title: `${frontmatter.title} | Documentation`,
          description: frontmatter.description || 'StaticDelivr documentation.',
        }}
      />
      <Head>
        {/* Load Highlight.js CSS */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css" />
      </Head>

      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <FadeIn>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <span>docs</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-900 dark:text-white">{slug}</span>
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

        {/* Markdown Content */}
        <FadeIn delay={0.3}>
          <article className="
            prose prose-zinc dark:prose-invert max-w-none
            
            /* Typography Tweaks */
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-12
            prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-8
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            
            /* --- INLINE CODE STYLING --- */
            /* Standard ticks like `npm install` */
            prose-code:text-zinc-800 dark:prose-code:text-zinc-200 
            prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800/50 
            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md 
            prose-code:font-mono prose-code:text-sm
            prose-code:before:content-none prose-code:after:content-none 

            /* --- BLOCK CODE OVERRIDES --- */
            /* We strictly reset styles inside our custom <pre> to prevent conflict */
            /* 1. Reset the inner <code> tag styles */
            [&_pre_code]:!bg-transparent 
            [&_pre_code]:!p-0 
            [&_pre_code]:!text-inherit 
            [&_pre_code]:!font-inherit
            [&_pre_code]:!border-none
            
            /* 2. Fix links inside code blocks */
            [&_pre_a]:!text-inherit [&_pre_a]:!no-underline [&_pre_a]:!pointer-events-none

            /* 3. Disable default Prose Pre styling */
            prose-pre:!bg-transparent prose-pre:!m-0 prose-pre:!rounded-none prose-pre:!border-none prose-pre:!shadow-none

            /* --- TABLES --- */
            prose-table:w-full prose-table:border-collapse prose-table:my-8 prose-table:text-sm
            prose-thead:border-b prose-thead:border-zinc-300 dark:prose-thead:border-zinc-700
            prose-th:text-left prose-th:py-4 prose-th:px-6 prose-th:font-semibold prose-th:text-zinc-900 dark:prose-th:text-white prose-th:bg-zinc-50 dark:prose-th:bg-zinc-900/50
            prose-tr:border-b prose-tr:border-zinc-200 dark:prose-tr:border-zinc-800
            prose-td:py-4 prose-td:px-6 prose-td:text-zinc-600 dark:prose-td:text-zinc-400
            
            /* Images */
            prose-img:rounded-xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800 prose-img:shadow-sm
          ">
            <MDXRemote {...mdxSource} components={components} />
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
    </DocsLayout>
  );
};

export async function getStaticPaths() {
  const docsDir = path.join(process.cwd(), 'docs');
  const filenames = fs.readdirSync(docsDir);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const docsDir = path.join(process.cwd(), 'docs');
  const filenames = fs.readdirSync(docsDir);

  const docsContentMap = {};

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

  const docsContent = Object.entries(docsContentMap).map(([category, items]) => ({
    category,
    items,
  }));

  const filePath = path.join(docsDir, `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
  });

  return {
    props: {
      frontmatter,
      mdxSource,
      docsContent,
      slug: params.slug,
    },
  };
}

export default DocPage;
