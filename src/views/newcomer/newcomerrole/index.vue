<template>
  <div class="newcomerrole_wrap">
    <div class="header">
      <img class="back" @click="goback" src="@/assets/imgs/follow/xiangqing@2x.png" alt />
      <span>新人规则</span>
    </div>
    <div class="newcomerrole-txt">
      <p>1、账号注册7个自然日内（含）且在此时间内未在抓周购买过任何商品的账号，定义为新手账号，新人专区商品可享受新人专享价。</p>
      <p>2、新人专区每个新人账号仅可享受一次新人专享价。</p>
      <p>3、已购买过新手专区商品的账号，该专区商品将恢复原价，同时解除限购一件的限制。</p>
      <p>4、专区内商品一经售出不予退还，确认下单即代表您同意此项条款。</p>
      <p>5、如有疑问请联系您的抓周专属客服，本活动解释权归抓周所有。</p>
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
  .newcomerrole_wrap{
    font-family:PingFang SC;
    font-weight:500;
    .header {
        width: 7.5rem;
        border-bottom: 1px solid #DEDEDE;
        background: white;
        text-align: center;
        position: fixed;
        z-index: 100;

        img {
            transform: rotate(180deg);
            width: 0.2rem;
            height: 0.35rem;
            display: block;
            padding: 0.4rem 0;
            margin-left: 0.46rem;
        }

        span {
            position: absolute;
            top: 0.4rem;
            left: 50%;
            margin-left: -0.55rem;
            font-size: 0.34rem;
            color: #333333;
        }
    }
    .newcomerrole-txt{
      padding: 1.5rem .2rem .2rem;
      p{
        font-size: .24rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(31,31,31,1);
        line-height: .38rem;
        padding-bottom: .28rem;
      }
    }
  }
</style>




