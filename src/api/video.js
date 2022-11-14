import axiosClient from './axiosClient'

const pathname = 'video';

const video = {
  createVideo: (data) => {
    const url = `${pathname}/interactive`;
    return axiosClient.post(url, data);
  },
  loadVideoNewsFeed: (pageNo, pageSize) => {
    const url = `${pathname}/watch?pageNo=${pageNo}&pageSize=${pageSize}`;
    return axiosClient.get(url);
  },
  likeVideo: (data) => {
    const url = `${pathname}/heart`;
    return axiosClient.put(url, data);
  }
};

export default video;