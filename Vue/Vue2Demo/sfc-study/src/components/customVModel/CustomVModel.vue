<template>
    <input type="text" :value="inputValue" @input="$emit('handleChange', $event.target.value)" />
</template>

<script>
export default {
    name: 'CustomerVModel',
    model: {
        prop: 'inputValue',
        event: 'handleChange'
    },
    // 此处的props和input里的:value 不写也可以进行v-model的实现，主要还是model选项的作用，input里不屑：value的话，model.prop在input里作为attr存放的
    props: {
        inputValue: {
            type: String,
            default: '',
        }
    }
}
</script>

<style scoped></style>