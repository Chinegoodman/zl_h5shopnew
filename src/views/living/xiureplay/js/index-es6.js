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
import downloadandopenapp from '../../../../components/downloadandopenapp.vue'
export default {
    name: "livingdetails",
    components: {
        downloadandopenapp
    },
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
            attention_flag: 0, //关注
            moreboxshellstate: false, //更多弹层
            videoInChat: false, //在微信里的背景标致
            covertypedata: 'downloadcovershow', //下载及启动APP组件类别
            downloadcovershow: false, //下载及启动APP弹层
            linkurldownload: '', //下载链接
            lunchupappurl: '', //拉起下载相关
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
        //全屏高度
        windowInnerHeight() {
            return window.innerHeight + 'px';
        },
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

        //分享相关
        if (checkdevice() == "anzhuo") {
            that.downloadappurl = 'https://apk.izhuazhou.cn/zsapk/zz_zs.apk';
        } else {
            that.downloadappurl = 'https://apps.apple.com/cn/app/id1487579824';
            if (checkdevice() == "weixinios" || checkdevice() == "weixin") {
                // that.openappfn();
                that.videoInChat = true;
                that.wxtipsstatus = true;
            }
        }

        that.getLiveDetailInfo(liveId, function() {
            // that.livinglidata = getsessionStorage("livinglidata");
            // this.quitGroup();
            // this.logoutfn();
            // this.player.destroy(true);
            // that.livinglidata.livestreamurl = that.livinglidata.livestreamurl.replace('http://', 'https://');
            // that.livinglidata.streamAddrHls = that.livinglidata.streamAddrHls.replace('http://', 'https://');
            that.lunchupappurlfn();

            if (
                checkdevice() == "weixinios" ||
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
                    url: that.livinglidata.playbackAddr, //m3u8
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

            // that.getgoodsList();
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
        //拉起APP相关
        lunchupappurlfn() {
            let that = this;
            /// 秀场
            this.lunchupappurl = `zhuazhouH5://show?uid=${that.$store.state.user.userid}&liveId=${that.livinglidata.id}&anchorId=${that.livinglidata.uid}`;
        },
        //打开下载启动弹层
        opendownload() {
            this.downloadcovershow = true;
            this.downloadandopen();
        },
        //关闭下载启动弹层
        shutappbtnsbox() {
            this.downloadcovershow = false;
        },
        //下载及拉起APP
        downloadandopen() {
            let that = this;
            if (checkdevice() == "anzhuo") {
                that.linkurldownload = 1;
            } else {
                that.linkurldownload = 2;
            }
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
        //获取直播间详情
        getLiveDetailInfo(liveId, fn) {
            let that = this;
            this.api.xiuchangliving
                .getXiuChangLiveInfo({
                    liveId: liveId,
                })
                .then(res => {
                    // console.log('res.data08');
                    // console.log(res.data);
                    if (res.data.code == 1) {
                        if (
                            res.data.data != null ||
                            res.data.data != undefined ||
                            res.data.data != ""
                        ) {
                            setTimeout(fn, 500);
                            that.livinglidata = res.data.data;
                            console.log('that.livinglidata秀场直播请求回来的数据');
                            console.log(res.data);
                        } else {
                            that.livinglidata = [];
                        }
                    }
                })
        },
        // 关注 与 取消关注 主播
        follow(currentstatus) {
            let that = this;

            if (!that.iflogin()) {
                return;
            }
            if (!currentstatus) {
                // 当前 为 非关住状态
                that.api.xiuchangliving
                    .relationOpration({
                        currentUserId: that.$store.state.user.userid,
                        transferUserId: that.livinglidata.uid,
                        relation: 1
                    })
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.code == 1) {
                            that.attention_flag = 1;
                        }
                    })
            } else {
                // 当前 为 关住状态
                that.api.xiuchangliving
                    .relationOpration({
                        currentUserId: that.$store.state.user.userid,
                        transferUserId: that.livinglidata.uid,
                        relation: 0
                    })
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.code == 1) {
                            that.attention_flag = 0;
                        }
                    })
            }
        },
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
            // that.timtxt = '给主播点了赞';
            // that.txtpost();

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
        openComplaintsShell() {
            let that = this;
            that.$toast('举报成功');
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
            if (checkdevice() == "weixinios" || checkdevice() == "weixin") {
                if (!that.canplaythroughstatus) {
                    that.canplaythroughstatus = true;
                    that.player.start();
                    that.player.play();
                }

            } else if (!that.canplaythroughstatus) {
                that.canplaythroughstatus = true;
                setTimeout(() => {
                    that.player.start();
                    that.player.play();
                }, 0);
            }
        },
        videoplay() {
            // if (this.hasStartstatus) {
            //     console.log('正在播放');
            //     console.log(1);
            // } else {
            //     console.log(2);
            this.videopaly();
            // }
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