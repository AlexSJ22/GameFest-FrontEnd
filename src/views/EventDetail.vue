<script setup>
/* ===============================
   IMPORTS Y HOOKS DE VUE
================================ */
import { ref, computed, onMounted } from 'vue'       // ref para estados reactivos, computed para valores derivados, onMounted para ejecutar al montar
import { useRouter } from 'vue-router'              // useRouter para navegación programática
import api from '@/lib/api'                          // instancia de axios personalizada
import {
  AnimatedModal,
  AnimatedModalBody,
  AnimatedModalContent,
  AnimatedModalFooter
} from '@/components/ui/animated-modal'           // Componentes del modal animado

/* ===============================
   PROPS
================================ */
const props = defineProps({
  id: String   // ID del evento que queremos mostrar
})

/* ===============================
   ESTADOS REACTIVOS
================================ */
const router = useRouter()           // Router para navegación
const event = ref(null)              // Almacena los datos del evento
const loading = ref(true)            // Estado de carga de datos
const actionLoading = ref(false)     // Estado de carga del botón de inscripción

/* Estado del usuario para controlar botón e interacción */
const userStatus = ref({
  loggedIn: false,   // Si el usuario está logueado
  subscribed: false  // Si el usuario ya está inscrito al evento
})

const IMAGE_BASE_URL = 'http://localhost/GameFest-BackEnd/gamefest_resources/events/' // URL base para las imágenes del evento

/* ===============================
   CONTROL DE MODAL
================================ */
const isOpen = computed({
  get: () => true,                    // Siempre abierto mientras se vea este modal
  set: (value) => {
    if (!value) router.push({ name: 'events' }) // Al cerrar, regresar a la lista de eventos
  }
})

const close = () => {
  isOpen.value = false   // Función para cerrar modal
}

/* ===============================
   FETCH DE DATOS
   - Info del evento
   - Estado del usuario
================================ */
const fetchData = async () => {
  loading.value = true
  try {
    // Ejecuta las dos peticiones en paralelo
    const [eventRes, statusRes] = await Promise.all([
      api.get(`/events/${props.id}`),              // Info del evento
      api.get(`/events/status.php?id=${props.id}`) // Estado de usuario (logueado y suscrito)
    ])

    event.value = eventRes.data
    
    // Guardamos el estado del usuario
    userStatus.value = {
      loggedIn: statusRes.data.logged_in,
      subscribed: statusRes.data.subscribed
    }

  } catch (error) {
    console.error('Error loading data:', error)
    router.replace('/404') // Redirige a 404 si falla la carga
  } finally {
    loading.value = false
  }
}

/* ===============================
   FUNCION PARA INSCRIPCION / CANCELAR
================================ */
const handleInscription = async () => {
  if (!userStatus.value.loggedIn) {
    // Si no está logueado, no hacer nada
    return;
  }

  actionLoading.value = true
  try {
    if (userStatus.value.subscribed) {
      // --- LOGICA: CANCELAR SUSCRIPCION ---
      const res = await api.post(`/events/unsignup.php?id=${props.id}`)
      
      if (res.data.success) {
        userStatus.value.subscribed = false
        event.value.plazasLibres++ // Actualiza UI inmediatamente
      }
      
    } else {
      // --- LOGICA: INSCRIBIR ---
      const res = await api.post(`/events/signup.php?id=${props.id}`)
      
      if (res.data.success) {
        userStatus.value.subscribed = true
        event.value.plazasLibres-- // Actualiza UI inmediatamente
      }
    }
  } catch (error) {
    const msg = error.response?.data?.message || "An error occurred"
    alert(msg)
  } finally {
    actionLoading.value = false
  }
}

/* Ejecutar fetch al montar el componente */
onMounted(fetchData)

/* ===============================
   HELPER PARA ESTILOS DE PILL
================================ */
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
  return styles[tipo?.toLowerCase()] || 'bg-gray-500/20 border-gray-500/50 text-gray-400'
}
</script>


