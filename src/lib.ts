import type { BlogPost, SearchResult } from './types'
import puppeteer from 'puppeteer'

export async function getPosts(): Promise<SearchResult[]> {
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
  return results
}

export function convertToBlogPosts(results: SearchResult[]): BlogPost[] {
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

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}