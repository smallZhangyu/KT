<template>
    <div class="wrapper">
        <h4>{{ message }}</h4>
        <br>
        <MiddleComp></MiddleComp>
    </div>
</template>

<script>
    import MiddleComp from './11_provideInject_middle.vue';
    export default {
        data(){
            return {
                message: 'provide component'
            }
        },
        provide() {
            return {
                info: this.message,
                getInjectData(data){
                    console.log(data);
                }
            }
        },
        components: {
            MiddleComp
        }
    }
</script>

<style scoped>
.wrapper{
    background: orchid;
}
</style>