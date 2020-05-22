<template>
  <div class="wrap-commoditylist">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>{{headtitle}}</span>
    </div>
    <!-- 新品列表数据展示 --> 
     <div class="commoditylist">
        <div class="xinpin-sort-filter">
          <!-- big_list 为切换到大图的class -->
          <div :class="{'list' : true,'xp_big_list' : change_big_small_flag===0}" v-if="commoditylist.length > 0">  
            <van-list
              class="goodslist_xp"
              v-model="listloading"
              :finished="listfinished"
              :finished-text="finished_text"
              :error.sync="vanerror"
              error-text="请求失败，点击重新加载"
              :offset="10"
              @load="getCommodityList"
            >

              <div class="goodsli_xp" @click="gotogoodsdetails(item)"
                v-for="(item,index) in commoditylist"
                :key="index"
              >
                <div class="im">
                  <img :src="item.goods_image" alt="珠宝商品" />
                </div>
                <span class="tit">{{item.goods_title}}</span>
                <div class="price">{{item.price}}</div>
                <div class="price_btm">{{item.brand_name}}</div>
                <div class="canged" v-if="item.isCollection==1"></div>
                <div class="cang" v-if="item.isCollection==0"></div>
              </div>  
            </van-list>
            <div class="changebigsize" v-if="change_big_small_flag===1" @click="changeimgsize()"></div>
            <div class="changesmallsize" v-if="change_big_small_flag===0" @click="changeimgsize()"></div>
        </div>
        <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
    </div>  
    </div>
  </div> 
</template>
<script>
import nodata from './../../../../components/nodata.vue'
export default {
    data(){
        return{
          headtitle : '',
          isActive : '',
          nodatashow : false,
          listfinished :false,
          listloading : false,  //默认是加载中
          vanerror: false,
          finished_text : '',
          nextPage: "",
          pagetypedata:"discountshop", //无列表时显示
          commoditylist : [
            // {
            //   goods_image : 'http://playback.17biyi.com/520b2edeb1213d94074b3672ae4c6ff5',
            //   goods_title : '18K玫瑰金钻石时尚长款耳钉',
            //   price : '2250',
            //   brand_name : '十三',
            //   isCollection : 1
            // },
            // {
            //   goods_image : 'http://playback.17biyi.com/520b2edeb1213d94074b3672ae4c6ff5',
            //   goods_title : '18K玫瑰金钻石时尚长款耳钉',
            //   price : '2250',
            //   brand_name : '十三',
            //   isCollection : 0
            // }
          ],
          change_big_small_flag : 1
        }
    },
    components:{
      nodata
    },
    mounted(){
      var that = this;
      that.headtitle = this.$route.query.headtitle;
      // let tabid = Number(this.$route.query.tabid);
      //上面list组件上的属性 暂时放这
    },
    methods:{
      // 进入商城首页
        goback() {
          this.$router.push({ path: "/personalcenter/index" });
        },
        //列表切换大小图
        changeimgsize(){
          var that = this;
            if(that.change_big_small_flag=== 1){
              that.change_big_small_flag = 0;
            }else{
              that.change_big_small_flag = 1;
            }
        },
        gotogoodsdetails(goodsid){
          var that = this;
          that.$router.push({
            name: "productdetails",
            params: {
              product_id: goodsid.sku_id,
              webtype: 1
            }
          });
        },
        //首页新品列表
        getCommodityList(){
          var that = this;
          let gCouponId = this.$route.query.gCouponId;
            that.$toast.loading({
              message: "加载中...",
              duration: 200000
            });
            that.api.personalcenter.getDiscountShopList({
              "uid" : that.$store.state.user.userid,
              "gCouponId" : gCouponId,
              "nextPage" : that.nextPage
            }).then(res => {
              console.log('res');
              console.log(res);
              that.listloading = false;
              if(!res.data.data.list || res.data.data.list.length === 0){
                console.log(444);
                that.$toast.clear();
                that.nodatashow = true;
                that.listfinished = true;
                that.finishedText = '';
                return
              }
              console.log(5555);
              if (res.data.data.orders.length > 0) {
                // debugger;
                that.nodatashow = false;
                res.data.data.list.forEach(e => {
                  that.commoditylist.push(e);
                });
              } else {
                that.nodatashow = true;
              }
              that.nextPage = res.data.data.nextPage;
              // debugger;
              if (that.nextPage != "") {
                that.listfinished = false;
                that.listloading = false;
                
              } else {
                that.listfinished = true;
                that.listloading = false;
                that.finishedText = '我是有底线的';
              }
              that.$forceUpdate();
              that.$toast.clear();
            })
        }
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:rgba(247,247,247,1)');
    }
}
</script>

<style lang="less" scoped>
  @import "./css/index.less";
</style>
<style lang="less">
  .mydiscount_wrap .van-tab{
    font-size : .32rem;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(117,117,117,1);
  }
  .mydiscount_wrap .van-tab--active{
    font-weight:bold;
    color:rgba(31,31,31,1);
  }
  .mydiscount_wrap .van-tabs__line{
    width: .6rem !important;
    background:rgba(255,189,4,1);
  }
</style>





