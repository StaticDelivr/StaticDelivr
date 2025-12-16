import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import DocsLayout from '../../components/DocsLayout';
import { BlurFade } from '../../components/ui/blur-fade';
import rehypeHighlight from 'rehype-highlight';

const DocPage = ({ frontmatter, mdxSource, docsContent, slug }) => {
  // Generate FAQ Schema for the FAQ page
  const faqSchema = slug === 'faq' ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is StaticDelivr?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "StaticDelivr is a free, open-source CDN designed to serve static assets globally, ensuring fast and reliable delivery."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use StaticDelivr for private repositories?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "StaticDelivr currently supports public repositories on GitHub and npm. Private repositories are not supported."
        }
      },
      {
        "@type": "Question",
        "name": "How can I report issues?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can report any issues through our GitHub repository's issues section."
        }
      }
    ]
  } : null;

  return (
    <DocsLayout docsContent={docsContent} currentSlug={`/docs/${slug}`}>
      {/* Dynamic Metadata */}
      <Head>
        <title>{frontmatter.title} | Documentation - StaticDelivr</title>
        <meta name="description" content={frontmatter.description || 'StaticDelivr documentation - Learn how to use the free open-source CDN for static assets.'} />
        <meta name="keywords" content={`${frontmatter.title}, StaticDelivr, documentation, CDN, content delivery, open source CDN`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        {/* Open Graph Tags */}
        <meta property="og:url" content={`https://staticdelivr.com/docs/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${frontmatter.title} | Documentation - StaticDelivr`} />
        <meta property="og:description" content={frontmatter.description || 'StaticDelivr documentation - Learn how to use the free open-source CDN.'} />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content={`https://staticdelivr.com/docs/${slug}`} />
        <meta name="twitter:title" content={`${frontmatter.title} | Documentation - StaticDelivr`} />
        <meta name="twitter:description" content={frontmatter.description || 'StaticDelivr documentation - Learn how to use the free open-source CDN.'} />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />

        {/* FAQ Schema for FAQ page */}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12">
          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
              {frontmatter.title}
            </h1>
          </BlurFade>
          {frontmatter.description && (
            <BlurFade delay={0.2} inView>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {frontmatter.description}
              </p>
            </BlurFade>
          )}
        </header>

        {/* Markdown Content */}
        <BlurFade delay={0.3} inView>
          <article
            className="prose prose-lg prose-zinc dark:prose-invert 
              prose-headings:font-semibold prose-headings:tracking-tight
              prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
              prose-code:text-zinc-900 dark:prose-code:text-zinc-200 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
              [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-zinc-50 dark:[&_pre_code]:text-zinc-50
              prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-700 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800
              prose-table:border-collapse prose-table:w-full prose-table:border prose-table:border-zinc-200 dark:prose-table:border-zinc-800 prose-table:rounded-lg prose-table:overflow-hidden
              prose-th:bg-zinc-100 dark:prose-th:bg-zinc-800 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-zinc-200 dark:prose-th:border-zinc-700
              prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-zinc-200 dark:prose-td:border-zinc-800
              prose-tr:even:bg-zinc-50 dark:prose-tr:even:bg-zinc-900/50
              max-w-none"
          >
            <MDXRemote {...mdxSource} />
          </article>
        </BlurFade>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
            {frontmatter.lastUpdated ? (
              <span>Last updated: {frontmatter.lastUpdated}</span>
            ) : (
              <span>Last updated: N/A</span>
            )}
          </div>
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
