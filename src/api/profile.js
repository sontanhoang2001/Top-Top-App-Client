import axiosClient from './axiosClient'

const pathname = 'management/profile';

const profile = {
  getProfile: (userId) => {
    const url = `${pathname}/${userId}`;
    return axiosClient.get(url)
  }
};

export default profile;

