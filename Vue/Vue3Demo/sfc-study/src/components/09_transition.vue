<template>
    <div>
        <button @click="show = !show">box1</button>
        <transition name="slide">
            <div v-if="show" id="box1"></div>
        </transition>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                show: true
            }
        }
    }
</script>

<style scoped>
#box1{
    width: 100px;
    height: 100px;
    background: skyblue;
}
.slide-enter-from {
    opacity: 1;
}
.slide-enter-to{
    opacity: 0;
}
.slide-enter-active{
    transition: 1s;
}
.slide-leave-from {
    opacity: 0;
}
.slide-leave-to{
    opacity: 1;
}
.slide-leave-active{
    transition: 1s;
}
</style>