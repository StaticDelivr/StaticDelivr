import { getBlogPostBySlug, getBlogPosts } from '../../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { StaticDelivrImage } from 'staticdelivr'
import Head from 'next/head'
import { AuroraBackground } from '../../components/ui/aurora-background'
import { BlurFade } from '../../components/ui/blur-fade'

// Blog Post Page Component
export default function BlogPost({ post }) {
  // If the post is not found, show a loading message
  if (!post) {
    return <div>Post not found!</div>
  }

  const { title, body, publishDate, featuredImage, tags, seoTitle, seoDescription } = post.fields

  // Rendering options for embedded content (if any)
  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        const { file, title } = node.data.target.fields;
        return (
          <div className="my-8">
            <StaticDelivrImage
              src={`https:${file.url}`}
              alt={title || 'Embedded Image'}
              width={file.details.image.width || 800}
              height={file.details.image.height || 600}
              quality={80}
              format="webp"
              className="rounded-lg shadow-lg"
            />
          </div>
        );
      },
      'embedded-entry-block': (node) => {
        return (
          <div className="my-8 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <p className="text-zinc-600 dark:text-zinc-400">Embedded entry: {node.data.target.fields.title}</p>
          </div>
        );
      },
    },
  };
  

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>{seoTitle || title} - StaticDelivr</title>
        <meta name="description" content={seoDescription || 'Default description if not available'} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${seoTitle || title} - StaticDelivr`} />
        <meta property="og:description" content={seoDescription || 'Default description if not available'} />
        <meta property="og:image" content={featuredImage ? `https:${featuredImage.fields.file.url}` : '/default-image.jpg'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://staticdelivr.com/blog/${post.fields.slug}`} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content={`https://staticdelivr.com/blog/${post.fields.slug}`} />
        <meta name="twitter:title" content={`${seoTitle || title} - StaticDelivr`} />
        <meta name="twitter:description" content={seoDescription || 'Default description if not available'} />
        <meta name="twitter:image" content={featuredImage ? `https:${featuredImage.fields.file.url}` : '/default-image.jpg'} />
        
        {/* Tags Meta Tag (for SEO) */}
        <meta name="keywords" content={tags ? tags.join(', ') : 'StaticDelivr, Blog, Content Delivery, CDN'} />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[40vh] py-20">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <BlurFade delay={0.1} inView>
              <div className="flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400 mb-6">
                <Calendar className="w-4 h-4" />
                {new Date(publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                {title}
              </h1>
            </BlurFade>
            {tags && (
              <BlurFade delay={0.3} inView>
                <div className="flex flex-wrap justify-center gap-2">
                  {tags.map(tag => (
                    <Link key={tag} href={`/blog/tags/${tag}`} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                      <Tag className="w-3 h-3 mr-1.5" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </BlurFade>
            )}
          </div>
        </AuroraBackground>

        {/* Blog Content Section */}
        <section className="py-12 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-3xl mx-auto">
            <BlurFade delay={0.4} inView>
              {featuredImage && (
                <div className="relative h-[400px] w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
                  <StaticDelivrImage
                    src={`https:${featuredImage.fields.file.url}`}
                    alt={title}
                    width={1200}
                    height={400}
                    quality={80}
                    format="webp"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <article className="prose prose-lg prose-zinc dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400
                prose-img:rounded-xl prose-img:shadow-lg
                prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
              ">
                {documentToReactComponents(body, options)}
              </article>
            </BlurFade>

            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <Link href="/blog" className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

// Fetch post data for static generation
export async function getStaticProps({ params }) {
  const post = await getBlogPostBySlug(params.slug)

  return {
    props: {
      post: post ? post : null,  // If the post is not found, return null
    },
  }
}

// This function gets the paths to be statically generated
export async function getStaticPaths() {
  const posts = await getBlogPosts()

  // Generate paths for all blog posts based on the slug
  const paths = posts.map((post) => ({
    params: { slug: post.fields.slug },
  }))

  return {
    paths,
    fallback: false,  // Show a 404 page if the path is not found
  }
}