const HOST = 'http://j7b209.p.ssafy.io:8080/api/';

const AUTH = 'auth/';
const USER = 'user/';
const MYPAGE = 'mypage/';
const ROUTE = 'route/';
const CONTACT = 'contact/';
const INFO = 'info/';

const apiPath = {
  auth: {
    login: () => HOST + AUTH + 'login/',
    logout: () => HOST + AUTH + 'logout/',
  },
  markers: {
    get: (lat, lng) => HOST + `${lat}/${lng}`,
  },
  mypage: {
    get: (userId) => HOST + MYPAGE + `${userId}`,
  },
  info: {
    get: (city, district) => HOST + INFO + `${city}/` + `${district}`,
  },
};

export default apiPath;
