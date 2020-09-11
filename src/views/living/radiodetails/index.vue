<!-- 组件说明 -->
<template>
  <div class="radiodetailswrap">
        <div :class="{'wrap-page':true,'rtc_bg_0' : radioInfodetails.backgroundImage!= true,'rtc_bg_1' : radioInfodetails.backgroundImage=='rtc_bg_1','rtc_bg_2' : radioInfodetails.backgroundImage=='rtc_bg_2','rtc_bg_3' : radioInfodetails.backgroundImage=='rtc_bg_3','rtc_bg_4' : radioInfodetails.backgroundImage=='rtc_bg_4','rtc_bg_5' : radioInfodetails.backgroundImage=='rtc_bg_5','rtc_bg_6' : radioInfodetails.backgroundImage=='rtc_bg_6','rtc_bg_7' : radioInfodetails.backgroundImage=='rtc_bg_7','rtc_bg_8' : radioInfodetails.backgroundImage=='rtc_bg_8','rtc_bg_9' : radioInfodetails.backgroundImage=='rtc_bg_9'}" >
            <div class="page-content">
            <div id="startdowm">
                <div id="share" class="video-content">
                    <div class="content-top">
                        <div class="clearfix">
                            <div class="dzname clearfix">
                                <div class="dznamepic" @click="opendownload">
                                    <img :src="radioInfodetails.avatar?radioInfodetails.avatar:default_img_head" alt="抓周" />
                                </div>
                                <div class="dznamemass">
                                    <div class="nametit _txtov1">{{radioInfodetails.nickname}}</div>
                                    <div class="looknum">
                                        <span class="_txtov1">ID:<span class="anchorid">{{radioInfodetails.virtualId}}</span></span>
                                    </div>
                                </div>
                                <div class="dznamegz dznamegzed" @click="opendownload">
                                    关注
                                </div>
                            </div>
                            <div class="righttopclose" @click.stop="shopback">
                                <img src="./../../../assets/imgs/living/details/close.png" alt="抓周" />
                            </div>
                            <div class="dznameid" @click.stop="shopback">
                                <span class="realCount">{{radioInfodetails.realCount}}</span>
                            </div>
                            <div class="fens-list">
                                <ul id="bandanlist">
                                    <li v-for="(items,index) in radioLeaderRange" :key="index">
                                        <span>
                                            <img :src="items.avatar" alt="">
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="internet">
                        <div class="nts"><span class="ic"><img src="./../../../assets/imgs/living/radiodetails/Notice.png" alt=""></span><span class="t">公告</span></div>
                        <div class="su"><span class="ic"><img src="./../../../assets/imgs/living/radiodetails/su.png" alt=""></span><span class="t">200.4kb/s</span></div>
                        <div @click="opendownload" class="bd"><span class="ic"><img src="./../../../assets/imgs/living/radiodetails/bandan.png" alt=""></span><span class="t">榜单</span><span class="ic2"><img src="./../../../assets/imgs/living/radiodetails/return.png" alt=""></span></div>
                    </div>
                    <div class="fensList">
                        <ul id="listcontent">
                            <li v-for="(items,index) in radioseatsrange" :key="index" :class="{'locked': items.lock != '0','active' : items.uid != 0}">
                                <span class="im">
                                   <img :src="items.url" alt="">
                               </span>
                                <div class="t">
                                    <span class="ic">{{items.seatNo}}</span>
                                    <span class="nm">{{items.name?items.name:'虚位以待'}}</span>
                                </div>
                            </li>
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
            </div>
        </div>
        <div class="content-bottom" id="contentBottom">
            <div class="chattalk clearfix">
                <p class="chatinp" @click="opendownload">说点啥</p>
                <div class="close" @click="opendownload">
                    <img src="./../../../assets/imgs/living/details/gengduo.png" alt="抓周" />
                </div>
                <div class="chatgd" @click="opendownload">
                    <img src="./../../../assets/imgs/living/radiodetails/xiaoxi.png" alt />
                </div>
                <div class="close" @click="opendownload">
                    <img src="./../../../assets/imgs/living/radiodetails/muteic.png" alt="抓周" />
                </div>
                <div class="chatgd" @click="opendownload">
                    <img src="./../../../assets/imgs/living/xiudetails/xiuproduct.png" alt />
                </div>
            </div>
        </div>
        <downloadandopenapp :covertype="covertypedata" @closeappbtnsboxclick="shutappbtnsbox"  :link_url_download="linkurldownload"  :link_url_open="linkurlopen" v-if="downloadcovershow"></downloadandopenapp>
    </div>
  </div>
