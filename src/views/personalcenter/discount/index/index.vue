<template>
  <div class="mydiscount_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>优惠中心</span>
      <div class="mydiscount-path"  @click="mydiscountguild">我的优惠券</div>
    </div>
    <div class="discount_list">
      <van-tabs v-model="isActive" >
        <van-tab :title="item.name"  :key="index" v-for="(item,index) in tab_lists" >
          <div class="tab-title" slot="title"  @click="changeTab(item.tabid)" >{{item.name}}</div>
          <div class="discount_body_null" v-if="ifshow"> 
            <div class="im">
              <img src="../../../../assets/imgs/personal/discount-null.png" alt />
            </div>
             <p class="null_tip">
              <span>暂无优惠券</span>
              <br />
            </p>
            <span  class="look_btn" style="cursor:pointer;" @click.stop="gotoshop">看一看</span>
          </div>
          <van-list class="video-content" v-model="listloading" :finished="listfinished" :finished-text="finished_text" :error.sync="vanerror" error-text="请求失败，点击重新加载"
            :offset="10"
            @load="getListInfo"
          >
            <!-- 收藏或浏览有内容 -->
            <div class="browse_list clearfix">
                 <ul v-if="discountlist.length>0" ref="browse_ul">
                    <!-- <li v-for="(item,index) in discountlist" :key="index" >
                      <span class="m">
                        <img :src="item.goods_image" alt="聚美金品" class="vip-pic"/>
                      </span>
                      <span class="t">{{item.goods_title}}</span>
                      <span class="price">{{item.price}}</span>
                      <span class="tx">{{item.brand_name}}</span>
                      <span :class="[item.isCollection?'shoucanged':'shoucang']"  @click="mycollect(index)"></span>
                    </li> -->
                    <li :class="{'zeng': discount_class_type==1,'daijin': discount_class_type==2}" v-for="(item,index) in discountlist" :key="index">
                      <div class="box">
                        <div class="lt">
                        <span class="bt">￥<span>{{item.price}}</span></span>
                          <p class="man">{{item.name}}</p>
                        </div>
                        <div class="rt">
                          <span class="tit">{{item.userTypeText}}</span>
                          <!-- //1全场通用，2指定商品，3指定分类 -->
                          <span class="fanwei" v-if="item.useType==1">全场通用</span>
                          <span class="fanwei" v-if="item.useType==2">指定商品</span>
                          <span class="fanwei" v-if="item.useType==3">指定分类</span>
                          <span class="fanwei" v-if="item.useType==4">指定店铺</span>
                          <div class="date">{{item.timeLimit}}</div>
                          <span class="rule" @click="rule_show(item,index)">使用规则</span>
                          <span class="btn" v-if="item.status==0" @click="get_juan(item,index)">立即领取</span>
                          <span class="btn" v-if="item.status==1" @click="use_juan(index)">立即使用</span>
                          <!-- <span class="btn" v-if="discount_btn==2" @click="use_juan(index)">立即使用</span> -->
                          <span class="geted"  v-if="item.status==1"></span>
                          <span class="geted"  v-if="item.status==2"></span>
                          <span class="geted"  v-if="item.status==3"></span>
                          <span class="geted" v-else-if="item.is_geted" ></span>
                        </div>
                        <div class="tips" v-if="item.is_tips">
                          <p>{{item.instruction}}</p>
                        </div>
                      </div>  
                    </li>
                 </ul>    
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
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
    // Search
    // ====项目中可能用到的===
    Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
