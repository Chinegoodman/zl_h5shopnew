<!-- 组件说明 -->
<template>
  <div class="shopwrap" id="shopwrap">
    <div class="navbar">
      <div class="nav-in">
        <van-tabs v-model="active">
          <van-tab
            :title="tit.category_name"
            v-for="(tit, index) in titlistmassage"
            :key="index"
          >
            <div class="tab-title" slot="title" @click="titleclick(tit.tabindex,1)" >{{tit.category_name}}</div>
          </van-tab>
        </van-tabs>
        <div class="login-inter">
          <div class="intercom" v-if="$store.state.user.isLogin">
            <span class="im">
                <img v-if="$store.state.user.userdata.headPortrait" :src="$store.state.user.userdata.headPortrait" alt="">
              </span>
              <span class="nm">{{$store.state.user.userdata.nickName}}</span>
              <span class="loginout" @click="logout">退出</span>
          </div>
          <div class="intercom" @click="pageto('regist')" v-else>
            <span class="im">
                <img src="./../../../assets/imgs/icons/guanzhudrenzhihui.png" alt="">
              </span>
              <span class="nm">登录</span>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper">
      <van-swipe class="swiperdom" :autoplay="2000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image.img_url?image.img_url:default_img_banner" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 秀场列表数据展示 -->
    <div class="index_list_recommend xiuchang">
       <!-- big_list 为切换到大图的class -->
      <div class="list xclist">
        <van-list
          class="goodslist"
          v-model="listloading_xc"
          :finished="listfinished_xc"
          :finished-text="finished_text_xc"
          :error.sync="vanerror_xc"
          error-text="请求失败，点击重新加载"
          :offset="10"
          @load="homelistxc"
        >
          <div
            @click="gotoxiuchangdetails(item)"
            class="goodsli"
            v-for="(item,index) in homelistxcmsg"
            :key="index"
            :id="item.id"
          >
            <div class="im"> 
              <img :src="item.cover?item.cover:default_img_small" alt="" />
            </div>
            <div class="goodsli_title clearfix">
              <span class="img_w">
                <img :src="item.faceUrl?item.faceUrl:default_img_head" alt="抓周" />
              </span>
              <h2 class="_txtov2" :class="{'indent':item.nickName}">{{item.nickName}}</h2>
            </div>
            <span class="tit">{{item.name}}</span>
            <div class="gd_btm">
               <span class="num">{{item.realCount}}观看</span>
            </div>
            <div class="stateflag">
              <span class="zb" v-if="item.state===1"></span>
              <span class="huifang" v-if="item.state===0"></span>
            </div>
          </div>
        </van-list>
      </div>
    </div>   
    <!-- 投资金列表 end -->
    <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
    <!-- footer satrt -->
    <div class="shop-ad-area"  v-if="false">
      <router-link :to="{name:'paypage'}" tag="a">
        <img src="./../../../assets/imgs/shop/ad-area.jpg" alt="">
      </router-link>
    </div>
    <div class="box-footer">
      <div class="footer-in">
        <ul class="corperation">
          <router-link :to="{name:'diamond'}" tag="li">公司介绍</router-link>
          <li class="grep">|</li> 
          <router-link :to="{name:'invoice'}" tag="li">服务协议</router-link>
          <li class="grep">|</li> 
          <router-link :to="{name:'shopcart'}" tag="li">隐私权政策</router-link>
          <li class="grep">|</li>
          <router-link :to="{name:'olpay'}" tag="li">联系合作</router-link>
           <li class="grep">|</li>
          <router-link :to="{name:'shopowner'}" tag="li">招聘信息</router-link>
        </ul>
        <div class="logo-down-box">
          <div class="box-in">
             <ul>
              <li class="clearfix">
                <span class="im">
                  <img src="./../../../assets/logo.png" alt="抓周" />
                </span>
                <span class="t">&nbsp;&nbsp;</span>
              </li>
              <li class="clearfix">
                <span class="im">
                  <img src="./../../../assets/iosdownload.png" alt="抓周" />
                </span>
                <span class="t">IOS下载</span>
              </li>
              <li class="clearfix">
                <span class="im">
                  <img src="./../../../assets/anzhuodownload.png" alt="抓周" />
                </span>
                <span class="t">安卓下载</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="recordcode">
          © 17biyi.com  北京艺相逢文化传播有限公司--
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502034096&token=4ea5e840-0a37-4895-a22a-187ea1d61d34" target="_blank" data-v-5bdb8ecf="">京公安备11010502034096号</a>
          <a href="http://beian.miit.gov.cn" target="_blank" data-v-5bdb8ecf="">京ICP备17006123号-4</a>
          <a href="javascript:void(0)" data-v-5bdb8ecf="">京网文[2017]7669-849号</a>
        </div>
      </div>
    </div>
    <!-- footer end -->
  </div>