</template>

<script>
//import x from ''
import { checkdevice } from "@/utils/checkdevice.js";
import downloadandopenapp from '../../../components/downloadandopenapp.vue'
import {
  setsessionStorage
} from "./../../../utils/index.js";
export default {
  components: {
    downloadandopenapp 
  },
  data() {
    return {
      tab : '',
      liveId : '',
      radioseatsrange : [], //席位
      radioLeaderRange : [], //榜单排行
      radioInfodetails : { //详情信息
          coverUrl : ''
      },
      default_img_small: require('../../../assets/imgs/shop/list-default-small.png'), //默认图片
      default_img_big: require('../../../assets/imgs/shop/list-default-big.png'),
      default_img_head : require('../../../assets/imgs/icons/default-head.png'),
      covertypedata: 'downloadcovershow', //下载及启动APP组件类别.
      downloadcovershow: false, //下载及启动APP弹层
      linkurldownload: '', //下载链接
      linkurlopen: '' //拉起APP的链接
    };
  },
  computed: {},
    mounted() {
    let that = this;
    that.tab = that.$route.query.tab;
    that.liveId = that.$route.query.liveId;
    that.getRadioLiveInfo();
    that.getRadioSeatsList();
    that.getRadioLeaderboadRoom();
  },
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    },
    //打开下载启动弹层
    opendownload() {
        this.downloadcovershow = true;
        this.downloadandopen();
    },
    //关闭下载启动弹层
    shutappbtnsbox() {
        this.downloadcovershow = false;
    },
    //下载及拉起APP
    downloadandopen() {
        let that = this;
        that.linkurlopen = "zhuazhouH5://";
        if (checkdevice() == "anzhuo") {
            that.linkurldownload = 1;
        } else {
            that.linkurldownload = 2;
        }
    },
    // 获取主播详情
    getRadioLiveInfo(){
      let that = this;
      that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });  
      that.api.xiuchangliving
      .radioLiveInfo({
        liveId: that.liveId,
      })
      .then(res => {
        that.$toast.clear();
        if(res.data.code == 1){
            that.radioInfodetails = res.data.data;
        }
        else{
          that.$toast(res.data.info);
        }
      })
    },
    /*获取列表席位*/ 
    getRadioSeatsList(){
      let that = this;
      that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });  
      that.api.xiuchangliving
      .radioSeatsList({
        liveId: that.liveId,
      })
      .then(res => {
        that.$toast.clear();
        if(res.data.code == 1){
            that.radioseatsrange = res.data.data;
        }
        else{
          that.$toast(res.data.info);
        }
      })
    },
    /*-获取直播间榜单*/
    getRadioLeaderboadRoom(){
        let that = this;
      that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });  
      that.api.xiuchangliving
      .radioLeaderboadRoom({
        liveId: that.liveId,
        page: 1,
        pageSize: 3
      })
      .then(res => {
        that.$toast.clear();
        if(res.data.code == 1){
            that.radioLeaderRange = res.data.data.detail.list;
        }
        else{
          that.$toast(res.data.info);
        }
      })
    }
  },
  created() {
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
@import "./css/index.less";
</style>

<style>

        
</style>