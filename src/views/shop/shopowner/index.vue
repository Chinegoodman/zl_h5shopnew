<!-- 组件说明 -->
<template>
  <div class="w_wrap">
    <div class="shopkeepermass-top">
        <div class="hd_top">
            <span class="goback" @click="shopback"><img src="./../../../assets/imgs/icons/sp-pic-fanh@2x.png" /></span>
            <a class="gouwuche" href="javascript:void(0)" @click="gotoshopcart"><img src="./../../../assets/imgs/shop/gouwuche.png" alt="抓周" /></a>
            <div class="box-more-info">
                <!-- <span class="more-info"><img src="./../../../assets/imgs/shop/moreinfo.png" alt="抓周" /></span> -->
                 <div class="propt_nav" v-if="false">
                    <span class="ic-corner"  ><img src="./../../../assets/imgs/shop/corner.png" alt /></span>
                    <ul >
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
                <span class="nicknames">{{shopmass.nickname}}</span>
                <div class="rz"><span class="ic"></span>实名店铺认证</div>
                <a href="javascript:void(0)" class="rightgz" @click="followstoreadd" v-if="shopmass.is_attention==3">关注</a>
                <a href="javascript:void(0)" class="qxgzbtn" @click="followstoredelete" v-if="shopmass.is_attention==1">已关注</a>
                <!-- <div class="hxgzbtn" v-if="shopmass.is_attention==2" @click="followstoredelete">
                    <span class="clearfix"> 
                        <img src="img/xiaoshiopinxainghujiaohuan@2x.png" alt />互相关注
                    </span>
                </div> -->
            </div>
        </div>
    </div>
    <div class="goods_list_box">
        <div class="goodslist">
            <h2>首页</h2>
            <van-list
            class="goodslist_xp"
            v-model="listloading"
            :finished="listfinished"
            :finished-text="finished_text"
            :error.sync="vanerror"
            error-text="请求失败，点击重新加载"
            :offset="10"
            @load="shoplist"
          >

            <div class="goodsli" @click="gotogoodsdetails(item)"
              v-for="(item,index) in shoplistmassage"
              :key="index"
            >
              <div class="im">
                <img :src="item.goods_image?item.goods_image:default_img_small" alt="珠宝商品" />
              </div>
              <span class="tit">{{item.goods_title}}</span>
              <div class="price"><span>￥</span>{{item.price}}</div>
              <div class="price_btm">{{item.brand_name}}</div>
              <div class="canged" v-if="item.isCollection==1" @click.stop="mycollect(index)" ></div>
              <div class="cang" v-if="item.isCollection==0" @click.stop="mycollect(index)"></div>
            </div>  
          </van-list>
        </div>
        <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
        <span v-if="false" class="openshop">我也要开店</span>
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
    splist() {
      let that = this;
      this.show = true;
      this.showzb = false;
      this.showgz = false;
      that.shoplistmassage = [];
      that.nxetpageshop = "";
      that.shoplist();
    },
    zblist() {
      let that = this;
      this.show = false;
      this.showzb = true;
      this.showgz = false;
      that.videolistmassage = [];
      that.nxetpagevideo = "";
      that.videolist();
    },
    gzlist() {
      let that = this;
      that.show = false;
      that.showzb = false;
      that.showgz = true;
      that.peoplelistmassage = [];
      that.nxetpagepeople = "";
      that.peoplelist();
    },
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    },
    //跳转到购物车
    gotoshopcart(){
      ///shopcart
      this.$router.push({
        name: "shopcart"
      })
    },
    // 跳转商品详情
    gotogoodsdetails(goodsid) {
      var that = this;
      that.$router.push({
        name: "productdetails",
        params: {
          product_id: goodsid.sku_id,
          webtype: 1
        }
      });
    },
    // 获取店主信息
    shopdzmass() {
      let that = this;
      that.shop_id = this.$route.query.shop_id;
      that.myId = this.$route.query.shop_userId;
      that.api.productdetails
        .getStoreInfo({
          myId: that.myId,
          watchId: that.$store.state.user.userid, //用户id
          shopId: that.shop_id
        })
        .then(res => {
          that.shopmass = res.data.data;
        });
    },
    // 获取商品列表
    shoplist() {
      let that = this;
      that.api.shopmassages
        .getStoreGoodsList({
          userId :that.userIdss,
          nextpage: that.nxetpageshop,
          // nextpage:"1573721043000",
          pageSize: "",
          brand_id: that.shop_id
        })
        .then(res => {
          console.log(res);
          that.$toast.clear();
          that.listloading = false;
          if(res.data.code == 1){
            if (res.data.data.list && res.data.data.list.length > 0) {
              that.hasmorepage = 2;
              that.shoplistmassage = that.shoplistmassage.concat(res.data.data.list); 
            }
            that.nxetpageshop = res.data.data.nextpage;
            if (that.nxetpageshop != "") {
              that.listfinished = false;
              that.listloading = false;
            } 
            else {
              if(that.hasmorepage == 1){
                that.nodatashow = true;
              }else{
                that.listloading = false;
                that.finished_text = '亲~已经到底了';
              }
              that.listfinished = true;
            } 
          }
        })
        .catch(err => {
          that.listloading = false;
          that.vanerror = true;
          that.$toast("数据错误");
        });
    },
    //收藏与取消收藏
    mycollect(index){
      let that = this;
      if(!that.$store.state.user.userid){
        that.$toast('请先登录');
      }
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
            // that.shoplist();
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
            // that.shoplist();
            that.$forceUpdate();
            that.$toast.clear();
          }else{
              throw "关注失败";
          }
          
        })
      }
    },
    // 店铺 关注接口
    followstoreadd(){
        let that = this;
        that.shop_id = this.$route.query.shop_id;
        if(!that.iflogin()){return;};
        this.api.productdetails.storeadd({
            storeId: that.shop_id,
            uid: that.$store.state.user.userid,
        }).then(res=>{
            if(res.data.info=='关注成功'){
                that.$toast({
                    message: '关注成功',
                    duration: 810,
                    // forbidClick: true
                })
                that.shopdzmass();
            }else{
                that.$toast({
                    message: '关注失败',
                    duration: 810,
                    // forbidClick: true
                })
            }
        })
    },
    // 店铺 取消关注接口
    followstoredelete(){
        let that = this;
        that.shop_id = this.$route.query.shop_id;
        this.api.productdetails.storedelete({
            storeId: that.shop_id,
            uid: that.$store.state.user.userid,
        }).then(res=>{
            if(res.data.info=='取消成功'){
                that.$toast({
                    message: '取消关注操作成功',
                    duration: 810,
                    // forbidClick: true
                })
                that.shopdzmass();
            }else{
                that.$toast({
                    message: '取消关注操作失败',
                    duration: 810,
                    // forbidClick: true
                })
            }
        })
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
    // 获取小视频列表
    videolist() {
      let that = this;
      console.log(that.userIdss);
      that.api.shopmassages
        .getStoreGoodsVideo({
          myId: 1, //店铺人的ID（不知道是那个）
          watchid: that.userIdss, //用户id
          nextpage: that.nxetpagevideo,
          pageSize: "",
          watchid: ""
        })
        .then(res => {
          // that.peoplelistmassage=res.data.data.list;
          if (res.data.data.list != null) {
            let nextmass = res.data.data.list.forEach(function(item, index) {
              that.videolistmassage.push(item);
            });
          } else {
            this.$toast("暂无数据");
          }
          that.nxetpagevideo = res.data.data.nextpage;
          // console.log(that.nxetpagevideo);
          if (that.nxetpagevideo != "") {
            that.listfinished = false;
            that.listloading = false;
          } else {
            that.listfinished = true;
            that.listloading = false;
          }
        })
        .catch(err => {
          that.listloading = false;
          that.lvanerror = true;
          that.$toast("数据错误");
        });
    },
    // 获取关注列表
    peoplelist() {
      let that = this;
      that.api.shopmassages
        .getStoreGoodsAttention({
          myId: 1, //店铺人的ID（不知道是那个）
          watchid: that.userIdss, //用户id
          nextpage: that.nxetpagepeople,
          pageSize: "",
          watchid: ""
        })
        .then(res => {
          console.log(res.data);
          // that.peoplelistmassage=res.data.data.list;
          if (res.data.data.list != null) {
            let nextmass = res.data.data.list.forEach(function(item, index) {
              that.peoplelistmassage.push(item);
            });
          } else {
            this.$toast("暂无数据");
          }
          that.nxetpagepeople = res.data.data.nextpage;
          // console.log(that.peoplelistmassage);
          if (that.nxetpagepeople != "") {
            that.listfinished = false;
            that.listloading = false;
          } else {
            
            that.listfinished = true;
            that.listloading = false;
          }
        })
        .catch(err => {
          that.listloading = false;
          that.listvanerror = true;
          that.$toast("数据错误");
        });
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
    that.userIdss = that.$store.state.user.userid;
    that.shopdzmass();
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
.w_wrap .van-list__error-text,
.w_wrap .van-list__finished-text,
.w_wrap .van-list__loading {
  margin: 0 auto;
  line-height: 3em;
  width: 7.5rem;
  float: left;
}
.w_wrap .openshop{
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
</style>