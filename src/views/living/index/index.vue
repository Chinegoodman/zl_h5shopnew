<!-- 组件说明 -->
<template>
  <div class="livingindex">
    <div class="header">
      <img src="@/assets/imgs/icons/logo.png" alt="抓周" class="lefticon" />
      <div @click="gotosearch" class="searchbtn">
        <img src="@/assets/imgs/video/fangdj@2x.png" alt="抓周" />
        <p class="_txtov1">大家都在搜“大美新疆”</p>
      </div>
      <div class="rightbtn">
        <img src="@/assets/imgs/icons/xiaoxqp.png" alt="抓周 无消息" />
      </div>
    </div>

    <!-- <div style="width:100%;height:0.2rem;background:#fff;"></div> -->

    <!-- 直播视频列表 -->
    <ul>
      <li class="banner" v-if="livinglistdata.length > 0"  v-for="(item,index) in livinglistdata" :key="index" @click.stop="gotodetails(item)" :style="{background:'url(' +item.cover+ ') rgba(204,204,204,0.65)'}">
        <div class="banner_header clearfix">
          <img @click.stop="checkanchor(item.id)" class="face" :src="item.face_url" />
          <img v-if="item.is_attention==1 || item.is_attention==2" src="./../../../assets/imgs/video/guanzhuxihuan@2x.png" alt="抓周" class="follow" @click.stop="follow(true,item.uid,index)">
          <img v-if="item.is_attention==3 || item.is_attention== null" src="./../../../assets/imgs/video/weiguanzhuxiaoshipin@2x.png" alt="抓周" class="followed" @click.stop="follow(false,item.uid,index)">
          <div class="banner_header_left">
            <span @click.stop="checkanchor(item.id)" class="_txtov1">{{item.nickname}}</span>
            <img
              src="../../../assets/imgs/living/sygk.png"
            /> {{item.realcount}}
          </div>
          <!-- <div class="livingstatusbox" v-if="item.state==0"> -->
        </div>
        <div class="livingstatusbox" v-if="true">
          <img
            src="../../../assets/imgs/living/zbz.png"
            alt="抓周直播"
          />
        </div>
        <div class="banner_footer">
          <p class="_txtov2" @click.stop="stopfn">
            {{item.name}}
          </p>
          <div class="lunnanner" v-if="item.goodsList">
            <van-icon name="arrow-left" class="icon_left"  v-if="item.goodsList.length>2"/>
            <div class="imgbox">
              <img v-for="(iteminner,indexinner) in item.goodsList" :key="indexinner" class="lb" :class="{marginleftnone:indexinner==0}" :src="iteminner.goods_image" @click.stop="gotogoods(iteminner.sku_id,item.id)" />
            </div>
            <van-icon name="arrow" class="icon_right"  v-if="item.goodsList.length>2"/>
          </div>
          <div class="heartshow">
            <img @click.stop="heartclick(index)" src="./../../../assets/imgs/living/details/xiaoxinxin3.png" alt="抓周">
            <div class="gifbox" v-if="gifstatus[index]==true">
              <img src="./../../../assets/imgs/living/details/xingif.gif" alt="抓周">
              <!-- 0.8s -->
            </div>
          </div>
          
        </div>
      </li>
      <li v-if="livinglistnonestatus" style="background:#ccc; color:#fff;font-size:0.28rem;line-height:3.64rem;text-align:center;">
        暂无主播在直播
      </li>
    </ul>
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
    // Tab,
    // Tabs,
    // List,
    // Lazyload,
    // ====项目中可能用到的===
    Icon
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import {
  setsessionStorage,
  getsessionStorage
} from "./../../../utils/index.js";
export default {
  components: {
    vanIcon : Icon
  },
  data() {
    return {
      searchvalue: "",
      active: 0,
      livinglistdata: [], //直播列表
      livinglistnonestatus:false,//是否显示无直播的状态

      giftimer:'',
      gifstatus:[],
    };
  },
  computed: {
  },
  mounted() {
    this.getNewRoomList();
  },
  methods: {
    // 阻止冒泡
    stopfn() {
      return false;
    },
    // 跳转到搜索页
    gotosearch() {
      this.$router.push({ name: "livingsearch" });
    },
    // 跳转到直播详情页
    gotodetails(paramsdata) {
      let that = this;
      if(!that.iflogin()){return;}
      setsessionStorage("livinglidata", paramsdata);
      this.$router.push({
        path: "/living/livingdetails",
        // query: {
        //   livingurl: paramsdata.streamAddr
        // }
      });
    },
    gotogoods(skuid, liveId) {
      this.$router.push({
        path: `/shop/productdetails/${skuid}/1?liveId=${liveId}`
      });
    },
    // 获取最新直播间列表
    getNewRoomList() {
      let that = this;
      // console.log(1111);
      this.api.living
        .getNewRoomList2({
          // recommend:'',//是否推荐 1是 空为否
          state: 0, //0-直播中 1-结束
          nextpage: "", //分页id
          pageSize: "", //每页数据
          keyWord: "", //搜索词
          myId: "", //主播id
          watchId: that.$store.state.user.userid, //用户id
        })
        .then(res => {
          // console.log(res);
          if (res.data.code == 1) {
            if(!res.data.data)return;
            that.livinglistdata = res.data.data.list;
            if(that.livinglistdata.length==0){
              that.livinglistnonestatus=true;
            }
            that.gifstatusfn();// 点赞数据初始化设置
          }else{
            console.log('请求失败');
          }
        });
    },
    // 点赞事件
    heartclick(currentindex){
      let that = this;
      if(!that.iflogin()){return;}
      // console.log(currentindex);
      // window.clearTimeout(that.giftimer);
      if(that.gifstatus[currentindex] == true) return;
      // that.$forceUpdate();
      // debugger;
      that.gifstatus[currentindex] = true;  //gifstatus:[] 点赞数据 
      that.$forceUpdate();
      that.giftimer=window.setTimeout(() => {
        that.gifstatus[currentindex] =false;
        that.$forceUpdate();
      }, 800);
    },

    // 点赞数据初始化设置
    gifstatusfn() {
      let gifstatusnew = [];
      for (let i = 0; i < this.livinglistdata.length; i++) {
        gifstatusnew.push(false);
      }
      this.gifstatus = gifstatusnew;
    },
    // 关注 与 取消关注
    follow(currentstatus,attid,index){
      let that = this;
      if(!that.iflogin()){return;}
      if(!currentstatus){
        // 当前 为 非关住状态
        that.api.living.attentionadd({
          uid: that.$store.state.user.userid,
          attid:attid,
        }).then(res=>{
          // console.log(res.data);
          if(res.data.code==1){
            that.$toast('关注成功！');
            that.livinglistdata[index].is_attention=1;
          }
        })
      }else{
        // 当前 为 关住状态
        that.api.living.attentiondelete({
          uid: that.$store.state.user.userid,
          attid:attid,
        }).then(res=>{
          // console.log(res.data);
          if(res.data.code==1){
            that.$toast('取消关注成功！');
            that.livinglistdata[index].is_attention=3;
          }
        })
      }
    },
    // 是否登录
    iflogin(){
        let that = this;
        // if(that.$route.params.webtype==0){
        //     // app
        //     if(!that.userID || that.userID == 0){
        //         that.$toast({
        //             message: '暂未登录，请先登录',
        //             duration: 810,
        //             forbidClick: true
        //         });
        //         setTimeout(() => {
        //             that.gotologin();
        //         }, 810);
        //         return false;
        //     }else{
        //         return true
        //     }
        // }else{
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
        // }
        
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
</style>
<style lang="css">
.livingindex .van-tabs__wrap--scrollable .van-tab {
  color: black;
  flex-basis: 17% !important;
}
.livingindex .van-tab--active {
  font-weight: 600;
  font-size: 0.38rem;
}
</style>