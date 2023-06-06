<template>
    <div>
        <div>
            <RouterLink to="/setup/basic">基础demo</RouterLink> | 
            <RouterLink to="/setup/search-music" custom v-slot="{navigate}">
                <button @click="navigate">音乐搜索demo</button>
            </RouterLink> | 
            <RouterLink :to="{name: 'all', params: {id: 123}}"> all 123 </RouterLink>
        </div>
        <router-view></router-view>
        <router-view name="music"></router-view>
    </div>
</template>

<script>
export default {
    name: 'Setup-demo'
}
</script>

<style lang="scss" scoped>

</style>