export default {
    components :{
      vanTab : Tab,
      vanTabs : Tabs,
      vanList : List,
      vanToast : Toast 
    },
    data(){
        return{
          isActive : '',
          ifshow : false,
          listfinished :false,
          listloading : false,  //默认是加载中
          vanerror: false,
          finished_text : '',
          nextPage: "",
          pagechecktype: 0, //0表示初始化或下拉加载的  1表示点击事件触发的
          tab_lists : [
            {
               name : '满减券',
               tabid : 1
            },
            {
               name : '满赠券',
               tabid : 2
            },
             {
               name : '代金券',
               tabid : 3
            }
          ],
          discountlist : [], //优惠卷列表,
          discount_type : 0,
          discount_class_type : '', //用于li不一样的背景 
          discount_btn : ''  //判断按钮显示 使用 还是 领取
        }
    },
    mounted(){
      var that = this;
      let tabid = Number(this.$route.query.tabid);
      that.discount_type = tabid - 1;
      if(!that.discount_type){
        that.discount_type = 0;
      }
      that.isActive = tabid - 1;
      that.getListInfo();
    },
    methods:{
      // 进入商城首页
        gotoshop() {
          this.$router.push({ name: "shopindex" });
        },
        goback() {
          this.$router.push({ path: "/personalcenter/index" });
        },
        use_juan(index){
          this.$router.push({ name: "shopindex" });
        },
        get_juan(item,index){
          var that = this;
          that.api.personalcenter.getOneDiscountList({
            "uid" : that.$store.state.user.userid,
            "couponGroupId" : item.couponGroupId
          }).then(res => {
              console.log(res);
              if(!res.data.code)return;
              if(res.data.code == 1){
                item.is_geted = true;
                that.discountlist.splice(index,1,item);
                that.getListInfo();
              }
          });
        },
        rule_show(item,index){
          var that = this;
          item.is_tips = !item.is_tips;
          that.discountlist.splice(index,1,item);
        },
        mydiscountguild(){
            let that = this;
            that.$router.push({
            path : "/personalcenter/discount/mydiscount",
            query : {
              tabid :  1
            }
          });
        },
        changeTab(index){
          let that = this;
          that.$router.push({
            path : "/personalcenter/discount",
            query : {
              tabid :  index
            }
          });
          that.discountlist = [];
          that.finished_text = '';
          that.ifshow = false;
          that.discount_type = index - 1;
          that.isActive = index;
          that.getListInfo();
        },
        getListInfo(){
          var that = this;
          if(that.pagechecktype == 1){
            that.$toast.loading({
              message: "加载中...",
              duration: 200000
            });
            that.api.personalcenter.getDiscountList({
              "uid" : that.$store.state.user.userid,
              "type" : that.discount_type
            }).then(res => {
                that.listloading = false;
                that.pagechecktype = 0;
                if(!res.data.code || !res.data.data)return;
                if(res.data.code === 1){
                  that.$toast.clear();
                  if(res.data.data.userCounpon && res.data.data.userCounpon.length > 0){
                    that.discount_class_type = res.data.data.type;
                    that.discountlist = res.data.data.userCounpon;
                    that.discountlist.forEach( (item) => {
                      item.is_tips= false;
                      item.is_geted= false;
                    }) 
                    // that.nextPage = res.data.data.nextPage;
                    that.ifshow = false;
                    // if(that.nextPage != ""){
                    //   that.listfinished = false;
                    //   that.listloading = false;
                    // }
                    that.listfinished = true;
                    that.finished_text = '';
                    that.$forceUpdate();
                  } else{
                    that.discountlist = [];
                    that.ifshow = true;
                    that.$toast.clear();
                  }
                }else{
                  throw "请求错误";
                }
            })
          }else{
            that.$toast.loading({
              message: "加载中...",
              duration: 200000
            });
            that.api.personalcenter.getDiscountList({
              "uid" : that.$store.state.user.userid,
              "type" : that.discount_type
            }).then(res => {
              if(!res.data.code || !res.data.data)return;
              if(res.data.code === 1){
                that.$toast.clear();
                if(res.data.data.userCounpon && res.data.data.userCounpon.length > 0){
                  that.discount_class_type = res.data.data.type;
                  that.discountlist = res.data.data.userCounpon;
                  that.discountlist.forEach( (item) => {
                    item.is_tips= false;
                    item.is_geted= false;
                  }) 
                  console.log(that.discountlist);
                  // that.nextPage = res.data.data.nextPage;
                  that.ifshow = false;
                  // if(that.nextPage != ""){
                  //   that.listfinished = false;
                  //   that.listloading = false;
                  // }
                  that.listfinished = true;
                  that.listloading = false;
                  that.finished_text = '';
                  that.$forceUpdate();
                }else{
                  that.discountlist = [];
                  that.ifshow = true;
                  that.$toast.clear();
                }
              }else{
                that.$toast('请求错误');
              }
            })
          }
        },
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





