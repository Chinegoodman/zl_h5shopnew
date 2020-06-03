<template>
  <div class="help_buy_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>费用说明</span>
    </div>
    <div class="instruction-txt">
      <div class="txt-mass">
            <div class="mass-tit">1、金价&石料</div>
            <div class="mass-content">
                聚美金品平台为了给用户提供最实惠的商品价格，黄金原料与镶嵌石材（钻石、宝石等）采集自供应链源头企业，对接国际黄金原材料实时价格，在商品计价上以实时变动金价为计价基础，最大程度上让用户感受到实惠价格的基础上，购买到优质的商品。
                <!-- <div>
                    素金产品价格=实时金价*商品克重
                </div> -->
            </div>
        </div>
        <div class="txt-mass">
            <div class="mass-tit">2、工费</div>
            <div class="mass-content">
                聚美金品平台为用户精选了国内上千家黄金珠宝加工源头企业供货，杜绝了经销商加价、业务员抽成和黄牛哄抬物价，以商品最原始的价格面向广大消费者，根据商品各自不同的生产工艺计价，一反市面上模糊概念高价工费的情况。
                <!-- <div>
                    手工费=商品工艺费 * 商品克重
                </div> -->
            </div>
        </div>
        <div class="txt-mass">
            <div class="mass-tit">3、检测费</div>
            <div class="mass-content">
                聚美金品平台为了保证商品品质与质量，根据国家质量检测的标准建立了自己的质检工作室，免费为大家进行品质检测，严格进行检测把关，并根据国家对黄金产品的要求送交第三方国标检测，双重关卡严守质量关，让用户买的放心，用的安心。
                <!-- <div>
                    服务费=（人工检测费 * 商品克重）+国标检测费+保价费
                </div> -->
            </div>
        </div>
        <div class="txt-mass">
            <div class="mass-tit">4、快递费&保险费</div>
            <div class="mass-content">
                聚美金品平台为了能让最优质的商品能够安全的送达，与顺丰快递强强联合，让用户购买的商品得到国际标准的运输服务和安全保障，快递费与保价费完全使用顺丰提供的计费标准，绝不多收。
            </div>
        </div>
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

