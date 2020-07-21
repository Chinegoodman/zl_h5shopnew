import Tim from "tim-js-sdk";
import COS from "cos-js-sdk-v5";
import {
    setsessionStorage,
    getsessionStorage
} from "@/utils/index.js";
import "xgplayer";
import Player from "xgplayer";
import FlvPlayer from "xgplayer-flv";
import { checkdevice } from "@/utils/checkdevice.js";
import complaints from '@/components/complaints.vue';
import viplevel from '@/components/viplevel.vue';
import downloadandopenapp from '../../../../components/downloadandopenapp.vue'
import { copy } from "@/utils/copy.js";
import {
    //   AddressEdit,
    //   Area,
    //   Calendar,
    //   Checkbox,
    //   CheckboxGroup,
    //   CountDown,
    //   DatetimePicker,
    //   Dialog,
    //   DropdownItem,
    //   Form,
    //   Field,
    //   ImagePreview,
    //   Locale,
    //   Notify,
    //   Picker,
    //   Sku,
    //   SwipeCell,
    // ====项目中可能用到的===
    //  Uploader,
    Tab,
    Tabs,
    List,
    // Lazyload,
    // ====项目中可能用到的===
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'

export default {
    name: "livingxiudetails",
    components: {
        complaints,
        viplevel,
        downloadandopenapp,
        vanTab: Tab,
        vanTabs: Tabs,
        vanList: List
    },
    data() {
        return {
            livinglidata: "",
            liveId: '',
            active: '', //直播间榜单tab切换当前个
            anchormuteflag: false, //主播是否静音标致
            anchormsgshowstate: false, //主播信息展示
            isAnchorFlag: 0, //是否是主播
            covertypedata: 'downloadcovershow', //下载及启动APP组件类别
            downloadcovershow: false, //下载及启动APP弹层
            linkurldownload: '', //下载链接
            linkurlopen: '', //拉起APP的链接
            titlist: [ //直播间榜单tab标题数组
                {
                    category_name: "在线用户",
                    tabindex: 0
                },
                {
                    category_name: "本场榜",
                    tabindex: 1
                }
            ],
            listloading: false, //在线用户vantlist加载
            listfinished: false,
            finished_text: '',
            vanerror: false,
            listloading_ben: false, //本场棒vantlist加载
            listfinished_ben: false,
            finished_text_ben: '',
            vanerror_ben: false,
            watchcount: 0, //直播观看人数
            countchangetimer: null,
            // livingurl:'http://liveali.ifeng.com/live/CCTV.m3u8',//直播地址
            goodschoosestatus: false, //商品选择模块 默认隐藏
            attention_flag: '',
            //直播相关
            player: "", //player实例
            canplaythroughstatus: false,
            reloadtimes: 0,
            timgroupstatus: false, //tim群聊默认隐藏
            livingendstatus: true, // 直播  默认为未结束
            confirmordermbstatus: false, //直播间 主播推送到用户的立即付款状态 默认 false
            confirmorderdata: '', //直播间 主播推送到用户的立即付款 相关数据

            goodsList: [], //直播间的商品列表
            giftList: [], //礼物列表
            topgiftList: [], //前三排列列表
            onlinesList: [], //在线人数列表
            list_datatype: 0, //点击在线人数弹出层列表的数据展示列表类型
            hasmorepage: 1, //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
            nextpage: 1, //在线人数分页
            nextPage_ben: 1, //本场榜分布
            topListByList: [], //直播间礼物榜单-本场榜
            moreboxshellstate: false, //更多弹层flag
            shelldanchangstate: false, //单场榜弹层显示flag
            // currentgood:[],//当前商品【只有一条商品】

            controlstatus: false, //管理员权限弹窗
            controlstatus_1: true, //管理员权限弹窗 == 禁言 或者 踢人
            controlstatus_2: false, //管理员权限弹窗 == 禁言时长选择
            talkinguid: '', //选中的聊天者的 id

            hlrtipsstatus: false, //红利人说明 状态 默认false不展示

            selfsf: 0, //自己的 身份标识  0 普通用户， 1 房间主播， 2 房间内管理员
            targetsf: 0, // 被查看用户 身份标识 0 普通用户， 1 房间主播， 2 房间内管理员

            // IM TIM 相关参数====================开始
            options: {
                SDKAppID: 1400068060 // 接入时需要将0替换为您的即时通信应用的 SDKAppIDw
            },
            timresdata: "", //登录成功  或 退出登录 返回的信息
            timtxt: "", //输入框输入的文本内容
            imiptshowstatus: false, //输入框的默认状态
            currentpersonid: "", //userId
            conversationID: "", //会话ID
            messageInfo: "收到的消息", //接受消息文本
            messageList: [], //群聊内容    ({isvip,name,msgtxt});
            giftmsgone: {
                chatType: "",
                conversationId: "",
                giftContent: {
                    giftCount: "",
                    giftIcon: "",
                    giftId: "",
                    giftName: "",
                    giftType: "",
                    giftUrl: "",
                    receiveId: "",
                    receiveName: "",
                    msgType: "",
                },
                sendUserInfo: {
                    face_url: "",
                    id: "",
                    name: ""
                }
            }, //礼物通道1内容
            giftmsgtwo: {
                chatType: "",
                conversationId: "",
                giftContent: {
                    giftCount: "",
                    giftIcon: "",
                    giftId: "",
                    giftName: "",
                    giftType: "",
                    giftUrl: "",
                    receiveId: "",
                    receiveName: "",
                    msgType: "",
                },
                sendUserInfo: {
                    face_url: "",
                    id: "",
                    name: ""
                }
            }, //礼物通道2内容
            time_state: true, //是否完成数据全程走完的标致 控制礼物滑出占用轨道
            time_state_ii: true, //滑到2是否完成标致 控制礼物滑出占用轨道
            liStyleGift_active_one: false, //礼物通道1开始动画class条件
            liStyleNoneone: false, //礼物通道1停止动画class条件
            liStyleGift_active_tow: false, //礼物通道2开始动画class条件
            liStyleNonetow: false, //礼物通道2停止动画class条件
            userid_old: '', //会话ID
            userid_old_ii: '', //会话ID
            giftId_old: '', //存礼物ID01
            giftId_old_ii: '', //存礼物ID02
            gift_timer_one: null, //礼物定时器通道01
            gift_timer_two: null, //礼物定时器通道02
            samegiftflag: 0, //同一用户同一礼物 1为同一用户 0反之
            dataStore: [], //队列里的数组
            giftcountall_one: 0,
            giftcountall_two: 0,
            giftNumFlag01: false, //礼物数字flag 01
            giftNumFlag02: false, //礼物数字flag 02
            manygift_timer_one: null,
            manygift_timer_two: null,
            bigLiStyleGiftFlag: false, //大礼物开始动画标致
            bigLiStyleNoneFlag: false, //大礼物结束动画标致
            bigGiftMsgone: [], //大礼物全局通道一
            bigGiftMsgTwo: [], //大礼物全局通道二
            nextReqMessageID: "", //用于续拉，分页续拉时需传入该字段。
            conversationList: [], // 会话列表，用该列表覆盖原有的会话列表,
            isActive: 0, //默认选中第一个,
            userName: "用户名",
            receivemsgdata: '',

            IMtanchuangTimer: '', //im弹窗
            IMtanchuang_currentdata: '', //im弹窗 历史数据保存并判断是否为同一条数据
            // IM TIM 相关参数====================结束
            //投诉建议====================start
            complaintsShellShow: false,
            livingToComplaintsFlag: '', //直播页调投诉建议组件传到组件的标记
            //投诉建议====================end
            //点赞====================start
            obj_canvas: {},
            obj_ctx: {},
            praiseCount: 0,
            height: 300, //点赞
            width: 90, //点赞
            queue: {}, //点赞
            anima_timer: null, //点赞定时器    
            isFirst: 1
                //点赞====================end

        };
    },
    computed: {
        // 直播相关
        wdwidth() {
            return document.documentElement.clientWidth;
        },
        wdheight() {
            return document.documentElement.clientHeight;
        },
        hasStartstatus: function() {
            return this.player.hasStart;
        },
        currentTime: function() {
            return this.player.currentTime;
        },

        // 当前在售的商品
        currentgood: function() {
            let that = this;
            // console.log(that.goodsList);
            // let currentgoodnew = that.goodsList.filter(item=>{
            //   item.is_saling == 1;
            // });
            // let currentgoodnew = that.goodsList.map(item=>{
            //   if(item.is_saling == 1){
            //     return item
            //   }else{
            //     return;
            //   }
            // })
            let currentgoodnew = "";
            // if (that.goodsList.length == 0||that.goodsList==null||that.goodsList==''||that.goodsList==undefined) {
            if (
                that.goodsList == null ||
                that.goodsList == "" ||
                that.goodsList == undefined
            ) {
                currentgoodnew = "";
            } else {
                for (let i = 0; i < that.goodsList.length; i++) {
                    if (that.goodsList[i].is_saling == 1) {
                        currentgoodnew = that.goodsList[i];
                    }
                }
            }
            return currentgoodnew;
        },
        // tim实例化
        tim() {
            return Tim.create(this.options);
        }
    },
    watch: {
        // 是否开始直播？ 显示群聊
        hasStartstatus(newval, oldval) {
            if (newval == true) {
                this.showtimtalk();
            }
        }
    },
    mounted() {
        // this.livinglidata = getsessionStorage("livinglidata-xiu");
        // console.log('this.livinglidata');
        // console.log(this.livinglidata);
        //获取直播间详情
        let that = this;
        that.liveId = that.$route.query.liveId;
        that.getLiveDetailInfo(that.liveId, function() {
            // this.quitGroup();
            // 0 普通级别，日志量较多，接入时建议使用
            // 1 release级别，SDK 输出关键信息，生产环境时建议使用
            // 2 告警级别，SDK 只输出告警和错误级别的日志
            // 3 错误级别，SDK 只输出错误级别的日志
            // 4 无日志级别，SDK 将不打印任何日志
            that.tim.setLogLevel(3); //IM日志级别
            that.logoutfn();
            // this.player.destroy(true);
            that.joinOrLeaveRoomXC(1); //加入群聊  后台的接口

            //是否关注直播
            that.follow();

            // 直播相关

            //轮询直播观看人数与点赞数
            that.getXiuChangLivingUserAndPraise();
            that.countchangetimer = setInterval(function() {
                that.getXiuChangLivingUserAndPraise();
            }, 5000);
            if (
                checkdevice() == "weixin" ||
                checkdevice() == "anzhuo" ||
                checkdevice() == "ios"
            ) {
                that.player = new Player({
                    //解除注释 m3u8方法
                    id: "videodom",
                    // url: "rtmp://58.200.131.2:1935/livetv/dftv", //rtmp
                    // url: "http://pili-publish.test.zhulihr.com/izhuazhoutest/59.flv", //flv
                    // url: "http://pili-publish.test.zhulihr.com/izhuazhoutest/59.m3u8", //m3u8
                    url: that.livinglidata.streamAddrHls, //m3u8
                    //   url: 'rtmp://pili-publish.test.zhulihr.com/izhuazhoutest/59',//rtmp
                    // url: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',//cctv6测试
                    //   url: "http://ivi.bupt.edu.cn/hls/hunanhd.m3u8", //湖南卫视测试
                    // url: 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8',//IPHONE测试
                    // url: 'http://ivi.bupt.edu.cn/hls/cctv13.m3u8',//cctv13测试
                    // url: 'http://app.inke.com/inke/v/video.mp4',//MP4视频
                    // cssFullscreen: false,//网页样式全屏
                    playsinline: true,
                    "x5-video-player-type": "h5", //微信同层播放
                    "x5-video-orientation": "portraint",
                    "x5-video-player-fullscreen": true, //微信全屏播放
                    width: that.wdwidth,
                    height: that.wdheight,
                    // autoplay: true,
                    // autoplayMuted: true,
                    // videoInit: true,//初始化显示视频首帧
                    poster: that.livinglidata.cover, //封面图是当播放器初始化后在用户点击播放按钮前显示的图像。
                    ignores: ["fullscreen", "volume", "play"], //volume 量控制  progress 视频进度条  play控制条的播放、暂停按钮  loading加载提示  fullscreen全屏切换 error报错提示  time当前播放时间/视频时长  replay重播交互与提示
                    closeVideoClick: true,
                    closeVideoDblclick: true,
                    closeVideoTouch: true,

                    autoplay: true,
                    // autoplayMuted: true,
                    preloadTime: 30, //预加载时长(秒)	30
                    isLive: true,
                    cors: true
                });
            } else if (checkdevice() == "pc") {
                that.player = new FlvPlayer({
                    //解除注释 flv方法
                    id: "videodom",
                    // url: "http://pili-publish.test.zhulihr.com/izhuazhoutest/59.flv", //flv
                    url: that.livinglidata.streamAddrFlv, //flv
                    // url: (that.livinglidata.streamAddrHls).replace(/m3u8/, "flv"), //flv
                    // url: "http://pili-publish.test.zhulihr.com/izhuazhoutest/6000116.flv", //flv
                    //   url: 'http://pili-publish.test.zhulihr.com/izhuazhoutest/59.m3u8',//m3u8
                    //   url: 'rtmp://pili-publish.test.zhulihr.com/izhuazhoutest/59',//rtmp
                    // url: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',//cctv6测试
                    //   url: "http://ivi.bupt.edu.cn/hls/hunanhd.m3u8", //湖南卫视测试
                    // url: 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8',//IPHONE测试
                    // url: 'http://ivi.bupt.edu.cn/hls/cctv13.m3u8',//cctv13测试
                    // url: 'http://app.inke.com/inke/v/video.mp4',//MP4视频
                    // cssFullscreen: false,//网页样式全屏
                    "x5-video-player-type": "h5", //微信同层播放
                    "x5-video-player-fullscreen": true, //微信全屏播放
                    width: that.wdwidth,
                    height: that.wdheight,
                    // autoplay: true,
                    // autoplayMuted: true,
                    // videoInit: true,//初始化显示视频首帧
                    poster: that.livinglidata.cover, //封面图是当播放器初始化后在用户点击播放按钮前显示的图像。
                    ignores: ["fullscreen", "volume", "play"], //volume 量控制  progress 视频进度条  play控制条的播放、暂停按钮  loading加载提示  fullscreen全屏切换 error报错提示  time当前播放时间/视频时长  replay重播交互与提示
                    closeVideoClick: true,
                    closeVideoDblclick: true,
                    closeVideoTouch: true,

                    autoplay: true,
                    // autoplayMuted: true,
                    preloadTime: 30, //预加载时长(秒)	30
                    isLive: true,
                    cors: true
                });
            }

            that.$toast.loading("视频正在加载中。。。。");
            // 播放器异常事件
            // 直播结束
            that.player.on("ended", function() {
                console.log("视频 ended");
                that.canplaythroughstatus = false;
                that.livingendstatus = false;
            });
            // 直播错误
            that.player.on("error", function() {
                console.log("视频 error");
                that.canplaythroughstatus = false;
                if (that.reloadtimes <= 15) { //30*2=60秒后
                    setTimeout(() => {
                        that.reloadtimes = that.reloadtimes + 1;
                        // that.player.start();
                        // that.player.play();
                        that.player.reload();
                    }, 2000);
                } else {
                    // alert(111);
                    that.player.destroy(true);
                    window.location.reload();
                }
            });
            // seek播放
            that.player.on("seeking", function() {
                // console.log("seek播放");
            });
            // seek播放结束
            that.player.on("seeked", function() {
                // console.log("seek播放结束");
            });
            // 等待加载数据
            that.player.on("waiting", function() {
                console.log("等待加载数据");
                that.canplaythroughstatus = false;
            });
            // 视频可以播放
            that.player.on("canplay", function() {
                // console.log("视频可以播放");
            });
            // 视频可以流畅播放
            that.player.on("canplaythrough", function() {
                console.log("视频可以流畅播放");
                that.$toast.clear();
                that.canplaythroughstatus = true;
            });

            that.getgoodsList();
            // that.getgiftList();
            that.gettopgiftList();
            that.getAnchorMuteState();

            // TIM相关=================================开始
            // 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
            // let tim = Tim.create(options); // SDK 实例通常用 tim 表示
            // 注册 COS SDK 插件
            that.tim.registerPlugin({ "cos-js-sdk": COS });
            that.loginfn();

            // TIM相关=================================结束

            //点赞
            that.obj_canvas = document.getElementById("bubble");
            that.obj_ctx = that.obj_canvas.getContext("2d");


        });
    },
    methods: {
        // 阻止冒泡
        returnfn() {
            return false;
        },
        //返回上一页
        returnprevpage() {
            let that = this;
            that.$router.push({
                path: `/shop/index`,
                query: {
                    tab: this.$route.query.tab
                }
            });
        },
        //跳转到会员权益
        gotovippage() {
            let that = this;
            that.$router.push({
                path: `/personalcenter/member`
            });
        },
        //跳转到直播个人中心 
        gotolivingpersonal() {
            this.$router.push({
                path: `/living/livingpersonalpage`,
                query: {
                    shopId: this.livinglidata.shopId,
                    shop_userId: this.livinglidata.uid,
                    tab: this.$route.query.tab
                }
            });
        },
        // 跳转到商品详情
        gotodetails(skuid) {
            let that = this;
            // this.$router.push({
            //   name: "productdetails",
            //   params: {
            //     product_id: skuid,
            //     webtype: 1
            //   }
            // });
            that.$router.push({
                path: `/shop/productdetails/${skuid}/1`,
                query: { liveId: that.livinglidata.uid }
            });
        },

        // 直播及群聊相关 开始
        // 播放直播、视频 事件
        videopaly() {
            let that = this;
            if (that.canplaythroughstatus) {
                setTimeout(() => {
                    that.player.start();
                    that.player.play();
                }, 0);
            }
        },
        videoplay() {
            if (this.hasStartstatus) {
                // console.log('正在播放');
            } else {
                this.videopaly();
            }
        },
        // tim群聊显示
        showtimtalk() {
            this.timgroupstatus = true;
        },
        // 直播及群聊相关 结束

        // 关注 与 取消关注 主播
        follow(currentstatus) {
            let that = this;
            if (!that.iflogin()) {
                return;
            }
            if (!currentstatus) {
                // 当前 为 非关住状态
                that.api.living
                    .attentionadd({
                        uid: that.$store.state.user.userid,
                        attid: that.livinglidata.uid
                    })
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.code == 1) {
                            that.attention_flag = 2;
                        }
                    })
            } else {
                // 当前 为 关住状态
                that.api.living
                    .attentiondelete({
                        uid: that.$store.state.user.userid,
                        attid: that.livinglidata.uid
                    })
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.code == 1) {
                            that.attention_flag = 1;
                        }
                    })
            }
        },
        //获取直播间详情
        getLiveDetailInfo(liveId, fn) {
            let that = this;
            this.api.xiuchangliving
                .getXiuChangLiveInfo({
                    liveId: liveId,
                })
                .then(res => {
                    console.log('res.data08');
                    console.log(res.data);
                    if (res.data.code == 1) {
                        if (
                            res.data.data != null ||
                            res.data.data != undefined ||
                            res.data.data != ""
                        ) {
                            setTimeout(fn, 500);
                            that.livinglidata = res.data.data;
                        } else {
                            that.livinglidata = [];
                        }
                    }
                })
        },
        //直播间在线用户与本场榜tab切换
        titleclick(index) {
            let that = this;
            that.active = index;
            console.log(index);
            that.list_datatype = index;
            that.finished_text = '';
            that.finished_text_ben = '';
            that.onlinesList = [];
            that.topListByList = [];
            that.nextpage = 1;
            that.nextPage_ben = 1;
            that.hasmorepage = 1;
            if (index == 0) {
                that.getOnlines();
            } else {
                that.getTopListByLive();
            }
        },
        //在线人数列表
        getOnlines() {
            let that = this;
            that.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 200000
            });
            this.api.xiuchangliving
                .liveOnLines({
                    liveId: that.liveId,
                    page: that.nextpage,
                    pageSize: 20
                })
                .then(res => {
                    that.$toast.clear();
                    that.listloading = false;
                    console.log('res.data06在线人数列表');
                    console.log(res.data);
                    if (res.data.code == 1) {
                        that.nextpage = res.data.data.page;
                        if (that.nextPage == res.data.data.totalPage && that.onlinesList != []) {
                            that.listfinished = true;
                            that.listloading = false;
                            that.finished_text = '亲~已经到底了';
                            return;
                        }
                        if (res.data.data.list && res.data.data.list.length > 0) {
                            // that.nodatashow = false;
                            that.hasmorepage = 2;
                            res.data.data.list.forEach(e => {
                                that.onlinesList.push(e);
                            });
                        }
                        if (that.nextpage != res.data.data.totalPage) {
                            that.listfinished = false;
                            that.listloading = false;
                        } else {
                            if (that.hasmorepage === 1) {
                                // that.nodatashow = true;
                            } else {
                                that.listloading = false;
                                that.finished_text = '亲~已经到底了';
                            }
                            that.listfinished = true;
                        }
                        that.$forceUpdate();
                        that.$toast.clear();
                    }
                })
        },
        //本场榜列表
        getTopListByLive() {
            let that = this;
            that.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 200000
            });
            this.api.xiuchangliving
                .topgiftList({
                    liveId: that.liveId,
                    page: that.nextPage_ben,
                    pageSize: 20
                })
                .then(res => {
                    that.$toast.clear();
                    that.listloading_ben = false;
                    console.log('res.data06直播间礼物榜单');
                    console.log(res.data);
                    that.nextPage_ben = res.data.data.page;
                    if (res.data.data.list && res.data.data.list.length > 0) {
                        // that.nodatashow = false;
                        that.hasmorepage = 2;
                        res.data.data.list.forEach(e => {
                            that.topListByList.push(e);
                        });
                    }
                    if (that.nextPage_ben != res.data.data.totalPage) {
                        that.listfinished_ben = false;
                        that.listloading_ben = false;
                    } else {
                        if (that.hasmorepage === 1) {
                            // that.nodatashow = true;
                            that.listloading_ben = false;
                            that.finished_text_ben = '暂时没有榜单哦';
                        } else {
                            that.listloading_ben = false;
                            that.finished_text_ben = '亲~已经到底了';
                        }
                        that.listfinished_ben = true;
                    }
                    that.nextPage_ben++;
                    that.$forceUpdate();
                    that.$toast.clear();
                })
        },
        //获取用户角色
        getUserRole() {
            let that = this;
            this.api.xiuchangliving
                .userRole({
                    liveId: that.liveId,
                    userId: that.livinglidata.uid,
                    opUserId: that.$store.state.user.userid
                })
                .then(res => {
                    if (res.data.code == 1) {
                        if (res.data.data.otherIdentity == 1) {
                            that.isAnchorFlag = true;
                        } else {
                            that.isAnchorFlag = false;
                        }
                    }
                })
        },
        //复制当前主播ID
        copyCurrentId(id) {
            let that = this;
            console.log(id);
            copy(id);
            console.log(1111);
            that.$toast("已复制");
        },
        //获取静音模式状态
        getAnchorMuteState() {
            let that = this;
            this.api.xiuchangliving
                .anchorMuteState({
                    liveId: that.liveId
                })
                .then(res => {
                    if (res.data.code == 1) {
                        if (res.data.data == 1) {
                            that.anchormuteflag = true;
                        } else {
                            that.anchormuteflag = false;
                        }
                    }
                })
        },
        //获取礼物排名
        gettopgiftList() {
            let that = this;
            this.api.xiuchangliving
                .topgiftList({
                    liveId: that.liveId,
                    page: 1,
                    pageSize: 3
                })
                .then(res => {
                    console.log('res.data06');
                    console.log(res.data);
                    if (res.data.code == 1) {
                        if (
                            res.data.data.list != null ||
                            res.data.data.list != undefined ||
                            res.data.data.list != ""
                        ) {
                            that.topgiftList = res.data.data.list;
                        } else {
                            that.topgiftList = [];
                        }
                    }
                })
        },
        //获取礼物列表
        getgiftList() {
            let that = this;
            that.api.xiuchangliving
                .giftList({})
                .then(res => {
                    if (res.data.code == 1) {
                        if (
                            res.data.data.list != null ||
                            res.data.data.list != undefined ||
                            res.data.data.list != ""
                        ) {
                            that.goodsList = res.data.data.list;
                        } else {
                            that.goodsList = [];
                        }
                    }
                })

        },
        // 直播间商品列表
        getgoodsList() {
            let that = this;
            this.api.living
                .goodsList({
                    operatorId: that.livinglidata.uid,
                    liveId: that.liveId
                })
                .then(res => {
                    if (res.data.code == 1) {
                        if (
                            res.data.data.list != null ||
                            res.data.data.list != undefined ||
                            res.data.data.list != ""
                        ) {
                            that.goodsList = res.data.data.list;
                        } else {
                            that.goodsList = [];
                        }
                    }
                })
        },
        // 加入购物车
        goodadd(sku_id, shopid) {
            let that = this;
            if (!that.iflogin()) {
                return;
            }
            that.api.productdetails
                .additem4Live({
                    skuId: sku_id,
                    userId: that.$store.state.user.userid,
                    roomId: that.livinglidata.id, //直播间ID
                    shopId: shopid,
                    quantity: 1
                })
                .then(res => {
                    // console.log(res.data);
                    // that.loadingstatus = false;
                    if (res.data.info == "请求执行成功") {
                        that.$toast({
                            message: "加入购物车成功",
                            duration: 810,
                            forbidClick: true
                        });
                        // that.closeoptionsselect();
                    } else {
                        that.$toast({
                            message: "加入购物车失败，请重试",
                            duration: 810,
                            forbidClick: true
                        });
                    }
                })
        },
        //立即购买 点击事件 直播弹窗 
        confirmorderclick(confirmorderdata) {
            let that = this;
            let confirmorderdatanew = confirmorderdata;
            // console.log(confirmorderdatanew.shopId);
            let orderListdatanew = {
                "productPic": confirmorderdatanew.imageUrl,
                "productName": confirmorderdatanew.goodsTitle,
                "payAmount": confirmorderdatanew.currPrice,
                "totalAmount": confirmorderdatanew.currPrice,
                "totalQuantity": 1,
                "productPrice": confirmorderdatanew.currPrice,
                "productQuantity": 1,
                "shopId": confirmorderdatanew.shopId,
                "shopName": confirmorderdatanew.specsInfo,
                "shopIcon": confirmorderdatanew.shopLogo,
                "receiverId": "",
                "productAttr": confirmorderdatanew.specInfo,
                "productSkuId": confirmorderdatanew.skuId,
                "productWeight": confirmorderdatanew.weight,
                "goldenPrice": '',
                "manualFee": confirmorderdatanew.manualFee,
                "serviceFee": confirmorderdatanew.serviceFee,
                "designFee": confirmorderdatanew.designFee ? confirmorderdatanew.designFee : 0,
                "insured_price": confirmorderdatanew.insuredPrice,
                // "liveId":confirmorderdatanew.
                "liveId": that.livinglidata.id,
            };
            setsessionStorage("pagefrom", 'livingdetails');
            setsessionStorage("orderListdata", orderListdatanew);
            this.$router.push({ name: 'confirmorder' });
        },
        // 是否登录
        iflogin() {
            let that = this;
            // H5端
            if (!that.$store.state.user.userid ||
                that.$store.state.user.userid == 0
            ) {
                that.$toast({
                    message: "暂未登录，请先登录",
                    duration: 810,
                    forbidClick: true
                });
                setTimeout(() => {
                    that.gotologin();
                }, 810);
                return false;
            } else {
                return true;
            }
        },

        // postmsg IM聊天
        postmsg() {
            let that = this;
            if (that.timtxt == "") {
                that.$toast("输入框内容为空,请编辑好再发送！");
            } else {
                that.txtpost();
            }
        },
        //点击用户评论==获取自己及说话用户的身份信息
        // shutUp_Kickout(talkinguid){
        //   if(talkinguid == 'noid'){
        //     return;
        //   }
        //   let that = this;
        //   this.api.living.getLiveInfo({
        //     liveId:that.livinglidata.id,
        //     operterId:that.$store.state.user.userid,
        //     userId:talkinguid,
        //   }).then(res=>{
        //     if(res.data.code==1){
        //       let resdata = res.data.data;
        //       that.selfsf = resdata.identity;
        //       that.targetsf = resdata.otherIdentity;

        //       if(that.targetsf==0&&that.selfsf==2||that.targetsf==0&&that.selfsf==1){
        //         that.controlstatus=true;
        //         that.controlstatus_1=true;
        //         that.talkinguid=talkinguid;
        //       }
        //     }
        // },
        // 禁言
        jinyan(type) {

        },
        // 踢出直播间
        tichuzbj() {
            let that = this;
            this.api.living.KickoutGroup({
                groupId: that.livinglidata.gid.toString(),
                kickoutId: that.talkinguid,
            }).then(res => {
                // console.log(res);
                if (res.data.code == 1) {
                    that.$toast(res.data.data);
                    that.controlstatus = false; //管理员权限弹窗
                    that.controlstatus_1 = true; //管理员权限弹窗 == 禁言 或者 踢人
                    that.controlstatus_2 = false; //管理员权限弹窗 == 禁言时长选择
                    that.talkinguid = ''; //选中的聊天者的 id
                } else {
                    that.$toast(res.data.info);
                }
            })
        },

        // 加入或者离开直播间
        joinOrLeaveRoomXC(inorout) {
            let that = this;
            this.api.xiuchangliving.joinXiuChangOrLeaveRoom({
                userId: that.$store.state.user.userid,
                liveId: that.liveId,
                // touid: that.livinglidata.uid,
                type: inorout, //0离开 1 加入
            }).then(res => {
                console.log(res);
            })
        },

        // IM相关==============开始===============================================================
        // 登录
        loginfn() {
            let that = this;
            if (!that.iflogin()) {
                return;
            }
            let promiselogin = this.tim.login({
                userID: that.$store.state.user.userid,
                userSig: that.$store.state.user.sig
                    // "eJxFkF1PgzAUhv8LtzPS0pbBkl2wreoM82sa2RUp0LmTASWloNP434fNiJfneXJy3vf8OK-x9lo0DRSpMCnRhTNzkHNlsfxqQMtU7I3UA8aMMQ*h0fZSt6DqQXgIM*wRhP4lFLI2sAe7SOiFtvAxjBv*vFzfZA*h*333BhGfLuikFEmmJiEXu-jUdisXynaZHMKsY7GKYFFy6G9fnhR5rz29eXT1Z5ms3VUeVXTrHo6Bj-t7jnd51Ufz*XisOKa22F90OkTzA*SP*QxU0laaMsoYCfCFizxXXW1Sc2qk-cTvGbkGVU0_"
            });
            promiselogin
                .then(function(imResponse) {
                    // console.log(imResponse.data); // 登录成功
                    that.timresdata = imResponse.data;
                    that.joinGroup(); //加入群聊
                    that.receiveMsg(); //接受消息 //刷新页面时 加入群聊 不会走成功
                    that.timgroupstatus = true;
                })
        },
        // 退出登录
        logoutfn() {
            let that = this;
            // let logoutready = function(){
            that.tim.logout();
            // }
            // that.tim.on(Tim.EVENT.SDK_READY, logoutready);
            this.timresdata = "";
        },
        // 同一设备，同一帐号，多页面登录被踢 tim自带事件
        onKickedOut(event) {
            // alert("同一设备，同一帐号，多页面登录被踢le");
            console.log(event.data.type); // mutipleAccount(同一设备，同一帐号，多页面登录被踢)
        },
        // 发送消息
        txtpost() {
            let that = this;
            if (that.timtxt == '') { return; }

            let timestamp = parseInt(new Date().getTime() / 1000);
            // 发送文本消息，Web 端与小程序端相同
            // 1. 创建消息实例，接口返回的实例可以上屏
            let message = that.tim.createCustomMessage({
                //自定义消息
                to: that.livinglidata.gid.toString(),
                conversationType: Tim.TYPES.CONV_GROUP,
                type: Tim.TYPES.MSG_CUSTOM,
                payload: {
                    // data:{
                    data: JSON.stringify({
                        conversationId: that.livinglidata.gid,
                        chatType: "group",
                        msgType: "text",
                        sendUserInfo: {
                            id: that.$store.state.user.userid,
                            name: that.$store.state.user.userdata.userInfo.nickname,
                            isVip: that.$store.state.user.userdata.userInfo.is_vip
                        },
                        msgContent: {
                            text: that.timtxt,
                            subText: "",
                            url: "",
                            skuId: 0,
                            skuIDString: "",
                            shopId: "",
                            receiveId: ""
                        },
                        timestamp: timestamp
                    }),
                    // },
                    description: "",
                    extension: ""
                }
            });
            // 2. 发送消息
            let promise = that.tim.sendMessage(message);
            that.$toast.loading("发送中...");
            promise
                .then(function(imResponse) {
                    // 发送成功
                    // console.log(imResponse + "发送成功了");

                    let msgtxt = that.timtxt;
                    let name = that.$store.state.user.userdata.userInfo.nickname;
                    let isvip = that.$store.state.user.userdata.userInfo.is_vip;
                    let talkinguid = 'noid';
                    that.messageList.push({ isvip, name, msgtxt, talkinguid });
                    setTimeout(() => {
                        that.imscrollbottom();
                    }, 0);

                    // console.log(imResponse);
                    that.$toast.clear();
                    that.timtxt = "";
                    that.imiptshowstatus = false;
                })
                .catch(function(imError) {
                    // 发送失败
                    console.warn("sendMessage error:", imError);
                    that.$toast("发送失败，请重试");
                    // debugger;
                    if (imError == 'Error: 操作权限不足，例如 Public 群组中普通成员尝试执行踢人操作，但只有 App 管理员才有权限。') {
                        // debugger;
                        that.tim.logout();
                        that.loginfn();
                    }
                    // that.$toast.clear();
                    that.imiptshowstatus = false;
                });
            // that.tim.on(Tim.EVENT.SDK_READY, dotxtpost);
        },
        // 发送图片
        timimgchange() {
            let that = this;
            // Web 端发送图片消息
            // 1. 创建消息实例，接口返回的实例可以上屏
            let message = that.tim.createImageMessage({
                // to: that.currentpersonid,
                to: that.livinglidata.gid.toString(),
                // conversationType: Tim.TYPES.CONV_C2C,
                conversationType: Tim.TYPES.CONV_GROUP,
                payload: {
                    file: document.getElementById("imagePicker")
                },
                onProgress: function(event) {
                    console.log("file uploading:", event);
                }
            });
            // 2. 发送消息
            let promise = that.tim.sendMessage(message);
            promise
                .then(function(imResponse) {
                    // 发送成功
                    console.log(imResponse);
                })
                .catch(function(imError) {
                    // 发送失败
                    console.warn("sendMessage error:", imError);
                });
        },
        //接收消息
        receiveMsg() {
            let that = this;
            let onMessageReceived = function(event) {
                let msgdata = JSON.parse(event.data[0].payload.data);
                let msgcontent = msgdata.msgContent;
                if (msgdata.timestamp == that.IMtanchuang_currentdata.timestamp) {
                    return;
                }
                that.IMtanchuang_currentdata = msgdata;
                console.log('msgdata');
                console.log(msgdata);
                // 获取当前群消息
                if (msgdata.conversationId == that.livinglidata.gid) {
                    // console.log(msgdata.msgContent);
                    // console.log(msgdata.msgContent.text);
                    // console.log(msgdata.sendUserInfo);
                    that.receivemsgdata = msgdata;
                    let talkinguid = 'noid';
                    // console.log(msgdata);
                    if (msgdata.msgType == "text") {
                        // 收到用户发送的消息
                        let msgtxt = msgdata.msgContent.text;
                        let comename = msgdata.sendUserInfo.name;
                        let isvip = msgdata.sendUserInfo.isVip;
                        // console.log(msgdata.sendUserInfo);
                        talkinguid = msgdata.sendUserInfo.id;
                        if (that.livinglidata.uid == msgdata.sendUserInfo.id) {
                            //主播isvip为-2
                            let isvip = -2;
                            that.messageList.push({ isvip, comename, msgtxt, talkinguid });
                        } else {
                            that.messageList.push({ isvip, comename, msgtxt, talkinguid });
                        }
                    } else if (msgdata.msgType == "hello") {
                        // 收到用户进入群聊时的 系统消息
                        let comename = msgdata.sendUserInfo.name;
                        let msgtxt = `来了`;
                        let isvip = msgdata.sendUserInfo.isVip;
                        that.messageList.push({ comename, isvip, msgtxt, talkinguid });
                    } else if (msgdata.msgType == "endLive") {
                        // 收到 直播间结束 关闭的消息
                        that.livingendstatus = false;
                        that.quitGroup();
                        that.logoutfn();
                        that.player.destroy(true);
                    } else if (msgdata.msgType == "switchGoods") {
                        // 主播切换商品了
                        // let msgtxt = `主播切换商品了`;
                        // let name = "系统公告";
                        // let isvip = msgdata.sendUserInfo.isVip;
                        // that.messageList.push({ isvip, name, msgtxt });
                        that.getgoodsList();
                    } else if (msgdata.msgType == "kickout") {
                        // 收到 主播或者管理员 踢人了 的消息
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        // let msgtxt = `踢人了`;
                        let msgtxt = '你被踢出了直播间！';
                        if (that.receivemsgdata.msgContent.text == that.$store.state.user.userid) {
                            let comename = "系统公告";
                            let isvip = -1;
                            that.messageList.push({ comename, isvip: isvip, msgtxt, talkinguid });
                            that.$router.go(-1);
                        }
                    } else if (msgdata.msgType == "like") {
                        // 收到 点赞消息 的消息
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        let msgtxt = `给主播点了赞`;
                        let comename = msgdata.sendUserInfo.name;
                        // let name = "系统公告";
                        let isvip = msgdata.sendUserInfo.isVip;
                        that.messageList.push({ comename, isvip, msgtxt, talkinguid });
                    } else if (msgdata.msgType == "announcement") {
                        // 收到 公告消息 的消息
                        let msgtxt = that.receivemsgdata.msgContent.text;
                        let name = '系统公告';
                        let comename = `${name}：${msgdata.sendUserInfo.name}`;
                        let isvip = -1;
                        that.messageList.push({ comename, isvip, msgtxt, talkinguid });
                    } else if (msgdata.msgType == "shopCat") {
                        // 收到 用户把商品加入购物车消息 的消息
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        let name = '系统公告';
                        let comename = `${name}：${msgdata.sendUserInfo.name}`;
                        let msgtxt = `把商品加入购物车`;
                        let isvip = -1;
                        that.messageList.push({ comename, isvip, msgtxt, talkinguid });
                    } else if (msgdata.msgType == "system_buySuccess") {
                        // 收到 用户成功购买商品消息 的消息
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        let name = '系统公告';
                        let comename = `${name}：${msgdata.sendUserInfo.name}`;
                        let msgtxt = `成功购买商品`;
                        let isvip = -1;
                        that.messageList.push({ isvip, comename, msgtxt, talkinguid });
                    } else if (msgdata.msgType == "system_seeGoods") {
                        // 收到 用户查看了商品详情消息 的消息
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        let name = '系统公告';
                        let comename = `${name}：${msgdata.sendUserInfo.name}`;
                        let msgtxt = `查看了商品详情`;
                        let isvip = -1;
                        that.messageList.push({ isvip, comename, msgtxt, talkinguid });
                    } else if (msgdata.msgType == "system_userFollow") {
                        // 收到 用户关注了主播消息 的消息
                        let name = '系统公告';
                        let comename = `${name}：${msgdata.sendUserInfo.name}`;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        let msgtxt = `关注了主播`;
                        let isvip = -1;
                        that.messageList.push({ isvip, comename, msgtxt, talkinguid });
                    } else if (msgdata.msgType == "system_sendPayOrder") {
                        // 收到 主播给用户发送创建订单成功的消息 的消息
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        if (msgcontent.receiveId == that.$store.state.user.userid) {
                            return;
                        } else {
                            let msgtxt = that.receivemsgdata.msgContent.text;
                            let comename = "系统公告sendPayOrder";
                            let isvip = msgdata.sendUserInfo.isVip;
                            that.messageList.push({ isvip, comename, msgtxt, talkinguid });
                        }
                    } else if (msgdata.msgType == "system_sendPayUrl") {
                        // 收到 主播给用户发送支付信息消息 的消息 //主播端生成商品后发送给用户时发送
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        let skuIDString = that.receivemsgdata.msgContent.skuIDString;
                        if (msgcontent.receiveId == that.$store.state.user.userid) {
                            // alert(msgcontent.skuIDString);
                            that.confirmordermbstatus = true;
                            // console.log(that.receivemsgdata);
                            // console.log(that.receivemsgdata.msgContent);
                            console.log(that.receivemsgdata.msgContent.skuIDString);
                            that.api.living.getGoodsSkuTemplateById({
                                skuId: that.receivemsgdata.msgContent.skuIDString
                            }).then(res => {
                                // console.log(res);
                                if (res.data.code == 1) {
                                    that.confirmorderdata = res.data.data;
                                } else {
                                    that.$toast(res.data.info);
                                }
                            }).catch(err => {
                                // that.$toast(err.data.info);
                                that.$toast('请求错误。请重试')
                            })
                        } else {
                            let msgtxt = that.receivemsgdata.msgContent.text;
                            let comename = "系统公告sendPayUrl";
                            let isvip = msgdata.sendUserInfo.isVip;
                            that.messageList.push({ isvip, comename, msgtxt, skuIDString, talkinguid });
                        }
                    } else if (msgdata.msgType == "system_buyGoods") {
                        // 收到 用户请求购买消息 的消息
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        let msgtxt = `用户请求购买消息`;
                        let comename = "系统公告";
                        let isvip = msgdata.sendUserInfo.isVip;
                        that.messageList.push({ isvip, comename, msgtxt, talkinguid });
                    } else if (msgdata.msgType == "gift") {
                        // console.log(11111111);
                        // 收到 用户请求购买消息 的消息
                        // let comename= msgdata.sendUserInfo.name;
                        // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
                        // let msgtxt = `用户请求购买消息`;
                        let comename = msgdata.sendUserInfo.name;
                        let giftdetail = `${msgdata.giftContent.giftName}x${msgdata.giftContent.giftCount}`;
                        let msgtxt = `向主播送上礼物`;
                        // let name = "系统公告";
                        let isvip = msgdata.sendUserInfo.isVip;
                        that.messageList.push({ isvip, comename, msgtxt, talkinguid, giftdetail });
                        // that.giftmsgList.push(msgdata);
                        // console.log('that.messageList');
                        // console.log(that.messageList);
                        console.log(msgdata);
                        that.getgiftdata(msgdata);
                    }
                }
                setTimeout(() => {
                    that.imscrollbottom();
                }, 0);
            };
            that.tim.on(Tim.EVENT.MESSAGE_RECEIVED, onMessageReceived);
        },
        // IM内容滚动到顶部
        imscrollbottom() {
            let that = this;
            // console.log(that.$refs.msgboxscroll.offsetHeight);
            // console.log(that.$refs.msgboxwrap.offsetHeight);
            if (
                that.$refs.msgboxscroll.offsetHeight <
                that.$refs.msgboxwrap.offsetHeight
            ) {
                that.$refs.msgboxscroll.scrollTop =
                    that.$refs.msgboxwrap.offsetHeight -
                    that.$refs.msgboxscroll.offsetHeight;
            }
        },

        //加入群聊
        joinGroup() {
            let that = this;
            let promise = that.tim.joinGroup({
                groupID: that.livinglidata.gid.toString(),
                type: Tim.TYPES.GRP_AVCHATROOM
            });
            promise
                .then(function(imResponse) {
                    that.receiveMsg(); //接受消息
                })
                .catch(function(imError) {
                    // console.warn("joinGroup error:", imError); // 申请加群失败的相关信息
                    if (imError == 'Error: 群组不存在，或者曾经存在过，但是目前已经被解散。') {
                        // that.livingendstatus = false;
                        that.$toast.clear();

                        that.livingendstatus = false;
                        that.quitGroup();
                        that.logoutfn();
                        that.player.destroy(true);
                    }
                });
        },
        // 退出群组群聊
        quitGroup() {
            let that = this;
            let promise = that.tim.quitGroup(that.livinglidata.gid.toString());
            promise
                .then(function(imResponse) {
                    console.log("退出群聊" + imResponse.data.groupID + "成功"); // 退出成功的群 ID
                })
                .catch(function(imError) {
                    console.warn("退出群聊 error:", imError); // 退出群组失败的相关信息
                });

            // that.joinOrLeaveRoomXC(0); //加入群聊  后台的接口
        },
        //礼物相关 start
        getgiftdata(data) {
            let that = this;
            that.enqueue(data);
            that.firtGo(0);
        },
        //队列数据中转
        firtGo(l) {
            let that = this;
            var allgiftData = that.toArrayData();
            if (!allgiftData.length) return;
            for (var k = l, lens2 = allgiftData.length; k < lens2; k++) {
                if (that.time_state || that.time_state_ii) {
                    if (that.time_state) {
                        that.createElegift(allgiftData[k]);
                    } else {
                        that.createElegift(allgiftData[k]);
                    }
                    //delete dui blie firt
                    that.dequeue();
                    // go second time
                    var timer_inner = setInterval(function() {
                        if (that.time_state || that.time_state_ii) {
                            clearInterval(timer_inner);
                            that.firtGo(k);
                        }
                    }, 300); //这个时间设置最好与 后面数字跳面的时间一致
                    break;
                }
            }
        },
        createElegift: function(received_msg) {
            let that = this;
            let giftelmentone = that.$refs.giftelmentone;
            let giftelmenttow = that.$refs.giftelmenttow;
            // that.giftcountall = received_msg.giftContent.giftCount;

            if (that.userid_old == received_msg.sendUserInfo.id && that.giftId_old == received_msg.giftContent.giftId) {
                if (!that.time_state) {
                    console.log(999);
                    that.liStyleNoneone = false;
                    clearTimeout(that.gift_timer_one);
                    setTimeout(function() {
                        that.giftNumFlag01 = true;
                        that.giftcountall_one += received_msg.giftContent.giftCount;
                        that.turntimer();
                        setTimeout(function() {
                            that.giftNumFlag01 = false;
                        }, 400);
                    }, 1000);
                }
                return;
            }

            if (that.userid_old_ii == received_msg.sendUserInfo.id && that.giftId_old_ii == received_msg.giftContent.giftId) {
                if (!that.time_state_ii) {
                    console.log(10001);
                    that.liStyleNonetow = false;
                    clearTimeout(that.gift_timer_two);
                    setTimeout(function() {
                        that.giftNumFlag02 = true;
                        that.giftcountall_two += received_msg.giftContent.giftCount;
                        that.turntimer_ii();
                        setTimeout(function() {
                            that.giftNumFlag02 = false;
                        }, 400);
                    }, 1000);
                }
                return;
            }

            //礼物展示通道 1
            if (that.time_state) {
                console.log(888888888);
                that.giftcountall_one = received_msg.giftContent.giftCount;
                that.time_state = false;
                that.giftmsgone = received_msg;
                that.liStyleGift_active_one = true;
                that.userid_old = received_msg.sendUserInfo.id;
                that.giftId_old = received_msg.giftContent.giftId;
                that.gift_timer_one = setTimeout(function() {
                    that.liStyleGift_active_one = false;
                    that.liStyleNoneone = true;
                    giftelmentone.addEventListener('webkitAnimationEnd', that.resetgiftcondition_i, false);

                }, 3000);
                // return;
            }
            //礼物展示通道 2
            else if (that.time_state_ii) {
                console.log(99999999);
                that.giftcountall_two = received_msg.giftContent.giftCount;
                that.time_state_ii = false;
                that.giftmsgtwo = received_msg;
                that.liStyleGift_active_tow = true;
                that.userid_old_ii = received_msg.sendUserInfo.id;
                that.giftId_old_ii = received_msg.giftContent.giftId;
                that.gift_timer_two = setTimeout(function() {
                    that.liStyleGift_active_tow = false;
                    that.liStyleNonetow = true;
                    giftelmenttow.addEventListener('webkitAnimationEnd', that.resetgiftcondition_ii, false);
                }, 4000);
                // return;
            }

        },
        turntimer() {
            let that = this;
            clearTimeout(that.manygift_timer_one);
            that.manygift_timer_one = setTimeout(function() {
                // that.giftNumFlag01 = false;
                that.liStyleNoneone = true;
                //通道一返回的动画结束 移除class条件 resetgiftcondition_i
                that.$refs.giftelmentone.addEventListener('webkitAnimationEnd', that.resetgiftcondition_i, false);
            }, 3000);
        },
        turntimer_ii() {
            let that = this;
            clearTimeout(that.manygift_timer_two);
            that.manygift_timer_two = setTimeout(function() {
                // that.giftNumFlag01 = false;
                that.liStyleNonetow = true;
                //通道一返回的动画结束 移除class条件 resetgiftcondition_i
                that.$refs.giftelmenttow.addEventListener('webkitAnimationEnd', that.resetgiftcondition_ii, false);
            }, 3000);
        },
        resetgiftcondition_i() {
            let that = this;
            that.liStyleGift_active_one = false;
            that.liStyleNoneone = false;
            that.time_state = true;
            that.giftcountall_one = '';
            that.userid_old = '';
            that.giftId_old = '';
            clearTimeout(that.gift_timer_one);
            that.$refs.giftelmentone.removeEventListener('webkitAnimationEnd', that.resetgiftcondition_i, false);
        },
        resetgiftcondition_ii() {
            let that = this;
            that.liStyleGift_active_tow = false;
            that.liStyleNonetow = false;
            that.time_state_ii = true;
            that.gift_timer_two = '';
            that.userid_old_ii = '';
            that.giftId_old_ii = '';
            clearTimeout(that.gift_timer_two);
            that.$refs.giftelmenttow.removeEventListener('webkitAnimationEnd', that.resetgiftcondition_ii, false);
        },
        //向队尾添加一个元素
        enqueue(element) {
            this.dataStore.push(element);
        },
        /*
        删除队首的元素
        */
        dequeue() {
            return this.dataStore.shift();
        },
        //  读取队首元素
        front() {
            return this.dataStore[0]
        },
        //  读取队尾元素
        back() {
            return this.dataStore[this.dataStore.length - 1];
        },
        //  显示队列内所有的元素
        toArrayData() {
            var result = [];
            for (var i = 0; i < this.dataStore.length; i++) {
                result.push(this.dataStore[i]);
            }
            return result;
        },
        //  判断队列是否为空
        empty() {
            if (this.dataStore.length == 0) {
                return true;
            } else {
                return false;
            }
        },
        //礼物相关 end
        // IM相关==============结束=========================================================
        //投诉建议=========================== 开始
        openComplaintsShell() {
            this.complaintsShellShow = true;
            this.livingToComplaintsFlag = 'complaintsShellShow';
        },
        closeComplaintsShellShow() {
            this.complaintsShellShow = false;
            this.livingToComplaintsFlag = '';
        },
        //投诉建议===============结束===================================
        //以下区间为点赞 start===========================================
        //轮询直播观看人数与点赞数
        getXiuChangLivingUserAndPraise() {
            let that = this;
            that.api.xiuchangliving
                .XiuChangLivingUserAndPraise({
                    liveId: that.liveId
                        // uid: that.livinglidata.uid
                })
                .then(res => {
                    if (res.data.code == 1) {
                        that.watchcount = res.data.data.realCount;
                        that.praiseCount = res.data.data.praise;
                    }
                })
        },
        //点赞提交后台
        postPraisePoint() {
            let that = this;
            //发送IM消息
            that.timtxt = '给主播点了赞';
            that.txtpost();

            this.api.xiuchangliving
                .getXiuChuangLivingPraisePoint({
                    liveId: that.liveId
                        // flag: that.isFirst == 1 ? 2 : 1
                })
                .then(res => {
                    if (res.data.code == 1) {
                        console.log(res.data);
                    }
                })
        },
        /**点赞 */
        likeClick() {
            let that = this;
            let arrs = [];
            arrs.push("../../../../assets/imgs/icons/animation/1.png", "../../../../assets/imgs/icons/animation/2.png", "../../../../assets/imgs/icons/animation/3.png", "../../../../assets/imgs/icons/animation/4.png", "../../../../assets/imgs/icons/animation/5.png", "../../../../assets/imgs/icons/animation/6.png")
            const image = new Image(60, 45);
            image.onload = that.bubbleAnimate();
            image.src = 'http://www.piaoyouni.com/images/zan/' + that.getRandomInt(1, 6) + '.png';
            const anmationData = {
                id: new Date().getTime(),
                timer: 0,
                opacity: 0.5,
                pathData: that.generatePathData(),
                image: image,
                factor: {
                    speed: 0.004, // 运动速度，值越小越慢
                    t: 0 //  贝塞尔函数系数
                }
            };
            if (Object.keys(that.queue).length > 0) {
                that.queue[anmationData.id] = anmationData;
            } else {
                that.queue[anmationData.id] = anmationData;
                that.bubbleAnimate();
            }

            that.praiseCount = that.praiseCount + 1;
            that.isFirst = that.isFirst + 1;
            that.postPraisePoint();
        },
        /**获取最大最小随机值 */
        getRandom(min, max) {
            return Math.random() * (max - min) + min;
        },
        /**获取最大最小之前随机值的整数 */
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        /**获取图片路径 */
        generatePathData() {
            let that = this;
            const p0 = {
                x: 0.65 * that.width,
                y: that.height
            };
            const p1 = {
                x: that.getRandom(0.22 * that.width, 0.33 * that.width),
                y: that.getRandom(0.5 * that.height, 0.75 * that.height)
            };
            const p2 = {
                x: that.getRandom(0, 0.88 * that.width),
                y: that.getRandom(0.25 * that.height, 0.5 * that.height)
            };
            const p3 = {
                x: that.getRandom(0, 0.88 * that.width),
                y: that.getRandom(0, 0.125 * that.height)
            };
            return [p0, p1, p2, p3];
        },
        /**更新图片的最新运动路径 */
        updatePath(data, factor) {
            const p0 = data[0];
            const p1 = data[1];
            const p2 = data[2];
            const p3 = data[3];
            const t = factor.t;
            /*计算多项式系数 （下同）*/
            const cx1 = 3 * (p1.x - p0.x);
            const bx1 = 3 * (p2.x - p1.x) - cx1;
            const ax1 = p3.x - p0.x - cx1 - bx1;

            const cy1 = 3 * (p1.y - p0.y);
            const by1 = 3 * (p2.y - p1.y) - cy1;
            const ay1 = p3.y - p0.y - cy1 - by1;

            const x = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p0.x;
            const y = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p0.y;
            return {
                x,
                y
            };
        },
        /**点赞动画 */
        bubbleAnimate() {
            let that = this;

            Object.keys(that.queue).forEach(key => {
                that.clearCanvas();
                const anmationData = that.queue[+key];
                const {
                    x,
                    y
                } = that.updatePath(
                    anmationData.pathData,
                    anmationData.factor
                );
                const speed = anmationData.factor.speed;
                anmationData.factor.t += speed;
                var curWidth = 30;
                curWidth = (that.height - y) / 1.5;
                curWidth = Math.min(30, curWidth);
                var curAlpha = anmationData.opacity;
                curAlpha = y / that.height;
                curAlpha = Math.min(1, curAlpha);
                that.obj_ctx.globalAlpha = curAlpha;
                that.obj_ctx.drawImage(anmationData.image, x - curWidth / 2, y, curWidth, curWidth);
                if (anmationData.factor.t > 1) {
                    delete that.queue[anmationData.id];
                }
                if (y > that.height) {
                    delete that.queue[anmationData.id];
                }
            });

            if (Object.keys(that.queue).length > 0) {
                that.anima_timer = setTimeout(() => {
                    that.bubbleAnimate();
                }, 5);
            } else {
                clearTimeout(that.anima_timer);
                that.clearCanvas();
            }
        },
        /**清空画布**/
        clearCanvas() {
            let that = this;
            var c = document.getElementById("bubble");
            var cxt = c.getContext("2d");
            cxt.clearRect(0, 0, that.width, that.height);
        },
        //以下区间为点赞 end  
        //点击弹出更多
        moreClick() {
            this.moreboxshellstate = true;
        },
        //关闭更多弹层
        closeMoreClick() {
            this.moreboxshellstate = false;
        },
        //在线人数弹层展示
        shellDanChangClick() {
            let that = this;
            that.shelldanchangstate = true;
            that.onlinesList = [];
            that.getOnlines();
        },
        //单场榜弹层展示
        closeDanChangClick() {
            this.shelldanchangstate = false;
        },
        //主播个人资料展示
        openanchormsgshell() {
            this.getUserRole();
            this.anchormsgshowstate = true;

        },
        //主播个人资料关闭
        closeAnchormsgshell() {
            this.anchormsgshowstate = false;
        },
        //点击@TA打开IM对话 
        opentalkchanel() {
            this.anchormsgshowstate = false;
            this.imiptshowstatus = true;
        },
        //打开下载启动弹层
        opendownload() {
            this.downloadcovershow = true;
            this.downloadandopen();
            this.closeAnchormsgshell()
        },
        //关闭下载启动弹层
        shutappbtnsbox() {
            this.downloadcovershow = false;
        },
        //下载及拉起APP
        downloadandopen() {
            let that = this;
            that.linkurlopen = "zhuazhouH5://";
            if (checkdevice() == "anzhuo") {
                that.linkurldownload = 1;
            } else {
                that.linkurldownload = 2;
            }
        }
    },

    beforeCreate() {
        // this.tim.on(this.tim.EVENT.KICKED_OUT, this.onKickedOut);
    },
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        this.quitGroup();
        this.logoutfn();
        this.player.destroy(true);
        clearInterval(this.countchangetimer);
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    // activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};