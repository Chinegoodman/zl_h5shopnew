<!-- 组件说明 -->
<template>
  <div class="diamondwrap">
    <div class="header">
      <img class="back" @click="shopback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>{{title}}</span>
    </div>
    <div class="diamondwraprecommend">
        <!-- big_list 为切换到大图的class homelistzb -->
        <div :class="{'list' : true,'big_list' : change_big_small_flag===0}">
          <van-list
            class="goodslist"
            v-model="listloading"
            :finished="listfinished"
            :finished-text="finished_text"
            :error.sync="vanerror"
            error-text="请求失败，点击重新加载"
            :offset="10"
            @load="diamondlist"
          >
            <div
              @click="gotolivingdetails(item)"
              class="goodsli"
              v-for="(item,index) in diamondlistmsg"
              :key="index"
            >
              <div class="im">
                <img :src="item.glp&&item.glp.smallImage?item.glp.smallImage:default_img_small" alt="珠宝商品" v-if="change_big_small_flag===1" />
                <img :src="item.glp&&item.glp.bigImage?item.glp.bigImage:default_img_big" alt="珠宝商品" v-if="change_big_small_flag===0" />
              </div>
              <div class="goodsli_title clearfix">
                <span class="img_w">
                  <img :src="item.face_url?item.face_url:default_img_head" alt="抓周" />
                </span>
                <h2 class="_txtov2" :class="{indent:item.nickname}">{{item.nickname}}</h2>
              </div>
              <span class="tit">{{item.name}}</span>
              <div class="zan"></div>
              <div class="gd_btm">
                <span class="zb" v-if="item.state==0"></span>
                <span class="huifang" v-if="item.state==1"></span>
                <span class="num">{{item.realcount}}观看</span>
              </div>
            </div>
          </van-list>
          <div class="changebigsize" v-if="change_big_small_flag===1" @click="changeimgsize()"></div>
          <div class="changesmallsize" v-if="change_big_small_flag===0" @click="changeimgsize()"></div>
      </div>
      <div class="changesize"></div>
    </div>  
    <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
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
     // 跳转到直播详情页
    gotolivingdetails(paramsdata) {
      let that = this;
      if(!that.iflogin()){return;}
      setsessionStorage("livinglidata", paramsdata);
      this.$router.push({
        path: "/living/livingdetails",
        // query: {
        //   livingurl: paramsdata.streamAddr
        // }
      });
    },
    //列表切换大小图
    changeimgsize(){
       var that = this;
        if(that.change_big_small_flag === 1){
          that.change_big_small_flag= 0;
        }else{
          that.change_big_small_flag = 1;
        }
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
  //   let user = localStorage.getItem("user-info-h5");
  //   let userj = JSON.parse(user);
  //   that.userId = userj.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
    that.title = that.$route.query.title;
    that.type_id = that.$route.query.typeId;
    that.diamondlist();
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
// 商品列表模块加载更多提示框居中
.shopkeeperswrap .van-list__error-text,
.shopkeeperswrap .van-list__finished-text,
.shopkeeperswrap .van-list__loading {
  margin: 0 auto;
  line-height: 3em;
  width: 100%;
}
</style>