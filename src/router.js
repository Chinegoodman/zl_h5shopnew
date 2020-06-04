import Vue from 'vue'
import Router from 'vue-router'
import living from './views/living/index.vue'
import NotFound from './components/NotFound.vue'
import shop_children from './routers/shop/index'
import newcomer_children from './routers/newcomer/index'
import living_children from './routers/living/index'
import personalcenter_children from './routers/personalcenter/index'
import videos_children from './routers/videos/index'
import needloginroute from './routers/needloginroute.js'
// import { resolve } from '_any-promise@1.3.0@any-promise'

// 解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题 、、监听是否有操作时报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}


Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/shop'
        },
        {
            path: '/living',
            // name: 'living',
            component: living,
            meta: {
                name: 'living',
                navstatus: true,
                breadnav: [{
                    name: '直播',
                    url: '/living',
                }]
            },
            children: living_children
        },
        {
            path: '/videos',
            // name: 'videos',
            component: resolve => require(['./views/videos/index.vue'], resolve),
            meta: {
                name: 'videos',
                navstatus: true,
                breadnav: [{
                    name: '小视频',
                    url: '/videos',
                }]
            },
            children: videos_children
        },
        {
            path: '/shop',
            component: resolve => require(['./views/shop/index.vue'], resolve),
            meta: {
                name: 'shop',
                navstatus: true,
                breadnav: [{
                    name: '商城',
                    url: '/shop',
                }]
            },
            children: shop_children
        },
        // 商城  商品详情
        {
            path: '/shop/productdetails/:product_id/:webtype',
            name: 'productdetails',
            component: resolve => require(['./views/shop/productdetails/index.vue'], resolve),
            meta: {
                name: 'shopindex',
                navstatus: false,
                //面包屑需要的参数
                breadnav: [{
                        name: '商城首页',
                        url: '/shop/index',
                    },
                    {
                        name: '商城详情页',
                        url: '/shop/productdetails/:product_id/:webtype',
                    },
                ]
            }
        },
        {
            path: '/newcomer',
            component: resolve => require(['./views/newcomer/index.vue'], resolve),
            meta: {
                name: 'newcomer',
                navstatus: true,
                breadnav: [{
                    name: '新人专区',
                    url: '/newcomer',
                }]
            },
            children: newcomer_children
        },
        // 新人专区详情页
        {
            path: '/newcomer/productdetails/:product_id/:webtype',
            // path: '/newcomer/productdetails',
            name: 'newcomerdetails',
            component: resolve => require(['./views/newcomer/productdetails/index.vue'], resolve),
            meta: {
                name: 'newcomerindex',
                navstatus: false,
                //面包屑需要的参数
                breadnav: [{
                        name: '新人专区首页',
                        url: '/newcomer/index',
                    },
                    {
                        name: '新人专区详情页',
                        url: '/newcomer/productdetails/:product_id/:webtype',
                    },
                ]
            }
        },
        {
            path: '/shopcart',
            name: 'shopcart',
            component: resolve => require(['./views/shopcart/index.vue'], resolve),
            meta: {
                name: 'shopcart',
                navstatus: true,
                breadnav: [{
                    name: '购物车',
                    url: '/shopcart',
                }]
            },
        },
        {
            path: '/personalcenter',
            // name: 'personalcenter',
            component: resolve => require(['./views/personalcenter/index.vue'], resolve),
            meta: {
                name: 'personalcenter',
                navstatus: true,
                breadnav: [{
                    name: '个人中心',
                    url: '/personalcenter',
                }]
            },
            children: personalcenter_children
        },
        {
            //登录首页
            path: '/login',
            name: 'login',
            component: resolve => require(['./views/loginregist/index.vue'], resolve),
            meta: {
                name: 'login',
                navstatus: false,
                breadnav: [{
                    name: '登录',
                    url: '/login',
                }]
            },
        },
        {
            //忘记密码==重置密码
            path: '/resetpw',
            name: 'resetpw',
            component: resolve => require(['./views/loginregist/resetpw.vue'], resolve),
            meta: {
                name: 'resetpw',
                navstatus: false,
                breadnav: [{
                    name: '重置密码',
                    url: '/resetpw',
                }]
            },
        },
        {
            // 登录--及注册后自动登录
            path: '/regist',
            name: 'regist',
            component: resolve => require(['./views/loginregist/regist.vue'], resolve),
            meta: {
                name: 'regist',
                navstatus: false,
                breadnav: [{
                    name: '注册',
                    url: '/regist',
                }]
            },
        },
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['./views/test/index.vue'], resolve),
            meta: {
                name: 'test',
                navstatus: true,
                breadnav: [{
                    name: '测试',
                    url: '/test',
                }]
            },
        },
        { path: '*', component: NotFound },
    ],
    scrollBehavior(to, from, savedPosition) {
        // console.log(to);
        if (to.name == 'productdetails' || to.name == 'newcomerdetails') {
            return { x: 0, y: 0 }
        }
    }
})

