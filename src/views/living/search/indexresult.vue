<!-- 组件说明 -->
<template>
  <div class="search" id="search">
    <div class="searchtop">
      <div class="search_inp clearfix">
        <div class="back" @click="searchback">
          <img
            class="title_img"
            src="../../../assets/imgs/icons/back.png"
            alt
          />
        </div>
        <form action="/">
          <van-search
            @search="enter"
            shape="round"
            v-model="homesearchmassage.keyword"
            placeholder="输入宝贝名称或关键字"
            @cancel="searchback"
            class="searchinp"
          />
        </form>
        <div class="mass">
          <img
            class="title_img"
            src="../../../assets/imgs/icons/massblack.png"
            alt
          />
        </div>
      </div>
      <van-tabs v-model="active" color="#FFBD04" line-width="0.3rem" line-height="0.05rem" @click="homelistjktab">
        <van-tab title="全部" name="a"> </van-tab>
        <van-tab title="直播" name="b"> </van-tab>
        <van-tab title="精品" name="c"> </van-tab>
      </van-tabs>
    </div>
    <div class="search-list-box">
      <div :class="{'search-list' : true,'big_list' : change_big_small_flag_qb===0}">
        <van-list
          class="goodslist"
          v-model="listloading"
          :finished="listfinished"
          :finished-text="finished_text"
          :error.sync="vanerror"
          error-text="请求失败，点击重新加载"
          :offset="30"
          :immediate-check="false"
          @load="homelistjk"
        >

          <div
            @click="gotodetails(item)"
            class="goodsli"
            v-for="(item,index) in homelistmassage"
            :key="index"
            :id="item.goods_id"
          >

            <div class="show-flag-goods" v-if="item.sku_id">
              <div class="im">
                <img :src="item.goods_image" alt="珠宝商品" />
              </div>
              <span class="tit">{{item.goods_title}}</span>
              <div class="price"><span>￥</span>{{item.price}}</div>
              <div class="price_btm"> {{item.brand_name}}</div>
              <div class="canged" v-if="item.isCollection==1" @click.stop="mycollect(item)"></div>
              <div class="cang" v-if="item.isCollection==0" @click.stop="mycollect(item)"></div>
            </div>  
            <div class="show-flag-living" v-else>
              <div class="im">
                <img :src="item.glp && item.glp.smallImage?item.glp.smallImage:default_img_small" alt="珠宝商品" v-if="change_big_small_flag_qb===1" />
                <img :src="item.glp && item.glp.bigImage?item.glp.bigImage:default_img_big" alt="珠宝商品" v-if="change_big_small_flag_qb===0" />
              </div>
              <div class="goodsli_title clearfix">
                <span class="img_w">
                  <img :src="item.face_url" v-if="item.face_url" alt="抓周" />
                </span>
                <h2 class="_txtov2" :class="{indent:item.nickname}">{{item.nickname}}</h2>
              </div>
              <span class="tit">{{item.name}}</span>
              <div class="zan" @click.stop="clickPraisePoint(index)">
                <piontPraise :livingUid="item.uid" :livingId="item.id" ref="piontPraise" :index="index"></piontPraise>
              </div>
              <div class="gd_btm">
                <span class="zb" v-if="item.state==0"></span>
                <span class="huifang" v-if="item.state==1"></span>
                <span class="num">{{item.realcount}}观看</span>
              </div>
            </div>
          </div>
        </van-list>
        <div class="changebigsize" v-if="change_big_small_flag_qb===1" @click="changeimgsize_qb()"></div>
        <div class="changesmallsize" v-if="change_big_small_flag_qb===0" @click="changeimgsize_qb()"></div>
      </div>
    </div>  
    <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
  </div>
</template>

