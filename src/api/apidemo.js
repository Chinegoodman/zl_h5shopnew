/**
 * apidemo模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例
import axios_json from "@/request/http_postform.js"; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const apidemo = {
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








}

export default apidemo;