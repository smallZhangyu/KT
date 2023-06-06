<template>
    <div>
        {{ message }}
        <input type="text">
    </div>
</template>

<script>
    console.log('component 2'); 
    export default {
        data(){
            return {
                message: 'This is Comp 2'
            }
        }
    }
</script>

<style scoped>

div {
    min-width: 100px;
    min-height: 100px;
    padding-top: 20px;
}
</style>