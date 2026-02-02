<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { useAuthStore } from '@/stores/authStore'

const modalStore = useModalStore()
const authStore = useAuthStore()
const router = useRouter()
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


const handleLogout = async () => {
  await authStore.logout()
  closeMenu()
  router.push('/') // Redirigir a inicio
}
</script>

<template>
  <nav
    class="navbar w-[85%] flex justify-between items-center px-4 md:px-8 lg:px-16 xl:px-40 transition-all duration-700 relative z-[100]"
    :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'">
    <!-- Logo móvil -->
    <RouterLink to="/" class="md:hidden absolute left-1/2 -translate-x-1/2 z-50">
      <img class="logo w-16 h-16" src="../assets/images/logo/logo2.png" alt="Logo">
    </RouterLink>

    <!-- Logo desktop -->
    <RouterLink to="/" class="logoName hidden md:flex items-center gap-4">
      <img class="logo w-16 h-16 md:w-20 md:h-20 transition-all duration-300 hover:scale-110 hover:rotate-[10deg]"
        src="../assets/images/logo/logo2.png" alt="Logo">
      <h1 class="xxl text-xl md:text-2xl font-bold text-black">GameFest</h1>
    </RouterLink>

    <!-- Menu desktop -->
    <ul class="hidden lg:gap-9 lg:text-xl md:flex gap-5 md:text-xs text-white items-center">
      <li class="enlace">
        <RouterLink to="/">Inicio</RouterLink>
      </li>
      <li class="enlace">
        <RouterLink to="/games">Juegos</RouterLink>
      </li>
      <li class="enlace">
        <RouterLink to="/events">Eventos</RouterLink>
      </li>

      <!-- Mostrar "Mis Eventos" solo si está logueado -->
      <li v-if="authStore.isLoggedIn" class="enlace">
        <RouterLink to="/MyEvents">Mis Eventos</RouterLink>
      </li>

      <li class="line h-6"></li>

      <!-- Botón de login/logout -->
      <li v-if="!authStore.isLoggedIn">
        <button @click="modalStore.openLogin" type="button"
          class="text-white hover:text-pink-500 transition-colors focus:outline-none flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </button>
      </li>

      <!-- Menú de usuario logueado -->
      <li v-else class="relative group">
        <button class="text-white hover:text-pink-500 transition-colors focus:outline-none flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span class="text-sm">{{ authStore.user?.username }}</span>
        </button>

        <!-- Dropdown menu -->
        <div
          class="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-purple-500/30">
          <button @click="handleLogout"
            class="w-full text-left px-4 py-3 text-white hover:bg-purple-500/20 rounded-lg transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </li>
    </ul>

    <!-- Botón menú móvil -->
    <button @click="toggleMenu"
      class="md:hidden text-white p-2 rounded-lg hover:text-orange-500 transition-colors z-[100] ml-auto relative">
      <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <!-- Menu móvil -->
    <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
      <div v-show="isOpen"
        class="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-[90%] mt-4 rounded-3xl overflow-hidden shadow-2xl z-40">
        <div
          class="bg-gradient-to-b from-purple-900 to-blue-900 backdrop-blur-sm px-6 py-4 space-y-1 border border-red-900/50">
          <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" @click="closeMenu"
            class="enlace-mobile block px-4 py-3 rounded-xl text-white hover:text-orange-500 transition-all font-['Syncopate'] text-sm">
            {{ link.label }}
          </RouterLink>

          <!-- Mis Eventos en móvil (solo si está logueado) -->
          <RouterLink v-if="authStore.isLoggedIn" to="/MyEvents" @click="closeMenu"
            class="enlace-mobile block px-4 py-3 rounded-xl text-white hover:text-orange-500 transition-all font-['Syncopate'] text-sm">
            Mis Eventos
          </RouterLink>

          <div class="h-px bg-white/20 my-3"></div>

          <!-- Login button (solo si NO está logueado) -->
          <button v-if="!authStore.isLoggedIn" @click="() => { closeMenu(); modalStore.openLogin(); }"
            class="enlace-mobile flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white hover:text-orange-500 transition-all font-['Syncopate'] text-sm text-left">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            Mi Cuenta
          </button>

          <!-- Usuario logueado en móvil -->
          <div v-else class="space-y-1">
            <div class="px-4 py-2 text-purple-300 text-xs font-['Poppins']">
              {{ authStore.user?.username }}
            </div>
            <RouterLink to="/">
              <button @click="handleLogout"
                class="enlace-mobile flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white hover:text-red-500 transition-all font-['Syncopate'] text-sm text-left">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                Cerrar Sesión
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
<!--<RouterLink to="/" class="md:hidden absolute left-1/2 -translate-x-1/2 z-50"> <img class="logo w-16 h-16" src="../assets/images/logo/logo2.png" alt="Logo"> </RouterLink>
 -->

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