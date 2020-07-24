/**
 * productdetails模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const productsearch = {
    getshelves(params) {
        return axios.post(`${base.yxf}/wapi/v1/category/goods/shelves`, qs.stringify(params));
    },
    getsearch(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/search`, qs.stringify(params));
    },
    getbanner(params) {
        return axios.post(`${base.yxf}/wapi/v1/advert/banners`, qs.stringify(params));
    },
    // 新搜索接口
    searchByKeyWord(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/searchByKeyWord`, qs.stringify(params));
    },
}

export default productsearch;