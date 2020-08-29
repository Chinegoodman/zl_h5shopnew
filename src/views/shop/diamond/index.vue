<!-- 组件说明 -->
<template>
  <div class="diamondwrap">
    <div class="returnindex" @click="shopback"> < 返回</div>
    <p>
      简介：北京艺相逢文化传播有限公司，是一家坐落中国“硅谷”——中关村的科技文化类企业;公司主要从事文化艺术的交流、研讨；其主打产品为比艺直播，更是一款全天候直播产品，可以让艺术爱好者随时随地想播就播，而且可以让播客在数据环境下进行视频录制，待链接WIFI再进行视频上传；
    </p>
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
    // ====项目中可能用到的===
    //  Uploader,
    Tab,
    Tabs,
    List,
    // Lazyload,
    // Search
    // ====项目中可能用到的===
    Toast
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import nodata from './../../../components/nodata.vue'
import {
  setsessionStorage
} from "./../../../utils/index.js";
export default {
  components: {
    nodata,
    vanTab : Tab,
    vanTabs : Tabs,
    vanList : List,
    vanToast : Toast 
  },
  data() {
    return {
      title : '',
      diamondlistmsg : [],
      pagetypedata:"discountshop",
      nodatashow:false,
      listloading: false,
      listfinished: false,
      vanerror: false,
      finished_text : '',
      change_big_small_flag : 1,
      type_id : '', //请求参数
      default_img_small: require('../../../assets/imgs/shop/list-default-small.png'), //默认图片
      default_img_big: require('../../../assets/imgs/shop/list-default-big.png'),
      default_img_head : require('../../../assets/imgs/icons/default-head.png'),
      hasmorepage : 1 //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
    };
  },
  computed: {},
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    }
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
    that.title = that.$route.query.title;
    that.type_id = that.$route.query.typeId;
    // that.diamondlist();
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
body{
  background: #763aff url("./../../../assets/imgs/icons/bg_body.png") no-repeat 0 0 ;
}
 .diamondwrap{
  width : 1200px; 
  margin : 0 auto;
  padding: 0.3rem 0.5rem;
  
}
.diamondwrap p{
  padding: .2rem 0;
  font-size: 0.32rem;
  font-weight: 500;
  color: rgba(255,255,255,.75);
  line-height : 2;
}
.diamondwrap .returnindex{
  font-size: 0.26rem;
  font-weight: 500;
  color: rgba(255,255,255,.75);
  cursor: pointer;
}
</style>