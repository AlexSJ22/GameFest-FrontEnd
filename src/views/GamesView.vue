<script setup>
// ---------------------- IMPORTACIONES ----------------------
import { ref, onMounted, computed } from 'vue'  // Hooks de Vue
import { useRouter } from 'vue-router'          // Router para navegación
import api from '@/lib/api'                     // Instancia axios para llamadas HTTP
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern.vue' // Fondo animado
import GlareCard from '@/components/ui/GlareCard.vue'  // Tarjeta con efecto de brillo

// ---------------------- ROUTER ----------------------
const router = useRouter() // Para navegar a detalle del juego

// ---------------------- ESTADO REACTIVO ----------------------
const games = ref([])         // Array que contendrá los juegos
const loading = ref(true)     // Indica si estamos cargando los datos
const searchQuery = ref('')   // Texto del input de búsqueda

// URL base para imágenes de juegos
const IMAGE_BASE_URL = 'http://localhost/GameFest-BackEnd/gamefest_resources/games/'

// ---------------------- FUNCIONES ----------------------

// Función para traer todos los juegos
const fetchGames = async () => {
  loading.value = true
  try {
    const response = await api.get('/games') // Llamada al endpoint
    games.value = response.data             // Guardamos los juegos
  } catch (error) {
    console.error('Error fetching games:', error)
  } finally {
    loading.value = false
  }
}

// Función para buscar juegos por nombre o género
const handleSearch = async () => {
  const query = searchQuery.value.trim()   // Limpiamos espacios
  console.log(query)

  // Si no hay texto, traemos todos los juegos
  if (!query) {
    fetchGames()
    return
  }

  // Llamada al endpoint de búsqueda
  try {
    loading.value = true
    const response = await api.get(`/games/gamefilter.php?q=${query}`)
    games.value = response.data
  } catch (error) {
    console.error('Error searching games:', error)
  } finally {
    loading.value = false
  }
}

// Función para abrir la vista de detalle del juego
const openGameDetail = (gameId) => {
  router.push({ name: 'game-detail', params: { id: gameId } })
}

// Ejecutamos la función al montar el componente
onMounted(fetchGames)
</script>

<template>
  <div class="relative min-h-screen bg-black">

    <!-- ---------------------- HERO ---------------------- -->
    <div class="eventHero relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <!-- Título principal -->
      <h1
        class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl absolute font-bold font-['Poppins'] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [text-shadow:_0_0_30px_black] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent px-4 text-center uppercase">
        Juegos
      </h1>
      <!-- Patrón de fondo interactivo -->
      <InteractiveGridPattern class="w-full h-full" squaresClassName="hover:fill-purple-500/30" :width="100"
        :height="100" :squares="[80, 80]" />
    </div>

    <!-- ---------------------- CONTENIDO PRINCIPAL ---------------------- -->
    <div class="py-8 px-4 sm:py-12 sm:px-6 lg:px-10 max-w-[1400px] mx-auto min-h-[50vh]">

      <!-- ---------------------- BUSCADOR ---------------------- -->
      <div class="flex flex-col mb-12">
        <div class="w-full max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <h2
            class="text-3xl sm:text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Explorar Catálogo
          </h2>
          <p class="text-gray-400 mb-5 text-sm sm:text-base font-['Poppins']">
            Encuentra el juego perfecto para ti
          </p>
          <div class="relative">
            <!-- Input de búsqueda -->
            <input v-model="searchQuery"  @keyup.enter="handleSearch" type="text" placeholder="Buscar por nombre o género..."
              class="w-full px-5 py-4 bg-white/5 border border-purple-500/30 rounded-2xl text-white font-['Poppins'] text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-md transition-all placeholder:text-gray-500 hover:bg-white/10" />
          </div>
        </div>
      </div>

      <!-- ---------------------- CARGANDO ---------------------- -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <p class="text-purple-500 font-['Pixelify_Sans'] text-2xl animate-pulse">Cargando catálogo...</p>
      </div>

      <!-- ---------------------- LISTADO DE JUEGOS ---------------------- -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
        <div v-for="game in games" :key="game.id" @click="openGameDetail(game.id)"
          class="cursor-pointer group flex justify-center w-full">
          
          <!-- Tarjeta de juego -->
          <GlareCard style="height: 450px; width: 100%; max-width: 400px;"
            class="flex flex-col justify-end p-6 relative overflow-hidden rounded-3xl">
            
            <!-- Imagen del juego -->
            <img :src="`${IMAGE_BASE_URL}${game.imagen}`" :alt="game.titulo"
              class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105" />
            
            <!-- Gradiente encima de la imagen -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <!-- Contenido del juego (título y género) -->
            <div class="relative z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span
                class="inline-block px-3 py-1 mb-3 bg-purple-500/30 border border-purple-500/50 text-purple-300 rounded-full text-xs font-bold uppercase backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                {{ game.genero }}
              </span>
              <h3 class="text-3xl font-bold text-white font-['Pixelify_Sans'] mb-1 drop-shadow-md leading-none">
                {{ game.titulo }}
              </h3>
            </div>
          </GlareCard>
        </div>
      </div>

      <!-- ---------------------- MENSAJE SI NO HAY RESULTADOS ---------------------- -->
      <div v-if="!loading && games.length === 0" class="text-center py-20 text-gray-500 font-['Poppins']">
        No se encontraron juegos con esa búsqueda.
      </div>
    </div>

    <!-- ---------------------- VISTA DE RUTAS HIJAS (MODAL DETALLE) ---------------------- -->
    <router-view v-slot="{ Component }">
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>
