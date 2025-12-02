<template>
  <div class="flex flex-col items-center min-h-screen py-10">
      <div class="w-[95%] max-w-[1200px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl p-6 shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-semibold text-gray-700 dark:text-gray-200">Test List</h2>
          <!-- create test button -->
          <router-link to="/tests/new">
          <button class="btn btn-info transition transform hover:-translate-y-1">
            <span class="icon-[tabler--plus] mr-2"></span> Create New
          </button>
          </router-link>
        </div>
        <!-- show nothing when test = 0 -->
        <div v-show="tests.length === 0" class="text-center py-20 text-gray-600 dark:text-gray-400 text-lg">
          No tests found! Click <span class="font-semibold">Create New</span> to add one.
        </div>
        <!-- show test when test > 0 -->
        <div v-show="tests.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" >
          <div v-for="(test, index) in pageTest" :key="index" class="relative border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
          <div @click="testDirect(test)">
            <p class="text-gray-600 dark:text-gray-400 mb-1"><strong>Title:</strong> {{ test.title }}</p>
            <p class="text-gray-600 dark:text-gray-400 mb-1"><strong>Total Question:</strong> {{ test.totalQuestions }}</p>
            <p class="text-gray-600 dark:text-gray-400 mb-1"><strong>Type:</strong> {{ capitalize(test.testType) }}</p>
            <p class="text-gray-600 dark:text-gray-400"><strong>Topic:</strong> {{ capitalize(test.questionLanguage) }} → {{ capitalize(test.answerLanguage) }}</p>
          </div>
          <!-- dropdown to delete-->
          <div class="absolute top-2 right-2">
            <button @click.stop="onDropdown(test._id)" class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
              <span class="icon-[tabler--dots-vertical] size-5"></span>
            </button>
            <div v-if="openDropdown === test._id" class="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-50">
              <button @click="onDeleteTest(test._id)" class="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 dark:hover:bg-red-700 rounded">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- pagination -->
      <nav v-if="totalPages > 1" class="flex justify-center items-center gap-x-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button class="btn btn-outline" :disabled="currentPage===1" @click="previousPage">Previous</button>
        <div class="flex items-center gap-x-1">
        <button v-for="(page, index) in getPage" :key="index" class="btn btn-square" :disabled="page === '...'" :class="currentPage === page ? 'btn-info text-white' : 'btn-outline'" @click="page !== '...' && onPage(page)" >
          {{ page }}
        </button>
        </div>
        <button class="btn btn-outline" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
      </nav>

    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
import { useRouter } from "vue-router"
import { Icon } from '@iconify/vue';
import { ref, onMounted, computed} from "vue";
import { getAllTest, deleteTestById} from "../../helpers/test";

export default {
  name: "tests",
  components:{
    Icon
  },
  setup() {
    const toast = useToast()
    const tests = ref([]);
    const router = useRouter()
    
    onMounted(async()=>{
      tests.value = (await getAllTest()) || []
    })
    
    // for dropwdown
    const openDropdown = ref(null);
    const onDropdown = (id) => {
      if (openDropdown.value === id) {
          openDropdown.value = null; 
      } else {
        openDropdown.value = id;   
      }
    };

    document.addEventListener("click", ()=>{
      openDropdown.value = null
    })

    //show diaglog to delete test or not
    const onDeleteTest = async (id) => {
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
        await deleteTestById(id);
        tests.value = tests.value.filter(t => t._id !== id);
        toast.success("Deleted successfully!", { position: "top-right", timeout: 1500 });
      }
    };

    //for direct test
    const testDirect= (test)=>{
      if(test.testType === "Flash Card"){
        router.push({name: 'flashcard', params: { id: test._id } })
      }
      else{
        router.push({ name: 'typing', params: { id: test._id } })

      }
    }

    // make word capitalize
    const capitalize = (str) => {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    //for pagination
    const currentPage = ref(1)
    const pageSize = ref(12)

    const totalPages = computed(()=>{
      return Math.ceil(tests.value.length / pageSize.value)
    })

    const pageTest = computed(()=>{
      const start = (currentPage.value - 1) * pageSize.value
      return tests.value.slice(start,start + pageSize.value)
    })

    const onPage = (page)=>{
      currentPage.value = page
    }

    const nextPage = ()=>{
      if(currentPage.value<totalPages.value){
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

    return{
      tests,
      onDropdown,
      onDeleteTest,
      openDropdown,
      capitalize,
      testDirect,
      pageSize,
      pageTest,
      totalPages,
      currentPage,
      onPage,
      nextPage,
      previousPage,
      getPage
    };
  }
};
</script>