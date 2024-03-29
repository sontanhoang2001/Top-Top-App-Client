import axiosClientLogin from './axiosClientLogin'

const pathname = 'account';

const Account = {
    register: (data) => {
        const url = pathname;
        return axiosClientLogin.post(url, data)
    },
    loginOrRegisterSocial: (data) => {
        const url = `${pathname}/social`;
        return axiosClientLogin.post(url, data)
    },
    verifyOtp: (data) => {
        const url = `${pathname}/otp`;
        return axiosClientLogin.put(url, data)
    },
    checkEmail: (email, id) => {
        const url = `${pathname}/email/?target=${email}&id=${id}`;
        return axiosClientLogin.get(url)
    },
    forgotPassword: (email) => {
        const url = `${pathname}/forgotPassword/${email}`;
        return axiosClientLogin.get(url)
    },
    resetPassword: (data) => {
        const url = `${pathname}/password/reset`;
        return axiosClientLogin.put(url, data)
    },
    searchUser: (data) => {
        const url = `${pathname}/password/reset`;
        return axiosClientLogin.put(url, data)
    },
    searchUser: (keyword) => {
        const url = `${pathname}?pageSize=10&pageNo=1&sortBy=createdDate&sortDir=desc&keyword=${keyword}`;
        return axiosClientLogin.get(url)
    },
    isBothAreFriend: (requestId, acceptId) => {
        const url = `${pathname}/friend?requestId=${requestId}&acceptId=${acceptId}`;
        return axiosClientLogin.get(url)
    },
};

export default Account;

