<template>
  <nav 
    class="navbar w-[85%] flex justify-between items-center px-4 md:px-8 lg:px-16 xl:px-40 transition-all duration-700 relative z-[100]"
    :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
  >
    <!-- Logo centrado - Mobile only -->
    <RouterLink 
      to="/" 
      class="md:hidden absolute left-1/2 -translate-x-1/2 z-50" 
    >
      <img class="logo w-16 h-16" src="../assets/images/logo/logo2.png" alt="Logo">
    </RouterLink>

    <!-- Logo y nombre - Desktop only -->
    <RouterLink to="/" class="logoName hidden md:flex items-center gap-4">
<img 
  class="logo w-16 h-16 md:w-20 md:h-20 transition-all duration-300 hover:scale-110 hover:rotate-[10deg]" 
  src="../assets/images/logo/logo2.png" 
  alt="Logo"
>
      <h1 class="xxl text-xl md:text-2xl font-bold text-black">GameFest</h1>
    </RouterLink>

    <!-- Desktop Navigation -->
    <ul class="hidden lg:gap-9 lg:text-base md:flex gap-5 md:text-xs text-white items-center">
      <li class="enlace">
        <RouterLink to="/">Inicio</RouterLink>
      </li>

      <li class="enlace">
        <RouterLink to="/games">Juegos</RouterLink>
      </li>

      <li class="enlace">
        <RouterLink to="/events">Eventos</RouterLink>
      </li>

      <li class="line h-6"></li>
      
      <li>
        <RouterLink to="/login">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:stroke-pink-500 transition-colors">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </RouterLink>
      </li>
    </ul>

    <!-- Mobile menu button -->
    <button
      @click="toggleMenu"
      class="md:hidden text-white p-2 rounded-lg hover:text-orange-500 transition-colors z-[100] ml-auto relative"
      aria-label="Toggle menu"
    >
      <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-show="isOpen" class="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-[90%] mt-4 rounded-3xl overflow-hidden shadow-2xl z-40">
        <div class="bg-gradient-to-b from-purple-900 to-blue-900 backdrop-blur-sm px-6 py-4 space-y-1 border border-red-900/50 ">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="closeMenu"
            class="enlace-mobile block px-4 py-3 rounded-xl text-white hover:text-orange-500 transition-all font-['Syncopate'] text-sm"
          >
            {{ link.label }}
          </RouterLink>
          
          <div class="h-px bg-white/20 my-3"></div>
          
          <RouterLink
            to="/login"
            @click="closeMenu"
            class="enlace-mobile flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:text-orange-500 transition-all font-['Syncopate'] text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            Mi Cuenta
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 50)
})

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/games', label: 'Juegos' },
  { to: '/events', label: 'Eventos' }
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<style scoped>
.enlace-mobile {
  position: relative;
}

.enlace-mobile:hover {
  background: rgba(255, 115, 0, 0.1);
}

.logo-bounce-active {
  animation: bounceMobile 0.6s ease;
}

@keyframes bounceMobile {
  0% {
    transform: translate(-50%, 0) scale(1);
  }
  25% {
    transform: translate(-50%, 0) scale(1.3);
  }
  50% {
    transform: translate(-50%, 0) scale(0.9);
  }
  75% {
    transform: translate(-50%, 0) scale(1.15);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}


</style>