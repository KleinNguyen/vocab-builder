<template>
  <div class="flex flex-col items-center min-h-screen py-10">
    <div class="w-[1000px] max-w-[90%] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl p-6 shadow-xl" v-show="words.length > 0">
      <!-- table -->
      <table class=" w-full table-auto rounded-lg mx-auto border-collapse border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="border border-gray-300 dark:border-gray-600 px-5 py-3 w-[100px]">
              <span>No.</span>
            </th>
            <!-- english -->
            <th class="border border-gray-300 dark:border-gray-600 px-5 py-3 w-[250px]">
              <div class="flex items-center justify-center gap-2">
                <Icon icon="flagpack:gb-ukm" class="w-6 h-6" />
                <span>English</span>
              </div>
            </th>
            <!-- german -->
            <th class="border border-gray-300 dark:border-gray-600 px-5 py-3 w-[250px]">
              <div class="flex items-center justify-center gap-2">
                <Icon icon="flagpack:de" class="w-6 h-6" />
                <span>German</span>
              </div>
            </th>
            <!-- new language: vietnamese -->
            <th class="border border-gray-300 dark:border-gray-600 px-5 py-3 w-[250px]">
              <div class="flex items-center justify-center gap-2">
                <Icon icon="flagpack:vn" class="w-6 h-6" />
                <span>Vietnamese</span>
              </div>
            </th>
            
            <!-- dropdown -->
            <th class="relative border border-gray-300 dark:border-gray-600 px-2 py-3 text-center w-[150px]">
              <div class="inline-block text-left relative">
                <button @click.stop="onDropdown" class="inline-flex justify-center items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  Actions
                  <span class="icon-[tabler--chevron-down] size-4 transition-transform duration-300" :class="{ 'rotate-180': openDropdown }"></span>
                </button>
                <transition name="dropdown-slide" enter-active-class="transition-all duration-300 ease-out" leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 transform -translate-y-2" enter-to-class="opacity-100 transform translate-y-0" leave-from-class="opacity-100 transform translate-y-0" leave-to-class="opacity-0 transform -translate-y-2">
                  <div v-if="openDropdown" class="absolute right-0 mt-2 w-45 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                    <button class="w-full flex items-center px-4 py-2 text-sm hover:bg-blue-100 dark:hover:bg-gray-700" @click="onSortAsc">
                      <span class="icon-[tabler--sort-ascending] mr-2 size-5"></span> Sort Ascending
                    </button>
                    <button class="w-full flex items-center px-4 py-2 text-sm hover:bg-blue-100 dark:hover:bg-gray-700" @click="onSortDesc">
                      <span class="icon-[tabler--sort-descending] mr-2 size-5"></span> Sort Descending
                    </button>
                  </div>
                </transition>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900">
          <tr v-for="(word, index) in pageWord" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <td class="border border-gray-300 dark:border-gray-600 px-5 py-3 text-center">  {{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="border border-gray-300 dark:border-gray-600 px-5 py-3 text-center">{{ word.english }}</td>
            <td class="border border-gray-300 dark:border-gray-600 px-5 py-3 text-center">{{ word.german }}</td>
            <td class="border border-gray-300 dark:border-gray-600 px-5 py-3 text-center">{{ word.vietnamese }}</td>
            <td class="border border-gray-300 dark:border-gray-600 px-2 py-3 text-center">
              <router-link :to="{name: 'show', params:{id:word._id}}" class="btn btn-circle btn-text btn-sm transition transform hover:-translate-y-1">
                <span class="icon-[tabler--eye] size-6 text-blue-500"></span>
              </router-link>
              <router-link :to="{name: 'edit', params:{id:word._id}}" class="btn btn-circle btn-text btn-sm transition transform hover:-translate-y-1">
                <span class="icon-[tabler--pencil] size-5 text-amber-600"></span>
              </router-link>
              <button  class="btn btn-circle btn-text btn-sm text-red-500 transition transform hover:-translate-y-1">
                <span @click.prevent="onDelete(word._id)" class="icon-[tabler--trash] size-5"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- pagination -->
      <nav class="flex justify-center items-center gap-x-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button class="btn btn-outline" :disabled="currentPage===1" @click="previousPage">Previous</button>
        <div class="flex items-center gap-x-1">
        <button v-for="(page, index) in getPage" :key="index" class="btn btn-square" :disabled="page === '...'" :class="currentPage === page ? 'btn-info text-white' : 'btn-outline'" @click="page !== '...' && onPage(page)" >
          {{ page }}
        </button>
        </div>
        <button class="btn btn-outline" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
      </nav>
    </div>
    <div v-show="words.length === 0" class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-8 shadow-xl">
      <p class="text-gray-600 dark:text-gray-400 text-lg">No words found!</p>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
import { Icon } from '@iconify/vue';
import {ref, onMounted, computed} from 'vue'
import { getAllVocab, deleteVocabById } from '../../helpers/crud.js';
import { sortAsc,sortDesc } from '../../helpers/sort.js';
export default {
  name: "words",
  components:{
    Icon
  },

  setup(){

    const toast = useToast()
    const words = ref([])  

    onMounted(async()=>{
      words.value = (await getAllVocab()) || [];
    })

    const onDelete = async(id)=>{
      const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        await deleteVocabById(id)
        words.value = words.value.filter((word) => word._id !== id);

        const start = (currentPage.value - 1) * pageSize.value
        if (start >= words.value.length && currentPage.value > 1) {
          currentPage.value--
        }
        toast.success(`Delete success!`, {
          position: "top-right",
          timeout: 1500,
          closeOnClick: true,
          pauseOnHover: false
        });
      }
    }

    // for pagination
    const currentPage = ref(1)
    const pageSize = ref(8)

    const totalPages = computed(()=>{
      return Math.ceil(words.value.length / pageSize.value)
    })

    const pageWord = computed(()=>{
      const start = (currentPage.value - 1) * pageSize.value
      return words.value.slice(start,start + pageSize.value)
    })

    const onPage = (page)=>{
      currentPage.value = page
    }

    const nextPage = ()=>{
      if(currentPage.value < totalPages.value){
        currentPage.value++
      }
    }
    
    const previousPage = ()=>{
      if(currentPage.value>1){
        currentPage.value--
      }
    }

    const getPage = computed(()=>{
      const pages = []
      const total = totalPages.value
      const current = currentPage.value

      if(total === 0 ){
        return pages
      }
      
      if(total <= 3 ){
        for(let i = 1; i<= total; i++){
          pages.push(i)
        }
        return pages
      }

      pages.push(1)

      if (current <= 2) {
          pages.push( 2, 3);
          pages.push("...");
          pages.push(total);
          return pages;
        }

      if (current >= total - 1) {
        pages.push("...");
        pages.push(total - 2, total - 1, total);
        return pages;
      }

      pages.push("...");
      pages.push(current - 1, current, current + 1);
      pages.push("...");
      pages.push(total);

      return pages;
    })

    // for dropdown
    const openDropdown = ref(false)
    const onDropdown = () =>{
      openDropdown.value = !openDropdown.value
    }
    document.addEventListener("click", ()=>{
      openDropdown.value = false
    })

    // sort function
    const onSortAsc = async()=>{
      words.value = await sortAsc()
    }

    const onSortDesc = async()=>{
      words.value = await sortDesc()
    }
    return {
      words,
      pageSize,
      pageWord,
      onDelete,
      currentPage,
      totalPages,
      onPage,
      nextPage,
      previousPage,
      openDropdown,
      onDropdown,
      onSortAsc,
      onSortDesc,
      getPage,

    }
  }
};
</script>


