<!-- 组件说明 -->
<template>
  <div class="sharedetails_box">
    <div class="header clearfix">
      <img
        @click="$router.go(-1)"
        style="transform:rotate(180deg);"
        src="./../../../../assets/imgs/icons/sp-gengduo@2x.png"
        alt
      />
      <p>邀请主播明细</p>
    </div>
    <div class="section-con">
      <div class="yao-type-tit">时间为通过认证时间</div>
      <div class="list-content">
        <div class="hd">
          <span class="lt">用户信息</span>
          <span  class="rt">ID账号</span>
        </div>
        <ul>
          <li>
            <div class="lt">
              <h3>想你的猫</h3>
              <div class="btm">2017-02-12  12:30:20</div>
            </div>
            <div class="rt">2351022</div>
          </li>
          <li>
            <div class="lt">
              <h3>想你的猫</h3>
              <div class="btm">2017-02-12  12:30:20</div>
            </div>
            <div class="rt">2351022</div>
          </li>
          <li>
            <div class="lt">
              <h3>想你的猫</h3>
              <div class="btm">2017-02-12  12:30:20</div>
            </div>
            <div class="rt">2351022</div>
          </li>
          <li>
            <div class="lt">
              <h3>想你的猫</h3>
              <div class="btm">2017-02-12  12:30:20</div>
            </div>
            <div class="rt">2351022</div>
          </li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {

    };
  },
  computed: {},
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    },
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
  },
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
@import url("./css/index.less");
</style>

<style>

</style>