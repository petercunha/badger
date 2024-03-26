import { BlogPost, type SearchResult } from './types'
import { getPosts } from './lib'
import moment from 'moment'
import fs from 'fs'

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
  writeToJsonFile(results)
}

function writeToJsonFile(results: SearchResult[]) {
  let formatted: BlogPost[] = mapResults(results)
  try {
    fs.writeFileSync('./database.json', JSON.stringify(formatted))
  } catch (err) {
    console.error(err)
  }
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

void main()
