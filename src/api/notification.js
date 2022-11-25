import axiosClient from './axiosClient'
const pathname = 'notification';

const notification = {
    getNotification: (userId) => {
        const resoureUrl = `http://localhost:8081/api/v1/notification/${userId}`;
        const evtSource = new EventSource(resoureUrl);
        return evtSource;
    },
    getNotificationByUserId: (userId, pageNo, pageSize) => {
        const url = `${pathname}/user/${userId}?pageNo=${pageNo}&pageSize=${pageSize}&read=true`;
        return axiosClient.get(url);
    },
    getNotificationByUserIdAndUnread: (userId, pageNo, pageSize) => {
        const url = `${pathname}/user/${userId}?pageNo=${pageNo}&pageSize=${pageSize}&read=false`;
        return axiosClient.get(url);
    },
}

export default notification;