import { getNewPosts, getPosts, sendEmail } from './lib'
import { PrismaClient } from '@prisma/client'
import { type BlogPost } from './types'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

async function main(): Promise<void> {
  // Get all blog posts mentioning badges
  const allPosts: BlogPost[] = await getPosts()

  // Get unindexed blog posts and add them to the DB
  const newPosts: BlogPost[] = await getNewPosts()

  console.log('Total posts found:', allPosts.length)

  // if (newPosts.length === 0) {
  //   console.log('None of the posts are new. Exiting...')
  //   return
  // }
  console.log('Discovered', newPosts.length, 'new posts and added them to the DB')
  console.log('Send notifications for', newPosts.length, 'new posts')

  console.log('Sending mail...')
  await sendEmail({ newPosts: newPosts.length })
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
