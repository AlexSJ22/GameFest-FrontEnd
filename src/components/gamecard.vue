<template>
  <div class="p-6 bg-black min-h-screen">
    <h1 class="text-3xl font-bold mb-5 text-white">Juegos</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="game in juegos" 
        :key="game.id"
        class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <img :src="`/gamefest_resources/games/${game.imagen}`" :alt="game.titulo" class="w-full h-48 object-cover" />



        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">{{ game.titulo }}</h2>
          <p class="text-gray-600 mb-2">Género: {{ game.genero }}</p>
          <p class="text-gray-600 mb-2">Plataformas: {{ game.plataformas }}</p>
          <p class="text-gray-600 mb-2">{{ game.descripcion }}</p>
          <button class="bg-violet-300 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Inscribete Ahora
          </button> 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const juegos = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost/Gamefest/Gamefest-Backend/index.php')
    const data = await res.json()
    juegos.value = data
  } catch (error) {
    console.error("Error cargando juegos:", error)
  }
})
</script>
