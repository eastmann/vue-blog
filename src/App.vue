<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'

import 'highlight.js/styles/atom-one-light.css'
</script>

<template>
  <div class="section">
    <div class="container">
      <NavBar />
      <RouterView />
      <!-- RouterView will be replaced by HomePage.vue -->
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

ul {
  list-style: revert !important;
  list-style-position: revert !important;
}

p,
pre,
h1, h2, h3, h4, h5, h6 {
  margin: 10px 0 !important;
}

h1, h2, h3, h4, h5, h6 {
  font-size: revert !important;
}
</style>
