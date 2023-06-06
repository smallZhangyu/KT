<template>
    <div>
        <h4>watchEffect demo</h4>
        <p>Count: {{ count }}</p>
        <div ref="ele">{{ count }}</div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
/**
 * watchEffect 的特点 --- 类似于React 中的 useEffect
 * 1. 一开始会初始化触发一次，然后所依赖的数据发生变化的时候，才会再次触发；
 * 2. 触发的时机是数据响应后，DOM更新前，通过flush: 'post'修改成DOM更新后进行触发；
 * 3. 返回结果是一个stop方法，可以停止watchEffect的监听；
 * 4. 提供一个形参，形参主要是用于清除上一次的行为
 */
let count = ref(0);
let ele = ref();

// watchEffect(() => {
//     console.log(`~~~ watchEffect ~~~ count: ${count.value}`);
//     if(ele.value){
//         console.log(`~~~ watchEffect ~~~ element: ${ele.value.innerHTML}`);
//     } else {
//         console.log(`~~~ watchEffect ~~~ element: ${ele.value}`);
//     }   
// }, {
//     flush: 'post'
// });

watchEffect((cb) => {
    console.log(`~~~ watchEffect ~~~ count: ${count.value}`);
    cb(() => {
        // 更新前触发和卸载前触发，目的：清除上一次的行为
        console.log('~~ watchEffect ~~ before update');
    });
})

setTimeout(() => {
    count.value += 1;
}, 2000);
</script>

<style lang="scss" scoped>

</style>