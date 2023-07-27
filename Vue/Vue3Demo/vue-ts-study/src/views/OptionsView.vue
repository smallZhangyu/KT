<template>
    <div>
        <OptionsParent></OptionsParent>
    </div>
</template>

<script lang="ts">
import OptionsParent from '@/components/OptionsParent.vue';
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'OptionsView',
    components: {
        OptionsParent
    }
});
</script>

<style scoped>

</style>