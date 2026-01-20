<template>
    <nav class="navbar w-full flex justify-between bg-purple-400 items-center px-40">
        <div class="logoName flex items-center gap-4">
            <img class="logo size-25" src="../assets/images/logo/logo2.png" alt="Logo">
            <h1 class="xxl text-xl font-bold text-black">GameFest</h1>
        </div>

        <ul class="flex gap-9 text-white">
            <li class="enlace">
                <RouterLink to="/">Inicio</RouterLink>
            </li>

            <li class="enlace">
                <RouterLink to="/games">Juegos</RouterLink> </li>

            <li class="enlace">
                <RouterLink to="/events">Eventos</RouterLink> </li>


            <li class="line">

            </li>
            
            <li class="">
                <RouterLink to="/login">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                </RouterLink> </li>
        </ul>
    </nav>
</template>