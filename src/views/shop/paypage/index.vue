<!-- 组件说明 -->
<template>
  <div class="confirmorderwrap">
    <div class="header clearfix">
      <img
        @click="goprevpage"
        style="transform:rotate(180deg);"
        src="./../../../assets/imgs/icons/sp-gengduo@2x.png"
        alt
      />
      <p>在线支付</p>
    </div>
    <div class="containerwrap">
      <!-- 支付方式  平安银行支付 微信支付 支付宝支付-->
        <div class="paytypebox clearfix">
          <div class="payamount">
              <span class="sm">￥</span>
              <span>{{lastpaymsg.amont.toFixed(2)}}</span>
          </div>
          <div class="paytype clearfix" v-for="(item,index) in paytypedata.arr" :key="index">
            <div class="left">
              <img :src="item.logo" alt="抓周">
              <div class="content">
                <p>{{item.name}}</p>
                <span>{{item.title}}</span>
              </div>
            </div>
            <div class="right" @click="selectpaytype(index)">
             <img style="width:0.3rem;height:0.3rem;" :src="paytypedata.currentindex==index? require('./../../../assets/imgs/personal/return-select.png'):require('./../../../assets/imgs/personal/return-unselect.png')" alt />
            </div>
          </div>
        </div>
        <div class="wrap-paybtn" >
          <span class="paybtnbegin" @click="payfun">使用{{checked_paytype}}</span>
        </div>
    </div>
    <!-- 查看支付状态 -->
    <div class="confirmboxmb" v-if="confirmboxmbstatus" @click.stop="confirmboxmbclose">
      <div class="confirmbox" @click.stop="stopfn">
        <p>请确认支付是否已完成</p>
        <p @click.stop="confirmcheck" class="confirm">已完成支付</p>
        <span @click.stop="payagain">支付遇到问题，重新支付</span>
        <span @click.stop="paycancel">取消支付</span>
      </div>
    </div>

  </div>
</template>

