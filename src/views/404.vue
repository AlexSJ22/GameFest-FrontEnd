<script setup>
// 1. Combine all Vue imports into a single line
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import FlickeringGrid from '@/components/ui/FlickeringGrid.vue'
import Header from '@/components/Header.vue'

const router = useRouter()
const isLoaded = ref(false)
const glitchActive = ref(false)

onMounted(() => {
    const header = document.querySelector('nav')
    if (header) {
        header.style.display = 'none'
    }

    setTimeout(() => {
        isLoaded.value = true
    }, 100)

    setInterval(() => {
        glitchActive.value = true
        setTimeout(() => {
            glitchActive.value = false
        }, 200)
    }, 3000)
})

onUnmounted(() => {
    const header = document.querySelector('nav')
    if (header) {
        header.style.display = 'flex'
    }
})

const goHome = () => {
    router.push('/')
}

const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="error-page min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <FlickeringGrid class="absolute inset-0 z-0" 
            :square-size="5" 
            :grid-gap="6" 
            color="#9333EA" 
            :max-opacity="0.3"
            :flicker-chance="0.5" />



        <div class="relative z-20 text-center px-6 max-w-4xl mx-auto"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            style="transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)">
            <div class="relative inline-block mb-8">
                <h1 class="text-[150px] sm:text-[200px] md:text-[280px] font-['Pixelify_Sans'] font-bold leading-none"
                    :class="glitchActive ? 'glitch-active' : ''">
                    <span
                        class="glitch-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        404
                    </span>
                </h1>

                <h1 class="glitch-layer glitch-layer-1 absolute top-0 left-0 text-[150px] sm:text-[200px] md:text-[280px] font-['Pixelify_Sans'] font-bold leading-none"
                    aria-hidden="true">
                    404
                </h1>
                <h1 class="glitch-layer glitch-layer-2 absolute top-0 left-0 text-[150px] sm:text-[200px] md:text-[280px] font-['Pixelify_Sans'] font-bold leading-none"
                    aria-hidden="true">
                    404
                </h1>
            </div>

            <div class="mb-8 space-y-4">
                <h2
                    class="text-3xl sm:text-4xl md:text-5xl font-['Pixelify_Sans'] font-bold text-white uppercase tracking-wider">
                    ¡GAME OVER!
                </h2>
                <p class="text-lg sm:text-xl md:text-2xl text-purple-300 font-['Poppins'] max-w-2xl mx-auto">
                    La página que buscas no existe
                </p>
            </div>

            <div class="mb-12 flex justify-center">

            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button @click="goHome"
                    class="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-['Pixelify_Sans'] font-bold text-white text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                    <span class="relative z-10 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Volver al Inicio
                    </span>
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                </button>

                <button @click="goBack"
                    class="group relative px-8 py-4 bg-white/10 border-2 border-purple-500/50 rounded-xl font-['Pixelify_Sans'] font-bold text-white text-lg uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-purple-400 hover:scale-105">
                    <span class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        Volver Atrás
                    </span>
                </button>
            </div>

            <div class="mt-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <p class="text-xs text-gray-500 font-['Poppins'] font-mono">
                    ERROR_CODE: 404_NOT_FOUND | RETURN_TO_INICIO
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.glitch-text {
    background: url(../assets/images/Test/grid.gif);
    background-clip: text;
    position: relative;
    text-shadow: 0px 0px 0px rgba(255, 255, 255, 0.342);
    display: inline-block;
}

.glitch-layer {
    opacity: 0;
    pointer-events: none;
}

.glitch-active .glitch-layer-1 {
    opacity: 0.8;
    color: #EC4899;
    animation: glitch1 0.3s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
}
</style>