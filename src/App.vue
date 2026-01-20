<script setup>
  import { RouterView } from 'vue-router'; 
  import Header from './components/Header.vue';
</script>

<template>
  <div class="text-black">
    <Header />
    
    <main>
        <RouterView /> 
    </main>
    
  </div>
</template>

<style scoped></style>