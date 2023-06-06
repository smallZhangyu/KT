<template>
    <div class="wrapper3">
        <h4>{{ message }}</h4>
        <p>data from provide ===== {{ info }}</p>
        <button @click="getInjectData('data from inject component.')">say data to provide</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                message: 'inject comp'
            }
        },
        inject: ['info', 'getInjectData']
    }
</script>

<style scoped>
.wrapper3{
    background-color: skyblue;
}
</style>