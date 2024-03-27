import { BlogPost, type SearchResult } from './types'
import { getPosts } from './lib'
import { PrismaClient } from '@prisma/client'
import moment from 'moment'
import fs from 'fs'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  const results: SearchResult[] = await getPosts()
  // results
  //   .filter((hit: SearchResult) => {
  //     return (
  //       moment().diff(moment(new Date(hit.meta.dateFormatted)), 'days') < 30
  //     )
  //   })
  //   .map((hit: SearchResult) => {
  //     const date = hit.meta.dateFormatted
  //     console.log(date)
  //     return hit
  //   })
  await writeToDB(results)
}

async function writeToDB(results: SearchResult[]) {
  let posts: BlogPost[] = mapResults(results)
  console.log('Found', posts.length, 'blog posts')
  await sleep(1000)

  for (const post of posts) {
    try {
      const blogPost = await prisma.blogPost.create({
        data: post,
      })
      console.log('Inserted', blogPost.url)
    } catch (e) {
      console.log('Error inserting', post.url)
    }
  }

  console.log('Done')
}

function mapResults(results: SearchResult[]): BlogPost[] {
  return results.map(x => ({
    url: x.url,
    content: x.content,
    word_count: x.word_count,
    title: x.meta.title,
    image: x.meta.image,
    date: new Date(x.meta.dateFormatted).toISOString(),
    excerpt: x.excerpt,
  }))
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
