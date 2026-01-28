<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/lib/api' // [cite: 48]
import { 
  AnimatedModal,
  AnimatedModalBody, 
  AnimatedModalContent, 
  AnimatedModalFooter 
} from '@/components/ui/animated-modal'

const props = defineProps({
  id: String // [cite: 112]
})

const router = useRouter()
const event = ref(null)
const loading = ref(true)

// Absolute path to reach your backend resources
const IMAGE_BASE_URL = 'http://localhost/GameFest-BackEnd-feat-methodsSQL/gamefest_resources/events/'

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

const fetchEventDetail = async () => {
  loading.value = true
  try {
    const response = await api.get('events.php', {
      params: { id: props.id }
    })
    event.value = response.data
  } catch (error) {
    console.error('Error loading event details:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchEventDetail)

const getTipoStyles = (tipo) => {
  const styles = {
    taller: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
    charla: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
    torneo: 'bg-red-500/20 border-red-500/50 text-red-400',
    presentacion: 'bg-green-500/20 border-green-500/50 text-green-400',
    'mesa-redonda': 'bg-orange-500/20 border-orange-500/50 text-orange-400',
    networking: 'bg-pink-500/20 border-pink-500/50 text-pink-400',
    exhibicion: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
    competicion: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
  }
  return styles[tipo.toLowerCase()] || 'bg-gray-500/20 border-gray-500/50 text-gray-400'
}
</script>

<template>
  <AnimatedModal 
    :open="isOpen" 
    @update:open="isOpen = $event"
    :close-on-esc="true"
  >
    <AnimatedModalBody 
      class="md:max-w-4xl w-full bg-zinc-900 border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
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

      <div v-if="loading" class="p-20 text-center text-purple-500 font-['Pixelify_Sans'] animate-pulse">
        Cargando detalles del evento...
      </div>

      <AnimatedModalContent v-else-if="event" class="p-0">
        <div class="flex flex-col md:flex-row min-h-[450px]">
          
          <div class="md:w-2/5 relative h-56 md:h-auto overflow-hidden bg-zinc-800">
            <img 
              :src="IMAGE_BASE_URL + event.imagen" 
              :alt="event.titulo" 
              class="w-full h-full object-cover opacity-80"
            />
            <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-900/40 to-transparent"></div>
          </div>

          <div class="md:w-3/5 p-6 md:p-8 space-y-6 flex flex-col justify-center">
            <div>
              <span 
  class="inline-block px-3 py-1 border rounded-full text-xs font-semibold font-['Poppins'] uppercase mb-3"
  :class="getTipoStyles(event.tipo)"
>
  {{ event.tipo }}
</span>
              
              <h2 class="text-3xl font-bold text-white font-['Pixelify_Sans'] leading-tight">
                {{ event.titulo }}
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-['Poppins']">
              <div class="flex items-center gap-3 text-gray-300">
                <span class="text-xl">📅</span>
                <span>{{ event.fecha }}</span>
              </div>
              <div class="flex items-center gap-3 text-gray-300">
                <span class="text-xl">⏰</span>
                <span>{{ event.hora }}h</span>
              </div>
              <div class="flex items-center gap-3" :class="event.plazasLibres > 0 ? 'text-green-400' : 'text-red-400'">
                <span class="text-xl">👥</span>
                <span class="font-bold">{{ event.plazasLibres }} plazas libres</span>
              </div>
            </div>

            <div class="pt-4 border-t border-zinc-800">
              <p class="text-gray-400 text-sm leading-relaxed font-['Poppins']">
                {{ event.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </AnimatedModalContent>

      <AnimatedModalFooter v-if="event" class="bg-zinc-900/50 border-t border-zinc-800">
        <button 
          class="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-purple-500/20"
        >
          Inscribirme ahora
        </button>
      </AnimatedModalFooter>
    </AnimatedModalBody>
  </AnimatedModal>
</template>