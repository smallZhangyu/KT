<template>
    <div class="inject">
        <h4>Inject component</h4>
        <div>Count: {{ count }}</div>
        <button @click="getMsg('data from inject comp.')">Click</button>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const count = inject('count');
const getMsg = inject('getMsg');

// setTimeout(() => {
//     count.value = 2222;
// }, 4000);
</script>

<style scoped>
.inject{
    background: skyblue;
}
</style>