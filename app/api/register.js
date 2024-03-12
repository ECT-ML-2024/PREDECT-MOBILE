import apiClient from "./client";

const endpoint='register';

const register = (userInfo) => apiClient.post(endpoint, userInfo);
const updateUserProfile = (userInfo) => apiClient.post(endpoint+'/edit',userInfo);

export default{
    register,
    updateUserProfile
}