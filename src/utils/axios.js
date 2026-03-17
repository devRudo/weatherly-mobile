import axios from 'axios';
import Config from 'react-native-config';

let baseURL = '';
baseURL = Config.API_URL;

console.log('=============================');
console.log('AXIOS CONFIG API_URL: ', Config.API_URL);
console.log('AXIOS BASE URL: ', baseURL);
console.log('=============================');

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(request => {
  console.log('Starting Request:', request.method, request.baseURL, request.url, request.params);
  return request;
})

instance.interceptors.response.use(response => {
  console.log('Response:', response.status);
  return response;
}, error => {
  console.log('Response Error:', error?.message, error?.code, error?.config?.url);
  return Promise.reject(error);
})

export default instance;
