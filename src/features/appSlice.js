import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
};

export const appSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
