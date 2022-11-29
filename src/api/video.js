import axiosClient from './axiosClient'
import axiosClientLogin from './axiosClientLogin'

const pathname = 'video';

const video = {
  createVideo: (data) => {
    const url = `${pathname}/interactive`;
    return axiosClient.post(url, data);
  },
  loadVideoNewsFeed: (pageNo, pageSize) => {
    const url = `${pathname}/watch?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc`;
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
  searchVideo: (pageNo, pageSize, keyword) => {
    const url = `${pathname}/watch?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`;
    return axiosClientLogin.get(url);
  },
  findPublicVideoProfile: (userId, pageNo, pageSize) => {
    const url = `${pathname}/watch/user/${userId}?pageNo=${pageNo}&pageSize=${pageSize}&professed=true`;
    return axiosClient.get(url);
  },
  findPrivateVideoProfile: (userId, pageNo, pageSize) => {
    const url = `${pathname}/watch/user/${userId}?pageNo=${pageNo}&pageSize=${pageSize}&professed=false`;
    return axiosClient.get(url);
  },
  findFavouriteVideo: (userId, pageNo, pageSize) => {
    const url = `${pathname}/favourite?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return axiosClient.get(url);
  },
  updateVideo: (videoId, data) => {
    const url = `${pathname}/${videoId}`;
    return axiosClient.put(url, data);
  },
  deleteVideo: (videoId) => {
    const url = `${pathname}/${videoId}`;
    return axiosClient.delete(url);
  },
  loadReportVideoType: () => {
    const url = `/reportType`;
    return axiosClient.get(url);
  },
  createReportVideo: (data) => {
    const url = `/report`;
    return axiosClient.post(url, data);
  },
  buffShareVideo: (videoId) => {
    const url = `${pathname}/share/${videoId}`;
    return axiosClient.put(url);
  },
};

export default video;