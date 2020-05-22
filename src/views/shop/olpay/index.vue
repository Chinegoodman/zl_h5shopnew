<!-- 组件说明 -->
<template>
  <div class="confirmorderwrap">
    <div class="header clearfix">
      <img
        @click="$router.go(-2)"
        style="transform:rotate(180deg);"
        src="./../../../assets/imgs/icons/sp-gengduo@2x.png"
        alt
      />
      <p>在线支付</p>
    </div>
    <div class="containerwrap">
      <div class="top">
        <div class="top1" v-if="paystatus == true">
          <img src="./../../../assets/imgs/icons/tstjcg.png" alt="抓周">
          <p>订单支付成功，感谢您的购买！</p>
        </div>
        <div class="top1 top11" v-if="paystatus == false">
          <img src="./../../../assets/imgs/icons/tstjcg.png" alt="抓周">
          <p>订单提交成功，请尽快付款哦！</p>
          <span>未支付订单在30分钟后自动关闭</span>
        </div>
        <div class="top2">
          <div class="li clearfix">
            <span class="title">订单金额：</span>
            <p>￥{{confirmpageorder.payfundata.amont}}</p>
          </div>
          <div class="li clearfix">
            <span class="title titleh">收货信息：</span>
            <p>{{addressdata.name}}</p>
            <p>{{addressdata.phone}}</p>
            <p>{{addressdata.province}}&nbsp;{{addressdata.city}}&nbsp;{{addressdata.area}}&nbsp;{{addressdata.address}}</p>
          </div>
        </div>
        <div class="top3">
          <p @click="checkorder">查看订单</p>
          <p class="red" v-if="paystatus == true" @click="$router.go(-2)">完成</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import base from "@/api/base.js"; // 导入接口域名列表
// import axios from "axios";
import {
  setsessionStorage,
  getsessionStorage,
  getlocalStorage
} from "./../../../utils/index.js";
// import { constants } from 'fs';
//import x from ''
export default {
  components: {},
  data() {
    return {
      userID:'',
      // paytype 支付方式数据
      confirmpageorder:{
        payfundata:{
          amont:''
        }
      },//订单数据
      addressdata:'',//地址数据
      paystatus:'',//订单是否完成状态
    };
  },
  computed: {
  },
  methods: {
    // 查看订单页 ==>>目前调列表页
    checkorder(){
      this.$router.push({path:'/personalcenter/order/index',query:{tabid:0}});
    }
  },
  mounted() {
    let that = this;
    that.userID = that.$store.state.user.userid;
    that.confirmpageorder= getlocalStorage('confirmpageorder');
    that.addressdata = getsessionStorage("checkaddressitem");
    that.paystatus = getsessionStorage('paystatus');
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
@import url("./css/index.less");
</style>

<style lang='less'>
//@import url()
</style>