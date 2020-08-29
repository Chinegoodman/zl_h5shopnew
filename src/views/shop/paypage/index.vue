<!-- 组件说明 -->
<template>
  <div class="confirmorderwrap">
    <div class="jiazhang">
      <div class="inner-nav">
        <div class="nav-in">
          <van-tabs v-model="active">
          <van-tab
            :title="tit.category_name"
            v-for="(tit, index) in innerNavcontent"
            :key="index"
          >
            <div class="tab-title" slot="title" @click="titleclick(tit.tabindex,1)" >{{tit.category_name}}</div>
          </van-tab>
        </van-tabs>
        </div>
      </div>
      <div class="banner">
        <img src="./../../../assets/imgs/shop/jiazhang-banner.jpg" alt="">
      </div> 
      <div class="content">
        <div class="area-lt">
          <div  class="lt-con">
            <div class="floor02">
              <div class="tit">*防沉迷家长监控系统FAQ</div>
              <div class="con">
                  <span>Q： 可以通过什么渠道申请家长监督未成 年人账号？ </span>
                  <p>‭A： 目前您可以通过电话反馈，进行申请。</p>
                  <span>Q： 申请监督的账号有什么要求？</span>
                  <p>‭A： 账号所属人必须未满18周岁。‬</p>
                  <span>Q： 申请监督未成年人账号需要提供什么</span>
                  <p>A： 您需要提供监护人身份证复印件、账号 所属人身份证复印件以及户口本复印件、公安机关监护证明。‬</p>
                  <router-link :to="{name:'confirmorder'}" tag="li">查看更多FAQ</router-link>
              </div>
            </div>
            <div class="floor03">
              <div class="tit">*申请表下载</div>
              <div class="con">
                  <span>表单内容：</span>
                  <p>附件表一：监护人信息表明书</p>
                  <p>‭附件表二：被监护人信息表明书‬</p>
                  <p>附件表三：家长监护申请书‬</p>
              </div>
              <a class="download" href="http://www.17biyi.tv/yxf.zip">申请表单下载</a>
            </div>
            <div class="floor01">
              <div class="tit">*咨询渠道</div>
              <div class="con">
                <span>咨询电话: </span>
                <p>‭(010) 6493 5833‬</p>
                <span>咨询邮箱: </span>
                <p>peter@17biyi.com</p>
                <span>服务时段: </span>
                <p>全天24小时</p>
              </div>  
            </div>
          </div>
        </div>
        <div class="right-rt">
            <p> “网络直播未成年人家长监护工程”是一项由国内网络直播企业共同发起并参与实施，由中华人民共和国文化部指导，旨在加强家长对未成年人参与网络直播的监护，引导未成年人健康、绿色参与网络直播，和谐家庭关系的社会性公益行动。它提供了一种切实可行的方法，一种家长实施监控的管道，使家长纠正部分未成年子女沉迷直播的行为成为可能。</p>
            <p>该项社会公益行动充分反映了中国网络直播行业高度的社会责任感，对未成年玩家合法权益的关注及对用实际行动营造和谐社会的愿望。</p>
            <p>“家长监护机制”是4399在这一公益行动中，针对目前未成年人缺乏自控及自律能力，容易陷入沉迷；少数监护人缺少时间照顾未成年人，不能及时监督未成年人直播时间的现状，而推出的一种可由家长实施监控，纠正部分未成年子女沉迷直播的保护机制。</p>
            <div class="zu">《未成年人健康参与网络直播提示》</div>
            <p>随着网络在青少年中的普及，未成年人接触网络直播已经成为普遍现象。为保护未成年人健康参与直播，在政府进一步加强行业管理的前提下，家长也应当加强监护引导。为此，我们为未成年人参与网络直播提供以下意见：</p>
            <p>一、主动控制直播时间。直播只是学习、生活的调剂，要积极参与线下的各类活动，并让父母了解自己在网络直播中的行为和体验。</p>
            <p>二、不参与可能耗费较多时间的直播设置。不玩大型角色扮演类直播，不玩有PK类设置的直播。在校学生每周玩直播不超过2小时，每月在直播中的花费不超过10元。</p>
            <p>三、不要将直播当作精神寄托。尤其在现实生活中遇到压力和挫折时，应多与家人朋友交流倾诉，不要只依靠直播来缓解压力。</p>
            <p>四、养成积极健康的直播心态。克服攀比、炫耀、仇恨和报复等心理，避免形成欺凌弱小、抢劫他人等不良网络行为习惯。</p>
            <p>五、注意保护个人信息。包括个人家庭、朋友身份信息，家庭、学校、单位地址，电话号码等，防范网络陷阱和网络犯罪。</p>
            <div class="zu">家长监护服务进度查询：</div>
            <p>如果您已经申请家长监护服务，在服务期间，当您对需要提交的信息、处理结果有疑问，或者其他任何问题，您均可以在工作时间联系我们，我们将由专门负责的受理专员为您提供咨询解答服务，或者配合、指导您解决问题。</p>
            <div class="zu">家长监护服务说明：</div>
            <p>家长监护系统充分考虑家长的实际需求，当家长发现自己的孩子玩直播过于沉迷的时候，由家长提供合法的监护人资质证明、直播名称账号、以及家长对于限制强度的愿望等信息，可对处于孩子直播沉迷状态的账号采取几种限制措施，解决未成年人沉迷直播的不良现象，如限制未成年人每天玩直播的时间区间和长度，也可以限制只有节假日才可以直播，或者完全禁止。</p>
            </div>
      </div> 
    </div>
  </div>
