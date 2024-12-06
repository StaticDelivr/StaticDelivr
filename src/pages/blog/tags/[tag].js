import React from 'react'
import Head from 'next/head'
import { getBlogPosts } from '../../../lib/contentful'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import Image from 'next/image'

export default function TagPage({ posts, tag }) {
  return (
    <div>
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
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Posts Tagged with "{tag}"
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore blog posts tagged with <strong>{tag}</strong>.
            </p>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link 
                  key={post.sys.id} 
                  href={`/blog/${post.fields.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    {post.fields.featuredImage && (
                      <div className="relative h-48 w-full">
                        <Image 
                          src={`https:${post.fields.featuredImage.fields.file.url}`}
                          alt={post.fields.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(post.fields.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                        {post.fields.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {post.fields.summary}
                      </p>
                      {post.fields.tags && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Tag className="w-4 h-4 mr-2" />
                          {post.fields.tags.slice(0, 3).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
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
