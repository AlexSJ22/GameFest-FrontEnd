<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  AnimatedModal,
  AnimatedModalBody, 
  AnimatedModalContent, 
  AnimatedModalFooter 
} from '@/components/ui/animated-modal'

const props = defineProps({
  id: String
})

const router = useRouter()

const isOpen = computed({
  get: () => true,
  set: (value) => {
    if (!value) {
      router.push({ name: 'events' })
    }
  }
})

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <div>
  <AnimatedModal 
    :open="isOpen" 
    @update:open="isOpen = $event"
    :close-on-esc="true"
  >
    <AnimatedModalBody 
      class="md:max-w-2xl w-full bg-zinc-900 border border-purple-500/30 shadow-2xl shadow-purple-500/20"
      :show-close="false"
      :close-on-outside="true"
      :lock-scroll="true"
    >
      <button 
        @click="close" 
        class="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-purple-500/20 border border-zinc-700 hover:border-purple-500/50 text-gray-400 hover:text-white transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <AnimatedModalContent class="p-0">
        <div class="relative h-48 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center text-7xl">
            <img src="../assets/images/Test/stalin.jpg" alt="">
          </div>
        </div>

        <div class="p-6 space-y-4">
          <h2 class="text-2xl font-bold text-white font-['Pixelify_Sans']">
            Unreal Engine Workshop
          </h2>

          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="flex items-center gap-2 text-gray-300">
              <span class="text-purple-400">📅</span>
              <span>15 Febrero 2025</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="text-purple-400">⏰</span>
              <span>18:00 - 22:00</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="text-purple-400">👥</span>
              <span>5 plazas libres</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="text-purple-400">🏷️</span>
              <span>Workshop</span>
            </div>
          </div>

          <div class="pt-2">
            <p class="text-gray-400 text-sm leading-relaxed font-['Poppins']">
              Aprende a crear juegos con Unreal Engine 5. Cubriremos desde configuración básica hasta blueprints y materiales avanzados.
            </p>
          </div>
        </div>
      </AnimatedModalContent>

      <AnimatedModalFooter class="gap-3 bg-zinc-900/50 border-t border-zinc-800">
        <button 
          class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30"
        >
          Inscribirme
        </button>
      </AnimatedModalFooter>
    </AnimatedModalBody>
  </AnimatedModal>
  </div>
</template>