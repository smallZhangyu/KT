<template>
    <div class="wrapper2">
        <h4>{{ message }}</h4>
        <br>
        <InjectComp></InjectComp>
    </div>
</template>

<script>
    import InjectComp from './11_provideInject_inject.vue';
    export default {
        data(){
            return {
                message: 'middle component'
            }
        },
        components: {
            InjectComp
        }
    }
</script>

<style scoped>
.wrapper2{
    background-color: yellowgreen;
}
</style>