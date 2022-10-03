import {createSlice} from '@reduxjs/toolkit';

export const infoReducer = createSlice({
    name: 'authInfo',
    initialState: {
      safe: 0,
      infos: [
        {"type":"가로등","cnt":0},
        {"type":"cctv","cnt":0},
        {"type":"안전지킴이집","cnt":0}
      ],
      news: [],
    },
    reducers: {
      SET_INFO: (state, { payload }) => {
        console.log(payload);
        return {
          ...state,
          safe: payload.safe,
          infos: payload.infos,
        };
      },
      SET_NEWS: (state, { payload }) => {
        console.log(payload);
        return {
            ...state,
            news: payload,
        }
      }
    },
  });
  
  export const { SET_INFO, SET_NEWS } = infoReducer.actions;
  
  export default infoReducer.reducer;