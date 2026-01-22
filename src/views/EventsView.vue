<script setup>
import GlareCard from '@/components/ui/GlareCard.vue'
import InteractiveGridPattern from '@/components/ui/InteractiveGridPattern.vue'
</script>

<template>
  <!-- Hero Section -->
  <div class="eventHero relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
    <h1 class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl absolute font-bold font-['Poppins'] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [text-shadow:_0_0_30px_black] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent px-4 text-center">
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

  <!-- Filters Section -->
  <div class="bg-gradient-to-b from-black via-purple-950/20 to-black py-8 px-4 sm:py-10 sm:px-6 md:py-12 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Title -->
      <div class="mb-6 sm:mb-8">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold font-['Pixelify_Sans'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Eventos Disponibles
        </h2>
        <p class="text-gray-400 mt-2 text-sm sm:text-base font-['Poppins']">
          Encuentra el evento perfecto para ti
        </p>
      </div>

      <div class="flex flex-col gap-4 sm:gap-4 md:grid md:grid-cols-3">
        <div class="w-full">
          <label class="block text-sm font-medium text-purple-400 mb-2 font-['Poppins']">
            Tipo de Evento
          </label>
          <select class="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10">
            <option value="" class="bg-gray-900">Todos los tipos</option>
            <option value="presentacion" class="bg-gray-900">Presentación</option>
            <option value="charla" class="bg-gray-900">Charla</option>
            <option value="taller" class="bg-gray-900">Taller</option>
            <option value="mesa-redonda" class="bg-gray-900">Mesa Redonda</option>
            <option value="exhibicion" class="bg-gray-900">Exhibición</option>
            <option value="torneo" class="bg-gray-900">Torneo</option>
            <option value="networking" class="bg-gray-900">Networking</option>
            <option value="competicion" class="bg-gray-900">Competición</option>
          </select>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-purple-400 mb-2 font-['Poppins']">
            Fecha
          </label>
          <input 
            type="date" 
            placeholder="dd/mm/yyyy"
            class="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/10"
          />
        </div>

        <div class="w-full flex items-end">
          <label class="flex items-center gap-3 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white font-['Poppins'] text-sm sm:text-base cursor-pointer hover:bg-white/10 transition-all w-full">
            <input 
              type="checkbox" 
              class="w-5 h-5 rounded border-purple-500/30 bg-white/5 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 focus:ring-offset-black cursor-pointer"
            />
            <span class="select-none">Solo con plazas libres</span>
          </label>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-black py-8 px-4 sm:py-10 sm:px-6 md:py-12 lg:px-8 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        
        <GlareCard class="flex flex-col items-start justify-end py-6 px-5 min-h-[350px] sm:min-h-[380px] md:min-h-[400px] relative overflow-hidden group">
          <div class="relative z-10 w-full">
            <span class="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-xs font-semibold mb-3 font-['Poppins']">
              TALLER
            </span>
            <p class="font-bold text-white text-xl sm:text-2xl mb-3 sm:mb-4 font-['Pixelify_Sans'] leading-tight">
              Taller de Unreal Engine 5
            </p>
            <div class="space-y-2 text-xs sm:text-sm">
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                12 Feb 2025
              </p>
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                15:00h
              </p>
              <p class="font-normal text-green-400 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                140 plazas libres
              </p>
            </div>
            <button class="mt-4 sm:mt-6 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm sm:text-base font-['Poppins'] hover:scale-105 active:scale-95 transition-transform">
              Inscribirse
            </button>
          </div>
          <img 
            class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            src="../assets/images/Test/stalin.jpg" 
            alt="Background" 
          />
        </GlareCard>

        <GlareCard class="flex flex-col items-start justify-end py-6 px-5 min-h-[350px] sm:min-h-[380px] md:min-h-[400px] relative overflow-hidden group">
          <div class="relative z-10 w-full">
            <span class="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 text-xs font-semibold mb-3 font-['Poppins']">
              CHARLA
            </span>
            <p class="font-bold text-white text-xl sm:text-2xl mb-3 sm:mb-4 font-['Pixelify_Sans'] leading-tight">
              El Futuro del Cloud Gaming
            </p>
            <div class="space-y-2 text-xs sm:text-sm">
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                13 Feb 2025
              </p>
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                10:00h
              </p>
              <p class="font-normal text-green-400 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                85 plazas libres
              </p>
            </div>
            <button class="mt-4 sm:mt-6 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm sm:text-base font-['Poppins'] hover:scale-105 active:scale-95 transition-transform">
              Inscribirse
            </button>
          </div>
          <img 
            class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            src="../assets/images/Test/Servers.jpg" 
            alt="Background" 
          />
        </GlareCard>

        <GlareCard class="flex flex-col items-start justify-end py-6 px-5 min-h-[350px] sm:min-h-[380px] md:min-h-[400px] relative overflow-hidden group">
          <div class="relative z-10 w-full">
            <span class="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-xs font-semibold mb-3 font-['Poppins']">
              TALLER
            </span>
            <p class="font-bold text-white text-xl sm:text-2xl mb-3 sm:mb-4 font-['Pixelify_Sans'] leading-tight">
              Taller de Pixel Art
            </p>
            <div class="space-y-2 text-xs sm:text-sm">
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                14 Feb 2025
              </p>
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                16:30h
              </p>
              <p class="font-normal text-green-400 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                52 plazas libres
              </p>
            </div>
            <button class="mt-4 sm:mt-6 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm sm:text-base font-['Poppins'] hover:scale-105 active:scale-95 transition-transform">
              Inscribirse
            </button>
          </div>
          <img 
            class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            src="../assets/images/Test/pixelart.jpg" 
            alt="Background" 
          />
        </GlareCard>


        <GlareCard class="flex flex-col items-start justify-end py-6 px-5 min-h-[350px] sm:min-h-[380px] md:min-h-[400px] relative overflow-hidden group">
          <div class="relative z-10 w-full">
            <span class="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-xs font-semibold mb-3 font-['Poppins']">
              TALLER
            </span>
            <p class="font-bold text-white text-xl sm:text-2xl mb-3 sm:mb-4 font-['Pixelify_Sans'] leading-tight">
              Taller de Unreal Engine 5
            </p>
            <div class="space-y-2 text-xs sm:text-sm">
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                12 Feb 2025
              </p>
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                15:00h
              </p>
              <p class="font-normal text-green-400 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                140 plazas libres
              </p>
            </div>
            <button class="mt-4 sm:mt-6 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm sm:text-base font-['Poppins'] hover:scale-105 active:scale-95 transition-transform">
              Inscribirse
            </button>
          </div>
          <img 
            class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            src="../assets/images/Test/stalin.jpg" 
            alt="Background" 
          />
        </GlareCard>

        <GlareCard class="flex flex-col items-start justify-end py-6 px-5 min-h-[350px] sm:min-h-[380px] md:min-h-[400px] relative overflow-hidden group">
          <div class="relative z-10 w-full">
            <span class="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 text-xs font-semibold mb-3 font-['Poppins']">
              CHARLA
            </span>
            <p class="font-bold text-white text-xl sm:text-2xl mb-3 sm:mb-4 font-['Pixelify_Sans'] leading-tight">
              El Futuro del Cloud Gaming
            </p>
            <div class="space-y-2 text-xs sm:text-sm">
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                13 Feb 2025
              </p>
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                10:00h
              </p>
              <p class="font-normal text-green-400 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                85 plazas libres
              </p>
            </div>
            <button class="mt-4 sm:mt-6 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm sm:text-base font-['Poppins'] hover:scale-105 active:scale-95 transition-transform">
              Inscribirse
            </button>
          </div>
          <img 
            class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            src="../assets/images/Test/Servers.jpg" 
            alt="Background" 
          />
        </GlareCard>

        <GlareCard class="flex flex-col items-start justify-end py-6 px-5 min-h-[350px] sm:min-h-[380px] md:min-h-[400px] relative overflow-hidden group">
          <div class="relative z-10 w-full">
            <span class="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-xs font-semibold mb-3 font-['Poppins']">
              TALLER
            </span>
            <p class="font-bold text-white text-xl sm:text-2xl mb-3 sm:mb-4 font-['Pixelify_Sans'] leading-tight">
              Taller de Pixel Art
            </p>
            <div class="space-y-2 text-xs sm:text-sm">
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                14 Feb 2025
              </p>
              <p class="font-normal text-neutral-200 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                16:30h
              </p>
              <p class="font-normal text-green-400 font-['Poppins'] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                52 plazas libres
              </p>
            </div>
            <button class="mt-4 sm:mt-6 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm sm:text-base font-['Poppins'] hover:scale-105 active:scale-95 transition-transform">
              Inscribirse
            </button>
          </div>
          <img 
            class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            src="../assets/images/Test/pixelart.jpg" 
            alt="Background" 
          />
        </GlareCard>

      </div>
    </div>
  </div>
</template>