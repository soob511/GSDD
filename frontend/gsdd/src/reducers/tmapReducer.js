import { createSlice } from '@reduxjs/toolkit';

export const tmapReducer = createSlice({
    name: 'tmapInfo',
    initialState: {
        Tmapv2: '',
        map: '',
        position: '',
        location: '',
        marker: '',
        markers: [],
        places: [],
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
        SET_MARKERS: (state, { payload: markers }) => {
            return { ...state, markers };
        },
        SET_PLACES: (state, { payload: places }) => {
            return { ...state, places };
        },

    },
});

export const { SET_TMAPV2, SET_MAP, SET_POSITION, SET_LOCATION, SET_MARKER, SET_MARKERS, SET_PLACES } = tmapReducer.actions;
export default tmapReducer.reducer;
