<template>
  <div class="returnSubmit">
    <div class="header">
      <img class="back" @click="goback" src="@/assets/imgs/follow/xiangqing@2x.png" alt />
      <span>退款/退货</span>
    </div>
    <div class="shippingmethod">
      <span class="tit">发货方式：</span>
      <img :src="detailsurl" alt="">
    </div>
    <div class="shipping-tips">快递只能使用您收货时的地址公司，且平台会拒收到付快递</div>
       <!-- 上传凭证部分 -->
    <div class="bottom"> 
      <div class="waybillnumber">
        <span class="tit"><mark>*</mark>运单号码：</span>
        <input type="text" placeholder="请输入运单号" v-model="yudannum" @input="infoText">
      </div>
      <div class="bottomtit">上传凭证：</div>
      <uploadfile :uploaddatainit="uploaddatainit" @_upimglistchange="upimglistchange"></uploadfile> 
      <!-- <van-uploader v-model="fileList" multiple :after-read="afterRead"  :max-count="6" />       -->
    </div>
    <div class="return_sbu_btu" v-if="isShow">提交</div>
    <div class="return_sbu_btu red" v-if="!isShow" @click="subText(details)">提交</div>
  </div>
</template>
<script>
import Vue from "vue";
import { Uploader } from "vant";
import base from "@/api/base.js"; // 导入接口域名列表
Vue.use(Uploader);
import uploadfile from '@/components/uploadfile.vue'
export default {
  components: {
    uploadfile
  },
  data() {
    return {
      username: "",
      url: "",
      yudannum: "",
      fileList: [],
      uploaddatainit:{ //图片上传
        upimglist:[],
        maxnumber:6
      },
      deliveType : '', //物流类型
      details : '',
      detailsurl : '',
      jd: require('../../../../assets/imgs/follow/jd.png'),
      sf: require('../../../../assets/imgs/follow/sf.png'),
      isShow: true,
      uid:''
    };
  },
  computed: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    upimglistchange(listdata){
      this.fileList = listdata;
    },
    infoText() {
      if (this.textarea != "") {
        this.isShow=false
      }else{
        this.isShow=true;
      }
    },
    //提交
    subText(details){
      this.$toast.loading({
        // message:'正在取消订单',
        duration: 30000
      });
      console.log(details.cusDeliverCompany);
      console.log(details.cusDeliverSn);
      this.api.returngoods.postCusDeliver({
        userId : this.$store.state.user.userdata.userInfo.id,
        rOrderUid : this.$route.query.uid,
        deliveType : details.deliveType,
        deliverCompany : details.cusDeliverCompany,
        deliverSn : details.cusDeliverSn,
        deliveImg : this.fileList.toString(),
        content: this.yudannum
      }).then(data=>{
       if(data.data.code==1){
         this.$toast.clear();
         this.$toast('提交成功');
         this.$router.go(-1);
       }
        }) 
    }
  },
  mounted() {
    console.log(this.$store.state.user.userdata.userInfo);
    this.userid = this.$store.state.user.userdata.userInfo.id;
    this.url = this.$store.state.user.userdata.userInfo.face_url;
    this.uid= this.$route.query.uid;
    this.$toast.loading({
      // message:'正在取消订单',
      duration: 30000
    });
    this.api.returngoods.findROrderContent({
      userId: this.userid ,
      rOrderId: this.uid
    }).then(res => {
        if(res.data.code == 1){
          console.log(res.data);
          this.$toast.clear();
          this.details = res.data.data;
          this.deliveType = res.data.data.deliveType;
          if(this.deliveType==0){
            //顺丰图片
            this.detailsurl = this.sf;
          }else if(this.deliveType==1){
            //京东图片
            this.detailsurl = this.jd;
          }
        }else{
         this.$toast("数据错误");
        }
      });
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
@import "./css/index.less";
.returnSubmit {
  background: rgba(243, 243, 243, 1);
    width: 100vw;
    height: 100vh;
    font-family:PingFang SC;
    font-weight:500;
    .header {
        width: 100%;
        border-bottom: 1px solid #DEDEDE;
        background: white;
        text-align: center;
        // position: fixed;
        z-index: 100;

        img {
            transform: rotate(180deg);
            width: 0.2rem;
            height: 0.35rem;
            display: block;
            padding: 0.4rem 0;
            margin-left: 0.46rem;
        }

        span {
            position: absolute;
            top: 0.4rem;
            left: 50%;
            margin-left: -0.55rem;
            font-size: 0.34rem;
            color: #333333;
        }
    }

  &__user {
    width: 100%;
    min-height: 3.5rem;
    padding: 0.22rem 0.32rem;
    box-sizing: border-box;
    background: #fff;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    .returnSubmit__user_info {
      display: flex;
      // align-items: center;
      width: 100%;
      height: 0.65rem;
      font-size: 0.28rem;
      img {
        margin-right: 0.2rem;
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
      }
    }
    .text-textarea{
      font-size : .28rem;
      font-family:PingFang SC;
      font-weight:500;
      line-height: .38rem;
      position : relative;
      .tit{
        padding-right: .1rem;
        border-right : .03rem solid rgba(255, 189, 4, 1);
        color:rgba(117,117,117,1);
        line-height : .38rem;
        position : absolute;
        left : .1rem;
        top : .21rem;
      }
      textarea {
        width: 76.5%;
        padding: .21rem .2rem .2rem 1.7rem;
        border: 0;
        min-height: 2.4rem;
        color:rgba(31,31,31,1);
      }
      textarea::-webkit-input-placeholder {
       color:rgba(191,191,191,1);
      }
    }
    
  }
  .shippingmethod{
    background: #fff;
    padding: .25rem .2rem;
    margin: .2rem 0;
    .tit{
      font-size: .28rem;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(31,31,31,1);
      margin-right: .1rem;
    }
    img{
      display: inline-block;
      width : 1.85rem;
      height: .51rem;
      vertical-align: middle;
    }
  }
  .shipping-tips{
    padding: 0 .2rem .48rem;
    font-size: .2rem;
    color:rgba(191,191,191,1);
  }
  .bottom {
    padding: 0.3rem .2rem;
    background: #fff;
    .bottomtit {
      font-size: 0.28rem;
      padding-bottom: 0.2rem;
    }
    .waybillnumber{
      font-size: .28rem;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(31, 31, 31, 1);
      .tit{
        mark{
          color: rgba(255, 91, 79, 1);
          background: none;
        }
      }
      input{
        display: block;
        width: 6.66rem;
        height: .8rem;
        line-height: .8rem;
        color:rgba(31, 31, 31, 1);
        border:1px solid rgba(215,215,215,1);
        padding: 0 .21rem;
        border-radius: .08rem;
        margin: .2rem auto .3rem;
      }
    }
    .piclist {
      .picscbox,
      .picscboxtp {
        position: relative;
        float: left;
        width: 1.85rem;
        height: 1.85rem;
        margin-right: 0.67rem;
        margin-bottom: 0.3rem;

        img {
          width: 100%;
          height: 100%;
        }

        .del {
          position: absolute;
          width: 0.34rem;
          height: 0.34rem;
          top: -0.17rem;
          right: -0.17rem;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .picscbox:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .red {
    background:rgba(255, 189, 4, 1) !important;
  }
}
.return_sbu_btu {
  width: 3.2rem;
  height: 0.7rem;
  background: rgba(178, 178, 178, 1);
  border-radius: 0.35rem;
  text-align: center;
  line-height: 0.7rem;
  font-size: .32rem;
  color:rgba(255,255,255,1);
  position: fixed;
  left : 50%;
  transform: translateX(-50%);
  bottom : .5rem;
}
</style>
<style lang="less">
.bottom{
  .van-uploader{
    .van-uploader__wrapper{
      .van-uploader__upload{
        width: 1.68rem;
        height : 1.68rem;
        background : url('../../../../assets/imgs/follow/scpzjh.png') no-repeat 0 0;
        background-size : 1.68rem 1.68rem;
        border-radius : 0;
      }
      .van-uploader__upload-icon{
        font-size : 0;
      }
    }  
  }  
}  
</style>

