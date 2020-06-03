<template>
  <div class="help_buy_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>购买帮助</span>
    </div>
    <div class="buy-txt">
      <p>1，在主播间，右上角有立即购买字样，可对您喜爱的商品点击立即购买选择商品规格进行下单购买，付款方式可选择微信或支付宝，若您没有微信或支付宝，可联系专属客服。</p>
      <p>2，红利商品需在间由主播发送抢购链接进行购买，第一个抢购成功的用户获得专属红利分享权（请查阅什么是红利人）。</p>
      <p>3，每日最新商品，可在分类专区收藏或购买您喜爱的商品。</p>
      <p>4，填写您的收货地址和手机号，确认订单并付款。</p>
      <p>5，如您在购买商品过程中遇见问题，可随时联系您的专属客服帮您解决。</p>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    methods:{
        goback() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
  @import "../index/css/index.less";
</style>




