<template>
    <div>
        <h1>$refs.ele</h1>
        <button @click="handleClick">Click print ref msg</button>
        <div ref="ref_a">aaaa</div>
        <div ref="ref_b">bbbb</div>
        <RefComponent ref="ref_component"></RefComponent>
    </div>
</template>

<script>
import RefComponent from '@/components/02_ref_component.vue';
    export default {
        methods:{
            handleClick(){
                console.log(this.$refs.ref_a);
                console.log(this.$refs.ref_b);
                console.log(this.$refs.ref_component);
                console.log(this.$refs.ref_component.message);
                this.$refs.ref_component.printMessage('data is from parent component');
            }
        },
        components: {
            RefComponent
        }
    }
</script>

<style scoped>

</style>