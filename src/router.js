import Vue from 'vue'
import Router from 'vue-router'
import living from './views/living/index.vue'
import NotFound from './components/NotFound.vue'
import shop_children from './routers/shop/index'
import newcomer_children from './routers/newcomer/index'
import living_children from './routers/living/index'
import personalcenter_children from './routers/personalcenter/index'
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
        //秀场会员等级 vip-levle
        {
            path: '/personalcenter/viplevledetails',
            name: 'viplevledetails',
            component: resolve => require(['./views/personalcenter/viplevledetails/index.vue'], resolve),
            meta: {
                name: 'viplevledetails',
                navstatus: false,
                //面包屑需要的参数
                breadnav: [{
                        name: '个人中心首页',
                        url: '/personalcenter/index',
                    },
                    {
                        name: '个人中心-会员等级页',
                        url: '/personalcenter/viplevledetails',
                    },
                ]
            }
        },
        //姻缘会员等级 vip-levle
        {
            path: '/personalcenter/marriageviplevle',
            name: 'viplevledetails',
            component: resolve => require(['./views/personalcenter/marriageviplevle/index.vue'], resolve),
            meta: {
                name: 'marriageviplevle',
                navstatus: false,
                //面包屑需要的参数
                breadnav: [{
                        name: '个人中心首页',
                        url: '/personalcenter/index',
                    },
                    {
                        name: '个人中心-会员等级页',
                        url: '/personalcenter/marriageviplevle',
                    },
                ]
            }
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
    // console.log('存储的用户信息：' + window.localStorage.getItem('user-info'))
    if (window.localStorage.getItem('user-info')) {
        userinfo = JSON.parse(window.localStorage.getItem('user-info'));
    }
    // let userinfo = JSON.parse(window.localStorage.getItem('user-info')).user;
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