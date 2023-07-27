<template>
  <div id="app">
    <el-container class="pageContainer">
      <home-header />

      <el-container>
        <home-aside />

        <home-main />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader.vue';
import HomeAside from './HomeAside.vue';
import HomeMain from './HomeMain.vue';

export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    HomeAside,
    HomeMain
  }
}
</script>
