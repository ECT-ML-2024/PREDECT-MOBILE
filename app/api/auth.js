import apiClient from "./client";

const login =(code,password) => apiClient.post('login',{code,password});

export default {
    login
}