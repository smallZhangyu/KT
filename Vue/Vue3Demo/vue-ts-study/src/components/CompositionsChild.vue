<template>
    <div>
        <el-button type="warning" @click="handleSend">Send msg</el-button>
        Compositions Child, {{ count }}, {{ doubleCount }}
    </div>
</template>

<script setup lang="ts">
import { defineComponent, defineProps, defineEmits } from 'vue';

interface Props {
    count: number;
    doubleCount: number;
    list: {
    name: string,
    age: number
};
}
// defineProps({
//     count: Number,
//     doubleCount: Number,
//     list: Object as PropType<List>
// });
defineProps<Props>();

interface Emits {
    (e: 'dataEmit', msg:string): void
}
const emit = defineEmits<Emits>();

const handleSend = () => {
    emit('dataEmit', '组合式demo');
}

defineComponent({
    name: 'CompositionsChild'
})
</script>

<style scoped>

</style>