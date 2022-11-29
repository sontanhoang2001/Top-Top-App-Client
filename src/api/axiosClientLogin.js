import axios from 'axios';
import Env from './env';

// Set up default config for http requests here

const axiosClientLogin = axios.create({
  baseURL: Env.APP_PATH_API,
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
