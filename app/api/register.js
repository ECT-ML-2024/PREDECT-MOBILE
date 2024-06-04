import apiClient from "./client";

const endpoint='register';

const register = (userInfo) => apiClient.post(endpoint, userInfo);
const updateUserProfile = (userInfo) => apiClient.post(endpoint+'/edit',userInfo);
// const sendCode = (email) => apiClient.post(endpoint+'/forget',email);
const verifyCode = (email) => apiClient.post(endpoint+'/verify_code',email);
const changePassword = (data) => apiClient.post(endpoint+'/password',data);

export default{
    register,
    updateUserProfile,
    verifyCode,
    changePassword
}