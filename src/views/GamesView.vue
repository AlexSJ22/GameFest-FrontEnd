<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/lib/api'
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern.vue'
import GlareCard from '@/components/ui/GlareCard.vue'

const router = useRouter()

// State
const games = ref([])
const loading = ref(true)
const searchQuery = ref('')
const IMAGE_BASE_URL = 'http://localhost/GameFest-BackEnd/gamefest_resources/games/'

// Fetch Games
const fetchGames = async () => {
  loading.value = true
  try {
    const response = await api.get('/games')
    games.value = response.data
  } catch (error) {
    console.error('Error fetching games:', error)
  } finally {
    loading.value = false
  }
}

// Filter Logic
const filteredGames = computed(() => {
  if (!searchQuery.value) return games.value
  const query = searchQuery.value.toLowerCase()
  return games.value.filter(game =>
    game.titulo.toLowerCase().includes(query) ||
    game.genero.toLowerCase().includes(query)
  )
})

const openGameDetail = (gameId) => {
  router.push({ name: 'game-detail', params: { id: gameId } })
}

onMounted(fetchGames)
</script>

<template>
  <div class="relative min-h-screen bg-black">

    <div class="eventHero relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <h1
        class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl absolute font-bold font-['Poppins'] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [text-shadow:_0_0_30px_black] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent px-4 text-center uppercase">
        Juegos
      </h1>
      <InteractiveGridPattern class="w-full h-full" squaresClassName="hover:fill-purple-500/30" :width="100"
        :height="100" :squares="[80, 80]" />
    </div>

    <div class="py-8 px-4 sm:py-12 sm:px-6 lg:px-10 max-w-[1400px] mx-auto min-h-[50vh]">

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
            <input v-model="searchQuery" type="text" placeholder="Buscar por nombre o género..."
              class="w-full px-5 py-4 bg-white/5 border border-purple-500/30 rounded-2xl text-white font-['Poppins'] text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-md transition-all placeholder:text-gray-500 hover:bg-white/10" />
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <p class="text-purple-500 font-['Pixelify_Sans'] text-2xl animate-pulse">Cargando catálogo...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
        <div v-for="game in filteredGames" :key="game.id" @click="openGameDetail(game.id)"
          class="cursor-pointer group flex justify-center w-full">
          <GlareCard style="height: 450px; width: 100%; max-width: 400px;"
            class="flex flex-col justify-end p-6 relative overflow-hidden rounded-3xl">
            <img :src="`${IMAGE_BASE_URL}${game.imagen}`" :alt="game.titulo"
              class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

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

      <div v-if="!loading && filteredGames.length === 0" class="text-center py-20 text-gray-500 font-['Poppins']">
        No se encontraron juegos con esa búsqueda.
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>