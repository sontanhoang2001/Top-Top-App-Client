import { useContext, createContext, useEffect, useState } from 'react';

import { over } from 'stompjs';
import SockJS from 'sockjs-client';

// auth provider
import { UserAuth } from '~/context/AuthContext';

const SocketContext = createContext();

var stompClient = false;

export const SocketContextProvider = ({ children }) => {
    const { user } = UserAuth();
    const [socket, setSocket] = useState(false);
    const [privateMessage, setPrivateMessage] = useState("");
    const [pendingMessage, setPendingMessage] = useState(false);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8081/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/user/' + user.id + '/private', onPrivateMessage);

        // đk khi click vào route /chat
        stompClient.subscribe('/user/' + user.id + '/pending', onPendingMessage);
    }

    const onError = (err) => {
        console.log(err);
    }

    // nhận tin nhắn receive messages
    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setPrivateMessage(payloadData);
    }

    // nhận tin nhắn trạng thái đang soạn tin nhắn
    const onPendingMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setPendingMessage(payloadData);
    }

    useEffect(() => {
        user &&
            connect();
    }, [])

    // useEffect(() => {
    //     // if (stompClient)
    //         console.log("Trang thai stompClient: ", stompClient)
    // })


    return (
        <SocketContext.Provider value={{ stompClient, privateMessage, pendingMessage }}>{children}</SocketContext.Provider>
    );
};

export const Socket = () => {
    return useContext(SocketContext);
};
