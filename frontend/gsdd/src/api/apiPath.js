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

const apiPath = {
  auth: {
    login: () => HOST + AUTH + 'login/',
    logout: () => HOST + AUTH + 'logout/',
  },
  markers: {
    get: (lat, lng) => HOST + AROUND + `${lat}/${lng}`,
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
  message: {
    post: () => HOST + MESSAGE,
  },
};

export default apiPath;
