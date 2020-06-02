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
              <van-radio name="1">纸质发票</van-radio>
              <van-radio name="2">电子发票</van-radio>
            </van-radio-group>
          </div>
        </li>
        <li>
          发票抬头
          <div class="rt">
            <input class="taitoumsg" v-model="taitoumsg"  type="text" placeholder="请输入抬头信息">
            <!-- <img src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt /> -->
          </div>
        </li>
        <li>
          纳税人识别号
          <div class="rt">
            <input class="taitoumsg" v-model="taxmsg"  type="text" placeholder="请输入纳税人识别号">
          </div>
        </li>
        <li>
          发票内容
          <span class="asker"><img src="./../../../assets/imgs/icons/fpnr.png" alt /></span>
          <div class="rt">
            <span class="txt" >明细</span>
          </div>
          </li>
        <li>
          设置为默认抬头
          <div class="rt">
            <van-switch v-model="checked" active-color="#07c160" inactive-color="#fff" />
          </div>
        </li>
      </ul>
      <div class="btm-area">
        <span class="sure">确认</span>
        <p>本单不开具发票,<span>继续下单</span></p> 
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
      radioperson : '1', //开具类型
      radiotype : '1', //发票类型
      taitoumsg : '', //发票抬头
      taxmsg : '', //纳税人信息
      checked : true 
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
      console.log('name');
      console.log(name);
    },
    invoicetype(name){
      console.log('name');
      console.log(name);
    },
    // 获取商品列表
    diamondlist(){
      let that = this;
      that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });  
      that.api.homedetails
      .diamondlistpost({
        "id" : that.type_id
      })
      .then(res => {
        that.$toast.clear();
        that.listloading = false;
        if(res.data.code == 1){
          if (res.data.data.list && res.data.data.list.length > 0) {
            that.nodatashow = false;
            that.hasmorepage = 2;
            res.data.data.list.forEach(e => {
              that.diamondlistmsg.push(e);
            });
          } 

          that.nextPage = res.data.data.nextpage;
          if (that.nextPage != "" && that.nextPage !== undefined) {
            that.listfinished = false;
            that.listloading = false;
          } else {
            if(that.hasmorepage === 1){
                that.nodatashow = true;
              return;
            }else{
              that.listfinished = true;
              that.listloading_ = false;
              that.finished_text = '亲~已经到底了';
            }
            
          }
          that.$forceUpdate();
          that.$toast.clear();
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
