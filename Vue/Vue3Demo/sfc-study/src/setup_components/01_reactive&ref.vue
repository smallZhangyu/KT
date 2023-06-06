<template>
    <div>
        <h4>reactive toRefs toRef computed</h4>
        <div>{{ message }} - {{ count }} - {{ doubleCount }}</div>
        <button @click="handleClick">setup event click</button>
    </div>
</template>

<script setup>
/* eslint */
// import { ref } from 'vue';
import { computed, reactive, toRefs } from 'vue';

// 直接写message = 'Hello World' 不会是一个响应式的数据
// let message = 'Hello World';

// 响应式数据需要用ref(), reactive()来包含
// ref()的值需要用xxx.value的形式获取
// let message = ref('Hello World');

// 使用reactive({})
let state = reactive({
    message: 'Hello World',
    count: 1
});
// toRefs(state) 用于将reactive数据转为ref的响应式数据
// 类似的写法还有用toRef()，let message = toRef(state, 'message');
let { message, count } = toRefs(state);

let doubleCount = computed(() => state.count * 2);

setTimeout(() => {
    // ref()声明的值需要用xxx.value 获取
    // message.value = 'Hi Vue setup api.'

    // reactive() 声明的值，直接修改
    state.message = 'Hi Vue setup by reactive'

}, 2000);

const handleClick = () => {
    state.count += 1;
}

</script>

<style lang="scss" scoped>

</style>