import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // or your deployed backend URL
});

// Add JWT to headers automatically
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('hospitalToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
