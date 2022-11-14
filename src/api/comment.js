import axiosClient from './axiosClient'

const pathname = 'comment';

const comment = {
  creatComment: (data) => {
    const url = `${pathname}`;
    return axiosClient.post(url, data);
  },
  getCommentParent: (videoId, pageNo, pageSize) => {
    const url = `${pathname}/video/${videoId}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=createdDate&sortDir=desc`;
    return axiosClient.get(url);
  },
  getChildrenComment: (childrend, pageNo, pageSize) => {
    const url = `${pathname}/childrend/${childrend}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=createdDate&sortDir=desc`;
    return axiosClient.get(url);
  }
};

export default comment;