<script>
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
    Search
    // ====项目中可能用到的===
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import {
  setsessionStorage
} from "./../../../utils/index.js";
import nodata from './../../../components/nodata.vue'
import piontPraise from './../../../components/piontPraise.vue'
export default {
  components: {
    nodata,
    vanSearch:Search,
    vanTab : Tab,
    vanTabs : Tabs,
    vanList : List,
    piontPraise 
  },
  data() {
    return {
      nodatashow:false,
      nextpage : '',
      pagetypedata:"searchdata",
      active: "a",
      searched: true,
      homesearchmassage: {
        keyword: "", //关键字
        sort: 1, //排序 1:升序/2:降序
        hot: 0, //0:默认/1:热门/2:推荐/3:火爆
        oneCategoryId: "", //一级分类ID 默认：0
        twoCategoryId: "", //二级分类ID 默认：0
        threeCategoryId: "" //三级分类ID 默认：0
      },
      homesearchlist: [],
      listloading: false,
      listfinished: false,
      finished_text :'加载中...',
      vanerror: false,
      gold_type: 101,
      stylestatus: false, //默认类别选择样式：隐藏
      homelistmassage: [], //商品列表
      searchold: [], //搜索历史
      // searcholdhx: [] //搜索历史回显
      types:1,//tab类型
      twoCategoryId:"",//二级分类id
      change_big_small_flag_qb : 1,//推荐切换大小图外层class条件
      hg_parameters :{}, //搜索结果传参
      nextgoodspage : '', //搜索全部区别其他传参项
      hasmorepage : 1, //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
      default_img_small: require('../../../assets/imgs/shop/list-default-small.png'), //默认图片
      default_img_big: require('../../../assets/imgs/shop/list-default-big.png')
    };
  },
  computed: {},
  methods: {
    enter() {
      // if (e.keyCode == 13) {
        this.homelistjk();
      // }
    },
    // 返回上一页
    searchback(){
      let that = this;
      that.$router.go(-1);
      // sessionStorage.setItem("twoid", 0);
    },
    //全部列表切换大小图
    changeimgsize_qb(){
      var that = this;
        if(that.change_big_small_flag_qb === 1){
          that.change_big_small_flag_qb = 0;
        }else{
          that.change_big_small_flag_qb = 1;
        }
      
    },
    //搜索分类点击
    homelistjktab(){
      let that = this;
      
      if(that.active=="a"){
        that.types=1;
      }else if(that.active=="b"){
        that.types=2;
      }else if(that.active=="c"){
        that.types=3;
      }
      that.nodatashow= false;
      that.nextpage = '';
      that.nextgoodspage = '';
      that.listloading = false;
      that.finished_text = '';
      that.twoCategoryId = '';
      that.hasmorepage = 1;
      that.homelistmassage = [];
      that.homelistjk();

    },
    // 搜索接口
    homelistjk() {
      let that = this;
      let serchname = sessionStorage.getItem("searchname");
      let twoids = sessionStorage.getItem("twoid");
      if(that.homesearchmassage.keyword==serchname){
        // this.twoCategoryId = twoids;
        this.twoCategoryId = '';
      }else{
        this.twoCategoryId="";
      }

      that.$toast.loading({
        message: "加载中...",
        duration: 200000
      }); 

      that.hg_parameters = {
          userId :that.$store.state.user.userid,
          type:that.types,
          keyWord: that.homesearchmassage.keyword,
          // sort: 1,
          // hot: 0,
          oneCategoryId: "",
          twoCategoryId: that.twoCategoryId,
          threeCategoryId: "",
          nextPage : that.nextpage
        };

      if(that.types==1){
        that.hg_parameters["nextGoodsPage"] = that.nextgoodspage;
      }  
      that.api.productsearch
        .searchByKeyWord(that.hg_parameters)
        .then(res => {
          that.listloading = false;
          that.$toast.clear();
          if (res.data.code == 1) {
            if(res.data.data.list && res.data.data.list.length > 0){
              that.nodatashow = false;
              that.hasmorepage = 2;
              that.homelistmassage = that.homelistmassage.concat(res.data.data.list);
              that.searchold.push(that.homesearchmassage.keyword);
              that.searchold = that.unique(that.searchold);
              sessionStorage.setItem("livingsearchdata", that.searchold);
            }

            that.nextpage = res.data.data.nextPage;
            if(that.types == 1){
              if(res.data.data.nextGoodsPage == ''){
                that.nextgoodspage = that.hg_parameters["nextGoodsPage"];
              }else{
                that.nextgoodspage = res.data.data.nextGoodsPage;
              }
              
            }
            
            if (that.nextpage != "") {
              that.listfinished = false;
              that.listloading = false;
            } else {
              if(that.hasmorepage === 1){
                that.nodatashow=true;
              }else{
                that.listloading = false;
                that.finished_text = '我的是有底线的';
              }
              that.listfinished = true;
            }
            that.$forceUpdate();
            that.$toast.clear();
          }else{
            that.$toast(res.data.info);
            that.listfinished = true;
          }
        });
    },
    unique(arr) {
      return Array.from(new Set(arr));
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
    // 跳转到商品详情
    gotodetails(item) {
      let that = this;
      if(item.sku_id){
        this.$router.push({
          name: "productdetails",
          params: {
            product_id: item.sku_id,
            webtype: 1
          }
        });
      }else{
        if(!that.iflogin()){return;}
        setsessionStorage("livinglidata", item);
        if(item.state==0){
          this.$router.push({
            path: "/living/livingdetails"
          });
        }else if(item.state==1){
          this.$router.push({
            path: "/living/livingreplay",
            query : {
              liveId : item.id
            }
          });
        }
      }
    },
    //收藏与取消收藏
    mycollect(item){
      let that = this;
      if(!that.$store.state.user.userid){
        that.$toast('请先登录');
      }
      if(item.isCollection == 1){
        that.shoucang_type = 2;
        //关注过 取消关注
        that.api.personalcenter.shopsshoucang({
          "type" : that.shoucang_type,
          "skuId" : item.sku_id,
          "uid" : that.$store.state.user.userid
        }).then(res => {
          //增加关注
          if(!res.data.code)return;
          if(res.data.code == 1){
            item.isCollection = 0;
            // that.homelistjk(); //刷新列表
            that.$forceUpdate();
            that.$toast.clear();
          }else{
              throw "取消关注失败";
          }
        })
      }else if(item.isCollection == 0){
        //未关注 增加关注
        that.shoucang_type = 1;
        that.api.personalcenter.shopsshoucang({
          "type" : that.shoucang_type,
          "skuId" : item.sku_id,
          "uid" : that.$store.state.user.userid
        }).then(res => {
          //增加关注
          if(!res.data.code)return;
          if(res.data.code == 1){
            item.isCollection = 1;
            // that.homelistjk(); //刷新列表
            that.$forceUpdate();
            that.$toast.clear();
          }else{
              throw "关注失败";
          }
          
        })
      }
    },
    //点赞
    clickPraisePoint(currentIndex){
      let that = this;
      //调用点赞组件点赞方法
      that.$refs.piontPraise.map((each_item,index) => {
        if(that.$refs.piontPraise[index].index == currentIndex){
          that.$refs.piontPraise[index].likeClick();
        }
      })
      
    }
  },
  mounted() {
    if(sessionStorage.getItem("livingsearchdata")!=null){
      this.searchold=sessionStorage.getItem("livingsearchdata").split(",");
    }
    let serchname = sessionStorage.getItem("searchname");
    let twoids = sessionStorage.getItem("twoid");
    if(serchname!=""){
      this.homesearchmassage.keyword=serchname;
    }
    if(twoids!=undefined){
      this.twoCategoryId=twoids;
    }else{
      this.twoCategoryId="";
    }
    //默认让锁定"全部"types=1
    this.types=1;
    this.homelistjk();
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
@import "./index.less";
@import "../../shop/index/css/index.less";
</style>
<style lang='less'>
.search .van-tabs__nav{
  display:flex;
}
.search .van-tab--active{
  font-weight: bold;
  color:#1F1F1F;
  font-size:0.32rem;
}

.search .van-list__finished-text,
.search .van-list__loading{
  width : 100%;
}

</style>