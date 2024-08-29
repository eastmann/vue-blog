<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TimelineItem from './TimelineItem.vue'

import { usePosts } from '@/stores/postsStore'
import { periods } from '@/types/constants'

// store
const postsStore = usePosts()

postsStore.fetchPosts()
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="period === postsStore.selectedPeriod && 'is-active'"
        @click="postsStore.setSelectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem
      v-for="post of postsStore.filteredPosts"
      :key="post.id"
      :post="post"
    />
  </nav>
</template>
