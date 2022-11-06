import axiosClient from './axiosClient'

const pathname = 'video';

const video = {
  createVideo: (data) => {
    const url = `${pathname}/interactive`;
    return axiosClient.post(url, data);
  },
  loadVideoNewsFeed: (page) => {
    const url = `${pathname}/watch?pageNo=${page}`;
    return axiosClient.get(url);
  },
  likeVideo: (data) => {
    const url = `${pathname}/heart`;
    return axiosClient.put(url, data);
  }
};

export default video;