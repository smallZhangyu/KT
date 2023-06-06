<template>
    <div>
        <RouterLink to="/vuex/index">Index</RouterLink> | 
        <RouterLink to="/vuex/about">About</RouterLink>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'VuexDemo'
    }
</script>

<style scoped>

</style>