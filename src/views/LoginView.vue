<script setup>
import { ref, computed } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import { useAuthStore } from '@/stores/authStore'
import {
  AnimatedModal,
  AnimatedModalBody,
  AnimatedModalContent,
  AnimatedModalFooter
} from '@/components/ui/animated-modal'

const modalStore = useModalStore()
const authStore = useAuthStore()

// State management
const isRegistering = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// Form state
const username = ref('') // Required by registrarUsuario
const email = ref('')
const password = ref('')

// Dynamic Content based on mode
const title = computed(() => isRegistering.value ? 'CREAR CUENTA' : 'BIENVENIDO')
const subtitle = computed(() => isRegistering.value ? 'Únete a la comunidad GameFest' : 'Accede a tu cuenta de GameFest')
const buttonText = computed(() => {
  if (loading.value) return 'PROCESANDO...'
  return isRegistering.value ? 'REGISTRARSE' : 'INICIAR SESIÓN'
})

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
  errorMessage.value = ''
  // Reset fields for security and UX
  username.value = ''
  email.value = ''
  password.value = ''
}

const handleSubmit = async () => {
  if (loading.value) return

  errorMessage.value = ''

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
  loading.value = true

  try {
    if (isRegistering.value) {
      console.log('🔍 Datos a enviar:', {
        username: username.value,
        email: email.value,
        password: password.value ? 'length: ' + password.value.length : 'VACÍO'
      })

      // Logic for register.php
      const res = await authStore.register(username.value, email.value, password.value)
      if (res.success) {
        // Switch to login mode on success so they can sign in
        isRegistering.value = false
      } else {
        errorMessage.value = res.message // e.g., "El email ya esta registrado"
      }
    } else {
      // Logic for login.php
      const res = await authStore.login(email.value, password.value)
      if (res.success) {
        modalStore.closeLogin() // Close modal on successful login
      } else {
        errorMessage.value = res.message // e.g., "Credenciales incorrectas"
      }
    }
  } catch (e) {
    errorMessage.value = "Credenciales Incorrectas"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-modal-wrapper">
    <AnimatedModal :open="modalStore.isLoginOpen" @update:open="modalStore.closeLogin">
      <AnimatedModalBody
        class="max-w-[95%] sm:max-w-md w-full bg-zinc-950 border border-purple-500/30 shadow-2xl shadow-purple-500/20"
        :show-close="true" :close-on-outside="true">
        <AnimatedModalContent class="p-5 sm:p-8 overflow-hidden">
          <Transition name="slide-fade" mode="out-in">
            <div :key="isRegistering" class="w-full">
              <div class="mb-6 sm:mb-8 text-center">
                <h2
                  class="text-3xl sm:text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent uppercase tracking-tighter">
                  {{ title }}
                </h2>
                <p class="text-gray-400 mt-2 font-['Poppins'] text-xs sm:text-sm">
                  {{ subtitle }}
                </p>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-5">
                <div v-if="isRegistering">
                  <label
                    class="block text-[10px] font-medium text-purple-400 mb-1.5 font-['Poppins'] uppercase tracking-widest">
                    Username
                  </label>
                  <input v-model="username" type="text" placeholder="GamerTag"
                    class="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
                    :required="isRegistering">
                </div>

                <div>
                  <label
                    class="block text-[10px] font-medium text-purple-400 mb-1.5 font-['Poppins'] uppercase tracking-widest">
                    Email
                  </label>
                  <input v-model="email" type="email" autocomplete="email" placeholder="jugador@gamefest.com"
                    class="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
                    required>
                </div>

                <div>
                  <label
                    class="block text-[10px] font-medium text-purple-400 mb-1.5 font-['Poppins'] uppercase tracking-widest">
                    Contraseña
                  </label>
                  <input v-model="password" type="password" autocomplete="current-password" placeholder="••••••••"
                    class="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
                    required>
                </div>

                <div v-if="errorMessage"
                  class="text-red-500 text-[11px] text-center font-['Poppins'] font-bold bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                  {{ errorMessage }}
                </div>

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