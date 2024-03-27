import { BlogPost, type SearchResult } from './types'
import { convertToBlogPosts, getPosts } from './lib'
import { PrismaClient } from '@prisma/client'
import moment from 'moment'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  const searchResults: SearchResult[] = await getPosts()

  // Get blog posts from the last 30 days
  const recentPosts: BlogPost[] = convertToBlogPosts(searchResults.filter((hit: SearchResult) => (moment().diff(moment(new Date(hit.meta.dateFormatted)), 'days') < 60)))

  console.log('Total posts found:', searchResults.length)
  console.log('Recent posts:', recentPosts.length)

  // Add new blog posts to the DB, and get ready to send notifications about them
  const newPosts: BlogPost[] = []
  for (const post of recentPosts) {
    const postAlreadyExists: Boolean = Boolean(await prisma.blogPost.findUnique({ where: { url: post.url } }))
    if (!postAlreadyExists) {
      console.log('New post:', post.url)
      await prisma.blogPost.create({ data: post })
      newPosts.push(post)
    }
  }

  if (newPosts.length === 0) {
    return console.log('None of the posts are new. Exiting...')
  }

  console.log('Send notifications for', newPosts.length, 'new posts')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
