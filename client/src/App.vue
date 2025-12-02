<template>
  <div class="relative min-h-screen w-full" :class="{ 'overflow-hidden h-screen': isFormPage }">
    <!-- Background -->
    <div class="fixed inset-0 bg-cover bg-center -z-10" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    <div class="fixed inset-0 bg-black/20 -z-10"></div>

    <!-- Navbar -->
    <nav class="navbar bg-white/80 backdrop-blur-sm md:h-15 sticky top-0 z-50 shadow-base-300/20 shadow-sm transition-transform duration-500 ease-in-out" 
      :class="{ '-translate-y-full': hideNavbar && !isFormPage, 'translate-y-0': !hideNavbar || isFormPage }">
      <div class="w-full md:flex md:items-center md:gap-2">
        <div class="flex items-center justify-between">
          <div class="navbar-start items-center justify-between max-md:w-full flex gap-2">
            <img src="./images/favicon2.png" alt="Logo" class="w-16 h-10 object-contain"/>
            <a class="link text-base-content link-neutral text-xl font-bold no-underline whitespace-nowrap" href="#">
              Vocab Learning
            </a>
            <div class="md:hidden">
              <button class="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square" data-collapse="#default-navbar-collapse" aria-controls="default-navbar-collapse" aria-label="Toggle navigation">
                <span class="icon-[tabler--menu-2] collapse-open:hidden size-4"></span>
                <span class="icon-[tabler--x] collapse-open:block hidden size-4"></span>
              </button>
            </div>
          </div>
        </div>
        <div id="default-navbar-collapse" class="md:navbar-end collapse hidden grow basis-full overflow-hidden transition-[height] duration-300 max-md:w-full">
          <ul class="menu md:menu-horizontal gap-2 p-0 text-base max-md:mt-2">
            <li>
              <router-link to="/words" class="hover:text-blue-500 hover:bg-gray-100 transition-colors duration-200" active-class="bg-blue-100 text-blue-700 font-semibold">
                <span class="icon-[tabler--book-2] size-5"></span>All Words
              </router-link>
            </li>
            <li>
              <router-link to="/words/new" class="hover:text-purple-500 hover:bg-gray-100 transition-colors duration-200" active-class="bg-purple-100 text-purple-700 font-semibold">
                <span class="icon-[tabler--plus] size-5"></span>Add New
              </router-link>
            </li>
            <li>
              <router-link to="/tests" class="hover:text-red-500 hover:bg-gray-100 transition-colors duration-200" active-class="bg-red-100 text-red-700 font-semibold"
              >
                <span class="icon-[tabler--flame-filled] size-5"></span>Testing
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <div class="w-full" :class="isFormPage ? '' : 'min-h-screen py-8'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import bgImage from './images/bg.jpg'
import { RouterLink, RouterView } from "vue-router"

const route = useRoute()
const hideNavbar = ref(false)
let lastScrollY = 0
let ticking = false

// Check if current page is a form page
const isFormPage = computed(() => {
  return route.path === '/words' || 
        route.path.includes('/edit') || 
        route.path.includes('/show') ||
        route.path.includes('/words/new') ||
        route.path.includes('/tests') ||
        route.path.includes('/tests/new')
})

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        hideNavbar.value = true
      } 
      else if (currentScrollY < lastScrollY) {
        hideNavbar.value = false
      }
      
      lastScrollY = currentScrollY
      ticking = false
    })
    
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>