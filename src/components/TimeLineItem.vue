<script setup lang="ts">
import type { TimelinePost } from '@/types/posts'

// props
interface PropsType {
  post: TimelinePost
}

defineProps<PropsType>()
</script>

<template>
  <a class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat('d MMM') }}</div>
  </a>
</template>

<style scoped>

</style>
