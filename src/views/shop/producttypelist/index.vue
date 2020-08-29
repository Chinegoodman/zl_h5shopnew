<!-- 组件说明 -->
<template>
  <div class="confirmorderwrap">
    <div class="jiazhang">
      <div class="returnindex" @click="shopback">首页 < 服务申请</div>
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
           <p>在监护人发现被监护人有沉溺yxf直播戏的情况下，监护人可向游家公司申请发起未成年人家长监护机制。 　监护人需亲自通过邮寄方式 向我司提供有效材料，向游家公司提出未成年人账户监控的申请。在收到邮件后，我司即开始启动监护机制审核流程，首先进入疑似账号身份确认期。</p>
        </div>
        <div class="zu">
           <span class="tit">疑似账号身份确认期（15 个自然日）</span>
           <p>在判断申请材料完整的情况下，我司将通过官方邮箱联系疑似帐号归属者，告知其在 15 个自然日内将按照监护人需求对其账号进行相关操作，并要求疑似账号归属者提供身份材料以便我司判定其与监护人监护关系； 若疑似账号归属者在 15 个自然日内不能提供有效身份证明或逾期提供，则默认为疑似账号归属者与被监护人身份相符。我司即按照监护人申请要求，对其直播账号纳入防沉迷系统；</p>
          <p>若疑似账号归属者在 15 个自然日内提供的身份证明与被监护人相符，我司即按照监护人申请要求，对其直播账号纳入防沉迷系统；</p>
          <p>若疑似账号归属者在 15 个自然日内提供的身份证明与被监护人不符，我司则无法判定其与被监护人的身份关系。在此情况下，为保障用户直播账号安全，我司将通知监护人通过公安机关出具账号找回协查证明，由我司协助被监护人找回直播账号后再进行后续操作；</p>
        </div>
        <div class="sec-tit">流程介绍详细说明：</div>
        <div class="zu">
          <p style="backgroud : red">yxf直播戏未成年人用户家长监控服务申请书(点击下载)</p>
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
export default {
  components: {},
  data() {
    return {
      userID:'',
      
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
    }
  }  
</style>

<style >
body{
  background: #763aff url("./../../../assets/imgs/icons/bg_body.png") no-repeat 0 0 ;
}
</style>