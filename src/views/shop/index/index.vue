<!-- 组件说明 -->
<template>
  <div class="shopwrap" id="shopwrap">
    <div class="header">
      <div @click="gotosertchpage" class="searchbtn">
        <img src="@/assets/imgs/video/fangdj@2x.png" alt="抓周" />
        <p class="_txtov1">大家都在搜</p>
      </div>
      <div class="hd_rt">
        <div class="xunbao">
          <span class="im">
            <img src="@/assets/imgs/shop/xunbao.png" alt="抓周" />
          </span>
          <span class="t">寻宝</span>
        </div>
        <div class="xunbao">
          <span class="im">
            <img src="@/assets/imgs/shop/xiaoxi.png" alt="抓周" />
          </span>
          <span class="t">消息</span>
        </div>
      </div>
      <!-- <div class="rightbtn">
        <!-- <img src="@/assets/imgs/video/xiaoxi@2x.png" alt="抓周 有消息" />
        <img src="@/assets/imgs/icons/xiaoxqp.png" alt="抓周 无消息" />
      </div> -->
    </div>
    <div class="navbar">
      <van-tabs v-model="active">
        <van-tab
          :title="tit.category_name"
          v-for="(tit, index) in titlistmassage"
          :key="index"
        >
          <div class="tab-title" slot="title" @click="titleclick(tit.tabindex,1)" >{{tit.category_name}}</div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="swiper">
      <van-swipe class="swiperdom" :autoplay="2000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image.img_url?image.img_url:default_img_banner" @click="imageurl(image)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="tipsbox">
      <p>
        <img src="@/assets/imgs/icons/dppz.png" alt="大牌品质，工厂价格，个性定制，创意者秀" />
        <span>大牌品质</span>
      </p>
      <p>
        <img src="@/assets/imgs/icons/gcjg.png" alt="大牌品质，工厂价格，个性定制，创意者秀" />
        <span>工厂价格</span>
      </p>
      <p>
        <img src="@/assets/imgs/icons/gxdz.png" alt="大牌品质，工厂价格，个性定制，创意者秀" />
        <span>个性定制</span>
      </p>
      <p>
        <img src="@/assets/imgs/icons/cyzx.png" alt="大牌品质，工厂价格，个性定制，创意者秀" />
        <span>创意者秀</span>
      </p>
    </div>
    <div class="guild-area" v-show="guildarea.length > 0 && list_content_show_type===0">
      <ul>
        <li v-for="(item,index) in guildarea" :key="index" id="item.id" :to="item.toUrl"  @click="gotodiamondlist(item)">
          <span class="m">
            <img :src="item.pictureUrl?item.pictureUrl:default_img_guildarea" alt="抓周" />
          </span>
          <span class="t">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div @click="gonewcomer" class="newcomerindexguild" v-show="list_content_show_type===0">
      <img src="http://playback.17biyi.com/53eb461b1acea844204c921440705211" alt="">
    </div>

    <!-- 推荐列表数据展示 -->
    <div class="index_list_recommend sun" v-show="list_content_show_type===0">
      <div class="title"><span class="ic"></span>为你推荐</div>
       <!-- big_list 为切换到大图的class -->
      <div :class="{'list' : true,'big_list' : change_big_small_flag_tj===0}">
        <van-list
          class="goodslist"
          v-model="listloading"
          :finished="listfinished"
          :finished-text="finished_text"
          :error.sync="vanerror"
          error-text="请求失败，点击重新加载"
          :offset="10"
          @load="homelisttj"
        >
          <div
            @click="gotolivingdetails(item)"
            class="goodsli"
            v-for="(item,index) in homelistmassage"
            :key="index"
            :id="item.id"
          >
            <div class="im"> 
              <img :src="item.glp.smallImage?item.glp.smallImage:default_img_small" alt="" v-if="change_big_small_flag_tj===1" />
              <img :src="item.glp.bigImage?item.glp.bigImage:default_img_big" alt="" v-if="change_big_small_flag_tj===0" />
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
        <div class="changebigsize" v-if="change_big_small_flag_tj===1" @click="changeimgsize_tj()"></div>
        <div class="changesmallsize" v-if="change_big_small_flag_tj===0" @click="changeimgsize_tj()"></div>
      </div>
    </div> 
    <!-- 直播列表数据展示 --> 
    <div class="index_list_recommend lili" v-show="list_content_show_type===1">
        <div class="nav_type">
          <ul>
            <li v-for="(tit, index) in zhibotitletype" :class="{'active':tab_active==index}" :key="index" @click="tabtittypezhibo(tit,index)">{{tit.name}}</li>
          </ul>
        </div>
        <!-- big_list 为切换到大图的class homelistzb -->
        <div :class="{'list' : true,'big_list' : change_big_small_flag_zb===0}">
          <van-list
            class="goodslist"
            v-model="listloading_zb"
            :finished="listfinished_zb"
            :finished-text="finished_text_zb"
            :error.sync="vanerror_zb"
            error-text="请求失败，点击重新加载"
            :offset="10"
            @load="homelistzb"
          >
            <div
              @click="gotolivingdetails(item)"
              class="goodsli"
              v-for="(item,index) in homelistzbmsg"
              :key="index"
              :id="item.id"
            >
              <div class="im">
                <img :src="item.glp.smallImage?item.glp.smallImage:default_img_small" alt="珠宝商品" v-if="change_big_small_flag_zb===1" />
                <img :src="item.glp.bigImage?item.glp.bigImage:default_img_big" alt="珠宝商品" v-if="change_big_small_flag_zb===0" />
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
          <div class="changebigsize" v-if="change_big_small_flag_zb===1" @click="changeimgsize_zb()"></div>
          <div class="changesmallsize" v-if="change_big_small_flag_zb===0" @click="changeimgsize_zb()"></div>
      </div>
      <div class="changesize"></div>
    </div>  
    <!-- 新品列表数据展示 --> 
     <div class="index_list_recommend wang" v-show="list_content_show_type===2">
        <div class="nav_type">
          <!-- 分类tab -->
          <ul>
            <li v-for="(tit, index) in xinpintitletype" :class="{'active':tab_active_xp==index}" :key="index" @click="tabtittypexinpin(tit,index)">{{tit.name}}</li>
          </ul>
        </div>
        <div class="xinpin-sort-filter">
           <div class="sort">
              <ul>
                <li v-for="(item,index) in xinpintitsort" :key="index" :class="{'active' : titesortactive==index}" @click="tabsort(item)">
                  <span class="t" v-if="index===2">
                      {{item.name}}
                      <span class="pricearrow_w">
                          <span :class="{'pricearrow' : true,'pricearrowupactive' : price_up ,'pricearrowdownactive' : price_down }"  ref="pricearrow"></span>
                      </span> 
                  </span>
                  <span class="t" v-else>{{item.name}}</span>
                </li>
              </ul>
           </div>
           <div class="filter">
              <span class="t" @click="filtershow" >筛选<span class="ic"><img src="@/assets/imgs/shop/bgfiltter.png" alt=""></span></span>
           </div>
        </div> 
        <!-- 筛选弹层 start-->
        <div class="filter_tan" v-if="filtershow_flag">
            <div class="bg_cover" @click="close_filter_tan"></div>
            <div class="price_area">
                <span class="price-space">价格区间</span>
                <div class="t">
                  <input  class="min" type="text" placeholder="最低价" ref="input_min" />
                  <span class="line"></span>
                  <input class="max" type="text" placeholder="最高价" ref="input_max" />
                </div>
                <ul>
                  <li v-for="(item,index) in price_area_step" :key="index" :class="{'active' : price_area_step_active===index}" @click="choose_price_area(item,index)" >
                      {{item.name}}
                  </li>
                </ul>
                <div class="btn_area">
                    <span @click="price_area_step_reset">重置</span>
                    <span class="s" @click="price_area_step_save">确定</span>
                </div>
            </div>
        </div>
        <!-- 筛选弹层 end-->
        <!-- big_list 为切换到大图的class -->
        <div :class="{'list' : true,'xp_big_list' : change_big_small_flag_xp===0}">  
          <van-list
            class="goodslist_xp"
            v-model="listloading_xp"
            :finished="listfinished_xp"
            :finished-text="finished_text_xp"
            :error.sync="vanerror_xp"
            error-text="请求失败，点击重新加载"
            :offset="10"
            @load="homelistxp"
          >

            <div class="goodsli_xp" @click="gotogoodsdetails(item)"
              v-for="(item,index) in homelistxpmsg"
              :key="index"
              :id="item.goods_id"
            >
              <div class="im">
                <img :src="item.goods_image?item.goods_image:default_img_small" alt="珠宝商品" />
              </div>
              <span class="tit">{{item.goods_title}}</span>
              <div class="price"><span>￥</span>{{item.price}}</div>
              <div class="canged" v-if="item.isCollection==1"></div>
              <div class="cang" v-if="item.isCollection==0"></div>
            </div>  
          </van-list>
          <div class="changebigsize" v-if="change_big_small_flag_xp===1" @click="changeimgsize_xp()"></div>
          <div class="changesmallsize" v-if="change_big_small_flag_xp===0" @click="changeimgsize_xp()"></div>
      </div>
    </div>  

    <!-- 投资金列表start -->
    <div class="rongtongjin-ad" v-if="list_content_show_type===3">
        <span class="ad-tit">
          <img src="@/assets/imgs/shop/rongtongjin-tit.png" alt="">
        </span>
        <div class="add-con" v-if="goldpricedata">
          <!-- role-type-dow为降序 role-type-up升 且后面图标跟上 -->
          <span>投资金价：</span>
          <div class="slide-box">
            <div :class="{'role-type-level' : true,'jin-annimation-down':goldpricedata.trend==2,'jin-annimation-up':goldpricedata.trend==1}">
              <div class="jin-annimation">
                <span :class="{'role-type-level' : true,'role-type-down':goldpricedata.trend==2,'role-type-up':goldpricedata.trend==1}">{{goldpricedata.goldPrice?goldpricedata.goldPrice:'获取中...'}}<span v-if="goldpricedata.goldPrice">/克</span></span>
                <span class="ic" v-if="goldpricedata.trend==2"><img src="@/assets/imgs/shop/jin-jiang.png" alt=""></span>
                <span class="ic" v-if="goldpricedata.trend==1"><img src="@/assets/imgs/shop/jin-zhang.png" alt="" ></span>
              </div>
              <div class="jin-annimation">
                <span :class="{'role-type-level' : true,'role-type-down':goldpricedata.trend==2,'role-type-up':goldpricedata.trend==1}">{{goldpricedata.goldPrice?goldpricedata.goldPrice:'获取中...'}}<span v-if="goldpricedata.goldPrice">/克</span></span>
                <span class="ic" v-if="goldpricedata.trend==2"><img src="@/assets/imgs/shop/jin-jiang.png" alt="" ></span>
                <span class="ic" v-if="goldpricedata.trend==1"><img src="@/assets/imgs/shop/jin-zhang.png" alt="" ></span>
              </div>
            </div>
          </div>
        </div>
        <span class="ad-jin">
          <img src="@/assets/imgs/shop/rongtongjin-jin.png" alt="">
        </span>
    </div>
    <div class="index_list_recommend tzj" v-show="list_content_show_type===3">
      <div class="title"><span class="ic"></span>为你推荐</div>
       <!-- big_list 为切换到大图的class -->
      <div :class="{'tzj-list' : true,'tzj-big-list' : change_big_small_flag_tzj===0}">
        <van-list
          class="goodslist"
          v-model="listloading_tzj"
          :finished="listfinished_tzj"
          :finished-text="finished_text_tzj"
          :error.sync="vanerror_tzj"
          error-text="请求失败，点击重新加载"
          :offset="10"
          @load="homelisttzj"
        >
          <div
            @click="gotogoodsdetails(item)"
            class="goodsli"
            v-for="(item,index) in homelisttzjmsg"
            :key="index"
            :id="item.goods_id"
          >
            <div class="show-flag-goods" v-if="item.sku_id">
              <div class="im">
                <img :src="item.goods_image?item.goods_image:default_img_small" alt="珠宝商品" />
              </div>
              <span class="tit">{{item.goods_title}}</span>
              <div class="price"><span>￥</span>{{item.price}}</div>
              <div class="price_btm">{{item.brand_name}}</div>
              <div class="canged" v-if="item.isCollection==1"></div>
              <div class="cang" v-if="item.isCollection==0"></div>
            </div>  
            <div class="show-flag-living" v-else>
              <div class="im">
                <img :src="item.glp.smallImage?item.glp.smallImage:default_img_small" alt="珠宝商品" v-if="change_big_small_flag_qb===1" />
                <img :src="item.glp.bigImage?item.glp.bigImage:default_img_big" alt="珠宝商品" v-if="change_big_small_flag_qb===0" />
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
          </div>
        </van-list>
        <div class="changebigsize" v-if="change_big_small_flag_tzj===1" @click="changeimgsize_tzj()"></div>
        <div class="changesmallsize" v-if="change_big_small_flag_tzj===0" @click="changeimgsize_tzj()"></div>
      </div>
    </div> 
    <!-- 投资金列表 end -->
    <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
    <newcomershell :newcomershellshowstate="newcomershellshowstate" @closecomershellclick="closecomershell"></newcomershell>
  </div>
