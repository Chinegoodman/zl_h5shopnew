/**
 * 退货模块接口列表
 */

import base from '../base'; // 导入接口域名列表
import axios from './../../../node_modules/zlapi/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const returngoods = {
    //获得退货原因
    cancleReason(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/cancleReason`, qs.stringify(params));
    },
    // 提交退货
    returenOrder(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/returenOrder`, qs.stringify(params));
    },
    // 退货详情
    getrOrderDetail(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/rOrderDetail`, qs.stringify(params));
    },
    // 退货、退款详情-返回items\退货单\收货地址
    findROrderContent(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/findROrderContentByUid`, qs.stringify(params));
    },
    //客户发起退货物流
    postCusDeliver(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/cusDeliver`, qs.stringify(params));
    },
    // 提交退款
    returnOrderMoney(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/cancleOrderItem`, qs.stringify(params));
    },
    // 申诉提交
    returnOrderMoneywappeal(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/wappeal`, qs.stringify(params));
    },
    //分页查看退货列表
    pageReturnOrders(userId, nextPage) {
        return axios.get(`${base.yxf}/wapi/v1/order/pageReturnOrders?userId=${userId}&nextPage=${nextPage}`); //音乐列表
    },
    //获得退货进度列表
    getRefundSchedule(refundId) {
        return axios.get(`${base.yxf}/wapi/v1/finance/getRefundSchedule?refundId=${refundId}`);
    },
    //获取协商历史
    findReturnConsult(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/findReturnConsult`, qs.stringify(params));
    },
    //协商历史提交
    insertReturnConsult(params) {
        return axios.post(`${base.yxf}/wapi/v1/order/insertReturnConsult`, qs.stringify(params));
    },
    //取消订单
    cancleorder(orderId, source, operator, cancelReason) {
        return axios.get(`${base.yxf} /wapi/v1/order/cancleorder?orderId=${orderId}&source=H5&operator=${operator}&cancelReason=${cancelReason}`);
    },


}

export default returngoods;