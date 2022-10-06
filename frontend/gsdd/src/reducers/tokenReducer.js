import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 1000 * 60 * 60 * 24;

export const tokenReducer = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false, // 현재 로그인 여부
    accessToken: null, // 토큰
    expireTime: 0, // 토큰 만료시간
    userId: 0,
  },
  reducers: {
    SET_TOKEN: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        userId: payload.userId,
        authenticated: true,
        accessToken: payload.token,
        expireTime: new Date().getTime() + TOKEN_TIME_OUT,
      };
    },
    DELETE_TOKEN: (state) => {
      // console.log(state.accessToken)
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = 0;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenReducer.actions;

export default tokenReducer.reducer;