</template>

<script>
// import base from "@/api/base.js"; // 导入接口域名列表
// import axios from "axios";
// import { constants } from 'fs';
//import x from ''
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
    // ====项目中可能用到的===
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
export default {
 components: {
    vanTab:Tab,
    vanTabs:Tabs,
    vanList:List
  },
  data() {
    return {
      active : 1,
      userID:'',
      innerNavcontent : [
        {
          category_name:"首页",
          tabindex: 0
        },
        {
          category_name:"家长监护",
          tabindex: 1
        },
        {
          category_name:"服务申请",
          tabindex: 2
        },
        {
          category_name:"常见问题",
          tabindex: 3
        },
      ]
    };
  },
  computed: {
  },
   mounted() {
    
  },
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    },
    // 头部导航点击事件
    titleclick(type_index) {
      console.log(type_index);
      let that = this;
      switch(type_index){
        case 0 :
          this.$router.push({ name: "shopindex" });
          break
        case 1 :  
          that.$router.push({ name: "paypage" });
          break
        case 2 :  
          that.$router.push({ name: "producttypelist"});
          break   
        case 3 :  
          that.$router.push({ name: "confirmorder"});
          break    
      }
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
  @import url("./css/index.less");
</style>

<style >
body{
  background: #763aff url("./../../../assets/imgs/icons/bg_body.png") no-repeat 0 0 ;
}
.confirmorderwrap .van-tabs--line .van-tabs__wrap {
  height: 0.74rem;
  padding: .1rem 0;
}
.confirmorderwrap .van-tabs__nav--line {
  padding-bottom: 18px;
}

.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border-width : 0;
}

.confirmorderwrap .van-tabs__nav{
  width : 1000px;
  background : none;
}
.confirmorderwrap .van-tabs__line{
  width : .45rem !important;
  background:rgba(31,31,31,1);
  bottom: 16px;
}

.confirmorderwrap .van-tab {
  font-size: .34rem;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(31,31,31,1);
  display: inline-block;
  padding : 0 .32rem;
  flex-basis : auto !important;
  line-height : .75rem;
}
.confirmorderwrap .van-ellipsis{
  /* // overflow: auto; */
}
.confirmorderwrap .van-tab__text--ellipsis{
  text-align : center;
  /* // width : 140px; */
  /* // overflow: auto; */
}
.confirmorderwrap .van-tab--active.van-tab {
  color: rgba(51, 51, 51, 1);
  font-size: .36rem;
  font-weight: bold;
}
</style>