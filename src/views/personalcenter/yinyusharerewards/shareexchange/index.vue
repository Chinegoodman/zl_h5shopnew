<!-- 组件说明 -->
<template>
  <div :class="{'widthdrawwrap':true,'widthdrawwrapapp' : bodypaddingtop}">
      <div class="bgcover-section">
        <div class="header" :style="{paddingTop:bodypaddingtop+'px'}">
            <img class="back" @click="goback" src="./../../../../assets/imgs/shop/white-gd.png" alt />
            <div class="tit">兑换金币</div>
        </div>
        <div class="top-pub top-wallet">
            <div class="wallet-in">
              <span class="t1">可兑换金币</span>
              <div class="num"><span>{{(allowExchange*100).toFixed(0)}}</span>个</div>
              <span  class="drap" @click="ctrlExchangeShow">兑换</span>
            </div>
        </div>
      </div>
      <div class="page-guild" @click="goShareWithdrawRecode">
        <span class="t">兑换记录</span>
        <span class="gd"><img src="./../../../../assets/imgs/shop/white-gd.png" alt /></span>
      </div>
      <div class="pub-tips exchange-tips">
        <p class="tips"><span>*</span>兑换金币将会到账当前账户金币余额，请注意查收</p>
        <p class="tips"><span>*</span>分享奖励的兑换记录，将不会与您其他的充值记录合并</p>
      </div>
      <!-- 兑换弹层start -->
      <div class="withdrap-pub-shell withdrap-shell" v-if="exchangeShellState">
        <div class="pub-shell-cover shell-cover" @click="exchangeShellState=false"></div>
        <div class="pub-shell-con shell-con">
          <p>平台账号:（<span>{{accountMobile}}</span>）</p>
          <div class="t">兑换金币<span>（仅可兑换100的整数倍）</span>：</div>
          <div class="text"><input type="text" placeholder="请输入兑换数量" v-model="currentExchangeNum"><span class="danwei">个</span></div>
          <div class="tip">当前可兑换金币：{{allowExchange * 100}}个<span @click="allTakeOver">全部兑换</span></div>
          <span class="pub-shell-btn withdraw-btn"  @click="ctrlExchange">兑换</span>
        </div>
      </div>
      <!-- 兑换弹层end -->
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
      shareUserId : '', //用户ID
      bodypaddingtop : 0, //客户端传来的top值 
      accountMobile : '', //平台账号-手机号
      topAllData : {
        cumulativeReward : 0 , //累计奖励
        exchangeAward : 0 //可兑换奖励
      },
      allowExchange : 0,
      currentExchangeNum : '',
      exchangeShellState : false //兑换弹现
    };
  },
  computed: {},
  mounted() {
    let that = this;
    that.bodypaddingtop = that.$route.query.paddingtop;
    that.shareUserId = that.$route.query.shareUserId;
    //可兑换奖励
    that.getCumulativeReward();
    //平台账号获取
    that.getinfousermass();
  },
  methods: {
    // 返回上一页
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //获取账户信息-平台账号
    getinfousermass() {
      let that = this;
      that.api.personalcenter
        .getinfouser_new({
          userId : that.shareUserId,
        })
        .then(res => {
          if(res.data.code==1){
            let resdata = res.data.data;
            that.accountMobile = res.data.data.mobile;
          }
      });
    },
    //右上角跳转兑换记录
    goShareWithdrawRecode(){
      let that = this;
      if(that.bodypaddingtop){
        that.$router.push({
          name: "sharewithdrawrecode",
          query : {
            shareUserId : that.shareUserId,
            paddingtop : that.bodypaddingtop,
            guildPageType : 3  //4为跳向提现记录页 3为兑换
          }
        });
      }else{
        that.$router.push({
          name: "sharewithdrawrecode",
          query : {
            shareUserId : that.shareUserId,
            guildPageType : 3  //4为跳向提现记录页 3为兑换
          }
        });
      }
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
              that.allowExchange = that.topAllData.exchangeAward;
            }
          });
    },
    //显示提现金额填写弹层
    ctrlExchangeShow(){
      this.exchangeShellState = true;
    },
    //全部兑换
    allTakeOver(){
      let that = this;
      if(that.allowExchange < 100){
        return that.$toast("仅可兑换100的整数倍");
      }else{
        that.currentExchangeNum = (Math.floor((that.allowExchange * 100) / 100)) * 100;
      }
    },
    //兑换
    ctrlExchange(){
      let that = this;
      if(that.currentExchangeNum <= 0){
        return that.$toast("兑换数量错误");
      }
      if(!(/^[1-9][0-9]*0{2}$/.test(that.currentExchangeNum))){
        return that.$toast("仅可兑换100的整数倍");
      }
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.redenvelopeWithdrawal({
            configKey : 'redEnvelopeToGoldCoin',
            userId : that.shareUserId,
            // userId : 9512,
            type : 3,
            operatingOsType : -1,
            moduleType : -1,
            appType : 3,
            payType : '1',
            givenVirtualCurrency : that.currentExchangeNum / 100
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              if(res.data.info == 'success'){
                //刷新余额
                that.getCumulativeReward();
                this.exchangeShellState = false;
                //跳转兑换记录
                that.goShareWithdrawRecode();
                that.$toast("兑换成功");
              }
            }
          });
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
@import url("../index/css/sharecommon.less");
@import url("../sharewithdraw/css/index.less");
</style>