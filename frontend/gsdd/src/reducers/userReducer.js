import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'userInfo',
  initialState: {
    userId: 0,
    name: '',
    routes: [],
    contacts: [],
    contact: '',
  },
  reducers: {
    SET_USER: (state, { payload }) => {
      const { userId, name, routes, contacts } = payload;
      return {
        ...state,
        userId,
        name,
        routes,
        contacts,
      };
    },
    PUSH_USER_CONTACT: (state, { payload: contact }) => {
      return {
        ...state,
        contacts: [...state.contacts, ...contact],
      };
    },
    DELETE_USER_CONTACT: (state, action) => {},
    SET_USER_ROUTE: (state, action) => {},
    DELETE_USER_ROUTE: (state, action) => {},
  },
});

export const { SET_USER, UPDATE_USER_CONTACT, UPDATE_USER_ROUTE, DELETE_USER_CONTACT, DELETE_USER_ROUTE } = userReducer.actions;
export default userReducer.reducer;
