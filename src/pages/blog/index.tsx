import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getBlogPosts } from '../../lib/contentful'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { StaticDelivrImage } from 'staticdelivr'
import { Calendar, Tag, Search, ArrowRight, Clock, Plus } from 'lucide-react'
import { FadeIn } from '../../components/FadeIn'

interface BlogPost {
  sys: { id: string }
  fields: {
    title: string
    slug: string
    summary: string
    publishDate: string
    tags?: string[]
    featuredImage?: {
      fields: {
        file: {
          url: string
        }
      }
    }
  }
}

interface BlogPageProps {
  posts: BlogPost[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Separate the latest post as "Featured"
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  // Filter posts based on search
  const filteredPosts = posts.filter(post =>
    post.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.fields.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.fields.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // If searching, show all matches. If not, show only remaining posts (exclude featured)
  const displayPosts = searchQuery ? filteredPosts : remainingPosts

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-emerald-500/30">
      <Head>
        <title>Blog | StaticDelivr</title>
        <meta name="description" content="Read the latest insights, tutorials, and open-source stories from StaticDelivr. Learn CDN best practices, performance tips, and developer tutorials." />
        <meta name="keywords" content="CDN blog, StaticDelivr tutorials, open source development, CDN best practices, web performance, developer guides" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:url" content="https://staticdelivr.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | StaticDelivr" />
        <meta property="og:description" content="Read the latest insights, tutorials, and open-source stories from StaticDelivr." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/blog" />
        <meta name="twitter:title" content="Blog | StaticDelivr" />
        <meta name="twitter:description" content="Read the latest insights, tutorials, and open-source stories from StaticDelivr." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />

      <main className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* --- Hero Section --- */}
          <section className="mb-20">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Plus className="w-3 h-3" />
                <span>Resources & Insights</span>
              </div>
            </FadeIn>

            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                  The Blog
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed font-light">
                  Deep dives into web performance, edge computing, and the future of open-source delivery.
                </p>
              </FadeIn>

              {/* Search Bar */}
              <FadeIn delay={0.2} className="w-full md:w-auto">
                <div className="relative w-full md:w-80 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </FadeIn>
            </div>
          </section>

          {/* --- Featured Post --- */}
          {!searchQuery && featuredPost && (
            <FadeIn delay={0.3} className="mb-20">
              <Link href={`/blog/${featuredPost.fields.slug}`} className="group relative block rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700">
                <div className="grid md:grid-cols-2 gap-0 h-full">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-auto overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                    {featuredPost.fields.featuredImage && (
                      <div className="w-full h-full">
                        <StaticDelivrImage
                          src={`https:${featuredPost.fields.featuredImage.fields.file.url}`}
                          alt={featuredPost.fields.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-medium uppercase tracking-wider text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <Tag className="w-3 h-3" />
                      Featured
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-6">
                      <span className="flex items-center gap-1.5" suppressHydrationWarning>
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(featuredPost.fields.publishDate).toLocaleDateString('en-US')}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-4 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                      {featuredPost.fields.title}
                    </h2>

                    <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 line-clamp-3 leading-relaxed">
                      {featuredPost.fields.summary}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.fields.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center text-sm font-semibold text-zinc-900 dark:text-white group-hover:translate-x-1 transition-transform">
                        Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          )}

          {/* --- Recent Posts Grid --- */}

          <div className="mb-12 flex items-center gap-3">
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
            <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest">
              {searchQuery ? `Search Results` : `Latest Articles`}
            </span>
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.length > 0 ? (
              displayPosts.map((post, index) => (
                <FadeIn key={post.sys.id} delay={0.05 * index}>
                  <Link href={`/blog/${post.fields.slug}`} className="group h-full block">
                    <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700">

                      {/* Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800/50">
                        {post.fields.featuredImage ? (
                          <StaticDelivrImage
                            src={`https:${post.fields.featuredImage.fields.file.url}`}
                            alt={post.fields.title}
                            width={400}
                            height={250}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <StaticDelivrImage src="/assets/img/icons/staticdelivr-logo.svg" alt="Placeholder" width={50} height={50} className="opacity-20 grayscale" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-mono" suppressHydrationWarning>
                          <span>{new Date(post.fields.publishDate).toLocaleDateString('en-US')}</span>
                        </div>

                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                          {post.fields.title}
                        </h3>

                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                          {post.fields.summary}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                          <div className="flex -space-x-2 overflow-hidden">
                            {post.fields.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
                                {tag}
                              </span>
                            ))}
                            {post.fields.tags && post.fields.tags.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-50 dark:bg-zinc-900 text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                +{post.fields.tags.length - 2}
                              </span>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-zinc-500">No articles found matching &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getBlogPosts()
  return {
    props: {
      posts: posts.map(post => ({
        sys: post.sys,
        fields: {
          ...post.fields,
          publishDate: post.fields.publishDate || new Date().toISOString()
        }
      })),
    },
    revalidate: 60
  }
}
