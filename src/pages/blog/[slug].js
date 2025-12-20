import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getBlogPostBySlug, getBlogPosts } from '../../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { StaticDelivrImage } from 'staticdelivr'
import { Calendar, Tag, ArrowLeft, Twitter, Linkedin, Link as LinkIcon, Share2 } from 'lucide-react'
import { AuroraBackground } from '../../components/ui/aurora-background'
import { BlurFade } from '../../components/ui/blur-fade'

// --- Custom Rich Text Render Options ---
const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title } = node.data.target.fields;
      return (
        <div className="my-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
          <StaticDelivrImage
            src={`https:${file.url}`}
            alt={title || 'Embedded Image'}
            width={file.details.image.width || 800}
            height={file.details.image.height || 600}
            className="w-full h-auto"
          />
          {title && <p className="text-center text-sm text-zinc-500 p-2 bg-zinc-50 dark:bg-zinc-900 m-0 border-t border-zinc-200 dark:border-zinc-800">{title}</p>}
        </div>
      );
    },
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-zinc-900 dark:text-white tracking-tight group flex items-center gap-2">
        {children}
      </h2>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
       <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-8 italic text-xl text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-lg">
          {children}
       </blockquote>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
       <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline decoration-2 underline-offset-2">
          {children}
       </a>
    )
  },
};

export default function BlogPost({ post }) {
  if (!post) return <div>Post not found!</div>

  const { title, body, publishDate, featuredImage, tags, seoTitle, seoDescription, slug } = post.fields
  const shareUrl = `https://staticdelivr.com/blog/${slug}`

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
      <Head>
        <title>{seoTitle || title} | Blog - StaticDelivr</title>
        <meta name="description" content={seoDescription || 'Read the latest insights from StaticDelivr'} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${seoTitle || title} | Blog - StaticDelivr`} />
        <meta property="og:description" content={seoDescription || 'Read the latest insights from StaticDelivr'} />
        <meta property="og:image" content={featuredImage ? `https:${featuredImage.fields.file.url}` : 'https://staticdelivr.com/assets/img/og-image.png'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://staticdelivr.com/blog/${post.fields.slug}`} />
        <meta property="og:site_name" content="StaticDelivr" />
        <meta property="article:published_time" content={publishDate} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content={`https://staticdelivr.com/blog/${post.fields.slug}`} />
        <meta name="twitter:title" content={`${seoTitle || title} | Blog - StaticDelivr`} />
        <meta name="twitter:description" content={seoDescription || 'Read the latest insights from StaticDelivr'} />
        <meta name="twitter:image" content={featuredImage ? `https:${featuredImage.fields.file.url}` : 'https://staticdelivr.com/assets/img/og-image.png'} />
        
        {/* Tags Meta Tag (for SEO) */}
        <meta name="keywords" content={tags ? tags.join(', ') : 'StaticDelivr, Blog, Content Delivery, CDN'} />
        
        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": seoTitle || title,
              "description": seoDescription,
              "image": featuredImage ? `https:${featuredImage.fields.file.url}` : 'https://staticdelivr.com/assets/img/og-image.png',
              "datePublished": publishDate,
              "author": {
                "@type": "Organization",
                "name": "StaticDelivr"
              },
              "publisher": {
                "@type": "Organization",
                "name": "StaticDelivr",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://staticdelivr.com/assets/img/icons/staticdelivr-logo.svg"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://staticdelivr.com/blog/${post.fields.slug}`
              }
            })
          }}
        />
      </Head>

      <Header />

      <main>
        {/* --- Hero Section --- */}
        <div className="relative pt-32 pb-16 px-4 md:px-6 border-b border-zinc-100 dark:border-zinc-800">
           <div className="max-w-4xl mx-auto text-center">
              <BlurFade delay={0.1}>
                 <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-8">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900">
                       <Calendar className="w-3.5 h-3.5" />
                       {new Date(publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    {tags && tags.slice(0, 1).map(tag => (
                       <span key={tag} className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                          <Tag className="w-3.5 h-3.5" />
                          {tag}
                       </span>
                    ))}
                 </div>
              </BlurFade>

              <BlurFade delay={0.2}>
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight mb-8 leading-tight">
                    {title}
                 </h1>
              </BlurFade>
           </div>
        </div>

        {/* --- Main Content Area --- */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
            
            {/* Left Column: Article */}
            <article className="min-w-0">
               {/* Featured Image */}
               {featuredImage && (
                  <BlurFade delay={0.3}>
                     <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 border border-zinc-200 dark:border-zinc-800">
                        <StaticDelivrImage
                           src={`https:${featuredImage.fields.file.url}`}
                           alt={title}
                           width={1200}
                           height={630}
                           className="w-full h-auto"
                           priority
                        />
                     </div>
                  </BlurFade>
               )}
               
               {/* Rich Text Body */}
               <BlurFade delay={0.4}>
                  <div className="
                     prose prose-lg prose-zinc dark:prose-invert max-w-none
                     prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-8
                     prose-li:text-zinc-600 dark:prose-li:text-zinc-300
                     prose-headings:text-zinc-900 dark:prose-headings:text-white
                     prose-strong:text-zinc-900 dark:prose-strong:text-white
                  ">
                     {documentToReactComponents(body, renderOptions)}
                  </div>
               </BlurFade>
               
               {/* Post Footer / Share */}
               <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Share this article</h4>
                  <div className="flex gap-4">
                     <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`, '_blank')} className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-blue-500 hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                     </button>
                     <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')} className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-blue-600 hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                     </button>
                     <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                        <LinkIcon className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </article>

            {/* Right Column: Sidebar (Sticky) */}
            <aside className="hidden lg:block relative">
               <div className="sticky top-24 space-y-8">
                  
                  {/* Tags Widget */}
                  {tags && (
                     <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                           <Tag className="w-4 h-4" /> Related Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                           {tags.map(tag => (
                              <Link key={tag} href={`/blog/tags/${tag}`} className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                                 {tag}
                              </Link>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Back Link */}
                  <Link href="/blog" className="flex items-center justify-center w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors font-medium text-sm">
                     <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                  </Link>
               </div>
            </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = await getBlogPostBySlug(params.slug)
  return { props: { post: post || null } }
}

export async function getStaticPaths() {
  const posts = await getBlogPosts()
  const paths = posts.map((post) => ({ params: { slug: post.fields.slug } }))
  return { paths, fallback: false }
}
