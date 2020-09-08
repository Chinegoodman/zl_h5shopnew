<!-- 组件说明 -->
<template>
  <div class="diamondwrap">
    <div class="header">
      <img class="back" @click="shopback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>{{title}}</span>
    </div>
 <div class="wrap-page">
        <div class="page-content">
            <div id="startdowm">
                <div id="share" class="video-content">
                    <div class="content-top">
                        <div class="clearfix">
                            <div class="dzname clearfix">
                                <div class="dznamepic">
                                    <img src="./../../../assets/imgs/icons/default-head.png" alt="抓周" />
                                </div>
                                <div class="dznamemass">
                                    <div class="nametit _txtov1"></div>
                                    <div class="looknum">
                                        <span class="_txtov1">ID:<span class="anchorid">600213</span></span>
                                    </div>
                                </div>
                                <div class="dznamegz dznamegzed">
                                    关注
                                </div>
                            </div>
                            <div class="righttopclose" @click.stop="shellDanChangClick">
                                <img src="./../../../assets/imgs/living/details/close.png" alt="抓周" />
                            </div>
                            <div class="dznameid" @click.stop="shellDanChangClick">
                                <span class="realCount">968</span>
                            </div>
                            <div class="fens-list">
                                <ul id="bandanlist">
                                    <li>
                                        <span>
                                            <!-- <img src="./img/topimg1.png" alt=""> -->
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <!-- <img src="./img/topimg2.png" alt=""> -->
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <!-- <img src="./img/topimg3.png" alt=""> -->
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="internet">
                        <div class="nts"><span class="ic"><img src="./../../../assets/imgs/living/radiodetails/Notice.png" alt=""></span><span class="t">公告</span></div>
                        <div class="su"><span class="ic"><img src="./../../../assets/imgs/living/radiodetails/su.png" alt=""></span><span class="t">200.4kb/s</span></div>
                        <div class="bd"><span class="ic"><img src="./../../../assets/imgs/living/radiodetails/bandan.png" alt=""></span><span class="t">榜单</span><span class="ic2"><img src="./../../../assets/imgs/living/radiodetails/return.png" alt=""></span></div>
                    </div>
                    <div class="fensList">
                        <ul id="listcontent">
                            <!-- <li>
                                <span class="im">
                                   <img src="./img/radie-pic1.png" alt="">
                               </span>
                                <div class="t">
                                    <span class="ic">1</span>
                                    <span class="nm">猪猪女孩</span>
                                </div>
                            </li>
                            <li>
                                <span class="im">
                                <img src="./img/radie-pic2.png" alt="">
                            </span>
                                <div class="t">
                                    <span class="ic">2</span>
                                    <span class="nm">鱼海棠</span>
                                </div>
                            </li>
                            <li>
                                <span class="im">
                                <img src="./img/radie-pic3.png" alt="">
                            </span>
                                <div class="t">
                                    <span class="ic">3</span>
                                    <span class="nm">Regular</span>
                                </div>
                            </li>
                            <li>
                                <span class="im">
                                <img src="./img/radie-pic4.png" alt="">
                            </span>
                                <div class="t">
                                    <span class="ic">4</span>
                                    <span class="nm">烟花</span>
                                </div>
                            </li>
                            <li>
                                <span class="im">
                                <img src="./img/radie-pic5.png" alt="">
                            </span>
                                <div class="t">
                                    <span class="ic">5</span>
                                    <span class="nm">哥哥很帅</span>
                                </div>
                            </li>
                            <li>
                                <span class="im">
                                <img src="./img/radie-pic6.png" alt="">
                            </span>
                                <div class="t">
                                    <span class="ic">6</span>
                                    <span class="nm">开心的宝</span>
                                </div>
                            </li>
                            <li>
                                <span class="im">
                                <img src="./img/radie-pic7.png" alt="">
                            </span>
                                <div class="t">
                                    <span class="ic">7</span>
                                    <span class="nm">可爱的喵</span>
                                </div>
                            </li>
                            <li>
                                <span class="im">
                                <img src="./img/radie-pic8.png" alt="">
                            </span>
                                <div class="t">
                                    <span class="ic">8</span>
                                    <span class="nm">女神</span>
                                </div>
                            </li> -->
                        </ul>
                    </div>
                    <div class="msgboxwrap">
                        <div class="msgbox clearfix">
                            <p class="name">系统公告：</p>
                            <p class="xitong">直播内容和评论中严禁出现低俗表演、着装暴露、血腥惊悚等画面，严禁炒作炫富、辱骂他人、宣扬迷信、讨论政治话题等行为，如有违反，将给予禁播或封停账号的处罚。直播中严禁诱导未成年人打赏，如发现应及时制止，否则将封禁直播。管理员24小时在线巡查，且实时接收用户举报
                            </p>
                        </div>
                    </div>
                </div>
                <!-- 下载弹层 -->
                <div class="openappbtnsbox" style="display: none;">
                    <div class="box-cover" id="box-cover"></div>
                    <div class="box-content">
                        <div class="pt_box">
                         <span>
                            <img src="./../../../assets/logo.png" alt="抓周">
                        </span>
                            <p>请登录抓周APP操作</p>
                        </div>
                        <div class="btn_box">
                            <a class="openappbtn" href="javascript:void(0)" target="_blank" id="download">下载APP</a>
                            <a class="openappbtn" href="javascript:void(0)" target="_blank" id="startdowm_app">启动APP</a>
                        </div>
                    </div>
                </div>

                <!-- 商品关闭后提示弹层 -->
                <div class="shopsdownstatusbox" style="display: none;">
                    <div class="box-cover"></div>
                    <div class="box-content">
                        <div class="pt_box pt-box-shopdown">
                            <p>该商品已暂停售卖，您可以逛逛其他商品</p>
                        </div>
                        <div class="btn_box btn_box_shopdown">
                            <a class="openappbtn" href="javascript:void(0)" target="_blank" id="golookothershops">去看看</a>
                        </div>
                    </div>
                </div>
                <!-- 微信引导下载 -->
                <div class="browsertc" style="display:none">
                    <div class="browsertcinner clearfix">
                        <div class="browserleft">
                            <img src="./../../../assets/logo.png" alt="抓周">
                        </div>
                        <div class="browserright">
                            <div class="browserrighttit">链接直播打不开?</div>
                            <div class="browserrighttxt">请点击右上角…</div>
                            <div class="browserrighttxt">请选择在”浏览器”中打开</div>
                        </div>
                        <div class="browserzs">
                            <!-- <img src="./img/jtfx.png" alt=""> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-bottom" id="contentBottom">
            <!-- 消息列表 -->
            <!-- <div class="bottomchat" v-show="timgroupstatus" ref="msgboxscroll"> -->
            <!-- 聊天输入部分 -->
            <div class="chattalk clearfix">
                <p class="chatinp" @click="imiptshowstatus=true">说点啥</p>
                <div class="close">
                    <img src="./../../../assets/imgs/living/details/gengduo.png" alt="抓周" />
                </div>
                <div class="chatgd" @click.stop="moreClick">
                    <img src="./../../../assets/imgs/living/radiodetails/xiaoxi.png" alt />
                </div>
                <div class="close">
                    <img src="./../../../assets/imgs/living/radiodetails/muteic.png" alt="抓周" />
                </div>
                <div class="chatgd" @click.stop="moreClick">
                    <img src="./../../../assets/imgs/living/xiudetails/xiuproduct.png" alt />
                </div>
            </div>
        </div>
    </div>
    <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
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
import nodata from './../../../components/nodata.vue'
import {
  setsessionStorage
} from "./../../../utils/index.js";
export default {
  components: {
    nodata,
    vanTab : Tab,
    vanTabs : Tabs,
    vanList : List,
    vanToast : Toast 
  },
  data() {
    return {
      title : '',
      diamondlistmsg : [],
      pagetypedata:"discountshop",
      nodatashow:false,
      listloading: false,
      listfinished: false,
      vanerror: false,
      finished_text : '',
      change_big_small_flag : 1,
      type_id : '', //请求参数
      default_img_small: require('../../../assets/imgs/shop/list-default-small.png'), //默认图片
      default_img_big: require('../../../assets/imgs/shop/list-default-big.png'),
      default_img_head : require('../../../assets/imgs/icons/default-head.png'),
      hasmorepage : 1 //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
    };
  },
  computed: {},
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
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
     // 跳转到直播详情页
    gotolivingdetails(paramsdata) {
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
    //列表切换大小图
    changeimgsize(){
       var that = this;
        if(that.change_big_small_flag === 1){
          that.change_big_small_flag= 0;
        }else{
          that.change_big_small_flag = 1;
        }
    },
    // 获取商品列表
    diamondlist(){
      let that = this;
      that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });  
      that.api.homedetails
      .diamondlistpost({
        "id" : that.type_id
      })
      .then(res => {
        that.$toast.clear();
        that.listloading = false;
        if(res.data.code == 1){
          if (res.data.data.list && res.data.data.list.length > 0) {
            that.nodatashow = false;
            that.hasmorepage = 2;
            res.data.data.list.forEach(e => {
              that.diamondlistmsg.push(e);
            });
          } 

          that.nextPage = res.data.data.nextpage;
          if (that.nextPage != "" && that.nextPage !== undefined) {
            that.listfinished = false;
            that.listloading = false;
          } else {
            if(that.hasmorepage === 1){
                that.nodatashow = true;
              return;
            }else{
              that.listfinished = true;
              that.listloading_ = false;
              that.finished_text = '亲~已经到底了';
            }
            
          }
          that.$forceUpdate();
          that.$toast.clear();
        }
        else{
          that.$toast(res.data.info);
        }
      })
    }
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
    that.title = that.$route.query.title;
    that.type_id = that.$route.query.typeId;
    that.diamondlist();
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
</style>

