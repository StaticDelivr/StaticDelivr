import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getBlogPosts } from '../../lib/contentful'
import Link from 'next/link'
import { StaticDelivrImage } from 'staticdelivr'
import { Calendar, Tag } from 'lucide-react'
import { AuroraBackground } from '../../components/ui/aurora-background'
import { MagicCard } from '../../components/ui/magic-card'
import { BlurFade } from '../../components/ui/blur-fade'
import { useTheme } from 'next-themes'

interface BlogPageProps {
  posts: Array<{
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
            details: {
              image: {
                width: number
                height: number
              }
            }
          }
        }
      }
    }
  }>
}

export default function BlogPage({ posts }: BlogPageProps) {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Blog - StaticDelivr</title>
        <meta name="description" content="Insights, tutorials, and stories from the world of open-source development." />
        <meta name="keywords" content="open source, StaticDelivr, blog, tutorials, development, CDN, content delivery, open-source community" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog - StaticDelivr" />
        <meta property="og:description" content="Insights, tutorials, and stories from the world of open-source development." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/blog" />
        <meta name="twitter:title" content="Blog - StaticDelivr" />
        <meta name="twitter:description" content="Insights, tutorials, and stories from the world of open-source development." />
        <meta name="twitter:image" content="" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <BlurFade delay={0.1} inView>
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
                StaticDelivr Blog
              </h1>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Insights, tutorials, and stories from the world of open-source development
              </p>
            </BlurFade>
          </div>
        </AuroraBackground>

        {/* Blog Posts Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlurFade key={post.sys.id} delay={0.1 * (index + 1)} inView>
                  <Link href={`/blog/${post.fields.slug}`} className="group block h-full">
                    <MagicCard 
                      className="h-full flex flex-col overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                    >
                      {post.fields.featuredImage && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <StaticDelivrImage 
                            src={`https:${post.fields.featuredImage.fields.file.url}`}
                            alt={post.fields.title}
                            width={400}
                            height={192}
                            quality={80}
                            format="webp"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(post.fields.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.fields.title}
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4 flex-grow line-clamp-3">
                          {post.fields.summary}
                        </p>
                        {post.fields.tags && (
                          <div className="flex items-center flex-wrap gap-2 mt-auto">
                            {post.fields.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
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
    revalidate: 60 // Regenerate page every 60 seconds
  }
}