const initState = {
  msg: 'hello',
};

const messageReducers = (state = initState, action) => {
  switch (action.type) {
    case 'message/change':
      return { ...state, msg: action.payload };
    default:
      return { ...state };
  }
};

export default messageReducers;
