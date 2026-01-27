<script setup>
import { ref } from 'vue'
import LiquidBackground from '@/components/ui/LiquidBackground.vue'

// Import images
import dragonImg from '../assets/images/wallpaper/dragon.jpg'
import dragon2Img from '../assets/images/wallpaper/dragon2.jpg'
import dragon3Img from '../assets/images/wallpaper/dragon3.jpg'

// Create image map
const imageMap = {
  'dragon.jpg': dragonImg,
  'dragon2.jpg': dragon2Img,
  'dragon3.jpg': dragon3Img
}

// Static event data
const myEvents = ref([
  {
    id: 1,
    titulo: 'Torneo League of Legends',
    fecha: '2024-02-15',
    hora: '18:00',
    tipo: 'torneo',
    imagen: 'dragon.jpg'
  },
  {
    id: 2,
    titulo: 'Charla: El Futuro del Gaming',
    fecha: '2024-02-20',
    hora: '16:30',
    tipo: 'charla',
    imagen: 'dragon2.jpg'
  },
  {
    id: 3,
    titulo: 'Taller de Desarrollo de Videojuegos',
    fecha: '2024-02-25',
    hora: '10:00',
    tipo: 'taller',
    imagen: 'dragon3.jpg'
  },
  {
    id: 4,
    titulo: 'Exhibición E-Sports Internacional',
    fecha: '2024-03-01',
    hora: '19:00',
    tipo: 'exhibicion',
    imagen: 'dragon.jpg'
  }
])

const getImageSrc = (imageName) => {
  return imageMap[imageName] || dragonImg
}

const desapuntar = (eventId) => {
  console.log('Desapuntando del evento:', eventId)
  // Logic to remove event
}

const getTipoStyles = (tipo) => {
  const styles = {
    taller: 'bg-purple-500/20 border-purple-500 text-purple-400',
    charla: 'bg-blue-500/20 border-blue-500 text-blue-400',
    torneo: 'bg-red-500/20 border-red-500 text-red-400',
    exhibicion: 'bg-cyan-500/20 border-cyan-500 text-cyan-400',
  }
  return styles[tipo.toLowerCase()] || 'bg-gray-500/20 border-gray-500 text-gray-400'
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="zero relative h-[60vh] sm:h-[70vh] md:h-[70vh] w-full overflow-hidden">
      <LiquidBackground class="absolute inset-0" />
      <div class="absolute inset-0 bg-violet-900/70 pointer-events-none z-10"></div>
      <div class="relative z-20 h-full flex items-center justify-center">
        <h1
          class="liquid text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-['Poppins'] [text-shadow:_0_0_30px_black] text-black px-4 text-center uppercase">
          Mis Eventos
        </h1>
      </div>
    </div>

    <!-- Profile Cards Grid -->
    <div class="py-6 px-4 sm:py-12 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        
        <div class="relative overflow-hidden rounded-lg h-56 sm:h-64 md:h-72 lg:h-64 group">
          <img :src="dragonImg" alt=""
            class="absolute inset-0 w-full h-full object-cover blur-[3px] transition-transform duration-700 group-hover:scale-105">
          <div class="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 mb-3" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg">Perfil</h2>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-lg h-56 sm:h-64 md:h-72 lg:h-64 group">
          <img :src="dragon2Img" alt=""
            class="absolute inset-0 w-full h-full object-cover blur-[3px] transition-transform duration-700 group-hover:scale-105">
          <div class="font-['Mona Sans'] relative z-10 flex flex-col justify-center items-center h-full p-4 sm:p-6">
            <div class="rounded-xl bg-black/60 backdrop-blur-md p-4 sm:p-6 w-full border border-white/20">
              <div class="space-y-3 sm:space-y-4">
                <div>
                  <p class="text-xs uppercase tracking-wider text-gray-300 mb-1">Username</p>
                  <p class="text-xl sm:text-2xl font-bold text-white break-words">JohnDoe123</p>
                </div>
                <div class="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div>
                  <p class="text-xs uppercase tracking-wider text-gray-300 mb-1">Email</p>
                  <p class="text-sm sm:text-base lg:text-sm font-bold text-white break-all">john@example.com</p>
                </div>
                <div class="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div>
                  <p class="text-xs uppercase tracking-wider text-gray-300 mb-1">Tipo Usuario</p>
                  <p class="text-xl sm:text-2xl font-bold text-white">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="relative overflow-hidden rounded-lg h-56 sm:h-64 md:h-72 lg:h-64 group cursor-pointer md:col-span-2 lg:col-span-1">
          <img :src="dragonImg" alt=""
            class="absolute inset-0 w-full h-full object-cover blur-[3px] transition-transform duration-700 group-hover:scale-105">
          <div class="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
            <h2 class="text-3xl sm:text-4xl font-bold drop-shadow-lg mb-3 sm:mb-4">EVENTS</h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Events List -->
      <div class="space-y-4 sm:space-y-6">
        <div class="mb-6">
          <h2 class="text-3xl sm:text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Eventos Inscritos
          </h2>
          <p class="text-gray-400 mt-2 text-sm sm:text-base font-['Poppins']">
            Gestiona tus inscripciones
          </p>
        </div>

        <div v-for="event in myEvents" :key="event.id"
          class="group relative bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl overflow-hidden hover:border-purple-500/60 transition-all duration-300">
          
          <!-- Mobile Layout (Vertical) -->
          <div class="flex flex-col sm:hidden">
            <div class="relative h-48 overflow-hidden">
              <div class="zigzag-bottom absolute inset-0">
                <img 
                  :src="getImageSrc(event.imagen)" 
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
                @click="desapuntar(event.id)"
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
                @click="desapuntar(event.id)"
                class="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold font-['Poppins'] hover:scale-105 active:scale-95 transition-transform self-start">
                Desapuntarse
              </button>
            </div>
            
            <div class="relative w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden">
              <div class="diagonal-clip absolute inset-0">
                <img 
                  :src="getImageSrc(event.imagen)" 
                  :alt="event.titulo"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
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
</style>