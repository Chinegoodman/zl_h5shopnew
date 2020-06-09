/**
 * productdetails模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from './../../../node_modules/zlapi/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const videodetails = {
    // 小视频列表
    getvideolist(params) {
        return axios.post(`${base.yxf}/wapi/v1/video/getVideoList`, qs.stringify(params));
    },
}

export default videodetails;