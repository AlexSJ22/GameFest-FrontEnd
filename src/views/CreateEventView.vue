<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/lib/api'
import LiquidBackground from '@/components/ui/LiquidBackground.vue'
import BendingGallery from '@/components/ui/BendingGallery.vue'

const events = ref([])
const loading = ref(true)
const total = ref(0)



// Form state
const formStarted = ref(false)
const currentStep = ref(1)
const eventCreated = ref(false)
const formData = ref({
  titulo: '',
  tipo: '',
  fecha: '',
  hora: '',
  plazas: '',
  imagen: ''
})

const fetchEvents = async () => {
  loading.value = true
  try {
    const response = await api.get('/events')
    console.log('Datos de la API:', response.data)
    events.value = response.data.eventos
  } catch (error) {
    console.error('Error fetching events:', error)
  } finally {
    loading.value = false
  }
}

const eventImages = computed(() => {
  return events.value.map(event => ({
    image: `http://localhost/GameFest-BackEnd/gamefest_resources/events/${event.imagen}`,
    text: ''
  }))
})

// Statistics computed properties
const totalEvents = computed(() => events.value.length)

const mostCommonType = computed(() => {
  if (events.value.length === 0) return 'N/A'
  
  const typeCounts = events.value.reduce((acc, event) => {
    acc[event.tipo] = (acc[event.tipo] || 0) + 1
    return acc
  }, {})
  
  const mostCommon = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]
  return mostCommon ? mostCommon[0] : 'N/A'
})

const recentEvent = computed(() => {
  if (events.value.length === 0) return null
  
  // Sort by date and get the most recent
  const sorted = [...events.value].sort((a, b) => {
    return new Date(b.fecha) - new Date(a.fecha)
  })
  
  return sorted[0]
})

const getTipoStyles = (tipo) => {
  const styles = {
    taller: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
    charla: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
    torneo: 'bg-red-500/20 border-red-500/50 text-red-400',
    presentacion: 'bg-green-500/20 border-green-500/50 text-green-400',
    'presentación': 'bg-green-500/20 border-green-500/50 text-green-400',
    'mesa-redonda': 'bg-orange-500/20 border-orange-500/50 text-orange-400',
    'mesa redonda': 'bg-orange-500/20 border-orange-500/50 text-orange-400',
    networking: 'bg-pink-500/20 border-pink-500/50 text-pink-400',
    exhibicion: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
    'exhibición': 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
    competicion: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
    'competición': 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
  }
  return styles[tipo?.toLowerCase()] || 'bg-gray-500/20 border-gray-500/50 text-gray-400'
}

// Form functions
const startForm = () => {
  formStarted.value = true
  currentStep.value = 1
}

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const createEvent = () => {
  console.log('Evento creado:', formData.value)
  // Aquí irá la lógica de backend en el futuro
  eventCreated.value = true
  formStarted.value = false
}

const createAnother = () => {
  // Reset form data
  formData.value = {
    titulo: '',
    tipo: '',
    fecha: '',
    hora: '',
    plazas: '',
    imagen: ''
  }
  eventCreated.value = false
  formStarted.value = true
  currentStep.value = 1
}

const resetForm = () => {
  // Reset everything
  formData.value = {
    titulo: '',
    tipo: '',
    fecha: '',
    hora: '',
    plazas: '',
    imagen: ''
  }
  eventCreated.value = false
  formStarted.value = false
  currentStep.value = 1
}

onMounted(fetchEvents)
</script>

