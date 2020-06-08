<!-- 组件说明 -->
<template>
  <div class="invoicewrap">
    <div class="header">
      <img class="back" @click="shopback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>开具发票</span>
    </div>
    <div class="invoice-con">
      <ul>
        <li>
          开具类型
          <div class="rt">
            <van-radio-group v-model="radioperson" direction="horizontal" @change="kaijutype" >
              <van-radio name="1">个人</van-radio>
              <van-radio name="2">单位</van-radio>
            </van-radio-group>
          </div>
        </li>
        <li>
          发票类型
          <div class="rt">
            <van-radio-group v-model="radiotype" direction="horizontal" @change="invoicetype" >
              <van-radio name="2" v-if="istzj==0">纸质发票</van-radio>
              <van-radio name="1" v-if="istzj==1">电子发票</van-radio>
            </van-radio-group>
          </div>
        </li>
        <li>
          发票抬头
          <div class="rt">
            <input class="taitoumsg" v-model="taitoumsg" @blur="taitoumsginput"  type="text" placeholder="请输入抬头信息">
            <!-- <img src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt /> -->
          </div>
        </li>
        <li v-if="radioperson==2">
          纳税人识别号
          <div class="rt">
            <input class="taitoumsg" v-model="taxmsg" @blur="taxmsgblur"  type="text" placeholder="请输入纳税人识别号">
          </div>
        </li>
      </ul>
      <ul>
        <li @click="openinvoiceshellshell">
          发票内容
          <span class="asker"><img src="./../../../assets/imgs/icons/fpnr.png" alt /></span>
          <div class="rt">
            <span class="txt" >明细</span>
          </div>
          </li>
        <li>
          设置为默认抬头
          <div class="rt">
            <van-switch v-model="checked" @change="invoicecheckdefault" active-color="#07c160" inactive-color="#fff" />
          </div>
        </li>
      </ul>
      <ul class="permsg" v-if="istzj==1">
        <li>
          <span class="tit">收票人信息</span>
        </li>
        <li>
          收票人手机：
          <div class="rt">
            <input class="taitoumsg" v-model="personipone"  type="text" placeholder="请输入收票人手机号">
            <!-- <img src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt /> -->
          </div>
        </li>
        <li>
          收票人邮箱：
          <div class="rt">
            <input class="taitoumsg" v-model="personmail"  type="text" placeholder="请输入收票人邮箱">
          </div>
        </li>
      </ul>
      <div class="btm-area">
        <span :class="{'sure-gray':true, 'sure-active':submitbtnstate}" @click="submitaddinvoice" >确认</span>
        <p>本单不开具发票,<span @click="shopback">继续下单</span></p> 
      </div>
    </div>

    <!-- 发票内容弹层 start-->
    <div class="invoiceshell" v-if="invoiceshellshow">
        <div class="shell-cover" @click="shutinvoiceshellshell"></div>
        <div class="shell-content">
           <span class="tit">发票内容说明</span>
           <div class="con">
             <p>1、发票内容将显示详细商品名称与价格信息；</p>
             <p>2、部分商家可能开具发票内容为商品所属类别及价格信息，如有特殊需求，请向客服咨询。</p>
           </div>
           <span class="shutshell" @click="shutinvoiceshellshell"><img src="../../../assets/imgs/icons/spxqs-close.png" alt=""></span>
        </div>
    </div>
    <!-- 发票内容弹层 end-->

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
      personipone : '',
      personmail : '',
      invoiceshellshow : false,
      userID : '',
      submitbtnstate : true 
    };
  },
  computed: {},
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
      }
    },
    taxmsgblur(){
      var that = this;
      if(that.taxmsg == undefined || that.taxmsg == ''){
        that.submitbtnstate = false;
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
  //   let user = localStorage.getItem("user-info");
  //   let userj = JSON.parse(user);
  //   that.userId = userj.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
    that.userID = that.$store.state.user.userid;
    that.istzj = that.$route.query.istzj;
    that.getdefaultinvoice(); //上来加载默认发票
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
  },
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
    document.querySelector('body').setAttribute('style', '')
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
