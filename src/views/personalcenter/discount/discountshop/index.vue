<template>
  <div class="wrap-shoplist">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>{{headtitle}}</span>
    </div>
    <div class="shoplist">
          <van-list class="video-content" v-model="listloading" :finished="listfinished" :finished-text="finishedText" :error.sync="vanerror" error-text="请求失败，点击重新加载"
            :offset="10"
            @load="getShopList"
          >
            <!-- 收藏或浏览有内容 -->
            <div class="browse_list clearfix">
                 <ul v-if="shoplist.length>0" ref="browse_ul">
                    <li v-for="(item,index) in shoplist" :key="index">
                      <div class="hd">
                        <span class="lt">
                          <img :src="item.face_url" alt="">
                        </span>
                        <div class="cn">
                          <h3>{{item.name}}</h3>
                          <span class="zb" v-if="item.isLiveSale">
                            <img src="../../../../assets/imgs/shop/zhibo.png" alt="">
                          </span>
                        </div>
                        <span class="gd" @click="gotoshopowner(item)" >进店逛逛</span>
                      </div>
                      <div class="list">
                          <ol>
                            <li v-for="(childitem,index) in item.goodsList" :key="index" :id="childitem.id">
                              <img :src="childitem.goods_image" alt="">
                              <span class="zb" v-if="item.isLiveSale">
                                <img src="../../../../assets/imgs/shop/zhibo.png" alt="">
                              </span>
                              <span class="price">￥{{childitem.price}}</span>
                            </li>
                          </ol>
                      </div>
                    </li>
                 </ul>    
            </div>
          </van-list>
    </div>
    <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
  </div>
</template>
<script>
import nodata from './../../../../components/nodata.vue'
export default {
    data(){
        return{
          headtitle : '',
          isActive : '',
          ifshow : false,
          listfinished :false,
          listloading : false,  //默认是加载中
          finishedText : '',
          vanerror: false,
          nextPage: "",
          shoplist : [],
          nodatashow : false,
          pagetypedata:"discountshop", //无列表时显示
        }
    },
    components : {
      nodata
    },
    mounted(){
      var that = this;
      that.headtitle = this.$route.query.headtitle;
    },
    methods:{
      // 进入商城首页
        gotoshopowner(item) {
          // /shop/shopowner?shop_userId=9109&shop_id=101808
          this.$router.push({ name: "shopindex" });
          let that = this;
            that.$router.push({
            path : "/shop/shopowner",
            query : {
              shop_userId :  item.user_id,
              shop_id : item.id
            }
          });
        },
        goback() {
          // this.$router.push({ path: "/personalcenter/index" });
          this.$router.go(-1);
        },
        getShopList(){
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
                  that.shoplist.push(e);
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