</template>

<script>
//import x from ''
import nodata from './../../../components/nodata.vue'
import newcomershell from './../../../components/newcomershell.vue'
import piontPraise from './../../../components/piontPraise.vue'
import {
  setsessionStorage,
  getsessionStorage
} from "./../../../utils/index.js";
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
    newcomershell,
    vanTab:Tab,
    vanTabs:Tabs,
    vanList:List,
    piontPraise
  },
  data() {
    return {
      nodatashow:false,
      pagetypedata:"discountshop",
      active: 0,
      activeName: "",
      images: [
        {
          img_url : require('../../../assets/imgs/shop/banner01.jpg')
        },
        {
          img_url : require('../../../assets/imgs/shop/banner02.jpg')
        },
        {
          img_url : require('../../../assets/imgs/shop/banner03.jpg')
        }
      ], //banner图
      explosive: [], //人气爆款
      popularity:'',
      ercommend: [], //每日推荐
      everday:'',
      homelistmassage: [], //推荐列表
      homelistzbmsg: [], //直播列表
      homelistxcmsg : [], //秀场列表
      homelistxpmsg: [], //新品列表
      homelisttzjmsg: [], //投资金列表
      titlistmassage: [
        {
          category_name:"首页",
          tabindex: 0
        },
        {
          category_name:"招聘信息",
          tabindex: 1
        },
        {
          category_name:"关于我们",
          tabindex: 2
        },
        {
          category_name:"家长监护工程",
          tabindex: 3
        }
      ], //头部导航数据
      zhibotitletype : [], //直播分类导航
      xinpintitletype : [],   //新品分类导航
      xinpintitsort : [ //新品三级导航排序
        {
          name : '最新',
          type : 1
        },
        {
          name : '销量',
          type : 2
        },
        {
          name : '价格',
          type : 3
        }
      ],
      guildarea:[],
      goldlist: [], //实时金价数据
      goldpricedata: {},
      goldpricetimer : null,
      nextpage: "",
      nextPage_zb :"",
      nextPage_xc : 1,
      nextPage_xp :"",
      nextpage_tzj : 1,
      number: 0,
      listloading: false,
      listfinished: false,
      listfinished_zb: false,
      listloading_zb: false,
      listfinished_xc: false,
      listloading_xc: false,
      listfinished_xp: false,
      listloading_xp: false,
      listfinished_tzj: false,
      listloading_tzj: false,
      finished_text : '',
      finished_text_zb : '',
      finished_text_xc : '亲，没有更多啦哟~',
      finished_text_xp : '',
      finished_text_tzj : '',
      vanerror: false,
      vanerror_zb: false,
      vanerror_xc: false,
      vanerror_xp: false,
      vanerror_tzj: false,
      gold_type: 101,
      stylestatus: false, //默认类别选择样式：隐藏
      shopsort:0, //排序1正序2倒序
      marketCode:0,//1热门2推荐3爆款
      twoID:"",
      threeID:"",
      post_tab_type : 1,  //推荐  接口文档没更新  2为新品 已改其他接口实现
      list_content_show_type : 0,  // 1为推荐列表显示 2为直播列表显示 3为新品列表显示... (后台搞了好多个接口的原因)
      obj_option : {},   //点击导航“直播” 传入请求直播列表的类型参数
      tab_active : 0, //直播列表下的分类查询选种项  热播中 每日必看...
      tab_active_xp : 0, //新品下的分类查询选种项
      titesortactive : 0, //新品三级导选中项
      price_area_step : [
        {
          name : '1000以下',
          area_input : [0,1000] 
        },
        {
          name : '1000-5000',
          area_input : [1000,5000] 
        },
        {
          name : '5000-1万',
          area_input : [5000,10000] 
        },
        {
          name : '2万-5万',
          area_input : [20000,50000] 
        },
        {
          name : '5万-10万',
          area_input : [50000,100000] 
        }
      ],
      price_area_step_active : '', //价格区间选定当前
      price_up : false,
      price_down : false,
      obj_option_xp :{
        priceSort: 0,
        price_area : '1000以下'
      }, //点击导航“新品” 传入请求直播列表的类型参数
      filtershow_flag : false,
      change_big_small_flag_tj : 1, //推荐切换大小图外层class条件
      change_big_small_flag_zb : 1, //直播切换大小图外层class条件
      change_big_small_flag_xp : 1, //新品切换大小图外层class条件
      change_big_small_flag_tzj : 1, //新品切换大小图外层class条件
      default_img_small: require('../../../assets/imgs/shop/list-default-small.png'), //默认图片
      default_img_big: require('../../../assets/imgs/shop/list-default-big.png'),
      default_img_head : require('../../../assets/imgs/icons/default-head.png'),
      default_img_guildarea : require('../../../assets/logo-gray.png'),
      default_img_banner : require('../../../assets/imgs/shop/banner-default.png'),
      hasmorepage : 1, //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
      newcomershellshowstate : false,
      shoucang_type : '' //收藏与取消收藏请求类型

    };
  },
  computed: {},
  mounted() {
    let that = this;
    // that.bannerimages();
    //刷新列表
    // if(this.$route.query.tab != undefined){
    //   let tab = Number(this.$route.query.tab);
    //   that.titleclick(tab,false);
    // }

    that.homelistxc();
    
  },
  methods: {
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
            that.$router.push({name:'regist'})
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
    // 退出登录
    logout() {
      let confirmfn = window.confirm("确定要退出登录吗？");
      if (confirmfn) {
        // window.sessionStorage.removeItem('pagefrom');
        // window.sessionStorage.removeItem('allprice');
        // window.sessionStorage.removeItem('OrderImmediatelydata');
        // window.sessionStorage.removeItem('checkaddressitem');
        // window.sessionStorage.removeItem('orderListdata');
        window.sessionStorage.clear();
        window.localStorage.clear();
        this.$store.commit("resetuserdata");
        this.$router.push({ name: "shopindex" });
      }
    },
    // 页面跳转到登录而
    pageto(routername){
        this.$router.push({name:routername});
    },
    /*跳转到秀场直播详情*/
    gotoxiuchangdetails(paramsdata) {
      let that = this;
      if(!that.iflogin()){return;}
      setsessionStorage("livinglidata-xiu", paramsdata);
      if(paramsdata.state==1){
        this.$router.push({
          path: "/living/xiuchangdetails",
          query : {
            tab : that.list_content_show_type,
            liveId : paramsdata.id
          }
        });
      }else if(paramsdata.state==0){
        this.$router.push({
          path: "/living/livingxiureplay",
          query : {
            tab : that.list_content_show_type,
            liveId : paramsdata.id
          }
        });
      }  
    },
    // 跳转到直播详情页
    gotolivingdetails(paramsdata) {
      let that = this;
      if(!that.iflogin()){return;}
      setsessionStorage("livinglidata", paramsdata);
      if(paramsdata.state==0){
        this.$router.push({
          path: "/living/livingdetails",
          query : {
            tab : that.list_content_show_type
          }
        });
      }else if(paramsdata.state==1){
        this.$router.push({
          path: "/living/livingreplay",
          query : {
            tab : that.list_content_show_type,
            liveId : paramsdata.id
          }
        });
      }
    },
    // 跳转商品详情
    gotogoodsdetails(goodsid,index) {
      let that = this;
       //存一个到时返回首页用的flag
      let returnflag = 1;
      setsessionStorage("returnflag",returnflag);
      that.$router.push({
        name: "productdetails",
        params: {
          product_id: goodsid.sku_id,
          webtype: 1
        },
        query : {
          tab : that.list_content_show_type
        }
      });
    },
    // 获取 banner 轮播图数据
    bannerimages() {
      let that = this;
      that.api.homedetails.bannerimg({
        flag:'',
      }).then(res => {
        // that.images = res.data.data;
        // console.log(that.images);
      });
    },
    // banner图跳转
    imageurl(item) {
      let that = this;
      if(item.type==1){
        return;
      }else if(item.type==2){
          that.$router.push({
            name: "productdetails",
            params: {
              product_id: item.number,
              webtype: 1
            }
          });
      }else if(item.type==3){
        window.open(item.to_url);
      }else if(item.type==4){
        // 视频
        alert('视频暂未添加');
      }
    },
    //首页广告区数据
    getadvertisingarea() {
      let that = this;
      that.api.homedetails.homeadvertisingarea({

      }).then(res => {
        that.guildarea = res.data.data;
      });
    },
    // 获取头部导航数据
    titlelistmass() {
      let that = this;
      that.api.homedetails
        .titlelist({})
        .then(res => {
          // console.log(res.data);
          that.titlistmassage = res.data.data;
        })
        .catch(() => {
          that.vanerror = true;
        });
    },
    
    // 头部导航点击事件
    titleclick(type_index) {
      console.log(type_index);
      let that = this;
      switch(type_index){
        case 0 :
          this.$router.push({ name: "shopindex" });
          break
        case 1 :
          that.$router.push({ name: "shopowner" });
          break  
        case 2 :  
          that.$router.push({ name: "diamond" });
          break
        case 3 :  
          that.$router.push({ name: "paypage" });
          break
      }
    },
    //直播的分类筛选 直播中 每日必看...
    clearsessionStoragelist(index){
      let that = this;
      switch(index){
        case 0:
          window.sessionStorage.removeItem('homelisttjstorerange');
          break;
        case 1:
          window.sessionStorage.removeItem('homelistzbstorerange');
          break;
        case 2:
          window.sessionStorage.removeItem('homelistxcstorerange');
          break;  
        case 3:
          window.sessionStorage.removeItem('homelistxpstorerange');
          break;
        case 4:
          window.sessionStorage.removeItem('homelisttzjstorerange');  
          break;
      }  
    },
    //秀场列表
    homelistxc() {
      let that = this;
      // that.listloading = true;
      that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 200000
      }); 
      that.api.homedetails
        .homelistxcpost({
          type : 2,
          page : that.nextPage_xc,
          pageSize : 20
        })
        .then(res => {
          console.log('res');
          console.log(res);
          that.$toast.clear();
          that.listloading_xc = false;
          if(res.data.code == 1){
            that.nextPage_xc = res.data.data.page;
             if(that.nextPage_xc  == res.data.data.totalPage && that.homelistxcmsg != '') {
                that.listfinished_xc = true;
                that.listloading_xc = false;
                that.finished_text_xc = '亲~已经到底了';
                return;
             }
            setsessionStorage('homelistxcstorerange_page',that.nextPage_xc);
            if (res.data.data.list && res.data.data.list.length > 0) {
              that.nodatashow = false;
              that.hasmorepage = 2;
              res.data.data.list.forEach(e => {
                that.homelistxcmsg.push(e);
              });
              //缓存数据处理
              let homelistxcstorerange = that.homelistxcmsg;
              setsessionStorage('homelistxcstorerange',homelistxcstorerange);
            } 

            if(that.nextPage_xc  != res.data.data.totalPage && res.data.data.totalPage != 0) {
              that.listfinished_xc = false;
              that.listloading_xc = false;
              that.nextPage_xc = that.nextPage_xc + 1;
              console.log('that.nextPage_xc');
              console.log(that.nextPage_xc);
            }else {
              if(that.hasmorepage === 1){
                that.nodatashow = true;
              }else{
                that.listloading_xc = false;
                that.finished_text_xc = '亲~已经到底了';
              }
              that.listfinished_xc = true;
            }
            that.$forceUpdate();
            that.$toast.clear();
          }else{
            that.$toast(res.data.info);
            that.listfinished_xc = true;
          }
        })
    }
  },
  beforeCreate() {
    // window.sessionStorage.removeItem('homelisttjstorerange');
  }, //生命周期 - 创建之前
  created(){
       
  },
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
//@import url()
@import url("./css/index.less");
</style>

