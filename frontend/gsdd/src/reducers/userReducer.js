import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'userInfo',
  initialState: {
    userId: 0,
    user: '',
    routes: [],
    contacts: [],
    position: '',
    display: false,
  },
  reducers: {
    SET_USER: (state, { payload }) => {
      const { userId, user, routes, contacts } = payload;
      return {
        ...state,
        userId,
        user,
        routes,
        contacts,
      };
    },
    SET_NAME: (state, { payload: name }) => {
      return { ...state, name };
    },
    SET_POSITION: (state, { payload: position }) => {
      return { ...state, position };
    },
    SET_DISPLAY: (state, { payload: display }) => {
      return { ...state, display };
    }
  },
});

export const { SET_USER, SET_POSITION, SET_DISPLAY } = userReducer.actions;
export default userReducer.reducer;
