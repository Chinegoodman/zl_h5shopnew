<!-- 组件说明 -->
<template>
  <div class="box">
    <!-- 头部 -->
    <div class="header">
      <div class="backgd">
        <div class="header_tou">
          <div class="logined-box" v-if="$store.state.nerUser.isLogin">
              <img v-if="$store.state.nerUser.userdata.headPortrait" :src="$store.state.nerUser.userdata.headPortrait" class="hd-face" />
              <img v-else src="./../../../assets/imgs/personal/mine_default.png" alt="抓周" class="hd-face"/>
              <div class="use_top">
                <span class="logined">{{$store.state.nerUser.userdata.nickName}}</span>
                <span class="level_use" @click="goToVipLevelPage">
                  <span class="levelbox"><viplevel :lv_num="$store.state.nerUser.userdata.level?$store.state.nerUser.userdata.level:1"></viplevel></span>
                </span>
              </div>
              <div class="info_use">抓周ID：<span>{{$store.state.nerUser.userdata.integral}}</span><span>{{$store.state.nerUser.userdata.virtualId}}</span><span class="ic-fz" @click="copy_kuaidi_msg($store.state.nerUser.userdata.virtualId)"><img src="../../../assets/imgs/personal/orderfz.png" alt /></span></div>
              <div class="guild-info"  @click="gomyinfo"></div>
          </div>
          <div v-else @click="gotologin" style="cursor:pointer;">
              <img  src="./../../../assets/imgs/personal/mine_default.png" alt="抓周" class="hd-face"/>
              <span class="log_guild">点击登录</span>
          </div>
        </div>
        <div class="login-banner">
           <img src="./../../../assets/imgs/personal/vipicon.png" alt="皇冠" class="huang-guan">
           <span class="zhua_vip">尊享会员</span>
           <span class="txt">7大超值权益，省钱又省心</span>
           <router-link class="look_guild" to="member" tag="a"></router-link>
        </div>
      </div>
    </div>
    <!-- 我的订单 start -->
    <div class="translate">
      <div class="pub-top-tile">
        <div class="top_in"><span class="lt">我的订单</span><router-link class="rt" tag="span" to="/personalcenter/order/index?tabid=0">查看全部订单<img src="./../../../assets/imgs/personal/icon_guild.png"  /></router-link></div>
      </div>
      <ul class="state-list">
        <li v-for="(item,index) in stateList" :key="index" @click="stateJump(item.tabid)">
          <span class="im">
            <img :src="item.img" alt="">
          </span>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 我的订单 end -->
    <!-- 我的订单 start -->
    <div class="translate">
      <div class="pub-top-tile">
        <div class="top_in"><span class="lt">我的服务</span></div>
      </div>
      <ul class="my-serve">
         <li tag="li"  v-for="(item,index) in myServeList" :key="index" @click="serveGuild(item.list_id)">
            <span class="im">
              <img :src="item.img" alt="">
            </span>
            <span class="t">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 我的订单 end -->
    <!-- 我的订单 start -->
    <div class="translate">
      <div class="pub-top-tile">
        <div class="top_in"><span class="lt">关于抓周</span></div>
      </div>
      <ul class="about-zhua-zhou">
        <li v-for="(item,index) in aboutZhuaZhouList" :key="index" @click="zhuaZhouList(index)">
          <span class="im">
            <img :src="item.img" alt="">
          </span>  
          <span class="t">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 我的订单 end -->
    <div class="service" v-if="false">
      <ul>
        <li @click="gotovip">
          <img src="./../../../assets/imgs/personal/gr-ful@2x.png" alt />
          <span>会员福利</span>
        </li>
        <li @click="gotofollow">
          <img src="./../../../assets/imgs/personal/gr-guanzsp@2x.png" alt />
          <span>关注商品</span>
        </li>
      </ul>
    </div>
    <div class="option">
      <div v-if="false">
        <img src="./../../../assets/imgs/personal/gr-lxkefu@2x.png" alt /> 在线客服
      </div>
      <div v-if="false">
        <img src="./../../../assets/imgs/personal/gr-xtshez@2x.png" alt /> 系统设置
      </div>
      <div @click="gotopage"><img src="./../../../assets/imgs/personal/yiwancheng.png" alt /> 重置密码</div>
      <div @click="logout"><img src="./../../../assets/imgs/personal/yiwancheng.png" alt /> 退出登录</div>
      <!-- <div @click="logout"><i class="fa fa-sign-out fa-2x" aria-hidden="true"></i> 退出登录</div> -->
    </div>
  </div>
</template>

