<template>
    <div style="margin-top: 50px;">
        Hello Vuex About, {{ count }} - {{ msg }} - {{ upperMsg }}
        <button @click="changeMsg('Hi Jeff')">Change Msg</button>
    </div>
</template>

<script setup>
import {defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const count = computed(() => store.state.count);
const msg = computed(() => store.state.message.msg);
// console.log(store);
const upperMsg = computed(() => store.getters['message/upperMsg']);
const changeMsg = (msg) => { 
    store.commit('message/changeMsg', msg);
}

defineComponent({
    name: 'VuexAbout'
});
</script>

<style scoped>

</style>