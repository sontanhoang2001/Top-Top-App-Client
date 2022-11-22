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
  findVideoById: (videoId) => {
    const url = `${pathname}/watch/${videoId}`;
    return axiosClient.get(url);
  },
  likeVideo: (data) => {
    const url = `${pathname}/heart`;
    return axiosClient.put(url, data);
  },
  findHashTag: (params) => {
    const url = `hashtag?name=${params}`;
    return axiosClient.get(url);
  },
  isYouHeartThisVideo: (videoId, userId) => {
    const url = `${pathname}/heart/${videoId}/user/${userId}`;
    return axiosClient.get(url);
  },
  buffViewVideo: (videoId) => {
    const url = `${pathname}/watch/${videoId}`;
    return axiosClient.put(url);
  },
  folllow: (data) => {
    const url = '/friendship';
    return axiosClient.post(url, data);
  },
};

export default video;