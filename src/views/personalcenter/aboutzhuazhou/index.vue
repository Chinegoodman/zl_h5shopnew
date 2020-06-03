<!-- 组件说明 -->
<template>
  <div class="about_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>关于聚美金品</span>
    </div>
    <div class="about-txt">
      <p>开发中，敬请期待...</p>
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
      this.$router.push({ path: "/personalcenter/index" });
    },
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
@import "./index.less";
</style>