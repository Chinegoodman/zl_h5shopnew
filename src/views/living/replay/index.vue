<!-- 组件说明 -->
<template>
  <div class="videoswrapout">
    <!-- 直播中、、、 -->
    <!-- <div v-if="livingendstatus" class="videoswrap"> -->
    <div class="videoswrap">
      <div class="video">
        <div id="videodom"></div>
      </div>
      <!-- video之外的部分 -->
      <div class="video-content">
        <!-- 店主名称与关闭 -->
        <div class="content-top">
          <div class="clearfix">
            <div class="dzname clearfix" @click.stop="returnfn">
              <div class="dznamepic">
                <img v-if="livinglidata.face_url" :src="livinglidata.face_url" alt="抓周" />
              </div>
              <div class="dzguankan">
                <img src="./../../../assets/imgs/living/details/quite.png" alt />
              </div>
              <div class="dznamemass">
                <div class="nametit _txtov1">{{livinglidata.nickname}}</div>
                <div class="looknum">
                  <span class="_txtov1" v-if="livinglidata.realcount!=''">{{livinglidata.realcount}}人在观看</span>
                </div>
              </div>
              <div class="dznamegz" v-if="livinglidata.is_attention==3 || livinglidata.is_attention== null" @click.stop="follow(false)">
                <img src="./../../../assets/imgs/living/details/attention.png">
              </div>
              <div class="dznamegz" v-if="livinglidata.is_attention==1 || livinglidata.is_attention== 2" @click.stop="follow(true)">已关注</div>
            </div>
            <div class="complaints">
              <img src="./../../../assets/imgs/living/details/complaints.png" alt="抓周" />
            </div>
            <div class="dznameid" @click.stop="returnfn">
              <span>ID:{{livinglidata.id}}</span>
            </div>
            <div class="close" @click.stop="$router.go(-1);">
              <img src="./../../../assets/imgs/living/details/close.png" alt="抓周" />
            </div>
          </div>
        </div>
        <!-- 商品与任务 -->
        <div class="content-main clearfix">
          <!-- 商品部分 -->
          <div class="main-left clearfix" v-if="currentgood!='' && currentgood!=null && currentgood!=undefined">
          <!-- <div class="main-left clearfix" v-if="currentgood!='' && currentgood!=null && currentgood!=undefined" v-for="(item,index) in goodsList" :key="index"> -->
            <div class="videosp" @click.stop="gotodetails(currentgood.sku_id)">
              <img :src="currentgood.goods_image" alt="抓周" />
            </div>
            <div class="videospj" @click.stop="gotodetails(currentgood.sku_id)">

              <img src="./../../../assets/imgs/living/details/buy.png" alt="抓周" /></div>
            <!-- <div class="videosp" @click.stop="gotodetails(item.sku_id)">
              <img :src="item.goods_image" alt="抓周" />
            </div>
            <div class="videospj" @click.stop="gotodetails(item.sku_id)">立即购买</div> -->
          </div>
          <!-- 任务部分 -->
          <!-- <div class="main-right" v-if="false">
            <div class="renwbox">
              <div class="videorwpic">
                <img src="./../../../assets/imgs/living/details/renwu.png" alt />
              </div>
              <div class="renwutxt">未知任务</div>
            </div>
            <div class="renwbox">
              <div class="videorwpic">
                <img src="./../../../assets/imgs/living/details/renwu.png" alt />
              </div>
              <div class="renwutxt">未知任务</div>
            </div>
            <div class="renwbox">
              <div class="videorwpic">
                <img src="./../../../assets/imgs/living/details/renwu.png" alt />
              </div>
              <div class="renwutxt">未知任务</div>
            </div>
          </div> -->
        </div>
        <!-- 直播消息  聊天输入部分-->
        <div class="content-bottom">
          <!-- 消息列表 -->
          <div class="bottomchat" v-show="timgroupstatus" ref="msgboxscroll">
            <div class="msgboxwrapouter" ref="msgboxwrap">
              <div class="msgboxwrap">
                <div class="msgbox clearfix">
                    <!-- <img src="./../../../assets/imgs/living/details/tongzhi.png" alt /> -->
                    <img src="./../../../assets/imgs/living/details/living_gonggao.png" alt />
                    <p class="name">系统公告：</p>
                    <p>抓周是一个传递正能量的平台，请文明聊天，网警24小时在线巡查；禁止传播
                      黄、赌、毒、暴力、邪教、反党性质的内容产生，违者将封号处理。</p>
                </div>
              </div>
              <div class="msgboxwrap" v-for="(item,index) in messageList" :key="index">
                <div class="msgbox clearfix" @click="shutUp_Kickout(item.talkinguid)">
                    <img v-if="item.isvip==0" src="./../../../assets/imgs/living/details/jb1.png" alt />
                    <img v-else src="./../../../assets/imgs/living/details/tongzhi.png" alt />
                    <p class="name">{{item.name}}：</p>
                    <p>{{item.msgtxt}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 聊天输入部分 -->
          <div class="chattalk clearfix">
            <p class="chatinp" @click="imiptshowstatus=true">你想说点什么。。。</p>
            <div class="service">
              <div class="servicepic">
                <!-- <img src="./../../../assets/imgs/living/details/tongzhi.png"> -->
                <img src="./../../../assets/logo.png">
              </div>
              <div class="servicebtn">
                <img src="./../../../assets/imgs/living/details/service.png">
              </div>
            </div>
            <div class="chatsp"  @click.stop="goodschoosestatus=true">
              <!-- <div class="chatsptxt">商品</div> -->
            </div>
            <div class="chatgd">
              <img src="./../../../assets/imgs/living/details/gengduo.png" alt />
            </div>
            <div class="chatxin">
              <!-- <div class="licknum">666</div> -->
              <div class="chatxinicon">
                <img src="./../../../assets/imgs/living/details/like.png" alt />
              </div>
            </div>
          </div>
        </div>

        
        <div class="imiptshowmb"  @click.stop="imiptshowstatus=false" v-if="imiptshowstatus">
          <div class="imiptshow" @click.stop="returnfn">
            <input type="text" autofocus="autofocus" v-model="timtxt" @keyup.enter="txtpost" />
            <p @click.stop="txtpost" style="cursor:pointer;">发送</p>
          </div>
        </div>

        <!-- 主播上架的商品 -->
        <div class="goodsboxmb" @click.stop="goodschoosestatus=false" v-if="goodschoosestatus">
          <div class="goodsbox" @click.stop="returnfn">
            <p>直播界面</p>
            <ul>
              <li class="clearfix" v-for="(item,index) in goodsList" :key="index">
                <img :src="item.goods_image" alt="抓周" @click.stop="gotodetails(item.sku_id)"/>
                <div class="details">
                  <p class="name _txtov1">{{item.goods_title}}</p>
                  <p class="guige _txtov1">{{item.sku_id}}</p>
                  <div class="shop clearfix">
                    <img v-if="item.brand_logo" :src="item.brand_logo" alt="抓周">
                    <p>{{item.brand_name}}</p>
                  </div>
                  <div class="btn red" @click.stop="goodadd(item.sku_id,item.goods_brand_id)">加入购物车</div>
                  <!-- <div class="btn gray">已添加</div> -->
                </div>
              </li>
              <li class="nogood" v-if="goodsList==null||goodsList.length==0">
                主播暂未添加商品
              </li>
            </ul>
          </div>
        </div>

        <!-- 红利人 -->
        <div @click="hlrtipsstatus=true" class="hlrtipsbtn">
          <img src="./../../../assets/imgs/living/details/hlr.png" alt="抓周" />
        </div>
        <div class="hlrtipsmb" v-if="hlrtipsstatus">
          <div class="hlrtipscontainer">
            <img @click="hlrtipsstatus=false" src="@/assets/imgs/icons/scpzsc.png" alt="抓周，红利人">
            <div class="titlebox">
              <p>红利人说明</p>
            </div>
            <ul>
              <li>
                1.平台工厂上新日抓周用户进行抓抢，第一个付款成功抓到新品宝贝的用户，拥有该新品宝贝的全平台订单专属红利分享权。                            
              </li>
              <li>
                2.该新品宝贝每成交一笔订单，黄金、k金、镶嵌、钻石、宝石、玉石等珠宝类首饰，每单分享2元红利，白银类产品，每单分享1元红利。                            
              </li>
              <li>
                3.该订单属于定制类产品不能退货，取消订单即视为自动放弃专属红利分享权。                            
              </li>
              <li>
                4.未抢到专属红利分享权的用户，订单关闭后的2个小时内可取消订单，2个小时之后由于商品属于订制商品在制作中则不能取消订单。                            
              </li>
              <li>
                5.抓周用户会员抢到的专属红利分享权，黄金、k金、镶嵌、钻石、宝石、玉石等珠宝类首饰，每单分享5元红利，白银类产品，每单分享2元红利。
              </li>
            </ul>
          </div>
        </div>
        <!-- 会员权益 -->
        <div class="hlrtipsbtn member">
          <img src="./../../../assets/imgs/living/details/member.png" alt="抓周" />
        </div>
      </div>

    </div>
    <!-- 直播结束、、 -->
    <!-- <div v-else class="livingendwrap" :style="{backgroundImage:'url('+livinglidata.face_url+')'}">
      <div class="close" @click.stop="$router.go(-1);">
        <img src="./../../../assets/imgs/living/details/cuohao.png" alt />
      </div>
      <img class="faceurl" :src="livinglidata.face_url" alt="抓周">
      <p class="name">{{livinglidata.nickname}}</p>
      <div class="enddata">
        <p>直播已结束</p>
        <span class="number">{{livinglidata.nickname}}</span>
        <span class="title">总观看人数</span>
      </div>
      <p class="followbtn" @click.stop="follow(false)">关注主播</p>
    </div> -->
    <!-- 确认支付弹窗界面 -->
    <div v-if="confirmordermbstatus" class="confirmordermb" @click.stop="returnfn">
      <div class="confirmorder" @click.stop="returnfn">
        <img :src="confirmorderdata.imageUrl" alt="抓周">
        <p class="name _txtov1">{{confirmorderdata.goodsTitle}}</p>
        <span class="tips">{{confirmorderdata.specInfo}}</span>
        <div class="price_number clearfix">
          <p class="price"><span>￥</span>{{confirmorderdata.currPrice}}</p>
          <p class="number">库存1件(暂无此字段)</p>
        </div>
        <div class="btn" @click.stop="confirmorderclick(confirmorderdata)">立即付款</div>
        <img @click.stop="confirmordermbstatus=false" class="confirmordermbclosebtn" src="./../../../assets/imgs/living/details/cuohao.png" alt="抓周">
      </div>
    </div>
    <!-- 管理员权限弹窗 -->
    <div class="controlmb" v-if="livingendstatus&&controlstatus">
      <div class="close" @click.stop="controlstatus=controlstatus_2=false;controlstatus_1=true">
        <img src="./../../../assets/imgs/living/details/cuohao.png" alt />
      </div>
      <div class="control" v-if="controlstatus_1">
        <p>将“某某某”用户</p>
        <div class="btn" @click="controlstatus_1=false;controlstatus_2=true;">
          <img src="./../../../assets/imgs/living/controls/jy.png" alt="抓周">
          <span>禁言</span>
        </div>
        <div class="btn" @click="tichuzbj">
          <img src="./../../../assets/imgs/living/controls/tr.png" alt="抓周">
          <span>踢出直播间</span>
        </div>
      </div>

      <div class="control control2" v-if="controlstatus_2">
        <p>将“某某某”用户</p>
        <div class="btn">
          <span>禁言3分钟</span>
        </div>
        <div class="btn">
          <span>禁言10分钟</span>
        </div>
        <div class="btn">
          <span>直播间禁言</span>
        </div>
        <div class="btn">
          <span>取消禁言</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tim from "tim-js-sdk";
import COS from "cos-js-sdk-v5";
import {
  setsessionStorage,
  getsessionStorage
} from "./../../../utils/index.js";
import "xgplayer";
import Player from "xgplayer";
import FlvPlayer from "xgplayer-flv";
import { checkdevice } from "@/utils/checkdevice.js";
export default {
  components: {},
  data() {
    return {
      livinglidata: "",
      // livingurl:'http://liveali.ifeng.com/live/CCTV.m3u8',//直播地址
      goodschoosestatus: false, //商品选择模块 默认隐藏

      //直播相关
      player: "", //player实例
      canplaythroughstatus: false,
      reloadtimes:0,
      timgroupstatus: false, //tim群聊默认隐藏
      livingendstatus:true,// 直播  默认为未结束
      confirmordermbstatus:false,//直播间 主播推送到用户的立即付款状态 默认 false
      confirmorderdata:'',//直播间 主播推送到用户的立即付款 相关数据

      goodsList: [], //直播间的商品列表
      // currentgood:[],//当前商品【只有一条商品】
      
      controlstatus:false,//管理员权限弹窗
      controlstatus_1:true,//管理员权限弹窗 == 禁言 或者 踢人
      controlstatus_2:false,//管理员权限弹窗 == 禁言时长选择
      talkinguid:'',//选中的聊天者的 id

      hlrtipsstatus:false,//红利人说明 状态 默认false不展示

      selfsf:0,//自己的 身份标识  0 普通用户， 1 房间主播， 2 房间内管理员
      targetsf:0,// 被查看用户 身份标识 0 普通用户， 1 房间主播， 2 房间内管理员

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
      nextReqMessageID: "", //用于续拉，分页续拉时需传入该字段。
      conversationList: [], // 会话列表，用该列表覆盖原有的会话列表,
      isActive: 0, //默认选中第一个,
      userName: "用户名",
      receivemsgdata:'',

      IMtanchuangTimer : '',//im弹窗
      IMtanchuang_currentdata : '',//im弹窗 历史数据保存并判断是否为同一条数据
      // IM TIM 相关参数====================结束
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
    
    this.livinglidata = getsessionStorage("livinglidata");
    // this.quitGroup();
    // 0 普通级别，日志量较多，接入时建议使用
    // 1 release级别，SDK 输出关键信息，生产环境时建议使用
    // 2 告警级别，SDK 只输出告警和错误级别的日志
    // 3 错误级别，SDK 只输出错误级别的日志
    // 4 无日志级别，SDK 将不打印任何日志
    this.tim.setLogLevel(3); //IM日志级别
    this.logoutfn();
    // this.player.destroy(true);
    this.joinOrLeaveRoom(1); //加入群聊  后台的接口
    
    // 直播相关
    let that = this;
    // console.log(that.livinglidata.streamAddrHls);
    // console.log(checkdevice());

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
        url: that.livinglidata.streamAddrHls + ".m3u8", //m3u8
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
        preloadTime: 5, //预加载时长(秒)	30
        isLive: true,
        cors: true
      });
    } else if (checkdevice() == "pc") {
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
      if(that.reloadtimes <= 15){ //30*2=60秒后
        setTimeout(() => {
          that.reloadtimes =that.reloadtimes+1;
          // that.player.start();
          // that.player.play();
          that.player.reload();
        }, 2000);
      }else{
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

    this.getgoodsList();

    // TIM相关=================================开始
    // 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
    // let tim = Tim.create(options); // SDK 实例通常用 tim 表示
    // 注册 COS SDK 插件
    this.tim.registerPlugin({ "cos-js-sdk": COS });
    this.loginfn();
    // this.videoplay();
  },
  methods: {
    // 阻止冒泡
    returnfn() {
      return false;
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
        console.log('正在播放');
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
    confirmorderclick(confirmorderdata){
      let that = this;
      let confirmorderdatanew = confirmorderdata;
      // console.log(confirmorderdatanew.shopId);
      let orderListdatanew ={
        "productPic":confirmorderdatanew.imageUrl,
        "productName":confirmorderdatanew.goodsTitle,
        "payAmount":confirmorderdatanew.currPrice,
        "totalAmount":confirmorderdatanew.currPrice,
        "totalQuantity":1,
        "productPrice":confirmorderdatanew.currPrice,
        "productQuantity":1,
        "shopId":confirmorderdatanew.shopId,
        "shopName":confirmorderdatanew.specsInfo,
        "shopIcon":confirmorderdatanew.shopLogo,
        "receiverId":"",
        "productAttr":confirmorderdatanew.specInfo,
        "productSkuId":confirmorderdatanew.skuId,
        "productWeight":confirmorderdatanew.weight,
        "goldenPrice":'',
        "manualFee":confirmorderdatanew.manualFee,
        "serviceFee":confirmorderdatanew.serviceFee,
        "designFee":confirmorderdatanew.designFee?confirmorderdatanew.designFee:0,
        "insured_price":confirmorderdatanew.insuredPrice,
        // "liveId":confirmorderdatanew.
        "liveId":that.livinglidata.id,
      };
      setsessionStorage("pagefrom",'livingdetails');
      setsessionStorage("orderListdata",orderListdatanew);
      this.$router.push({name:'confirmorder'});
    },
    // 是否登录
    iflogin() {
      let that = this;
      // H5端
      if (
        !that.$store.state.user.userid ||
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
    jinyan(type){

    },
    // 踢出直播间
    tichuzbj(){
      let that = this;
      this.api.living.KickoutGroup({
        groupId:that.livinglidata.gid.toString(),
        kickoutId:that.talkinguid,
      }).then(res=>{
        // console.log(res);
        if(res.data.code==1){
          that.$toast(res.data.data);
          that.controlstatus=false;//管理员权限弹窗
          that.controlstatus_1=true;//管理员权限弹窗 == 禁言 或者 踢人
          that.controlstatus_2=false;//管理员权限弹窗 == 禁言时长选择
          that.talkinguid='';//选中的聊天者的 id
        }else{
          that.$toast(res.data.info);
        }
      })
    },

    // 加入或者离开直播间
    joinOrLeaveRoom(inorout){
      let that = this;
      this.api.living.joinOrLeaveRoom({
        uid:that.$store.state.user.userid,
        touid:that.livinglidata.uid,
        flag:inorout,//0离开 1 加入
      }).then(res=>{
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
      if(that.timtxt==''){return;}

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
          that.messageList.push({ isvip, name, msgtxt,talkinguid });
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
          if(imError=='Error: 操作权限不足，例如 Public 群组中普通成员尝试执行踢人操作，但只有 App 管理员才有权限。'){
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
        let msgcontent =  msgdata.msgContent;
        if(msgdata.timestamp == that.IMtanchuang_currentdata.timestamp){
          return;
        }
        that.IMtanchuang_currentdata = msgdata;
        // console.log(event);
        // 获取当前群消息
        if (msgdata.conversationId == that.livinglidata.gid) {
          // console.log(msgdata.msgContent);
          // console.log(msgdata.msgContent.text);
          // console.log(msgdata.sendUserInfo);
          that.receivemsgdata = msgdata;
          let talkinguid = 'noid';
          console.log(msgdata);
          if (msgdata.msgType == "text") {
            // 收到用户发送的消息
            let msgtxt = msgdata.msgContent.text;
            let name = msgdata.sendUserInfo.name;
            let isvip = msgdata.sendUserInfo.isVip;
            // console.log(msgdata.sendUserInfo);
            talkinguid = msgdata.sendUserInfo.id;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
          } else if (msgdata.msgType == "hello") {
            // 收到用户进入群聊时的 系统消息
            let comename = msgdata.sendUserInfo.name;
            let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let name = "系统公告";
            let isvip = msgdata.sendUserInfo.isVip;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
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
            if(that.receivemsgdata.msgContent.text == that.$store.state.user.userid){
              let name = "系统公告";
              // let isvip = msgdata.sendUserInfo.isVip;
              let isvip=-1;
              that.messageList.push({isvip:isvip, name, msgtxt,talkinguid });
              that.$router.go(-1);
            }
          } else if (msgdata.msgType == "like") {
            // 收到 点赞消息 的消息
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let msgtxt = `点赞消息`;
            let name = "系统公告";
            let isvip = msgdata.sendUserInfo.isVip;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
          } else if (msgdata.msgType == "announcement") {
            // 收到 公告消息 的消息
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let msgtxt = `公告消息`;
            let name = "系统公告";
            let isvip = msgdata.sendUserInfo.isVip;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
          } else if (msgdata.msgType == "shopCat") {
            // 收到 用户把商品加入购物车消息 的消息
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let msgtxt = `用户把商品加入购物车消息`;
            let name = "系统公告";
            let isvip = msgdata.sendUserInfo.isVip;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
          } else if (msgdata.msgType == "system_buySuccess") {
            // 收到 用户成功购买商品消息 的消息
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let msgtxt = `用户成功购买商品消息`;
            let name = "系统公告";
            let isvip = msgdata.sendUserInfo.isVip;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
          } else if (msgdata.msgType == "system_seeGoods") {
            // 收到 用户查看了商品详情消息 的消息
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let msgtxt = `用户查看了商品详情消息`;
            let name = "系统公告";
            let isvip = msgdata.sendUserInfo.isVip;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
          } else if (msgdata.msgType == "system_userFollow") {
            // 收到 用户关注了主播消息 的消息
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let msgtxt = `用户关注了主播消息`;
            let name = "系统公告";
            let isvip = 0;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
          } else if (msgdata.msgType == "system_sendPayOrder") {
            // 收到 主播给用户发送创建订单成功的消息 的消息
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            
            if(msgcontent.receiveId == that.$store.state.user.userid){
              return;
            }else{
              let msgtxt = that.receivemsgdata.msgContent.text;
              let name = "系统公告sendPayOrder";
              let isvip = msgdata.sendUserInfo.isVip;
              that.messageList.push({ isvip, name, msgtxt,talkinguid });
            }
          } else if (msgdata.msgType == "system_sendPayUrl") {
            // 收到 主播给用户发送支付信息消息 的消息 //主播端生成商品后发送给用户时发送
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let skuIDString = that.receivemsgdata.msgContent.skuIDString;
            if(msgcontent.receiveId == that.$store.state.user.userid){
              // alert(msgcontent.skuIDString);
              that.confirmordermbstatus = true;
              // console.log(that.receivemsgdata);
              // console.log(that.receivemsgdata.msgContent);
              console.log(that.receivemsgdata.msgContent.skuIDString);
              that.api.living.getGoodsSkuTemplateById({
                skuId : that.receivemsgdata.msgContent.skuIDString
              }).then(res=>{
                console.log(res);
                if(res.data.code==1){
                  that.confirmorderdata = res.data.data;
                }else{
                  that.$toast(res.data.info);
                }
              }).catch(err=>{
                // that.$toast(err.data.info);
                that.$toast('请求错误。请重试')
              })
            }else{
              let msgtxt = that.receivemsgdata.msgContent.text;
              let name = "系统公告sendPayUrl";
              let isvip = msgdata.sendUserInfo.isVip;
              that.messageList.push({ isvip, name, msgtxt ,skuIDString,talkinguid });
            }
          } else if (msgdata.msgType == "system_buyGoods") {
            // 收到 用户请求购买消息 的消息
            // let comename= msgdata.sendUserInfo.name;
            // let msgtxt = `欢迎用户 ${comename} 进入直播间`;
            let msgtxt = `用户请求购买消息`;
            let name = "系统公告";
            let isvip = msgdata.sendUserInfo.isVip;
            that.messageList.push({ isvip, name, msgtxt,talkinguid });
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
          if(imError == 'Error: 群组不存在，或者曾经存在过，但是目前已经被解散。'){
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

      // that.joinOrLeaveRoom(0); //加入群聊  后台的接口
    }
    // IM相关==============结束=========================================================
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
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  // activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import url("./css/index.less");
</style>

<style lang='less'>
</style>