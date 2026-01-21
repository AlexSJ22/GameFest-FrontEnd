<script setup>
import GlareCard from '@/components/ui/GlareCard.vue'
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern.vue';
</script>

<template>
  
<div class="eventHero relative h-[80vh] w-full overflow-hidden">
  <h1 class="text-9xl absolute font-bold font-['Poppins'] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [text-shadow:_0_0_30px_black]">
  EVENTOS
  </h1>
  <InteractiveGridPattern
    class="w-full h-full"
    squaresClassName="hover:fill-purple-500/30"
    :width="100"
    :height="100"
    :squares="[80, 80]"
  />
</div>



<div class="border-l-[1px] border-purple-500 py-15 px-8 bg-black flex flex-col font-bold font-['Poppins']">
    <h2 class="text-purple-500 text-5xl">Eventos Disponibles</h2>
    <div class="grid grid-cols-3">
        <select class="bg-white"  name="" id="">
            <option value="">a</option>
        </select>
    </div>
</div>





  <div class="grid grid-cols-3  min-h-screen bg-black flex items-center justify-center p-8">
    
    <GlareCard class="flex flex-col items-start justify-end py-8 px-6">
      
      <div class="relative z-10">
        <p class="font-bold text-white text-2xl">Taller de Unreal Engine 5</p>
        <p class="font-normal text-base text-neutral-200 mt-4">
          Fecha: 2025-02-12
        </p>
        <p class="font-normal text-sm text-neutral-400 mt-2">
          Hora: 15:00
        </p>
        <p class="font-normal text-sm text-neutral-400 mt-2">
          Plazas Libres: 140
        </p>
      </div>

      <img 
        class="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        src="../assets/images/Test/stalin.jpg" 
        alt="Background" 
      />
      
    </GlareCard>

    <GlareCard class="flex flex-col items-start justify-end py-8 px-6">
      
      <div class="relative z-10">
        <p class="font-bold text-white text-2xl">Charla: El Futuro del Cloud Gaming</p>
        <p class="font-normal text-base text-neutral-200 mt-4">
          Fecha: 2025-02-12
        </p>
        <p class="font-normal text-sm text-neutral-400 mt-2">
          Hora: 15:00
        </p>
        <p class="font-normal text-sm text-neutral-400 mt-2">
          Plazas Libres: 140
        </p>
      </div>

      <img 
        class="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        src="../assets/images/Test/Servers.jpg" 
        alt="Background" 
      />
      
    </GlareCard>

    <GlareCard class="flex flex-col items-start justify-end py-8 px-6">
      
      <div class="relative z-10">
        <p class="font-bold text-white text-2xl">
            Taller de Pixel Art
        </p>
        <p class="font-normal text-base text-neutral-200 mt-4">
          Fecha: 2025-02-12
        </p>
        <p class="font-normal text-sm text-neutral-400 mt-2">
          Hora: 15:00
        </p>
        <p class="font-normal text-sm text-neutral-400 mt-2">
          Plazas Libres: 140
        </p>
      </div>

      <img 
        class="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        src="../assets/images/Test/pixelart.jpg" 
        alt="Background" 
      />
      
    </GlareCard>

  </div>
</template>