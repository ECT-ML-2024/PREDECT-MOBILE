import apiClient from "./client";

const login =(email,password) => apiClient.post('login',{email,password});

export default {
    login
}