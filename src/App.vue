<script setup>
  import { RouterView } from 'vue-router'; 
  import Header from './components/Header.vue';
import PageTransition from './components/PageTransition.vue';
</script>

<template>
  <div class="text-black">
    <Header />
    
    <main>
        <PageTransition />
        <RouterView /> 
    </main>
    
  </div>
</template>

<style scoped></style>