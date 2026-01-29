import { defineStore } from 'pinia'
import api from '@/lib/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    role: null
  }),
  actions: {
    async login(email, password) {
      // Calls your login.php file
      const response = await api.post('/auth/login.php', { email, password })
      if (response.data.success) {
        this.user = response.data.user
        this.isLoggedIn = true
        this.role = response.data.user.role.toUpperCase()
      }
      return response.data
    },
    
    async register(username, email, password) {
      // Calls your register.php file
      const response = await api.post('/auth/register.php', { username, email, password })
      return response.data
    },

    // --- AQUÍ ESTÁ EL CAMBIO IMPORTANTE ---
    async logout() {
      try {
        // 1. Avisamos al backend para que destruya la sesión PHP
        await api.post('/auth/logout.php')
      } catch (error) {
        console.error('Error al cerrar sesión en el servidor:', error)
      } finally {
        // 2. Limpiamos el frontend pase lo que pase
        this.user = null
        this.isLoggedIn = false
        this.role = null
      }
    }
  }
})