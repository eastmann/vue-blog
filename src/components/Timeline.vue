<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { DateTime } from 'luxon'

import TimelineItem from './TimelineItem.vue'

import type { TimelinePost } from '@/types/posts'
import { thisMonth, thisWeek, today } from '@/types/posts'
import { usePosts } from '@/stores/posts'

// store
const postsStore = usePosts()

// constants
const periods = ['Today', 'This Week', 'This Month'] as const
const posts = [
  today,
  thisWeek,
  thisMonth,
]

type Period = typeof periods[number]

// data
const selectedPeriod = ref<Period>('Today')

// computed
const filteredPosts = computed<TimelinePost[]>(() => {
  // TODO: Refactor map() & filter() to single reduce()

  const formatted = posts.map((post) => {
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

// methods
function selectPeriod(period: Period) {
  selectedPeriod.value = period
}
</script>

<template>
  {{ postsStore.foo }}

  <button @click="postsStore.updateFoo('bar')">Update</button>

  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="period === selectedPeriod && 'is-active'"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem
      v-for="post of filteredPosts"
      :key="post.id"
      :post="post"
    />
  </nav>
</template>
