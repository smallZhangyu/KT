<template>
    <div class="provide">
        <h4>Provide component</h4>
        <InjectComp></InjectComp>
    </div>
</template>

<script setup>
import { provide, readonly, ref } from 'vue';
import InjectComp from './05_inject.vue';

let count = ref(0);
provide('count', readonly(count));
provide('getMsg', (data)=>{
    console.log(data);
    count.value = 3;
});

setTimeout(() => {
    count.value = 2;
}, 2000);
</script>

<style scoped>
.provide{
    background-color: darkorange;
}
</style>