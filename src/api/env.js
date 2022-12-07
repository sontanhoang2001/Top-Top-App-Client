const pathname_localhost = 'api/v1';
const pathname_tomcat = 'toptop-1.0/api/v1';
const pathname_socket = 'toptop-1.0';

const APP_PATH_LOCALHOST = `http://localhost:8080/${pathname_localhost}`;
const APP_PATH_TOMCAT = `http://localhost:8085/${pathname_tomcat}`;

const APP_PATH_LOCALHOST_SOCKET = `http://localhost:8080/ws`;
const APP_PATH_TOMCAT_SOCKET = `http://localhost:8085/${pathname_socket}/ws`;

const Env = {
    APP_PATH_API: APP_PATH_TOMCAT,
    APP_PATH_SOCKET: APP_PATH_TOMCAT_SOCKET,
};

export default Env;

