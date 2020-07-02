export default [{
        path: '/',
        redirect: '/personalcenter/index'
    },
    //个人中心
    //个人中心首页
    {
        path: '/personalcenter/index',
        name: 'personalcenterindex',
        component: () =>
            import ('./../../views/personalcenter/index/index.vue'),
        meta: {
            name: 'personalcenterindex',
            navstatus: true,
            //面包屑需要的参数
            breadnav: [{
                name: '个人中心首页',
                url: '/personalcenter/index',
            }]
        }
    },

    // 个人中心 个人中心地址管理页
    {
        path: '/address/index',
        name: 'personalcenteraddress',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/address/index.vue'], resolve),
        meta: {
            name: 'personalcenteraddress',
            //面包屑需要的参数
            breadnav: [{
                name: '个人中心地址页',
                url: '/personalcenter/address',
            }]
        }
    },
    // 地址查看页
    {
        path: '/address/check',
        name: 'addresscheck',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/address/check/index'], resolve),
    },
    // 地址编辑页
    {
        path: '/address/edit',
        name: 'addressedit',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/address/edit/index'], resolve),
    },
    // 地址添加页
    {
        path: '/address/add',
        name: 'addressadd',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/address/add/index'], resolve),
    },
    {
        path: '/follow',
        name: 'follow',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/follow/index.vue'], resolve),
        meta: {
            name: 'follow',
            //面包屑需要的参数
            breadnav: [{
                name: '关注页面',
                url: '/personalcenter/follow',
            }]
        }
    },
    {
        path: 'order',
        name: 'order',
        component: () =>
            import ('./../../views/personalcenter/order/index.vue'),
        meta: {
            name: 'order',
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '订单页面',
                url: '/personalcenter/order',
            }]
        },
        children: [{
                path: '/',
                redirect: '/personalcenter/order/index'
            },
            //个人中心-我的订单-首页
            {
                path: '/personalcenter/order/index',
                name: 'orderindex',
                component: () =>
                    import ('./../../views/personalcenter/order/index/index.vue'),
                meta: {
                    name: 'personalcenterorderindex',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==我的订单==首页',
                        url: '/personalcenter/order/index'
                    }]
                }
            }
        ]
    },
    {
        path: 'order/orderdetails',
        name: 'orderdetails',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/orderdetails/orderdetails.vue'], resolve),
        meta: {
            name: 'orderdetails',
            //面包屑需要的参数
            breadnav: [{
                    name: '订单列表',
                    url: '/personalcenter/order',
                },
                {
                    name: '订单详情',
                    url: '/personalcenter/order/orderdetails',
                }
            ]
        }
    },
    // 退货列表页
    {
        path: '/returngoods/index',
        name: 'returngoodslist',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/list/index.vue'], resolve),
        meta: {
            name: 'returngoodslist',
            //面包屑需要的参数
            breadnav: [{
                name: '退货列表页',
                url: '/returngoods/index',
            }]
        }
    },
    //退货申请页
    {
        path: '/returngoods/apply',
        name: 'returngoodsapply',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/apply/index.vue'], resolve),
        meta: {
            name: 'returngoodsapply',
            //面包屑需要的参数
            breadnav: [{
                name: '退货申请页',
                url: '/returngoods/apply',
            }]
        }
    },
    //退款申请页
    {
        path: '/returngoods/applymoney',
        name: 'returngoodsapplymoney',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/applymoney/index.vue'], resolve),
        meta: {
            name: 'returngoodsapplymoney',
            //面包屑需要的参数
            breadnav: [{
                name: '退货申请页',
                url: '/returngoods/applymoney',
            }]
        }
    },
    //退货申请查看页
    {
        path: '/returngoods/check',
        name: 'returngoodscheck',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/check/index.vue'], resolve),
        meta: {
            name: 'returngoodscheck',
            //面包屑需要的参数
            breadnav: [{
                name: '退货申请查看页',
                url: '/returngoods/check',
            }]
        }
    },
    //退货申请协商提交页
    {
        path: '/returngoods/consult',
        name: 'returngoodsconsult',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/consult/index.vue'], resolve),
        meta: {
            name: 'returngoodsconsult',
            //面包屑需要的参数
            breadnav: [{
                name: '退货申请协商提交页',
                url: '/returngoods/consult',
            }]
        }
    },
    //退款申诉提交页
    {
        path: '/returngoods/appeal',
        name: 'returngoodsappeal',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/appeal/index.vue'], resolve),
        meta: {
            name: 'returngoodsappeal',
            //面包屑需要的参数
            breadnav: [{
                name: '退款申诉提交页',
                url: '/returngoods/appeal',
            }]
        }
    },
    //退款申诉成功页
    {
        path: '/returngoods/appealsuccess',
        name: 'returngoodsappealsuccess',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/appealsuccess/index.vue'], resolve),
        meta: {
            name: 'returngoodsappealsuccess',
            //面包屑需要的参数
            breadnav: [{
                name: '退款申诉成功页',
                url: '/returngoods/appealsuccess',
            }]
        }
    },
    //退货申请协商历史页
    {
        path: '/returngoods/history',
        name: 'returngoodshistory',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/history/index.vue'], resolve),
        meta: {
            name: 'returngoodshistory',
            //面包屑需要的参数
            breadnav: [{
                name: '退货申请协商历史页',
                url: '/returngoods/history',
            }]
        }
    },
    //退货申请-退货发货页
    {
        path: '/returngoods/returnshopssend',
        name: 'returnshopssend',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/returngoods/returnshopssend/index.vue'], resolve),
        meta: {
            name: 'returnshopssend',
            //面包屑需要的参数
            breadnav: [{
                name: '退货申请协商历史页',
                url: '/returngoods/returnshopssend',
            }]
        }
    },

    //个人中心--用户等级
    {
        path: '/levelinstruct',
        name: 'levelinstruct',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/levelinstruct/index.vue'], resolve),
        meta: {
            name: 'levelinstruct',
            //面包屑需要的参数
            breadnav: [{
                name: '用户等级',
                url: '/levelinstruct',
            }]
        }
    },
    //个人中心--关于抓周
    {
        path: '/aboutzhuazhou',
        name: 'aboutzhuazhou',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/aboutzhuazhou/index.vue'], resolve),
        meta: {
            name: 'aboutzhuazhou',
            //面包屑需要的参数
            breadnav: [{
                name: 'aboutzhuazhou',
                url: '/aboutzhuazhou'
            }]
        }
    },
    //个人中心--完善资料-我的资料
    {
        path: '/myinfo',
        name: 'myinfo',
        component: () =>
            import ('./../../views/personalcenter/myinfo/index.vue'),
        meta: {
            name: 'myinfo',
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '个人中心-完善资料',
                url: '/personalcenter/myinfo'
            }]
        },
        children: [{
                path: '/',
                redirect: '/personalcenter/myinfo/index'
            },
            {
                path: '/personalcenter/myinfo/index',
                name: 'myinfoindex',
                component: () =>
                    import ('./../../views/personalcenter/myinfo/index/index.vue'),
                meta: {
                    name: 'personalcentermyinfoindex',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心-完善资料-首页',
                        url: '/personalcenter/myinfo/index'
                    }]
                }
            },
            {
                path: '/personalcenter/myinfo/nickname',
                name: 'myinfonickname',
                component: () =>
                    import ('./../../views/personalcenter/myinfo/nickname/index.vue'),
                meta: {
                    name: 'personalcentermyinfonickname',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心-完善资料-修改昵称',
                        url: '/personalcenter/myinfo/nickname'
                    }]
                }
            },
            {
                path: '/personalcenter/myinfo/changeintroduction',
                name: 'myinfochangeintroduction',
                component: () =>
                    import ('./../../views/personalcenter/myinfo/changeintroduction/index.vue'),
                meta: {
                    name: 'personalcentermyinfochangeintroduction',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心-完善资料-修改昵称',
                        url: '/personalcenter/myinfo/changeintroduction'
                    }]
                }
            },
            {
                path: '/personalcenter/myinfo/acountsafe',
                name: 'myinfoacountsafe',
                component: () =>
                    import ('./../../views/personalcenter/myinfo/acountsafe/index.vue'),
                meta: {
                    name: 'personalcentermyinfoacountsafe',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心-完善资料-账户安全',
                        url: '/personalcenter/myinfo/acountsafe'
                    }]
                }
            },
            {
                path: '/personalcenter/myinfo/changepassword',
                name: 'myinfochangepassword',
                component: () =>
                    import ('./../../views/personalcenter/myinfo/changepassword/index.vue'),
                meta: {
                    name: 'personalcentermyinfochangepassword',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心-完善资料-账户安全-修改密码',
                        url: '/personalcenter/myinfo/changepassword'
                    }]
                }
            },
            {
                path: '/personalcenter/myinfo/changephone',
                name: 'myinfochangephone',
                component: () =>
                    import ('./../../views/personalcenter/myinfo/changephone/index.vue'),
                meta: {
                    name: 'personalcentermyinfochangephone',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心-完善资料-账户安全-修改手机号',
                        url: '/personalcenter/myinfo/changephone'
                    }]
                }
            },
            {
                path: '/personalcenter/myinfo/changephonestep',
                name: 'myinfochangephonestep',
                component: () =>
                    import ('./../../views/personalcenter/myinfo/changephonestep/index.vue'),
                meta: {
                    name: 'personalcentermyinfochangephonestep',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心-完善资料-账户安全-修改手机号',
                        url: '/personalcenter/myinfo/changephonestep'
                    }]
                }
            }
        ]
    },
    //个人中心--我的收藏 -我的收藏
    {
        path: '/mybrowse',
        name: 'mybrowse',
        navstatus: false,
        component: resolve => require(['./../../views/personalcenter/mybrowse/index.vue'], resolve),
        meta: {
            name: 'mybrowse',
            breadnav: [{
                name: '个人中心-我的收藏-我的收藏',
                url: '/mybrowse'
            }]
        }
    },
    //个人中心--购买帮助
    {
        path: 'helpbuy',
        name: 'helpbuy',
        component: () =>
            import ('./../../views/personalcenter/helpbuy/index.vue'),
        meta: {
            name: 'helpbuy',
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '个人中心-购买帮助',
                url: '/personalcenter/helpbuy',
            }]
        },
        children: [{
                path: '/',
                redirect: '/personalcenter/helpbuy/index'
            },
            //个人中心-购买帮助-首页
            {
                path: '/personalcenter/helpbuy/index',
                name: 'helpindex',
                component: () =>
                    import ('./../../views/personalcenter/helpbuy/index/index.vue'),
                meta: {
                    name: 'personalcenterhelpbuyindex',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==购买帮助==首页',
                        url: '/personalcenter/helpbuy/index'
                    }]
                }
            },
            //个人中心-购买帮助-如何购买商品
            {
                path: '/personalcenter/helpbuy/buy',
                name: 'buy',
                component: () =>
                    import ('./../../views/personalcenter/helpbuy/buy/buy.vue'),
                meta: {
                    name: 'personalcenterhelpbuybuy',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==购买帮助==如何购买商品？',
                        url: '/personalcenter/helpbuy/buy'
                    }]
                }
            },
            //个人中心-购买帮助-红利人
            {
                path: '/personalcenter/helpbuy/hongli',
                name: 'hongli',
                component: () =>
                    import ('./../../views/personalcenter/helpbuy/hongli/hongli.vue'),
                meta: {
                    name: 'personalcenterhelpbuyhongli',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==购买帮助==红利人',
                        url: '/personalcenter/helpbuy/hongli'
                    }]
                }
            },
            //个人中心-购买帮助-费用
            {
                path: '/personalcenter/helpbuy/fei',
                name: 'fei',
                component: () =>
                    import ('./../../views/personalcenter/helpbuy/fei/fei.vue'),
                meta: {
                    name: 'personalcenterhelpbuyfei',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==购买帮助==费用',
                        url: '/personalcenter/helpbuy/fei'
                    }]
                }
            },
            //个人中心-购买帮助-用户协议
            {
                path: '/personalcenter/helpbuy/useragreement',
                name: 'useragreement',
                component: () =>
                    import ('./../../views/personalcenter/helpbuy/useragreement/useragreement.vue'),
                meta: {
                    name: 'personalcenterhelpbuyuseragreement',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==购买帮助==费用',
                        url: '/personalcenter/helpbuy/useragreement'
                    }]
                }
            },
            //个人中心-购买帮助-隐私服务
            {
                path: '/personalcenter/helpbuy/yinsi',
                name: 'yinsi',
                component: () =>
                    import ('./../../views/personalcenter/helpbuy/yinsi/yinsi.vue'),
                meta: {
                    name: 'personalcenterhelpbuyyinsi',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==购买帮助==隐私协议',
                        url: '/personalcenter/helpbuy/yinsi'
                    }]
                }
            }
        ]
    },
    //个人中心--优惠中心 discount
    {
        path: 'discount',
        component: () =>
            import ('./../../views/personalcenter/discount/index.vue'),
        meta: {
            name: 'discount',
            navstatus: false,
            breadnav: [{
                name: '个人中心-优惠中心',
                url: '/personalcenter/discount',
            }]
        },
        children: [{
                path: '/',
                redirect: '/personalcenter/discount/index'
            },
            {
                path: '/personalcenter/discount/index',
                name: 'discountindex',
                component: () =>
                    import ('./../../views/personalcenter/discount/index/index.vue'),
                meta: {
                    name: 'personalcenterdiscountindex',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==优惠中心==首页',
                        url: '/personalcenter/discount/index'
                    }]
                }
            },
            {
                path: '/personalcenter/discount/mydiscount',
                name: 'discountindex',
                component: () =>
                    import ('./../../views/personalcenter/discount/mydiscount/mydiscount.vue'),
                meta: {
                    name: 'personalcenterdiscountmydiscount',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==优惠中心==我的优惠卷',
                        url: '/personalcenter/discount/mydiscount'
                    }]
                }
            },
            {
                path: '/personalcenter/discount/discountshop',
                name: 'discountshop',
                component: () =>
                    import ('./../../views/personalcenter/discount/discountshop/index.vue'),
                meta: {
                    name: 'personalcenterdiscountdiscountshop',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==优惠中心==优惠卷店铺',
                        url: '/personalcenter/discount/discountshop'
                    }]
                }
            },
            {
                path: '/personalcenter/discount/discountcommodity',
                name: 'discountcommodity',
                component: () =>
                    import ('./../../views/personalcenter/discount/discountcommodity/index.vue'),
                meta: {
                    name: 'personalcenterdiscountcommodity',
                    navstatus: false,
                    breadnav: [{
                        name: '个人中心==优惠中心==优惠卷商品',
                        url: '/personalcenter/discount/discountcommodity'
                    }]
                }
            }

        ]
    },
    //个人中心==我的钱包
    {
        path: 'mypurse',
        // name: 'mypurse',
        component: () =>
            import ('./../../views/personalcenter/mypurse/index.vue'),
        meta: {
            name: 'mypurse',
            navstatus: false,
            //面包屑需要的参数
            breadnav: [{
                name: '个人中心==我的钱包首页',
                url: '/personalcenter/mypurse'
            }]
        },
        children: [{
                path: '/',
                redirect: '/personalcenter/mypurse/index'
            },
            //个人中心==我的钱包
            //个人中心==我的钱包 --首页(余额)
            {
                path: '/personalcenter/mypurse/index',
                name: 'personalcentermypurseindex',
                component: () =>
                    import ('./../../views/personalcenter/mypurse/index/index.vue'),
                meta: {
                    name: 'personalcentermypurseindex',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '个人中心==我的钱包==首页',
                        url: '/personalcenter/mypurse/index',
                    }]
                }
            },
            //个人中心==我的钱包[秀场] --首页
            {
                path: '/personalcenter/mypurse/livingpurse',
                name: 'personalcentermypurseliving',
                component: () =>
                    import ('./../../views/personalcenter/mypurse/livingpurse/index.vue'),
                meta: {
                    name: 'personalcenterlivingpurse',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '个人中心==我的秀场钱包==首页',
                        url: '/personalcenter/livingpurse/index',
                    }]
                }
            },
            {
                path: '/personalcenter/mypurse/balancedetail',
                name: 'personalcentermypursebalancedetail',
                component: () =>
                    import ('./../../views/personalcenter/mypurse/balancedetail/index.vue'),
                meta: {
                    name: 'personalcentermypursebalancedetail',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '个人中心==我的钱包==账单明细',
                        url: '/personalcenter/mypurse/balancedetail',
                    }]
                }
            },
            //个人中心==我的钱包 --提现页面
            {
                path: '/personalcenter/mypurse/getmoneyout',
                name: 'personalcentermypursegetmoneyout',
                component: () =>
                    import ('./../../views/personalcenter/mypurse/getmoneyout/getmoneyout.vue'),
                meta: {
                    name: 'personalcentermypursegetmoneyout',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '个人中心==我的钱包==提现页面',
                        url: '/personalcenter/mypurse/getmoneyout',
                    }]
                }
            },
            //个人中心==我的钱包 --提现  状态页面
            {
                path: '/personalcenter/mypurse/getmoneyoutstatus',
                name: 'personalcentermypursegetmoneyoutstatus',
                component: () =>
                    import ('./../../views/personalcenter/mypurse/getmoneyoutstatus/getmoneyoutstatus.vue'),
                meta: {
                    name: 'personalcentermypursegetmoneyoutstatus',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '个人中心==我的钱包==提现状态页面',
                        url: '/personalcenter/mypurse/getmoneyoutstatus',
                    }]
                }
            },
            //个人中心==我的钱包 --我的银行卡
            {
                path: '/personalcenter/mypurse/mycards',
                name: 'personalcentermypursemycards',
                component: () =>
                    import ('./../../views/personalcenter/mypurse/mycards/mycards.vue'),
                meta: {
                    name: 'personalcentermypursemycards',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '个人中心==我的钱包==我的银行卡',
                        url: '/personalcenter/mypurse/mycards',
                    }]
                }
            },
            //个人中心==我的钱包 --银行卡 绑定状态
            {
                path: '/personalcenter/mypurse/mycardsbding',
                name: 'personalcentermypursemycardsbding',
                component: () =>
                    import ('./../../views/personalcenter/mypurse/mycardsbding/mycardsbding.vue'),
                meta: {
                    name: 'personalcentermypursemycardsbding',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '个人中心==我的钱包==银行卡绑定状态',
                        url: '/personalcenter/mypurse/mycardsbding',
                    }]
                }
            },
            //个人中心==投诉建议
            {
                path: '/personalcenter/complaints',
                name: 'complaints',
                component: () =>
                    import ('./../../views/personalcenter/complaints/index.vue'),
                meta: {
                    name: 'complaints',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '投诉建议',
                        url: '/personalcenter/complaints',
                    }]
                }
            },
            //个人中心==会员权益
            {
                path: '/personalcenter/member',
                name: 'member',
                component: () =>
                    import ('./../../views/personalcenter/member/index.vue'),
                meta: {
                    name: 'member',
                    navstatus: false,
                    //面包屑需要的参数
                    breadnav: [{
                        name: '投诉建议',
                        url: '/personalcenter/member',
                    }]
                }
            },
        ]
    },
]