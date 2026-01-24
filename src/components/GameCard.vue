<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center w-full">
    <div 
      v-for="game in juegos" 
      :key="game.id"
      @click="handleGameClick(game)"
      class="cursor-pointer"
    >
      <GlareCard class="flex flex-col justify-end relative overflow-hidden group">
        
        <img 
          :src="`http://localhost/GameFest-BackEnd-feat-methodsSQL/gamefest_resources/games/${game.imagen}?v=${new Date().getTime()}`"
          @error="handleImageError"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        <div class="relative z-10 w-full p-6">
          <div class="relative z-10 w-full py-4 px-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:-translate-y-2">
            <h2 class="font-['mashiro'] text-xl font-bold text-white text-center uppercase tracking-[0.2em] drop-shadow-md">
              {{ game.titulo }}
            </h2>
          </div>
        </div>
      </GlareCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GlareCard from '@/components/ui/GlareCard.vue'

const juegos = ref([])
const router = useRouter()

const handleGameClick = (game) => {
  router.push({ name: 'game-detail', params: { id: game.id } })
}

const handleImageError = (event) => {
  // Fallback image if the main one fails
  event.target.style.display = 'none'; // or set a placeholder src
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost/GameFest-BackEnd-feat-methodsSQL/games.php')
    const data = await res.json()
    juegos.value = data
  } catch (error) {
    console.error("Error cargando juegos:", error)
  }
})
</script>