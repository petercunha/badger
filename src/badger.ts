import { type SearchResult } from './types'
import { getPosts } from './lib'
import moment from 'moment'

async function main(): Promise<void> {
  const results: SearchResult[] = await getPosts()
  results
    .filter((hit: SearchResult) => {
      return (
        moment().diff(moment(new Date(hit.meta.dateFormatted)), 'days') < 30
      )
    })
    .map((hit: SearchResult) => {
      const date = hit.meta.dateFormatted
      console.log(date)
      return hit
    })
}

void main()
