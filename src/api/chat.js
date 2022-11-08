import axiosClient from './axiosClient'

const pathname1 = 'friendship';
const pathname2 = 'message';

const chat = {
  getAllFriends: (userId) => {
    const url = `${pathname1}/${userId}`;
    return axiosClient.get(url)
  },
  getFriendMessage: (userId, friendId, pageNo, pageSize) => {
    const url = `${pathname2}?userId=${userId}&friendId=${friendId}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=createdDate&sortDir=desc`;
    return axiosClient.get(url)
  },
  sendMessage: (data) => {
    const url = pathname2;
    return axiosClient.post(url, data)
  }
};

export default chat;

