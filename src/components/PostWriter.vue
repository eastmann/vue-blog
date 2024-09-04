<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

import hljs from 'highlight.js'

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

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'

      return hljs.highlight(code, { language }).value
    },
  }),
)

// watch
//
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
  async (newContent) => {
    html.value = await marked.parse(newContent, {
      async: true,
      gfm: true,
      breaks: true,
    })
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

  content.value = contentEditable.value.innerText ?? 'No content provided!'
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
