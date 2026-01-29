<script setup>
  import { RouterView } from 'vue-router'; 
  import Header from './components/Header.vue';
  import PageTransition from './components/PageTransition.vue';
  import LoginView from './views/LoginView.vue';

  import { useModalStore } from '@/stores/modalStore'; 

  const modalStore = useModalStore(); 
</script>

<template>
  <div class="text-black">
    <Header />
    
    <main>
        <PageTransition />
        <RouterView /> 
    </main>
    
    <LoginView v-if="modalStore.isLoginOpen" />
    
  </div>
</template>

<style scoped></style>
