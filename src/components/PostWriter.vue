<script setup lang="ts">
import type { TimelinePost } from '@/types/posts'

interface ProsType {
  post: TimelinePost
}
const props = defineProps<ProsType>()
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">{{ props.post.title }}</div>
        <input type="text" class="input">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
