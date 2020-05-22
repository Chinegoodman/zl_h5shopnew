<!-- 组件说明 -->
<template>
  <div class="help_buy_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>购买帮助</span>
    </div>
    <div class="instruction-txt">
       <div class="txt_w">
          <h2>购买交易</h2>
          <router-link tag="a"   to="/personalcenter/helpbuy/buy">如何购买商品?</router-link>
          <router-link tag="a"   to="/personalcenter/helpbuy/hongli">什么是红利人?</router-link>
          <router-link tag="a"   to="/personalcenter/helpbuy/fei">费用说明</router-link>
       </div>
       <div class="txt_w">
          <h2>其他</h2>
          <router-link tag="a"   to="/personalcenter/helpbuy/useragreement">用户协议</router-link>
          <router-link tag="a"   to="/personalcenter/helpbuy/yinsi"> 隐私政策</router-link>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
      
  },
  computed: {},
  methods: {
    goback() {
      this.$router.push({ path: "/personalcenter/index"});
    },
    // 地址管理页
    gotoaddresspage() {
      this.$router.push({ name: "personalcenteraddress" });
    }
  },
  mounted() {},
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
   @import "./css/index.less";
</style>