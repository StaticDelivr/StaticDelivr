import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getBlogPosts } from '../../lib/contentful'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag } from 'lucide-react'

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
  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              StaticDelivr Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and stories from the world of open-source development
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