<style lang='less'>
body{
  // background: #8276f4;
  background: #763aff url("./../../../assets/imgs/icons/bg_body.png") no-repeat 0 0 ;
}
//@import url()
.shopindexwrap{
  min-height: 10rem;
}
#shopwrap .van-tabs--line .van-tabs__wrap {
  height: 0.74rem;
  padding: .1rem 0;
}
#shopwrap .van-tabs__nav--line {
  padding-bottom: 18px;
}

.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border-width : 0;
}

#shopwrap .van-tabs__nav{
  width : 700px;
  background : none;
}
#shopwrap .van-tabs__line{
  width : .45rem !important;
  background:rgba(31,31,31,1);
  bottom: 16px;
}

#shopwrap .van-tab {
  font-size: .34rem;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(31,31,31,1);
  display: inline-block;
  padding : 0 .32rem;
  flex-basis : auto !important;
  line-height : .75rem;
}
#shopwrap .van-ellipsis{
  // overflow: auto;
}
#shopwrap .van-tab__text--ellipsis{
  text-align : center;
  // width : 140px;
  // overflow: auto;
}
#shopwrap .van-tab--active.van-tab {
  color: rgba(51, 51, 51, 1);
  font-size: .36rem;
  font-weight: bold;
}

#shopwrap .van-swipe__indicators {
  padding: 0.06rem 0.18rem;
  background-color: rgba(0, 0, 0, 0.23);
  border-radius: 0.105rem;
}
#shopwrap .van-swipe__indicator {
  background-color: rgba(255, 255, 255, 0.6);
}
#shopwrap .van-swipe__indicator--active {
  background-color: rgba(255, 255, 255, 1);
}
// 商品列表模块加载更多提示框居中
#shopwrap .van-list__error-text,
#shopwrap .van-list__finished-text,
#shopwrap .van-list__loading {
  margin: 0 auto;
  line-height: 3em;
  width: 100%;
  float: left;
}
#shopwrap .van-list__placeholder{
  width: 100%;
  float: left;
}
#shopwrap .nodata .discountshopnodata{
  padding-bottom : 1rem;
}  
#shopwrap .nodata .discountshopnodata .nodataimg{
  padding-top: 0;
}
#shopwrap .van-swipe{
  cursor: default;
}

</style>