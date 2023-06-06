# Vue-router

[TOC]

## Vue-router 安装

1. `npm i vue-router` 默认安装的是 vue-router 4 版本；Vue3 搭配 Vue-router4；

## 基础使用

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AppVue from '@/components/App.vue';
import App_setupVue from '@/views/setup.vue';
import BasicDemo from '@/setup_components/App.vue';
import SearchMusic from '@/setup_components/10_searchMusic.vue';

const routes = [
  {
    path: '/',
    component: AppVue,
  },
  {
    path: '/setup',
    component: App_setupVue,
    children: [
      {
        path: 'basic',
        component: BasicDemo,
      },
      {
        path: 'search-music',
        component: SearchMusic,
      },
      {
        path: 'all/:id',
        // 为路由命名
        name: 'all', // 对应的路由方式为<RouterLink :to="{name: 'all', params: {id: 123}"></RouteLink>
        // 配置多组件视图
        components: {
          default: RouterDemo, // 对应的是<router-view></router-view>
          music: SearchMusic, // 对应的是<router-view name='music'></router-view>
        },
        // 配置路由的元数据
        meta: {
          auth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// SearchMusic
<template>
    <div>
        <div>
            <RouterLink to="/setup/basic">基础demo</RouterLink> |
            {/* 自定义link样式 */}
            <RouterLink to="/setup/search-music" custom v-slot="{navigate}">
                <button @click="navigate">音乐搜索demo</button>
            </RouterLink>
            {/* 使用命名路由传参 */}
            <RouterLink :to="{name: 'all', params: {id: 123}"> All - 123</RouteLink>
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
```

### router 相关的方法和属性

1. `$route.params.id` 获取动态路由`/post/art/:id`的 id 参数；
2. `$route.query` 获取路由的查询字符串；
3. `$route.meta` 获取路由元数据 meta；
4. `$router.push('/search')` 路由的跳转；

在组合式中的写法：

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const router = useRouter();
</script>
```

## 路由守卫详解及应用场景

导航守卫主要用来通过跳转或取消的方式守卫导航，  
主要分类有全局的，单个路由独享的，或者组件级的。

### 全局的路由守卫

```js
router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.meta.auth) {
    next('/');
  } else {
    next();
  }
});
```

### 单个路由的守卫

```js
const routes = [
  {
    path: '/search',
    component: SearchMusic,
    beforeEnter: (to, from, next) => {
      if (to.meta.auth) {
        next('/');
      } else {
        next();
      }
    },
  },
];
```

### 组件内的守卫

```vue
<template>
  <div></div>
</template>
<script>
export default {
  name: 'SearchMusic',
  beforeRouteEnter(to, from, next) {
    if (to.meta.auth) {
      next('/');
    } else {
      next();
    }
  },
};
</script>
```
