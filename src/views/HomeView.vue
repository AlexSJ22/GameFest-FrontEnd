<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import NeuralBg from '@/components/ui/bg-neural/NeuralBg.vue'
import MorphingText from '@/components/ui/MorphingText.vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <div class="relative h-screen overflow-hidden bg-black">
    <NeuralBg 
      :hue="240" 
      :saturation="10" 
      :chroma="0.9"
      class="w-full h-full blur-md"
    />

    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black pointer-events-none"></div>

    <div class="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl w-full text-center space-y-8">
        
        <div 
          class="inline-block transition-all duration-700 delay-100"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
        >
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-red-500/20 border border-blue-100/30 backdrop-blur-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span class="text-purple-200 text-sm font-['Poppins'] font-medium">
              Gaming Festival 2026
            </span>
          </div>
        </div>

        <div class="space-y-4">
          <h1 
            class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold transition-all duration-700 delay-200"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >
            <span class="block bg-gradient-to-r from-violet-700 via-purple-900 to-pink-500 bg-clip-text text-transparent animate-gradient">
              GameFest
            </span>
          </h1>
        </div>

        <div 
          class="text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-['mashiro'] transition-all duration-700 delay-300"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <p class="mb-4">
            El festival de videojuegos más grande del año.
          </p>
          
          <MorphingText 
            :texts="['Talleres', 'Charlas', 'Competiciones', 'Networking']"
            :morph-time="1.5"
            :cool-down-time="0.5"
            class="!h-12 sm:!h-16 md:!h-20 !text-3xl sm:!text-4xl md:!text-5xl"
          />
        </div>

        <div 
          class="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-500"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <RouterLink
            to="/games"
            class="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-800 text-white font-['Poppins'] font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <span class="relative z-10 flex items-center gap-2">
              Explorar Juegos
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 transition-transform group-hover:translate-x-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </RouterLink>

          <RouterLink
            to="/events"
            class="group px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-['Poppins'] font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <span class="flex items-center gap-2">
              Ver Eventos
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 transition-transform group-hover:translate-x-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </span>
          </RouterLink>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

@keyframes gradient-slow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}

.animate-gradient-slow {
  background-size: 400% 400%;
  animation: gradient-slow 15s ease infinite;
}
</style>