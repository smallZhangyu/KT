<template>
    <div>
        Router View {{ this.$route.params.id }}
    </div>
</template>

<script>
export default {
    name: 'RouterDemo',
    mounted() {
        console.log('router meta info: ', this.$route.meta.auth);
    }
}
</script>

<style lang="scss" scoped>

</style>