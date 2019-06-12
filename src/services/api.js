import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
/*     headers: {
        'Access-Control-Allow-Origin':'*',
        'crossDomain': true,
    } */
});

export default api;