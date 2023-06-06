<template>
    <ul class="rateWrapper">
        <li v-for="index in max" :key="index">
            <i :class="iconActionStatus(index)" @mouseenter="$emit('update:modelValue', index)" @mouseleave="$emit('update:modelValue', this.initRate)" @click="this.initRate = index"></i>
        </li>
    </ul>
    <slot></slot>
</template>

<script>
import '@/assets/iconfont/iconfont.css';
    export default {
        name: 'ElRate',
        emits:['update:modelValue'],
        props: {
            max: {
                type: Number,
                default: 5
            },
            modelValue: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                initRate: this.modelValue
            }
        },
        methods:{
            iconActionStatus(index){
                
                return {
                    iconfont: true,
                    'icon-xingzhuang-xingxing': true,
                    active: (this.modelValue >= index)
                };
            }
        }
    }
</script>

<style scoped>
.rateWrapper {
    display: flex;
}
.rateWrapper li {
    list-style: none;
}
.rateWrapper i{
    font-size: 24px;
    color: #333;
}
.rateWrapper i.active{
color:gold;
}
</style>