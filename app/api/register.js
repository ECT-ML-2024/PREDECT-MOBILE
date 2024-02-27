import apiClient from "./client";

const endpoint='register'
const cendpoint='/register/changecredentials'
// const getUser = ()=> apiClient.get(endpoint);
const register = (userInfo) => apiClient.post(endpoint, userInfo);
const changeCredentials = (userInfo) => apiClient.post(cendpoint, userInfo);

const updateUserProfile = (userInfo,onUploadProgress) => apiClient.post(endpoint+'/updateprofile',userInfo,{
    onUploadProgress: (progress)=> onUploadProgress(progress.loaded/progress.total)
});
export default{
    changeCredentials,
    register,
    updateUserProfile
}