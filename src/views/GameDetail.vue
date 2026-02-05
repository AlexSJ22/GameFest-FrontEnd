<script setup>
// ---------------------- IMPORTACIONES ----------------------
// Hooks de Vue
import { ref, computed, onMounted } from 'vue'

// Router para navegación programática
import { useRouter } from 'vue-router'

// Instancia de axios para llamadas HTTP
import api from '@/lib/api'

// Componentes de modal animado reutilizables
import {
  AnimatedModal,
  AnimatedModalBody,
  AnimatedModalContent,
  AnimatedModalFooter
} from '@/components/ui/animated-modal'

// ---------------------- PROPS ----------------------
// Recibimos el ID del juego desde la ruta o componente padre
const props = defineProps({
  id: String
})

// ---------------------- VARIABLES REACTIVAS ----------------------
const router = useRouter()  // Router para navegar o redirigir
const game = ref(null)      // Información del juego a mostrar
const loading = ref(true)   // Indicador de carga

// URL base para imágenes de juegos
const IMAGE_BASE_URL = 'http://localhost/GameFest-BackEnd/gamefest_resources/games/'

// ---------------------- COMPUTED ----------------------
// Controla si el modal está abierto o cerrado
const isOpen = computed({
  get: () => true, // Siempre abierto mientras estemos en la ruta
  set: (value) => {
    // Si el modal se cierra, navegamos a la lista de juegos
    if (!value) router.push({ name: 'games' })
  }
})

// ---------------------- FUNCIONES ----------------------

// Función para obtener los detalles del juego desde el backend
const fetchGameDetail = async () => {
  loading.value = true // Activamos el estado de carga
  try {
    const response = await api.get(`/games/${props.id}`) // Petición GET con el ID
    game.value = response.data  // Guardamos la información del juego
  } catch (error) {
    console.error('Error loading game details:', error) // Manejo de errores
    router.replace('/404') // Redirige a 404 si falla la petición
  } finally {
    loading.value = false // Desactivamos la carga
  }
}

// Ejecutamos la función al montar el componente
onMounted(fetchGameDetail)
</script>

<template>
  <!-- Modal principal -->
  <AnimatedModal :open="isOpen" @update:open="isOpen = $event">
    <AnimatedModalBody class="md:max-w-4xl w-full !bg-black border border-purple-500/30 shadow-2xl overflow-hidden">

      <!-- ---------------------- LOADING ---------------------- -->
      <div v-if="loading" class="p-20 text-center text-purple-500 animate-pulse">
        Cargando detalles del juego...
      </div>

      <!-- ---------------------- CONTENIDO DEL JUEGO ---------------------- -->
      <AnimatedModalContent v-else-if="game" class="p-0 !bg-black">
        <div class="flex flex-col md:flex-row min-h-[450px]">

          <!-- Imagen del juego -->
          <div class="md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-zinc-900">
            <img :src="IMAGE_BASE_URL + game.imagen" class="w-full h-full object-cover" />
            <!-- Gradiente para mejorar la legibilidad -->
            <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 to-transparent"></div>
          </div>

          <!-- Información textual del juego -->
          <div class="md:w-3/5 p-8 space-y-6 flex flex-col justify-center bg-black">
            <!-- Título -->
            <h2 class="text-4xl font-bold text-white font-['Pixelify_Sans']">{{ game.titulo }}</h2>
            
            <!-- Género del juego -->
            <div class="flex gap-2">
              <span
                class="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-full text-xs uppercase">
                {{ game.genero }}
              </span>
            </div>

            <!-- Descripción del juego -->
            <p class="text-gray-400 font-['Poppins']">{{ game.descripcion }}</p>
          </div>

        </div>
      </AnimatedModalContent>

      <!-- ---------------------- FOOTER CON BOTÓN CERRAR ---------------------- -->
      <AnimatedModalFooter v-if="game" class="!bg-black border-t border-white/10">
        <button @click="isOpen = false"
          class="w-full px-6 py-4 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700 border border-zinc-700">
          Cerrar
        </button>
      </AnimatedModalFooter>

    </AnimatedModalBody>
  </AnimatedModal>
</template>