<script>
// import base from "@/api/base.js"; // 导入接口域名列表
// import axios from "axios";
import {
  setsessionStorage,
  getsessionStorage,
  getlocalStorage
} from "./../../../utils/index.js";
// import { constants } from 'fs';
//import x from ''
export default {
  components: {},
  data() {
    return {
      userID:'',
      // paytype 支付方式数据
      lastpaymsg : {
        amont : 0
      },
      paytypedata:{
        currentindex:0,
        arr:[
          {
            name: "支付宝支付",
            title: "支付宝安全支付",
            logo: require("./../../../assets/imgs/icons/dd-qzf-zhifub@2x.png"),
            payType: 1
          },
          {
            name: "微信支付",
            title: "微信安全支付",
            logo: require("./../../../assets/imgs/icons/dd-qzf-weixin@2x.png"),
            payType: 2
          }
          // {
          //   name:'银联支付',
          //   title:'银联安全支付',
          //   logo:require('./../../../assets/logo.png'),
          //   payType:3,
          // },
          // {
          //   name:'平安银行支付',
          //   title:'平安银行安全支付',
          //   logo:require('./../../../assets/logo.png'),
          //   payType:4,
          // },
        ]
      },
      checked_paytype : '支付宝支付',
      confirmpageorder:{
        payfundata:{
          amont:''
        }
      },//订单数据
      addressdata:'',//地址数据
      paystatus:'',//订单是否完成状态
      confirmboxmbstatus: false, //支付状态模板
    };
  },
  computed: {
  },
   mounted() {
    let that = this;
    that.userID = that.$store.state.user.userid;
    this.confirmpageorder= getlocalStorage('confirmpageorder');
    this.addressdata = getsessionStorage("checkaddressitem");
    this.paystatus = getsessionStorage('paystatus');
    
    that.lastpaymsg = getsessionStorage('lastpaymsg');

    that.timeinterval = setInterval(() => {
      that.checkpayfundatastatus();
      if (that.confirmboxmbstatus) {
        window.clearInterval(that.timeinterval);
        that.timeinterval = null;
      } else if (!JSON.parse(localStorage.getItem("confirmpageorder"))) {
        // window.clearInterval(that.timeinterval);
        // that.timeinterval=null;
      }
    }, 450);
    
  },
  methods: {
    // 支付方式选择事件 支付方式：1->支付宝；2->微信；3->银联；4->????
    selectpaytype(index) {
      let that = this;
      that.paytypedata.currentindex = index;
      console.log('支付方式为:'+that.paytypedata.arr[index].name);
      that.checked_paytype = that.paytypedata.arr[index].name;
    },
    //最后支付
     // 支付接口
    payfun() {
      let that = this,
      amont = that.lastpaymsg.amont,
      orderId = that.lastpaymsg.orderId;
      that.$toast.loading({
        // message:'',
        duration: 0
      });
      // 支付方式：1->支付宝；2->微信；3->银联；4->平安银行????
      if (that.paytypedata.currentindex == 0) {
        // this.confirmboxmbstatus = true;//确认支付是否已完成的弹窗
        that.api.shopcart
          .aliprepay({
            uid: that.$store.state.user.userid,
            amont,
            // amont:0.01,
            orderId
          })
          .then(res => {
            that.$toast.clear();
            // debugger;
            localStorage.setItem(
              "confirmpageorder",
              JSON.stringify({
                payfundata: {
                  amont,
                  orderId
                },
                payfundatastatus: "paying",
                paytype: that.paytypedata.currentindex
              })
            );
            let zfbdom = res.data;
            // that.$refs.zfbdom.innerHtml=zfbdom;
            const payDiv = document.getElementById("payDiv");
            if (payDiv) {
              document.body.removeChild(payDiv);
            }
            const div = document.createElement("div");
            div.id = "payDiv";
            // alert(zfbdom);
            div.innerHTML = zfbdom;
            document.body.appendChild(div);
            document
              .getElementById("payDiv")
              .getElementsByTagName("form")[0]
              .submit();
            // alert('支付成功');
            // that.$router.push({path:'/shop/olpay',query:{paystatus:true,orderdata:'orderdatasuccess'}});
          })
          .catch(err => {
            that.$toast.clear();
            if (window.confirm("拉起支付宝支付失败，是否重试?")) {
              that.payfun();
            } else {
              that.paycancel();
            }
            // that.$router.push({path:'/shop/olpay',query:{paystatus:false,orderdata:'orderdatafailed'}});
          });
      } else {
        // alert('暂时只接入支付宝支付');
        if (
          window.confirm("支付宝之外的是否成功拉起了支付？？(成功与否不考虑)")
        ) {
          localStorage.setItem(
            "confirmpageorder",
            JSON.stringify({
              payfundata: {
                amont,
                orderId
              },
              payfundatastatus: "paying",
              paytype: that.paytypedata.currentindex
            })
          );
        }
      }
    },
    // 蒙版点击关闭事件2  取消此功能
    confirmboxmbclose() {
      return;
      // this.confirmboxmbstatus = false;
    },
    //  支付弹窗相关 接口
    //查看订单是否支付成功
    confirmcheck() {
      let confirmpageorderdata = JSON.parse(
        localStorage.getItem("confirmpageorder")
      );
      this.checkorderstatus(
        confirmpageorderdata.payfundata.orderId,
        confirmpageorderdata.payfundata.amont
      );
    },
    // 查询一下订单支付状态接口
    checkorderstatus(order, amont) {
      let that = this;
      // console.log(orderId);
      this.api.shopcart
        .paystatus({
          uid: that.$store.state.user.userid,
          order
          // amont,
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            // 0为未 成功 付款
            if (res.data.data == 0) {
              that.$toast("支付未成功。请重试");
            } else if (res.data.data == 1) {
              // 1为 成功 付款
              setsessionStorage("paystatus", true);
              that.$router.push({ path: "/shop/olpay" });
            }
          }
        })
    },
    // 再次支付
    payagain() {
      let confirmpageorderdata = JSON.parse(
        localStorage.getItem("confirmpageorder")
      );
      this.payfun(
        confirmpageorderdata.payfundata.amont,
        confirmpageorderdata.payfundata.orderId
      );
    },
    //取消支付
    paycancel() {
      this.confirmboxmbstatus = false;
      this.$router.push({ path: "/shop/olpay" });
      setsessionStorage("paystatus", false);
    },
    //查看此订单 是否 拉起过 支付事件
    checkpayfundatastatus() {
      let that = this;
      let confirmpageorderdata = JSON.parse(
        localStorage.getItem("confirmpageorder")
      );
      if (!confirmpageorderdata) {
        // console.log("confirmpageorderdata 无数据");
        window.clearInterval(that.timeinterval);
        that.timeinterval = "";
      } else {
        if (confirmpageorderdata.payfundatastatus == "paying") {
          that.confirmboxmbstatus = true;
          that.paytypedata.currentindex = confirmpageorderdata.paytype;
        }else{
          that.confirmboxmbstatus = false;
        }
      }
    },
    goprevpage(){
      let that = this;
      let type = that.$route.query.type,
          tabid = that.lastpaymsg.tabid,
          orderId = that.lastpaymsg.orderId;
      if(type == 'orderdetails'){
        this.$router.push({
          path:'/personalcenter/order/orderdetails',
          query:{
            orderId :  orderId,
            tabid : tabid
          }
        });
      }else if(type == 'orderindex'){
        this.$router.push({path:'/personalcenter/order/index',
          query:{
            tabid : tabid
          }
        });
      }else{
        this.$router.push({path:'/shop/confirmorder'});
      }
      
    },
    // 查看订单页 ==>>目前调列表页
    checkorder(){
      this.$router.push({path:'/order',query:{tabid:0}});
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
@import url("./css/index.less");
</style>

<style lang='less'>
//@import url()
</style>