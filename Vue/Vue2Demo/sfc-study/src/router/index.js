import Vue from 'vue';
import VueRouter from 'vue-router';
import TestVModel from '@/components/customVModel/TestVModel.vue';
import HomeView from '../views/home/HomeView.vue';
import NextTick from '@/components/nextTick/NextTick.vue';
import SlotDemo from '@/components/slot/SlotDemo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/basic/parent',
  },
  {
    path: '/basic',
    name: 'basic',
    component: HomeView,
    meta: {
      menu: true,
      title: '基础示例',
      icon: 'el-icon-notebook-1',
    },
    children: [
      {
        path: 'parent',
        name: '',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: {
          menu: true,
          title: '组件通讯',
          icon: 'el-icon-service',
        },
      },
    ],
  },
  {
    path: '/advance',
    name: 'advance',
    component: HomeView,
    meta: {
      menu: true,
      title: '高级示例',
      icon: 'el-icon-notebook-2',
    },
    children: [
      {
        path: 'model',
        name: 'model',
        component: TestVModel,
        meta: {
          menu: true,
          title: '自定义 v-model 组件',
          icon: 'el-icon-magic-stick',
        },
      },
      {
        path: 'nextTick',
        name: 'nextTick',
        component: NextTick,
        meta: {
          menu: true,
          title: '$nextTick 功能演示',
          icon: 'el-icon-magic-stick',
        },
      },
      {
        path: 'slot',
        name: 'slot',
        component: SlotDemo,
        meta: {
          menu: true,
          title: 'slot 插槽演示',
          icon: 'el-icon-magic-stick',
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
