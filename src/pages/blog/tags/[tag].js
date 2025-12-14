import React from 'react'
import Head from 'next/head'
import { getBlogPosts } from '../../../lib/contentful'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import { StaticDelivrImage } from 'staticdelivr'
import { AuroraBackground } from '../../../components/ui/aurora-background'
import { MagicCard } from '../../../components/ui/magic-card'
import { BlurFade } from '../../../components/ui/blur-fade'
import { useTheme } from 'next-themes'

export default function TagPage({ posts, tag }) {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>{tag} - StaticDelivr Blog</title>
        <meta name="description" content={`Blog posts tagged with "${tag}"`} />
        <meta name="keywords" content={`StaticDelivr, Blog, ${tag}`} />
        <meta property="og:url" content={`https://staticdelivr.com/blog/tags/${tag}`} />
        <meta property="og:title" content={`${tag} - StaticDelivr Blog`} />
        <meta property="og:description" content={`Blog posts tagged with "${tag}"`} />
      </Head>

      <Header />
      <main>
        {/* Tag Section */}
        <AuroraBackground className="h-auto min-h-[40vh] py-20">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <BlurFade delay={0.1} inView>
              <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <Tag className="w-6 h-6 text-zinc-900 dark:text-white" />
              </div>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                Posts Tagged with &quot;{tag}&quot;
              </h1>
            </BlurFade>
            <BlurFade delay={0.3} inView>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                Explore blog posts tagged with <strong>{tag}</strong>.
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
                  <Link 
                    href={`/blog/${post.fields.slug}`}
                    className="group block h-full"
                  >
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
                            {post.fields.tags.slice(0, 3).map(t => (
                              <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                                <Tag className="w-3 h-3 mr-1" />
                                {t}
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

export async function getStaticProps({ params }) {
  // Fetch all posts and filter by the tag from the URL
  const posts = await getBlogPosts()

  // Filter posts by tag
  const filteredPosts = posts.filter(post => post.fields.tags?.includes(params.tag))

  return {
    props: {
      posts: filteredPosts,
      tag: params.tag,
    },
  }
}

export async function getStaticPaths() {
  // Fetch all blog posts to get all unique tags
  const posts = await getBlogPosts()

  // Get a unique list of tags across all posts
  const allTags = [...new Set(posts.flatMap(post => post.fields.tags || []))]

  // Generate paths for each tag
  const paths = allTags.map(tag => ({
    params: { tag },
  }))

  return {
    paths,
    fallback: false, // Return 404 for non-existent tags
  }
}
