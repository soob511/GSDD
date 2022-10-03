const HOST = 'https://j7b209.p.ssafy.io:8080/api/';

const AUTH = 'auth/';
const USER = 'user/';
const MYPAGE = 'mypage/';
const ROUTE = 'route/';
const CONTACT = 'contact';

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
    post: () => HOST + MYPAGE + CONTACT,
    del: (contactId) => HOST + MYPAGE + CONTACT + `/${contactId}`,
  },
};

export default apiPath;
