import { DateTime } from 'luxon'
import { computed, ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

import type { Post, TimelinePost } from '@/types/posts'
import type { Period } from '@/types/constants'

/**
 * Choosing data structure for our Posts:
 * ======================================
 * O(n) - array           -> have to visit every element to find a post
 * O(1) - object/hash map -> get a Post right away (from an id) - fast lookup time
 *
 * Example:
 * ========
 * - all['1']
 * - /posts/1
 */

function delay() {
  return new Promise<void>((res) => {
    setTimeout(res, 1500)
  })
}

export const usePosts = defineStore('posts', () => {
  // state
  const ids = ref<string[]>([]) // ['1', '2', '3'] - can loop through posts
  const all = ref<Map<string, Post>>(new Map()) // { 1: { title: 'foo', created: '2022-01-01' } }

  const selectedPeriod = ref<Period>('Today')

  // actions
  async function fetchPosts() {
    const res = await window.fetch('http://localhost:8000/posts')
    const data = (await res.json()) as Post[]

    await delay() // imitate network latency

    const fetch_ids: string[] = []
    const fetch_all = new Map<string, Post>()

    for (const post of data) {
      fetch_ids.push(post.id)
      fetch_all.set(post.id, post)
    }

    ids.value = fetch_ids
    all.value = fetch_all
  }

  function setSelectPeriod(period: Period) {
    selectedPeriod.value = period
  }

  // computed
  const filteredPosts = computed<TimelinePost[]>(() => {
    // TODO: Refactor map() & filter() to single reduce()

    const formatted = ids.value.map((id) => {
      const post = all.value.get(id)

      if (!post) {
        throw new Error(`Post with id of ${id} was expected, but not found`)
      }

      return {
        ...post,
        created: DateTime.fromISO(post.created),
      }
    })

    const filtered = formatted.filter((post) => {
      if (selectedPeriod.value === 'Today') {
        return post.created >= DateTime.now().minus({ day: 1 })
      }

      if (selectedPeriod.value === 'This Week') {
        return post.created >= DateTime.now().minus({ week: 1 })
      }

      return post
    })

    return filtered
  })

  return {
    ids,
    all,

    fetchPosts,

    selectedPeriod,
    setSelectPeriod,

    filteredPosts,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePosts, import.meta.hot))
}
