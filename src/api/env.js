const pathname_localhost = 'api/v1';
const pathname_tomcat = 'toptop-1.0/api/v1';
const pathname_socket = 'toptop-1.0';

const APP_PATH_LOCALHOST = `http://localhost:8081/${pathname_localhost}`;
const APP_PATH_TOMCAT = `http://192.168.1.12:8088/${pathname_tomcat}`;

const APP_PATH_LOCALHOST_SOCKET = `http://localhost:8081/ws`;
const APP_PATH_TOMCAT_SOCKET = `http://192.168.1.12:8088/${pathname_socket}/ws`;

const Env = {
    APP_PATH_API: APP_PATH_LOCALHOST,
    APP_PATH_SOCKET: APP_PATH_LOCALHOST_SOCKET,
};

export default Env;

