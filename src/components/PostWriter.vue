<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TimelinePost } from '@/types/posts'

// props
interface ProsType {
  post: TimelinePost
}

const props = defineProps<ProsType>()

// data
const title = ref(props.post.title)

// DOM
const contentEditable = ref<HTMLDivElement>()

// hooks
onMounted(() => {
  console.log('*** mounted ***', contentEditable.value?.innerHTML)
})
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
        <div ref="contentEditable" contenteditable>
          This is the content
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
