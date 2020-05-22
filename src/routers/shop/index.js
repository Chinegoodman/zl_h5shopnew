export default [{
        path: '/',
        redirect: '/shop/index'
    },
    //商城
    //商城首页
    {
        path: 'index',
        name: 'shopindex',
        component: () =>
            import ('./../../views/shop/index/index.vue'),
        meta: {
            name: 'shopindex',
            navstatus: true,
            //面包屑需要的参数
            breadnav: [{
                name: '商城首页',
                url: '/shop/index',
            }]
        }
    },

    // // 商城  商品详情
    // {
    //     path: 'productdetails/:product_id/:webtype',
    //     name: 'productdetails',
    //     component: resolve => require(['./../../views/shop/productdetails/index.vue'], resolve),
    //     meta: {
    //         name: 'shopindex',
    //         navstatus: false,
    //         //面包屑需要的参数
    //         breadnav: [{
    //                 name: '商城首页',
    //                 url: '/shop/index',
    //             },
    //             {
    //                 name: '商城详情页',
    //                 url: '/shop/productdetails/:product_id/:webtype',
    //             },
    //         ]
    //     }
    // },
    // 商城  店铺页面
    {
        path: 'shopowner',
        name: 'shopowner',
        component: resolve => require(['./../../views/shop/shopowner/index.vue'], resolve),
        meta: {
            name: 'shopowner',
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                    name: '商城首页',
                    url: '/shop/index',
                },
                {
                    name: '商城店主页页',
                    url: '/shop/shopowner',
                },
            ]
        }
    },
    // 商城 --金钢区-列表页(首页点入)
    {
        path: 'diamond',
        name: 'diamond',
        component: resolve => require(['./../../views/shop/diamond/index.vue'], resolve),
        meta: {
            name: 'diamond',
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                    name: '商城首页',
                    url: '/diamond/index',
                },
                {
                    name: '商城店主页页',
                    url: '/shop/diamond',
                },
            ]
        }
    },
    // 商城 确认订单页
    {
        path: 'confirmorder',
        name: 'confirmorder',
        component: resolve => require(['./../../views/shop/confirmorder/index.vue'], resolve),
        meta: {
            navstatus: false,
            name: 'confirmorder',
            //面包屑需要的参数
            breadnav: [{
                name: '商城首页',
                url: '/shop/index',
            }, {
                name: '确认订单页',
                url: '/shop/confirmorder',
            }]
        }
    },
    // 商城 在线支付页面
    {
        path: 'paypage',
        name: 'paypage',
        component: resolve => require(['./../../views/shop/paypage/index.vue'], resolve),
        meta: {
            navstatus: false,
            name: 'paypage',
            //面包屑需要的参数
            breadnav: [{
                name: '商城首页',
                url: '/shop/index',
            }, {
                name: '在线支付页面',
                url: '/shop/paypage',
            }]
        }
    },
    // 商城 在线支付成功页面
    {
        path: 'olpay',
        name: 'olpay',
        component: resolve => require(['./../../views/shop/olpay/index.vue'], resolve),
        meta: {
            navstatus: false,
            name: 'olpay',
            //面包屑需要的参数
            breadnav: [{
                name: '商城首页',
                url: '/shop/index',
            }, {
                name: '在线支付成功页面',
                url: '/shop/olpay',
            }]
        }
    },
    // 商城 商品搜索页
    {
        path: 'productsearch',
        name: 'productsearch',
        component: resolve => require(['./../../views/shop/productsearch/index.vue'], resolve),
        meta: {
            navstatus: false,
            name: 'productsearch',
            //面包屑需要的参数
            breadnav: [{
                name: '商城首页',
                url: '/shop/index',
            }, {
                name: '商品搜索页',
                url: '/shop/productsearch',
            }]
        }
    },
    // 商城 商品分类页
    {
        path: 'producttypelist',
        name: 'producttypelist',
        component: resolve => require(['./../../views/shop/producttypelist/index.vue'], resolve),
        meta: {
            navstatus: true,
            name: 'producttypelist',
            //面包屑需要的参数
            breadnav: [{
                name: '商城首页',
                url: '/shop/index',
            }, {
                name: '商品分类页',
                url: '/shop/producttypelist',
            }]
        }
    },
]