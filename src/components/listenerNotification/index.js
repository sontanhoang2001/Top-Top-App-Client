import { useEffect, useState } from 'react';
import urlAudioNotification from '~/assets/audio/iphone_notification_ringtone_iphone_sms_ringtones.mp3';

// api notification
import notification from '~/api/notification';

// Auth provider
import { UserAuth } from '~/context/AuthContext'

function ListenerNotification() {
    const { user } = UserAuth();
    const [audioNotification] = useState(new Audio(urlAudioNotification));
    // Lắng nghe thông báo
    useEffect(() => {
        if (user) {
            try {
                notification.getNotification(user.id).addEventListener("user-list-event", (event) => {
                    const data = JSON.parse(event.data);

                    if (data.length > 0) {
                        audioNotification.play();
                    }

                    // else {
                    //     // console.log("thông báo nè: ", data);
                    //     // console.log("Chưa có thông báo...");
                    // }
                })
            } catch (error) {
            }
        }
    }, [user])
}

export default ListenerNotification;