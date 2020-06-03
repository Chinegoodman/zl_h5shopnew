/**
 * productdetails模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const productdetails = {
    // //测试用
    // // 自己跟人站 网站列表    
    // getwebList() {
    //     return axios.get(`${base.ooo0o}/blog/public/index.php/webList`); //网站列表
    // },
    // //测试用
    // // 自己跟人站 音乐列表    
    // getmusicList() {
    //     return axios.get(`${base.ooo0o}/blog/public/index.php/musicList`); //音乐列表
    // },

    /**
     * 
     * @param {商城首页接口} params 
     */


    /**
     * 
     * @param {详情页接口} params 
     */
    // 详情页接口
    // 商品基础信息接口    
    baseInfo(params) {
        return axios.post(`${base.yxf}/wapi/v1/detailPage/baseInfo`, qs.stringify(params));
    },
    // 获得sku商品默认规格组信息
    defaultSpecGroup(params) {
        return axios.post(`${base.yxf}/wapi/v1/detailPage/defaultSpecGroup`, qs.stringify(params));
    },
    // 动态匹配可选规格组信息
    dynamicSpecGroup(params) {
        return axios.post(`${base.yxf}/wapi/v1/detailPage/dynamicSpecGroup`, qs.stringify(params));
    },
    // 获取店铺信息
    getStoreInfo(params) {
        return axios.post(`${base.yxf}/wapi/v1/shop/getStoreInfo`, qs.stringify(params));
    },
    // 加入购物车
    additem(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/additem`, qs.stringify(params));
    },
    // 间 加入购物车
    additem4Live(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/additem4Live`, qs.stringify(params));
    },

    // 取消关注商品
    goodsdelete(params) {
        return axios.post(`${base.yxf}/wapi/v1/attention/goods/delete`, qs.stringify(params));
    },
    // 关注商品
    goodsadd(params) {
        return axios.post(`${base.yxf}/wapi/v1/attention/goods/add`, qs.stringify(params));
    },
    // 取消关注店铺
    storedelete(params) {
        return axios.post(`${base.yxf}/wapi/v1/attention/store/delete`, qs.stringify(params));
    },
    // 关注店铺
    storeadd(params) {
        return axios.post(`${base.yxf}/wapi/v1/attention/store/add`, qs.stringify(params));
    },

    // 获取店铺信息
    getShopType(params) {
        return axios.post(`${base.yxf}/wapi//v1/shop/getShopType`, qs.stringify(params));
    },

}

export default productdetails;