import {create} from 'apisauce';
import CryptoJS from 'crypto-js';
// import cache from '../utility/cache';
import settings from '../config/settings';
import { jwtDecode } from 'jwt-decode';

const apiClient = create({
    baseURL:settings.apiUrl,
     headers: {
        'Content-Type': 'application/json'
    }
});

const get = apiClient.get;
apiClient.get =async (url,params,axiosConfig)=>{
    const response= await get(url,params,axiosConfig);

    // // Decrypt response data
    const key = CryptoJS.enc.Utf8.parse('8c5424a7-971b-4eb5-a73b-6162d120d00c').toString();
    try {
        var bytes  = CryptoJS.AES.decrypt(response.data,'key');
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedData = JSON.parse(decryptedString);
        response.data=decryptedData;
    } catch (error) {
        console.error('Error parsing decrypted data:', error);
    }
    console.log(1)

    return response
}
const post = apiClient.post;
apiClient.post =async (url,params,axiosConfig)=>{
    const response= await post(url,params,axiosConfig);

    // // Decrypt response data
    const key = CryptoJS.enc.Utf8.parse('8c5424a7-971b-4eb5-a73b-6162d120d00c').toString();
    try {
        var bytes  = CryptoJS.AES.decrypt(response.data,'key');
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedData = JSON.parse(decryptedString);

        response.data=decryptedData;
    } catch (error) {
        console.error('Error parsing decrypted data:', error);
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');    
    return response
}

export default apiClient;