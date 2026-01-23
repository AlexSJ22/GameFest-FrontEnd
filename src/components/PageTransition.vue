<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const isTransitioning = ref(false)
const transitionText = ref('')
const router = useRouter()

// Mapeo de rutas a textos
const routeTexts = {
  '/games': 'Juegos',
  '/events': 'Eventos',
  '/': 'Inicio',
  '/login': 'Login'
}

// Escuchar cambios de ruta
router.beforeEach((to, from, next) => {
  // 1. Identify if we are entering OR leaving the detail modal
  const enteringDetail = to.name === 'event-detail';
  const leavingDetail = from.name === 'event-detail';

  // 2. Logic to skip transition
  const shouldSkip = 
    from.path === to.path || // No path change
    to.path === "/login" ||  // Going to login
    enteringDetail ||        // Going TO modal
    leavingDetail;           // Coming FROM modal ✅

  if (!shouldSkip) {
    isTransitioning.value = true;
    transitionText.value = routeTexts[to.path] || 'Cargando...';

    setTimeout(() => {
      next();
      setTimeout(() => {
        isTransitioning.value = false;
      }, 100);
    }, 500);
  } else {
    next();
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-500 ease-in-out"
    enter-from-class="-translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition-transform duration-500 ease-in-out"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="isTransitioning"
      class="fixed inset-0 z-[200] bg-black flex items-center justify-center"
    >
      <h2 class="text-5xl md:text-9xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
        {{ transitionText }}
      </h2>
    </div>
  </Transition>
</template>