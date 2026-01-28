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
      const response = await api.post('login.php', { email, password })
      if (response.data.success) {
        this.user = response.data.user
        this.isLoggedIn = true
        this.role = response.data.user.role.toUpperCase()
      }
      return response.data
    },
    async register(username, email, password) {
      // Calls your register.php file
      const response = await api.post('register.php', { username, email, password })
      return response.data
    },
    logout() {
      this.user = null
      this.isLoggedIn = false
      this.role = null
    }
  }
})