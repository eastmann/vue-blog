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
const content = ref(props.post.markdown)
// DOM
const contentEditable = ref<HTMLDivElement>()

// hooks
onMounted(() => {
  if (!contentEditable.value) {
    throw new Error('contentEditable Node was not found')
  }

  contentEditable.value.textContent = content.value
})

// methods
function handleInput() {
  if (!contentEditable.value) {
    throw new Error('contentEditable Node was not found')
  }

  content.value = contentEditable.value.textContent ?? 'No content provided!'
}
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
    <div class="columns">
      <div class="column">
        <div ref="contentEditable" contenteditable @input="handleInput" />
      </div>
      <div class="column">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
