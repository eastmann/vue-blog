import { ref } from 'vue'
import { defineStore } from 'pinia'

// interface PostsState {
//   foo: string
// }

export const usePosts = defineStore('posts', () => {
  // state
  const foo = ref<string>('foo')

  // actions
  function updateFoo(val: string) {
    foo.value = val
  }

  return {
    foo,
    updateFoo,
  }
})
