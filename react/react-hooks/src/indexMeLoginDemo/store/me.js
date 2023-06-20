import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const meSlice = createSlice({
  name: 'myInfo',
  initialState: {
    ...initialState,
    upperName: initialState.username.toUpperCase(),
  },
  reducers: {
    changeInfo(state, action) {
      state.username = action.payload;
      state.upperName = action.payload.toUpperCase();
    },
  },
});

export const { changeInfo } = meSlice.actions;
export default meSlice.reducer;
