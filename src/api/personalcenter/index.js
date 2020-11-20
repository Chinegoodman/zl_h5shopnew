import base from '../base'; // 导入接口域名列表
import axios from '@/request/http.js'; // 导入http中创建的axios实例
// import axios2 from '@/request/http.js_postform'; // 导入http中创建的axios实例
import axios2 from "@/request/http_postform.js";
import qs from 'qs'; // 根据需求是否导入qs模块

const personalcenter = {
    // 商品订单接口
    getpageorders(userid, status, nextPage) {
        return axios.get(`${base.yxf}/wapi/v1/order/pageorders/hlr?userId=${userid}&status=${status}&nextPage=${nextPage}`); //音乐列表
    },
    // 取消订单
    getcancleorder(orderId, source, operator, cancelReason) {
        return axios.get(`${base.yxf}/wapi/v1/order/cancleorder?orderId=${orderId}&source=${source}&operator=${operator}&cancelReason=${cancelReason}`); //
    },
    // 根据id获取地址
    postaddressid(params) {
        return axios.post(`${base.yxf}/wapi/v1/address/addressid`, qs.stringify(params));
    },
    // 添加地址
    postaddaddress(params) {
        return axios.post(`${base.yxf}/wapi/v1/address/add`, qs.stringify(params));
    },
    // 获取默认地址
    postdefault(params) {
        return axios.post(`${base.yxf}/wapi/v1/address/default`, qs.stringify(params));
    },
    // 修改地址
    postupdate(params) {
        return axios.post(`${base.yxf}/wapi/v1/address/update`, qs.stringify(params));
    },
    // 获取地址列表
    postaddresslist(params) {
        return axios.post(`${base.yxf}/wapi/v1/address/addresslist`, qs.stringify(params));
    },
    // 删除地址
    postdelete(params) {
        return axios.post(`${base.yxf}/wapi/v1/address/delete`, qs.stringify(params));
    },
    // 根据id获取用户信息
    getinfouser(params) {
        return axios.post(`${base.yxf}/wapi/v1/member/getInfo`, qs.stringify(params));
    },
    // 根据id获取用户信息新接口
    getinfouser_new(params) {
        return axios.get(`${base.yxf2}/v1/user/info?userId=${params.userId}`);
    },
    //更新用户信息
    // updateinfouser(params) {
    //     return axios.post(`${base.yxf}/wapi/v1/user/update`, qs.stringify(params));
    // },
    //更新用户信息新接口
    updateinfouser_new(params) {
        return axios.put(`${base.yxf2}/v1/user/update/info`, qs.stringify(params));
    },
    //更新用户头像
    updateHeadPortrait(params) {
        return axios.put(`${base.yxf2}/v1/user/update/headPortrait`, qs.stringify(params));
    },
    //确认收货
    affirmGoods(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/sure4order/hl`, qs.stringify(params));
    },
    //省市区三级联动 数据接口
    linkage(params) {
        return axios.post(`${base.yxf}/wapi/v1/address/linkage/info`, qs.stringify(params));
    },
    //获取订单详情信息
    getOrderDetail(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/getOrderDetail/hl`, qs.stringify(params));
    },
    // 删除订单接口
    removeOrder4C(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/removeOrder4C`, qs.stringify(params));
    },

    // 用户钱包=====余额接口
    walletmoney(userid) {
        return axios.get(`${base.yxf}/wapi/v1/member/wallet/money?uid=${userid}`);
    },
    //获取余额分类
    getwalletmoneytype(params) {
        return axios.post(`${base.yxf}/wapi/v1/member/getMoneyType`, qs.stringify(params));
    },
    //获取余额明细
    getwalletmoneydetail(params) {
        return axios.post(`${base.yxf}/wapi/v1/member/getMoneyDetail`, qs.stringify(params));
    },
    //获取收藏及浏览列表
    getBrowseList(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/getCollectGoods`, qs.stringify(params));
    },
    //商品收藏
    shopsshoucang(params) {
        return axios.post(`${base.yxf}/wapi/v1/goods/collectGoods`, qs.stringify(params));
    },
    //获取优惠中心优惠卷
    getDiscountList(params) {
        return axios.post(`${base.yxf}/wapi/v1/coupon/center/list`, qs.stringify(params));
    },
    //我的优惠卷
    getMyDiscountList(params) {
        return axios.post(`${base.yxf}/wapi/v1/coupon/user/list`, qs.stringify(params));
    },
    //获取优惠卷
    getOneDiscountList(params) {
        return axios.post(`${base.yxf}/wapi/v1/coupon/receive`, qs.stringify(params));
    },
    //获取优惠卷下店铺
    getDiscountShopList(params) {
        return axios.post(`${base.yxf}/wapi/v1/coupon/user/shopList`, qs.stringify(params));
    },
    // 获取投诉类型
    complaintstype(params) {
        return axios.post(`${base.yxf}/wapi/v1/user/complaints/type`, qs.stringify(params));
    },
    //获取oss信息
    osstoken(params) {
        return axios.post('https://shop.zhulihr.com/wapi/v1/user/ossApiToken', params);
    },
    //提交投诉建议
    updatacomplaints(params) {
        return axios.post(`${base.yxf}/wapi/v1/user/complaints`, qs.stringify(params));
    },
    // 商品售后接口
    getaftersale(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/pageReturnOrders`, qs.stringify(params));
    },
    //获取充值列表-秀场
    toUpWallet(params) {
        return axios.get(`${base.yxf2}/v1/user/wallet/topUp/list?operatingOsType=${params.operatingOsType}&appType=${params.appType}&userId=${params.userId}`);
    },
    //获取用户余额-秀场
    toUpWwalletBalanceallet(params) {
        return axios.get(`${base.yxf2}/v1/user/wallet/balance?userId=${params.userId}`);
    },
    //获取账户信息及收益信息-金豆/秀豆
    userWalletInfo(params) {
        return axios.get(`${base.yxf2}/v1/user/wallet/info?userId=${params.userId}`);
    },
    //获取等级配置信息
    userLevelConfig(params) {
        return axios.get(`${base.yxf2}/v1/user/level/config?level=${params.level}`);
    },
    //用户等级权益
    userLevelEquities(params) {
        return axios.get(`${base.yxf2}/v1/user/level/equities?userId=${params.userId}`);
    },
    //账单类型
    walletBillType(params) {
        return axios.get(`${base.yxf2}/v1/user/wallet/bill/type`);
    },
    //秀场账单列表
    userWalletBill(params) {
        return axios.get(`${base.yxf2}/v1/user/wallet/bill?page=${params.page}&type=${params.type}&userId=${params.userId}&item=${params.item}`);
    },
    //秀场账单列表提现及豆转币
    userWalletExchangeOrWithdrawalBill(params) {
        return axios.get(`${base.yxf2}/v1/user/wallet/exchange/or/withdrawal/bill?page=${params.page}&type=${params.type}&userId=${params.userId}&item=${params.item}`);
    },
    //根据时间获得分享奖励统计信息
    shareStatistics(params) {
        return axios.get(`${base.yxf2}/v1/marketing/share/statistics?type=${params.type}&userId=${params.userId}`);
    },
    //获得累计奖励、可兑换奖励
    cumulativeReward(params) {
        return axios.get(`${base.yxf2}/v1/marketing/share/cumulative/reward?userId=${params.userId}`);
    },
    //获得个人、主播邀请明细
    shareInviteDetail(params) {
        return axios.get(`${base.yxf2}/v1/marketing/share/invite/detail?userId=${params.userId}&type=${params.type}&statisticsType=${params.statisticsType}&pageNumber=${params.pageNumber}&pageSize=${params.pageSize}&appType=${params.appType}`);
    },
    //提现及兑换
    redenvelopeWithdrawal(params) {
        return axios.post(`${base.yxf2}/v1/user/wallet/exchange/redenvelope/withdrawal`, qs.stringify(params));
    },
    //添加提现账户信息
    addressAddMsg(params) {
        return axios.post(`${base.yxf2}/v1/address/add`, qs.stringify(params));
    },
    //修改账户信息
    changeAdressAddMsg(params) {
        return axios.put(`${base.yxf2}/v1/address/update`, qs.stringify(params));
    },
    //获取账户信息是添加还是修改标致
    accountMsgFlag(params) {
        return axios.get(`${base.yxf2}/v1/address/getone?userId=${params.userId}&accountType =${params.accountType }&account=${params.account}&mobile=${params.mobile}`);
    },
    //获取提现记录和兑换记录页总金额
    walletStatisticalWithdrawlCount(params) {
        return axios.get(`${base.yxf2}/v1/user/wallet/statistical/withdrawal/count?userId=${params.userId}&type=${params.type}`);
    }
}

export default personalcenter;