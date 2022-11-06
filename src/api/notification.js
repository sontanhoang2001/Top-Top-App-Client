const notification = {
    getNotification: (userId) => {
        const resoureUrl = `http://localhost:8081/api/v1/notification/${userId}`;
        const evtSource = new EventSource(resoureUrl);
        return evtSource;
    }
}

export default notification;