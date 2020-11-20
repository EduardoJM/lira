import axios from 'axios';
import server from './server.json';

const api = axios.create({
    baseURL: server.url,
});

export default api;
