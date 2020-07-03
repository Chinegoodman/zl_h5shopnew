export default [{
        path: '/',
        redirect: '/living/index'
    },
    //直播
    //直播首页
    {
        path: '/living/index',
        name: 'livingindex',
        component: () =>
            import ('./../../views/living/index/index.vue'),
        meta: {
            name: 'livingindex',
            navstatus: true,
            //面包屑需要的参数
            breadnav: [{
                name: '直播首页',
                url: '/living/index',
            }]
        }
    },
    // 直播 直播详情页
    {
        path: 'livingdetails',
        name: 'livingdetails',
        navstatus: false,
        component: resolve => require(['./../../views/living/details/index.vue'], resolve),
        meta: {
            name: 'livingdetails',
            //面包屑需要的参数
            breadnav: [{
                name: '直播详情',
                url: '/living/livingdetails',
            }]
        }
    },
    // 秀场直播 直播详情页
    {
        path: 'xiuchangdetails',
        name: 'xiuchangdetails',
        navstatus: false,
        component: resolve => require(['./../../views/living/xiudetails/index.vue'], resolve),
        meta: {
            name: 'xiuchangdetails',
            //面包屑需要的参数
            breadnav: [{
                name: '直播详情',
                url: '/living/xiuchangdetails',
            }]
        }
    },
    // 直播 直播回放  
    {
        path: 'livingreplay',
        name: 'livingreplay',
        navstatus: false,
        component: resolve => require(['./../../views/living/replay/index.vue'], resolve),
        meta: {
            name: 'livingreplay',
            //面包屑需要的参数
            breadnav: [{
                name: '直播详情',
                url: '/living/livingreplay',
            }]
        }
    },
    // 直播 直播详情页-----分享
    {
        path: 'livingdetailsshare',
        name: 'livingdetailsshare',
        navstatus: false,
        component: resolve => require(['./../../views/living/details/livingdetailsshare.vue'], resolve),
        meta: {
            name: 'livingdetailsshare',
            //面包屑需要的参数
            breadnav: [{
                name: '直播详情',
                url: '/living/livingdetailsshare',
            }]
        }
    },
    // 直播 直播个人中心页
    {
        path: 'livingpersonalpage',
        name: 'livingpersonalpage',
        navstatus: false,
        component: resolve => require(['./../../views/living/personalpage/index.vue'], resolve),
        meta: {
            name: 'livingpersonalpage',
            //面包屑需要的参数
            breadnav: [{
                name: '直播详情',
                url: '/living/livingpersonalpage',
            }]
        }
    },
    {
        path: 'livingsearch',
        name: 'livingsearch',
        navstatus: false,
        component: resolve => require(['./../../views/living/search/index.vue'], resolve),
        meta: {
            name: 'livingdetails',
            //面包屑需要的参数
            breadnav: [{
                name: '直播搜索',
                url: '/living/livingsearch',
            }]
        }
    },
    {
        path: 'searchresult',
        name: 'searchresult',
        navstatus: false,
        component: resolve => require(['./../../views/living/search/indexresult.vue'], resolve),
        meta: {
            name: 'livingdetails',
            //面包屑需要的参数
            breadnav: [{
                name: '搜索结果',
                url: '/living/searchresult',
            }]
        }
    },
]