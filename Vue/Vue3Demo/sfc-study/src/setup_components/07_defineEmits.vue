<template>
    <div>
        <h4>child comp</h4>
        <div>{{ count }} - {{ message }}</div>
        <button @click="handleClick">Click count</button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const state = defineProps({
    count: {
        type: Number
    },
    message: {
        type: String
    }
});
const emit = defineEmits(['custom-click']);
const handleClick = () => {
    emit('custom-click');
    console.log(state.count);
}

console.log(state.count);
</script>

<style lang="scss" scoped>

</style>