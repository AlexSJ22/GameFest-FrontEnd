<script setup>
// ---------------------- IMPORTACIONES ----------------------
import { ref, computed } from 'vue'                     // Hooks reactivos de Vue
import { useModalStore } from '@/stores/modalStore'    // Store para manejar estado del modal
import { useAuthStore } from '@/stores/authStore'      // Store para login/registro
import {
  AnimatedModal,
  AnimatedModalBody,
  AnimatedModalContent,
  AnimatedModalFooter
} from '@/components/ui/animated-modal'              // Componentes de modal animado

// ---------------------- STORES ----------------------
const modalStore = useModalStore()  // Store del modal para abrir/cerrar
const authStore = useAuthStore()    // Store de autenticación (login/register)

// ---------------------- ESTADO REACTIVO ----------------------
const isRegistering = ref(false)   // Controla si estamos en modo registro o login
const loading = ref(false)         // Indica si se está procesando la solicitud
const errorMessage = ref('')       // Mensaje de error para mostrar al usuario

// Campos del formulario
const username = ref('')            // Nombre de usuario (solo para registro)
const email = ref('')               // Email
const password = ref('')            // Contraseña

// ---------------------- COMPUTED ----------------------
// Títulos y textos dinámicos según modo
const title = computed(() => isRegistering.value ? 'CREAR CUENTA' : 'BIENVENIDO')
const subtitle = computed(() => isRegistering.value ? 'Únete a la comunidad GameFest' : 'Accede a tu cuenta de GameFest')
const buttonText = computed(() => {
  if (loading.value) return 'PROCESANDO...'  // Cambia texto si está cargando
  return isRegistering.value ? 'REGISTRARSE' : 'INICIAR SESIÓN'
})

// ---------------------- FUNCIONES ----------------------
const toggleMode = () => {
  // Cambia entre login y registro
  isRegistering.value = !isRegistering.value
  errorMessage.value = ''      // Limpia errores anteriores
  // Resetea los campos para seguridad y mejor UX
  username.value = ''
  email.value = ''
  password.value = ''
}

const handleSubmit = async () => {
  if (loading.value) return    // Evita doble submit

  errorMessage.value = ''      // Limpia errores

  // Validaciones simples para registro
  if (isRegistering.value) {
    if (username.value.length < 3) {
      errorMessage.value = 'El nombre de usuario debe tener al menos 3 caracteres'
      return
    }

    if (password.value.length < 6) {
      errorMessage.value = 'La contraseña debe tener al menos 6 caracteres'
      return
    }
  }

  loading.value = true         // Inicia estado de carga

  try {
    if (isRegistering.value) {
      // ---------------- REGISTRO ----------------
      console.log('🔍 Datos a enviar:', {
        username: username.value,
        email: email.value,
        password: password.value ? 'length: ' + password.value.length : 'VACÍO'
      })

      // Llamada al store para registrar usuario
      const res = await authStore.register(username.value, email.value, password.value)
      if (res.success) {
        isRegistering.value = false   // Cambia a login tras registro exitoso
      } else {
        errorMessage.value = res.message
      }
    } else {
      // ---------------- LOGIN ----------------
      const res = await authStore.login(email.value, password.value)
      if (res.success) {
        modalStore.closeLogin()       // Cierra modal si login correcto
      } else {
        errorMessage.value = res.message
      }
    }
  } catch (e) {
    errorMessage.value = "Credenciales Incorrectas"
  } finally {
    loading.value = false           // Termina estado de carga
  }
}
</script>

<template>
<div class="login-modal-wrapper">
  <!-- ---------------------- MODAL ANIMADO ---------------------- -->
  <AnimatedModal :open="modalStore.isLoginOpen" @update:open="modalStore.closeLogin">
    <AnimatedModalBody
      class="max-w-[95%] sm:max-w-md w-full bg-zinc-950 border border-purple-500/30 shadow-2xl shadow-purple-500/20"
      :show-close="true" :close-on-outside="true">

      <!-- ---------------------- CONTENIDO ---------------------- -->
      <AnimatedModalContent class="p-5 sm:p-8 overflow-hidden">
        <Transition name="slide-fade" mode="out-in">
          <div :key="isRegistering" class="w-full">

            <!-- Título y subtítulo -->
            <div class="mb-6 sm:mb-8 text-center">
              <h2
                class="text-3xl sm:text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent uppercase tracking-tighter">
                {{ title }}
              </h2>
              <p class="text-gray-400 mt-2 font-['Poppins'] text-xs sm:text-sm">
                {{ subtitle }}
              </p>
            </div>

            <!-- Formulario -->
            <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-5">

              <!-- Campo username solo para registro -->
              <div v-if="isRegistering">
                <label class="block text-[10px] font-medium text-purple-400 mb-1.5 font-['Poppins'] uppercase tracking-widest">
                  Username
                </label>
                <input v-model="username" type="text" placeholder="GamerTag"
                  class="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
                  :required="isRegistering">
              </div>

              <!-- Campo email -->
              <div>
                <label class="block text-[10px] font-medium text-purple-400 mb-1.5 font-['Poppins'] uppercase tracking-widest">
                  Email
                </label>
                <input v-model="email" type="email" autocomplete="email" placeholder="jugador@gamefest.com"
                  class="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
                  required>
              </div>

              <!-- Campo contraseña -->
              <div>
                <label class="block text-[10px] font-medium text-purple-400 mb-1.5 font-['Poppins'] uppercase tracking-widest">
                  Contraseña
                </label>
                <input v-model="password" type="password" autocomplete="current-password" placeholder="••••••••"
                  class="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
                  required>
              </div>

              <!-- Mensaje de error -->
              <div v-if="errorMessage"
                class="text-red-500 text-[11px] text-center font-['Poppins'] font-bold bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                {{ errorMessage }}
              </div>

              <!-- Toggle entre login y registro -->
              <div class="flex justify-center text-xs font-['Poppins'] pt-2">
                <button type="button" @click="toggleMode"
                  class="text-pink-500 hover:text-purple-400 transition-colors font-semibold uppercase tracking-widest">
                  {{ isRegistering ? 'Volver al Login' : 'Crear nueva cuenta' }}
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </AnimatedModalContent>

      <!-- ---------------------- FOOTER CON BOTÓN ---------------------- -->
      <AnimatedModalFooter class="bg-zinc-900/50 border-t border-purple-500/10 p-5 sm:p-6">
        <button @click="handleSubmit" :disabled="loading"
          class="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold font-['Poppins'] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed">
          {{ buttonText }}
        </button>
      </AnimatedModalFooter>

    </AnimatedModalBody>
  </AnimatedModal>
</div>
</template>

<style scoped>
/* ---------------------- ANIMACIÓN DE TRANSICIÓN SLIDE-FADES ---------------------- */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
