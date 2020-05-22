export default [{
        path: '/',
        redirect: '/videos/index'
    },
    //个人中心
    //个人中心首页
    {
        path: '/videos/index',
        name: 'videosindex',
        component: () =>
            import ('./../../views/videos/index/index.vue'),
        meta: {
            name: 'videosindex',
            navstatus: true,
            //面包屑需要的参数
            breadnav: [{
                name: '小视频首页',
                url: '/videos/index',
            }]
        }
    },

    // 个人中心 个人中心地址管理页
    {
        path: 'details',
        name: 'videosdetails',
        navstatus: false,
        component: resolve => require(['./../../views/videos/details/index.vue'], resolve),
        meta: {
            name: 'videosdetails',
            //面包屑需要的参数
            breadnav: [{
                name: '小视频详情页页',
                url: '/videos/details',
            }]
        }
    },
    // 小视频 店主个人中心
    {
        path: 'personaldz',
        name: 'personaldz',
        navstatus: false,
        component: resolve => require(['./../../views/videos/personal/index.vue'], resolve),
        meta: {
            name: 'personaldz',
            //面包屑需要的参数
            breadnav: [{
                name: '店主个人中心页',
                url: '/videos/personal',
            }]
        }
    },
]