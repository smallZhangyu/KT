<template>
    <div>
        <h4>生命周期</h4>
        <h5>{{ count }}</h5>
        <p ref="ele">{{ count }}</p>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';

// setup中的生命周期只需要在选项式api的基础上加了on，没有beforeCreate和created 2个生命周期。
let count = ref(0);
let ele = ref();

setTimeout(() => {
    count.value += 1;
}, 2000);

onBeforeMount(() => {
    console.log(`onBeforeMount count: ${count.value}`);
    console.log(`onBeforeMount element: ${ele.value}`);
});

onMounted(() => {
    console.log(`onMounted count: ${count.value}`);
    console.log(`onMounted element: ${ele.value.innerHTML}`);
});

onBeforeUpdate(() => {
    console.log(`onBeforeUpdate count: ${count.value}`);
    console.log(`onBeforeUpdate element: ${ele.value.innerHTML}`);
});

onUpdated(() => {
    console.log(`onUpdated count: ${count.value}`);
    console.log(`onUpdated element: ${ele.value.innerHTML}`);
});
</script>

<style lang="scss" scoped>

</style>