import { createRouter, createWebHistory } from 'vue-router';
import AppVue from '@/components/App.vue';
import App_setupVue from '@/views/setup.vue';
import BasicDemo from '@/setup_components/App.vue';
import SearchMusic from '@/setup_components/10_searchMusic.vue';
import RouterDemo from '@/setup_components/11_routerDemo.vue';

import VuexDemo from '@/vuex_demo/index.vue';
import VuexIndex from '@/vuex_demo/VuexIndex.vue';
import VuexAbout from '@/vuex_demo/VuexAbout.vue';

import TodoList from '@/todoList_vuex/index.vue';
import TodoListAll from '@/todoList_vuex/allTask.vue';
import TodoListComplete from '@/todoList_vuex/completeTask.vue';
import TodoListInComplete from '@/todoList_vuex/inCompleteTask.vue';

const routes = [
  { path: '/', redirect: '/task/all' },
  {
    path: '/task',
    redirect: '/task/all',
    component: TodoList,
    children: [
      {
        path: 'all',
        component: TodoListAll,
      },
      {
        path: 'complete',
        component: TodoListComplete,
      },
      {
        path: 'incomplete',
        component: TodoListInComplete,
      },
    ],
  },
  {
    path: '/vuex',
    redirect: '/vuex/index',
    component: VuexDemo,
    children: [
      {
        path: 'index',
        component: VuexIndex,
      },
      {
        path: 'about',
        component: VuexAbout,
      },
    ],
  },
  {
    path: '/basic',
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
