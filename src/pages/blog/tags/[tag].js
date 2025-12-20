import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { getBlogPosts } from '../../../lib/contentful'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { StaticDelivrImage } from 'staticdelivr'
import { Calendar, Tag, ArrowRight, ArrowLeft } from 'lucide-react'
import { FadeIn } from '../../../components/FadeIn'
import { useTheme } from 'next-themes'

export default function TagPage({ posts, tag }) {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-emerald-500/30">
      <NextSeo
        title={`${tag} | Blog Tags - StaticDelivr`}
        description={`Browse all StaticDelivr blog posts tagged with "${tag}". Find CDN insights, tutorials, and updates.`}
        canonical={`https://staticdelivr.com/blog/tags/${tag}`}
        openGraph={{
          url: `https://staticdelivr.com/blog/tags/${tag}`,
          title: `${tag} | Blog Tags - StaticDelivr`,
          description: `Browse all StaticDelivr blog posts tagged with "${tag}".`,
          images: [
            {
              url: 'https://staticdelivr.com/assets/img/og-image.png',
              width: 1200,
              height: 630,
              alt: 'StaticDelivr Blog',
            },
          ],
          site_name: 'StaticDelivr',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `StaticDelivr, Blog, ${tag}, CDN articles, tutorials`
          }
        ]}
      />

      <Header />

      <main className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/5 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="text-center mb-24">
            <FadeIn>
              <div className="inline-flex items-center justify-center p-4 mb-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800">
                <Tag className="w-8 h-8 text-emerald-500" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-white mb-6 tracking-tight">
                Posts tagged with <span className="text-zinc-500 italic">#{tag}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link href="/blog" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-zinc-500 pb-0.5">
                <ArrowLeft className="w-4 h-4 mr-2" /> Return to all articles
              </Link>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
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
                          {post.fields.tags?.slice(0, 2).map(t => (
                            <span key={t} className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${t === tag ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'} whitespace-nowrap`}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
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
