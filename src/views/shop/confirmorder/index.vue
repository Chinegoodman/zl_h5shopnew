<!-- 组件说明 -->
<template>
  <div class="confirmorderwrap">
    <div class="jiazhang">
      <!-- <div class="returnindex" @click="shopback">首页 < 常见问题</div> -->
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
        <h3>常见问题解答</h3>
        <div class="zu">
           <span class="tit">Q1：“网络直播未成年人家长监护机制工程”是什么？</span>
           <p>“网络直播未成年人家长监护工程”是一项由国内网络直播企业共同发起并参与实施，由中华人民共和国文化部指导，旨在加强家长对未成年人参与网络直播的监护，引导未成年人健康、绿色参与网络直播，和谐家庭关系的社会性公益行动。它提供了一种切实可行的方法，一种家长实施监控的管道，使家长纠正部分未成年子女沉迷直播的行为成为可能。该项社会公益行动充分反映了中国网络直播行业高度的社会责任感，对未成年玩家合法权益的关注以及对用实际行动营造和谐社会的愿望。</p>
        </div>
        <div class="zu">
           <span class="tit">Q2：什么情况下需要申请该项服务呢？</span>
           <p>在监护人发现被监护人有沉溺艺相逢直播的情况下，监护人可向艺相逢公司申请发起未成年人家长监护机制。</p>
            <p>申请需满足以下条件：</p>
            <p>1、申请人需为被监护未成年人的法定监护人；</p>
            <p>2、申请人的被监护人年龄小于18周岁；</p>
            <p>3、申请人需为大陆公民，不含港、澳、台人士。</p>
        </div>
        <div class="zu">
           <span class="tit">Q3：申请该项服务时需要提交哪些资料呢？如何提交呢？</span>
           <p>申请人需通过邮寄方式向我司提交《<a class="download" href="http://www.17biyi.tv/艺相逢.zip">艺相逢直播未成年人用户家长监控服务申请书</a>》及其中所提及需提供的附件，包含：</p>
          <p>附件1：申请人的身份证或户口本（复印件）</p>
          <p>附件2：被申请人的身份证或户口本（复印件）</p>
          <p>附件3：申请人与被申请人的监护法律关系证明（原件）</p>
          <p>您在填写《艺相逢直播未成年人用户家长监控服务申请书》时，请提供尽可能详尽、真实的玩家资料，以便帐号归属的判定。</p>
        </div>
        <div class="zu">
           <span class="tit">Q4：相关资料寄往哪里呢？</span>
           <p>您提交相关申请资料后，我司受理专员将按照 <a class="download" href="http://www.17biyi.tv/艺相逢.zip">监护申请流程</a>尽快处理您的申请，处理过程中可能需要对监护人和被监护人进行电话回访以便信息的判定，希望您的配合。</p>
        </div>
        <div class="zu">
           <span class="tit">Q5：判定帐号归属需要多久呢？</span>
           <p>在判断申请材料完整的情况下，我司将联系疑似账号归属者，告知其在 15 个自然日内将按照监护人需求对其账号进行相关操作，并要求疑似账号归属者提供身份材料以便我司判定其与监护人监护关系；</p>
           <p>若疑似账号归属者在 15 个自然日内不能提供有效身份证明或逾期提供，则默认为疑似账号归属者与被监护人身份相符。我司即按照监护人申请要求，对其直播账号纳入防沉迷系统；</p>
           <p>若疑似账号归属者在 15 个自然日内提供的身份证明与被监护人相符，我司即按照监护人申请要求，对其直播账号纳入防沉迷系统；</p>
           <p>若疑似账号归属者在 15 个自然日内提供的身份证明与被监护人不符，我司则无法判定其与被监护人的身份关系。在此情况下，为保障用户直播账号安全，我司将通知监护人通过公安机关出具账号找回协查证明，由我司协助被监护人找回直播账号后再进行后续操作；</p>
        </div>
        <div class="zu">
           <span class="tit">Q6:若发现对帐号归属有疑义或账号被恶意防沉迷限制怎么办？</span>
           <p>您需要在收到通知后15个自然日内提供您的身份证复印件（纸质），并通过以下地址邮寄到我司，如果我司在15个自然日内未收到您的身份证复印件，我们会将您的账号纳入家长监控系统。</p>
        </div>
        <div class="zu">
            <p>收件人：北京艺相逢文化传播有限公司 </p>
            <p>地　址：北京市朝阳区北苑路40号</p>
            <p>邮　编：100020</p>
            <p>注1：请在身份证复印件上写明您的签名以及联系电话，QQ号，电子邮箱。 </p>
            <p>注2：请您确认官方邮箱地址为：peter@17biyi.com，以免受骗上当。 </p>
            <p>注3：请您注意我司提供该项服务不收取任何费用，以免上当受骗。 </p>
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
      active : 3,
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
.confirmorderwrap{
  .jiazhang{
        width : 1200px; 
        margin : 0 auto;
        .banner{
            width : 1200px; 
            height: 368px;
            margin-top : 25px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .content{
            min-height: 300px;
            position: relative;
            padding: 15px 15px 50px;
            border : 1px solid rgba(255,255,255,.5);
            h3{
              font-size: 22px;
              color: rgba(255,255,255,1);
              font-weight: bold;
              text-align: center;
              padding: 10px 0 20px;
            }
            .zu{
                  font-size: 16px;
                  font-weight: 400;
                  color: rgba(255,255,255,1);
                  font-weight: bold;
                  margin: 15px 0;
                  .download{
                    color:#ff8101;
                  }
              }
              p{
                  font-size: 15px;
                  font-weight: 500;
                  line-height: 32px;
                  text-indent: 2em;
              }    
        }
        .returnindex{
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(255,255,255,.75);
            cursor: pointer;
            padding-top : 20px;
        }
        .inner-nav{
            padding: 0.1rem 0 0.03rem;
            height: 65px;
            box-sizing: border-box;
            background: #FFBD03;
            display: flex;
            flex-direction: row;
            span{

            }
         }
    }
  }  
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

.confirmorderwrap .van-hairline--top-bottom::after, .confirmorderwrap .van-hairline-unset--top-bottom::after{
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