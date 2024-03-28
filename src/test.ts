import { getPosts } from './lib'
import { it } from 'node:test'
import assert from 'node:assert'
import { type BlogPost } from './types'

void it('gets list of blog posts', async (t) => {
  const results: BlogPost[] = await getPosts()
  assert.strictEqual(results.length >= 152, true)
})
