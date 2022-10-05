const HOST = 'https://j7b209.p.ssafy.io:8080/api/';

const AUTH = 'auth/';
const MYPAGE = 'mypage/';
const ROUTE = 'route/';
const ROAD = 'road/';
const INFO = 'info/';
const NEWS = 'news/';
const CONTACT = 'contact';
const AROUND = 'around/';
const MESSAGE = 'message';
const NEAR = 'near/';
const BOUND = 'bound/';

const apiPath = {
  auth: {
    login: () => HOST + AUTH + 'login/',
    logout: () => HOST + AUTH + 'logout/',
  },
  markers: {
    get: (lat, lon) => HOST + AROUND + `${lat}/${lon}`,
    around: (lat, lon, dist) => HOST + AROUND + `${lat}/${lon}/${dist}`,
    near: (olat, olon, dlat, dlon, dist) => HOST + AROUND + NEAR + `${olat}/${olon}/${dlat}/${dlon}/${dist}`,
  },
  mypage: {
    get: (userId) => HOST + MYPAGE + `${userId}`,
    post: () => HOST + MYPAGE + CONTACT,
    del: (contactId) => HOST + MYPAGE + CONTACT + `/${contactId}`,
    routePost: () => HOST + MYPAGE + ROUTE,
    routeDel: (routeId) => HOST + MYPAGE + ROUTE + `/${routeId}`,
  },
  info: {
    get: (city, district) => HOST + INFO + `${city}` + `/${district}`,
  },
  news: {
    get: (city, district) => HOST + NEWS + `${city}` + `/${district}`,
  },
  road: {
    get: (olat, olng, dlat, dlng) => HOST + ROAD + `${olat}/${olng}/${dlat}/${dlng}`,
  },
  near: {
    post: (olat, olon, dlat, dlon) => HOST + NEAR + `${olat}/${olon}/${dlat}/${dlon}`,
  },
  bound: {
    get: (olat, olon, dlat, dlon) => HOST + BOUND + `${olat}/${olon}/${dlat}/${dlon}`,
  },
  message: {
    post: () => HOST + MESSAGE,
  },
};

export default apiPath;
