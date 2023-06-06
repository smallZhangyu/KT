const state = {
  taskList: [
    {
      id: 1,
      taskName: 'first task',
      isComplete: true,
    },
    {
      id: 2,
      taskName: 'second task',
      isComplete: false,
    },
  ],
};

const getters = {
  completeTask(state) {
    return state.taskList.filter((item) => item.isComplete);
  },
  inCompleteTask(state) {
    return state.taskList.filter((item) => !item.isComplete);
  },
};

const actions = {};

const mutations = {
  addTask(state, payload) {
    const task = {
      id: state.taskList.length,
      isComplete: false,
      taskName: payload,
    };
    state.taskList.unshift(task);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
