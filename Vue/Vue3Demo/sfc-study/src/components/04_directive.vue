<template>
    <div>
        <h1>自定义指令</h1>
        <div v-backgroundColor="bgColor">v-backgroundColor</div>
        <button v-auth="'edit'">Edit</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                bgColor: 'orange'
            }
        },
        mounted(){
            setTimeout(() => {
                this.bgColor = 'yellow'
            }, 2000);
        },
        // 自定义局部指令
        directives: {
            // 可以使用回调函数使得mounted和updated生命周期同时生效
            // backgroundColor: {
            //     mounted(ele, binding){
            //         ele.style.backgroundColor = binding.value;
            //     },
            //     updated(ele, item){
            //         ele.style.backgroundColor = binding.value;
            //     }
            // }
            backgroundColor: (ele, binding) => {
                ele.style.backgroundColor = binding.value;
            }
        }
    }
</script>

<style scoped>

</style>