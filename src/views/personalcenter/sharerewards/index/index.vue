<!-- 组件说明 -->
<template>
  <div :class="{'shareindexwrap': true,'shareindexwrapapp' : bodypaddingtop}">
      <div class="bgcover-section">
        <div class="header"  :style="{paddingTop:bodypaddingtop+'px'}">
            <img class="back" @click="goback" src="./../../../../assets/imgs/shop/white-gd.png" alt />
            <div class="tit">转发有礼</div>
            <span class="roles" @click="goshareroles">规则</span>
        </div>
        <div :class="{'sec-first' : true,'widthdraw-ios':system=='ios'}">
            <div class="pub lt">
                <span class="tit">累计奖励</span>
                <span class="num">{{topAllData.cumulativeReward}}红包</span>
                <span class="btn"  @click="gowithdrawpage" v-if="system!='ios'" >提现</span>
            </div>
            <div class="pub rt">
                <span class="tit">可兑换奖励</span>
                <span class="num">{{topAllData.exchangeAward}}红包</span>
                <span class="btn" @click="goexchangepage">兑换金币</span>
            </div>
        </div>
      </div>
      <div class="sec-two">
        <div class="nav">
          <van-tabs v-model="active" >
            <van-tab :title="item.name"  :key="index" v-for="(item,index) in timelist" >
              <div class="tab-title" slot="title"  @click="tabitems(item.tabid)" >{{item.name}}</div>
            </van-tab>
          </van-tabs>  
        </div>
        <div class="area-data">
          <div class="section" v-if="timesection===0">
            <ul>
             <li>
               <span class="t1">邀请人数</span>
               <span class="t2" @click="goGuildDetail(0)" >{{tongjidata.inviteUserCount?tongjidata.inviteUserCount:0}}人<span class="gd"><img src="./../../../../assets/imgs/icons/black-gd.png" alt /></span></span>
             </li>
             <li>
               <span class="t1">消费</span>
               <span class="t2">{{(tongjidata.consumeQuota?tongjidata.consumeQuota:0).toFixed(2)}}</span>
             </li>
             <li>
               <span class="t1">消费奖励</span>
               <span class="t2">{{tongjidata.consumeReward?tongjidata.consumeReward:0}}红包</span>
             </li>
             <li>
               <span class="t1">邀请主播</span>
               <span class="t2" @click="goGuildDetail(1)">{{tongjidata.inviteAnchorCount?tongjidata.inviteAnchorCount:0}}人<span class="gd"><img src="./../../../../assets/imgs/icons/black-gd.png" alt /></span></span>
             </li>
             <li>
               <span class="t1">收益</span>
               <span class="t2">{{(tongjidata.incomeQuota?tongjidata.incomeQuota:0).toFixed(2)}}</span>
             </li>
             <li>
               <span class="t1">收益奖励</span>
               <span class="t2">{{tongjidata.incomeReward?tongjidata.incomeReward:0}}红包</span>
             </li>
           </ul>
          </div> 
          <!-- 上月 -->
          <div class="section" v-if="timesection===1">
            <ul>
             <li>
               <span class="t1">邀请人数</span>
               <span class="t2" @click="goGuildDetail(0)">{{tongjidata.inviteUserCount?tongjidata.inviteUserCount:0}}人<span class="gd"><img src="./../../../../assets/imgs/icons/black-gd.png" alt /></span></span>
             </li>
             <li>
               <span class="t1">消费</span>
               <span class="t2">{{(tongjidata.consumeQuota?tongjidata.consumeQuota:0).toFixed(2)}}</span>
             </li>
             <li>
               <span class="t1">消费奖励</span>
               <span class="t2">{{tongjidata.consumeReward?tongjidata.consumeReward:0}}红包</span>
             </li>
             <li>
               <span class="t1">邀请主播</span>
               <span class="t2" @click="goGuildDetail(1)">{{tongjidata.inviteAnchorCount?tongjidata.inviteAnchorCount:0}}人<span class="gd"><img src="./../../../../assets/imgs/icons/black-gd.png" alt /></span></span>
             </li>
             <li>
               <span class="t1">收益</span>
               <span class="t2">{{(tongjidata.incomeQuota?tongjidata.incomeQuota:0).toFixed(2)}}</span>
             </li>
             <li>
               <span class="t1">收益奖励</span>
               <span class="t2">{{tongjidata.incomeReward?tongjidata.incomeReward:0}}红包</span>
             </li>
           </ul>
          </div> 
          <!-- 累积 -->
          <div class="section" v-if="timesection===-1">
            <ul>
             <li>
               <span class="t1">邀请人数</span>
               <span class="t2" @click="goGuildDetail(0)">{{tongjidata.inviteUserCount?tongjidata.inviteUserCount:0}}人<span class="gd"><img src="./../../../../assets/imgs/icons/black-gd.png" alt /></span></span>
             </li>
             <li>
               <span class="t1">消费</span>
               <span class="t2">{{(tongjidata.consumeQuota?tongjidata.consumeQuota:0).toFixed(2)}}</span>
             </li>
             <li>
               <span class="t1">消费奖励</span>
               <span class="t2">{{tongjidata.consumeReward?tongjidata.consumeReward:0}}红包</span>
             </li>
             <li>
               <span class="t1">邀请主播</span>
               <span class="t2" @click="goGuildDetail(1)">{{tongjidata.inviteAnchorCount?tongjidata.inviteAnchorCount:0}}人<span class="gd"><img src="./../../../../assets/imgs/icons/black-gd.png" alt /></span></span>
             </li>
             <li>
               <span class="t1">收益</span>
               <span class="t2">{{(tongjidata.incomeQuota?tongjidata.incomeQuota:0).toFixed(2)}}</span>
             </li>
             <li>
               <span class="t1">收益奖励</span>
               <span class="t2">{{tongjidata.incomeReward?tongjidata.incomeReward:0}}红包</span>
             </li>
           </ul>
          </div> 
        </div>
      </div>
      <div class="pub-tips sec-III">
        <p class="tips"><span>*</span>每个红包可兑换金币100个</p>
        <p class="tips"><span>*</span>消费数据，是指您邀请的用户在平台产生的消费之和；收益数据，是指您邀请的用户在平台产生的收益之和</p>
      </div>
      <div class="btn-area" @click="lijishare">立即分享</div>
  </div>
