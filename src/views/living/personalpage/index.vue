<!-- 组件说明 -->
<template>
  <div class="living-personal-wrap">
    <div class="shopkeepermass-top">
        <div class="hd_top" >
            <span class="goback" @click="gotolivingdetails"><img src="./../../../assets/imgs/icons/sp-pic-fanh@2x.png" /></span>
            <a class="gouwuche" href="javascript:void(0)" @click="gotoshopcart"><img src="./../../../assets/imgs/shop/gouwuche.png" alt="抓周" /></a>
            <div class="box-more-info">
                <!-- <span class="more-info"><img src="./../../../assets/imgs/shop/moreinfo.png" alt="抓周" /></span> -->
                 <div class="propt_nav" v-if="false">
                    <span class="ic-corner"  ><img src="./../../../assets/imgs/shop/corner.png" alt /></span>
                    <ul>
                        <li>
                            <a href="#"><span class="ic"><img src="./../../../assets/imgs/shop/goindex.png" alt /></span>抓周首页</a>
                        </li>
                        <li>
                            <a href="#"><span class="ic"><img src="./../../../assets/imgs/shop/kf.png" alt /></span>在线客服</a>
                        </li>
                        <li>
                            <a href="#"><span class="ic"><img src="./../../../assets/imgs/shop/toushu.png" alt /></span>投诉建议</a>
                        </li>
                    </ul> 
                </div>
            </div>
        </div>
        <div class="shopbanner">
            <img :src="shopmass.banner?shopmass.banner:default_img_banner" alt />
        </div>
        <div class="per_info">
            <span class="hd">
                <img class="hd_img" :src="shopmass.face_url?shopmass.face_url:default_img_head" alt="">
            </span>
            <div class="info">
                <div class="info-tit">
                  <span class="nicknames">{{shopmass.nickname}}</span><div class="rz"><span class="ic"></span>{{shopmass.identify==1?"已认证":"实名店铺认证"}}</div>
                </div>  
                <!-- <a href="javascript:void(0)" class="rightgz" @click="followstoreadd" v-if="shopmass.is_attention==3">关注</a> -->
                <a href="javascript:void(0)" class="rightgz" @click="followstoredelete(false,shop_userId,1)" v-if="shopmass.is_attention==3">关注</a>
                <a href="javascript:void(0)" class="qxgzbtn" @click="followstoredelete(true,shop_userId,1)" v-if="shopmass.is_attention==1">取消关注</a>
                <!-- <div class="hxgzbtn" v-if="shopmass.is_attention==2" @click="followstoredelete">
                    <span class="clearfix"> 
                        <img src="img/xiaoshiopinxainghujiaohuan@2x.png" alt />互相关注
                    </span>
                </div> -->
                <p class="instruc">{{shopmass.introduction}}</p>
                <div class="pernanl-data">
                  <span class="fs"><span class="t">{{shopmass.fansNum}}</span>粉丝</span>
                  <span class="fs hz"><span class="t">{{shopmass.praiseNumber}}</span>获赞</span>
                </div>
            </div>
        </div>
        <div class="list big_list">
          <van-tabs v-model="isActive" >
            <van-tab :title="item.name"  :key="index" v-for="(item,index) in tab_list_arr" >
              <div class="tab-title" slot="title"  @click="changeTab(item.tab_id)" >{{item.name}}</div>
              <van-list
                class="goodslist"
                v-model="listloading"
                :finished="listfinished"
                :finished-text="finished_text"
                :error.sync="vanerror"
                error-text="请求失败，点击重新加载"
                :offset="10"
                @load="homelisttj"
                v-show="posttype==1"
              >
                <div
                  @click="gotolivingdetails()"
                  class="goodsli"
                  v-for="(item,index) in homelistmassage"
                  :key="index"
                  :id="item.id"
                >
                  <div class="con-type">
                    <div class="im">
                      <img :src="item.glp.bigImage?item.glp.bigImage:default_img_big" alt="" />
                    </div>
                    <div class="goodsli_title clearfix">
                      <span class="img_w">
                        <img :src="item.face_url?item.face_url:default_img_head" alt="抓周" />
                      </span>
                      <h2 class="_txtov2" :class="{indent:item.nickname}">{{item.nickname}}</h2>
                    </div>
                    <span class="tit">{{item.name}}</span>
                    <div class="zan" @click.stop="clickPraisePoint(index)">
                      <piontPraise :livingUid="item.uid" :livingId="item.id" ref="piontPraise"></piontPraise>
                    </div>
                    <div class="gd_btm">
                      <span class="zb" v-if="item.state==0"></span>
                      <span class="huifang" v-if="item.state==1"></span>
                      <span class="num">{{item.realcount}}观看</span>
                    </div>
                  </div>
                  <div class="con-type con-type2" v-if="false">
                    <div class="im">
                      <img :src="item.glp.bigImage?item.glp.bigImage:default_img_big" alt="" />
                    </div>
                    <div class="rt">
                        <div class="titltes"><span>短腿的橘子</span><span class="hd"><img src="./../../../assets/imgs/living/nv.png" alt /></span></div>
                        <div class="data-detail">
                          <span class="fs"><span class="t">12121</span>粉丝</span>
                          <span class="fs"><span class="t">145</span>视频</span>
                          <span class="fs"><span class="t">1245</span>获赞</span>
                        </div>
                        <p>图片显示及无数据提示处理图片显示及无数据提示处理</p>
                    </div>
                    <span class="attention">关注</span>
                    <span class="attentioned">取消关注</span>
                  </div>
                </div>
              </van-list>
              <van-list
                class="goodslist goodslist-ifens"
                v-model="listloading_fs"
                :finished="listfinished_fs"
                :finished-text="finished_text_fs"
                :error.sync="vanerror_fs"
                error-text="请求失败，点击重新加载"
                :offset="10"
                @load="getifenslist"
                 v-show="posttype==2"
              >
                <div
                  class="goodsli goodsli-ifens"
                  v-for="(item,index) in ifenslistmsg"
                  :key="index"
                  :id="item.id"
                >
                    <div class="im">
                      <img :src="item.face_url?item.face_url:default_img_big" alt="" />
                    </div>
                    <div class="rt">
                        <div class="titltes"><span>{{item.nickname}}</span><span class="hd"><img v-if="item.sex==1" src="./../../../assets/imgs/living/nan.png" alt /><img v-if="item.sex==0" src="./../../../assets/imgs/living/nv.png" alt /></span></div>
                        <div class="data-detail">
                          <span class="fs"><span class="t">{{item.funNumber}}</span>粉丝</span>
                          <span class="fs"><span class="t">{{item.videoNumber}}</span>视频</span>
                          <span class="fs"><span class="t">{{item.praiseNumber}}</span>获赞</span>
                        </div>
                        <p>{{item.introduction}}</p>
                    </div>
                    <span class="attention" v-if="item.is_attention==3" @click.stop="followstoredelete(false,item.userId,0)" >关注</span>
                    <span class="attentioned" v-if="item.is_attention==1" @click.stop="followstoredelete(true,item.userId,0)">取消关注</span>
                    <span class="attentioned" v-if="item.is_attention==2" @click.stop="followstoredelete(true,item.userId,0)">互相关注</span>
                </div>
              </van-list>
        </van-tab>
        </van-tabs>
      </div>
        <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
    </div>
    <!-- 直播列表数据展示 --> 
