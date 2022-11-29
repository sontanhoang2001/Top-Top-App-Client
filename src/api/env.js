const pathname = 'toptop-1.0/api/v1';
const pathname_socket = 'toptop-1.0';


const APP_PATH_LOCALHOST = `http://localhost:8080/${pathname}`;
const APP_PATH_TOMCAT = `http://172.168.40.131:8088/${pathname}`;

const APP_PATH_LOCALHOST_SOCKET = `http://localhost:8080/ws`;
const APP_PATH_TOMCAT_SOCKET = `http://172.168.40.131:8088/${pathname_socket}/ws`;

const Env = {
    APP_PATH_API: APP_PATH_TOMCAT,
    APP_PATH_SOCKET: APP_PATH_TOMCAT_SOCKET,
};

export default Env;

