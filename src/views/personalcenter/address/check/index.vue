<!-- 组件说明 -->
<template>
  <div class="check">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>选择地址</span>
    </div>
    <!-- 地址管理 -->
    <div class="sel_address">
      <ul>
        <li v-for="(item,index) in addresslist" :key="index">
          <div class="address_list">
           <img :src="item.is_default==1?require('../../../../assets/imgs/address/dd-zuobiaoxz@2x.png'):require('../../../../assets/imgs/address/dd-zuobiaow@2x.png')" alt />
            <span class="alsp1">{{item.name}}</span>
            <span class="alsp2">{{item.phone}}</span>
            <p>{{item.province}} {{item.city}} {{item.area}} {{item.street}}</p>
            <p style="width:75%">{{item.address}}</p>
            <div class="icon_fu" ref="icon" @click="clickradio(index,item.id,item)"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="btn"  @click="gotoadd">+ 新增收货地址</div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      addresslist: []
    };
  },
  computed: {},
  created(){
  let that=this;
  let user = localStorage.getItem("user-info");
    let userj = JSON.parse(user);
    let userid = userj.userid;
    this.api.personalcenter.postaddresslist({uid:userid}).then(res=>{
        if(that.checked){
          let list= res.data.data.list.filter(function(item,index){
               return item.is_default === 1;
           })
           let add=res.data.data.list.map(function(item,index){
               if (item.is_default === 1) {
		           	   res.data.data.list.splice(index, 1);
		           }
           })
        res.data.data.list.unshift(list[0])
        }  
        that.addresslist=res.data.data.list
     })
  },
  methods: {
    gotoadd(){
      this.$router.push('/address/add')
    },
    clickradio(index,id,item) {
      sessionStorage.setItem("checkaddressitem",JSON.stringify(item));
      for (var i = 0; i < this.addresslist.length; i++) {
        this.$refs.icon[i].className = "icon_fu";
      }
      this.$refs.icon[index].className = "icon_fu1";
      this.$router.go(-1);
 },
    goback() {
      this.$router.go(-1);
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