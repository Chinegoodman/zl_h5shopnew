<template>
  <div class="mydiscount_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>我的优惠券</span>
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
              <span>你还未领取优惠券，去优惠中心看看~</span>
              <br />
            </p>
            <span  class="look_btn" style="cursor:pointer;" @click.stop="gotoshop">看一看</span>
          </div>
          <van-list class="video-content" v-model="listloading" :finished="listfinished" :finished-text="finished_text" :error.sync="vanerror" error-text="请求失败，点击重新加载"
            :offset="10"
            @load="getListInfo"
          >
            <div class="browse_list clearfix">
                <div class="lis_box" v-if="mydiscountlist_man.length>0">
                  <div class="t_w">满减卷</div>
                  <ul>
                      <li :class="{'zeng': item.type==1,'daijin': item.type==2, 'yonged' : item.status==2 || item.status==3}" v-for="(item,index) in mydiscountlist_man" :key="index">
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
                            <span class="rule" @click="rule_show(item,index,'man')">使用规则</span>
                            <span class="btn" v-if="item.status==0">待领取</span>
                            <span class="btn" v-if="item.status==1" @click="use_juan(item)">立即使用</span>
                            <span class="btn_used" v-if="item.status==2"></span>
                            <span class="btn_date" v-if="item.status==3"></span>
                          </div>
                          <div class="tips" v-if="item.is_tips">
                            <p>{{item.instruction}}</p>
                          </div>
                        </div>  
                      </li>
                    </ul>
                </div>
                <div class="lis_box" v-if="mydiscountlist_zeng.length>0">
                  <div class="t_w">满赠卷</div>
                  <ul>   
                    <li :class="{'zeng': item.type==1,'daijin': item.type==2, 'yonged' : item.status==2 || item.status==3}" v-for="(item,index) in mydiscountlist_zeng"  :key="index">
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
                          <span class="rule" @click="rule_show(item,index,'zeng')">使用规则</span>
                          <span class="btn" v-if="item.status==0">待领取</span>
                          <span class="btn" v-if="item.status==1" @click="use_juan(item)">立即使用</span>
                          <span class="btn" v-if="item.status==2">已使用</span>
                          <span class="btn" v-if="item.status==3">已过期</span>
                        </div>
                        <div class="tips" v-if="item.is_tips">
                          <p>{{item.instruction}}</p>
                        </div>
                      </div>  
                    </li>
                  </ul> 
                </div> 
                <div class="lis_box" v-if="mydiscountlist_daijin.length>0"> 
                  <div class="t_w">代金卷</div> 
                  <ul>  
                    <li :class="{'zeng': item.type==1,'daijin': item.type==2, 'yonged' : item.status==2 || item.status==3}" v-for="(item,index) in mydiscountlist_daijin">
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
                          <span class="rule" @click="rule_show(item,index,'daijin')">使用规则</span>
                         <span class="btn" v-if="item.status==0">待领取</span>
                          <span class="btn" v-if="item.status==1" @click="use_juan(item)">立即使用</span>
                          <span class="btn" v-if="item.status==2">已使用</span>
                          <span class="btn" v-if="item.status==3">已过期</span>
                        </div>
                        <div class="tips" v-if="item.is_tips">
                          <p>{{item.instruction}}</p>
                        </div>
                      </div>  
                    </li>
                 </ul> 
                </div>      
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
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
export default {
    components :{
      vanTab : Tab,
      vanTabs : Tabs,
      vanList : List 
    },
    data(){
        return{
          isActive : '',
          ifshow : true,
          listfinished :false,
          listloading : false,  //默认是加载中
          vanerror: false,
          finished_text : '',
          nextPage: "",
          pagechecktype: 0, //0表示初始化或下拉加载的  1表示点击事件触发的
          tab_lists : [
            {
               name : '已领取',
               tabid : 1
            },
            {
               name : '已使用',
               tabid : 2
            },
             {
               name : '已过期',
               tabid : 3
            }
          ],
          mydiscountlist_man : [], //满减,
          mydiscountlist_zeng : [], //满减,
          mydiscountlist_daijin : [], //满减,
          discount_type : 1,
          discount_class_type : '', //用于li不一样的背景 

        }
    },
    mounted(){
      var that = this;
      let tabid = Number(this.$route.query.tabid);
      that.discount_type = tabid;
      that.isActive = tabid - 1;
      that.getListInfo();
    },
    methods:{
      // 进入商城首页
        gotoshop() {
          this.$router.push({ name: "shopindex" });
        },
        goback() {
          let that = this;
           that.$router.push({
            path : "/personalcenter/discount/index"
           });  
        },
        use_juan(item){
          var that = this;
          console.log(item);
          ////立即使用 /// 0 通用 1 店铺  2 商品
          // switch(item.status){
          switch(2){  
            case 0 : {
              that.$router.push({ name: "shopindex" });
              break
            }
            case 1 :{
              that.$router.push({
                path : "/personalcenter/discount/discountshop",
                query : {
                  gCouponId : item.couponGroupId,
                  headtitle : item.name
                }
              });
              break;
            }
            case 2 :{
              that.$router.push({
                path : "/personalcenter/discount/discountcommodity",
                query : {
                  gCouponId : item.couponGroupId,
                  headtitle : item.name
                }
              });
              break;
            }
          }
        },
        rule_show(item,index,type){
          var that = this;
          if(type == "man"){
            item.is_tips = !item.is_tips;
            that.mydiscountlist_man.splice(index,1,item);
          }else if(type == "zeng"){
            item.is_tips = !item.is_tips;
            that.mydiscountlist_zeng.splice(index,1,item);
          }else if(type == "daijin"){
            item.is_tips = !item.is_tips;
            that.mydiscountlist_daijin.splice(index,1,item);
          }
         
        },
        changeTab(index){
          let that = this;
           that.$router.push({
           path : "/personalcenter/discount/mydiscount",
            query : {
              tabid :  index
            }
           });  
          that.mydiscountlist_man = []; //满减,
          that.mydiscountlist_zeng = [];//满减,
          that.mydiscountlist_daijin = [];//满减,
          that.discount_type = index;
          that.getListInfo();
        },
        getListInfo(){
          var that = this;
          if(that.pagechecktype == 1){
            that.$toast.loading({
              message: "加载中...",
              duration: 200000
            });
            console.log('123132132');
            that.api.personalcenter.getMyDiscountList({
              "uid" : that.$store.state.user.userid,
              "type" : that.discount_type
            }).then(res => {
                that.pagechecktype = 0;
                if(!res.data.code || !res.data.data)return;
                if(res.data.code === 1){
                  that.$toast.clear();
                  if(res.data.data.userCounpon && res.data.data.userCounpon.length > 0){
                    that.discount_class_type = res.data.data.type;
                    if(res.data.data[0] && res.data.data[0].userCounpon){
                      that.mydiscountlist_man = res.data.data[0].userCounpon;
                      that.mydiscountlist_man.forEach( (item) => {
                        item.is_tips= false;
                        item.is_geted= false;
                      }) 
                    }
                    if(res.data.data[1] && res.data.data[1].userCounpon){
                      that.mydiscountlist_zeng = res.data.data[1].userCounpon;
                      that.mydiscountlist_zeng.forEach( (item) => {
                        item.is_tips= false;
                        item.is_geted= false;
                      }) 
                    }
                    if( res.data.data[2] && res.data.data[2].userCounpon){
                      that.mydiscountlist_daijin = res.data.data[2].userCounpon;
                      that.mydiscountlist_daijin.forEach( (item) => {
                        item.is_tips= false;
                        item.is_geted= false;
                      }) 
                    }
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
                  } else{
                    that.mydiscountlist = [];
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
              that.api.personalcenter.getMyDiscountList({
                "uid" : that.$store.state.user.userid,
                "type" : that.discount_type
              }).then(res => {
                if(!res.data.code || !res.data.data)return;
                if(res.data.code === 1){
                  if(res.data.data && res.data.data.length > 0){
                    console.log(res.data.data);
                    // that.discount_class_type = res.data.data.type;
                    if(res.data.data[0] && res.data.data[0].userCounpon){
                      that.mydiscountlist_man = res.data.data[0].userCounpon;
                      that.mydiscountlist_man.forEach( (item) => {
                        item.is_tips= false;
                        item.is_geted= false;
                      }) 
                    }
                    if(res.data.data[1] && res.data.data[1].userCounpon){
                      that.mydiscountlist_zeng = res.data.data[1].userCounpon;
                      that.mydiscountlist_zeng.forEach( (item) => {
                        item.is_tips= false;
                        item.is_geted= false;
                      }) 
                    }
                    if( res.data.data[2] && res.data.data[2].userCounpon){
                      that.mydiscountlist_daijin = res.data.data[2].userCounpon;
                      that.mydiscountlist_daijin.forEach( (item) => {
                        item.is_tips= false;
                        item.is_geted= false;
                      }) 
                    }
                    
                    // that.nextPage = res.data.data.nextPage;
                    that.ifshow = false;
                    // if(that.nextPage != ""){
                    //   that.listfinished = false;
                    //   that.listloading = false;
                    // }
                    that.listfinished = true;
                    that.listloading = false;
                    that.$forceUpdate();
                    that.$toast.clear();
                  }else{
                    that.mydiscountlist = [];
                    that.ifshow = true;
                    that.$toast.clear();
                  }
                }else{
                  throw "请求错误";
                }
              })
          }
        },
    }
}
</script>

<style lang="less" scoped>
  @import "../index/css/index.less";

</style>




