const initState = {
  value: 0,
};

const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 };
    case 'counter/decremented':
      return { ...state, value: state.value - 1 };
    default:
      return { ...state };
  }
};

export default counterReducer;
