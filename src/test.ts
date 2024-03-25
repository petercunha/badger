import { getPosts } from './lib'
import { it } from 'node:test'
import assert from 'node:assert'

void it('gets list of blog posts', async (t) => {
  const results = await getPosts()
  assert.strictEqual(results.length >= 152, true)
})
