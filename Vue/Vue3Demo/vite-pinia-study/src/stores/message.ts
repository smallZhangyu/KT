import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', () => {
    const msg = ref('hello vue');
    const upperMsg = computed(() => msg.value.toUpperCase());

    const changeMsg = (payload: string) => {
        msg.value = payload;
    }

    return { msg, upperMsg, changeMsg }
})