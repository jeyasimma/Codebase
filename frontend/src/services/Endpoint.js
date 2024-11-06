import axios from 'axios';
export const BaseUrl = 'http://localhost:5000'
const instance = axios.create({
    baseURL: BaseUrl,
    // headers: {
    //     'Content-Type': 'application/json' // Removed extra space
    // },
    withCredentials: true
});

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const delet = (url) => instance.delete(url);
export const patch = (url, data) => instance.patch(url, data)

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Log the request config for debugging
    // console.log('Request Config2:', config);
    console.log('HI');
    return config;
}, function (error) {
    // Do something with request error
    console.error('Request Error:', error);
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Log the response data for debugging
    console.log('Apis Response', response);
    return response;
}, function (error) {
    // Log the error message for debugging
    // console.log(error);
    console.log('Api2 Error', error.message);
    return Promise.reject(error);
});
