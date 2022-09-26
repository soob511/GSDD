const HOST = 'https://j7b209.p.ssafy.io:80/api/';

const AUTH = 'auth/';
const USER = 'user/';
const MARKERS = 'markers/';

const apiPath = {
    auth: {
        login: () => HOST + AUTH + 'login/',
        logout: () => HOST + AUTH + 'logout/',
    },
    user: {
        join: () => HOST + USER,
        delete: () => HOST + USER,
        get: (phone) => HOST + USER + `${phone}/`,
        update: (phone) => HOST + USER + `${phone}/`,
    },
    markers: {
        get: (lat, lng) => HOST + MARKERS + `${lat}/` + `${lng}/`,
    },
};

export default apiPath;