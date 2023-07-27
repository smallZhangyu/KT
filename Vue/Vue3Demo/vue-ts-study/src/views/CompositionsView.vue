<template>
    <div>
        <CompositionsParent></CompositionsParent>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CompositionsParent from '@/components/CompositionsParent.vue';

export default defineComponent({
    name: 'CompositionsView',
    components: {
        CompositionsParent
    }
})
</script>

<style scoped>

</style>