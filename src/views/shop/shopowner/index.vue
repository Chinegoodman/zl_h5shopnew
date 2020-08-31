<!-- 组件说明 -->
<template>
  <div class="shopower_wrap">
    <div class="returnindex" @click="shopback"> < 返回</div>
    <div class="zhao">
      职位名称：中高级前端开发工程师<br/><br/>
      任职要求<br/>
      1、有至少三年以上前端开发经验，有前端架构设计经验<br/>
      2、深入掌握JS语言, 以及ES6/7特性，对typescript 或flow等静态化工具熟练掌握<br/>
      3、熟练掌握VUE，并掌握vue生态相关库<br/>
      4、熟练掌握webpack，glup等工程化工具，并利用这些工具持续改善团队的线上/线下研发效率<br/>
      5、具有良好的沟通能力，有较强的独立工作能力和解决问题的能力<br/>
      6、注重细节，有一定审美 <br/> <br/> <br/>

      职位名称：前端开发工程师<br/><br/>
      工作职责:<br/>
      1、依据产品需求完成高质量的跨终端Web的前端开发和维护；<br/>
      2、对具体的产品进行性能优化，实现极致的页面加载、执行和渲染时间。<br/>
      任职资格:<br/>
      1、统招一本及以上学历（硬性要求），计算机相关专业，精通各种前端技术，包括HTML/CSS/JavaScript等等；<br/>
      2、具备跨终端的前端开发能力，能解决各种兼容问题；<br/>
      3、至少熟悉一门非前端的语言（Node/Java/PHP/C/C++/Python/Ruby）。 <br/>
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
export default {
  components: {
    vanTab : Tab,
    vanTabs : Tabs,
    vanList : List,
    vanToast : Toast 
  },
  data() {
    return {
      showlist: false,
      show: true,
      showzb: false,
      showgz: false,
      nodatashow:false,
      pagetypedata:"discountshop",
      listloading: false,
      listfinished: false,
      finished_text : '',
      vanerror: false,
      default_img_small: require('../../../assets/imgs/shop/list-default-small.png'), //默认图片
      default_img_banner : require('../../../assets/imgs/shop/banner-default.png'),
      default_img_head : require('../../../assets/imgs/icons/default-head.png'),
      hasmorepage : 1, //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
      shoucang_type :'',
      peopleloading: false,
      peoplefinished: false,
      peoplevanerror: false,
      type: 1,
      product_id: "",
      sex: 0,
      shopid: "",
      shopmass: {
        shopname: ""
      },
      shop_id: "",
      shoplistmassage: [],
      peoplelistmassage: [],
      videolistmassage: [],
      nxetpageshop: "",
      nxetpagepeople: "",
      nxetpagevideo: "",
      userIdss: "",
      stylestatus: false //默认类别选择样式：隐藏
    };
  },
  computed: {},
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    },
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
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

<style>
body{
  background: #763aff url("./../../../assets/imgs/icons/bg_body.png") no-repeat 0 0 ;
}
.shopower_wrap {
  width : 1200px; 
  margin : 0 auto;
  padding : 0.3rem 0;
  color : #fff;
  font-size : 18px;
}
.shopower_wrap .zhao{
  font-size : 18px;
  padding-top : 50px;
  text-align : left;
}
.shopower_wrap .returnindex{
    font-size: 0.26rem;
    font-weight: 500;
    color: rgba(255,255,255,.75);
    cursor: pointer;
    padding-bottom : 30px; 
  }
</style>