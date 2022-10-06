import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 1000 * 60 * 60 * 24;

export const tokenReducer = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false, // 현재 로그인 여부
    accessToken: null, // 토큰
    expireTime: 0, // 토큰 만료시간
    // userId: 0,
    userId: 2,
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
    SET_TEST: (state) => {
      state.authenticated = true;
      state.accessToken =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkdWNreWdyYWNlQGdtYWlsLmNvbSIsImlkIjoyLCJlbWFpbCI6ImR1Y2t5Z3JhY2VAZ21haWwuY29tIiwibmFtZSI6Iuq5gOyjvOydgCIsInByb3ZpZGVyIjoia2FrYW8iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE2NjUwMzc4MTIsImV4cCI6MTY2NTEyNDIxMn0.oOFKtIB49CEatM5ndjPUVm_1pSRiGrMM6Gf9-3Am_hE';
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
      state.userId = 2;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN, SET_TEST } = tokenReducer.actions;

export default tokenReducer.reducer;
