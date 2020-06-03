<template>
  <div class="help_buy_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>红利人介绍</span>
    </div>
    <div class="instruction-txt">
        <ul class="hongli">
            <li>
                1、平台工厂上新日聚美金品用户进行抓抢，第一个付款成功抓到新品 宝贝的用户，拥有该新品宝贝的全平台订单专属红利分享权。
            </li>
            <li>
                2、该新品宝贝每成交一笔订单，黄金、k金、镶嵌、钻石、宝石、 玉石等珠宝类首饰，每单分享2元红利，白银类产品，每单分享1元红利。

            </li>
            <li>

                3、抢到专属红利分享权的用户订单属于定制类产品不能退货，取 消订单即视为自动放弃专属红利分享权。

            </li>
            <li>
                4、未抢到专属红利分享权的用户，订单关闭后的2个小时内可取消订单，2个小时之后由于商品属于定制产品在制作中则不能取消订 单。
            </li>
            <li>5、聚美金品用户会员抢到的专属红利分享权，黄金、k金、镶嵌、钻石、宝石、玉石等珠宝类首饰，每单分享5元红利，白银类品，每单分享2元红利。</li>
        </ul>
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

