<!-- 使用component + :is 的方式动态加载组件 -->
<!-- 使用keep-alive 包裹动态组件，缓存组件的状态, keep-alive只能有一个直接子元素 -->
<!-- 组件的异步加载，使用defineAsyncComponent(() => import('@/xxx')) 引入组件 ，路径要为绝对值 -->
<!-- suspense 是一个实验性质的api，可以提供异步组件加载的loading状态 -->
<template>
    <div>
        <button @click="this.nowComponent = 'myComp1'">Comp 1</button>
        <button @click="this.nowComponent = 'myComp2'">Comp 2</button>
        <button @click="this.nowComponent = 'myComp3'">Comp 3</button>
        <suspense>
            <keep-alive>
                <component :is="nowComponent"></component>
            </keep-alive>
            <template #fallback>
                <div>Loading...</div>
            </template>
        </suspense>
         
    </div>
</template>

<script>
    // import Comp_1 from './Comp_1.vue';
    // import Comp_2 from './Comp_2.vue';
    // import Comp_3 from './Comp_3.vue';
    import { defineAsyncComponent } from 'vue';

    export default {
        data(){
            return {
                nowComponent: 'myComp1'
            }
        },
        components: {
            myComp1: defineAsyncComponent(() => import('@/components/Comp_1.vue')),
            myComp2: defineAsyncComponent(() => import('@/components/Comp_2.vue')),
            myComp3: defineAsyncComponent(() => import('@/components/Comp_3.vue'))
        }
    }
</script>

<style scoped>

</style>