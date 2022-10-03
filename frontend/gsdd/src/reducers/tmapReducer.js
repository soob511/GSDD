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
        oplaces: [],
        dplaces: [],
        origin: null,
        destination: null,
        omarker: null,
        dmarker: null,
        lines: null,
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
        SET_OPLACES: (state, { payload: oplaces }) => {
            return { ...state, oplaces: oplaces };
        },
        SET_DPLACES: (state, { payload: dplaces }) => {
            return { ...state, dplaces: dplaces };
        },
        SET_ORIGIN: (state, { payload: origin }) => {
            return { ...state, origin: origin };
        },
        SET_DESTINATION: (state, { payload: destination }) => {
            return { ...state, destination: destination };
        },
        SET_OMARKER: (state, { payload: omarker }) => {
            return { ...state, omarker: omarker };
        },
        SET_DMARKER: (state, { payload: dmarker }) => {
            return { ...state, dmarker: dmarker };
        },
        SET_LINES: (state, { payload: lines }) => {
            return { ...state, lines: lines };
        },
    }

});

export const { SET_TMAPV2, SET_MAP, SET_LATITUDE, SET_LONGITUDE, SET_LOCATION, SET_MARKER, SET_MARKERS, SET_OPLACES, SET_DPLACES, SET_ORIGIN, SET_DESTINATION, SET_OMARKER, SET_DMARKER, SET_LINES } = tmapReducer.actions;
export default tmapReducer.reducer;
