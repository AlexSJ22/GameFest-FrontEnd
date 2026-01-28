<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import LiquidBackground from '@/components/ui/LiquidBackground.vue'
import MyEventsCard from '@/components/MyEventsCard.vue'
import TextGenerateEffect from '@/components/ui/TextGenerateEffect.vue'
const authStore = useAuthStore()

import dragonImg from '../assets/images/wallpaper/dragon.jpg'
import dragon2Img from '../assets/images/wallpaper/dragon2.jpg'

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

const handleUnsubscribe = (eventId) => {
  console.log('Desapuntando del evento:', eventId)
  myEvents.value = myEvents.value.filter(e => e.id !== eventId)
}
</script>

<template>
  <div>
    <div class="relative h-[60vh] sm:h-[70vh] md:h-[70vh] w-full overflow-hidden">
      <LiquidBackground class="absolute inset-0" />
      <div class="absolute inset-0 bg-violet-900/70 pointer-events-none z-10"></div>
      <div class="relative z-20 h-full flex items-center justify-center">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-['Poppins'] [text-shadow:_0_0_30px_black] text-black px-4 text-center uppercase">
          Mis Eventos
        </h1>
      </div>
    </div>

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
            class="absolute inset-0 w-full h-full object-cover blur-[2px] transition-transform duration-700 group-hover:scale-105">

          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20"></div>

          <div
            class="relative z-10 h-full flex flex-col justify-center items-center p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
            <div class="w-full">
              <p class="text-[10px] sm:text-xs uppercase tracking-widest text-purple-400 mb-1 font-['Poppins']">Username
              </p>
              <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white font-['Pixelify_Sans'] truncate">
                {{ authStore.user?.username || 'Usuario' }}
              </h2>
            </div>

            <div class="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            <div class="w-full">
              <p class="text-[10px] sm:text-xs uppercase tracking-widest text-purple-400 mb-1 font-['Poppins']">Email
              </p>
              <p class="text-xs sm:text-sm text-gray-300 font-['Poppins'] break-all line-clamp-1 px-2">
                {{ authStore.user?.email || 'email@example.com' }}
              </p>
            </div>

            <div class="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            <div class="w-full">
              <p class="text-[10px] sm:text-xs uppercase tracking-widest text-purple-400 mb-1 font-['Poppins']">Role</p>
              <p class="text-lg sm:text-xl md:text-2xl font-bold text-purple-400 font-['Pixelify_Sans'] uppercase">
                {{ authStore.user?.role || 'Pakistanie' }}
              </p>
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

      <div class="space-y-4 sm:space-y-6">
        <div class="mb-6">
          <h2
            class="text-3xl sm:text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Eventos Inscritos
          </h2>
          <p class="text-gray-400 mt-2 text-sm sm:text-base font-['Poppins']">
            Gestiona tus inscripciones
          </p>
        </div>

        <MyEventsCard v-for="event in myEvents" :key="event.id" :event="event" @unsubscribe="handleUnsubscribe" />

        <div v-if="myEvents.length === 0" class="text-center py-12">
          <p class="text-gray-400 font-['Poppins'] text-lg">No estás inscrito en ningún evento</p>
        </div>
      </div>
    </div>
  </div>
</template>