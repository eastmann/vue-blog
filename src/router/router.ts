import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: () => import('@/views/HomePage.vue'),
    },
  ],
})
