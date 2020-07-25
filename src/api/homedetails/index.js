import base from '../base'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const homedetails = {
    // 商品订单接口
    // getpageorders(userid, status, nextPage) {
    //     return axios.get(`${base.yxf}/wapi//v1/order/pageorders?userId=${userid}&status=${status}&nextPage=${nextPage}`); //音乐列表
    // },
    // 商城首页banner图片
    bannerimg(params) {
        return axios.post(`${base.yxf}/wapi/v1/advert/banners`, qs.stringify(params));
    },
    // 商城首页头部分类列表
    titlelist(params) {
        return axios.post(`${base.yxf}/wapi/v1/category/homepage/categories`, qs.stringify(params));
    },
    // 商城首页人气爆款(旧)
    explosive(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/homepage/popularities`, qs.stringify(params));
    },
    // 商城首页每日推荐(旧)
    ercommend(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/homepage/recommendations`, qs.stringify(params));
    },

    // 商城首页人气爆款(新)
    explosivenew(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/homepage/getPopularityList`, qs.stringify(params));
    },
    // 商城首页每日推荐(新)
    ercommendnew(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/homepage/getRecommendList`, qs.stringify(params));
    },

    // 商城首页列表
    homelist(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/homepage/commodities`, qs.stringify(params));
    },
    // 实时金价
    goldmassage(params) {
        return axios.post(`${base.yxf}/wapi/v1/valuation/price/nowGold`, qs.stringify(params));
    },
    // 首页推荐tab列表 ljx
    homelisttjpost(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getLiveRoomList`, qs.stringify(params));
    },
    // 首页金钢区  ljx
    homeadvertisingarea(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/homepage/diamond`, qs.stringify(params));
    },
    // 首页金钢区-内页列表
    diamondlistpost(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getGoodsLiveRoomList`, qs.stringify(params));
    },
    // 首页直播tab列表 ljx
    homelistzbpost(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getGoldTypeLiveRoomList`, qs.stringify(params));
    },
    // 直播分类接口 ljx
    homelistfenleizb(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/homepage/goldType`, qs.stringify(params));
    },
    // 首页秀场列表 ljx
    homelistxcpost(params) {
        return axios.get(`${base.yxf2}/v1/show/live/getLiveList?type=${params.type}&page=${params.page}&pageSize=${params.pageSize}`);
    },
    // 首页新品tab列表 ljx
    homelistxppost(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/getNewProducts`, qs.stringify(params));
    },
    // 新品分类接口 ljx
    homelistfenleixp(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/getProductCategory`, qs.stringify(params));
    },
    // 投资金推荐tab列表 ljx
    homelisttzjpost(params) {
        return axios.post(`${base.yxf}/wapi/v1/live/getTZJRoomGoods`, qs.stringify(params));
    },
    // 判断是否新手(然后显示推送弹层)
    checknewcomercondition(params) {
        return axios.post(`${base.yxf}/wapi/v1/user/isNoviceById`, qs.stringify(params));
    }

}

export default homedetails;