<template>
  <div>
    <!-- Header with LiquidBackground -->
    <div class="relative h-[60vh] sm:h-[70vh] md:h-[70vh] w-full overflow-hidden">
      <LiquidBackground class="absolute inset-0" />
      <div class="absolute inset-0 bg-violet-900/70 pointer-events-none z-10"></div>
      <div class="relative z-20 h-full flex items-center justify-center">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-['Poppins'] [text-shadow:_0_0_30px_black] text-black px-4 text-center uppercase">
          Crear Evento
        </h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="py-6 px-4 sm:py-12 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
      <!-- Section Title -->
      <div class="mb-6">
        <h2
          class="text-3xl sm:text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Galería de Eventos
        </h2>
        <p class="text-gray-400 mt-2 text-sm sm:text-base font-['Poppins']">
          Explora los eventos existentes
        </p>
      </div>

      <!-- Bending Gallery -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <p class="text-purple-500 font-['Pixelify_Sans'] text-2xl animate-pulse">Cargando eventos...</p>
      </div>

      <div v-else class="relative flex h-96 w-full flex-col items-center justify-center gap-24 overflow-clip rounded-xl border border-zinc-800 mb-8 sm:mb-12">
        <BendingGallery
          :items="eventImages"
          :bend="2"
          :border-radius="0.1"
        />
      </div>

      <!-- Statistics Section -->
      <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sm:mb-12">
        
        <!-- Total Events Card -->
        <div class="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm group hover:scale-105 transition-all duration-300">
          <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-gray-400 text-sm font-['Poppins'] mb-2">Total de Eventos</p>
            <p class="text-5xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {{ totalEvents }}
            </p>
          </div>
        </div>

        <!-- Most Common Type Card -->
        <div class="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm group hover:scale-105 transition-all duration-300">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p class="text-gray-400 text-sm font-['Poppins'] mb-2">Tipo Más Común</p>
            <p class="text-3xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              {{ mostCommonType }}
            </p>
          </div>
        </div>

        <!-- Recent Event Card -->
        <div v-if="recentEvent" class="relative overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm group hover:scale-105 transition-all duration-300">
          <div class="absolute inset-0 opacity-20">
            <img 
              :src="`http://localhost/GameFest-BackEnd/gamefest_resources/events/${recentEvent.imagen}`" 
              :alt="recentEvent.titulo"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span 
                class="px-3 py-1 text-xs font-semibold font-['Poppins'] border rounded-full"
                :class="getTipoStyles(recentEvent.tipo)"
              >
                {{ recentEvent.tipo }}
              </span>
            </div>
            <p class="text-gray-400 text-sm font-['Poppins'] mb-2">Evento Reciente</p>
            <p class="text-xl font-bold font-['Pixelify_Sans'] text-white truncate mb-1">
              {{ recentEvent.titulo }}
            </p>
            <p class="text-sm text-gray-400 font-['Poppins']">
              {{ recentEvent.fecha }} • {{ recentEvent.hora }}
            </p>
          </div>
        </div>

        <!-- Placeholder if no recent event -->
        <div v-else class="relative overflow-hidden bg-gradient-to-br from-gray-500/10 to-gray-600/10 border border-gray-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-gray-400 text-sm font-['Poppins'] mb-2">Evento Reciente</p>
            <p class="text-xl font-bold font-['Pixelify_Sans'] text-gray-500">
              Sin eventos
            </p>
          </div>
        </div>

      </div>

      <!-- Form Section -->
      <div class="mb-6">
        <h2
          class="text-3xl sm:text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Crear Nuevo Evento
        </h2>
        <p class="text-gray-400 mt-2 text-sm sm:text-base font-['Poppins']">
          Completa los detalles del evento
        </p>
      </div>

      <!-- Form Container -->
      <div class="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 sm:p-8 md:p-12 min-h-[400px] flex items-center justify-center">
        
        <!-- Initial State - Big Plus Button -->
        <transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out delay-150"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="!formStarted && !eventCreated" key="initial" class="text-center space-y-6">
            <h3 class="text-3xl sm:text-4xl md:text-5xl font-bold font-['Pixelify_Sans'] text-white">
              Crear Evento
            </h3>
            <button
              @click="startForm"
              class="group relative w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl shadow-purple-500/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 sm:w-20 sm:h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <div class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>

        <!-- Step 1: Título -->
          <div v-else-if="formStarted && currentStep === 1" key="step1" class="w-full max-w-2xl space-y-6">
            <div class="text-center mb-8">
              <p class="text-purple-400 text-sm font-['Poppins'] mb-2">Paso 1 de 3</p>
              <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-1/3 transition-all duration-500"></div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-2xl sm:text-3xl font-bold text-white mb-4 font-['Pixelify_Sans']">
                  Título del Evento
                </label>
                <input
                  v-model="formData.titulo"
                  type="text"
                  placeholder="Ej: Torneo League of Legends 2025"
                  class="w-full px-6 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white text-lg font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all placeholder:text-gray-500"
                />
              </div>

              <div>
                <label class="block text-xl sm:text-2xl font-bold text-white mb-3 font-['Pixelify_Sans']">
                  Tipo de Evento
                </label>
                <select
                  v-model="formData.tipo"
                  class="w-full px-6 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white text-lg font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                >
                  <option value="" disabled selected class="bg-gray-900">Selecciona un tipo</option>
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
            </div>
            
            <button
              @click="nextStep"
              :disabled="!formData.titulo || !formData.tipo"
              class="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg font-['Poppins'] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Siguiente →
            </button>
          </div>

        <!-- Step 2: Fecha y Hora -->
          <div v-else-if="formStarted && currentStep === 2" key="step2" class="w-full max-w-2xl space-y-6">
            <div class="text-center mb-8">
              <p class="text-purple-400 text-sm font-['Poppins'] mb-2">Paso 2 de 3</p>
              <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-2/3 transition-all duration-500"></div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-xl sm:text-2xl font-bold text-white mb-3 font-['Pixelify_Sans']">
                  Fecha del Evento
                </label>
                <input
                  v-model="formData.fecha"
                  type="date"
                  class="w-full px-6 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white text-lg font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                />
              </div>
              
              <div>
                <label class="block text-xl sm:text-2xl font-bold text-white mb-3 font-['Pixelify_Sans']">
                  Hora del Evento
                </label>
                <input
                  v-model="formData.hora"
                  type="time"
                  class="w-full px-6 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white text-lg font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                />
              </div>
            </div>
            
            <div class="flex gap-4">
              <button
                @click="previousStep"
                class="flex-1 px-6 py-4 bg-white/5 border-2 border-purple-500/30 text-white rounded-xl font-semibold text-lg font-['Poppins'] hover:bg-white/10 transition-all"
              >
                ← Atrás
              </button>
              <button
                @click="nextStep"
                :disabled="!formData.fecha || !formData.hora"
                class="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg font-['Poppins'] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Siguiente →
              </button>
            </div>
          </div>

        <!-- Step 3: Plazas e Imagen -->
          <div v-else-if="formStarted && currentStep === 3" key="step3" class="w-full max-w-2xl space-y-6">
            <div class="text-center mb-8">
              <p class="text-purple-400 text-sm font-['Poppins'] mb-2">Paso 3 de 3</p>
              <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-full transition-all duration-500"></div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-xl sm:text-2xl font-bold text-white mb-3 font-['Pixelify_Sans']">
                  Número de Plazas
                </label>
                <input
                  v-model="formData.plazas"
                  type="number"
                  min="1"
                  placeholder="Ej: 100"
                  class="w-full px-6 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white text-lg font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all placeholder:text-gray-500"
                />
              </div>
              
              <div>
                <label class="block text-xl sm:text-2xl font-bold text-white mb-3 font-['Pixelify_Sans']">
                  Imagen del Evento (URL)
                </label>
                <input
                  v-model="formData.imagen"
                  type="text"
                  placeholder="Ej: dragon.jpg"
                  class="w-full px-6 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white text-lg font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all placeholder:text-gray-500"
                />
              </div>
            </div>
            
            <div class="flex gap-4">
              <button
                @click="previousStep"
                class="flex-1 px-6 py-4 bg-white/5 border-2 border-purple-500/30 text-white rounded-xl font-semibold text-lg font-['Poppins'] hover:bg-white/10 transition-all"
              >
                ← Atrás
              </button>
              <button
                @click="createEvent"
                :disabled="!formData.plazas || !formData.imagen"
                class="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg font-['Poppins'] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Crear Evento ✓
              </button>
            </div>
          </div>

        <!-- Success State -->
          <div v-else-if="eventCreated" key="success" class="text-center space-y-8">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 sm:w-32 sm:h-32 mx-auto text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-32 h-32 sm:w-40 sm:h-40 bg-green-500/20 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <div>
              <h3 class="text-4xl sm:text-5xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">
                ¡Evento Creado!
              </h3>
              <p class="text-gray-400 font-['Poppins'] text-lg">
                El evento se ha creado exitosamente
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <button
                @click="createAnother"
                class="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg font-['Poppins'] hover:scale-105 active:scale-95 transition-all"
              >
                Crear Otro Evento
              </button>
              <button
                @click="resetForm"
                class="flex-1 px-6 py-4 bg-white/5 border-2 border-purple-500/30 text-white rounded-xl font-semibold text-lg font-['Poppins'] hover:bg-white/10 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>