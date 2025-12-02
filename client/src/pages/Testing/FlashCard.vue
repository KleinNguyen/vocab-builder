<template>
  <div class="flex flex-col items-center min-h-screen py-20">
    <div class="w-[1000px] max-w-[90%] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl p-6 shadow-xl flex flex-col items-center">
      <h1 class="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200">Title: {{ testTitle }}</h1>

      <div class="relative w-full max-w-md h-60 mb-6 [perspective:1000px]" v-if="cards.length > 0">
        <div class="absolute w-full h-full rounded-xl shadow-lg cursor-pointer transition-transform duration-500 [transform-style:preserve-3d]"
          :class="{'[transform:rotateY(180deg)]': flipped}" @click="flipCard">
          
          <div class="absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl flex flex-col justify-start items-center text-center p-4 [backface-visibility:hidden] border border-gray-300 dark:border-gray-700">
            <div class="w-full mb-2 text-lg font-bold text-gray-700 dark:text-gray-200 flex justify-center">
              {{ capitalize(questionLanguage) }}
            </div>
            <div class="divider divider-neutral"></div>
            <div class="flex-1 flex items-center justify-center">
              <span class="text-xl font-semibold text-gray-700 dark:text-gray-200">{{ currentCard.front }}</span>
            </div>
          </div>

          <div class="absolute w-full h-full bg-blue-400 dark:bg-blue-600 rounded-xl flex flex-col justify-start items-center text-center p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] border border-gray-300 dark:border-gray-700">
            <div class="w-full mb-2 text-lg font-bold text-white flex justify-center">
              {{ capitalize(answerLanguage) }}
            </div>
            <div class="divider divider-neutral"></div>
            <div class="flex-1 flex items-center justify-center">
              <span class="text-xl font-semibold text-white">{{ currentCard.back }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-gray-500 dark:text-gray-400">Loading cards...</div>

      <div class="flex items-center gap-4 mt-4">
        <button class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="prevCard" :disabled="currentIndex === 0">
          ← Previous
        </button>

        <span class="text-gray-700 dark:text-gray-200 font-semibold">{{ currentIndex + 1 }} / {{ cards.length }}</span>

        <button class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="nextCard">
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { runTest } from "../../helpers/test";
import Swal from "sweetalert2";

export default {
  name: "flashcard",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const cards = ref([]);
    const questionLanguage = ref("");
    const answerLanguage = ref("");
    const testTitle = ref("");
    const currentIndex = ref(0);
    const flipped = ref(false);

    const capitalize = (str) => {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    onMounted(async () => {
      const result = await runTest(route.params.id);
      testTitle.value = result.title;
      questionLanguage.value = result.questionLanguage;
      answerLanguage.value = result.answerLanguage;
      cards.value = result.tests.map(q => ({
        front: q.question,
        back: q.answer
      }));
    });

    const currentCard = computed(() => cards.value[currentIndex.value] || { front: "", back: "" });
    const flipCard = () => { flipped.value = !flipped.value; };

    const nextCard = async () => {
      if (currentIndex.value < cards.value.length - 1) {
        currentIndex.value++;
        flipped.value = false;
      } else {

        const result = await Swal.fire({
          title: "🎉 Finish Learning!",
          text: "Do you want to restart or go back to the test list?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Restart",
          cancelButtonText: "Back to Tests",
          allowOutsideClick: false,
        });

        if (result.isConfirmed) {
          currentIndex.value = 0;
          flipped.value = false;
        } else {
          router.push("/tests");
        }
      }
    };

    const prevCard = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
        flipped.value = false;
      }
    };

    return {
      cards,
      testTitle,
      questionLanguage,
      answerLanguage,
      currentIndex,
      flipped,
      currentCard,
      flipCard,
      nextCard,
      prevCard,
      capitalize
    };
  }
};
</script>
