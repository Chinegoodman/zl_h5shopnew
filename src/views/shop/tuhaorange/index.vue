<!-- 组件说明 -->
<template>
  <div class="tuhaorangewrap" :style="{'height':innerHeight}">
    <div class="header">
      <img class="back" @click="shopback" src="../../../assets/imgs/shop/returnprev.png" alt />
      <span>土豪榜</span>
    </div>
    <div class="tuhaorange-con">
      <div class="topnav">
        <ul>
          <li class="active"><span>日榜</span></li>
          <li><span>周榜</span></li>
          <li><span>月榜</span></li>
        </ul>
      </div>
      <div class="notice">
        <span><img src="../../../assets/imgs/shop/tz-tips.png" alt=""></span>
        <div>土豪榜按用户打赏花费的金币进行排行，每日0点结算。</div>
      </div>
      <div class="list-area">
         <div class="area-cover"></div>
         <div class="area-box">
           121313
         </div>
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
import {
    //   AddressEdit,
    //   Area,
    //   Calendar,
    //   Checkbox,
    //   CheckboxGroup,
    //   CountDown,
    //   DatetimePicker,
    //   Dialog,
    //   DropdownItem,
    //   Form,
    //   Field,
    //   ImagePreview,
    //   Locale,
    //   Notify,
    //   Picker,
    //   Sku,
    //   SwipeCell,
    RadioGroup,
    Radio,
    Switch 
    // ====项目中可能用到的===
    //  Uploader,
    // Tab,
    // Tabs,
    // List,
    // Lazyload,
    // Search
    // ====项目中可能用到的===
    // Toast
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import {
  setsessionStorage
} from "./../../../utils/index.js";
export default {
  components: {
   vanRadioGroup : RadioGroup,
   vanRadio : Radio,
   vanSwitch : Switch 
  },
  data() {
    return {
      istzj : '', //是否为投资金商品
      radioperson : '1', //开具类型
      radiotype : '2', //发票类型 1为电子 2为纸质
      taitoumsg : '', //发票抬头
      taxmsg : '', //纳税人信息
      checked : false, //是否默认
      personipone : '', //个人电话
      personmail : '',  //个人邮箱
      invoiceshellshow : false, //发票弹层
      userID : '', //用户id
      submitbtnstate : true  //发票提交按钮状态
    };
  },
  computed: {
    innerHeight(){
      return window.innerHeight + 'px';
    }
  },
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    },
    kaijutype(name){
      if(name==1){
        this.taitoumsg = '个人';
        this.taxmsg = '';
      }else{
        this.taitoumsg = '';
      }
      this.radioperson = name;
    },
    invoicetype(name){
      this.radiotype = name;
    },
    invoicecheckdefault(name){
      if(name == 1){
        this.checked = true;
      }else{
        this.checked = false;
      }
      this.checked = name;
    },
    taitoumsginput(){
      var that = this;
      if(that.taitoumsg == undefined || that.taitoumsg == ''){
        that.submitbtnstate = false;
      }else{
        that.submitbtnstate = true;
      }
    },
    taxmsgblur(){
      var that = this;
      if(that.taxmsg == undefined || that.taxmsg == ''){
        that.submitbtnstate = false;
      }else{
        that.submitbtnstate = true;
      }
    },
    openinvoiceshellshell(){
      this.invoiceshellshow = true;
    },
    shutinvoiceshellshell(){
      this.invoiceshellshow = false;
    },
    // 获取默认发票内容
    getdefaultinvoice(){
      let that = this;
      that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });  
      that.api.shopcart
      .takedefaultinvoice({
        "userId" : that.userID
      })
      .then(res => {
        that.$toast.clear();
        if(res.data.code == 1){
          that.invoiceOrder = res.data.data.invoiceOrder;
          if(that.istzj == 0){ //暂时不用后端返回的字段(有问题)
            that.radiotype = "2";
          }else{
            that.radiotype = "1";
          }
          that.taitoumsg = res.data.data.invoiceTitle;
          that.taxmsg = res.data.data.taxCode;
          if(!that.taitoumsg && !that.taxmsg){
            that.submitbtnstate = false;
          }
          if(res.data.data.firstChoice == 1){
            that.checked = true;
          }
        }
        else{
          that.$toast(res.data.info);
        }
      })
    },
    //确认新增发票
    submitaddinvoice(){
      let that = this;
      if(that.taitoumsg == undefined || that.taitoumsg == ''){
        that.$toast('发票抬头不能为空');
        return;
      }
      if(that.radioperson == 2 && (that.taxmsg == undefined || that.taxmsg == '')){
        that.$toast('纳税人识别号不能为空');
        return;
      }
      if(that.checked == true){
        that.checked = 1;
      }else{
        that.checked = 0;
      } 
      that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });   
      that.api.shopcart
      .takeaddnewinvoice({
        "userId" : that.userID,
        "invoiceType" : that.radiotype,
        "invoiceOrder" : that.radioperson,
        "invoiceTitle" : that.taitoumsg,
        "taxCode" : that.taxmsg,
        "firstChoice" : that.checked,
        "reciverPhone" : that.personipone,
        "reciverMail" : that.personmail
      })
      .then(res => {
        that.$toast.clear();
        if(res.data.code == 1){
          let invoicenewmsg = {
            id : res.data.data.id,
            type : res.data.data.invoiceType,
            invoicecontent : res.data.data.invoiceContent
          }
          setsessionStorage('invoicenewmsg',invoicenewmsg)
          that.shopback();
        }
        else{
          that.$toast(res.data.info);
        }
      })
    }
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
    that.userID = that.$store.state.user.userid;
    that.istzj = that.$route.query.istzj;
    that.getdefaultinvoice(); //上来加载默认发票
  },
  beforeCreate() {
    // document.querySelector('body').setAttribute('style', 'background-color: #FFBD04')
  },
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
    // document.querySelector('body').setAttribute('style', '')
  },
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import url("./css/index.less");
</style>
<style lang='less'>
  .invoice-con ul li .van-radio__icon--checked .van-icon{
    background:rgba(255,189,4,1);
    border-color: rgba(255,189,4,1);
  }
  .invoice-con ul li .van-switch{
    width: .9rem;
    height: .3rem;
    border-width : 2px;
  }
  .invoice-con ul li .van-switch__node{
    width: .3rem;
    height: .3rem;
    border : 1px solid rgba(0,0,0,.1);
  }
</style>
