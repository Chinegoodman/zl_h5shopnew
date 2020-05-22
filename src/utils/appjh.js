import { checkdevice } from './checkdevice'
// APP打开地址页面事件
export function jsCallAddressManagerfn() {
    if (checkdevice() == 'ios') {
        // alert('ios');
        window.webkit.messageHandlers.jsCallAddressManager.postMessage('iosjsCallAddressManager1');
    } else if (checkdevice() == 'anzhuo') {
        // alert('anzhuo');
        window.android.jsCallAddressManager();
    }
}
// APP订单提交事件
export function jsCallOrderImmediatelyfn(OrderImmediatelydata) {
    if (checkdevice() == 'ios') {
        // alert('ios');
        // alert(OrderImmediatelydata.totalAmount);
        window.webkit.messageHandlers.jsCallOrderImmediately.postMessage(OrderImmediatelydata);
    } else if (checkdevice() == 'anzhuo') {
        // alert('anzhuo');
        // alert(OrderImmediatelydata.totalAmount);
        window.android.jsCallOrderImmediately(JSON.stringify(OrderImmediatelydata));
    }
}
// APP打开购物车事件
export function jsCallShoppingCartfn() {
    if (checkdevice() == 'ios') {
        // alert('ios');
        window.webkit.messageHandlers.jsCallShoppingCart.postMessage('jsCallShoppingCart');
    } else if (checkdevice() == 'anzhuo') {
        // alert('anzhuo');
        window.android.jsCallShoppingCart();
    }
}
// APP打开登录页面
export function jsCallLogin() {
    if (checkdevice() == 'ios') {
        // alert('ios跳转登录');
        window.webkit.messageHandlers.jsCallLogin.postMessage('iosjsCallLogin');
    } else if (checkdevice() == 'anzhuo') {
        // alert('anzhuo跳转登录');
        window.android.jsCallLogin();
    }
}
// APP打开店铺页面
export function jsCallStore(data) {
    if (checkdevice() == 'ios') {
        // alert('ios跳转登录');
        window.webkit.messageHandlers.jsCallStore.postMessage(data);
    } else if (checkdevice() == 'anzhuo') {
        // alert('anzhuo跳转登录');
        window.android.jsCallStore(JSON.stringify(data));
    }
}
// APP返回上一页
export function jsCallgoback() {
    if (checkdevice() == 'ios') {
        window.webkit.messageHandlers.jsCallgoback.postMessage();
    } else if (checkdevice() == 'anzhuo') {
        window.android.jsCallgoback();
    }
}

// APP 商品详情页 锚点切换
export function jsCallAnchorPoint(OrderImmediatelydata) {
    if (checkdevice() == 'ios') {
        window.webkit.messageHandlers.jsCallAnchorPoint.postMessage(OrderImmediatelydata);
    } else if (checkdevice() == 'anzhuo') {
        window.android.jsCallAnchorPoint(JSON.stringify(OrderImmediatelydata));
    }
}

// webview调用本地方法
// export function updateLoaciton(msg) {
//     if (checkdevice() == 'ios') {
//         alert('ios');
//         alert(msg)
//     } else if (checkdevice() == 'anzhuo') {
//         alert('anzhuo');
//         alert(msg)
//     }
// }

// APP 商品详情页 拉起客服会话（店主客服 或者 运营客服）
export function jsCallService(servicedata) {
    if (checkdevice() == 'ios') {
        window.webkit.messageHandlers.jsCallService.postMessage(servicedata);
    } else if (checkdevice() == 'anzhuo') {
        window.android.jsCallService(JSON.stringify(servicedata));
    }
}