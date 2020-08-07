import {
    setsessionStorage,
    getsessionStorage
} from "@/utils/index.js";
import "xgplayer";
import Player from "xgplayer";
import FlvPlayer from "xgplayer-flv";
// import HlsPlayer from 'xgplayer-hls';
import HlsJsPlayer from 'xgplayer-hls.js';
import { checkdevice } from "@/utils/checkdevice.js";
export default {
    name: "livingdetails",
    components: {},
    data() {
        return {
            livingtimer: null,
            livinglidata: "",
            // livingurl:'http://liveali.ifeng.com/live/CCTV.m3u8',//直播地址
            goodschoosestatus: false, //商品选择模块 默认隐藏

            //直播相关
            player: "", //player实例
            canplaythroughstatus: false,
            reloadtimes: 0,
            timgroupstatus: false,
            livingendstatus: true, // 直播  默认为未结束
            confirmordermbstatus: false, //直播间 主播推送到用户的立即付款状态 默认 false
            confirmorderdata: '', //直播间 主播推送到用户的立即付款 相关数据

            goodsList: [], //直播间的商品列表
            // currentgood:[],//当前商品【只有一条商品】

            controlstatus: false, //管理员权限弹窗
            controlstatus_1: true, //管理员权限弹窗 == 禁言 或者 踢人
            controlstatus_2: false, //管理员权限弹窗 == 禁言时长选择
            talkinguid: '', //选中的聊天者的 id

            hlrtipsstatus: false, //红利人说明 状态 默认false不展示

            selfsf: 0, //自己的 身份标识  0 普通用户， 1 房间主播， 2 房间内管理员
            targetsf: 0, // 被查看用户 身份标识 0 普通用户， 1 房间主播， 2 房间内管理员
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
        }
    },
    watch: {

    },
    mounted() {
        let that = this;
        let liveId = that.$route.query.liveId;
        that.getreplayinfo(liveId, function() {
            // that.livinglidata = getsessionStorage("livinglidata");
            // this.quitGroup();
            // this.logoutfn();
            // this.player.destroy(true);
            that.livinglidata.livestreamurl = that.livinglidata.livestreamurl.replace('http://', 'https://');
            that.livinglidata.streamAddrHls = that.livinglidata.streamAddrHls.replace('http://', 'https://');

            if (
                checkdevice() == "weixin" ||
                checkdevice() == "anzhuo" ||
                checkdevice() == "ios" ||
                checkdevice() == "pc"
            ) {
                that.player = new HlsJsPlayer({
                    //解除注释 m3u8方法
                    id: "videodom",
                    // url: "rtmp://58.200.131.2:1935/livetv/dftv", //rtmp
                    // url: "http://pili-publish.test.zhulihr.com/izhuazhoutest/59.flv", //flv
                    // url: "http://pili-publish.test.zhulihr.com/izhuazhoutest/59.m3u8", //m3u8
                    // url: that.livinglidata.streamAddrHls + ".m3u8", //m3u8
                    url: that.livinglidata.livestreamurl, //m3u8
                    //   url: 'rtmp://pili-publish.test.zhulihr.com/izhuazhoutest/59',//rtmp
                    // url: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',//cctv6测试
                    //   url: "http://ivi.bupt.edu.cn/hls/hunanhd.m3u8", //湖南卫视测试
                    // url: 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8', //IPHONE测试
                    // url: 'https://youku.iqiyi-yongjiu.com/ppvod/500812EF1F1A0FFE46202D529ED6C2DB.m3u8', //我的测试
                    // url: 'http://pili-vod.zs.zhulihr.com/recordings/z1.izhuazhouzs.8240/1590575013_1590578443.m3u8', //助力临时 
                    // url: 'http://app.inke.com/inke/v/video.mp4', //MP4视频
                    // cssFullscreen: false,//网页样式全屏
                    playsinline: true,
                    "x5-video-player-type": "h5", //微信同层播放
                    "x5-video-orientation": "portraint",
                    "x5-video-player-fullscreen": true, //微信全屏播放
                    width: that.wdwidth,
                    height: that.wdheight,
                    autoplay: true,
                    // autoplayMuted: true,
                    // videoInit: true,//初始化显示视频首帧
                    poster: that.livinglidata.cover, //封面图是当播放器初始化后在用户点击播放按钮前显示的图像。
                    ignores: ["fullscreen", "volume", "play"], //volume 量控制  progress 视频进度条  play控制条的播放、暂停按钮  loading加载提示  fullscreen全屏切换 error报错提示  time当前播放时间/视频时长  replay重播交互与提示
                    closeVideoClick: true,
                    closeVideoDblclick: true,
                    closeVideoTouch: true,

                    // autoplay: true,
                    // autoplayMuted: true,
                    preloadTime: 15, //预加载时长(秒)	30
                    // useHls: true,
                    loop: true,
                    isLive: true,
                    cors: false
                });
            } else if (checkdevice() == "testtt") {
                that.player = new FlvPlayer({
                    //解除注释 flv方法
                    id: "videodom",
                    // url: "http://pili-publish.test.zhulihr.com/izhuazhoutest/59.flv", //flv
                    url: that.livinglidata.streamAddrHls + ".flv", //flv
                    //   url: 'http://pili-publish.test.zhulihr.com/izhuazhoutest/59.m3u8',//m3u8
                    //   url: 'rtmp://pili-publish.test.zhulihr.com/izhuazhoutest/59',//rtmp
                    // url: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',//cctv6测试
                    //   url: "http://ivi.bupt.edu.cn/hls/hunanhd.m3u8", //湖南卫视测试
                    // url: 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8',//IPHONE测试
                    // url: 'https://youku.iqiyi-yongjiu.com/ppvod/500812EF1F1A0FFE46202D529ED6C2DB.m3u8', //IPHONE测试
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
        });
    },
    methods: {
        // 阻止冒泡
        returnfn() {
            return false;
        },
        //获取回放信息
        getreplayinfo(liveId, fn) {
            let that = this;
            that.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 200000
            });
            this.api.living.getLiveInfo({
                // liveId: that.livinglidata.liveId,
                liveId: liveId,
                operterId: '',
                userId: ''
            }).then(res => {
                if (res.data.code == 1) {
                    let resdata = res.data.data;
                    that.livinglidata = resdata;
                    setTimeout(fn, 500);
                    // if (that.livinglidata.livestreamurl) {
                    //     clearInterval(that.livingtimer);
                    //     console.log(111);
                    //     fn();
                    // } else {
                    //     that.livingtimer = setInterval(1000, fn);
                    //     console.log(222);
                    // }
                    console.log('that.livinglidata');
                    console.log(that.livinglidata);
                    // that.selfsf = resdata.identity;
                    // that.targetsf = resdata.otherIdentity;
                }
            })
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
            // if (this.hasStartstatus) {
            //     // console.log('正在播放');
            // } else {
            //     alert(2);
            //     this.videopaly();
            // }
            this.videopaly();
        },
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
                            that.$toast("关注成功！");
                            that.livinglidata.is_attention = 1;
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
                            that.$toast("取消关注成功！");
                            that.livinglidata.is_attention = 3;
                        }
                    })
            }
        },
        // 直播间商品列表
        getgoodsList() {
            let that = this;
            this.api.living
                .goodsList({
                    operatorId: that.livinglidata.uid,
                    liveId: that.livinglidata.id
                })
                .then(res => {
                    // console.log(res.data);
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
                    console.log(res.data);
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
        }
    },

    beforeCreate() {},
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        this.player.destroy(true);
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    // activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};