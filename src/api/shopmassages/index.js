/**
 * productdetails模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from './../../../node_modules/zlapi/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const shopmassages = {
    // 获取店铺下商品列表
    getStoreGoodsList(params) {
        return axios.post(`${base.yxf}/wapi/v1/shop/getStoreGoodsList`, qs.stringify(params));
    },
    // 获取该店铺下关注列表
    getStoreGoodsAttention(params) {
        return axios.post(`${base.yxf}/wapi/v1/shop/getStoreGoodsAttention`, qs.stringify(params));
    },
    // 查询该店铺下小视频列表
    getStoreGoodsVideo(params) {
        return axios.post(`${base.yxf}/wapi/v1/shop/getStoreGoodsVideo`, qs.stringify(params));
    },
}

export default shopmassages;