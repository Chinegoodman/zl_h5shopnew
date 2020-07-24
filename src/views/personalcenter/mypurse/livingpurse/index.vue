<template>
  <div class="purseliving_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>我的钱包</span>
    </div>
    <div class="purseliving-content">
      <div class="purse-banner">
        <div class="lis">
          <div class="top">
            <span class="jin">
              <span class="ic"><img src="../../../../assets/imgs/personal/jijbi.png" alt="金币"></span>
              <span class="t">金币</span>
            </span>
            <span class="num">{{aboutDoulist.virtualAccount}}</span>
          </div>
        </div>
      </div>
      <div class="top-up"> 
        <h3>金币充值</h3>
        <div class="list">
          <div class="lis" v-for="(item,index) in rechargeList" :key="index" @click="opendownload">
            <div class="top">
              <span class="ic"><img src="../../../../assets/imgs/personal/jbsc.png" alt="金币"></span>
              <span class="pr">{{item.virtualCurrency}}</span>
              <span class="gave" v-if="item.givingVirtualCurrency">+{{item.givingVirtualCurrency.toFixed(0)}}(赠)</span>
            </div>
            <div class="btm">
              <span class="ic">￥</span>
              <span class="pr">{{item.price}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box-jin-xiu">
        <div class="box-bill-gd">
          <div class="lt">
            <span class="im">
              <img src="../../../../assets/imgs/personal/tixian.png" alt="问号">
            </span>
            <span class="t">账单</span>
          </div>
          <span class="gd" @click="goToAcountList">立即查看<span><img src="../../../../assets/imgs/personal/livingpurse-gd.png" alt="问号"></span></span>
        </div>
        <ul>
          <li>
            <div class="nm">金豆<span class="ic" @click="jinDouQuestionShellShow"><img src="../../../../assets/imgs/personal/sygf.png" alt="问号"></span></div>
            <div class="num" v-if="aboutDoulist.userWalletEarningsPojo">{{aboutDoulist.userWalletEarningsPojo[0].earnings}}</div>
            <span class="btn" @click="opendownload">提现</span>
            <div class="question-shell" v-if="jinDouQuestionShell">
              <p>金豆为</p>
              <p>娱乐直播时的</p>
              <p>礼物收益</p>
            </div>
          </li>
          <li>
            <div class="nm">秀豆<span class="ic" @click="xiuDouQuestionShellShow"><img src="../../../../assets/imgs/personal/sygf.png" alt="问号"></span></div>
            <div class="num" v-if="aboutDoulist.userWalletEarningsPojo">{{aboutDoulist.userWalletEarningsPojo[1].earnings}}</div>
            <span class="btn" @click="opendownload">提现</span>
            <div class="question-shell" v-if="xiuDouQuestionShell">
              <p>秀豆为</p>
              <p>电台直播时的</p>
              <p>礼物收益</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <downloadandopenapp :covertype="covertypedata" @closeappbtnsboxclick="shutappbtnsbox"  :link_url_download="linkurldownload"  :link_url_open="linkurlopen" v-if="downloadcovershow"></downloadandopenapp>
  </div>
</template>
<script>
import downloadandopenapp from '../../../../components/downloadandopenapp.vue';
import { checkdevice } from "@/utils/checkdevice.js";
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
    Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import { setTimeout } from 'timers';
export default {
    components :{
      vanTab : Tab,
      vanTabs : Tabs,
      vanList : List,
      vanToast : Toast ,
      downloadandopenapp,
    },
    data(){
        return{
          currentWallet : 0,
          rechargeList : [],
          aboutDoulist : [],
          jinDouQuestionShell : false,
          xiuDouQuestionShell : false,
          covertypedata: 'downloadcovershow', //下载及启动APP组件类别
          downloadcovershow: false, //下载及启动APP弹层
          linkurldownload: '', //下载链接
          linkurlopen: '' //拉起APP的链接
        }
    },
    mounted(){
      var that = this;
      that.getToUpWallet();
      that.getToUpWwalletBalanceallet();
      that.getUserWalletInfo();
    },
    methods:{
      // 进入账单列表
        goToAcountList() {
          this.$router.push({ name: "personalcenterlivingacountlist" });
        },
        goback() {
          this.$router.push({ path: "/personalcenter/index" });
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
        jinDouQuestionShellShow(){
          let that = this;
          that.jinDouQuestionShell = true;
          setTimeout(function(){
            that.jinDouQuestionShell = false;
          },1500)
        },
        xiuDouQuestionShellShow(){
          let that = this;
          that.xiuDouQuestionShell = true;
          setTimeout(function(){
            that.xiuDouQuestionShell = false;
          },1500)
        },
        //获取用户余额
        getToUpWallet(item,index){
          var that = this;
          that.api.personalcenter.toUpWwalletBalanceallet({
            userId : that.$store.state.user.userid
          }).then(res => {
              if(!res.data.code)return;
              if(res.data.code == 1){
                that.currentWallet = res.data.data;
              }
          });
        },
         //获取充值列表
        getToUpWwalletBalanceallet(item,index){
          var that = this;
          that.api.personalcenter.toUpWallet({
            userId : that.$store.state.user.userid,
            operatingOsType : 4,
            appType : 1
          }).then(res => {
              if(!res.data.code)return;
              if(res.data.code == 1){
                that.rechargeList = res.data.data;
              }
          });
        },
        getUserWalletInfo(){
          var that = this;
          that.api.personalcenter.userWalletInfo({
            userId : that.$store.state.user.userid
          }).then(res => {
              if(!res.data.code)return;
              if(res.data.code == 1){
                that.aboutDoulist = res.data.data;
              }
          });
          
        }
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:rgba(247,247,247,1)');
    }
}
</script>
<style lang="less">
  .purseliving_wrap {
    height:100vh;
    background:rgba(247,247,247,1);
    .header {
          width: 7.5rem;
          border-bottom: 1px solid #DEDEDE;
          background: white;
          text-align: center;
          position: fixed;
          z-index: 100;
          top: 0;

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

          .mydiscount-path{
              font-size: .26rem;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(31,31,31,1);
              position: absolute;
              right: .2rem;
              top: .46rem;
          }
    }
    
    .purseliving-content{
      width: 7.5rem;
      height: 100vh;
      padding-top: 1.15rem;
      position: relative;
      // display: flex;
      // flex-direction: column;
      // flex-wrap : wrap;
      .purse-banner{
          // padding: .3rem;
          // margin-top: 1.35rem;
          width: 7.1rem;
          height: 2.72rem;
          padding: .2rem .2rem 0;
          background: rgba(247,247,247,1) url('../../../../assets/imgs/personal/cardbg.png') no-repeat center .2rem;
          background-size: 7.1rem 2.72rem;
          display: flex;
          font-family:PingFang SC;
          font-weight:500;
          .lis{
              flex: 1;
              padding: .65rem 0 .75rem;
              text-align: center;
              font-size: .24rem;
              .top{
                .jin{
                    display: block;
                    text-align: center;
                    color:rgba(255,255,255,1);
                    .ic{
                        display: inline-block;
                        width: .32rem;
                        height: .32rem;
                        margin-right: .1rem;
                        vertical-align: middle;
                        margin-top: -.04rem;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .turn{
                      display: inline-block;
                      width: .93rem;
                      height: .3rem;
                      line-height:.3rem;
                      background:rgba(255,91,79,1);
                      border-radius: .15rem;
                      color:rgba(255,254,254,1);
                      font-size:.2rem;
                      margin-left : .06rem;
                      cursor: pointer;
                      .gd{
                        display: inline-block;
                        width : .07rem;
                        height : .13rem;
                        vertical-align : middle;
                        margin: -.04rem 0 0 .02rem;
                        img{
                          display: block;
                          width : 100%;
                          height : 100%;
                        }
                      }
                    }
                }
                .num{
                    display: block;
                    margin-top: .1rem;
                    font-size: .56rem;
                    color:rgba(255,255,255,1);
                    font-weight:bold;
                }
              }  
              .btm{
                width : 1.6rem;
                height : .52rem;
                line-height: .52rem;
                background:rgba(255,247,224,1);
                color:rgba(255,189,4,1);
                font-size : .24rem;
                border-radius:.26rem;
                margin:.42rem auto 0;
                cursor: pointer;
              }
              .btm-color{
                color:rgba(255,255,255,1);
                background:rgba(255,189,4,1);
              }
          }
      }
      .top-up{
        padding: 0 .2rem;
        font-family:PingFang SC;
        font-weight:500;
        margin: 0 .2rem;
        background:rgba(255,255,255,1);
        h3{
          padding: .2rem 0 0  .1rem;
          font-size: .3rem;
          color:rgba(31,31,31,1);
        }
        .list{
          padding-top: .3rem;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          flex-grow: 1;
          .lis{
            width: 2.08rem;
            height: 1.3rem;
            border: .02rem solid rgba(255,189,4,1);
            border-radius: .06rem;
            text-align: center;
            margin-bottom: .3rem;
            margin-right: .15rem;
            cursor: pointer;
            .top{
              padding-top: .3rem;
              .ic{
                display: inline-block;
                width: .29rem;
                height: .29rem;
                margin-right: .05rem;
                vertical-align: middle;
                margin-top: -.04rem;
                img{
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
              .pr{
                font-size: .28rem;
                color:rgba(31,31,31,1);
              }
              .gave{
                font-size: .20rem;
                color:#FFBD04;
              }
            }
            .btm{
              color:rgba(255,189,4,1);
              font-size: .26rem;
              margin-top: .12rem;
            }
          }
          .lis:nth-child(3n){
            margin-right: 0;
          }
        }
      }
      .box-jin-xiu{
        .box-bill-gd{
          display: flex;
          padding: .3rem 0 .3rem .3rem;
          margin: .2rem;
          position: relative;
          background:rgba(255,255,255,1);
          border-radius: .12rem;
          .lt{
            justify-content: flex-start;
            display: flex;
            .im{
              display: block;
              width: .68rem;
              height: .68rem;
              vertical-align: middle;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .t{
              font-size:.3rem;
              font-weight:500;
              color:rgba(31,31,31,1);
              padding: .15rem 0 0 .15rem;
            }
          }
          .gd{
            display: inline-block;
            justify-content: flex-end;
            font-size: .24rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(191,191,191,1);
            position: absolute;
            right: .3rem;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            span{
              display: inline-block;
              width: .12rem;
              height: .22rem;
              vertical-align: middle;
              margin-left: .11rem;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          
        }
        ul{
          padding: 0 .2rem;
          li{
            width: 6.5rem;
            min-height: 1.23rem;
            padding: .35rem .3rem 0;
            position: relative;
            font-family:PingFang SC;
            font-weight:500;
            margin-bottom: .2rem;
            .nm{
              font-size: .3rem;
              color:rgba(31,31,31,1);
              .ic{
                display: inline-block;
                width: .25rem;
                height: .25rem;
                margin-left: .15rem;
                cursor: pointer;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .num{
              font-size: .36rem;
              font-weight:bold;
              color:rgba(31,31,31,1);
              margin-top: .1rem;
            }
            .btn{
              width:1.5rem;
              height: .64rem;
              line-height: .64rem;
              background:rgba(255,189,4,1);
              border-radius: .32rem;
              color:rgba(255,255,255,1);
              font-size: .24rem;
              text-align: center;
              position: absolute;
              top: .47rem;
              right: .3rem;
              cursor: pointer;
            }
            .question-shell{
              width: 3.04rem;
              height: 1.18rem;
              padding: .2rem 0;
              background: url('../../../../assets/imgs/personal/questionshell.png') no-repeat center 0;
              background-size: 3.04rem 1.58rem;
              position: absolute;
              left: 1.45rem;
              top: -0.26rem;
              p{
                font-size: .28rem;
                color:rgba(255,255,255,1);
                text-align: center;
              }
            }
          }
          li:nth-child(1){
            background: url('../../../../assets/imgs/personal/bg_purse_jindou.png') no-repeat center 0;
            background-size: 7.1rem 1.58rem;
          }
           li:nth-child(2){
            background: url('../../../../assets/imgs/personal/bg_purse_xiudou.png') no-repeat center 0;
            background-size: 7.1rem 1.58rem;
            .btn{
              background:rgba(255,91,79,1);
            }
          }
        }
      }
    }  
  }  
</style>





