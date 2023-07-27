import type { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './index';

export interface UserState {
    name: string;
    age: number
}

const state: UserState = {
    name: 'jeff',
    age: 32
};

const getters: GetterTree<UserState, State> = {
    upperUserName(state) {
        return state.name.toUpperCase();
    }
}

const actions: ActionTree<UserState, State> = {};

const mutations: MutationTree<UserState> = {
    changeUserName(state, payload: string) {
        state.name = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}