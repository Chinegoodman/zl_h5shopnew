<!-- 组件说明 -->
<template>
  <div class="confirmorderwrap">
    <div class="returnindex" @click="shopback">首页 < 联系合作</div>
    <div class="concat-methoded">
        <p>邮箱: <span>peter@17biyi.com</span></p>
        <p>电话: <span>‭(010) 6493 5833‬</span></p>
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
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    }
  },
  mounted() {
    let that = this;
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

<style>
body{
  background: #763aff url("./../../../assets/imgs/icons/bg_body.png") no-repeat 0 0 ;
}
 .confirmorderwrap{
  width : 1200px; 
  margin : 0 auto; 
  padding: 0.3rem 0.5rem;
}
.confirmorderwrap p{
  padding: .2rem 0;
  font-size: 0.26rem;
  font-weight: 500;
  color: rgba(255,255,255,.75);
}
.confirmorderwrap .returnindex{
  font-size: 0.26rem;
  font-weight: 500;
  color: rgba(255,255,255,.75);
  cursor: pointer;
}
.confirmorderwrap .concat-methoded{
  padding : 200px 150px;
  border : 1px solid rgba(255,255,255,.35);
  margin-top : 25px;
}
.confirmorderwrap .concat-methoded p{
  font-size: 0.32rem;
  padding : 20px;
}
.confirmorderwrap .concat-methoded p span{
   font-size: 0.34rem;
}
</style>