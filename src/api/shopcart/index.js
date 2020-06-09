/**
 * productdetails模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from './../../../node_modules/zlapi/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const shopcart = {
    showcarcontent(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/carsContent`, qs.stringify(params)); //接口替换
    },
    removeitem(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/removeitem`, qs.stringify(params));
    },
    addlist(params) {
        return axios.post(`${base.yxf}/wapi/v1/attention/goodslist/add`, qs.stringify(params));
    },
    carsprice(params) {
        return axios.post(`${base.yxf}/wapi/v1/valuation/compute/cars/price`, qs.stringify(params));
    },

    // 填写订单页  运价查询  庞世锋
    computedFreight(params) {
        // return axios.get(`${base.yxf}/wapi/v1/sfExpress/computedFreight?content=${content}`);
        return axios.post(`${base.yxf}/wapi/v1/sfExpress/computedFreightNew`, qs.stringify(params));
    },
    // 获取 总费用 及 收费明细 的数据
    getValutionFee(params) {
        return axios.post(`${base.yxf}/wapi/v1/valuation/getValutionFee`, qs.stringify(params));
    },
    // 新增订单
    createOrderhl(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/createOrder/hl`, qs.stringify(params));
    },
    // 获取订单下的优惠卷
    getOrderUsAbleCoupon(params) {
        return axios.post(`${base.yxf}/wapi/v1/coupon/user/usableCoupon`, qs.stringify(params));
    },

    // =====================H5支付 相关=====================
    // H5支付 alipay  庞世锋
    aliprepay(params) {
        return axios.post(`${base.yxf}/wapi/v1/pay/ali/wap/prepay`, qs.stringify(params));
    },
    // H5支付 订单支付状态查询接口
    paystatus(params) {
        return axios.post(`${base.yxf}/wapi/v1/pay/select/status`, qs.stringify(params));
    },
    // 获取默认发票接口
    takedefaultinvoice(params) {
        return axios.post(`${base.yxf}/wapi/v1/user/getChoicedInvoice`, qs.stringify(params));
    },
    // 获取新增发票接口
    takeaddnewinvoice(params) {
        return axios.post(`${base.yxf}/wapi/v1/user/createInvoice`, qs.stringify(params));
    }
}

export default shopcart;