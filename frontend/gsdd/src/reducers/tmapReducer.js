import { createSlice } from '@reduxjs/toolkit';

export const tmapReducer = createSlice({
    name: 'tmapInfo',
    initialState: {
        Tmapv2: {},
        map: {},
        latitude: null,
        longitude: null,
        location: {},
        marker: {},
        markers: [],
        places: [],
        origin: null,
        destination: null,
    },
    reducers: {
        SET_TMAPV2: (state, { payload: Tmapv2 }) => {
            return { ...state, Tmapv2: Tmapv2 };
        },
        SET_MAP: (state, { payload: map }) => {
            console.log(map);
            return { ...state, map: map };
        },
        SET_LATITUDE: (state, { payload: latitude }) => {
            console.log(latitude);
            return { ...state, latitude: latitude };
        },
        SET_LONGITUDE: (state, { payload: longitude }) => {
            console.log(longitude);
            return { ...state, longitude: longitude };
        },
        SET_LOCATION: (state, { payload: location }) => {
            return { ...state, location: location };
        },
        SET_MARKER: (state, { payload: marker }) => {
            return { ...state, marker: marker };
        },
        SET_MARKERS: (state, { payload: markers }) => {
            return { ...state, markers: markers };
        },
        SET_PLACES: (state, { payload: places }) => {
            return { ...state, places: places };
        },
        SET_ORIGIN: (state, { payload: origin }) => {
            return { ...state, origin: origin };
        },
        SET_DESTINATION: (state, { payload: destination }) => {
            return { ...state, destination: destination };
        },
    }

});

export const { SET_TMAPV2, SET_MAP, SET_LATITUDE, SET_LONGITUDE, SET_LOCATION, SET_MARKER, SET_MARKERS, SET_PLACES, SET_ORIGIN, SET_DESTINATION } = tmapReducer.actions;
export default tmapReducer.reducer;
