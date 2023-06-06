<template>
    <div>
        <!-- 插件是自包含的代码，通常向Vue添加全局方法、全局组件、
        全局指令、全局mixins等等 -->
        <h1>自定义plugin</h1>
        <button v-auth="'edit'" @click="$http.get()">编辑</button>
        <say-hello></say-hello>    
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>