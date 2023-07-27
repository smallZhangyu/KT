<template>
    <div>
        <h3>Slot Demo</h3>
        <scope-slot>
            <template v-slot="slotProps">
                {{ slotProps.slotData.title }}
            </template>
        </scope-slot>
        <hr>
        <name-slot>
            <template v-slot:slot1>
                <h4>使用具名插槽1: </h4>
                v-slot:slot1
            </template>

            <template v-slot:default>
                <h4>使用默认插槽: </h4>
                v-slot:default
            </template>

            <template v-slot:slot2>
                <h4>使用具名插槽2: </h4>
                v-slot:slot2
            </template>
        </name-slot>

        <hr>
        <p>作用域插槽通过在&lt;template v-slot="slotProps">获取子slot的作用域，slot绑定一个数据元slotData，通过slotProps.slotData.xxxx即可获取相关data</p>
        <p>具名插槽也是通过v-slot:slotName指定插槽的名字，可简写为#slotName</p>
    </div>
</template>

<script>
import ScopeSlot from './ScopeSlot.vue';
import NameSlot from './NameSlot.vue';
export default {
    name: 'SlotDemo',
    data() {
        return {
            website: {
                title: '父插槽的信息'
            }
        }
    },
    components: {
        ScopeSlot,
        NameSlot
    }
}
</script>

<style scoped></style>