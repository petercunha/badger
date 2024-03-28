import { PrismaClient } from '@prisma/client'
import type { BlogPost, SearchResult } from './types'
import puppeteer from 'puppeteer'
import moment from 'moment'

const prisma = new PrismaClient()

export async function getPosts(): Promise<BlogPost[]> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://blog.twitch.tv/en/search/')

  const results = await await page.evaluate(`
        // This code is run inside a headless browser via puppeteer
        import("/_pagefind/pagefind.js").then(pagefind => {
            return pagefind.search("badge", { sort: { date: "asc" } }).then(search => {
                return Promise.all(search.results.map(hit => hit.data()))
            })
        })
    `) as SearchResult[]

  await browser.close()
  return convertToBlogPosts(results)
}

export async function getRecentPosts(days: number): Promise<BlogPost[]> {
  const allPosts = await getPosts()
  const recentPosts = allPosts.filter((post: BlogPost) => (moment().diff(moment(new Date(post.date)), 'days') < days))
  return recentPosts
}

export async function getNewPosts(): Promise<BlogPost[]> {
  const newPosts: BlogPost[] = []
  for (const post of await getPosts()) {
    const postAlreadyExists = Boolean(await prisma.blogPost.findUnique({ where: { url: post.url } }))
    if (!postAlreadyExists) {
      console.log('New post:', post.url)
      await prisma.blogPost.create({ data: post })
      newPosts.push(post)
    }
  }
  return newPosts
}

export function convertToBlogPosts(results: SearchResult[]): BlogPost[] {
  return results.map(x => ({
    url: x.url,
    content: x.content,
    word_count: x.word_count,
    title: x.meta.title,
    image: x.meta.image,
    date: new Date(x.meta.dateFormatted).toISOString(),
    excerpt: x.excerpt
  }))
}

export async function sleep(ms: number): Promise<NodeJS.Timeout> {
  return await new Promise(resolve => setTimeout(resolve, ms))
}
