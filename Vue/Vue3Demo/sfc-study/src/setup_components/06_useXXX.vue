<template>
    <div>
        <h4>use function</h4>
        <div>{{ count }}</div>
        <div>{{ doubleCount }}</div>
    </div>
</template>

<script setup>
import useCounter from './useCounter';

const {count, doubleCount} = useCounter(2);

setTimeout(() => {
    count.value = 3;
}, 2000);
</script>

<style lang="scss" scoped>

</style>