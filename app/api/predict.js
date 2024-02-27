import apiClient from "./client";

const endpoint='predict';
const predictGet = () => apiClient.get('/');
const predict = (userInfo) => apiClient.post(endpoint, userInfo);
export default{
    predict,
    predictGet
}