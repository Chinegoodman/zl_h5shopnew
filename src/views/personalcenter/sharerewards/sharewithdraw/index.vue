<!-- 组件说明 -->
<template>
  <div :class="{'widthdrawwrap':true,'widthdrawwrapapp' : bodypaddingtop}">
      <div class="bgcover-section">
        <div class="header" :style="{paddingTop:bodypaddingtop+'px'}">
          <img class="back" @click="goback" src="./../../../../assets/imgs/shop/white-gd.png" alt />
          <div class="tit">提现</div>
          <span class="roles" @click="gosharewithdrawrecode" >提现记录</span>
        </div>
        <div class="top-pub top-wallet">
            <div class="wallet-in">
              <span class="t1">可提现余额</span>
              <div class="num"><span>{{allowCount}}</span></div>
              <span  class="drap" @click="ctrlWithdrapShow">提现</span>
            </div>
        </div>
      </div>
      <div class="pub-from-area center-area">
        <ul>
          <li>
            <span>支付宝账号：</span>
            <input type="text" placeholder="请设置您的支付宝账号信息" v-model="accountMsg">
          </li>
          <li>
            <span>姓名：</span>
            <input type="text" placeholder="请填写您的姓名" v-model="accountName">
          </li>
          <li>
            <span>手机号：</span>
            <input type="text" placeholder="请填写您的手机号" v-model="accountMobile">
          </li>
        </ul>
      </div>
      <div class="pub-btn-area">
        <span @click="changeAcount" v-if="accountMsgData && accountMsgData.id">修改账号信息</span>
        <span @click="addAcount" v-else>添加账号信息</span>
      </div>
      <div class="pub-tips ">
        <p class="tips"><span>*</span>请您认真填写您的支付宝账号信息</p>
        <p class="tips"><span>*</span>收入满100元，即可随时提现，提现需提现100元以上金额，提现 需扣除服务费6%</p>
      </div>
      <!-- 填写支付宝账号信息start -->
      <div class="withdrap-pub-shell paymsg-shell" v-if="hasnoAccountMsgTipShell">
        <div class="pub-shell-cover" @click="hasnoAccountMsgTipShell=false"></div>
        <div class="pub-shell-con paymsg-con">
          <p>请您填写支付宝账号信息</p>
          <span class="pub-shell-btn paymsg-btn" @click="hasnoAccountMsgTipShell=false">确定</span>
        </div>
      </div>
      <!-- 填写支付宝账号信息end -->
      <!-- 提现弹层start -->
      <div class="withdrap-pub-shell withdrap-shell" v-if="withdrapshellstate">
        <div class="pub-shell-cover shell-cover" @click="withdrapshellstate=false"></div>
        <div class="pub-shell-con shell-con">
          <p>提现方式：支付宝（<span>{{accountMsg}}</span>）</p>
          <div class="t">提现金额<span>（提现需100元以上金额）</span>：</div>
          <div class="text"><span>￥</span><input type="text" placeholder="请输入提现金额" v-model="currentWithdrawNum"></div>
          <div class="tip">可提现余额：￥{{allowCount}}<span @click="allTakeOver">全部提现</span></div>
          <span class="pub-shell-btn withdraw-btn" @click="ctrldrap">提现</span>
        </div>
      </div>
      <!-- 提现弹层end -->
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
      topAllData : { 
        cumulativeReward : 0 , //累计奖励
        exchangeAward : 0 //可兑换奖励
      },
      allowCount: 0,
      accountMsgData : {}, //账户信息添加与修改判断标识,不为null 证明添加过
      accountMsg : '', //账户信息
      accountName : '', //账户姓名
      accountMobile : '',//账户手机号
      currentAccountId : '', //当前账户ID，区分可能以后有多个
      currentWithdrawNum : '', //当前输入提现金额
      hasnoAccountMsgTipShell :false, //没有账户信息弹提示弹层
      withdrapshellstate : false //提现弹层显示标识
    };
  },
  computed: {},
  mounted() {
    let that = this;
    that.allowCount = that.$route.query.leiJiCount;
    that.bodypaddingtop = that.$route.query.paddingtop;
    that.shareUserId = that.$route.query.shareUserId;
    //获取可提现余额
    that.getCumulativeReward();
    //获取账户信息并以此炎标识判断是添加还是修改账户信息
    that.getAccountMsgFlag();
  },
  methods: {
    // 返回上一页
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //点击右上角-提现记录跳转
    gosharewithdrawrecode(){
      let that = this;
      if(that.bodypaddingtop){
        this.$router.push({
          name: "sharewithdrawrecode",
          query : {
            shareUserId : that.shareUserId,
            paddingtop : that.bodypaddingtop,
            guildPageType : 4  //4为跳向提现记录页 3为兑换
          }
        });
      }else{
        this.$router.push({
          name: "sharewithdrawrecode",
          query : {
            shareUserId : that.shareUserId,
            guildPageType : 4  //4为跳向提现记录页 3为兑换
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
            userId : that.shareUserId,
            // userId : 9512
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              that.topAllData = res.data.data;
              that.allowCount = that.topAllData.exchangeAward; 
            }
          });
    },
    //获取账户信息是添加还是修改标致
    getAccountMsgFlag(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.accountMsgFlag({
            userId : that.shareUserId,
            // userId : 9512,
            accountType : 1,
            account : '',
            mobile : ''
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              console.log('获取账户信息是添加还是修改标致');
              console.log(res);
              if(res.data.data === null){
                that.accountMsgData = null;
              }else{
                that.accountMsgData = res.data.data;
                that.accountMsg = res.data.data.account;
                that.accountName = res.data.data.realName;
                that.accountMobile = res.data.data.mobile;
                that.currentAccountId = res.data.data.id;
              }
            }
          });
      
    },
    //添加账户信息
    addAcount(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.addressAddMsg({
            accountType : 1,
            userId : that.shareUserId,
            realName : that.accountName,
            // userId : 9512,
            account : that.accountMsg,
            mobile : that.accountMobile
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              that.$toast("添加成功");
              that.getAccountMsgFlag();
              // window.location.reload();
            }else{
              that.$toast("添加失败");
            }
          });
    },
    //修改账户信息
    changeAcount(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.changeAdressAddMsg({
            accountType : 1,
            userId : that.shareUserId,
            // userId : 9512,
            id : that.currentAccountId,
            account : that.accountMsg,
            mobile : that.accountMobile,
            realName : that.accountName
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              that.$toast("修改成功");
              that.getAccountMsgFlag();
              // window.location.reload();
            }else{
              that.$toast("修改失败");
            }
          });
    },
    //显示填写提现金额弹层
    ctrlWithdrapShow(){
      if(this.accountMsgData){
        this.withdrapshellstate = true;
      }else{
        this.hasnoAccountMsgTipShell = true;
      }
    },
    //全部提现
    allTakeOver(){
      let that = this;
      if(that.allowCount < 100){
        return that.$toast("提现需100元以上金额");
      }else{
        that.currentWithdrawNum = Math.floor(that.allowCount / 100) * 100;
      }
    },
    //操作提现
    ctrldrap(){
      let that = this;
      if(that.currentWithdrawNum < 100){
        return that.$toast("提现需100元以上金额");
      }
      if(Number(that.currentWithdrawNum) > Number(that.allowCount)){
        return that.$toast("提现金额大于可提现余额");
      }
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.redenvelopeWithdrawal({
            configKey : 'redEnvelopeWithdrawal',
            userId : that.shareUserId,
            // userId : 9512,
            type : 4,
            operatingOsType : -1,
            moduleType : -1,
            appType : 1,
            realName : that.accountName,
            mobile : that.accountMobile,
            payType : '1',
            bankAccount : that.accountMsg,
            givenVirtualCurrency : that.currentWithdrawNum
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              if(res.data.info == 'success'){
                that.withdrapshellstate = false;
                //刷新可提现余额
                that.getCumulativeReward();
                //跳转提现记录页
                that.gosharewithdrawrecode();
                that.$toast("提现成功");
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
@import url("./css/index.less");
</style>

<style>
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