import React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import LegalLayout from '../../components/LegalLayout';

const PrivacyPolicy = ({ frontmatter, mdxSource }) => {
  return (
    <LegalLayout title={frontmatter.title}>
      {/* Dynamic Metadata */}
      <Head>
        <title>{frontmatter.title} - StaticDelivr</title>
        <meta name="description" content={frontmatter.description || 'StaticDelivr Privacy Policy - Learn how we collect, use, and protect your data.'} />
        <meta name="keywords" content={`${frontmatter.title}, StaticDelivr, privacy policy, data protection, user privacy`} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:url" content="https://staticdelivr.com/legal/privacy-policy" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${frontmatter.title} - StaticDelivr`} />
        <meta property="og:description" content={frontmatter.description || 'StaticDelivr Privacy Policy - Learn how we collect, use, and protect your data.'} />
        <meta property="og:image" content="" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/legal/privacy-policy" />
        <meta name="twitter:title" content={`${frontmatter.title} - StaticDelivr`} />
        <meta name="twitter:description" content={frontmatter.description || 'StaticDelivr Privacy Policy - Learn how we collect, use, and protect your data.'} />
        <meta name="twitter:image" content="" />
      </Head>

      <MDXRemote {...mdxSource} />
    </LegalLayout>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'legal', 'privacy-policy.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontmatter,
      mdxSource,
    },
  };
}

export default PrivacyPolicy;