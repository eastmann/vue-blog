<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { marked } from 'marked'

import type { TimelinePost } from '@/types/posts'

// types
interface ProsType {
  post: TimelinePost
}

// props
const props = defineProps<ProsType>()

// data
const html = ref('')
const title = ref(props.post.title)
const content = ref(props.post.markdown)

// DOM
const contentEditable = ref<HTMLDivElement>()

// watch

// - More concise, but less explicit;
// - Has { immediate: true } by default;
// - Need to figure out what to watch (where ref is);
// ==================================================
// watchEffect(() => {
//   html.value = marked.parse(content.value).toString()
// })

// - Code is more readable;
// - More explicit on what to watch, than "watchEffect";
// =========================================================
watch(
  content,
  (newContent) => {
    html.value = marked.parse(newContent).toString()
  },
  {
    immediate: true,
  },
)

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
        <div v-html="html" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
