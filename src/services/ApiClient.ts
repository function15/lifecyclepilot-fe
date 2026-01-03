import axios from 'axios';
import { getApiBaseUrl } from '@/services/ComponentUtils'

// Create an Axios instance
const apiClient = axios.create({
    baseURL: getApiBaseUrl(), // Set base URL
    timeout: 30000, // Set request timeout
});

// Request interceptor
apiClient.interceptors.request.use(config => {
    // Add Authorization header before the request is sent
    const token = localStorage.getItem('authToken'); // Get the token from local storage or another source
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    // Handle request error
    return Promise.reject(error);
});

// Response interceptor
apiClient.interceptors.response.use(response => {
    // Handle the response if needed
    return response;
}, error => {
    // Handle unauthorized error globally (401)
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
});

export default apiClient;


