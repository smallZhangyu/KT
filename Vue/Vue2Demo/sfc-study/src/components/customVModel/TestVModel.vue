<template>
    <div>
        <h3>自定义具有v-model功能的组件</h3>
        <p>v-model msg: {{ msg }}</p>
        <CustomVModel v-model="msg" />
    </div>
</template>

<script>
import CustomVModel from './CustomVModel.vue';
export default {
    name: 'TestVModel',
    data: function () {
        return {
            msg: ''
        }
    },
    components: {
        CustomVModel
    }
}
</script>

<style scoped></style>