import axios from 'axios';
import testHttp from './test.http';
import qs from 'querystring';
import { BASE_URL } from './BASE_URL'

const httpModule = Object.assign(
    {},
    testHttp
);

const server = axios.create({
    baseURL: BASE_URL,
    timeout: 20000
});

// 添加一个请求拦截器
server.interceptors.request.use(config => {
    // Do something before request is sent
    console.log(config.data);
    config.data = qs.stringify(config.data);
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器
server.interceptors.response.use(response => {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

const httpProxy = new Proxy({}, {
    get: (target, property) => {
        return (params = {}) => {
            server({
                method: httpModule[property].method,
                url: httpModule[property].url,
                data: params
            });
        }
    }
});

export default httpProxy; 