</div>
</template>

<script>
import nodata from './../../../components/nodata.vue'
import piontPraise from './../../../components/piontPraise.vue'
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
    nodata,
    piontPraise 
  },
  data() {
    return {
      tab : '',//存储上一次传过来的 
      is_attention : 3,
      showlist: false,
      show: true,
      showzb: false,
      showgz: false,
      pagetypedata:"discountshop",
      default_img_small: require('../../../assets/imgs/shop/list-default-small.png'), //默认图片
      default_img_head : require('../../../assets/imgs/icons/default-head.png'),
      shoucang_type :'',
      type: 1,
      product_id: "",
      sex: 0,
      shopmass: {
        shopname: ""
      },
      shop_id: "",
      shop_userId : '',
      userIdss: "",
      //直播个人中心新加
      isActive : 0, //选中的tab下标
      tab_list_arr:[
        {
          name : '视频',
          tab_id : 0
        },
        {
          name : '粉丝',
          tab_id : 1
        }
      ],
      nodatashow:false,
      vanerror: false,
      nextpage:'',
      homelistmassage: [],
      listfinished: true,
      listloading: false,
      finished_text : '',
      vanerror_fs: false,
      nextpage_fs:'',
      ifenslistmsg: [],
      listfinished_fs: true,
      listloading_fs: false,
      finished_text_fs : '',
      default_img_banner : require('../../../assets/imgs/shop/banner-default.png'),
      default_img_big: require('../../../assets/imgs/shop/list-default-big.png'),
      hasmorepage : 1, //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
      posttype : 1
    };
  },
  computed: {},
  methods: {
    //跳转到购物车
    gotoshopcart(){
      ///shopcart
      this.$router.push({
        name: "shopcart"
      })
    },
    // 返回上一页
    // 跳转商品详情
    gotolivingdetails() {
      let that = this;
      that.$router.push({
        path: `/living/livingdetails`,
        query : {
          tab :  that.tab
        }
      });
    },
    // 获取店主信息
    shopdzmass() {
      let that = this;              
      that.api.productdetails
        .getStoreInfo({
          myId: that.shop_userId,
          watchId: that.$store.state.user.userid, //用户id
          shopId: ''
        })
        .then(res => {
          that.shopmass = res.data.data;
        });
    },
    //收藏与取消收藏
    mycollect(index){
      let that = this;
      if(that.shoplistmassage[index].isCollection == 1){
        that.shoucang_type = 2;
        //关注过 取消关注
        that.api.personalcenter.shopsshoucang({
          "type" : that.shoucang_type,
          "skuId" : that.shoplistmassage[index].sku_id,
          "uid" : that.$store.state.user.userid
        }).then(res => {
          //增加关注
          if(!res.data.code)return;
          if(res.data.code == 1){
            that.shoplistmassage[index].isCollection = 0;
            that.shoplist();
            that.$forceUpdate();
            that.$toast.clear();
          }else{
              throw "取消关注失败";
          }
        })
      }else if(that.shoplistmassage[index].isCollection == 0){
        //未关注 增加关注
        that.shoucang_type = 1;
        that.api.personalcenter.shopsshoucang({
          "type" : that.shoucang_type,
          "skuId" : that.shoplistmassage[index].sku_id,
          "uid" : that.$store.state.user.userid
        }).then(res => {
          //增加关注
          if(!res.data.code)return;
          if(res.data.code == 1){
            that.shoplistmassage[index].isCollection = 1;
            that.shoplist();
            that.$forceUpdate();
            that.$toast.clear();
          }else{
              throw "关注失败";
          }
          
        })
      }
    },
    // 关注 与 取消关注 主播
    followstoredelete(currentstatus,othersideid,from) {
      let that = this;
      if (!that.iflogin()) {
          that.$toast('请先登录');
          return;
      }
      if (!currentstatus) {
          // 当前 为 非关住状态
          that.api.living
              .attentionadd({
                  // uid: that.$store.state.user.userid,
                  uid: that.$store.state.user.userid,
                  // attid: that.shop_userId
                  attid: othersideid
              })
              .then(res => {
                  if (res.data.code == 1) {
                    if(from == 1){
                      that.shopdzmass();
                    }else{
                      that.ifenslistmsg = [];
                    that.getifenslist();
                    }
                  }
              })
      } else {
          // 当前 为 关住状态
          that.api.living
              .attentiondelete({
                  // uid: that.$store.state.user.userid,
                  uid: that.$store.state.user.userid,
                  // attid: that.shop_userId
                  attid: othersideid
              })
              .then(res => {
                  // console.log(res.data);
                  if (res.data.code == 1) {
                   if(from == 1){
                      that.shopdzmass();
                    }else{
                      that.ifenslistmsg = [];
                    that.getifenslist();
                    }
                  }
              })
      }
    },
    // 判断是否登录
    iflogin(){
        let that = this;
        if(that.$route.params.webtype==0){
            // app
            if(!that.userID || that.userID == 0){
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
        }else{
            // H5端
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
        }
        
    },
    // 点击跳转到用户登录页面
    gotologin(){
        let that = this;
        if(that.$route.params.webtype==0){
            jsCallLogin()
            return;
        }else{
            setTimeout(() => {
                that.$router.push({name:'login'})
            }, 800);
        }
    },
    //tab切换
    changeTab(index){
      let that = this;
      that.$router.push({
        path: `/living/livingpersonalpage`,
        query : {
          shopId : that.shop_id,
          shop_userId : that.shop_userId,
          tab : that.tab,
          tab_id :  index
        }
      });
      that.hasmorepage = 1;
      that.nodatashow = false;
      that.nextpage = '';
      that.nextpage_fs = '';
      that.finished_text = '';
      that.finished_text_fs = '';
      that.homelistmassage = [];
      that.ifenslistmsg = [];
      that.posttype = index + 1;
      if(that.posttype == 1){
        that.homelisttj();
      }else{
        that.getifenslist();
      }
      
    },
    homelisttj() {
      let that = this;
      // that.listloading = true;
      that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 200000
      }); 
      that.api.living
        .getLivingpersonalvideo({
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
    getifenslist() {
      let that = this;
      // that.listloading = true;
      that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 200000
      }); 
      that.api.living
        .getLivingpersonalifenslist({
          myId: that.shop_userId,
          watchId: that.$store.state.user.userid, //用户id
          shopId: that.shop_id,
          nextpage : that.nextpage_fs,
          pageSize : 10
        })
        .then(res => {
          that.$toast.clear();
          that.listloading_fs = false;
          if(res.data.code == 1){
            if (res.data.data.list && res.data.data.list.length > 0) {
              that.nodatashow = false;
              that.hasmorepage = 2;
              res.data.data.list.forEach(e => {
                that.ifenslistmsg.push(e);
              });
            } 
            that.nextpage_fs = res.data.data.nextpage;
            console.log(that.nextpage_fs);
            if(that.nextpage_fs != "") {
              that.listfinished_fs = false;
              that.listloading_fs = false;
            }else {
              if(that.hasmorepage === 1){
                that.nodatashow = true;
              }else{
                that.listloading_fs = false;
                that.finished_text_fs = '亲~已经到底了';
              }
              that.listfinished_fs = true;
            }
              that.$forceUpdate();
              that.$toast.clear();
          }else{
            that.$toast(res.data.info);
          }
        })
    },
    //点赞
    clickPraisePoint(index){
      let that = this;
      //调用点赞组件点赞方法
      that.$refs.piontPraise[index].likeClick();
    }
  },
  created() {
    let that = this;
    let user = localStorage.getItem("user-info");
    let userj = JSON.parse(user);
    that.userId = userj.userid;
  },
  mounted() {
    let that = this;
    let user = localStorage.getItem("user-info");
    let userj = JSON.parse(user);
    that.userIdss = userj.userid;
    that.shop_id = this.$route.query.shopId;
    that.shop_userId = this.$route.query.shop_userId;
    that.tab = this.$route.query.tab;
    that.shopdzmass();
    if(that.$route.query.tab_id){
      that.posttype = Number(this.$route.query.tab_id) + 1;
    }
    that.isActive = Number(this.$route.query.tab_id);
    if(that.posttype == 1){
      that.homelisttj();
    }else{
      that.getifenslist();
    }
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
.living-personal-wrap .van-list__error-text,
.living-personal-wrap .van-list__finished-text,
.living-personal-wrap .van-list__loading {
  margin: 0 auto;
  line-height: 3em;
  width: 7.5rem;
  float: left;
}
.living-personal-wrap .openshop{
  width : 3.2rem;
  height: .7rem;
  line-height :.7rem;
  background:rgba(255,189,4,1);
  border-radius: .35rem;
  text-align : center;
  position: fixed;
  bottom : .38rem;
  left: 50%;
  transform : translate(-50%);
  font-size: .32rem;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.living-personal-wrap .van-tabs__content{
  background:rgba(243,243,243,1);
}
.living-personal-wrap  .van-tab{
  font-size: .32rem;
  font-family:PingFang SC;
  color:rgba(117,117,117,1);
}
.living-personal-wrap .van-tab--active{
  
  color:rgba(31,31,31,1);
}
.living-personal-wrap .van-tabs__line{
  width : 1rem !important;
  height : 0.05rem !important;
  background:rgba(255,189,4,1);
}
.living-personal-wrap .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border-width : 0;
}
</style>