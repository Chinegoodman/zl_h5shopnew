/**
 * 直播页面接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const living = {
    // 获取最新直播间列表
    getNewRoomList(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getNewRoomList`, qs.stringify(params));
    },
    // 获取最新直播间列表2
    getNewRoomList2(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getLiveRoomList`, qs.stringify(params));
    },

    // 庞世锋
    // 关注用户接口 主播
    attentionadd(params) {
        return axios.post(`${base.yxf}/wapi/v1/attention/user/add`, qs.stringify(params));
    },
    // 取消关注用户接口 主播
    attentiondelete(params) {
        return axios.post(`${base.yxf}/wapi/v1/attention/user/delete`, qs.stringify(params));
    },

    // 直播间商品列表
    goodsList(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/living/goodsList`, qs.stringify(params));
    },
    // 直播间根据skuId获取购物商品
    getGoodsSkuTemplateById(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/getGoodsSkuTemplateById`, qs.stringify(params));
    },

    // 获得直播间用户信息
    getLiveInfo(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getLiveInfo`, qs.stringify(params));
    },
    // 加入或者离开直播间
    joinOrLeaveRoom(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/joinOrLeaveRoom`, qs.stringify(params));
    },
    // 直播间 踢人
    KickoutGroup(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/sendKickoutGroupMsg`, qs.stringify(params));
    },
    // 直播间个人中心视频列表
    getLivingpersonalvideo(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getNewRoomList`, qs.stringify(params));
    },
    // 直播间个人中心粉丝列表
    getLivingpersonalifenslist(params) {
        return axios.post(`${base.yxf}/wapi/v1/shop/getStoreGoodsAttention`, qs.stringify(params));
    },
    // 直播间点赞数与人数回显
    getLivingUserAndPraise(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getUserAndPraise`, qs.stringify(params));
    },
    // 直播间点赞提交接口
    getLivingPraisePoint(params) {
        return axios.post(`${base.yxf}/wapi/v1/shop/praisePoint`, qs.stringify(params));
    }

}

export default living;