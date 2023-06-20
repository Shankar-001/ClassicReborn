import axios from 'axios';
export const axiosInstance = axios.create({
    headers : {

    }
})

// making axiosInstance as the global object otherwise i have to use headers foe every endpoint call