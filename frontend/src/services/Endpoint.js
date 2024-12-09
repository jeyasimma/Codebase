import axios from 'axios';

// export const BaseUrl = 'http://localhost:5000'; // Ensure this is correct
export const BaseUrl = 'https://codebaseserver.vercel.app'; // Ensure this is correct
// export const BaseUrl = 'https://codebaseserver-git-rohit-abhilash-kumars-projects-289775f5.vercel.app'; // Ensure this is correct
const instance = axios.create({
    baseURL: BaseUrl,
    withCredentials: true, // Include credentials for cross-origin requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper methods
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const delet = (url) => instance.delete(url);
export const patch = (url, data) => instance.patch(url, data);

// Request interceptor
instance.interceptors.request.use(function (config) {
    if (process.env.NODE_ENV === 'development') {
        console.log('Request Config:', config);
    }
    return config;
}, function (error) {
    console.error('Request Error:', error);
    return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(function (response) {
    if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', response);
    }
    return response;
}, function (error) {
    console.error('API Error:', error.message);
    return Promise.reject(error);
});
