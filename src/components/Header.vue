<template>
    <nav class="w-full p-4 flex justify-around bg-purple-400 items-center">
        <div>
            <h1 class="text-xl font-bold text-purple-900">GameFest</h1>
        </div>

        <ul class="flex gap-5 text-white">
            <li>
                <RouterLink to="/">Inicio</RouterLink>
            </li>

            <li>
                <RouterLink to="/games">Juegos</RouterLink> </li>

            <li>
                <RouterLink to="/events">Eventos</RouterLink> </li>

            
            <li>
                <RouterLink to="/login">Iniciar Sesión</RouterLink> </li>
        </ul>
    </nav>
</template>