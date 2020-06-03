<template>
  <div class="mybrowse_wrap">
    <div class="search_hd">
      <img class="back" @click="goback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <div class="search_w">
        <div class="ic"></div>
        <input type="text" v-model="search_keys" @blur="serrch_result" placeholder="输入宝贝名称或关键词">
      </div>
      <div class="msg"><span class="n">22</span></div>
    </div>
    <div class="mybrowse_con">
      <van-tabs v-model="isActive" >
        <van-tab :title="item.name"  :key="index" v-for="(item,index) in tab_list_arr" >
          <div class="tab-title" slot="title"  @click="changeTab(item.tab_id)" >{{item.name}}</div>
          <van-list class="video-content" v-model="listloading" :finished="listfinished" :finished-text="finished_text" :error.sync="vanerror" error-text="请求失败，点击重新加载"
            :offset="10"
            @load="getListInfo"
          >
            <!-- 收藏或浏览有内容 -->
            <div class="browse_list clearfix">
                 <ul v-if="mybrowselist.length>0">
                    <li v-for="(item,index) in mybrowselist" :key="index" @click="gotodetails(item)" >
                      <span class="m">
                        <img :src="item.goods_image" alt="聚美金品" class="vip-pic"/>
                      </span>
                      <span class="t">{{item.goods_title}}</span>
                      <span class="price"><span>￥</span>{{item.price}}</span>
                      <span class="tx">{{item.brand_name}}</span>
                      <span :class="[item.isCollection?'shoucanged':'shoucang']"  @click="mycollect(index)"></span>
                    </li>
                 </ul>    
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
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
    // Search
    // ====项目中可能用到的===
    Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import {
  setsessionStorage
} from "./../../../utils/index.js";
import nodata from './../../../components/nodata.vue'
export default {
    components :{
      nodata,
      vanTab : Tab,
      vanTabs : Tabs,
      vanList : List,
      vanToast : Toast 
    },
    data(){
        return{
          isActive : 0, //选中的tab下标
          tab_list_arr:[
            {
              name : '我的收藏',
              tab_id : 2
            },
            {
              name : '我的浏览',
              tab_id : 3
            }
          ],
          mybrowselist:[],//后台获取收藏 浏览列表
          listloading: true, //默认是加载中。。。
          listfinished: false,
          vanerror: false,
          nodatashow : false, 
          pagetypedata:"mybrowse",
          finished_text : '',
          nextPage: "",
          hasmorepage : 1, //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
          pagechecktype: 0, //0表示初始化或下拉加载的  1表示点击事件触发的
          search_keys: '',
          post_type : '',
          shoucang_type :''
        }
    },
    watch:{
      
    },
    mounted(){
      let that = this;
      document.querySelector('body').setAttribute('style', 'background:rgba(247,247,247,1)')
      let current_id = that.$route.query.tab_id;
      that.isActive = Number(current_id) - 2;
      that.changeTab(Number(current_id));
      that.post_type = current_id - 1;
      that.getListInfo();
    },
    methods:{
        // 进入商城首页
        gotoshop() {
          this.$router.push({ name: "shopindex" });
        },
        goback() {
            this.$router.push({
              path : '/personalcenter/index'
            });
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
            this.$router.push({
              path: "/living/livingdetails",
              // query: {
              //   livingurl: paramsdata.streamAddr
              // }
            });
          }
        },
        //搜索
        serrch_result(){
          var that = this;
          that.nextPage = '';
          that.getListInfo();
        },
        //tab切换
        changeTab(index){
          let that = this;
          that.post_type = index - 1;
          that.$router.push({
            path : "/mybrowse",
            query : {
              tab_id :  index
            }
          });
          that.hasmorepage = 1;
          that.nodatashow = false;
          that.finished_text = '';
          that.mybrowselist = [];
          that.getListInfo();
        },
        getListInfo(){
          var that = this;
          that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.getBrowseList({
            "type" : that.post_type,
            "nextpage" :that.nextPage,
            "uid" : that.$store.state.user.userid,
            "keyword" : that.search_keys
          }).then(res => {
            that.$toast.clear();
            that.listloading = false;
            if(res.data.code === 1){
              if(res.data.data.list && res.data.data.list.length > 0){
                that.nodatashow = false;
                that.hasmorepage = 2;
                that.mybrowselist = that.mybrowselist.concat(res.data.data.list);
              }
              that.nextPage = res.data.data.nextpage;
              if(that.nextPage != ""){
                that.listfinished = false;
                that.listloading = false;
              }
              if(that.hasmorepage === 1){
                that.nodatashow = true;
                return;
              }else{
                that.listfinished = true;
                that.listloading = false;
                that.finished_text = '亲~已经到底了';
              }
              that.$forceUpdate();
              that.$toast.clear();
            }else{
              that.$toast(res.data.info);
            }
          })
        },
        mycollect(index){
          let that = this;
          console.log(index);
          if(that.mybrowselist[index].isCollection == 1){
            that.shoucang_type = 2;
            //关注过 取消关注
            that.api.personalcenter.shopsshoucang({
              "type" : that.shoucang_type,
              "skuId" : that.mybrowselist[index].sku_id,
              "uid" : that.$store.state.user.userid
            }).then(res => {
              //增加关注
              if(!res.data.code)return;
              if(res.data.code == 1){
                that.mybrowselist[index].isCollection = 0;
                that.getListInfo();
                that.$forceUpdate();
                that.$toast.clear();
              }else{
                 throw "取消关注失败";
              }
            })
          }else if(that.mybrowselist[index].isCollection == 0){
            //未关注 增加关注
            that.shoucang_type = 1;
            that.api.personalcenter.shopsshoucang({
              "type" : that.shoucang_type,
              "skuId" : that.mybrowselist[index].sku_id,
              "uid" : that.$store.state.user.userid
            }).then(res => {
              //增加关注
              if(!res.data.code)return;
              if(res.data.code == 1){
                that.mybrowselist[index].isCollection = 1;
                that.getListInfo();
                that.$forceUpdate();
                that.$toast.clear();
              }else{
                 throw "关注失败";
              }
              
            })
          }
        }
    }
}
</script>

<style lang="less" scoped>
  @import "./css/mybrowse.less";
</style>
<style lang="less">
    .mybrowse_con .van-hairline--top-bottom::after, 
    .mybrowse_con .mybrowse_con .van-hairline-unset--top-bottom::after{
        border-width:0 !important;
    }
    .van-list__error-text, .van-list__finished-text, .van-list__loading{
      background:rgba(247,247,247,1);
    }

    .mybrowse_con .van-tab{
      font-size : .32rem;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(117,117,117,1);
    }
    .mybrowse_con .van-tab--active{
      font-weight:bold;
      color:rgba(31,31,31,1);
    }
    .mybrowse_con .van-tabs__line{
      width: .6rem !important;
      background:rgba(255,189,4,1);
    }
</style>





