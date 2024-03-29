import base from '../base'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const login = {
    // // 取消订单
    // getcancleorder(orderId, source, operator) {
    //     return axios.get(`${base.yxf}/wapi//v1/order/cancleorder?orderId=${orderId}&source=${source}&operator=${operator}`); //音乐列表
    // },
    // // 根据id获取地址
    // postaddressid(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/address/addressid`, qs.stringify(params));
    // },

    // 获取验证码
    captcha(params) {
        return axios.get(`${base.yxf2}/v1/user/verification/code?mobile=${params.mobile}&type=${params.type}&token=${params.token}`);
    },
    // 登录接口 老版本的登录接口
    login_old(params) {
        return axios.post(`${base.yxf}/wapi/v1/user/login`, qs.stringify(params));
    },
    // 登录接口 新版本的登录接口
    login(params) {
        return axios.post(`${base.yxf2}/v1/user/login`, qs.stringify(params));
    },
    // 新用户设置密码接口
    userSetPassword(params) {
        return axios.post(`${base.yxf2}/v1/user/set/password`, qs.stringify(params));
    },
    //绑定手机号验证验证码-验证验证码
    verifycaptcha_new(params) {
        return axios.post(`${base.yxf2}/v1/user/verify/mobile`, qs.stringify(params));
    },
    //修改密码提交
    savepassword_new(params) {
        return axios.put(`${base.yxf2}/v1/user/modify/password`, qs.stringify(params));
    },
    //修改手机号提交
    savephone_new(params) {
        return axios.put(`${base.yxf2}/v1/user/alteration/mobile`, qs.stringify(params));
    },
    //重置密码提交
    userResetAccount(params) {
        return axios.put(`${base.yxf2}/v1/user/reset/account`, qs.stringify(params));
    },
}

export default login;