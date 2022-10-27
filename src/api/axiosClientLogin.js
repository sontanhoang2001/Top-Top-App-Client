import axios from 'axios';
// Set up default config for http requests here

const axiosClientLogin = axios.create({
  baseURL: 'http://localhost:8081/api/v1/',
});

axiosClientLogin.interceptors.request.use(async (config) => {
  return config;
});

export default axiosClientLogin;
