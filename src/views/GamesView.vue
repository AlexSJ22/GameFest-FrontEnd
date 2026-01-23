<script setup>
import { ref } from 'vue'
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern.vue'

const searchQuery = ref('')

const placeholderCards = Array.from({ length: 6 }, (_, i) => i)
</script>

<template>
  <div class="relative min-h-screen bg-black">
    
    <div class="eventHero relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <h1 class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl absolute font-bold font-['Poppins'] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [text-shadow:_0_0_30px_black] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent px-4 text-center">
        JUEGOS
      </h1>
      <InteractiveGridPattern
        class="w-full h-full"
        squaresClassName="hover:fill-purple-500/30"
        :width="100"
        :height="100"
        :squares="[80, 80]"
      />
    </div>

    <div class="py-8 px-4 sm:py-12 sm:px-6 lg:px-10 max-w-7xl mx-auto">
      
      <div class="mb-12">
        <div class="max-w-2xl">
          <h2 class="text-3xl sm:text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Explorar Catálogo
        </h2>
        <p class="text-gray-400 mb-5 text-sm sm:text-base font-['Poppins']">
        Encuentra el evento perfecto para ti
        </p>
          <div class="relative">
              <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar un juego..."
              class="w-full px-5 py-4 bg-white/5 border border-purple-500/30 rounded-2xl text-white font-['Poppins'] text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-md transition-all placeholder:text-gray-500 hover:bg-white/10"
            />
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500/50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="card in placeholderCards" 
          :key="card"
          class="relative group"
        >
          <div class="h-64 sm:h-72 md:h-80 w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10">
            
            <div class="absolute inset-2 border border-dashed border-white/5 rounded-xl pointer-events-none"></div>
            
            <p class="text-neutral-500 font-['Pixelify_Sans'] text-xl sm:text-2xl group-hover:text-blue-400 transition-colors">
              Tarjetas de Jagoba
            </p>

            <div class="absolute top-4 right-4 h-2 w-2 bg-blue-500/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div v-if="searchQuery && placeholderCards.length === 0" class="text-center py-20">
        <p class="text-gray-500 font-['Poppins']">No se encontraron juegos que coincidan con "{{ searchQuery }}"</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* You can add specific transitions here if needed */
</style>