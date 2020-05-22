<template>
  <div class="returngoods">
    <div class="header">
      <img src="@/assets/imgs/icons/dd-gengd@2x.png" alt class="back"  @click="goback" />
      <span>申请退款</span>
    </div>
    <!-- 商品信息部分 -->
    <div class="goodsmass clearfix" v-if="details">
      <div class="masspic">
        <img v-if="details.orderItemList[0].productPic" :src="details.orderItemList[0].productPic" alt="" />
        <img v-else src="../../../../assets/logo-gray.png" alt />
      </div>
      <div class="masscontent">
        <div class="shoptit _txtov2">{{details.orderItemList[0].productName}}</div>
        <div class="shopys">
          <span>{{details.orderItemList[0].productAttr}}</span>
        </div>
        <div class="shop">支持七天无理由退货</div>
      </div>
      <div class="massmoney clearfix">
        <div class="money"><span class="ic">￥</span>{{details.orderItemList[0].productPrice}}</div>
        <div class="shopnum clearfix">
          <span @click="jian()">-</span>
          <span class="show">{{quantity}}</span>
          <span @click="jia(details.orderItemList[0].productQuantity)">+</span>
        </div>
      </div>
    </div>
    <!-- 退货原因部分 -->
    <div class="content">
      <div class="contenttop clearfix">
        <div class="toptit">退款原因</div>
        <div class="topchose clearfix" @click="thyyshow=true">
          <span>{{name}}</span>
          <div class="chosepic">
            <img src="@/assets/imgs/icons/dd-gengd@2x.png" alt />
          </div>
        </div>
      </div>
      <div class="contentmass clearfix">
        <div class="masstit">退款说明：</div>
        <textarea name id cols="30" rows="10" placeholder="退货说明，100字以内..." v-model='textarea'></textarea>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="returnbtnbox">
      <div class="returnbtn" v-if="!subOk" @click="subReturnGoods(details)">提交</div>
      <div class="returnbtnh"  v-if="subOk" >提交</div>
    </div>
    <!-- 退货原因弹窗 -->
    <div class="returnyytc" v-if="thyyshow">
      <div class="returnyytc-inner">
        <div class="yytctit" ref="choosed_current">请选择退货原因</div>
        <div class="yytctit__list" v-for="(item,index) in becauseList" :key=index @click="select(index,item.id,item.name)">
          <div style=" display: flex;
            justify-content: space-between;
            align-items: center;">{{item.name}}
             <img style="width:0.3rem;height:0.3rem;" :src="active==index? require('@/assets/imgs/personal/return-select.png'):require('@/assets/imgs/personal/return-unselect.png')" alt />
            </div>
          <div style="font-size: .22rem;margin-top:.2rem;color: rgba(153,153,153,1);">{{item.platf_description}}</div>
        </div>
        <div class="yytctit__close" @click="thyyshow=false">关闭</div>
      </div>
    </div>
    <!-- 二次退货原因弹窗 -->
       <div class="returnyytc" v-if="twoSelect" >
      <div class="returnyytc-inner">
        <div class="yytctit">选择原因:{{name}}</div>
        <div style="font-size:.28rem;">
          由于抓周平台出售商品均为贵重物品和定制物品，选择此 项仅退金料费与石料费，手工费、平台费、快递费与保价 费已经实际产生，无法退
        </div>
        <div class="two_show">
          <div class="two_show_cancel" @click="cancelTwo()"> 取消</div>
          <div class="two_show_confirm" @click="twoSelect=false">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Uploader } from "vant";
import base from "@/api/base.js"; // 导入接口域名列表
Vue.use(Uploader);
export default {
  components: {},
  data() {
    return {
      thyyshow: false,
      active: 0,
      bacauseId: "", //取消原因id
      name: "请选择",
      twoSelect: false, //二次弹框
      becauseList: [], //退款原因列表
      subOk:false,
      uid:'',
      textarea:'',
      details:'',
      quantity : '' //退款数量
    };
  },
  computed: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    //原因列表
    cause(){
      let that = this;
      this.api.returngoods.cancleReason({type:1}).then(data=>{
       if(data.data.code==1){
         that.becauseList=data.data.data;
       }
        })
    },
    //提交退款
    subReturnGoods(item){
      let that = this;
      if(this.bacauseId!=''){
      this.api.returngoods.
      returnOrderMoney({
        userId:that.$store.state.user.userid,
        orderUid: that.uid,
        // source : item.source,
        source : 'H5',
        quantity: that.quantity,
        skuId: item.orderItemList[0].productSkuId,
        returnReason: that.name,
        description: that.textarea
        }).then(data=>{
          if(data.data.code==1){
              this.$toast("退款成功");
              that.goreturndetail();
          }else{
            this.$toast(data.data.info);
          }
        })
      }else{
        this.$toast("请选择原因");
        return;
      }
    },
    //跳转返回列表页
    goreturndetail(){
      var that = this;
      this.$router.push({
        path: "/personalcenter/order/index",
        query: {
          tabid: that.tabid
        }
      });
    },
    //选择退货原因
    select(index, id, name) {
      this.active = index;
      this.thyyshow = false;
      if (id == 1011) {
        this.twoSelect = true;
        this.bacauseId = id;
        this.name = name;
      } else {
        this.name = name;
        this.active = index;
        this.bacauseId = id;
      }
    },
    //再次确认提交
    returnGoods() {
      this.twoSelect = false;
    },
    //再次确认取消
    cancelTwo() {
      this.twoSelect = false;
      this.name = "请选择";
      this.bacauseId = "";
    },
    // 数量减
    jian() {
      let that = this;
      // debugger;
      if (that.quantity > 1) {
        that.quantity--;
      }else{
        that.$toast('至少选择一件商品');
      }
    },
    // 数量加
    jia(num) {
      let that = this;
      // debugger;
      if(that.quantity >= num){
        that.quantity = num;
        return;
      }
      that.quantity ++;
    },
  },
  
  mounted() {
    if(this.$route.query){
      this.uid = this.$route.query.uid,
      this.tabid = this.$route.query.tabid,
      this.details = JSON.parse(this.$route.query.details);
      this.quantity = this.details.orderItemList[0].productQuantity;
      // console.log(this.details);
    }
    this.cause();
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
@import "./css/index.less";
</style>
