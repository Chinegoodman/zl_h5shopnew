<!-- 组件说明 -->
<template>
  <div class="level_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>用户等级</span>
    </div>
     <img src="http://playback.17biyi.com/92118ae6914862db73b6b9d7f0000121" alt="聚美金品">
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
  beforeDestroy() {
    clearInterval(this.setIntervaldd);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import "./index.less";
</style>