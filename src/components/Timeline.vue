<script setup lang="ts">
import { computed, ref } from 'vue'
import { DateTime } from 'luxon'
// import type { Post } from '@/types/posts'
import { thisMonth, thisWeek, today } from '@/types/posts'

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
const formattedPosts = computed(() => {
  return posts.map((post) => {
    return {
      ...post,
      created: DateTime.fromISO(post.created),
    }
  })
})

const filteredPosts = computed(() => {
  return formattedPosts.value.filter((post) => {
    if (selectedPeriod.value === 'Today') {
      return post.created >= DateTime.now().minus({ day: 1 })
    }

    if (selectedPeriod.value === 'This Week') {
      return post.created >= DateTime.now().minus({ week: 1 })
    }

    return post
  })
})

// methods
function selectPeriod(period: Period) {
  selectedPeriod.value = period
}
</script>

<template>
  <nav class="is-primary panel">
    {{ selectedPeriod }}
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

    <a
      v-for="post of filteredPosts"
      :key="post.id"
      class="panel-block"
    >
      <a>{{ post.title }}</a>
      <div>{{ post.created.toFormat('d MMM') }}</div>
    </a>
  </nav>
</template>
