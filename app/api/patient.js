import apiClient from "./client";

const patients =() => apiClient.get('patient/all');
const patient =(doctorId,patientId) => apiClient.get('patient/'+patientId);
const addPatient =(data) => apiClient.post('patient',data);

export default {
    patients,
    patient,
    addPatient
}