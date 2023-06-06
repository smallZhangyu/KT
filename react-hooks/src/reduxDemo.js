import { legacy_createStore as createStore } from 'redux';
// const createStore = require('redux').legacy_createStore;

const initState = {
  value: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 };
    case 'counter/decremented':
      return { ...state, value: state.value - 1 };
    default:
      return { ...state };
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const addAction = { type: 'counter/incremented' };
store.dispatch(addAction);

const subAction = { type: 'counter/decremented' };
store.dispatch(subAction);

export default store;
