<script setup>
// ---------------------- IMPORTACIONES ----------------------
import { ref, onMounted } from 'vue'                   // Hooks reactivas de Vue
import { useAuthStore } from '@/stores/authStore'     // Store para info del usuario
import api from '@/lib/api'                            // Helper para llamadas al backend
import LiquidBackground from '@/components/ui/LiquidBackground.vue' // Fondo animado líquido
import MyEventsCard from '@/components/MyEventsCard.vue'             // Componente de tarjeta de evento
import TextGenerateEffect from '@/components/ui/TextGenerateEffect.vue' // Efecto de texto generativo (no usado aquí)

// Imágenes estáticas para el layout
import dragonImg from '../assets/images/wallpaper/dragon.jpg'
import dragon2Img from '../assets/images/wallpaper/dragon2.jpg'

// ---------------------- STORES ----------------------
const authStore = useAuthStore()   // Obtenemos info del usuario logueado

// ---------------------- ESTADO REACTIVO ----------------------
const myEvents = ref([])   // Array con los eventos donde el usuario está inscrito
const loading = ref(true)  // Indica si estamos cargando los datos

// ---------------------- FUNCIONES ----------------------

// Función para traer los eventos del usuario desde el backend
const fetchMyEvents = async () => {
  loading.value = true
  try {
    const response = await api.get('/events/myevents.php')  // Llamada a endpoint PHP
    if (response.data.success) {
      myEvents.value = response.data.eventos                // Guardamos los eventos
    }
  } catch (error) {
    console.error('Error fetching my events:', error)
  } finally {
    loading.value = false
  }
}

// Función para desuscribirse de un evento
const handleUnsubscribe = async (eventId) => {
  try {
    const response = await api.post(`/events/unsignup.php?id=${eventId}`) // Endpoint de cancelación
    if (response.data.success) {
      // Eliminamos localmente el evento de la lista para actualizar la UI instantáneamente
      myEvents.value = myEvents.value.filter(e => e.id !== eventId)
    } 
  } catch (error) {
    console.error('Error unsubscribing:', error)
  }
}

// Llamamos a fetchMyEvents cuando el componente se monta
onMounted(fetchMyEvents)
</script>

<template>
  <div>
    <!-- ---------------------- HERO / HEADER ---------------------- -->
    <div class="relative h-[60vh] sm:h-[70vh] md:h-[70vh] w-full overflow-hidden">
      <!-- Fondo líquido animado -->
      <LiquidBackground class="absolute inset-0" />
      <!-- Overlay violeta semi-transparente -->
      <div class="absolute inset-0 bg-violet-900/70 pointer-events-none z-10"></div>
      <!-- Contenido central del hero -->
      <div class="relative z-20 h-full flex items-center justify-center">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-['Poppins'] [text-shadow:_0_0_30px_black] text-black px-4 text-center uppercase">
          Mis Eventos
        </h1>
      </div>
    </div>

    <!-- ---------------------- SECCIÓN PRINCIPAL ---------------------- -->
    <div class="py-6 px-4 sm:py-12 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
      
      <!-- ---------------------- TARJETAS DE PERFIL Y NAVEGACIÓN ---------------------- -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        
        <!-- Tarjeta Perfil / Icono -->
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

        <!-- Tarjeta de info de usuario -->
        <div class="relative overflow-hidden rounded-lg h-56 sm:h-64 md:h-72 lg:h-64 group">
          <img :src="dragon2Img" alt=""
            class="absolute inset-0 w-full h-full object-cover blur-[2px] transition-transform duration-700 group-hover:scale-105">
          <!-- Overlay degradado -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20"></div>

          <div
            class="relative z-10 h-full flex flex-col justify-center items-center p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
            
            <!-- Username -->
            <div class="w-full">
              <p class="text-[10px] sm:text-xs uppercase tracking-widest text-purple-400 mb-1 font-['Poppins']">Username</p>
              <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white font-['Pixelify_Sans'] truncate">
                {{ authStore.user?.username || 'Usuario' }}
              </h2>
            </div>

            <div class="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            <!-- Email -->
            <div class="w-full">
              <p class="text-[10px] sm:text-xs uppercase tracking-widest text-purple-400 mb-1 font-['Poppins']">Email</p>
              <p class="text-xs sm:text-sm text-gray-300 font-['Poppins'] break-all line-clamp-1 px-2">
                {{ authStore.user?.email || 'email@example.com' }}
              </p>
            </div>

            <div class="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            <!-- Role -->
            <div class="w-full">
              <p class="text-[10px] sm:text-xs uppercase tracking-widest text-purple-400 mb-1 font-['Poppins']">Role</p>
              <p class="text-lg sm:text-xl md:text-2xl font-bold text-purple-400 font-['Pixelify_Sans'] uppercase">
                {{ authStore.user?.role || 'User' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Tarjeta Eventos / Navegación -->
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

      <!-- ---------------------- LISTADO DE EVENTOS INSCRITOS ---------------------- -->
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

        <!-- Estado de carga -->
        <div v-if="loading" class="text-center py-12">
          <p class="text-purple-400 animate-pulse font-['Pixelify_Sans'] text-xl">Cargando tus eventos...</p>
        </div>

        <!-- Lista de eventos -->
        <div v-else class="flex flex-col gap-4">
          <MyEventsCard v-for="event in myEvents" :key="event.id" :event="event" @unsubscribe="handleUnsubscribe" />
        </div>

        <!-- Mensaje si no hay eventos -->
        <div v-if="!loading && myEvents.length === 0"
          class="text-center py-12 bg-white/5 rounded-xl border border-white/10">
          <p class="text-gray-400 font-['Poppins'] text-lg">No estás inscrito en ningún evento.</p>
          <router-link to="/events" class="text-purple-400 hover:text-purple-300 mt-2 inline-block font-bold">
            ¡Explorar eventos disponibles!
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
