<script setup lang="ts">
import { ref } from 'vue'
import type { TimelinePost } from '@/types/posts'

// props
interface ProsType {
  post: TimelinePost
}

const props = defineProps<ProsType>()

// data
const title = ref(props.post.title)
</script>

<template>
  <div class="post-writer" data-ui-component="post-writer">
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">{{ props.post.title }}</div>
          <input
            v-model="title"
            type="text"
            class="input"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
