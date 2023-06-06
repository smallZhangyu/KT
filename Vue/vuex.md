# Vuex

## Vuex 安装

`npm i -save vuex` vue3 搭配 vuex4；

## 基础使用示例

```js
// store/index.js
import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist'

// 数据持久化
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => {
    return {
      count: state.count,
    };
  },
});

const store = createStore({
    state: {
        count: 0
    },
    getters: {
        doubleCount(state) {
            return state.count * 2;
        }
    },
    // actions 处理异步操作
    actions: {
        change(context, payload) {
            setTimeout(() => {
                context.commit('change', payload);
            }, 500)
        }
    },
    // mutations 处理同步操作
    mutations: {
        change(state, payload) {
            state.count += payload;
        }
    },
    plugins: [vuexLocal.plugin]
    modules: {
        message
    }
});

export default store;

// store/modules/message.js
const state = {
    msg: 'hello'
};
const getters = {
    upperMsg(state){
        return state.msg.toUpperCase();
    }
}
const actions = {

};
const mutations = {
    changeMsg(state, payload){
        state.msg = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
```

Vue 组件里的使用

```js
// root 组件的挂载
import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store/index';

const app = createApp(App);

app.use(store).mount('#app');
```

```vue
<!-- App.vue -->
<template>
  <div>
    {{ count }} - {{ doubleCount }}
    <!-- <button @click="handleClick(5)">Click</button> -->
    <button @click="change(5)">Click</button>
  </div>
</template>

<script>
// 选项式 API 写法
import { mapState, mapGetters, mapActions, mapMutations } from 'vue';

export default {
  name: 'App',
  computed: {
    // count(){
    //     return this.$store.state.count
    // },
    // doubleCount(){
    //     return this.$store.getters.doubleCount
    // }
    ...mapState(['count']),
    ...mapGetters(['doubleCount']),
    // 多层级的
    ...mapState('message', ['msg']),
    ...mapGetter('message', ['upperMsg']),
  },
  methods: {
    // handleClick(payload) {
    //   this.$store.dispatch('change', payload);
    // },
    ...getActions(['change']),
    // 多层级的
    ...getMutations('message', ['changeMsg']),
  },
};
</script>

<script setup>
// 组合式 API 写法
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

defineComponent({ name: 'App' });
const store = useStore();
// 需要使用computed包裹，才能实现响应式数据
const msg = computed(() => store.state.message.msg);
const upperMsg = computed(() => store.getters['message/upper']);
const changeMsg = (payload) => {
  store.commit('message/changeMsg', payload);
};
const changeCount = (payload) => {
  store.dispatch('change', 6);
};
</script>

<style scope></style>
```
