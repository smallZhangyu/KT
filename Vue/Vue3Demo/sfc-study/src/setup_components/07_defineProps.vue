<template>
    <div>
        <h4>defineProps demo</h4>
        <define-emits :count="count" message="Hello Vue" @custom-click="handleClick" />
    </div>
</template>

<script setup>
import DefineEmits from './07_defineEmits.vue';
import { ref } from 'vue';

let count = ref(2);

const handleClick = () => {
    count.value += 1;
};
</script>

<style lang="scss" scoped>

</style>