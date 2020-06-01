<template>
  <div class="details_info" v-if="details.rorder">
    <div class="header">
      <img class="back" @click="goback" src="@/assets/imgs/follow/xiangqing@2x.png" alt />
      <span> {{details.rorder.type==1?'申请退货':'申请退款'}}</span>
    </div>
    <div> 
      <div class='details_info_schedule'>
          <p v-if="details.rorder">
            {{details.rorder.status==0?'待处理':
                          details.rorder.status==1?'待发货':
                            details.rorder.status==2?'待收货':
                            details.rorder.status==3?'已同意':details.rorder.status==4?
                            '已完成':
                            details.rorder.status==5?'已拒绝':''}}
          </p>
          <span>{{details.rorder.createTime}}</span>                
      </div>
    </div>
     
      <div class="details_info_content">
       <div class="tui-description">
          <div class="des-tit">{{details.rorder.type==1?'退货说明':'退款说明'}}：</div>
          <div class="des-con">{{details.rorder.description?details.rorder.description : '无'}}</div>
       </div>
       <div class="details_info_content__history" @click="historyList()"><span>协商历史</span><img style="width:0.15rem;height:0.27rem;" src="@/assets/imgs/icons/dd-gengd@2x.png" alt=""></div>
      </div>
      <div class="reciveaddress" v-if="details.rorder.type==1">
        <ul>
          <li><span>收货人：</span>{{details.reciveAddress.reciver}}</li>
          <li><span>联系电话：</span>{{details.reciveAddress.telphone}}</li>
          <li><span>收货地址：</span>{{details.reciveAddress.address}}</li>
        </ul>
      </div>
      <div class="details_info_info">
        <div>退货信息</div>
            <!-- 商品信息部分 -->
    <div class="goodsmass clearfix">
      <div class="masspic">
        <img :src="details.rorder.productPic" alt />
      </div>
      <div class="masscontent">
        <div class="shoptit _txtov2">{{details.rorder.productName}}</div>
        <div class="shopys">
          <span>{{details.rorder.productAttr}}</span>
        </div>
        <div class="shop">支持七天无理由退货</div>
      </div>
      <div class="massmoney clearfix">
        <div class="money"><span class="sm">￥</span>{{details.rorder.productPrice}}</div>
        <span class="n">x{{1}}</span>
      </div>
    </div>
        <div class="details_info_bottom">
          <div>退货原因：{{details.rorder.reason}}</div>
          <div>退货数量：{{details.rorder.productCount}}</div>
          <div>退款金额：{{details.rorder.returnAmount}}</div>
          <div>申请时间：{{details.rorder.createTime}}</div>
          <div>退货编号：{{details.rorder.uid}}</div>
          <div v-if="details.rorder.type==1">
            <div class="details_info_buttom_btu" v-if="details.rorder.status==0" @click="urge(details.rorder.uid)">催促进度</div>
            <div class="details_info_buttom_btu" v-if="details.rorder.status==1" @click="returnlaststepshop(details.rorder.uid)">退货</div>
          </div>
          <div>
            <div class="details_info_buttom_btu" @click="gotoappealpage(details.rorder.uid)">申诉</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      uId: "",
      details: "",
      progress: ""
    };
  },
  computed: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    //催促
    urge(uid) {
      this.$toast("催促成功" + uid);
    },
    //跳转到退货发货页
    returnlaststepshop(){
      this.$router.push({
        path: "/returngoods/returnshopssend",
        query: {
          uid: this.uId
        }
      });
    },
    //协商历史跳转
    historyList() {
      this.$router.push({
        path: "/returngoods/history",
        query: {
          uid: this.uId
        }
      });
    },
    //协商历史跳转
    gotoappealpage() {
      this.$router.push({
        path: "/returngoods/appeal",
        query: {
          uid: this.uId
        }
      });
    }
  },
  mounted() {
      this.uId = this.$route.query.uid;
      this.userid = this.$store.state.user.userdata.userInfo.id;
      this.$toast.loading({
        // message:'正在取消订单',
        duration: 30000
      });
      this.api.returngoods.findROrderContent({ 
        userId: this.userid ,
        rOrderId: this.uId
      }).then(res => {
        console.log(res);
        if(res.data.code == 1){
          this.$toast.clear();
          this.details = res.data.data;
        }else{
         this.$toast(res.data.info);
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
    .header {
        width: 7.5rem;
        border-bottom: 1px solid #DEDEDE;
        background: white;
        text-align: center;
        position: fixed;
        left:50%;
        top:0;
        transform:translateX(-50%);
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
.details_info {
  padding-top: 1.15rem;
  background: rgba(243, 243, 243, 1);
  .details_info_schedule {
        background: rgba(255, 189, 4, 1);
        padding: 0.4rem 0.3rem;
        color:rgba(255,255,255,1);
        font-size: 0.28rem;
        font-family:PingFang SC;
        font-weight:500;
        min-height: .84rem;
        line-height: 0.38rem;
        p {
            color: #FEFEFE;
        }
        span{
          display : block;
          margin-top: .12rem;
        }
    }
  .details_info_text {
    height: 1rem;
    background: rgba(255, 255, 255, 1);
    font-size: 0.28rem;
    line-height: 1rem;
    text-align: center;
    margin-bottom: 0.2rem;
  }
  .reciveaddress{
    padding: .3rem .2rem;
    background:rgba(255,255,255,1);
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(117,117,117,1);
    line-height: .38rem;
    .tit{
      font-size: .28rem;
      color:rgba(31,31,31,1);
    }
    ul{
      li{
        font-size: .24rem;
        margin-top: .16rem;
      }
    }
  }
  .details_info_content {
    font-size: 0.24rem;
    background: #fff;
    margin-bottom: 0.2rem;
    .tui-description{
      padding: 0.35rem 0.21rem;
      box-sizing: border-box;
      min-height : 2.35rem;
      font-size: 0.28rem;
      position: relative;
      .des-con{
        width: 64%;
        line-height: .38rem;
        position: absolute;
        left: 1.7rem;
        top : .38rem;
      }
    }
    &__history {
      width: 100%;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
      box-sizing: border-box;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .details_info_info {
    background: #fff;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  .details_info_bottom {
    color: rgba(153, 153, 153, 1);
    font-size: 0.24rem;
    div {
      margin-bottom: 0.2rem;
    }
    .details_info_buttom_btu {
      width: 3.2rem;
      height: 0.7rem;
      background: rgba(255, 189, 4, 1);
      border-radius: 0.39rem;
      text-align: center;
      color: #fff;
      line-height: 0.7rem;
      font-size : .32rem;
      margin: 0 auto;
      position: fixed;
      bottom: .69rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .goodsmass {
    padding: 0.2rem 0 .48rem;
    // border-bottom: 0.2rem solid #F3F3F3;

    .masspic {
      float: left;
      width: 1.7rem;
      height: 1.7rem;
      border-radius: 0.08rem;
      margin-right: 0.2rem;
      background: #f6f6f6;

      img {
        width: 100%;
        height: 100%;
        border-radius: 0.08rem;
        outline: none;
      }
    }

    .masscontent {
      width: 3.37rem;
      float: left;
      font-family:PingFang SC;
      font-weight:500;

      .shoptit {
        font-size: 0.28rem;
        line-height: 0.38rem;
        margin-bottom: 0.14rem;
        height: .68rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
      }

      .shopys {
        font-size: 0.22rem;
        color: #999999;
      }

      .shop {
        height: 0.34rem;
        float: left;
        border: 1px solid #ff2013;
        border-radius: 0.17rem;
        font-size: 0.2rem;
        line-height: 0.34rem;
        color: #ff2013;
        padding: 0rem 0.12rem;
        margin-top: 0.2rem;
      }
    }
    .massmoney {
      float: right;
      // width: 1.5rem;
      position: relative;

      .money {
        font-size: 0.30rem;
        color:rgba(31, 31, 31, 1);
        margin-bottom: 0.15rem;
        .sm{
          font-size: .22rem;
        }
      }

      .n{
        display  : block;
        font-size: .22rem;
        color:rgba(117,117,117,1);
        float: right;
      }

      .shopnum {
        float: right;
        position: absolute;
        bottom: -0.5rem;
        right: 0;

        span {
          font-size: 0.22rem;
          background-color: #f3f3f3;
          margin: 0rem 0.2rem;
          float: left;
          display: block;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          &.show {
            min-width: 0.56rem;
            padding: 0 0.05rem;
          }
        }

        span:first-child,
        span:last-child {
          font-size: 0.5rem;
          padding: 0;
          background-color: #fff;
          margin: 0;
          width: 0.2rem;
        }
      }
    }
  }
}
</style>
