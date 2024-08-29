import { ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

import type { Post } from '@/types/posts'
import { thisMonth, thisWeek, today } from '@/types/posts'

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

export const usePosts = defineStore('posts', () => {
  // state
  const ids = ref<string[]>([today.id, thisWeek.id, thisMonth.id]) // ['1', '2', '3'] - can loop through posts
  const all = ref<Map<string, Post>>(
    new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
    ]),
  ) // { 1: { title: 'foo', created: '2022-01-01' } }

  // actions

  return {
    ids,
    all,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePosts, import.meta.hot))
}
