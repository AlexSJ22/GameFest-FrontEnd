import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isLoginOpen = ref(false)
  const openLogin = () => { isLoginOpen.value = true }
  const closeLogin = () => { isLoginOpen.value = false }

  return { isLoginOpen, openLogin, closeLogin }
})