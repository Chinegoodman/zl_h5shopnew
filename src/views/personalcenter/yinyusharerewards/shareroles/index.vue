<!-- 组件说明 -->
<template>
  <div :class="{'shareroleswrap':true,'shareroleswrapapp' : bodypaddingtop}">
      <div class="header" :style="{paddingTop:bodypaddingtop+'px'}">
          <img class="back" @click="goback" src="./../../../../assets/imgs/shop/white-gd.png" alt />
          <div class="tit"></div>
      </div>
      <div  class="toptit">
        <img src="./../../../../assets/imgs/personal/yinyu-share/sharerolecenter.png" alt="">
      </div>
      <div class="roleswrap-con">
        <div class="sharebigtext">
            <img src="./../../../../assets/imgs/personal/yinyu-share/sharebigtext.png" alt="">
        </div>
        <div class="txt-sec">
          <span class="tit">
            <img src="./../../../../assets/imgs/personal/yinyu-share/sharetit01.png" alt="">
          </span>
          <p>您邀请的用户在音娱平台通过赠送礼物、购买会员、坐骑、饰品等消费，您将获得<span class="num">{{userPercentage}}%</span>的消费提成！</p>
        </div>
        <div class="txt-sec">
          <span class="tit">
            <img src="./../../../../assets/imgs/personal/yinyu-share/sharetit02.png" alt="">
          </span>
          <p>您邀请的用户在音娱语音平台通过音符提现的方式获得收益，您将获得<span class="num">{{anchorPercentage}}%</span>的收入提成！</p>
        </div>
        <div class="txt-sec">
          <span class="tit">
            <img src="./../../../../assets/imgs/personal/yinyu-share/sharetit03.png" alt="">
          </span>
          <p>奖励上不封顶，后续还会有更多转发福利，敬请期待！</p>
        </div>
        <div class="tips">ps：本活动最终解释权归音娱直播所有。</div>
      </div>
      <div class="btn-area" @click="lijishare"></div>
  </div>
</template>

<script>
import {jsCallShareRolesfn} from './../../../../utils/appjh.js'
export default {
  components: {

  },
  data() {
    return {
      userPercentage : 0, //邀请用户获得消费百分比
      anchorPercentage : 0, //邀请主播获得消费百分比
      bodypaddingtop : 0, //客户端传来的top值 
      guildPageType : '', //从哪个页跳来的标识
      allTakeNum : 0,
      recodesList : [],
      webtype : 0 //识别是否客户端
    };
  },
  computed: {},
  mounted() {
    let that = this;
    document.querySelector('body').setAttribute('style', 'background-color:#101118');
    that.bodypaddingtop = that.$route.query.paddingtop;
    that.shareUserId = that.$route.query.shareUserId;
    that.webtype = that.$route.query.webtype;
    that.getGlobalObtainProportion();
    that.getGlobalObtainProportionAnchor();
  },
  methods: {
    // 返回上一页
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //立即分享
    lijishare(){
      let that = this;
      if(that.webtype===0){
          jsCallShareRolesfn();
          return;
      }else{
          setTimeout(() => {
            window.location.href = "http://test.testh5.zhulihr.com/share/shareregist.html?shareUserId=" + that.shareUserId + '&platform=1&sharetype=2';
          }, 800);
      }
    },
    //获取邀请用户-消费提成百分比
    getGlobalObtainProportion(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.globalObtainProportion({
            configKey : 'cashbackConsumption',
            operatingOsType : -1,
            moduleType : -1,
            appType : 3
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              // console.log('res比例');
              // console.log(res);
              that.userPercentage = res.data.data * 100; 
            }
          });
    },
    //获取邀请主播-消费提成百分比
    getGlobalObtainProportionAnchor(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.globalObtainProportion({
            configKey : 'cashbackWithdrawal',
            operatingOsType : -1,
            moduleType : -1,
            appType : 3
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              // console.log('res比例2');
              // console.log(res);
              that.anchorPercentage = res.data.data * 100; 
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

<style scoped>

</style>