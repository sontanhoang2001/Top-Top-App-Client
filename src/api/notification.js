import axiosClient from './axiosClient'
import Env from './env';

const pathname = 'notification';

const notification = {
    getNotification: (userId) => {
        const resoureUrl = `${Env.APP_PATH_API}/notification/${userId}`;
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
    isRead: (id) => {
        const url = `${pathname}/${id}`;
        return axiosClient.put(url);
    },
}

export default notification;