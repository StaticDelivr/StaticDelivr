import { createClient } from 'contentful';

// Create the client instance
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
});

export async function getBlogPosts() {
  const entries = await client.getEntries({
    content_type: 'blog',
    order: '-fields.publishDate' // Sort by most recent first
  });
  return entries.items;
}

export async function getBlogPostBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'blog',
    'fields.slug': slug,
    limit: 1
  });

  return entries.items[0] || null;
}

export async function getRelatedPosts(tags, currentPostId) {
  const entries = await client.getEntries({
    content_type: 'blog',
    'fields.tags[in]': tags.join(','),
    'sys.id[ne]': currentPostId,
    limit: 3
  });

  return entries.items;
}