<template>
  <!-- ============================
       MODAL PRINCIPAL DEL EVENTO
  ============================ -->
  <AnimatedModal 
      :open="isOpen" 
      @update:open="isOpen = $event" 
      :close-on-esc="true">

    <AnimatedModalBody
      class="md:max-w-4xl w-full bg-zinc-900 border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
      :show-close="false" 
      :close-on-outside="true" 
      :lock-scroll="true">
      
      <!-- BOTON CERRAR MODAL -->
      <button @click="close"
        class="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-purple-500/20 border border-zinc-700 hover:border-purple-500/50 text-gray-400 hover:text-white transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- ============================
           ESTADO CARGANDO
      ============================ -->
      <div v-if="loading" class="p-20 text-center text-purple-500 font-['Pixelify_Sans'] animate-pulse">
        Cargando detalles del evento...
      </div>

      <!-- ============================
           CONTENIDO DEL EVENTO
      ============================ -->
      <AnimatedModalContent v-else-if="event" class="p-0">
        <div class="flex flex-col md:flex-row min-h-[450px]">

          <!-- IMAGEN DEL EVENTO -->
          <div class="md:w-2/5 relative h-56 md:h-auto overflow-hidden bg-zinc-800">
            <img :src="IMAGE_BASE_URL + event.imagen" :alt="event.titulo"
              class="w-full h-full object-cover opacity-80" />
            <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-900/40 to-transparent"></div>
          </div>

          <!-- DETALLES DEL EVENTO -->
          <div class="md:w-3/5 p-6 md:p-8 space-y-6 flex flex-col justify-center">
            <!-- Tipo y Título -->
            <div>
              <span
                class="inline-block px-3 py-1 border rounded-full text-xs font-semibold font-['Poppins'] uppercase mb-3"
                :class="getTipoStyles(event.tipo)">
                {{ event.tipo }}
              </span>

              <h2 class="text-3xl font-bold text-white font-['Pixelify_Sans'] leading-tight">
                {{ event.titulo }}
              </h2>
            </div>

            <!-- Fecha, Hora y Plazas -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-['Poppins']">
              <div class="flex items-center gap-3 text-gray-300">
                <span class="text-xl">📅</span>
                <span>{{ event.fecha }}</span>
              </div>
              <div class="flex items-center gap-3 text-gray-300">
                <span class="text-xl">⏰</span>
                <span>{{ event.hora }}h</span>
              </div>
              <div class="flex items-center gap-3" :class="event.plazasLibres > 0 ? 'text-green-400' : 'text-red-400'">
                <span class="text-xl">👥</span>
                <span class="font-bold">{{ event.plazasLibres }} plazas libres</span>
              </div>
            </div>

            <!-- Descripción -->
            <div class="pt-4 border-t border-zinc-800">
              <p class="text-gray-400 text-sm leading-relaxed font-['Poppins']">
                {{ event.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </AnimatedModalContent>

      <!-- ============================
           FOOTER CON BOTON DE INSCRIPCION
      ============================ -->
      <AnimatedModalFooter v-if="event" class="bg-zinc-900/50 border-t border-zinc-800">
        <button
          @click="handleInscription"
          :disabled="actionLoading || (!userStatus.subscribed && event.plazasLibres <= 0 && userStatus.loggedIn)"
          class="w-full px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-[1.01] shadow-lg flex justify-center items-center gap-2"
          :class="[  /* Estilos condicionales según estado del usuario y disponibilidad de plazas */
            !userStatus.loggedIn 
                ? 'bg-zinc-700 text-gray-300 hover:bg-zinc-600' 
            : userStatus.subscribed 
                ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20' 
            : event.plazasLibres <= 0 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/20'
          ]"
        >
          <!-- Spinner mientras se ejecuta la acción -->
          <svg v-if="actionLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>

          <!-- Texto según estado -->
          <span v-else>
             {{ 
                !userStatus.loggedIn ? 'Inicia sesión para inscribirte' : 
                userStatus.subscribed ? 'Cancelar Inscripción' : 
                event.plazasLibres <= 0 ? 'Evento Completo' : 
                'Inscribirme ahora' 
             }}
          </span>
        </button>
      </AnimatedModalFooter>
    </AnimatedModalBody>
  </AnimatedModal>
</template>
