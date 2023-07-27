<template>
    <div>
        <el-button type="primary" size="large" @click="handleClick(5), changeName()">Click</el-button>
        <CompositionsChild :count="count" :doubleCount="doubleCount" :list='list' @dataEmit="getMsgFromChild"></CompositionsChild>

        <div>{{ username }}</div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue';
import CompositionsChild from './CompositionsChild.vue'
import { useStore } from '@/store';

const store= useStore();
console.log(store.state.count);
const username = computed(() => store.state.user.name);
const changeName = () => {
    store.commit('user/changeUserName', 'Peter Wang');
}

type List = {
    name: string;
    age: number;
}

const count = ref<number>(0);
const list = ref<List>({
                name: 'jeff',
                age: 32
            });
const doubleCount = computed(() => count.value * 2);

const handleClick = (num: number) => {
    count.value += num;
}

const getMsgFromChild = (msg: string) => {
    console.log(msg);
}

defineComponent({
    name: 'CompositionsParent'
})
</script>

<style scoped>

</style>