<!-- 组件说明 -->
<template>
  <div class="newcomerwrap" id="newcomerwrap">
    <div @click="goback" class="topbtn"><img src="@/assets/imgs/icons/sp-pic-fanh@2x.png" alt="抓周"></div>
    <div class="banner">
      <img src="http://playback.17biyi.com/06d00317a38825085d542fcdc4643e50" alt="">
      <span @click="gotonewcomerrole" class="current-role"><img src="@/assets/imgs/newcomer/xrgz.png" alt=""></span>
    </div>
    <div class="xp_big_list">  
          <van-list
            class="goodslist_xp"
            v-model="listloading"
            :finished="listfinished"
            :finished-text="finished_text"
            :error.sync="vanerror"
            error-text="请求失败，点击重新加载"
            :offset="10"
            @load="homelistxp"
          >

            <div class="goodsli_xp" @click="gotogoodsdetails(item)"
              v-for="(item,index) in homelistmassage"
              :key="index"
            >
              <div class="im">
                <img :src="item.goodsImage?item.goodsImage:default_img_small" @error="defImg()" alt="珠宝商品" />
              </div>
              <div class="rt">
                <span class="tit">{{item.goodsTitle}}</span>
                <div class="box-price" v-if="isNewUser==1">
                  <div class="old-price">原价：<span>￥</span>{{item.marketPrice}}</div>
                  <div class="price"><span class="icon"><img src="@/assets/imgs/newcomer/xrj.png" alt=""></span><span>￥</span>{{item.price}}</div>
                </div>
                <div class="box-price-fei" v-if="isNewUser!=1">
                  <div class="price"><span class="icon"><img src="@/assets/imgs/newcomer/xrj.png" alt=""></span><span>￥</span> {{item.price}}</div>
                  <div class="current-price">原价：<span>￥</span><span class="pr">{{item.marketPrice}}</span></div>
                </div>
                <div class="bye">立即购买</div>
              </div>
            </div>  
          </van-list>
      </div>
    <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
    
  </div>
</template>

<script>
//import x from ''
import nodata from './../../../components/nodata.vue'
import {
  setsessionStorage
} from "./../../../utils/index.js";
import { checkdevice } from "@/utils/checkdevice.js";
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
    // ====项目中可能用到的===
    //  Uploader,
    Tab,
    Tabs,
    List,
    // Lazyload,
    // ====项目中可能用到的===
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'

export default {
  components: {
    nodata,
    vanTab:Tab,
    vanTabs:Tabs,
    vanList:List
  },
  data() {
    return {
      isNewUser : '', //是否新人用户
      nodatashow:false,
      pagetypedata:"discountshop", //无数据提示组件下类别
      active: 1,
      activeName: "",
      images: [], //banner图
      homelistmassage: [], //列表数组
      nextpage: "",
      listloading: false,
      listfinished: false,
      finished_text : '',
      vanerror: false,
      default_img_head : require('../../../assets/imgs/icons/default-head.png'),
      hasmorepage : 1 //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
    };
  },
  computed: {},
  mounted() {
    let that = this;

  },
  methods: {
    // 返回上一页
    goback(){
      this.$router.push({path:'/shop'});
    },
    defImg(){
        let img = event.srcElement;
        img.src = this.default_img_head;
        img.onerror = null;
    },
    gotonewcomerrole(){
      this.$router.push({name:'newcomerrole'});
    },
    // 点击跳转到用户登录页面
    gotologin(){ 
        let that = this;
        // if(that.$route.params.webtype==0){
        //     jsCallLogin()
        //     return;
        // }else{
        //     setTimeout(() => {
        //         that.$router.push({name:'login'})
        //     }, 800);
        // }
        setTimeout(() => {
            that.$router.push({name:'login'})
        }, 800);
    },
    // 是否登录
    iflogin(){
        let that = this;
        if(!that.$store.state.user.userid || that.$store.state.user.userid == 0){
            that.$toast({
                message: '暂未登录，请先登录',
                duration: 810,
                forbidClick: true
            });
            setTimeout(() => {
                that.gotologin();
            }, 810);
            return false;
        }else{
            return true
        }
    },
    // 跳转商品详情
    gotogoodsdetails(goodsid) {
      let that = this;
      //拉起下载及启动APP弹层
      // that.downloadcovershow = true;
       that.$router.push({
        name: "newcomerdetails",
        params: {
          product_id: goodsid.skuId,
          webtype: 1
        },
        query: {
          frompage: 'newcomer'
        }
      });
    },
    //列表
    homelistxp(){
      let that = this;
      that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 200000
      });  

      that.newcomer_param = {
        userId : that.$store.state.user.userid,
        deviceId : '',
        nextPage : that.nextpage
      }
      that.api.newcomer
        .getlistGiftGoods(that.newcomer_param)
        .then(res => {
          that.$toast.clear();
          if (res.data.code == 1) {
            that.listloading = false;
            if(res.data.data.goodsList && res.data.data.goodsList.length > 0){
              that.nodatashow = false;
              that.hasmorepage = 2;
              that.homelistmassage = that.homelistmassage.concat(res.data.data.goodsList);
            }
            that.nextpage = res.data.data.nextPage;
            that.isNewUser = res.data.data.isNewUser;
            
            if (that.nextpage != "") {
              that.listfinished = false;
              that.listloading = false;
            } else {
              if(that.hasmorepage === 1){
                that.nodatashow=true;
              }else{
                that.listloading = false;
                that.finished_text = '亲,没有更多啦哟~';
              }
              that.listfinished = true;
            }
            that.$forceUpdate();
            that.$toast.clear();
          }else{
            that.$toast(res.data.info);
          }
        });
    }
  },
  beforeCreate() {
    // document.querySelector('body').setAttribute('style', 'background-color:#fc431f')
  },
  beforeDestroy() {
    // document.querySelector('body').setAttribute('style', '')
  },
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
//@import url()
@import url("./css/index.less");
</style>

<style lang='less'>
//@import url()
#newcomerwrap .van-list__finished-text{
  width: 100%;
  color : #fff;
}
</style>