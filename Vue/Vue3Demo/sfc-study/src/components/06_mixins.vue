<template>
    <div>
        <h1>Mixins</h1>
        <div>{{ message }}</div>
        <div>{{ message2 }}</div>
    </div>
</template>

<script>
    // mixin 做不到传参的需求
    import Mixin from './mixins';
    export default {
        mixins: [Mixin]
    }
</script>

<style scoped>

</style>