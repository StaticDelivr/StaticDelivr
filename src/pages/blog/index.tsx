import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getBlogPosts } from '../../lib/contentful'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { StaticDelivrImage } from 'staticdelivr'
import { Calendar, Tag, Search, ArrowRight, Clock } from 'lucide-react'
import { AuroraBackground } from '../../components/ui/aurora-background'
import { MagicCard } from '../../components/ui/magic-card'
import { BlurFade } from '../../components/ui/blur-fade'
import { useTheme } from 'next-themes'

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
  const { theme } = useTheme()
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
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <Head>
        <title>Blog | CDN Insights & Tutorials - StaticDelivr</title>
        <meta name="description" content="Read the latest insights, tutorials, and open-source stories from StaticDelivr. Learn CDN best practices, performance tips, and developer tutorials." />
        <meta name="keywords" content="CDN blog, StaticDelivr tutorials, open source development, CDN best practices, web performance, developer guides" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:url" content="https://staticdelivr.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | CDN Insights & Tutorials - StaticDelivr" />
        <meta property="og:description" content="Read the latest insights, tutorials, and open-source stories from StaticDelivr. Learn CDN best practices and performance tips." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/blog" />
        <meta name="twitter:title" content="Blog | CDN Insights & Tutorials - StaticDelivr" />
        <meta name="twitter:description" content="Read the latest insights, tutorials, and open-source stories from StaticDelivr. Learn CDN best practices and performance tips." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />

      <main>
        {/* --- Hero / Featured Post Section --- */}
        <section className="relative pt-32 pb-20 px-4 md:px-6 lg:px-8 overflow-hidden">
          <AuroraBackground className="absolute inset-0 h-full -z-10 opacity-50 dark:opacity-30" />
          
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                 <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                      The Blog
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
                      Deep dives into web performance, edge computing, and the future of open-source delivery.
                    </p>
                 </div>
                 
                 {/* Search Bar */}
                 <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                    />
                 </div>
              </div>
            </BlurFade>

            {/* Featured Post Card - Only show if NO search query */}
            {!searchQuery && featuredPost && (
              <BlurFade delay={0.2}>
                <Link href={`/blog/${featuredPost.fields.slug}`} className="group relative block rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-0 h-full">
                    {/* Image Side */}
                    <div className="relative h-64 md:h-auto overflow-hidden">
                       {featuredPost.fields.featuredImage && (
                          <StaticDelivrImage 
                            src={`https:${featuredPost.fields.featuredImage.fields.file.url}`}
                            alt={featuredPost.fields.title}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                       )}
                       <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800">
                          Featured
                       </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-4 font-mono">
                         <span className="flex items-center gap-1">
                           <Calendar className="w-3.5 h-3.5" />
                           {new Date(featuredPost.fields.publishDate).toLocaleDateString()}
                         </span>
                         {/* Optional Reading Time Placeholder */}
                         <span className="flex items-center gap-1">
                           <Clock className="w-3.5 h-3.5" />
                           5 min read
                         </span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {featuredPost.fields.title}
                      </h2>
                      
                      <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 line-clamp-3">
                        {featuredPost.fields.summary}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                         <div className="flex flex-wrap gap-2">
                           {featuredPost.fields.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                {tag}
                              </span>
                           ))}
                         </div>
                         <span className="flex items-center text-sm font-semibold text-zinc-900 dark:text-white group-hover:translate-x-1 transition-transform">
                            Read Article <ArrowRight className="w-4 h-4 ml-2" />
                         </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            )}
          </div>
        </section>

        {/* --- Recent Posts Grid --- */}
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-zinc-50/50 dark:bg-black/20 border-t border-zinc-200 dark:border-zinc-800">
           <div className="max-w-7xl mx-auto">
              {!searchQuery && (
                <div className="flex items-center justify-between mb-12">
                   <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Latest Articles</h3>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.length > 0 ? (
                  displayPosts.map((post, index) => (
                    <BlurFade key={post.sys.id} delay={0.05 * index} inView>
                      <Link href={`/blog/${post.fields.slug}`} className="group h-full block">
                        <MagicCard 
                          className="h-full flex flex-col overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
                          gradientColor={theme === "dark" ? "#262626" : "#e4e4e7"}
                        >
                           {/* Image */}
                           <div className="relative h-48 w-full overflow-hidden">
                              {post.fields.featuredImage ? (
                                <StaticDelivrImage 
                                  src={`https:${post.fields.featuredImage.fields.file.url}`}
                                  alt={post.fields.title}
                                  width={400}
                                  height={250}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                   <StaticDelivrImage src="/assets/img/icons/staticdelivr-logo.svg" alt="Placeholder" width={50} height={50} className="opacity-20" />
                                </div>
                              )}
                           </div>

                           {/* Content */}
                           <div className="p-6 flex flex-col flex-1">
                              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-mono">
                                 <span>{new Date(post.fields.publishDate).toLocaleDateString()}</span>
                                 <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                 <span>Blog</span>
                              </div>

                              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {post.fields.title}
                              </h3>

                              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 line-clamp-2 flex-1">
                                {post.fields.summary}
                              </p>

                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                                 <div className="flex -space-x-2">
                                    {post.fields.tags?.slice(0, 2).map(tag => (
                                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                         {tag}
                                      </span>
                                   ))}
                                 </div>
                                 <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                              </div>
                           </div>
                        </MagicCard>
                      </Link>
                    </BlurFade>
                  ))
                ) : (
                   <div className="col-span-full py-20 text-center">
                      <p className="text-zinc-500">No articles found matching &quot;{searchQuery}&quot;</p>
                   </div>
                )}
              </div>
           </div>
        </section>
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
