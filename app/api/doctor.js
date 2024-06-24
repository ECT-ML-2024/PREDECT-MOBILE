import apiClient from "./client";

const endpoint='doctor';

const doctors =() => apiClient.get(endpoint);
const doctor =(data) => apiClient.post(endpoint,data);
const AddDoctor =(data) => apiClient.post(endpoint+'/add',data);
export default {
    doctors,
    doctor,
    AddDoctor
}