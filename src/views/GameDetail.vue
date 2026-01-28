<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/lib/api'
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
const game = ref(null)
const loading = ref(true)

const IMAGE_BASE_URL = 'http://localhost/GameFest-BackEnd/gamefest_resources/games/'

const isOpen = computed({
  get: () => true,
  set: (value) => {
    if (!value) router.push({ name: 'games' })
  }
})

const fetchGameDetail = async () => {
  loading.value = true
  try {
    const response = await api.get(`/games/${props.id}`)
    game.value = response.data
  } catch (error) {
    console.error('Error loading game details:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchGameDetail)
</script>

<template>
  <AnimatedModal :open="isOpen" @update:open="isOpen = $event">
    <AnimatedModalBody class="md:max-w-4xl w-full !bg-black border border-purple-500/30 shadow-2xl overflow-hidden">

      <div v-if="loading" class="p-20 text-center text-purple-500 animate-pulse">
        Cargando detalles del juego...
      </div>

      <AnimatedModalContent v-else-if="game" class="p-0 !bg-black">
        <div class="flex flex-col md:flex-row min-h-[450px]">
          <div class="md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-zinc-900">
            <img :src="IMAGE_BASE_URL + game.imagen" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 to-transparent"></div>
          </div>

          <div class="md:w-3/5 p-8 space-y-6 flex flex-col justify-center bg-black">
            <h2 class="text-4xl font-bold text-white font-['Pixelify_Sans']">{{ game.titulo }}</h2>
            <div class="flex gap-2">
              <span
                class="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-full text-xs uppercase">{{
                  game.genero }}</span>
            </div>
            <p class="text-gray-400 font-['Poppins']">{{ game.descripcion }}</p>
          </div>
        </div>
      </AnimatedModalContent>

      <AnimatedModalFooter v-if="game" class="!bg-black border-t border-white/10">
        <button @click="isOpen = false"
          class="w-full px-6 py-4 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700 border border-zinc-700">
          Cerrar
        </button>
      </AnimatedModalFooter>
    </AnimatedModalBody>
  </AnimatedModal>
</template>