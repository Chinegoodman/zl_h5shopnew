export function checkdevice() {
    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
        // 此时为移动端打开.跳转到移动站
        // if(window.location.href.indexOf("ooo0o.com/mobile") != -1){
        //     return;
        // }else {
        //     window.location.href = "https://www.ooo0o.com/mobile"
        // }

        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //在微信中打开

            // alert('微信中打开的');
            // alert('请点击右上角的。。。打开本地浏览器来查看下载页面')
            // return 'weixin'
            if (browser.versions.ios) {
                return 'weixinios';
            } else {
                return 'weixin';
            }
        } else if (browser.versions.android) {
            //是否在安卓浏览器打开

            // alert('安卓手机中打开的');
            /*window.location.href="https://jushizhibo.com/android/app-release.apk";*/
            // window.open('https://jushizhibo.com/android/app-release.apk','_self')
            return 'anzhuo';
        } else if (browser.versions.ios) {
            //是否在IOS浏览器打开
            // alert('IOS中打开的');
            /*window.location.href="https://www.baidu.com";*/
            // window.open('transparentfactory://xiangqingye','_self')
            return 'ios';
        }
    } else {
        //此时是非移动端,则跳转PC站
        // alert('PC中打开的');
        // if(window.location.href.indexOf("ooo0o.com/mobile") != -1){
        //     window.location.href = "https://www.ooo0o.com"
        // }
        return 'pc';
    }
}