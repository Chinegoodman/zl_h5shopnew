<!-- 组件说明 -->
<template>
  <div class="confirmorderwrap">
    <div class="jiazhang">
      <!-- <div class="returnindex" @click="shopback">首页 < 服务申请</div> -->
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
        <h3>服务申请</h3>
        <div class="guildimg">
          <img src="./../../../assets/imgs/shop/2c_03.png" alt="">
        </div>
        <div class="sec-tit">流程介绍详细说明：</div>
        <div class="zu">
           <span class="tit">监护人提出申请</span>
           <p>在监护人发现被监护人有沉溺艺相逢直播的情况下，监护人可向艺相逢公司申请发起未成年人家长监护机制。 　监护人需亲自通过邮寄方式 向我司提供有效材料，向游家公司提出未成年人账户监控的申请。在收到邮件后，我司即开始启动监护机制审核流程，首先进入疑似账号身份确认期。</p>
        </div>
        <div class="zu">
           <span class="tit">疑似账号身份确认期（15 个自然日）</span>
           <p>在判断申请材料完整的情况下，我司将通过官方邮箱联系疑似帐号归属者，告知其在 15 个自然日内将按照监护人需求对其账号进行相关操作，并要求疑似账号归属者提供身份材料以便我司判定其与监护人监护关系； 若疑似账号归属者在 15 个自然日内不能提供有效身份证明或逾期提供，则默认为疑似账号归属者与被监护人身份相符。我司即按照监护人申请要求，对其直播账号纳入防沉迷系统；</p>
          <p>若疑似账号归属者在 15 个自然日内提供的身份证明与被监护人相符，我司即按照监护人申请要求，对其直播账号纳入防沉迷系统；</p>
          <p>若疑似账号归属者在 15 个自然日内提供的身份证明与被监护人不符，我司则无法判定其与被监护人的身份关系。在此情况下，为保障用户直播账号安全，我司将通知监护人通过公安机关出具账号找回协查证明，由我司协助被监护人找回直播账号后再进行后续操作；</p>
        </div>
        <div class="sec-tit">流程介绍详细说明：</div>
        <div class="zu">
          <p>艺相逢直播未成年人用户<a class="download" href="http://www.17biyi.tv/yxf.zip">家长监控服务申请书</a>(点击下载)</p>
          <p>1、监护人信息表（包含监护人的身份证明复印件）；</p>
          <p>2、被监护人信息表（包含被监护人所玩直播相关信息及身份证明复印件）；</p>
          <p>3、填写网络直播未成年人家长监护申请书、保证书、授权书并手工签字（需下载，填写并打印，签字）；</p>
          <p>4、申请人与被监护人的监护关系证明文件（户口簿或有关机关出具的证明文件）。</p>
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
      active : 2,
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
              padding: 10px 0 20px;
            }
            .sec-tit{
              font-size: 18px;
              color: rgba(255,255,255,1);
              font-weight: bold;
            }
            .guildimg{
              padding: 0 0 30px;
              img{
                width: 100%;
              }
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