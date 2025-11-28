<template>
    <div class="flex flex-col items-center min-h-screen py-40">
        <div class="w-[700px] max-w-[90%] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <h1 class="text-center text-2xl font-bold mb-6">Add New Word</h1>
            
            <form action="" @submit.prevent="onAdd" class="flex items-center flex-col gap-6">
                <div class="input w-full flex items-center gap-2">
                    <Icon icon="flagpack:gb-ukm" class="w-6 h-6 text-base-content/80 shrink-0" />
                    <div class="input-floating grow flex items-center h-full">
                        <input type="text" required v-model="word.english" placeholder="Enter English word" class="ps-3 h-full leading-tight py-0" id="englishInput" />
                        <label class="input-floating-label" for="englishInput">English</label>
                    </div>
                </div>

                <div class="input w-full flex items-center gap-2">
                    <Icon icon="flagpack:de" class="w-6 h-6 text-base-content/80 shrink-0" />
                    <div class="input-floating grow flex items-center h-full">
                        <input type="text" required v-model="word.german" placeholder="Enter German word" class="ps-3 h-full leading-tight py-0" id="germanInput" />
                        <label class="input-floating-label" for="germanInput">German</label>
                    </div>
                </div>

                <div class="input w-full flex items-center gap-2">
                    <Icon icon="flagpack:vn" class="w-6 h-6 text-base-content/80 shrink-0" />
                    <div class="input-floating grow flex items-center h-full">
                        <input type="text" required v-model="word.vietnamese" placeholder="Enter Vietnamese word" class="ps-3 h-full leading-tight py-0" id="germanInput" />
                        <label class="input-floating-label" for="germanInput">Vietnamese</label>
                    </div>
                </div>

                <div class="w-full flex items-center">
                <button class="btn btn-outline btn-info w-[140px] flex items-center justify-center gap-2" >
                    <span class="icon-[tabler--plus] text-lg"></span> Add
                </button>
                <button class="btn btn-outline btn-default w-[130px] ml-auto flex items-center justify-center gap-2" @click.prevent="onCancel">
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
import { addNewVocab } from '../../helpers/crud.js';

export default {
    name:"new",
    components:{
        Icon
    },
    setup(){
        const toast = useToast();

        const word = ref({})
        // const route = useRoute()
        const router = useRouter()

        const onAdd = async() =>{
            const result = await addNewVocab(word.value)
            
            if(result == null){
                toast.error("Failed to add new word!", {
                    position: "top-right",
                    timeout: 2000,
                    closeOnClick: true,
                    pauseOnHover: false
                });
                return;
            } else {
                toast.success("Add word success!", {
                    position: "top-right",
                    timeout: 1500,
                    closeOnClick: true,
                    pauseOnHover: false
                });
                router.push('/words')
            }
        }

        const onCancel = async()=>{
            router.push('/words')
        }

        return{
            word,
            onAdd,
            onCancel
        }
    }
}
</script>
