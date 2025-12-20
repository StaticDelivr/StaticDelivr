import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getBlogPostBySlug, getBlogPosts } from '../../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { StaticDelivrImage } from 'staticdelivr'
import { Calendar, Tag, ArrowLeft, Linkedin, Link as LinkIcon, ChevronRight, Check } from 'lucide-react'
import { FadeIn } from '../../components/FadeIn'

// --- Custom Rich Text Render Options ---
const renderOptions = {
   renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
         const { file, title } = node.data.target.fields;
         return (
            <div className="my-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg bg-zinc-50 dark:bg-zinc-900">
               <StaticDelivrImage
                  src={`https:${file.url}`}
                  alt={title || 'Embedded Image'}
                  width={file.details.image.width || 800}
                  height={file.details.image.height || 600}
                  className="w-full h-auto"
               />
               {title && <p className="text-center text-xs text-zinc-500 py-3 m-0 border-t border-zinc-200 dark:border-zinc-800 font-mono">{title}</p>}
            </div>
         );
      },
      [BLOCKS.HEADING_2]: (node, children) => (
         <h2 className="text-2xl md:text-3xl font-semibold mt-16 mb-6 text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
            {children}
         </h2>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
         <blockquote className="border-l-2 border-emerald-500 pl-6 py-2 my-10 text-xl font-light leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
            "{children}"
         </blockquote>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
         <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-500 hover:underline decoration-1 underline-offset-2 font-medium">
            {children}
         </a>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
         <p className="mb-6 leading-8 text-zinc-600 dark:text-zinc-400">
            {children}
         </p>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
         <ul className="list-disc pl-6 mb-8 space-y-2 text-zinc-600 dark:text-zinc-400">
            {children}
         </ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
         <ol className="list-decimal pl-6 mb-8 space-y-2 text-zinc-600 dark:text-zinc-400">
            {children}
         </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
         <li className="pl-2">{children}</li>
      ),
   },
};

export default function BlogPost({ post }) {
   const [copied, setCopied] = useState(false)
   if (!post) return <div>Post not found!</div>

   const { title, body, publishDate, featuredImage, tags, seoTitle, seoDescription, slug } = post.fields
   const shareUrl = `https://staticdelivr.com/blog/${slug}`

   const handleCopy = () => {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
   }

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-emerald-500/30">
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
         </Head>

         <Header />

         <main className="relative pt-32 pb-24">

            {/* --- Hero Section --- */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-16">
               <FadeIn>
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 mb-8">
                     <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-white transition-colors">blog</Link>
                     <ChevronRight className="w-3 h-3" />
                     <span className="text-zinc-900 dark:text-white">{slug.substring(0, 20)}...</span>
                  </div>
               </FadeIn>

               <FadeIn delay={0.1}>
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                     <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400" suppressHydrationWarning>
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                     </span>
                     {tags && tags.slice(0, 2).map(tag => (
                        <span key={tag} className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-500">
                           <Tag className="w-3.5 h-3.5" />
                           {tag}
                        </span>
                     ))}
                  </div>
               </FadeIn>

               <FadeIn delay={0.2}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
                     {title}
                  </h1>
               </FadeIn>
            </div>

            {/* --- Content Grid --- */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 lg:gap-24">

               {/* Main Article */}
               <article className="min-w-0">
                  {/* Featured Image */}
                  {featuredImage && (
                     <FadeIn delay={0.3} className="mb-16">
                        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-100 dark:bg-zinc-900">
                           <StaticDelivrImage
                              src={`https:${featuredImage.fields.file.url}`}
                              alt={title}
                              width={1200}
                              height={630}
                              className="w-full h-auto"
                              priority
                           />
                        </div>
                     </FadeIn>
                  )}

                  {/* Body */}
                  <FadeIn delay={0.4}>
                     <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
                        {documentToReactComponents(body, renderOptions)}
                     </div>
                  </FadeIn>

                  {/* Share */}
                  <div className="mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                     <FadeIn className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                           Share this article
                        </div>
                        <div className="flex gap-3">
                           <button
                              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`, '_blank')}
                              className="p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all"
                              aria-label="Share on X"
                           >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
                              </svg>
                           </button>
                           <button
                              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
                              className="p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-[#0077b5] border-transparent transition-all"
                              aria-label="Share on LinkedIn"
                           >
                              <Linkedin className="w-4 h-4" />
                           </button>
                           <button
                              onClick={handleCopy}
                              className={`p-2.5 rounded-full border transition-all relative flex items-center justify-center ${copied ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                              aria-label="Copy link"
                           >
                              {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}

                              {/* Confirmation Tooltip */}
                              {copied && (
                                 <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
                                    COPIED!
                                 </span>
                              )}
                           </button>
                        </div>
                     </FadeIn>
                  </div>
               </article>

               {/* Sticky Sidebar */}
               <aside className="hidden lg:block relative">
                  <div className="sticky top-32 space-y-8">

                     {/* Back Link */}
                     <Link href="/blog" className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                     </Link>

                     {/* Tags */}
                     {tags && (
                        <div>
                           <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
                              Related Tags
                           </h3>
                           <div className="flex flex-wrap gap-2">
                              {tags.map(tag => (
                                 <Link key={tag} href={`/blog/tags/${tag}`} className="text-xs px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                                    {tag}
                                 </Link>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Promo Box */}
                     <div className="p-5 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-800/50 dark:border dark:border-zinc-700">
                        <div className="text-sm font-semibold mb-2">Build faster ⚡️</div>
                        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                           StaticDelivr is free, fast, and open source. Optimize your assets today.
                        </p>
                        <Link href="/docs" className="block text-center w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition-colors">
                           Get Started
                        </Link>
                     </div>
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
