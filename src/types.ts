export interface SearchResult {
  url: string
  excerpt: string
  content: string
  word_count: number
  filters: any
  meta: {
    title: string
    image: string
    dateFormatted: string
  }
  anchors: any[]
  weighted_locations: [
    {
      weight: number
      balanced_score: number
      location: number
    }
  ]
  locations: number[]
  raw_content: string
  raw_url: string
  sub_results: [
    {
      title: string
      url: string
      weighted_locations: any[]
      locations: any[]
      excerpt: string
    }
  ]
}
