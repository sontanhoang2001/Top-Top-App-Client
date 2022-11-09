import { useContext, createContext, useEffect, useState } from 'react';

import { over } from 'stompjs';
import SockJS from 'sockjs-client';

// auth provider
import { UserAuth } from '~/context/AuthContext';

const SocketContext = createContext();

var stompClient = null;

export const SocketContextProvider = ({ children }) => {
    const { user } = UserAuth();
    const [socket, setSocket] = useState(false);
    const [privateMessage, setPrivateMessage] = useState("");


    const connect = () => {
        let Sock = new SockJS('http://localhost:8081/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/user/' + user.id + '/private', onPrivateMessage);
    }

    const onError = (err) => {
        console.log(err);
    }

    // nhận tin nhắn receive messages
    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setPrivateMessage(payloadData);
    }

    useEffect(() => {
        user &&
            connect();
    }, [user])

    return (
        <SocketContext.Provider value={{ stompClient, privateMessage}}>{children}</SocketContext.Provider>
    );
};

export const Socket = () => {
    return useContext(SocketContext);
};
