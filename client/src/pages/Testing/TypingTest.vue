<template>
  <div class="flex flex-col items-center py-10 min-h-screen w-full overflow-auto">
    <div class="w-[95%] max-w-[1200px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl p-6 shadow-xl">
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center mx-auto">Title: {{ testTitle }}</h2>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="p-3 bg-info/20 dark:bg-info/30 rounded-lg text-center font-semibold text-gray-700 dark:text-gray-200 capitalize"> {{ questionLanguage }}</div>
        <div class="p-3 bg-success/20 dark:bg-success/30 rounded-lg text-center font-semibold text-gray-700 dark:text-gray-200 capitalize">{{ answerLanguage }}</div>
      </div>
      <div v-for="(question, index) in questions" :key="index" class="grid grid-cols-2 gap-4 mb-4 items-center">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">{{ index + 1 }}. {{ question.question }}</div>
        <div><input v-model="question.userAnswer" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3" placeholder="Type your answer" /></div>
      </div>
      <div class="flex gap-4 mt-6 justify-end"><button v-if="!submitted" class="btn btn-info px-6 py-2" @click="submitTest">Submit</button></div>
    </div>

    <div v-if="testResult" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-[90%] max-w-xl">
        <h3 class="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-200">Test Result</h3>
        <ul class="mb-4 space-y-2 max-h-64 overflow-auto">
          <li v-for="(question, index) in questions" :key="index" class="flex justify-between p-2 border rounded">
            <div>
              <p class="font-medium">{{ index + 1 }}. {{ question.question }}</p>
              <p class="text-sm" :class="question.userAnswer === question.answer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                Your answer: {{ question.userAnswer || '(no answer)' }}
              </p>
              <p v-if="question.userAnswer !== question.answer" class="text-sm text-green-600 dark:text-green-400">
                Correct answer: {{ question.answer }}
              </p>
            </div>
            <span :class="question.userAnswer === question.answer ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'">
              {{ question.userAnswer === question.answer ? 'Correct' : 'Incorrect' }}
            </span>
          </li>
        </ul>
        <p class="text-center font-semibold mb-4"> Score: {{ score }} / {{ questions.length }} </p>
          <div class="flex justify-center gap-4">
            <button class="btn btn-info px-6 py-2 " @click="restartTest">
              <Icon icon="tabler-refresh" class="mr-2" /> Play Again
            </button>
            <router-link to="/tests" class="btn btn-outline px-6 py-2">
              <Icon icon="tabler-arrow-left" class="mr-2" /> Back to Test List
            </router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { runTest } from "../../helpers/test";
import { Icon } from '@iconify/vue';


export default {
  name : "typing",
  components:{
    Icon
  },
  setup() {
    const route = useRoute();
    const submitted = ref(false);
    const testResult = ref(false);
    const questions = ref([]);
    const questionLanguage = ref({});
    const answerLanguage = ref({});
    const testTitle = ref({});
    const score = computed(() => questions.value.filter(q => q.userAnswer === q.answer).length);

    onMounted(async() => {
      const result = await runTest(route.params.id)
      questionLanguage.value = result.questionLanguage
      answerLanguage.value = result.answerLanguage
      testTitle.value = result.title
      questions.value = result.tests.map(q => ({
        ...q,
        userAnswer: ""
      }))
    });

    const submitTest = () => {
      submitted.value = true;
      testResult.value = true;
    };

    const restartTest = () => {
      questions.value.forEach(q => q.userAnswer = "");
      submitted.value = false;
      testResult.value = false;
    };

    return {
      questions,
      submitted,
      testResult,
      questionLanguage,
      answerLanguage,
      testTitle,
      submitTest,
      restartTest,
      score
    };
  }
};
</script>