</template>

<script>
import {jsCallImmediatelySharefn,jsCallgoback} from './../../../../utils/appjh.js'
import {
    Tab,
    Tabs,
    List,
    Toast
} from 'vant'
export default {
  components: {
    vanTab : Tab,
    vanTabs : Tabs,
    vanList : List,
    vanToast : Toast
  },
  data() {
    return {
      system : '',//判断是IOS
      bodypaddingtop : 0, //客户端传来的top值 
      shareUserId : '', //用户ID
      active : 0,
      timesection : 0,//根据时间显示数据部分
      timelist : [
        {
          name: "当月",
          tabid: 0
        },
        {
          name: "上月",
          tabid: 1
        },
        {
          name: "累积",
          tabid: 2
        }
      ],
      yaoqingtype : 0, //1为用户 2为主播
      topAllData : {
        cumulativeReward : 0 , //累计奖励
        exchangeAward : 0 //可兑换奖励
      },
      tongjidata : {
        inviteAnchorCount : 0, //邀请主播个数
        inviteUserCount : 0, //邀请用户个数
        incomeReward : 0, //收益奖励
        incomeQuota : 0, //收益额度
        consumeReward : 0 , //消费奖励
        consumeQuota : 0  //消费币额度
      }
    };
  },
  computed: {},
  mounted() {
    let that = this;
    that.shareUserId = that.$route.query.shareUserId;
    that.bodypaddingtop = that.$route.query.paddingtop;
    that.system = that.$route.query.system;
    that.getCumulativeReward();
    that.getShareStatistics();
  },
  methods: {
    // 返回上一页
    goback() {
      let that = this;
      if(that.$route.query.webtype==='0'){
        jsCallgoback();
      }else{
        that.$router.go(-1);
      } 
    },
    //跳转规则页
    goshareroles(){
      let that = this;
      if(that.$route.query.webtype==='0'){
        that.$router.push({
          name: "shareroles",
          query: {
            webtype : 0,
            shareUserId : that.shareUserId,
            paddingtop : that.bodypaddingtop
          }
        });
      }else{
        that.$router.push({
          name: "shareroles"
        });
      } 
    },
    //跳转详情 persontype 1为邀请人数 0为邀请主播
    goGuildDetail(persontype){
      let that =this;
      that.$router.push({
        name: "sharedetailsindex",
        query: {
         timetype : that.timesection,
         persontype : persontype,
         paddingtop : that.bodypaddingtop,
         shareUserId : that.shareUserId
        }
      });
    },
    tabitems(index){
      console.log(index);
      let that = this;
      if(index == 2){
        that.timesection = -1;
      }else{
        that.timesection = index;
      }
      that.getShareStatistics();
    },
    //获得累计奖励，可兑换奖励
    getCumulativeReward(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.cumulativeReward({
            userId : that.shareUserId
            // userId : 9512
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              that.topAllData = res.data.data; 
            }
          });
    },
    //获取相关余额
    getShareStatistics(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.shareStatistics({
            type : that.timesection,
            userId : that.shareUserId
            // userId : 123456
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              that.tongjidata = res.data.data; 
            }
          });
    },
    //跳转提现页
    gowithdrawpage(){
      let that =this;
      that.$router.push({
        name: "sharewithdrawindex",
        query: {
         shareUserId : that.shareUserId, 
         paddingtop : that.bodypaddingtop
        }
      });
    },
    //跳转兑换页
    goexchangepage(){
      let that =this;
      that.$router.push({
        name: "shareexchangeindex",
        query : {
          shareUserId : that.shareUserId,
          paddingtop : that.bodypaddingtop
        }
      });
    },
    //立即分享
    lijishare(){
      let that = this;
      if(that.$route.query.webtype==='0'){
          jsCallImmediatelySharefn();
          return;
      }else{
          setTimeout(() => {
            window.location.href = "http://test.testh5.zhulihr.com/share/shareregist.html?shareUserId=" + that.$store.state.nerUser.userid + '&platform=1&sharetype=2';
          }, 800);
      }
    }
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import url("./css/sharecommon.less");
@import url("./css/index.less");
</style>

<style>
body{
  background: #F7F7F7;;
}
  .shareindexwrap .van-hairline--top-bottom::after, 
  .shareindexwrap .van-hairline-unset--top-bottom::after{
      border-width:0 !important;
  }
  .shareindexwrap .van-list__error-text, 
  .shareindexwrap .van-list__finished-text, 
  .shareindexwrap .van-list__loading{
    background:rgba(247,247,247,1);
  }
  .shareindexwrap .van-tabs--line .van-tabs__wrap{
    height: .9rem;
  }
  .shareindexwrap .van-tab{
    font-size : .32rem;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(117,117,117,1);
  }
  .shareindexwrap .van-tab--active{
    font-weight: bold;
    color: #1F1F1F;
  }
  .shareindexwrap .van-tabs__line{
    width: .3rem !important;
    background:rgba(255,189,4,1);
  }
</style>