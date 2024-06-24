import apiClient from "./client";

const endpoint='predict';
const predictGet = () => apiClient.get('/');
const predict = (userInfo) => apiClient.post(endpoint, userInfo);
const updatePredict = (userInfo) => apiClient.post(endpoint+'/update', userInfo);
export default{
    predict,
    predictGet,
    updatePredict
}