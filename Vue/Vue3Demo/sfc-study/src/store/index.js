import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

import message from './message';
import todoTask from './todoTask';

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
    count: 0,
    msg: 'Hello Vue',
  },
  //getters 为计算属性
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  // actions 处理异步操作，调用方法要使用dispatch('change')
  actions: {
    change(context, payload) {
      setTimeout(() => {
        context.commit('change', payload);
      }, 500);
    },
  },
  // mutations 只能处理同步操作调用方法要使用commit('change')
  mutations: {
    change(state, payload = 1) {
      state.count += payload;
    },
  },
  plugins: [vuexLocal.plugin],
  modules: { message, todoTask },
});

export default store;
