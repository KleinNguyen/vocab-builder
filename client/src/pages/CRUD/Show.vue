<template>
    <div class="flex flex-col items-center min-h-screen py-40">
        <div class="w-[700px] max-w-[90%] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <h1 class="text-center text-2xl font-bold mb-6">Word Details</h1>
            
            <form action=""  class="flex items-center flex-col gap-6">
                <div class="input w-full flex items-center gap-2">
                    <Icon icon="flagpack:gb-ukm" class="w-6 h-6 text-base-content/80 shrink-0" />
                    <div class="input-floating grow flex items-center h-full">
                        <input type="text" :disabled="true" v-model="word.english" placeholder="Enter English word" class="ps-3 h-full leading-tight py-0" id="englishInput" />
                        <label class="input-floating-label" for="englishInput">English</label>
                    </div>
                </div>

                <div class="input w-full flex items-center gap-2">
                    <Icon icon="flagpack:de" class="w-6 h-6 text-base-content/80 shrink-0" />
                    <div class="input-floating grow flex items-center h-full">
                        <input type="text" :disabled="true" v-model="word.german" placeholder="Enter German word" class="ps-3 h-full leading-tight py-0" id="germanInput" />
                        <label class="input-floating-label" for="germanInput">German</label>
                    </div>
                </div>

                <div class="input w-full flex items-center gap-2">
                    <Icon icon="flagpack:vn" class="w-6 h-6 text-base-content/80 shrink-0" />
                    <div class="input-floating grow flex items-center h-full">
                        <input type="text" :disabled="true" v-model="word.vietnamese" placeholder="Enter Vietnamese word" class="ps-3 h-full leading-tight py-0" id="germanInput" />
                        <label class="input-floating-label" for="germanInput">Vietnamese</label>
                    </div>
                </div>
                <div class="w-full flex items-center relative">
                    <router-link :to="{name: 'edit', params:{id:word._id}}"> 
                        <button class="btn btn-outline btn-info w-[150px] flex items-center justify-center gap-2">
                            <span class="icon-[tabler--pencil] text-lg"></span> Edit
                        </button>
                    </router-link>

                    <button class="btn btn-outline btn-error w-[150px] absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2" @click.prevent="onDelete(word._id)">
                        <span class="icon-[tabler--trash] text-lg"></span> Delete
                    </button>

                    <button class="btn btn-outline btn-default w-[150px] ml-auto flex items-center justify-center gap-2" @click.prevent="onCancel">
                        <span class="icon-[tabler--arrow-narrow-left] text-lg"></span> Back to list
                    </button>
                </div>


            </form>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getVocabById, deleteVocabById } from '../../helpers/crud.js';

export default {
    name:"show",
    components:{
        Icon
    },
    setup(){
        const toast = useToast();
        const word = ref({})
        const route = useRoute()
        const router = useRouter()

        onMounted(async()=>{
            const result = await getVocabById(route.params.id)
            if (result == null){
                toast.error("Falied to load word data!", {
                    position: "top-right",
                    timeout: 2000,
                    closeOnClick: true,
                    pauseOnHover: false
                });
                word.value = {};
            } else{
                word.value = result;
            }
        })

        const onDelete = async()=>{
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            });

            if(result.isConfirmed){
                await deleteVocabById(route.params.id)
                toast.success("Delete success!", {
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
            onDelete,
            onCancel
        }
    }
}
</script>
