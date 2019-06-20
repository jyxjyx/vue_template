import axios from 'axios';

import domain from './domain';
import Vue from 'vue';
import { Loading, Message } from 'element-ui';
import AdminOperate from '../utils/admin';
import router from '../route';

Vue.prototype.$loading = Loading;
const vm = new Vue();

const httpModule = Object.assign(
    {}
);

const server = axios.create({
    baseURL: domain,
    timeout: 20000
});

let loadingInstance = null;

// 需要由客户端抛出的错误类型
const errorCode = [401];

// 添加一个请求拦截器
server.interceptors.request.use(config => {
    // Do something before request is sent
    // config.data = qs.stringify(config.data);
    config.headers = {
        'Content-Type': 'application/json'
    };
    // 开始加载
    loadingInstance = vm.$loading.service({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
    });
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器
server.interceptors.response.use(response => {
    // Do something with response data
    // 关闭加载
    loadingInstance.close();

    return response.data.content;
}, function (error) {
    // Do something with response error
    // 关闭加载
    loadingInstance.close();

    const res = error.response.data;

    // 默认抛出的错误提醒
    if(!errorCode.includes(res.code)) {
        Message.error(`操作失败, 错误代码：${ res.code }, ${ res.msg }`);
    }
    // token失效，重定向至登录页面
    else if(res.code === 401) {
        Message.error(`登录失效，请重新登录`);
        router.push({
            path: '/',
            query: {
                redirect: router.app.$route.fullPath
            }
        });
    };
    return Promise.reject(error.response.data);
});

const httpProxy = new Proxy({}, {
    get: (target, property) => {
        return (params = {}) => {
            let url = httpModule[property].url;
            const adminInfo = AdminOperate.getAdminInfo();
            if(adminInfo && adminInfo.token) {
                url += `?token=${ adminInfo.token }`;
            }
            return server({
                method: httpModule[property].method,
                url,
                data: params
            });
        }
    }
});

export default httpProxy; 