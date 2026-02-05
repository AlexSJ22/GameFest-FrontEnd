<script setup>
// ---------------------- IMPORTACIONES ----------------------
// Importamos hooks de Vue para manejo de estado y ciclo de vida
import { ref, onMounted, watch } from 'vue'

// Importamos router para navegación programática
import { useRouter } from 'vue-router'

// Importamos Pinia store de autenticación para manejar roles de usuario
import { useAuthStore } from '@/stores/authStore'

// Instancia de axios personalizada para llamadas HTTP
import api from '@/lib/api'

// Componentes UI reutilizables
import GlareCard from '@/components/ui/GlareCard.vue'
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern.vue'

// ---------------------- VARIABLES REACTIVAS ----------------------
const router = useRouter()      // Router para navegación
const authStore = useAuthStore() // Store de auth para roles y permisos

// Lista de eventos obtenidos del backend
const events = ref([])

// Total de eventos devueltos por el backend
const total = ref(0)

// Indicador de carga general (muestra spinner mientras se obtienen datos)
const loading = ref(true)

// Página actual para paginación
const currentPage = ref(1)

// Objeto de filtros aplicables: tipo, fecha y disponibilidad de plazas
const filters = ref({
  type: '',          // Filtro por tipo de evento
  date: '',          // Filtro por fecha
  onlyAvailable: false // Mostrar solo eventos con plazas libres
})

// ---------------------- FUNCIONES ----------------------

// Función principal para obtener eventos desde la API
const fetchEvents = async () => {
  loading.value = true // Activamos loading
  try {
    // Endpoint principal para obtener eventos
    const endpoint = '/events'

    // Creamos los parámetros de la petición según filtros activos
    const params = {
      page: currentPage.value,                     // Página actual
      tipo: filters.value.type || undefined,      // Tipo de evento si hay filtro
      fecha: filters.value.date || undefined,     // Fecha si hay filtro
      plazas: filters.value.onlyAvailable || undefined // Solo disponibles si está activo
    }

    // Llamada GET a la API con parámetros
    const response = await api.get(endpoint, { params })

    if (response.data.error) {
      console.error(response.data.error) // Si el backend devuelve error, lo mostramos
    } else {
      events.value = response.data.eventos || [] // Guardamos eventos, fallback a array vacío
      total.value = response.data.total || 0     // Guardamos total de eventos, fallback a 0
    }
  } catch (error) {
    console.error('Error fetching events:', error) // Manejo de errores de red
  } finally {
    loading.value = false // Desactivamos loading
  }
}

// Función para abrir detalle de un evento
const openEventDetail = (eventId) => {
  // Navega a la ruta event-detail pasando el ID
  router.push({ name: 'event-detail', params: { id: eventId } })
}

// ---------------------- WATCHERS ----------------------

// Observamos cambios en los filtros
watch(filters, () => {
  currentPage.value = 1   // Reiniciamos la página al cambiar filtros
  fetchEvents()           // Volvemos a cargar eventos filtrados
}, { deep: true })

// Observamos cambios en la ruta para recargar eventos cuando se vuelve desde detalle
watch(
  () => router.currentRoute.value.path,
  (newPath, oldPath) => {
    if (oldPath.includes('/events/') && newPath === '/events') {
      fetchEvents(); // Si venimos de un detalle y volvemos a listado, recargamos
    }
  }
)

// Ejecutamos fetchEvents al montar el componente
onMounted(fetchEvents)

// ---------------------- HELPER ----------------------

// Función para obtener clases de color según tipo de evento
const getTipoStyles = (tipo) => {
  const styles = {
    taller: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
    charla: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
    torneo: 'bg-red-500/20 border-red-500/50 text-red-400',
    presentacion: 'bg-green-500/20 border-green-500/50 text-green-400',
    'mesa-redonda': 'bg-orange-500/20 border-orange-500/50 text-orange-400',
    networking: 'bg-pink-500/20 border-pink-500/50 text-pink-400',
    exhibicion: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
    competicion: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
  }
  // Devuelve la clase correspondiente al tipo, o gris por defecto
  return styles[tipo.toLowerCase()] || 'bg-gray-500/20 border-gray-500/50 text-gray-400'
}
</script>

