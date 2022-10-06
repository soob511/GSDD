import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'userInfo',
  initialState: {
    userId: 0,
    user: '',
    routes: [],
    contacts: [],
    position: '',
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
    }
  },
});

export const { SET_USER, SET_POSITION } = userReducer.actions;
export default userReducer.reducer;
