import apiClient from "./client";

const doctors =() => apiClient.get('doctor');
const doctor =(data) => apiClient.post('doctor',data);
export default {
    doctors,
    doctor
}