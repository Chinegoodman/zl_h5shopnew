/**
 * productdetails模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from './../../../node_modules/zlapi/http.js'; // 导入http中创建的axios实例
import axios_json from "./../../../node_modules/zlapi/http_postform.js"; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const test = {
    // ========================↓↓↓↓↓↓↓demo参考接口格式↓↓↓↓↓↓↓↓↓↓======================================
    // 【get请求】
    //获取所有成员接口
    memberall(params) {
        return axios.get(`${base.yxf}/wapi/v1/shiro/user/select/tree`, { params });
    },
    // 【普通的post请求】
    // 登录接口    蒋海
    ulogin2(params) {
        return axios.post(`${base.yxf}/wapi/v1/pls/stable/login`, qs.stringify(params));
    },
    // 【json格式的post请求】
    // 客服消息更新
    complsug_complaintLogUpdate(params) {
        return axios_json.post(`${base.yxf}/wapi/v1/complaint/complaintLogUpdate`, params);
    },
    // ========================↓↓↓↓↓↓↓当前页面的接口↓↓↓↓↓↓↓↓↓↓======================================
    //用户等级权益
    userlevelquities(params) {
        return axios.get(`${base.yxf2}/v1/user/level/quities`, { params });
        // return axios.get(`${base.yxf}/v1/user/level/quities`, { params });
    },

}

export default test;