<script setup lang="ts">
import { DateTime } from 'luxon'

import PostWriter from '@/components/PostWriter.vue'

import type { TimelinePost } from '@/types/posts'

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  created: DateTime.now(),
}
</script>

<template>
  <div>
    New Post
    <PostWriter :post="post" />
  </div>
</template>

<style scoped>

</style>
