<!-- 组件说明 -->
<template>
    <div class="mypursewrap">
      <topbanner :title="'金银财宝'" v-if="$route.query.webtype==1"></topbanner>
        <div class="mypursecontent">
            <div class="money">
                <span class="balance">{{yu_e}}</span>
                <span class="t">总金额(元)</span>
            </div>
            <div class="balance-type">
               <div class="type-tx">
                  <span class="n">0.00</span>
                  <span class="tip">可提现金额(元)</span>
               </div>
               <span class="line"></span>
               <div class="type-tx">
                  <span class="n">0.00</span>
                  <span class="tip">冻结金额(元)</span>
               </div>
            </div>
            <ul class="balance-list">
              <!-- <li to="/personalcenter/mypurse/balancedetail">
                <span class="im">
                  <img src="@/assets/imgs/personal/bill.png" alt="聚美金品">
                </span>
                <span class="t">账单明细</span>
                <span class="gd"></span>
              </li> -->
              <li to="/personalcenter/mypurse/balancedetail" @click="gotodetail">
                  <span class="im">
                    <img src="@/assets/imgs/personal/bill.png" alt="聚美金品">
                  </span>
                  <span class="t">账单明细</span>
                  <span class="gd"></span>
              </li>
            </ul>
        </div>
    </div>
</template>

<script>
import topbanner from "@/components/topbanner";
export default {
  components: {
    topbanner,
  },
  data() {
    return {
      userid:
        this.$route.query.webtype == 0
          ? this.$route.query.userid
          : this.$store.state.user.userid,

      yu_e: 0 //账户余额，
    };
  },
  computed: {},
  methods: {
    gotodetail(){
      this.$router.push({ path: "/personalcenter/mypurse/balancedetail",query:{
        userid:this.$store.state.user.userid,
        // webtype:1,//H5
        webtype: 0,
      }});
    },
    // 获取余额
    getmoney() {
      let that = this;
      that.api.personalcenter.walletmoney(that.userid).then(res => {
        console.log(res);
        if (res.data.code == 1) {
          that.yu_e = res.data.data.money;
        } else {
          that.$toast(res.data.info);
        }
      });
    }
  },
  mounted() {
    this.getmoney();
    // document.title = "我的余额";
  },
  beforeCreate() {
    // document.title = "我的余额";
    document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
  }, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    document.querySelector('body').setAttribute('style', '')
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
.mypursewrap {
  width: 7.5rem;
  min-height: 100vh;
  background: url("./../../../../assets/imgs/personal/mybalance.png") no-repeat 0 0;
  background-size: 7.5rem 4.12rem;
  margin: 0 auto;
  .topbanner p{
     color: #fff;
  }
  .mypursecontent {
    padding: 0.66rem 0 0;
    position: relative;
    .money {
      span{
        display: block;
        font-size: 0.5rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
      .balance{
        height: .38rem;
        line-height: .38rem;
      }
      .t{
        margin-top: .2rem;
        font-size: .3rem;
        font-weight:500;
      }
    }
    .balance-type{
      position: absolute;
      left: 0.3rem;
      top: 2.43rem;
      font-size: .4rem;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(31,31,31,1);
      background:rgba(255,255,255,1);
      border-radius: .12rem;
      .type-tx{
        display: inline-block;
        width: 3.54rem;
        padding: .4rem 0;
        min-height: .7rem;
        span{
          display: block;
          text-align: center;
        }
        .n{
          height: .3rem;
          line-height: .3rem;
        }
        .tip{
          font-size: .24rem;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(31,31,31,1);
          margin-top: .15rem;
        }
      }
    }

    .balance-list{
      padding-top: 2.9rem;
      li{
        padding: .3rem;
        background:rgba(255,255,255,1);
        position: relative;
        margin: 0 .2rem .2rem;
        border-radius: .12rem;
        span{
          display: block;
        }
        .im{
          width: .7rem;
          height: .7rem;
          position: absolute;
          left: .3rem;
          top: .3rem;
          & > img{
            width: 100%;
          }
        }
        .t{
          padding-left: .94rem;
          line-height: .7rem;
          font-size: .28rem;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(31,31,31,1);
        }
        .gd{
          width:  .11rem;
          height: .21rem;
          background: url("./../../../../assets/imgs/personal/icon_guild.png") no-repeat 0 0;
          background-size: .11rem .21rem;
          position: absolute;
          right: .3rem;
          top: 50%;
          margin-top: -.15rem;
        }
      }
    }


    // & > img {
    //     width: 1.51rem;
    //     height: 1.51rem;
    //     margin: 0 auto 0.21rem;
    // }
    .smtitle {
      font-size: 0.28rem;
      color: rgba(102, 102, 102, 1);
      text-align: center;
      margin: 0 auto 0.5rem;
    }
  }
  .btns {
    position: fixed;
    left: 50%;
    // bottom: 3.12rem;
    bottom: 24%;
    transform: translateX(-50%);
    p {
      margin-bottom: 0.4rem;
      cursor: pointer;
      width: 3.2rem;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      background: linear-gradient(
        83deg,
        rgba(255, 32, 19, 1),
        rgba(255, 82, 35, 1)
      );
      box-shadow: 0px 0.05rem 0.16rem 0px rgba(255, 55, 27, 0.36);
      border-radius: 0.35rem;
      color: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      &:last-child {
        margin-bottom: 0;
        background: #fff;
        border: 1px solid rgba(255, 32, 19, 1);
        color: rgba(255, 32, 19, 1);
        box-shadow: none;
      }
    }
  }
  .historybtn {
    position: fixed;
    left: 50%;
    bottom: 0.5rem;
    transform: translateX(-50%);
    color: rgba(153, 153, 153, 1);
    font-size: 0.24rem;
    cursor: pointer;
  }
}

.balance-detail{
  padding: .3rem .2rem;
  .det-list{
    padding: .2rem;
    li{
      display: inline-block;
      min-width: 1.8rem;
      padding: .08rem;
      color : #3c3c3c;
      background : #eaeaea;
      margin: 0 .2rem .2rem 0;
      border-radius: .12rem;
      text-align: center;
    }
  }
  .btn{
    display: block;
    width: 2.1rem;
    height: .7rem;
    line-height: .7rem;
    font-size: .32rem;
    text-align: center;
    color: #fff;
    margin: .5rem auto;
    border-radius: .3rem;
    background:linear-gradient(90deg,rgba(255,207,10,1),rgba(255,188,4,1));
  }
}  
</style>

<style lang='less'>
//@import url()
</style>