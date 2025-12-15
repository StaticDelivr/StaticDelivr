import React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import LegalLayout from '../../components/LegalLayout';
import { BlurFade } from '../../components/ui/blur-fade';

const TermsOfService = ({ frontmatter, mdxSource }) => {
  return (
    <LegalLayout title={frontmatter.title}>
      {/* Dynamic Metadata */}
      <Head>
        <title>{frontmatter.title} | Legal - StaticDelivr</title>
        <meta name="description" content={frontmatter.description || 'StaticDelivr Terms of Service - Read our service terms and conditions for using the free open-source CDN.'} />
        <meta name="keywords" content="terms of service, StaticDelivr terms, usage agreement, CDN terms, service conditions" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        {/* Open Graph Tags */}
        <meta property="og:url" content="https://staticdelivr.com/legal/terms-of-service" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${frontmatter.title} | Legal - StaticDelivr`} />
        <meta property="og:description" content={frontmatter.description || 'StaticDelivr Terms of Service - Understanding our service terms and conditions.'} />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/legal/terms-of-service" />
        <meta name="twitter:title" content={`${frontmatter.title} | Legal - StaticDelivr`} />
        <meta name="twitter:description" content={frontmatter.description || 'StaticDelivr Terms of Service - Understanding our service terms and conditions.'} />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <BlurFade delay={0.1} inView>
        <MDXRemote {...mdxSource} />
      </BlurFade>
    </LegalLayout>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'legal', 'terms-of-service.md');
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

export default TermsOfService;