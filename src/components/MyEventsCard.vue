<script setup>
import { ref } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['unsubscribe'])

const isRemoving = ref(false)

import dragonImg from '../assets/images/wallpaper/dragon.jpg'
import dragon2Img from '../assets/images/wallpaper/dragon2.jpg'
import dragon3Img from '../assets/images/wallpaper/dragon3.jpg'

const imageMap = {
  'dragon.jpg': dragonImg,
  'dragon2.jpg': dragon2Img,
  'dragon3.jpg': dragon3Img
}

const getImageSrc = (imageName) => {
  return imageMap[imageName] || dragonImg
}

const getTipoStyles = (tipo) => {
  const styles = {
    taller: 'bg-purple-500/20 border-purple-500 text-purple-400',
    charla: 'bg-blue-500/20 border-blue-500 text-blue-400',
    torneo: 'bg-red-500/20 border-red-500 text-red-400',
    exhibicion: 'bg-cyan-500/20 border-cyan-500 text-cyan-400',
    presentacion: 'bg-green-500/20 border-green-500 text-green-400',
    'mesa-redonda': 'bg-orange-500/20 border-orange-500 text-orange-400',
    networking: 'bg-pink-500/20 border-pink-500 text-pink-400',
    competicion: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
  }
  return styles[tipo.toLowerCase()] || 'bg-gray-500/20 border-gray-500 text-gray-400'
}

const handleUnsubscribe = () => {
  isRemoving.value = true
  setTimeout(() => {
    emit('unsubscribe', props.event.id)
  }, 400)
}
</script>

<template>
  <div 
    class="group relative bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl overflow-hidden hover:border-purple-500/60 transition-all duration-300"
    :class="{ 'removing': isRemoving }"
  >
    
    <div class="flex flex-col sm:hidden">
      <div class="relative h-48 overflow-hidden">
        <div class="zigzag-bottom absolute inset-0">
          <img 
            :src="`http://localhost/GameFest-BackEnd-feat-methodsSQL/gamefest_resources/events/${event.imagen}`"
            :alt="event.titulo"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
      
      <div class="p-4 space-y-3">
        <span 
          class="inline-block px-3 py-1 border rounded-full text-xs font-semibold font-['Poppins'] uppercase"
          :class="getTipoStyles(event.tipo)">
          {{ event.tipo }}
        </span>
        
        <h3 class="text-xl font-bold text-white font-['Pixelify_Sans']">
          {{ event.titulo }}
        </h3>
        
        <div class="space-y-2 text-sm">
          <p class="text-gray-300 font-['Poppins'] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ event.fecha }}
          </p>
          <p class="text-gray-300 font-['Poppins'] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ event.hora }}
          </p>
        </div>
        
        <button 
          @click="handleUnsubscribe"
          class="w-full px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold font-['Poppins'] hover:scale-105 active:scale-95 transition-transform">
          Desapuntarse
        </button>
      </div>
    </div>

    <!-- Desktop Layout (Horizontal) -->
    <div class="hidden sm:flex items-stretch min-h-[180px] lg:min-h-[200px]">
      <div class="flex-1 p-6 lg:p-8 flex flex-col justify-between">
        <div class="space-y-3 lg:space-y-4">
          <span 
            class="inline-block px-3 py-1 border rounded-full text-xs font-semibold font-['Poppins'] uppercase"
            :class="getTipoStyles(event.tipo)">
            {{ event.tipo }}
          </span>
          
          <h3 class="text-2xl lg:text-3xl font-bold text-white font-['Pixelify_Sans'] leading-tight">
            {{ event.titulo }}
          </h3>
          
          <div class="flex flex-wrap gap-4 text-sm lg:text-base">
            <p class="text-gray-300 font-['Poppins'] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ event.fecha }}
            </p>
            <p class="text-gray-300 font-['Poppins'] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ event.hora }}
            </p>
          </div>
        </div>
        
        <button 
          @click="handleUnsubscribe"
          class="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold font-['Poppins'] hover:scale-105 active:scale-95 transition-transform self-start">
          Desapuntarse
        </button>
      </div>
      
      <div class="relative w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden">
        <div class="diagonal-clip absolute inset-0">
          <img 
            :src="`http://localhost/GameFest-BackEnd-feat-methodsSQL/gamefest_resources/events/${event.imagen}`"
            :alt="event.titulo"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diagonal-clip {
  clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.zigzag-bottom {
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 100%,
    95% 90%,
    90% 100%,
    85% 90%,
    80% 100%,
    75% 90%,
    70% 100%,
    65% 90%,
    60% 100%,
    55% 90%,
    50% 100%,
    45% 90%,
    40% 100%,
    35% 90%,
    30% 100%,
    25% 90%,
    20% 100%,
    15% 90%,
    10% 100%,
    5% 90%,
    0% 100%
  );
}

@keyframes fadeOutScale {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
}

.removing {
  animation: fadeOutScale 0.2s ease-out forwards;
  pointer-events: none;
}
</style>