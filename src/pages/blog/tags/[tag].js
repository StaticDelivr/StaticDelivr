import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getBlogPosts } from '../../../lib/contentful'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { StaticDelivrImage } from 'staticdelivr'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import { AuroraBackground } from '../../../components/ui/aurora-background'
import { MagicCard } from '../../../components/ui/magic-card'
import { BlurFade } from '../../../components/ui/blur-fade'
import { useTheme } from 'next-themes'

export default function TagPage({ posts, tag }) {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
      <Head>
        <title>{tag} | Blog Tags - StaticDelivr</title>
        <meta name="description" content={`Browse all StaticDelivr blog posts tagged with "${tag}". Find CDN insights, tutorials, and updates.`} />
        <meta name="keywords" content={`StaticDelivr, Blog, ${tag}, CDN articles, tutorials`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:url" content={`https://staticdelivr.com/blog/tags/${tag}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${tag} | Blog Tags - StaticDelivr`} />
        <meta property="og:description" content={`Browse all StaticDelivr blog posts tagged with "${tag}".`} />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content={`https://staticdelivr.com/blog/tags/${tag}`} />
        <meta name="twitter:title" content={`${tag} | Blog Tags - StaticDelivr`} />
        <meta name="twitter:description" content={`Browse all StaticDelivr blog posts tagged with "${tag}".`} />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />

      <main>
        <AuroraBackground className="h-auto min-h-[40vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center justify-center p-4 mb-8 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur shadow-lg border border-zinc-200 dark:border-zinc-800">
                <Tag className="w-8 h-8 text-blue-500" />
              </div>
            </BlurFade>
            <BlurFade delay={0.2}>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Posts tagged &quot;<span className="text-blue-600 dark:text-blue-400">{tag}</span>&quot;
              </h1>
            </BlurFade>
            <BlurFade delay={0.3}>
               <Link href="/blog" className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> View all articles
               </Link>
            </BlurFade>
          </div>
        </AuroraBackground>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlurFade key={post.sys.id} delay={0.1 * (index + 1)} inView>
                  <Link href={`/blog/${post.fields.slug}`} className="group h-full block">
                    <MagicCard 
                      className="h-full flex flex-col overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm"
                      gradientColor={theme === "dark" ? "#262626" : "#e4e4e7"}
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                         {post.fields.featuredImage && (
                           <StaticDelivrImage 
                             src={`https:${post.fields.featuredImage.fields.file.url}`}
                             alt={post.fields.title}
                             width={400}
                             height={192}
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                         )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center text-xs text-zinc-500 mb-3 font-mono">
                          <Calendar className="w-3 h-3 mr-2" />
                          {new Date(post.fields.publishDate).toLocaleDateString()}
                        </div>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                          {post.fields.title}
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-3">
                          {post.fields.summary}
                        </p>
                      </div>
                    </MagicCard>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const posts = await getBlogPosts()
  const filteredPosts = posts.filter(post => post.fields.tags?.includes(params.tag))
  return { props: { posts: filteredPosts, tag: params.tag } }
}

export async function getStaticPaths() {
  const posts = await getBlogPosts()
  const allTags = [...new Set(posts.flatMap(post => post.fields.tags || []))]
  const paths = allTags.map(tag => ({ params: { tag } }))
  return { paths, fallback: false }
}
