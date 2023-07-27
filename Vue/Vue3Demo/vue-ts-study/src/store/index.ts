import { createStore, useStore as baseUseStore } from 'vuex'
import type { Store } from 'vuex';
import { InjectionKey } from 'vue';
import user, { UserState } from './user';

// 为 store state 声明类型
export interface State {
  count: number
}
interface StateAll extends State {
  user: UserState
}

// 定义 injection key
export const key: InjectionKey<Store<StateAll>> = Symbol()

export const useStore = () => {
  return baseUseStore(key);
}

export default createStore<State>({
  state: {
    count: 0
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
