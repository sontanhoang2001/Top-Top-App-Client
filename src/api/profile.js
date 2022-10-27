import axiosClient from './axiosClient'

const pathname = 'profile';

const profile = {
  getProfile: (email) => {
    const url = `${pathname}/${email}`;
    return axiosClient.get(url)
  }
};

export default profile;

