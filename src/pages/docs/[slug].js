import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import DocsLayout from '../../components/DocsLayout';

const DocPage = ({ frontmatter, mdxSource, docsContent, slug }) => {
  return (
    <DocsLayout docsContent={docsContent} currentSlug={`/docs/${slug}`}>
      {/* Dynamic Metadata */}
      <Head>
        <title>{frontmatter.title} - StaticDelivr</title>
        <meta name="description" content={frontmatter.description || 'Documentation Page'} />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {frontmatter.description}
            </p>
          )}
        </header>

        {/* Markdown Content */}
        <article
          className="prose prose-lg dark:prose-invert prose-headings:font-semibold 
            prose-a:text-blue-600 hover:prose-a:text-blue-500
            prose-code:text-blue-600 dark:prose-code:text-blue-400
            prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500
            prose-img:rounded-lg prose-img:shadow-md
            max-w-none"
        >
          <MDXRemote {...mdxSource} />
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
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

  const mdxSource = await serialize(content);

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
