<template>
  <el-aside>
    <el-menu router :default-active="$route.path" class="el-menu-vertical-demo">

      <el-submenu v-for="menu in menus" :index="menu.path" :key="menu.path">
        <template slot="title">
          <i :class="menu.meta?.icon"></i>
          <span>{{ menu.meta?.title }}</span>
        </template>

        <el-menu-item v-for="childMenu in menu.children" :index="menu.path + '/' + childMenu.path"
          :key="menu.path + '/' + childMenu.path">
          <!-- <i :class="childMenu.meta?.icon"></i> -->
          <span>{{ childMenu.meta?.title }}</span>
        </el-menu-item>

      </el-submenu>

    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'HomeAside',
  computed: {
    menus: function () {
      return this.$router.options.routes.filter((route) => {
        return route.meta?.menu
      })
    }
  }
}
</script>

<style scoped>
.el-aside {
  width: 260px;
  height: calc(100vh - 60px)
}
</style>