</template>

<script>
//import x from ''
import nodata from './../../../components/nodata.vue'
import newcomershell from './../../../components/newcomershell.vue'
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
    vanList:List
  },
  data() {
    return {
      nodatashow:false,
      pagetypedata:"discountshop",
      active: 0,
      activeName: "",
      images: [], //banner图
      explosive: [], //人气爆款
      popularity:'',
      ercommend: [], //每日推荐
      everday:'',
      homelistmassage: [], //推荐列表
      homelistzbmsg: [], //直播列表
      homelistxpmsg: [], //新品列表
      homelisttzjmsg: [], //投资金列表
      titlistmassage: [
        {
          category_name:"推荐",
          tabindex: 0  //推荐
        },
        {
          category_name:"直播",
          tabindex: 1  //直播
        },
        {
          category_name:"商城",
          tabindex: 2  //推荐
        },
        {
          category_name:"投资金",
          tabindex: 3  //推荐
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
      nextPage_xp :"",
      nextpage_tzj : 1,
      number: 0,
      listloading: false,
      listfinished: false,
      listfinished_zb: false,
      listloading_zb: false,
      listfinished_xp: false,
      listloading_xp: false,
      listfinished_tzj: false,
      listloading_tzj: false,
      finished_text : '',
      finished_text_zb : '',
      finished_text_xp : '',
      finished_text_tzj : '',
      vanerror: false,
      vanerror_zb: false,
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
      newcomershellshowstate : false
    };
  },
  computed: {},
  mounted() {
    let that = this;
    that.bannerimages();
    that.getadvertisingarea(); //广告区
    if(this.$route.query.tab != undefined){
      let tab = Number(this.$route.query.tab);
      that.titleclick(tab,false);
    }
    //新人专区推广弹层-游客模式直接弹，登录后新人弹 否则不弹
    if(that.$store.state.user.userid || that.$store.state.user.userid != 0){
      that.api.homedetails.checknewcomercondition({
        id : that.$store.state.user.userid
      }).then(res =>{
        if(res.data.code == 1){
          if(res.data.data == 1){
            that.newcomershellshowstate = true;
          }else{
            that.newcomershellshowstate = false;
          }
        }
      })
    }else{ 
      if(getsessionStorage('newcommershellflag') != 'yethas'){
        that.newcomershellshowstate = true;
      }
    }
    
  },
  methods: {
    //跳转新人专区
    gonewcomer(){
      this.$router.push({path:'/newcomer'});
    },
    //关闭新人专区推送弹层
    closecomershell(){
      this.newcomershellshowstate = false;
      let newcommershellflag = 'yethas';
      setsessionStorage("newcommershellflag",newcommershellflag);
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
    // 跳转到金钢区列表页-内页
    gotodiamondlist(item) {
      let that = this;
      that.$router.push({
        path: "diamond",
        query: {
          title : item.name,
          typeId : item.id
        }
      });
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
    // 获取金价数据
    goldmass() {
      let that = this;
      that.api.homedetails.goldmassage({}).then(res => {
        if(res.data.code===1){
          that.goldpricedata = res.data.data[0];
          that.$forceUpdate();
        }else{
          this.$toast("暂无数据");
        }
      });
    },

    //人气爆款与每日推荐图片跳转
    gotodetailstj(imgtype,id) {
      // console.log(imgtype.path[0].accessKey);
      // console.log(imgtype.path[0].alt)
      // 1商品
      if (imgtype == 1) {
        this.$router.push({
          name: "productdetails",
          params: {
            product_id: id,
            webtype: 1
          }
        });
      }
      // 2小视频
      if (imgtype == 2) {
        // this.$router.push('#');
        // window.location.href=id.toString();
        alert("跳转小视频")
      }
      // 3链接
      if (imgtype == 3) {
        // window.location.href=id.toString();
        alert("跳转链接")
        // this.$router.push();
      }
    },
    // 跳转分类列表
    gototypelist() {
      this.$router.push({ name: "producttypelist" });

    },
    // 跳转商品搜索页面
    gotosertchpage() {
      this.$router.push({ name: "livingsearch" });
    },
    // 获取 banner 轮播图数据
    bannerimages() {
      let that = this;
      that.api.homedetails.bannerimg({
        flag:'',
      }).then(res => {
        that.images = res.data.data;
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
          window.sessionStorage.removeItem('homelistxpstorerange');
          break;
        case 3:
          window.sessionStorage.removeItem('homelisttzjstorerange');  
          break;
      }  
    },
    // 头部导航点击事件
    titleclick(tabindex,status) {
      // console.log('tabindex');
      // console.log(tabindex);
      let that = this;
      this.removesession();
      if(status){
        //清除缓存列表
        that.clearsessionStoragelist(tabindex);
      }
      this.twoID = "";
      this.threeID = "";
      
      this.nextpage= '';
      that.nextPage_zb = '';
      that.nextPage_xp = '';
      that.nextpage_tzj = '1';
      that.homelistmassage = []; //推荐列表
      that.homelistzbmsg = []; //直播列表
      that.homelistxpmsg =[]; //新品列表
      that.homelisttzjmsg =[]; //投资金列表
      that.hasmorepage = 1;
      that.nodatashow = false;
      // ljx
      that.active = tabindex;
      that.list_content_show_type = tabindex;
      
      that.$router.push(
        {
          path:'/shop',
          query : {
            tab : that.active 
          }
      });
      //关掉投资金金价定时器
      clearInterval(that.goldpricetimer);
      switch(tabindex){
        case 0 :
          //推荐列表
          if(getsessionStorage('homelisttjstorerange')){
            that.homelistmassage = getsessionStorage('homelisttjstorerange');
          }else{
            that.homelisttj();
          }
          break
        case 1 :
        //直播列表 
        if(getsessionStorage('homelistzbstorerange')){
          that.homelistzbmsg = getsessionStorage('homelistzbstorerange');
        }else{
          that.api.homedetails
          .homelistfenleizb({})
          .then(res => {
            if(!res.data.code)return;
            if(res.data.code == 1){
              if(res.data.data.length > 0){
                that.zhibotitletype = res.data.data;
                that.obj_option.id = that.zhibotitletype[0].id;
                that.obj_option.categoryName = that.zhibotitletype[0].name;
                that.homelistzb();
              }else{
                this.$toast("直播分类暂无数据");
              }   
            }
          })
        }
        break  
        case 2 :  
        //新品列表
        if(getsessionStorage('homelistxpstorerange')){
          that.homelistxpmsg = getsessionStorage('homelistxpstorerange');
        }else{
          that.api.homedetails
          .homelistfenleixp({})
          .then(res => {
            if(!res.data.code)return;
            if(res.data.code == 1){
              if(res.data.data.length > 0){
                that.xinpintitletype = res.data.data;
                // console.log(that.xinpintitletype);
                that.obj_option_xp.categoryId = that.xinpintitletype[0].id;
        
                that.homelistxp(); //新品
              }else{
                this.$toast("新品分类暂无数据");
              }   
            }
          })
        }
        break
        case 3 :
        //投资金列表 
        clearInterval(that.goldpricetimer);  
        that.goldpricetimer = setInterval(that.goldmass,5000);
        if(getsessionStorage('homelisttzjstorerange')){
          that.homelisttzjmsg = getsessionStorage('homelisttzjstorerange');
        }else{
          that.homelisttzj();
        }
        break
      }
    },
    //直播的分类筛选 直播中 每日必看...
    tabtittypezhibo(obj,index){
      let that = this;
      that.tab_active = index;
      that.obj_option.id = obj.id;
      that.obj_option.categoryName = obj.name;
      that.homelistzbmsg = [];
      this.homelistzb();
    },
    //新品的分类筛选 项链 ...
    tabtittypexinpin(obj,index){
      let that = this;
      that.tab_active_xp = index;
      that.obj_option_xp.categoryId = obj.id;
      that.homelistxpmsg = [];
      this.homelistxp();
    },
    // 移除二三级 分类数据的缓存
    removesession(){
      window.sessionStorage.removeItem("twoid");
      window.sessionStorage.removeItem("threeid");
    },
    //首页推荐列表
    homelisttj() {
      let that = this;
      // that.listloading = true;
      that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 200000
      }); 
      that.api.homedetails
        .homelisttjpost({
          nextpage : that.nextpage
        })
        .then(res => {
          that.$toast.clear();
          that.listloading = false;
          if(res.data.code == 1){
            if (res.data.data.list && res.data.data.list.length > 0) {
              that.nodatashow = false;
              that.hasmorepage = 2;
              res.data.data.list.forEach(e => {
                that.homelistmassage.push(e);
              });
              that.homelistmassage.map( item => {
                return item.change_size = 1;
              });
              //缓存数据处理
              let homelisttjstorerange = that.homelistmassage;
              setsessionStorage('homelisttjstorerange',homelisttjstorerange);
            } 

            that.nextpage = res.data.data.nextpage;
            if(that.nextpage != "") {
              that.listfinished = false;
              that.listloading = false;
            }else {
              if(that.hasmorepage === 1){
                that.nodatashow = true;
              }else{
                that.listloading = false;
                that.finished_text = '亲~已经到底了';
              }
              that.listfinished = true;
            }
              that.$forceUpdate();
              that.$toast.clear();
          }else{
            that.$toast(res.data.info);
          }
        })
    },
    //直播列表
    homelistzb(){
      let that = this;
      that.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 200000
        });  
      that.api.homedetails
      .homelistzbpost({
        id : that.obj_option.id,
        categoryName : that.obj_option.categoryName,
        nextpage : that.nextPage_zb
      })
      .then(res => {
        that.$toast.clear();
        that.listloading_zb = false;
        if(res.data.code == 1){
          if (res.data.data.list && res.data.data.list.length > 0) {
            that.nodatashow = false;
            that.hasmorepage = 2;
            res.data.data.list.forEach(e => {
              that.homelistzbmsg.push(e);
            });
            //缓存数据处理
            let homelistzbstorerange = that.homelistzbmsg;
            setsessionStorage('homelistzbstorerange',homelistzbstorerange);
          } 

          that.nextPage_zb = res.data.data.nextpage;
          if (that.nextPage_zb != "" && that.nextPage_zb !== undefined) {
            that.listfinished_zb = false;
            that.listloading_zb = false;
          } else {
            if(that.hasmorepage === 1){
              that.nodatashow = true;
            }else{
              that.listloading_zb = false;
              that.finished_text_zb = '亲~已经到底了';
            }
            that.listfinished_zb = true;
          }
          that.$forceUpdate();
          that.$toast.clear();
        }
        else{
          that.$toast(res.data.info);
        }
      })
    },
    //首页新品列表
    homelistxp(){
      let that = this;
      that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 200000
      });  
      that.api.homedetails
      .homelistxppost({
        userId : that.$store.state.user.userid,
        categoryId : that.obj_option_xp.categoryId,
        price : that.obj_option_xp.price_area,
        priceSort : that.obj_option_xp.priceSort,
        nextPage : that.nextPage_xp
      })
      .then(res => {
        that.$toast.clear();
        that.listloading_xp = false;
        if(res.data.code == 1){
          if (res.data.data.list && res.data.data.list.length > 0) {
            that.nodatashow = false;
            that.hasmorepage = 2;
            res.data.data.list.forEach(e => {
              that.homelistxpmsg.push(e);
            });
            //缓存数据处理
            let homelistxpstorerange = that.homelistxpmsg;
            setsessionStorage('homelistxpstorerange',homelistxpstorerange);
          }
          that.nextPage_xp = res.data.data.nextPage;
          if(that.nextPage_xp != "") {
            that.listloading_xp = false;
            that.listfinished_xp = false;
            console.log('222');
          } 
          else {
            if(that.hasmorepage === 1){
              that.nodatashow = true;
            }else{
              that.listloading_xp = false;
              that.finished_text_xp = '亲~已经到底了';
            }
            that.listfinished_xp = true;
          }
          that.$forceUpdate();
          that.$toast.clear();
        }else{
          that.$toast(res.data.info);
        }
      })
    },
    //首页投资金列表
   homelisttzj() {
      let that = this;
      // that.listloading = true;
      that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 200000
      });
      that.api.homedetails
        .homelisttzjpost({
          userId : that.$store.state.user.userid,
          nextpage : that.nextpage_tzj
        })
        .then(res => {
          that.$toast.clear();
          that.listloading_tzj = false;
          if(res.data.code == 1){
            if(res.data.data.goodsList && res.data.data.goodsList.length > 0) {
              that.nodatashow = false;
              that.hasmorepage = 2;
              res.data.data.goodsList.forEach(e => {
                that.homelisttzjmsg.push(e);
              });
              that.homelisttzjmsg.map( item => {
                return item.change_size = 1;
              });
              that.homelisttzjmsg = that.homelisttzjmsg.concat(res.data.data.roomlist);
            }else if(res.data.data.roomlist.length > 0){
              that.nodatashow = false;
              that.hasmorepage = 2;
              res.data.data.roomlist.forEach(e => {
                that.homelisttzjmsg.push(e);
              });
            } 

             //缓存数据处理
            let homelisttzjstorerange = that.homelisttzjmsg;
            setsessionStorage('homelisttzjstorerange',homelisttzjstorerange);
            
            that.nextpage_tzj = res.data.data.nextpage;
            console.log(that.nextpage_tzj);
            if (that.nextpage_tzj != "" && that.nextpage_tzj != "0") {
              that.listfinished_tzj = false;
              that.listloading_tzj = false;
            } else{
              if(that.hasmorepage === 1){
                that.nodatashow = true;
              }else{
                that.listloading_tzj = false;
                that.finished_text_tzj = '亲~已经到底了';
              }
              that.listfinished_tzj = true;
            }
            that.$forceUpdate();
            that.$toast.clear();
          }else{
            that.$toast(res.data.info);
          }
        })
    },
    //首页新品排序
    tabsort(item){
      var that = this;
      let type = item.type;
      that.titesortactive = type - 1;
      that.homelistxpmsg =[];
      console.log(item.type);
      switch(type){
        case 1 :
        //最新  接口priceSort为 2是'最新'方式排序  
        that.obj_option_xp.priceSort = 2;
        that.homelistxp();
        break
        case 2 :
        //最新  接口priceSort为 3是'销售'方式排序  
        that.obj_option_xp.priceSort = 3;
        that.homelistxp();
        break
        case 3 :
        //最新  接口priceSort 0:升序；1：降序方式排序  
        if(that.obj_option_xp.priceSort == 1){
          that.obj_option_xp.priceSort = 0;
          that.price_up = true;
          that.price_down = false;
        }else{
          that.obj_option_xp.priceSort = 1;
          that.price_up = false;
          that.price_down = true;
        }
        that.homelistxp();
        break
      }

    },
    //首页新品--点击晒选展示价格区间
    filtershow(){
      let that = this;
      that.filtershow_flag = true;
    },
    //首页新品--点击晒选'关闭'价格区间
    close_filter_tan(){
      let that = this;
      that.filtershow_flag = false;
    },
    //新品价格区间选定某个
    choose_price_area(item,index){
      let that = this;
      var input_min = that.$refs.input_min,
          input_max = that.$refs.input_max;

      that.price_area_step_active = index;
      that.obj_option_xp.priceSort = 0;
      input_min.value = item.area_input[0];
      input_max.value = item.area_input[1];

      that.obj_option_xp.price_area = input_min.value + '-' + input_max.value;
    },
    //新品价格区间选定某个-确认搜索
    price_area_step_save(){ 
      let that = this;
      if(!that.obj_option_xp.price_area)return this.$toast("请选择价格");
      that.homelistxpmsg =[];
      that.homelistxp();
      // close tan ceng
      that.filtershow_flag = false; 
    },
    //新品价格区间选定某个-重置
    price_area_step_reset(){
      let that = this;
      //重置内容 传入的价格区间无选中 传入搜索价格为空
      that.price_area_step_active = '';
      that.obj_option_xp.price_area = '';
      that.homelistxpmsg =[];
      that.filtershow_flag = false; 
      that.homelistxp();
    },
    //推荐列表切换大小图
    changeimgsize_tj(){
      var that = this;
        if(that.change_big_small_flag_tj === 1){
          that.change_big_small_flag_tj = 0;
        }else{
          that.change_big_small_flag_tj = 1;
        }
      
    },
    //直播列表切换大小图
    changeimgsize_zb(){
       var that = this;
        if(that.change_big_small_flag_zb === 1){
          that.change_big_small_flag_zb= 0;
        }else{
          that.change_big_small_flag_zb = 1;
        }
    },
    //新品列表切换大小图
    changeimgsize_xp(){
       var that = this;
        if(that.change_big_small_flag_xp === 1){
          that.change_big_small_flag_xp= 0;
        }else{
          that.change_big_small_flag_xp = 1;
        }
    },
    //投资金列表切换大小图
    changeimgsize_tzj(){
       var that = this;
        if(that.change_big_small_flag_tzj === 1){
          that.change_big_small_flag_tzj= 0;
        }else{
          that.change_big_small_flag_tzj = 1;
        }
    }
  },
  beforeCreate() {
    // window.sessionStorage.removeItem('homelisttjstorerange');
  }, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    //关掉投资金金价定时器
    clearInterval(this.goldpricetimer);
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
  font-weight:500;
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
  // overflow: auto;
}
#shopwrap .van-tab--active.van-tab {
  color: rgba(51, 51, 51, 1);
  font-size: .48rem;
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
}
</style>