<style>
.wrap-page {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
  }
        
        .page-content {
            width: 7.5rem;
            position: absolute;
            overflow-y: auto;
            margin: 0 auto;
            left: 50%;
            margin-left: -3.75rem;
            top: 0;
            z-index: 2;
        }
        
        .video-content {
            width: 7.5rem;
            max-width: 7.5rem;
            margin: 0 auto;
            position: relative;
        }
        
        .content-top {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            z-index: 110;
            box-sizing: border-box;
            width: 100%;
            padding: 0.3rem 0.2rem 0;
        }
        
        .content-top .complaints {
            float: left;
            width: 0.86rem;
            height: 0.86rem;
            margin-left: 0.2rem;
            cursor: pointer;
        }
        
        .content-top .complaints img {
            width: 100%;
            height: 100%;
        }
        
        .content-top .fens-list {
            float: right;
            margin-right: .12rem;
        }
        
        .content-top .fens-list ul {
            zoom: 1;
            height: .74rem;
            position: relative;
        }
        
        .content-top .fens-list ul li {
            flex: 1;
            display: inline-block;
            width: .6rem;
            height: .74rem;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            cursor: pointer;
        }
        
        .content-top .fens-list ul li span {
            display: inline-block;
            width: .52rem;
            height: .52rem;
            padding: 0 .04rem;
            margin-top: .18rem;
            border-radius: 50%;
            overflow: hidden;
        }
        
        .content-top .fens-list ul li span img {
            width: 100%;
            border-radius: 50%;
        }
        
        .content-top .fens-list ul li:nth-child(1) {
            right: 1rem;
            z-index: 3;
            background-image: url(./../../../assets/imgs/living/radiodetails/huangguang.png);
        }
        
        .content-top .fens-list ul li:nth-child(2) {
            right: .5rem;
            z-index: 2;
            background-image: url(./../../../assets/imgs/living/radiodetails/silver.png);
        }
        
        .content-top .fens-list ul li:nth-child(3) {
            right: 0;
            z-index: 1;
            background-image: url(./../../../assets/imgs/living/radiodetails/qingtong.png);
        }
        
        .content-top .dznameid {
            float: right;
            min-width: .8rem;
            height: 0.6rem;
            line-height: .6rem;
            margin-right: .2rem;
            background: rgba(0, 0, 0, .4);
            border-radius: .3rem;
            margin-top: .12rem;
            cursor: pointer;
        }
        
        .content-top span {
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            font-size: 0.24rem;
            display: block;
            width: 100%;
        }
        
        .content-top .dzname {
            float: left;
            min-width: 3.55rem;
            height: 0.84rem;
            background-color: rgba(31, 31, 31, 0.35);
            border-radius: 0.5rem;
            font-family: PingFang SC;
            position: relative;
        }
        
        .content-top .dznamepic,
        .content-top .dznamemass {
            float: left;
        }
        
        .content-top .guanzhu {
            line-height: .44rem;
            text-align: center;
            border-radius: .28rem;
            background: rgba(255, 189, 4, 1);
            font-size: .24rem;
        }
        
        .content-top .dznamepic {
            width: 0.72rem;
            height: 0.72rem;
            border-radius: 50%;
            margin: 0.06rem;
            background-color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
        }
        
        .content-top .dznamepic img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        
        .content-top .dzguankan {
            width: 0.34rem;
            height: 0.34rem;
            float: left;
            position: absolute;
            left: 0.5rem;
            top: 0.46rem;
        }
        
        .content-top .dzguankan img {
            width: 100%;
            height: 100%;
        }
        
        .content-top .dznamemass {
            margin-top: 0.08rem;
            padding-left: 0.15rem;
        }
        
        .content-top .nametit {
            color: #fff;
            font-size: 0.3rem;
            font-weight: bold;
            max-width: 1.5rem;
            padding-right: 1.4rem;
            line-height: 0.36rem;
            height: .36rem;
            cursor: pointer;
        }
        
        .content-top .looknum {
            color: rgba(255, 254, 254, 1);
            font-size: 0.24rem;
            font-weight: 500;
            max-width: 1.9rem;
            padding-right: 1.4rem;
            margin-top: 0.02rem;
        }
        
        .content-top .looknum .anchorid {
            display: inline-block;
            width: auto;
            vertical-align: middle;
            margin-top: -.05rem;
        }
        
        .content-top .looknum span {
            display: block;
            width: 100%;
            overflow: hidden;
        }
        
        .content-top .dznamegz {
            width: 1.17rem;
            height: 0.56rem;
            text-align: center;
            line-height: 0.56rem;
            border-radius: .42rem;
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(31, 31, 31, 1);
            background: #ebebe9;
            position: absolute;
            right: .14rem;
            top: .14rem;
            cursor: pointer;
        }
        
        .content-top .dznamegz img {
            width: auto;
            height: 100%;
        }
        
        .content-top .dznamegzed {
            background: rgba(255, 189, 4, 1);
        }
        
        .content-bottom {
            padding: 0.35rem 0.3rem;
            width: 7.5rem;
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10050;
        }
        
        .content-bottom .chatlbts {
            padding: 0rem 0.2rem;
            background-image: linear-gradient(right, #FF2013 100%, rgba(255, 255, 255, 0) 40%);
            border-radius: 2px;
        }
        
        .content-bottom .chattzpic,
        .content-bottom .chattxt,
        .content-bottom .chatlh {
            float: left;
        }
        
        .content-bottom .chattzpic {
            width: 0.24rem;
            height: 0.24rem;
            margin-top: 0.15rem;
        }
        
        .content-bottom .chattzpic img {
            width: 100%;
            height: 100%;
        }
        
        .content-bottom .chattxt {
            font-size: 0.32rem;
            color: #fff;
            line-height: 0.54rem;
            padding: 0rem 0.08rem;
        }
        
        .content-bottom .chatlh {
            width: 0.5rem;
            height: 0.54rem;
        }
        
        .content-bottom .chatlh img {
            width: 100%;
            height: 100%;
        }
        
        .content-bottom .chatxr {
            padding: 0rem 0.2rem;
            background-color: #F4C008;
            width: 3.5rem;
            margin-top: 0.15rem;
            border-radius: 2px;
        }
        
        .content-bottom .chatxrpic,
        .content-bottom .chatxrtxt {
            float: left;
        }
        
        .content-bottom .chatxrpic {
            width: 0.21rem;
            height: 0.26rem;
            margin-top: 0.15rem;
        }
        
        .content-bottom img {
            width: 100%;
            height: 100%;
        }
        
        .content-bottom .chatxrtxt {
            font-size: 0.32rem;
            color: #fff;
            padding-left: 0.08rem;
            line-height: 0.54rem;
        }
        
        .content-bottom .chatby4 {
            margin-top: 0.12rem;
            overflow: hidden;
        }
        
        .content-bottom .chatby4icon,
        .content-bottom .chatby4txt {
            float: left;
        }
        
        .content-bottom .chatby4icon {
            font-size: 0.2rem;
            color: #fff;
            line-height: 0.38rem;
            padding: 0rem 0.13rem;
            background-color: #FF6600;
            border-radius: 15px;
            margin-right: 0.1rem;
        }
        
        .content-bottom .chatby4txt {
            font-size: 0.32rem;
        }
        
        .content-bottom .span {
            color: #FF6600
        }
        
        .content-bottom .chatby7 {
            margin-top: 0.12rem;
            overflow: hidden;
        }
        
        .content-bottom .chatby7icon,
        .content-bottom .chatby7txt {
            float: left;
        }
        
        .content-bottom .chatby7icon {
            font-size: 0.2rem;
            color: #fff;
            line-height: 0.38rem;
            padding: 0rem 0.13rem;
            background-color: #FF2314;
            border-radius: 15px;
            margin-right: 0.1rem;
        }
        
        .content-bottom .chatby7txt {
            font-size: 0.32rem;
        }
        
        .content-bottom .chatby7txt span {
            color: #FF2314
        }
        
        .content-bottom .chatby {
            margin-top: 0.12rem;
        }
        
        .content-bottom .chatbytxt {
            font-size: 0.32rem;
        }
        
        .content-bottom .chatbytxt span {
            color: #ffffff
        }
        
        .content-bottom .chatby1 {
            margin-top: 0.12rem;
            overflow: hidden;
        }
        
        .content-bottom .chatby1icon,
        .content-bottom .chatby1txt {
            float: left;
        }
        
        .content-bottom .chatby1icon {
            font-size: 0.2rem;
            color: #fff;
            line-height: 0.38rem;
            padding: 0rem 0.13rem;
            background-color: #F4C008;
            border-radius: 15px;
            margin-right: 0.1rem;
        }
        
        .content-bottom .chatby1txt {
            font-size: 0.32rem;
        }
        
        .content-bottom .chatby1txt span {
            color: #F4C008
        }
        
        .content-bottom .chattalk .chatsp,
        .content-bottom .chattalk .chatgd,
        .content-bottom .chattalk .service,
        .content-bottom .chattalk .chatxin {
            float: right;
            cursor: pointer;
        }
        
        .content-bottom .chattalk .chatinp {
            float: left;
            width: 1.5rem;
            height: 0.8rem;
            background-color: rgba(0, 0, 0, 0.4);
            color: #FFFFFF;
            font-size: 0.28rem;
            font-weight: 500;
            text-align: center;
            line-height: 0.8rem;
            border-radius: 0.4rem;
            cursor: pointer;
        }
        
        .content-bottom .chattalk .chatgd {
            width: 0.8rem;
            height: 0.8rem;
            margin-left: 0.2rem;
            position: relative;
        }
        
        .content-bottom .chattalk .chatgd img {
            width: 100%;
            height: 100%;
        }
        
        .content-bottom .chattalk .chatxin {
            margin-left: 0.2rem;
            position: relative;
        }
        
        .content-bottom .chattalk .chatxin .chatxinicon {
            width: 0.8rem;
            height: 0.8rem;
            position: relative;
            cursor: pointer;
        }
        
        .content-bottom .chattalk .chatxin .chatxinicon img {
            width: 100%;
            height: 100%;
        }
        
        .content-bottom .chattalk .chatxin .praise-num {
            width: .82rem;
            height: .32rem;
            line-height: .32rem;
            text-align: center;
            color: #fff;
            border-radius: .16rem;
            font-size: .22rem;
            background: #ff5b4fff;
            position: absolute;
            border: 0.02rem solid rgba(255, 255, 255, 1);
            left: 50%;
            top: -.25rem;
            transform: translateX(-50%);
        }
        
        .content-bottom .chattalk .chatxi .licknum {
            position: absolute;
            top: -0.25rem;
            left: -0.02rem;
            width: 0.45rem;
            background-color: #FF5B4F;
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            font-size: 0.22rem;
            text-align: center;
            line-heihgt: 0.82rem;
            padding: 0rem 0.16rem;
            border-radius: 0.16rem;
        }
        
        .content-bottom .chattalk .chatxi .service {
            position: relative;
            margin-left: 0.14rem;
        }
        
        .content-bottom .chattalk .chatxi .service .servicepic {
            width: 0.8rem;
            height: 0.75rem;
            border: 1px solid #FFBD04;
            border-radius: 50%;
        }
        
        .content-bottom .chattalk .chatxi .service .servicepic img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        
        .content-bottom .chattalk .chatxi .service .servicebtn {
            position: absolute;
            bottom: -0.08rem;
            width: 0.91rem;
            height: 0.24rem;
            left: -0.03rem;
        }
        
        .content-bottom .chattalk .chatxi .service .servicebtn img {
            width: 100%;
            height: 100%;
        }
        
        .content-bottom .chattalk .chatsp {
            background-image: url(./../../../assets/imgs/living/details/product.png);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 0.8rem;
            height: 0.8rem;
            margin-left: 0.2rem;
        }
        
        .content-bottom .chattalk .chatsp .chatsptxt {
            color: #fff;
            padding-top: 0.63rem;
            text-align: center;
            font-size: 0.26rem;
        }
        
        .content-bottom .chattalk .chatxi .imiptbox {
            position: absolute;
            left: 10000px;
            top: -10000px;
        }
        
        .content-bottom .chattalk .close {
            float: right;
            width: 0.8rem;
            height: 0.8rem;
            margin-left: 0.2rem;
            cursor: pointer;
        }
        
        .content-bottom .chattalk .close img {
            width: 100%;
            height: 100%
        }
        
        .fensList {
            padding: .5rem .4rem .4rem;
        }
        
        .fensList ul {
            width: 6.7rem;
            display: flex;
            flex-wrap: wrap;
        }
        
        .fensList ul li {
            display: inline-block;
            margin-bottom: .27rem;
            width: 25%;
            text-align: center;
        }
        
        .fensList ul li:nth-child(4n) {
            padding-right: 0;
        }
        
        .fensList ul li span {
            display: inline-block;
        }
        
        .fensList ul li .im {
            display: block;
            width: 1.1rem;
            height: 1.1rem;
            margin: 0 auto;
            background-color: rgba(0, 0, 0, .4);
            border-radius: 50%;
            border: none;
            overflow: hidden;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: .36rem .34rem;
        }
        
        .fensList ul li:nth-child(1) .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/seat1.png);
        }
        
        .fensList ul li:nth-child(2) .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/seat2.png);
        }
        
        .fensList ul li:nth-child(3) .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/seat3.png);
        }
        
        .fensList ul li:nth-child(4) .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/seat4.png);
        }
        
        .fensList ul li:nth-child(5) .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/seat5.png);
        }
        
        .fensList ul li:nth-child(6) .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/seat6.png);
        }
        
        .fensList ul li:nth-child(7) .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/seat7.png);
        }
        
        .fensList ul li:nth-child(8) .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/seat8.png);
        }
        
        .fensList ul li.locked .im {
            background-image: url(./../../../assets/imgs/living/radiodetails/locked.png);
        }
        
        .fensList ul li .im img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            outline: none;
            border: none;
        }
        
        .fensList ul li .t {
            width: 100%;
            font-size: .24rem;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(191, 191, 191, 1);
            display: flex;
            margin: .15rem auto 0;
            justify-content: center;
        }
        
        .fensList ul li span {
            display: inline-block;
        }
        
        .fensList ul li span.nm {
            margin-left: 0.02rem;
            text-overflow: ellipsis;
            max-width: 1.2rem;
            overflow: hidden;
            white-space: nowrap;
        }
        
        .fensList ul li .t .ic {
            width: .24rem;
            text-align: center;
            height: 0.24rem;
            line-height: .24rem;
            background: rgba(215, 215, 215, 1);
            border-radius: 50%;
            font-size: .2rem;
            font-weight: 500;
            color: rgba(31, 31, 31, 1);
            margin-top: 0.05rem;
        }
        
        .fensList ul li.active .t .ic {
            background: rgba(255, 189, 4, 1);
        }
        
        .internet {
            padding: 1.4rem .35rem .35rem .2rem;
            display: flex;
            position: relative;
        }
        
        .internet span {
            display: inline-block;
        }
        
        .internet .nts .ic {
            width: .22rem;
            height: .16rem;
            margin-right: .1rem;
        }
        
        .internet .nts,
        .internet .su {
            background: rgba(0, 0, 0, .35);
            border-radius: .18rem;
            padding: .06rem .15rem;
        }
        
        .internet .su {
            margin-left: .5rem;
        }
        
        .internet .su .ic {
            width: .24rem;
            height: .12rem;
            margin-right: .1rem;
            padding-bottom: .05rem;
        }
        
        .internet .bd {
            position: absolute;
            right: .3rem;
            bottom: .45rem;
        }
        
        .internet .bd .ic {
            width: .28rem;
            height: .22rem;
            margin-right: .1rem;
        }
        
        .internet .bd .ic2 {
            width: .10rem;
            height: .20rem;
            margin-left: .05rem;
        }
        
        .internet .nts .ic img,
        .internet .su .ic img,
        .internet .bd .ic img,
        .internet .bd .ic2 img {
            width: 100%;
        }
        
        .internet .t {
            font-size: .24rem;
            color: rgba(255, 255, 255, 1);
        }
        
        .msgboxwrap {
            margin: 0 0.3rem .35rem;
            max-width: 99%;
        }
        
        .msgboxwrap .msgbox {
            min-height: 0.48rem;
            border-radius: 0.24rem;
            display: inline-block;
            padding: 0.11rem 0.17rem 0.14rem 0.13rem;
            background-color: rgba(0, 0, 0, 0.4);
            box-sizing: border-box;
            width: 5.36rem;
        }
        
        .msgboxwrap .msgbox p {
            display: inline;
            color: #fff;
            font-size: 0.26rem;
            line-height: 0.48rem;
        }
        
        .msgboxwrap .msgbox p.name {
            color: #ffbd04;
        }
        
        .msgboxwrap .msgbox p.xitong {
            color: #ffbd04;
        }
        
        .righttopclose {
            float: right;
            width: 0.56rem;
            height: 0.56rem;
            margin: .11rem 0 0 0;
            cursor: pointer;
        }
        
        .righttopclose img {
            width: 100%;
            height: 100%;
        }
</style>