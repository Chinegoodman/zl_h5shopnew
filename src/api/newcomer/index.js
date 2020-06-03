/**
 * 页面接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const newcomer = {
    // 获取新人专区列表
    getlistGiftGoods(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/listGiftGoods`, qs.stringify(params));
    },
    // 获取店铺信息
    getComerStoreInfo(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/getGiftGoodsSkuDetail`, qs.stringify(params));
    },
    // // 获取最新间列表2
    // getNewRoomList2(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/getLiveRoomList`, qs.stringify(params));
    // }
    // // 庞世锋
    // // 关注用户接口 主播
    // attentionadd(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/attention/user/add`, qs.stringify(params));
    // },
    // // 取消关注用户接口 主播
    // attentiondelete(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/attention/user/delete`, qs.stringify(params));
    // },

    // // 间商品列表
    // goodsList(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/goods/living/goodsList`, qs.stringify(params));
    // },
    // // 间根据skuId获取购物商品
    // getGoodsSkuTemplateById(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/goods/getGoodsSkuTemplateById`, qs.stringify(params));
    // },

    // // 获得间用户信息
    // getLiveInfo(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/getLiveInfo`, qs.stringify(params));
    // },
    // // 加入或者离开间
    // joinOrLeaveRoom(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/joinOrLeaveRoom`, qs.stringify(params));
    // },
    // // 间 踢人
    // KickoutGroup(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/sendKickoutGroupMsg`, qs.stringify(params));
    // },
}

export default newcomer;