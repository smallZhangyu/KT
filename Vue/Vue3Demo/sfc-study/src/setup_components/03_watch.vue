<template>
    <div>
        <h4>watch demo</h4>
        <div>{{ count }}</div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

let count = ref(0);
/**
 * watch 特点：
 * 1. 懒执行副作用，数据初始化时不执行，只在数据变化的时候执行。
 * 2. 更具体的说明什么状态应该触发侦听器重新运行，明确说明了是哪个state触发的重新运行。
 * 3. 可以访问侦听状态变化前后的值
 */
watch(count, (newValue, oldValue) => {
    console.log(`newValue: ${newValue}, oldValue: ${oldValue}`);
});

setTimeout(() => {
    count.value += 1;
}, 2000);
</script>

<style lang="scss" scoped>

</style>