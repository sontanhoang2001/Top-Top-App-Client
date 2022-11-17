import axiosClient from './axiosClient'

const pathname = 'profile';

const profile = {
  getProfile: (email) => {
    const url = `${pathname}/${email}`;
    return axiosClient.get(url)
  },
  getProfileByAlias: (alias) => {
    const url = `${pathname}/alias/${alias}`;
    return axiosClient.get(url)
  },
  findByAlias: (alias) => {
    const url = `account/alias?target=${alias}`;
    return axiosClient.get(url)
  },
  updateProfile: (data) => {
    const url = `${pathname}/`;
    return axiosClient.put(url, data)
  }
};

export default profile;

