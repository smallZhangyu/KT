<template>
    <div>
        <button @click="handleSend">Send msg</button>
        Options Child, {{ count }}, {{ doubleCount }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type {PropType} from 'vue';

interface List {
    name: string,
    age: number
}

export default defineComponent({
    name: 'OptionsChild',
    props: {
        count: Number,
        doubleCount: Number,
        list: Object as PropType<List>
    },
    // emits: ['dataEmit'],
    emits: {
        'dataEmit'(msg: string){return true;}
    },
    methods: {
        handleSend() {
            this.$emit('dataEmit', '23123');
        }
    }
})
</script>

<style scoped>

</style>