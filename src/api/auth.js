import axiosClientLogin from './axiosClientLogin'

const pathname = 'login';

const Auth = {
  login: (data) => {
    const url = pathname;
    return axiosClientLogin.post(url, data)
  },
  loginSocial: (data) => {
    const url = pathname;
    return axiosClientLogin.post(url, data)
  }
};

export default Auth;

