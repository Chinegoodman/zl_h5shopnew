<!-- 组件说明 -->
<template>
  <div class="address">
    <div class="header">
      <!-- <p class="btn1" @click="administration">选择</p> -->
      <img class="back" @click="goback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>{{headertitle}}</span>
    </div>
    <div class="sel_address">
      <ul>
        <li v-for="(item,index) in addresslist" :key="index">
          <div class="address_list">
            <img :src="item.is_default==1?require('../../../assets/imgs/address/dzgl.png'):require('../../../assets/imgs/address/dd-zuobiaow@2x.png')" alt />
            <span class="alsp1">{{item.name}}</span>
            <span class="alsp2">{{item.phone}}</span>
            <p class="address"><span class="default" v-if="item.is_default==1">默认</span>{{item.province}} {{item.city}} {{item.area}} {{item.street}}</p>
            <p style="width:75%">{{item.address}}</p>
            <div class="icon" @click="edit(item)"></div>
          </div>
        </li>
      </ul>
      <div class="bottom">
        <div class="btn" @click="gotoadd">+ 新增收货地址</div>
      </div>
    </div>
  </div>
</template>


<script>
import {
  setsessionStorage,
  getsessionStorage
} from "@/utils/index.js";
export default {
  components: {},
  data() {
    return {
      headertitle: "地址管理",
      adn: "管理",
      checked: false,
      areaList: [],
      addresslist: []
    };
  },
  computed: {},
  created() {
    let that = this;
    // let user = localStorage.getItem("user-info-h5");
    // let userj = JSON.parse(user);
    let userid = this.$store.state.user.userid;
    this.api.personalcenter.postaddresslist({ uid: userid }).then(res => {
      if (that.checked) {
        let list = res.data.data.list.filter(function(item, index) {
          return item.is_default === 1;
        });
        let add = res.data.data.list.map(function(item, index) {
          if (item.is_default === 1) {
            res.data.data.list.splice(index, 1);
          }
        });
        res.data.data.list.unshift(list[0]);
      }
      that.addresslist = res.data.data.list;
    });
  },
  methods: {
    administration() {
      this.$router.push("/address/check");
    },
    edit(itemdata) {
      setsessionStorage('editdata',itemdata);
      this.$router.push({
        name: "addressedit",
        params: {
          // editid: itemdata.id
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    gotoadd() {
      this.$router.push("/address/add");
    }
  },
  mounted() {},
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
@import "./index.less";
</style>
<style lang='less'>
body{
  background-color:#F7F7F7;
}
</style>