<template>
  <!-- Contenedor principal de la página -->
  <div class="relative min-h-screen">

    <!-- ---------------------- HERO DE EVENTOS ---------------------- -->
    <div class="eventHero relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <!-- Título principal con efecto degradado -->
      <h1
        class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl absolute font-bold font-['Poppins'] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [text-shadow:_0_0_30px_black] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent px-4 text-center uppercase">
        Eventos
      </h1>
      <!-- Patrón interactivo de fondo -->
      <InteractiveGridPattern class="w-full h-full" squaresClassName="hover:fill-purple-500/30" :width="100"
        :height="100" :squares="[80, 80]" />
    </div>

    <!-- ---------------------- FILTROS Y LISTADO ---------------------- -->
    <div class="bg-black py-8 px-4 sm:py-10 sm:px-6 md:py-12 lg:px-10 min-h-screen">
      <div class="max-w-7xl mx-auto">

        <!-- Sección de filtros -->
        <div class="bg-black py-8 px-0 sm:py-10 sm:px-0 md:py-12 lg:px-0">
          <div class="max-w-7xl mx-auto">
            <div class="mb-6 sm:mb-8">
              <h2
                class="text-3xl sm:text-4xl md:text-5xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Eventos Disponibles
              </h2>
              <p class="text-gray-400 mt-2 text-sm sm:text-base font-['Poppins']">
                Encuentra el evento perfecto para ti
              </p>
            </div>

            <!-- ---------------------- CAMPOS DE FILTRO ---------------------- -->
            <div class="flex flex-col gap-4 sm:gap-4 md:grid md:grid-cols-3">
              <!-- Filtro por tipo de evento -->
              <div class="w-full">
                <label class="block text-sm font-medium text-purple-400 mb-2 font-['Poppins']">
                  Tipo de Evento
                </label>
                <select v-model="filters.type"
                  class="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10">
                  <option value="" class="bg-gray-900">Todos los tipos</option>
                  <option value="Presentación" class="bg-gray-900">Presentación</option>
                  <option value="Charla" class="bg-gray-900">Charla</option>
                  <option value="Taller" class="bg-gray-900">Taller</option>
                  <option value="Mesa Redonda" class="bg-gray-900">Mesa Redonda</option>
                  <option value="Exhibición" class="bg-gray-900">Exhibición</option>
                  <option value="Torneo" class="bg-gray-900">Torneo</option>
                  <option value="Networking" class="bg-gray-900">Networking</option>
                  <option value="Competición" class="bg-gray-900">Competición</option>
                </select>
              </div>

              <!-- Filtro por fecha -->
              <div class="w-full">
                <label class="block text-sm font-medium text-purple-400 mb-2 font-['Poppins']">
                  Fecha
                </label>
                <input v-model="filters.date" type="date"
                  class="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10">
              </div>

              <!-- Filtro por disponibilidad de plazas -->
              <div class="w-full flex items-end">
                <label
                  class="flex items-center gap-3 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm sm:text-base cursor-pointer hover:bg-white/10 transition-all w-full">
                  <input v-model="filters.onlyAvailable" type="checkbox"
                    class="w-5 h-5 rounded border-purple-500/30 bg-white/5 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 focus:ring-offset-black cursor-pointer">
                  <span class="select-none">Solo con plazas libres</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- ---------------------- LOADING ---------------------- -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <p class="text-purple-500 font-['Pixelify_Sans'] text-2xl animate-pulse">Cargando eventos...</p>
        </div>

        <!-- ---------------------- LISTADO DE EVENTOS ---------------------- -->
        <div v-else class="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="event in events" :key="event.id" @click="openEventDetail(event.id)"
            class="cursor-pointer group/wrapper">
            
            <!-- Tarjeta GlareCard -->
            <GlareCard
              class="flex flex-col items-start justify-end py-6 px-5 min-h-[350px] sm:min-h-[380px] md:min-h-[400px] relative overflow-hidden group">
              
              <div class="relative z-10 w-full">
                <!-- Tipo de evento -->
                <span
                  class="inline-block px-3 py-1 border rounded-full text-xs font-semibold font-['Poppins'] uppercase mb-3"
                  :class="getTipoStyles(event.tipo)">
                  {{ event.tipo }}
                </span>
                <!-- Título -->
                <p class="font-bold text-white text-xl sm:text-2xl mb-3 sm:mb-4 font-['Pixelify_Sans'] leading-tight">
                  {{ event.titulo }}
                </p>
                <!-- Información adicional: fecha, hora, plazas -->
                <div class="space-y-2 text-xs sm:text-sm">
                  <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                    📅 {{ event.fecha }}
                  </p>
                  <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                    ⏰ {{ event.hora }}
                  </p>
                  <p class="font-normal font-['Poppins'] flex items-center gap-2"
                    :class="event.plazasLibres > 0 ? 'text-green-400' : 'text-red-400'">
                    👥 {{ event.plazasLibres }} plazas disponibles
                  </p>
                </div>
                <!-- Botón de inscripción -->
                <button
                  class="mt-4 sm:mt-6 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm sm:text-base font-['Poppins'] hover:scale-105 active:scale-95 transition-transform">
                  Inscribirse
                </button>
              </div>

              <!-- Imagen de fondo con efecto de opacidad -->
              <img
                class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                :src="`http://localhost/GameFest-BackEnd/gamefest_resources/events/${event.imagen}`"
                :alt="event.titulo" />
            </GlareCard>
          </div>
        </div>

        <!-- ---------------------- PAGINACIÓN ---------------------- -->
        <div v-if="!loading" class="mt-12 flex justify-center items-center gap-6">
          <button @click="currentPage--; fetchEvents()" :disabled="currentPage === 1"
            class="px-6 py-2 bg-white/5 border border-purple-500/30 text-white rounded-xl font-['Poppins'] hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed">
            Anterior
          </button>
          <span class="text-purple-400 font-bold font-['Pixelify_Sans'] text-lg">Página {{ currentPage }}</span>
          <button @click="currentPage++; fetchEvents()" :disabled="total <= 9 * currentPage"
            class="px-6 py-2 bg-white/5 border border-purple-500/30 text-white rounded-xl font-['Poppins'] hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed">
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- ---------------------- RENDER DE ROUTER-VIEW ---------------------- -->
    <router-view v-slot="{ Component }">
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- ---------------------- BOTÓN CREAR EVENTO (ADMIN) ---------------------- -->
    <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 scale-0"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-0">
      <button v-if="authStore.role === 'ADMIN'" @click="router.push('/events/create')"
        class="fixed bottom-8 right-8 z-50 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <div class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <div
          class="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover:animate-ping group-hover:opacity-75">
        </div>
      </button>
    </transition>

  </div>
</template>
