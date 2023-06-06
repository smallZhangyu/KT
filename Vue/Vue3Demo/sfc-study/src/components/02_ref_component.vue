<template>
    <div>
        {{ message }}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                message: 'Hello ref component'
            }
        },
        methods: {
            printMessage(data){
                console.log(data)
            }
        }      
    }
</script>

<style scoped>

</style>