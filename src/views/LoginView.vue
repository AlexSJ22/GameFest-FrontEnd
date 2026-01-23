<script setup>
import { ref, computed } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import { 
  AnimatedModal, 
  AnimatedModalBody, 
  AnimatedModalContent, 
  AnimatedModalFooter 
} from '@/components/ui/animated-modal'

const modalStore = useModalStore()

// State to toggle between Login and Register
const isRegistering = ref(false)

// Local form state (shared between modes)
const email = ref('')
const password = ref('')

// Dynamic Content based on mode
const title = computed(() => isRegistering.value ? 'CREAR CUENTA' : 'BIENVENIDO')
const subtitle = computed(() => isRegistering.value ? 'Únete a la comunidad GameFest' : 'Accede a tu cuenta de GameFest')
const buttonText = computed(() => isRegistering.value ? 'REGISTRARSE' : 'INICIAR SESIÓN')
const switchLinkText = computed(() => isRegistering.value ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate')

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
}

const handleSubmit = () => {
  if (isRegistering.value) {
    console.log('Registering with:', email.value, password.value)
  } else {
    console.log('Logging in with:', email.value, password.value)
  }
}
</script>

<template>
  <div class="login-modal-wrapper">
    <AnimatedModal 
      :open="modalStore.isLoginOpen" 
      @update:open="modalStore.closeLogin"
    >
      <AnimatedModalBody 
        class="max-w-md w-full bg-zinc-950 border border-purple-500/30 shadow-2xl shadow-purple-500/20"
        :show-close="true"
        :close-on-outside="true" 
      >
        <AnimatedModalContent class="p-8 overflow-hidden">
          <Transition name="slide-fade" mode="out-in">
            <div :key="isRegistering" class="w-full">
              <div class="mb-8 text-center">
                <h2 class="text-4xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent uppercase tracking-tighter">
                  {{ title }}
                </h2>
                <p class="text-gray-400 mt-2 font-['Poppins'] text-sm">
                  {{ subtitle }}
                </p>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-5">
                <div>
                  <label class="block text-xs font-medium text-purple-400 mb-2 font-['Poppins'] uppercase tracking-widest">
                    Email
                  </label>
                  <input 
                    v-model="email"
                    type="email" 
                    autocomplete="username"
                    placeholder="jugador@gamefest.com"
                    class="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
                    required
                  >
                </div>

                <div>
                  <label class="block text-xs font-medium text-purple-400 mb-2 font-['Poppins'] uppercase tracking-widest">
                    Contraseña
                  </label>
                  <input 
                    v-model="password"
                    type="password" 
                    autocomplete="current-password"
                    placeholder="••••••••"
                    class="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
                    required
                  >
                </div>

                <div class="flex justify-center text-xs font-['Poppins'] pt-2">
                  <button 
                    type="button"
                    @click="toggleMode"
                    class="text-pink-500 hover:text-purple-400 transition-colors font-semibold uppercase tracking-widest"
                  >
                    {{ isRegistering ? 'Volver al Login' : 'Crear nueva cuenta' }}
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </AnimatedModalContent>

        <AnimatedModalFooter class="bg-zinc-900/50 border-t border-purple-500/10 p-6">
          <button 
            @click="handleSubmit"
            class="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold font-['Poppins'] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20 uppercase tracking-widest"
          >
            {{ buttonText }}
          </button>
        </AnimatedModalFooter>
      </AnimatedModalBody>
    </AnimatedModal>
  </div>
</template>

<style scoped>
/* Cool Slide + Fade Transition */
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