<script>
import { copy } from "@/utils/copy.js";
import viplevel from '@/components/viplevel.vue';
export default {
  components: {
    viplevel
  },
  data() {
    return {
      imgsrc: "",
      username: "",
      title: "",
      userInfordetail :'',
      goldlist: [], //今日金价列表
      goldprice: 0, //今日金价
      userId: "", //用户ID
      vip: 0,
      goldmassboxindex: 0,
      setIntervaldd: "", //计时器
      stateList: [
        // {
        //   name: "全部订单",
        //   img: require("./../../../assets/imgs/personal/daifu.png"),
        //   tabid: 0
        // },
        {
          name: "待付款",
          img: require("./../../../assets/imgs/personal/daifu.png"),
          tabid: 1
        },
        {
          name: "待发货",
           img: require("./../../../assets/imgs/personal/daifa.png"),
          tabid: 2
        },
        {
          name: "待收货",
          img: require("./../../../assets/imgs/personal/daishou.png"),
          tabid: 3
        },
        {
          name: "已完成",
          img: require("./../../../assets/imgs/personal/yiwancheng.png"),
          tabid: 4
        },
        {
          name: "售后",
          img: require("./../../../assets/imgs/personal/tuikuan.png"),
          tabid: 5
        }
      ],
      myServeList : [
        {
          name : "我的钱包",
          img : require("@/assets/imgs/personal/my-money.png"),
          list_id : 0
        },
        {
          name : "金银财宝",
          img : require("@/assets/imgs/personal/my-serve01.png"),
          list_id : 1
        },
        {
          name : "优惠中心",
          img : require("@/assets/imgs/personal/my-serve02.png"),
          list_id : 2
        },
        {
          name : "我的收藏",
          img : require("@/assets/imgs/personal/my-serve03.png"),
          list_id : 3
        },
        {
          name : "我的浏览",
          img : require("@/assets/imgs/personal/my-serve04.png"),
          list_id : 4
        },
        {
          name : "我的消息",
          img : require("@/assets/imgs/personal/my-serve05.png"),
          list_id : 5
        },
        {
          name : "转发有礼",
          img : require("@/assets/imgs/personal/my-serve05.png"),
          list_id : 6
        }
      ],
      aboutZhuaZhouList : [
        {
          name : "投诉建议",
          img : require("@/assets/imgs/personal/aboutZhuaZhou01.png")
        },
        {
          name : "购买帮助",
          img : require("@/assets/imgs/personal/aboutZhuaZhou02.png")
        },
        {
          name : "关于抓周",
          img : require("@/assets/imgs/personal/aboutZhuaZhou03.png")
        }
      ]
    };
  },
  computed: {},
  methods: {
    // 会员福利跳转
    gotovip() {// /personalcenter/viplevledetails/:levelid/:webtype
      this.$toast("敬请期待");
    },
    goToVipLevelPage(){
      let that = this;
      that.$router.push({
        name: "viplevledetails",
        query: {
         userId : that.$store.state.nerUser.userid
        }
      });
    },
    //复制ID：
    copy_kuaidi_msg(item){
      copy(item);
      this.$toast("已复制");
    },
    // 关注商品跳转
    gotofollow() {
      // this.$router.push({ name: "follow" });
      this.$toast("敬请期待");
    },
    gomyinfo(){
      this.$router.push({
        path : '/myinfo'
      });
    },
    stateJump(tabid) {
      let that = this;
      switch(tabid){
        case 1 : 
          that.$router.push({
            path: "/personalcenter/order/index",
            query: {
              tabid: 1
            }
          });
          break;
        case 2 : 
          that.$router.push({
            path: "/personalcenter/order/index",
            query: {
              tabid: 2
            }
          });
          break;  
        case 3 : 
          that.$router.push({
            path: "/personalcenter/order/index",
            query: {
              tabid: 3
            }
          });
          break;
        case 4 : 
          that.$router.push({
            path: "/personalcenter/order/index",
            query: {
              tabid: 4
            }
          });
          break;
        case 5 : 
          that.$router.push({
            path: "/personalcenter/order/index",
            query: {
              tabid: 5
            }
          });
          break;         
      }




      // if (tabid == 4) {
      //   this.$router.push({
      //     path: "/returngoods/index"
      //   });
      // } else if(tabid == 2) {
      //   this.$router.push({
      //     path: "/order",
      //     query: {
      //       tabid: 3
      //     }
      //   });
      // }else if(tabid == 3) {
      //   this.$router.push({
      //     path: "/order",
      //     query: {
      //       tabid: 4
      //     }
      //   });
      // }
      // else{
      //   this.$router.push({
      //     path: "/order",
      //     query: {
      //       tabid: tabid
      //     }
      //   });
      // }


    },
    //我的服务
    serveGuild(index){
      var that = this;
      switch(index){
         case 0:
            //钱包页面
            this.$router.push({ path: "/personalcenter/mypurse/livingpurse",query:{
              userid:this.$store.state.user.userid,
              webtype:1,//H5
            }});
            break;
        case 1:
            //钱包页面
            this.$router.push({ path: "/personalcenter/mypurse",query:{
              userid:this.$store.state.user.userid,
              webtype:1,//H5
            }});
            break;
        case 2:
            that.$router.push({ path: "/personalcenter/discount",query:{
              userid:this.$store.state.user.userid,
              tabid:1 //H5
            }}); 
            break;
        case 3:
            that.$router.push({path : "/mybrowse",query:{
              tab_id : index
            }});
            break;
        case 4:
            that.$router.push({path : "/mybrowse",query:{
              tab_id : index
            }});
            break;
        case 5:
            that.gomyinfo();
            break;
        case 6:
            // that.$router.push({path : "/personalcenter/sharerewards/index",query:{
            that.$router.push({path : "/personalcenter/yinyusharerewards/index",query:{
              tab_id : index,
              shareUserId : that.$store.state.nerUser.userid
            }});
            break;    
        default:
            that.$router.push({path :"/returngoods/index"});
      }
    },
    //关于抓周
    zhuaZhouList(index){
      var that = this;
      switch(index){
        case 0:
            //投诉建议页面
            this.$router.push({ path: "/personalcenter/complaints",query:{
              userid:this.$store.state.user.userid,
              webtype:1,//H5
            }});
            break;
        case 1:
            this.$router.push({ path: "/personalcenter/helpbuy"});
            break;
        case 2:
            that.$router.push({name :"aboutzhuazhou"});
            break;
        default:
            that.$router.push({path :"/returngoods/index"});
      }
    },
    // 获取金价数据
    goldmass() {
      let that = this;
      that.api.homedetails.goldmassage({}).then(res => {
        // console.log(res.data);
        // let goldlistnew = [];
        // that.goldlist = goldlistnew.push(res.data.data);
        // console.log(that.goldlist);
        that.goldprice = res.data.data
        // that.goldlistshow(res.data.data);
      });
    },
    // 金价动态展示
    // goldlistshow(goldlist) {
    //   // debugger;
    //   let that = this;
    //   // debugger;
    //   this.setIntervaldd = setInterval(() => {
    //     // console.log('setIntervaldd');
    //     if (that.goldmassboxindex < goldlist.length - 1) {
    //       that.goldmassboxindex++;
    //     } else {
    //       that.goldmassboxindex = 0;
    //     }
    //   }, 2400);
    // },
    //根据id获取用户信息
    getinfousermass() {
      let that = this;
      that.api.personalcenter
        .getinfouser_new({
          userId : that.$store.state.nerUser.userid
        })
        .then(res => {
          if(res.data.code==1){
            let resdata = res.data.data;
            // console.log('resdata')
            // console.log(resdata)
            let nerUser = {
                isLogin: true,
                username: resdata.nickName,
                userid: resdata.userId,
                phone: that.$store.state.nerUser.phone,
                userdata : resdata
            }
            that.$store.commit("setNewUserDate", nerUser);
          }
          // console.log(res);
          // if ( res.data.data.face_url == "" || res.data.data.face_url == undefined) {
          //   that.imgsrc = require("./../../../assets/imgs/icons/logo.png");
          // } else {
          //   // that.imgsrc = res.data.data.face_url;
          //    that.imgsrc = require("./../../../assets/imgs/icons/logo.png");
          // }
          // that.username = res.data.data.nickname;
          // that.vip = res.data.data.is_vip;
          // if (res.data.data.introduction != undefined) {
          //   that.title = res.data.data.introduction;
          // } else {
          //   // that.title = "快来添加描述，展示特别的你";
          //   that.title = "";
          // }
          // that.userInfordetail = res.data.data;
        });
    },
    gotopage() {
      this.$router.push({ name: "resetpw" });
    },
    login_guild(){
      this.$router.push({ name: "regist" });
    },
    // 退出登录
    logout() {
      let confirmfn = window.confirm("确定要退出登录吗？");
      if (confirmfn) {
        // window.sessionStorage.removeItem('pagefrom');
        // window.sessionStorage.removeItem('allprice');
        // window.sessionStorage.removeItem('OrderImmediatelydata');
        // window.sessionStorage.removeItem('checkaddressitem');
        // window.sessionStorage.removeItem('orderListdata');
        window.sessionStorage.clear();
        window.localStorage.clear();
        this.$store.commit("resetuserdata");
        this.$store.commit("resetNewUserDate");
        this.$router.push({ name: "shopindex" });
      }
    },
    // 去登录
    gotologin(){
      window.sessionStorage.clear();
      window.localStorage.clear();
      this.$store.commit("resetuserdata");
      this.$store.commit("resetNewUserDate");
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    let that = this;
    // that.goldmass();
    // let userdata = this.$store.state.user;
    // console.log(userdata.userid);

    // that.userId = userdata.userid;
    that.getinfousermass();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    clearInterval(this.setIntervaldd);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import "./index.less";
</style>