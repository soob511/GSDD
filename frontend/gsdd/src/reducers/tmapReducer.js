import { createSlice } from '@reduxjs/toolkit';

export const tmapReducer = createSlice({
    name: 'userInfo',
    initialState: {
        Tmapv2: '',
        map: '',
        position: '',
        location: '',
        marker: '',
    },
    reducers: {
        SET_TMAPV2: (state, { payload: Tmapv2 }) => {
            return { ...state, Tmapv2 };
        },
        SET_MAP: (state, { payload: map }) => {
            return { ...state, map };
        },
        SET_POSITION: (state, { payload: position }) => {
            return { ...state, position };
        },
        SET_LOCATION: (state, { payload: location }) => {
            return { ...state, location };
        },
        SET_MARKER: (state, { payload: marker }) => {
            return { ...state, marker };
        },

    },
});

export const { SET_TMAPV2, SET_MAP, SET_POSITION, SET_LOCATION, SET_MARKER } = tmapReducer.actions;
export default tmapReducer.reducer;
