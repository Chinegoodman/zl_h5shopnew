<template>
  <div class="returnSubmit">
        <div class="header">
      <img class="back" @click="goback" src="@/assets/imgs/follow/xiangqing@2x.png" alt />
      <span>协商历史</span>
    </div>
    <div class="returnSubmit__user">
      <div class="returnSubmit__user_info">
        <img :src="url" alt="">
        <div>{{username}}</div>
      </div>
      <div class="text-textarea">
        <span class="tit">备注说明：</span>
        <textarea type="text"  @input="infoText" v-model="textarea" placeholder="100个字以内。"></textarea>
      </div>
    </div>
       <!-- 上传凭证部分 -->
    <div class="bottom"> 
      <div class="bottomtit">上传凭证：</div>
      <!-- <uploadfile :uploaddatainit="uploaddatainit" @_upimglistchange="upimglistchange"></uploadfile>    -->
      <uploadfile
          :canedit="true"
          :uploaddatainit="uploaddatainit"
          :defaultfileslist="fileList"
          @_upfileslistchange="upimglistchange"
      ></uploadfile>  
    </div>
    <div class="return_sbu_btu" v-if="isShow">提交</div>
    <div class="return_sbu_btu red" v-if="!isShow" @click="subText">提交</div>
  </div>
</template>
<script>
import Vue from "vue";
import { Uploader } from "vant";
import base from "@/api/base.js"; // 导入接口域名列表
// import uploadfile from '@/components/uploadfile.vue'
Vue.use(Uploader);

export default {
  components: {
    // uploadfile
  },
  data() {
    return {
      username: "",
      url: "",
      textarea: "",
      fileList: [],
      isShow: true,
      uid:'',
      uploaddatainit: {
        upfileslist: [],
        maxnumber: 5,
        issingle: false, //除了图片之外的资源设置为true(单文件上传模式)
        imgSize: [
          {
            w: "",
            h: "",
          },
        ],
        // filetype
        //'1':图片（只要常用的图片类型:image/gif,image/jp2,image/jpeg,image/png）
        //'1.all':图片 (所有)
        // '2':音频
        // '3':视频
        // '4':zip文件
        // '5':办公文件 MS 及 wps
        // '6':html css js相关
        filetype: "1",
        getwangsu_token_prams: 1, //云存储的存储目录
      },
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
    subText(){
      let that = this;
      this.api.returngoods.insertReturnConsult({
        userId : that.$store.state.user.userid,
        returnId: that.uid,
        content: that.textarea,
        url: this.fileList.toString()
      }).then(data=>{
       if(data.data.code==1){
         this.$toast('提交成功');
         this.$router.go(-1);  
       }
        }) 
    }
  },
  mounted() {
    this.username = this.$store.state.user.userdata.userInfo.nickname;
    this.url = this.$store.state.user.userdata.userInfo.face_url;
    this.uid = this.$route.query.uid;
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
         z-index: 10
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
  .bottom {
    padding: 0.3rem;
    background: #fff;
    .bottomtit {
      font-size: 0.28rem;
      padding-bottom: 0.2rem;
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

