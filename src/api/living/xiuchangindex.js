/**
 * 直播页面接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const xiuchangliving = {

    // 直播间礼物列表
    giftList(params) {
        return axios.get(`${base.yxf2}/v1/show/gift/list`, qs.stringify(params));
    },
    //当场榜列表
    topgiftList(params) {
        return axios.get(`${base.yxf2}/v1/show/gift/topListByLive?liveId=${params.liveId}&page=${params.page}&pageSize=${params.pageSize}`);
    },
    //获取直播间信息
    getXiuChangLiveInfo(params) {
        return axios.get(`${base.yxf2}/v1/show/live/getLiveInfo?liveId=${params.liveId}`);
    },
    //获取直播详情-粉丝/关注数
    basicUserInfo(params) {
        return axios.get(`${base.yxf2}/v1/user/basic/user/info?userId=${params.userId}`);
    },
    //直播间点赞数与人数回显
    XiuChangLivingUserAndPraise(params) {
        return axios.get(`${base.yxf2}/v1/show/live/getUserAndPraise?liveId=${params.liveId}`);
    },
    // 直播间点赞提交接口
    getXiuChuangLivingPraisePoint(params) {
        return axios.get(`${base.yxf2}/v1/show/live/praisePoint?liveId=${params.liveId}`);
    },
    // // 加入或者离开直播间
    joinXiuChangOrLeaveRoom(params) {
        return axios.post(`${base.yxf2}/v1/show/live/joinOrLeaveRoom`, qs.stringify(params));
    },
    // 直播间根据skuId获取购物商品
    getGoodsSkuTemplateById(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/getGoodsSkuTemplateById`, qs.stringify(params));
    },
    // 直播间根据skuId获取购物商品
    getGoodsSkuTemplateById(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/getGoodsSkuTemplateById`, qs.stringify(params));
    },
    //在线人数列表
    liveOnLines(params) {
        return axios.get(`${base.yxf2}/v1/show/live/getOnlines?liveId=${params.liveId}&page=${params.page}&pageSize=${params.pageSize}`);
    },
    //直播间点赞数与人数回显
    anchorMuteState(params) {
        return axios.get(`${base.yxf2}/v1/show/live/getLiveMute?liveId=${params.liveId}`);
    },
    //获取用户角色
    userRole(params) {
        return axios.get(`${base.yxf2}/v1/show/live/getUserIdentity?liveId=${params.liveId}&opUserId=${params.opUserId}&userId=${params.userId}`);
    },
    //获取两个用户之间的关系
    userRelationship(params) {
        return axios.get(`${base.yxf2}/v1/user/relation/user/Relationship?currentUserId=${params.currentUserId}&transferUserId=${params.transferUserId}`);
    },
    //用户关注取关
    relationOpration(params) {
        return axios.put(`${base.yxf2}/v1/user/relation/operation?currentUserId=${params.currentUserId}&transferUserId=${params.transferUserId}&relation=${params.relation}`);
    },
    // 直播间商品列表-秀场直播
    xiuChangLivingGoodsList(params) {
        return axios.get(`${base.yxf2}//v1/show/goods/list?liveId=${params.liveId}&userId=${params.userId}&page=${params.page}&pageSize=${params.pageSize}`);
    },
    // 直播间商品列表-秀场直播-获取当前直播间正在讲解的商品
    xiuChangShowGoodsSale(params) {
        return axios.get(`${base.yxf2}/v1/show/goods/sale?liveId=${params.liveId}`);
    },
    /*电台详情信息 */
    radioLiveInfo(params) {
        return axios.get(`${base.yxf2}/v1/radio/live/info?liveId=${params.liveId}`);
    },
    /*电台详情席位*/
    radioSeatsList(params) {
        return axios.get(`${base.yxf2}/v1/seats/list?liveId=${params.liveId}`);
    },
    /*电台-获取直播间榜单*/
    radioLeaderboadRoom(params) {
        return axios.get(`${base.yxf2}/v1/radio/leaderboard/room/${params.liveId}?page=${params.page}&pageSize=${params.pageSize}`);
    }



    // // 获取最新直播间列表
    // getNewRoomList(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/getNewRoomList`, qs.stringify(params));
    // },
    // // 获取最新直播间列表2
    // getNewRoomList2(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/getLiveRoomList`, qs.stringify(params));
    // },

    // // 庞世锋
    // // 关注用户接口 主播
    // attentionadd(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/attention/user/add`, qs.stringify(params));
    // },
    // // 取消关注用户接口 主播
    // attentiondelete(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/attention/user/delete`, qs.stringify(params));
    // },




    // // 获得直播间用户信息
    // getLiveInfo(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/getLiveInfo`, qs.stringify(params));
    // },

    // // 直播间 踢人
    // KickoutGroup(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/sendKickoutGroupMsg`, qs.stringify(params));
    // },
    // // 直播间个人中心视频列表
    // getLivingpersonalvideo(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/live/getNewRoomList`, qs.stringify(params));
    // },
    // // 直播间个人中心粉丝列表
    // getLivingpersonalifenslist(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/shop/getStoreGoodsAttention`, qs.stringify(params));
    // },

}

export default xiuchangliving;