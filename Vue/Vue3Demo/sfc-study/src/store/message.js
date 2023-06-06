const state = {
  msg: 'hello vue',
};

const getters = {
  upperMsg(state) {
    return state.msg.toUpperCase();
  },
};

const actions = {};

const mutations = {
  changeMsg(state, payload) {
    state.msg = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
