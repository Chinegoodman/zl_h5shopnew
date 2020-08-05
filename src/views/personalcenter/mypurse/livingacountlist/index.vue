<template>
  <div class="purseliving-acount-list">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>{{titlename}}</span>
    </div>
    <div class="acount-list-content">
      <div class="el-ul" v-if="rechargerecodeList.length > 0" v-show="turnId==1 || turnId==3 || turnId==5">
        <van-list
          class="goodslist"
          v-model="listloading"
          :finished="listfinished"
          :finished-text="finished_text"
          :error.sync="vanerror"
          error-text="请求失败，点击重新加载"
          :offset="10"
          @load="getUserWalletBill"
        >
            <div class="el-li" v-for="(item,index) in rechargerecodeList" :key="index">
            <span class="search-time">{{item.date}}</span>
            <div class="acount-list">
              <ul class="child-ul">
                <li v-for="(itemchild,indexchlid) in item.userWalletBillPojo" :key="indexchlid" >
                  <span class="im">
                    <img :src="itemchild.iconUrl" alt="">
                  </span>
                  <div class="com">
                    <span class="tit">{{itemchild.changeRecord}}</span>
                    <span class="day">{{itemchild.createTime}}</span>
                  </div>
                  <div class="rt">
                    <span class="im" v-if="false">
                      <img src="../../../../assets/imgs/personal/bill.png" alt="">
                    </span>
                    <span class="t"><span>￥</span>{{itemchild.expense}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </van-list>
      </div>
      <div  class="el-ul" v-if="rechargerecodeList.length > 0" v-show="turnId==2 || turnId==4">
        <van-list
          class="goodslist"
          v-model="listloading_ii"
          :finished="listfinished_ii"
          :finished-text="finished_text_ii"
          :error.sync="vanerror_ii"
          error-text="请求失败，点击重新加载"
          :offset="10"
          @load="getUserWalletExchangeOrWithdrawalBill"
        >
          <div class="el-li" v-for="(item,index) in rechargerecodeList" :key="index">
          <span class="search-time">{{item.date}}</span>
          <div class="acount-list">
            <ul class="child-ul">
              <li v-for="(itemchild,indexchlid) in item.exchangeOrWithdrawalPojo" :key="indexchlid" >
                <span class="im">
                  <img :src="itemchild.iconUrl" alt="">
                </span>
                <div class="com">
                  <span class="tit">{{itemchild.changeRecord}}</span>
                  <span class="day">{{itemchild.createTime}}</span>
                </div>
                <div class="rt">
                  <span :class="{'t' : true}" v-if="itemchild.state===1">待审核</span>
                  <span :class="{'t' : true,'suc' : itemchild.state===2}" v-else-if="itemchild.state===2">成功</span>
                  <span :class="{'t' : true,'error': itemchild.state===3}" v-else>异常</span>
                </div>
              </li>
            </ul>
          </div>
          </div>
        </van-list>
      </div>
    </div>
    <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
  </div>
</template>
<script>
import nodata from '../../../../components/nodata.vue'
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
      vanToast : Toast,
      nodata, 
    },
    data(){
        return{
          titlename : '',
          nodatashow:false,
          pagetypedata:"mypurseacountlistshop",
          posttype : '',
          turnId :'',
          rechargerecodeList : [],
          listloading: false,
          listfinished: false,
          finished_text : '',
          nextpage : 1,
          vanerror: false,
          listloading_ii: false,
          listfinished_ii: false,
          finished_text_ii : '',
          vanerror_ii: false,
          nextpage_ii : 1,
          hasmorepage : 1, //是第一页还是多页后无数据区分  1为初始无数据 2为下拉之后无更多
        }
    },
    mounted(){
      var that = this;
      that.turnId = that.$route.query.id;
      that.titlename = that.$route.query.name;
      switch(that.turnId){
        case 1 : {
           //充值 
          that.posttype = 1;
          that.getUserWalletBill();
          break;
        }
        case 2 : {
          //提现
          that.posttype = 2;
          that.getUserWalletExchangeOrWithdrawalBill();
          break;
        }
        case 3 : {
          console.log(1111);
          that.posttype = 3;
          that.getUserWalletBill();
          break;
        }
        case 4 : {
          //兑换豆转币
          that.posttype = 1;
          that.getUserWalletExchangeOrWithdrawalBill();
          break;
        }
        case 5 : {
           that.posttype = 5;
          that.getUserWalletBill();
          break;
        }
      }
    },
    methods:{
        goback() {
          this.$router.push({ path: "/personalcenter/mypurse/livingacounttypes" });
        },
        //获取充值列表
        getUserWalletBill(){
          var that = this;
          that.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 200000
          }); 
          that.api.personalcenter.userWalletBill({
            // userId : that.$store.state.user.userid,
            userId : 2714,
            type : that.posttype,
            page : that.nextpage,
            item : 20
          }).then(res => {
              that.$toast.clear();
              that.listloading = false;
              if(!res.data.code)return;
              if(res.data.code == 1){
                if(res.data.data.list && res.data.data.list.length > 0){
                  that.nodatashow = false;
                  that.hasmorepage = 2;
                    res.data.data.list.forEach(e => {
                    that.rechargerecodeList.push(e);
                  });
                }
                that.nextpage = res.data.data.page;

                if(that.nextpage  != res.data.data.totalPage && res.data.data.totalPage != 0) {
                  that.listfinished = false;
                  that.listloading = false;
                  that.nextpage ++
                }else {
                  if(that.hasmorepage === 1){
                    that.nodatashow = true;
                  }else{
                    that.listloading = false;
                    that.finished_text = '亲~已经到底了';
                  }
                  that.listfinished = true;
                }
                that.$forceUpdate();
                that.$toast.clear();
              }
          });
        },
        //提现及豆转币
        getUserWalletExchangeOrWithdrawalBill(){
          var that = this;
          that.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 200000
          }); 
          that.api.personalcenter.userWalletExchangeOrWithdrawalBill({
            // userId : that.$store.state.user.userid,
            userId : 2714,
            type : that.posttype,
            page : that.nextpage_ii,
            item : 20
          }).then(res => {
              that.$toast.clear();
              that.listloading_ii = false;
              if(!res.data.code)return;
              if(res.data.code == 1){
                if(res.data.data.list && res.data.data.list.length > 0){
                  that.nodatashow = false;
                  that.hasmorepage = 2;
                    res.data.data.list.forEach(e => {
                    that.rechargerecodeList.push(e);
                  });
                }
                that.nextpage_ii = res.data.data.page;

                if(that.nextpage_ii  != res.data.data.totalPage && res.data.data.totalPage != 0) {
                  that.listfinished_ii = false;
                  that.listloading_ii = false;
                  that.nextpage_ii ++
                }else {
                  if(that.hasmorepage === 1){
                    that.nodatashow = true;
                  }else{
                    that.listloading_ii = false;
                    that.finished_text_ii = '亲~已经到底了';
                  }
                  that.listfinished_ii = true;
                }
                that.$forceUpdate();
                that.$toast.clear();
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
      .el-ul{
        .el-li{
          .search-time{
            display: inline-block;
            padding: .32rem 0 0 .39rem;
            font-size: .24rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(31,31,31,1);
          }
          .acount-list{
            padding: 0 .2rem;
            margin-top: .3rem;
            background:rgba(255,255,255,1);
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
                  right: .3rem;
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
    }  
  }  
</style>





