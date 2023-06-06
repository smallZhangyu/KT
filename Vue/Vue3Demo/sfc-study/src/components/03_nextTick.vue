<template>
    <div>
        <h1>$nextTick()</h1>
        <h3 ref="header">{{ message }}</h3>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                message: 'Hello World'
            }
        },
        mounted(){
            setTimeout(() => {
                this.message = 'Hi Vue $nextTick() !'
                // 此时输出的是旧的Hello World，数据的更新是一个异步的
                // console.log(this.$refs.header.innerHTML);

                // $.nextTick() 方法可以获取到下一周期的值
                this.$nextTick().then(() => console.log(this.$refs?.header.innerHTML));
            }, 2000);
        }
    }
</script>

<style scoped>

</style>