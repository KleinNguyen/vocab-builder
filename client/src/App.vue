<template>
  <div class="h-screen flex flex-col overflow-hidden relative">

    <!-- import background image -->
    <div 
      class="fixed inset-0 bg-cover bg-center z-0"
      :style="{ backgroundImage: `url(${bgImage})` }"
    ></div>
    <div class="fixed inset-0 bg-black/20 z-10"></div>

    <!-- navigation -->
    <nav class="navbar rounded-none shadow-base-300/20 shadow-sm bg-white/80 backdrop-blur-sm z-20">
      <div class="w-full md:flex md:items-center md:gap-2">
        <div class="flex items-center justify-between">
          <div class="navbar-start items-center justify-between max-md:w-full flex gap-2">
            <img src="./images/favicon2.png" alt="Logo" class="w-16 h-10 object-contain"/>
            <a class="link text-base-content link-neutral text-xl font-bold no-underline whitespace-nowrap" href="#">Vocab Learning</a>
            <div class="md:hidden">
              <button type="button" class="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square" data-collapse="#default-navbar-collapse" aria-controls="default-navbar-collapse" aria-label="Toggle navigation" >
                <span class="icon-[tabler--menu-2] collapse-open:hidden size-4"></span>
                <span class="icon-[tabler--x] collapse-open:block hidden size-4"></span>
              </button>
            </div>
          </div>
        </div>
        <div id="default-navbar-collapse" class="md:navbar-end collapse hidden grow basis-full overflow-hidden transition-[height] duration-300 max-md:w-full">
          <ul class="menu md:menu-horizontal gap-2 p-0 text-base max-md:mt-2">
            <li>
              <router-link to="/words"
                class="hover:text-blue-500 hover:bg-gray-100 transition-colors duration-200"
                active-class="bg-blue-100 text-blue-700 font-semibold">
                <span class="icon-[tabler--book-2] size-5"></span>All Words
              </router-link>
            </li>
            <li>
              <router-link to="/words/new"
                class="hover:text-purple-500 hover:bg-gray-100 transition-colors duration-200"
                active-class="bg-purple-100 text-purple-700 font-semibold">
                <span class="icon-[tabler--plus] size-5"></span>Add New
              </router-link>
            </li>
            <li>
              <router-link to="/test"
                class="hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                active-class="bg-red-100 text-red-700 font-semibold">
                <span class="icon-[tabler--flame-filled] size-5"></span>Testing
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- router - view -->
    <div class="flex-1 flex justify-center items-center z-20">
      <router-view></router-view>
    </div>

    <!-- footer -->
    <footer class="fixed bottom-0 left-0 w-full footer items-center px-6 py-4 bg-black text-white">
      <aside class="grid-flow-col items-center">
        <p>©2025 <a class="link link-hover font-medium text-white" href="#">Vocab Learning</a></p>
      </aside>
      <nav class="text-base-content grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a class="link link-hover text-white" href="#">License</a>
        <a class="link link-hover text-white" href="#">Help</a>
        <a class="link link-hover text-white" href="#">Contact</a>
        <a class="link link-hover text-white" href="#">Policy</a>
      </nav>
    </footer>

  </div>
</template>

<script setup>
  import bgImage from './images/bg.jpg'
  import { RouterLink, RouterView } from "vue-router";
</script>

