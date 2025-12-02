<template>
    <div class="flex flex-col items-center min-h-screen py-40">
        <div class="w-[700px] max-w-[90%] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <h1 class="text-center text-2xl font-bold mb-6">Add New Test</h1>

            <form action="" class="flex items-center flex-col gap-6">
                <div class="input w-full flex items-center gap-2">
                    <span class="icon-[tabler--letter-t] w-6 h-6 text-base-content/80 shrink-0"></span>
                    <div class="input-floating grow flex items-center h-full">
                        <input type="text" required v-model="testForm.title" placeholder="Enter test title" class="ps-3 h-full leading-tight py-0" id="testTitle" />
                        <label class="input-floating-label" for="testTitle">Title</label>
                    </div>
                </div>
                <div class="input w-full flex items-center gap-2">
                    <span class="icon-[tabler--caret-up-down] w-6 h-6 text-base-content/80 shrink-0"></span>
                    <div class="input-floating grow flex items-center h-full">
                        <select required v-model="testForm.testType" class="grow ps-3 h-full leading-tight py-0 bg-transparent" id="testType">
                            <option value="Typing">Typing</option>
                            <option value="Flash Card">Flash Card</option>
                        </select>
                        <label class="input-floating-label" for="questionAmount">Test Type</label>
                    </div>
                </div>
                <div class="input w-full flex items-center gap-2">
                    <span class="icon-[tabler--list-numbers] w-6 h-6 text-base-content/80 shrink-0"></span>
                    <div class="input-floating grow flex items-center h-full">
                        <select required v-model="testForm.totalQuestions" class="grow ps-3 h-full leading-tight py-0 bg-transparent" id="questionAmount">
                            <option value="5">5 Questions</option>
                            <option value="10">10 Questions</option>
                            <option value="20">20 Questions</option>
                        </select>
                        <label class="input-floating-label" for="questionAmount">Total Questions</label>
                    </div>
                </div>
                <div class="input w-full flex items-center gap-2">
                    <span class="icon-[tabler--language] w-6 h-6 text-base-content/80 shrink-0"></span>
                    <div class="input-floating grow flex items-center h-full">
                        <select required v-model="testForm.language" class="grow ps-3 h-full leading-tight py-0 bg-transparent" id="testLanguage">
                            <option value="English->German">English → German</option>
                            <option value="English->Vietnamese">English → Vietnamese</option>
                            <option value="German->English">German → English</option>
                            <option value="German->Vietnamese">German → Vietnamese</option>
                            <option value="Vietnamese->English">Vietnamese → English</option>
                            <option value="Vietnamese->German">Vietnamese → German</option>
                        </select>
                        <label class="input-floating-label" for="testLanguage">Language</label>
                    </div>
                </div>
                <div class="w-full flex items-center">
                    <button @click.prevent="createAndBack" class="btn btn-info w-[140px] flex items-center justify-center gap-2 transition transform hover:-translate-y-1">
                        <span class="icon-[tabler--plus] text-lg"></span> Create
                    </button>
                    <button @click.prevent="createAndTest" class="btn btn-success w-[200px] absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2 transition hover:-translate-y-1">
                        <span class="icon-[tabler--play] text-lg"></span> Create & Test
                    </button>
                    <button class="btn btn-outline btn-default w-[130px] ml-auto flex items-center justify-center gap-2 transition transform hover:-translate-y-1" @click.prevent="onCancel">
                        <span class="icon-[tabler--arrow-narrow-left] text-lg"></span> Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { createTest } from '../../helpers/test.js';

export default {
    name:"new test",
    components:{
        Icon
    },
    setup(){
        const toast = useToast();
        const router = useRouter()
        const testForm = ref({
            "title":"",
            "testType":"Typing",
            "totalQuestions": 5,
            "language":"English->German"
        })

        const onCreate = async() =>{
            const testCreated ={
                title: testForm.value.title,
                testType: testForm.value.testType,
                totalQuestions: Number(testForm.value.totalQuestions),
                questionLanguage: testForm.value.language.split("->")[0],
                answerLanguage: testForm.value.language.split("->")[1],
            }
            const result = await createTest(testCreated)
            
            if(result == null){
                toast.error("Failed to add new test!", {
                    position: "top-right",
                    timeout: 2000,
                    closeOnClick: true,
                    pauseOnHover: false
                });
                return;
            } else {
                toast.success("Add test success!", {
                    position: "top-right",
                    timeout: 1500,
                    closeOnClick: true,
                    pauseOnHover: false
                });
            }
            return result
        }

        const createAndTest = async()=>{
            const newTest = await onCreate();
            if (!newTest) return;
            const id = newTest._id || newTest.id; 

            if (testForm.value.testType === "Typing") {
                router.push(`/typing/${id}`);
            } else {
                router.push(`/flashcard/${id}`);
            }
        }

        const createAndBack = async()=>{
            const result = await onCreate();
            if (result) router.push('/tests');
        }

        const onCancel = async()=>{
            router.push('/tests')
        }

        return{
            testForm,
            onCreate,
            onCancel,
            createAndTest,
            createAndBack
        }
    }
}
</script>
