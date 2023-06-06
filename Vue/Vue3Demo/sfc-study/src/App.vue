<template>
    <div>
        <div>
            <RouterLink to="/">Vuex demo</RouterLink> | 
            <RouterLink to="/basic">Vue3 选项式 API demo</RouterLink> | 
            <RouterLink to="/setup/basic">Vue3 组合式 demo</RouterLink>
        </div>
        
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'View-Index'
}
</script>

<style lang="scss" scoped>

</style>