import axios from 'axios';
// Set up default config for http requests here

const axiosClientLogin = axios.create({
  baseURL: 'http://localhost:8081/api/v1/',
});

axiosClientLogin.interceptors.request.use(async (config) => {
  config.headers = {
    'Accept': 'application/json',
  }
  return config;
});

axiosClientLogin.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);

export default axiosClientLogin;