function Base64fn() {
    // private property  
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };
    // public method for decoding  
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };
    // private method for UTF-8 encoding  
    let _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };
    // private method for UTF-8 decoding  
    let _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                let c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
//DES加密
function encryptByDES(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};
//DES解密
function decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};
// 全局路由守卫
router.beforeEach((to, from, next) => {
    // console.log('navigation-guards');
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    // const nextRoute = ['home', 'good-list', 'good-detail', 'cart', 'profile'];
    const nextRoute = needloginroute();
    // console.log(nextRoute);
    // let isLogin = global.isLogin; // 是否登录

    let isLogin = ''; // 是否登录
    let userinfo = '';
    // console.log('存储的用户信息：' + window.localStorage.getItem('user-info-h5'))
    if (window.localStorage.getItem('user-info-h5')) {
        // userinfo = JSON.parse(window.localStorage.getItem('user-info-h5'));
        let userdata_storage = window.localStorage.getItem('user-info-h5');
        // userinfo = JSON.parse(new Base64fn().decode(userdata_storage));//Base64解密
        userinfo = JSON.parse(decryptByDES(userdata_storage, '9527')) || ''; //DES解密 密码：'9527'
    }
    // let userinfo = JSON.parse(window.localStorage.getItem('user-info-h5')).user;
    // debugger;
    let useridstatus = false;
    if (userinfo.userid != 0 && userinfo.userid != '' && userinfo.userid != undefined) {
        useridstatus = true;
    }
    isLogin = userinfo.isLogin && useridstatus;
    // console.log('是否登录：' + userinfo.isLogin);
    // console.log(userinfo.token);
    // console.log(userinfo.username);
    // console.log(to.params.webtype);
    if (to.params.webtype == 0) {
        next();
        return;
    }
    // 要打开的页面判断
    // if (to.name == 'login' || to.name == 'regist' || to.name == 'resetpw') {
    if (to.name == 'login' || to.name == 'regist') {
        // 若要打开登录页
        if (isLogin) {
            // 若已经登录了则跳转到首页
            next({
                name: 'homeindex'
            });
        } else {
            next();
        }
    } else if (nextRoute.indexOf(to.name) >= 0) {
        //  要打开到非登录 非注册页面；
        // 要打开到 nextRoute 指定页时，跳转至login
        if (!isLogin) {
            next({
                name: 'login'
            });
        } else {
            next();
        }
    } else {
        if (to.name != 'confirmorder' && to.name != 'olpay' && to.name != 'paypage') {
            // console.log('移除存储数据 confirmpageorder');
            window.localStorage.removeItem('confirmpageorder');
            // next();
        }
        if (to.name != 'orderdetails') {
            // console.log('移除存储数据2 confirmpageorder_orderdetails');
            window.localStorage.removeItem('confirmpageorder_orderdetails');
            // next();
        }

        if (from.name != 'shopindex' && to.name != 'productdetails') {
            window.sessionStorage.removeItem('returnflag');
        }
        // {
        next();
        // }
    }

});
export default router;