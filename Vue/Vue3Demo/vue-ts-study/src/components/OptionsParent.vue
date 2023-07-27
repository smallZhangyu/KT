<template>
    <div>
        <button @click="handleClick(2)">Click</button>
        <OptionsChild :count="count" :doubleCount="doubleCount" :list='list' @dataEmit="getMsgFromChild"></OptionsChild>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OptionsChild from './OptionsChild.vue'

type List = {
    name: string;
    age: number;
}

export default defineComponent({
    name: 'OptionsParent',
    data(){
        return {
            count: 0 as number,
            list: {
                name: 'jeff',
                age: 32
            } as List
        }
    },
    computed: {
        doubleCount() {
            return this.count * 2;
        }
    },
    methods: {
        handleClick(num: number){
            this.count += num;
        },
        getMsgFromChild(msg: string){
            console.log(msg);
        }
    },
    components: {
        OptionsChild
    }
})
</script>

<style scoped>

</style>