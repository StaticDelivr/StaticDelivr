import { getBlogPostBySlug, getBlogPosts } from '../../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Calendar } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head' // Import Head component

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
      'embedded-entry-block': (node) => <p>Embedded entry: {node.data.target.fields.title}</p>,
    },
  }

  return (
    <div>
      <Head>
        <title>{seoTitle || title}</title> {/* Use seoTitle if available, otherwise fallback to title */}
        <meta name="description" content={seoDescription || 'Default description if not available'} />
        {/* Optional: Open Graph / Social Media meta tags */}
        <meta property="og:title" content={seoTitle || title} />
        <meta property="og:description" content={seoDescription || 'Default description if not available'} />
        <meta property="og:image" content={featuredImage ? `https:${featuredImage.fields.file.url}` : '/default-image.jpg'} />
        <meta property="og:type" content="article" />
      </Head>

      <Header />
      <main>
        {/* Blog Content Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="prose max-w-full mx-auto">
              <div className="relative">
                {featuredImage && (
                  <div className="relative h-72 w-full mb-8">
                    <Image
                      src={`https:${featuredImage.fields.file.url}`}
                      alt={title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Post Metadata */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
                <div>{documentToReactComponents(body, options)}</div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800">Tags:</h3>
                    <ul className="flex flex-wrap mt-2">
                      {tags.map((tag, index) => (
                        <li key={index} className="mr-4 mb-2">
                          <Link href={`/blog/tags/${tag}`}>
                            <a className="text-blue-600 hover:text-blue-800">{tag}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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