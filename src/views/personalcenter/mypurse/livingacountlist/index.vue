<template>
  <div class="purseliving-acount-list">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>充值</span>
    </div>
    <div class="acount-list-content">
      <ul>
        <li>
          <span class="search-time">2020年6月</span>
          <div class="acount-list">
            <ul class="child-ul">
              <li>
                <span class="im">
                  <img src="../../../../assets/imgs/personal/bill.png" alt="问号">
                </span>
                <div class="com">
                  <span class="tit">充值60金币</span>
                  <span class="day">2020-06-29 20:28:56</span>
                </div>
                <div class="rt">
                  <span class="im" v-if="false">
                    <img src="../../../../assets/imgs/personal/bill.png" alt="问号">
                  </span>
                  <span class="t"><span>￥</span>39876.00</span>
                </div>
              </li>
              <li>
                <span class="im">
                  <img src="../../../../assets/imgs/personal/bill.png" alt="问号">
                </span>
                <div class="com">
                  <span class="tit">充值60金币</span>
                  <span class="day">2020-06-29 20:28:56</span>
                </div>
                <div class="rt">
                  <span class="im" v-if="false">
                    <img src="../../../../assets/imgs/personal/bill.png" alt="问号">
                  </span>
                  <span :class="{'t':true,'suc' : true,'error' : true}">成功</span>
                </div>
              </li>
              <li>
                <span class="im">
                  <img src="../../../../assets/imgs/personal/bill.png" alt="问号">
                </span>
                <div class="com">
                  <span class="tit">充值60金币</span>
                  <span class="day">2020-06-29 20:28:56</span>
                </div>
                <div class="rt">
                  <span class="im" v-if="true">
                    <img src="../../../../assets/imgs/personal/bill.png" alt="问号">
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
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
export default {
    components :{
      vanTab : Tab,
      vanTabs : Tabs,
      vanList : List,
      vanToast : Toast 
    },
    data(){
        return{
          currentWallet : 0,
          rechargeList : [],
          aboutDoulist : []
        }
    },
    mounted(){
      var that = this;
      that.getToUpWallet();
      that.getToUpWwalletBalanceallet();
      that.getUserWalletInfo();
    },
    methods:{
      // 进入商城首页
        gotoshop() {
          this.$router.push({ name: "shopindex" });
        },
        goback() {
          this.$router.push({ path: "/personalcenter/mypurse/livingpurse" });
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
            operatingOsType : 1,
            moduleType : 1
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
              console.log('DODOUD');
              console.log(res.data.data);
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
  .purseliving-acount-list {
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
              cursor: pointer;
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
    .acount-list-content{
      padding-top: 1.1rem;
      .search-time{
        display: inline-block;
        padding: .32rem 0 0 .39rem;
        font-size: .24rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(31,31,31,1);
      }
      .acount-list{
        padding: .3rem .2rem;
        .child-ul{
          li{
            font-family:PingFang SC;
            font-weight:500;
            border-bottom: .01rem solid rgba(0,0,0,.08);
            position: relative;
            display: flex;
            padding: .32rem 0;
            .im{
              display: inline-block;
              width: .68rem;
              height: .68rem;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .com{
              margin-top: -.08rem;
              padding-left: .31rem;
              span{
                display: block;
              }
              .tit{
                font-size: .28rem;
                color:rgba(31,31,31,1);
              }
              .day{
                font-size: .24rem;
                color:rgba(117,117,117,1);
                margin-top: .1rem
              }
            }
            .rt{
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              .im{
                display: inline-block;
                width: .71rem;
                height: .59rem;
                img{
                  width: auto;
                  height: 100%;
                }
              }
              .t{
                font-size: .28rem;
                color:rgba(31,31,31,1);
              }
              .suc{
                color:rgba(83,137,0,1);
              }
              .error{
                color:rgba(255,89,0,1);
              }
            }

          }
        }
      }
    }  
  }  
</style>





