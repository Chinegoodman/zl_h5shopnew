import axios from 'axios';
import router from '../../src/router';
import store from '../../src/store/index';
import { Toast } from 'vant';
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    switch (status) {
        case 401:
            toLogin();
            break;
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        case 404:
            tip('请求的资源不存在');
            break;
        case 500:
            tip('服务器内部错误');
            break;
        default:
            console.log('状态码:' + status + '---' + (other != undefined ? other : ''));
            tip('状态码:' + status + '---' + (other != undefined ? other : ''));
    }
}
var instance = axios.create({ timeout: 1000 * 20 });
instance.defaults.withCredentials = false;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
instance.interceptors.request.use(
    config => {
        const token = store.state.user.token;
        // token && (config.headers.Authorization = token); //TODO: 临时不需要token校验 暂时注释
        config.headers.appType = 1; //TODO: 应用类型
        config.headers.marketChannel = ''; //TODO: 市场渠道号
        config.headers.version = ''; //TODO: 版本号
        config.headers.clientType = 4; //TODO: 临时不需要token校验 暂时注释
        return config;
    },
    error => Promise.error(error))
instance.interceptors.response.use(
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    error => {
        const { response } = error;
        if (response) {
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            if (!window.navigator.onLine) {
                store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    });
export default instance;