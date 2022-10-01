import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const SERVER_ADDRESS = '/api';

const accessToken = localStorage.getItem('accessToken');

export const authAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken') || '',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },

});

// authAxios.defaults.withCredentials = true;

export const defaultAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});

// jwt 디코딩하는 함수
export const parseJwt = (token) => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

// 토큰 있는지 체크
// export const checkToken = async (config: AxiosRequestConfig) => {
//   if (!accessToken) {
//     alert('토큰이 만료되었습니다. 다시 로그인 해주세요');
//     // eslint-disable-next-line no-restricted-globals
//     location.href = '/login';
//   } else {
//     return config;
//   }
// };

// DefaultAxios.interceptors.request.use(checkToken);
