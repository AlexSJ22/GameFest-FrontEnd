<script setup>
import { ref, computed } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import { useAuthStore } from '@/stores/authStore'
import LiquidBackground from '@/components/ui/LiquidBackground.vue'
</script>

<template>
  <div>
    <div class="zigzag relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <LiquidBackground class="absolute inset-0" />
      
      <div class="absolute inset-0 bg-violet-900/70 pointer-events-none z-10"></div>
      
      <div class="relative z-20 h-full flex items-center justify-center">
        <h1 class="liquid text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-['Poppins'] [text-shadow:_0_0_30px_black] text-black px-4 text-center uppercase">
          Mis Eventos
        </h1>
      </div>
    </div>
  </div>
</template>