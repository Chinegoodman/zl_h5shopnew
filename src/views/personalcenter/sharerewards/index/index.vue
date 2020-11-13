<!-- 组件说明 -->
<template>
  <div class="shareindexwrap">
      <div class="header">
          <img class="back" @click="goback" src="./../../../../assets/imgs/shop/white-gd.png" alt />
          <div class="tit">转发有礼</div>
          <span class="roles">规则</span>
      </div>
      <div class="sec-first">
          <div class="pub lt">
              <span class="tit">累计奖励</span>
              <span class="num">16000.00红包</span>
              <span class="btn">提现</span>
          </div>
          <div class="pub rt">
              <span class="tit">可提现奖励</span>
              <span class="num">4000.00红包</span>
              <span class="btn">充值金币</span>
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
          <!-- 当月 -->
          <div class="section" v-if="timesection===0">
            <ul>
             <li>
               <span class="t1">邀请人数</span>
               <span class="t2">152人</span>
             </li>
             <li>
               <span class="t1">消费</span>
               <span class="t2">115人</span>
             </li>
             <li>
               <span class="t1">消费奖励</span>
               <span class="t2">114人</span>
             </li>
             <li>
               <span class="t1">邀请主播</span>
               <span class="t2">515人</span>
             </li>
             <li>
               <span class="t1">收益</span>
               <span class="t2">185人</span>
             </li>
             <li>
               <span class="t1">收益奖励</span>
               <span class="t2">715人</span>
             </li>
           </ul>
          </div> 
          <!-- 上月 -->
          <div class="section" v-if="timesection===1">
            <ul>
             <li>
               <span class="t1">邀请人数</span>
               <span class="t2">8852人</span>
             </li>
             <li>
               <span class="t1">消费</span>
               <span class="t2">1125人</span>
             </li>
             <li>
               <span class="t1">消费奖励</span>
               <span class="t2">1124人</span>
             </li>
             <li>
               <span class="t1">邀请主播</span>
               <span class="t2">5152人</span>
             </li>
             <li>
               <span class="t1">收益</span>
               <span class="t2">1852人</span>
             </li>
             <li>
               <span class="t1">收益奖励</span>
               <span class="t2">7152人</span>
             </li>
           </ul>
          </div> 
          <!-- 累积 -->
          <div class="section" v-if="timesection===2">
            <ul>
             <li>
               <span class="t1">邀请人数</span>
               <span class="t2">15200人</span>
             </li>
             <li>
               <span class="t1">消费</span>
               <span class="t2">1150人</span>
             </li>
             <li>
               <span class="t1">消费奖励</span>
               <span class="t2">1140人</span>
             </li>
             <li>
               <span class="t1">邀请主播</span>
               <span class="t2">5150人</span>
             </li>
             <li>
               <span class="t1">收益</span>
               <span class="t2">1850人</span>
             </li>
             <li>
               <span class="t1">收益奖励</span>
               <span class="t2">7150人</span>
             </li>
           </ul>
          </div> 
        </div>
      </div>
      <div class="sec-III">
        <div class="guild">
          <span class="lt">邀请明细</span>
          <span class="rt"><img src="./../../../../assets/imgs/icons/dd-gengd@2x.png" alt /></span>
        </div>
        <p class="tips"><span>*</span>每个红包可充值金币100个，提现￥1.00</p>
      </div>
  </div>
</template>

<script>

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
      ]
    };
  },
  computed: {},
  methods: {
    // 返回上一页
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    tabitems(index){
      console.log(index);
      let that = this;
      that.timesection = index;
    }
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
  },
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