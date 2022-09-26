import axios from 'axios';

const HOST = 'http://j7b209.p.ssafy.io:80/api/';

const AUTH = 'login/';
const MYPAGE = 'mypage/';
const ROUTE = 'route/';
const CONTACT = 'contact/';

const API = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true
});

export default API;
