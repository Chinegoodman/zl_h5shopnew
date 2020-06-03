export default [{
        path: '/',
        redirect: '/living/index'
    },
    //
    //首页
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
                name: '首页',
                url: '/living/index',
            }]
        }
    },
    //  详情页
    {
        path: 'livingdetails',
        name: 'livingdetails',
        navstatus: false,
        component: resolve => require(['./../../views/living/details/index.vue'], resolve),
        meta: {
            name: 'livingdetails',
            //面包屑需要的参数
            breadnav: [{
                name: '详情',
                url: '/living/livingdetails',
            }]
        }
    },
    //  回放  
    {
        path: 'livingreplay',
        name: 'livingreplay',
        navstatus: false,
        component: resolve => require(['./../../views/living/replay/index.vue'], resolve),
        meta: {
            name: 'livingreplay',
            //面包屑需要的参数
            breadnav: [{
                name: '详情',
                url: '/living/livingreplay',
            }]
        }
    },
    //  详情页-----分享
    {
        path: 'livingdetailsshare',
        name: 'livingdetailsshare',
        navstatus: false,
        component: resolve => require(['./../../views/living/details/livingdetailsshare.vue'], resolve),
        meta: {
            name: 'livingdetailsshare',
            //面包屑需要的参数
            breadnav: [{
                name: '详情',
                url: '/living/livingdetailsshare',
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
                name: '搜索',
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