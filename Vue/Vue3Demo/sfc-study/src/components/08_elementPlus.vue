<template>
    <div>
        <h1>Element Plus Demo</h1>
        <el-button type="primary" icon="Clock" @click="open">Primary</el-button>
        <el-button type="success" @click="notification">Success</el-button>
    </div>
</template>

<script>
    import { ElMessage } from 'element-plus';
    import { ElNotification } from 'element-plus';
    export default {
        methods: {
            open(){
                ElMessage({
                    showClose: true,
                    message: 'Congrats, this is a success message.',
                    type: 'success',
                });
            },
            notification(){
                ElNotification({
                    title: 'Prompt',
                    message: 'This is a message that does not automatically close',
                    duration: 0,
                });
            }
        }
    }
</script>

<style scoped>

</style>
