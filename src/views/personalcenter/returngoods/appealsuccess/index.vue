<template>
  <div class="returnSubmit">
        <div class="header">
      <img class="back" @click="goback" src="@/assets/imgs/follow/xiangqing@2x.png" alt />
      <span>申诉</span>
    </div>
    <div class="appelsuccess">
      <div class="contenst">
        <span class="im">
          <img src="@/assets/imgs/icons/tstjcg.png" alt="">
        </span>
        <div class="txt-tip">申诉请求提交成功</div>
        <p class="instraction">我们将会尽快处理您的申诉请求，请您保持电话通畅，我们会通过电话与您取得联系。</p>
        <div class="btn">
          <span @click="returnpage">确认</span>
        </div> 
      </div>
    </div>
  </div>  
</template>
<script>
 
export default {
  data() {
    return {
      
    };
  },
  computed: {},
  methods: {
    goback(){
      this.$router.push({
        path: "/personalcenter/order",
        query: {
          tabid: 5
        }
      });
    },
    returnpage() {
      this.$router.push({
        path: "/personalcenter/order",
        query: {
          tabid: 2
        }
      });
    }
  },
  mounted() {
    
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
.returnSubmit {
  background: rgba(243, 243, 243, 1);
    width: 100vw;
    height: 100vh;
    font-family:PingFang SC;
    font-weight:500;
    .header {
        width: 100%;
        border-bottom: 1px solid #DEDEDE;
        background: white;
        text-align: center;
        // position: fixed;
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
    .appelsuccess{
      padding-top: 1rem;
      .contenst {
        font-family:PingFang SC;
        font-weight:500;
        .im{
          display: block;
          width: 1.04rem;
          height: 1.04rem;
          margin: 0 auto;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .txt-tip{ 
          margin-top: .5rem;
          text-align: center;
          font-size: .32rem;
          color:rgba(31,31,31,1);
        }
        .instraction{
          font-size: .28rem;
          color:rgba(191,191,191,1);
          line-height: .42rem;
          margin-top: .2rem;
          padding: 0 .95rem;
        }
        .btn{
          margin-top: 1rem;
          span{
            display: block;
            width: 3.2rem;
            height: .7rem;
            line-height: .7rem;
            color:rgba(255,255,255,1);
            font-size: .32rem;
            background:rgba(255,189,4,1);
            border-radius: .32rem;
            text-align: center;
            margin: 0 auto;
          }
        }
      }
    }
}  
</style>


