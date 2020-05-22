<template>
  <div class="order" :class="[orderlist.length>0?'listlength1':'listlength0']">
    <!-- 头部 -->
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>我的订单</span>
    </div>
    <div class="tab">
      <van-tabs v-model="active" >
        <van-tab :title="item.name"  :key="index" v-for="(item,index) in list" >
          <div class="tab-title" slot="title"  @click="tabindex(item.tabid)" >{{item.name}}</div>
          <van-list class="video-content" v-model="listloading" :finished="listfinished"  :finished-text="finishedText"  :error.sync="vanerror" error-text="请求失败，点击重新加载"
            :offset="10"
            @load="tabListInfo"
            v-if="!serviceorderlist_show"
          >
            <!-- 订单有内容 -->
            <div @click.stop="checkorder(item,index)" class="order_body" v-for="(item,index) in orderlist" :key="index"  v-show="orderlist.length>0">
              <div class="wares_list clearfix">
                <div class="time">
                  <div class="time_center">
                    <div class="lt">
                      <span class="icon-shops"><img src="../../../../assets/imgs/shopcart/icon-shops.png" alt /></span>
                      <span class="t">{{item.order.shopName}}</span>
                  <!-- <img style="margin-left:3px;" src="../../../assets/imgs/icons/dd-gengd@2x.png" alt=""> -->
                      <!-- <img style="margin-left:3px;" v-if="item.order.shopLogo" :src="item.order.shopLogo"> -->
                      <span class="gd"><img src="../../../../assets/imgs/follow/xiangqing@2x.png" alt /></span>
                    </div>
                    <p class="rt">{{item.order.status==0?'待付款':item.order.status==1?'待发货':item.order.status==2?'已发货':item.order.status==3?'已完成':item.order.status==4?'已关闭':item.order.status==70?'退款中':item.order.status==71?'交易关闭':''}}</p>
                  </div>
                </div>
                <div class="wares_list_center clearfix" v-for="(items,index) in item.orderItemList" :key="index" >
                  <span class="m">
                    <img :src="items.productPic" alt />
                  </span>
                  <div class="wares_list_right">
                    <p class="wares_list_right_p _txtov2">
                      {{items.productName}}
                    </p>
                    <span class="warns_price"><span class="ic">￥</span>{{items.productPrice}}</span>
                    <span class="warns_num">X {{items.productQuantity}}</span>
                    <div class="warns_tab">{{items.productAttr}}</div>
                    <div class="warns_tui"><p class="warns_text_info">支持七天无理由退货</p></div>
                  </div>
                  <div class="warns_tab1"><span class="n">共{{item.order.totalQuantity}}件</span> 应付总额：￥{{item.order.payAmount}}</div>
                  <div style="font-size:.22rem;color:rgba(153,153,153,1);text-align: right;margin-top:.15rem;" v-if='item.order.status==2||item.order.status==3' >{{item.order.deliveryCompany}}运单号:{{item.order.deliverySn}}</div>
                  <div class="warns_tab2" v-if="item.order.status==0">
                    <div class="quxiao" @click.stop="gocancel(item.order.uid)">取消订单</div>
                    <div class="pay" @click.stop="gopaymoney(item)">立即付款</div>
                  </div>
                  <div class="warns_tab2" v-if="item.order.status==1">
                    <div @click.stop="sendtips" class="pay">提醒发货</div>
                  </div>
                  <div class="warns_tab2" v-if="item.order.status==2">
                    <div class="pay" @click.stop='checkwl(item.order)'>查看物流</div>
                    <div class="pay" @click.stop='confirmgetgoods(item.order)'>确认收货</div>
                    <!-- <div class="pay" @click.stop='affirmGoods(item.order)'>确认收货</div> -->
                  </div>
                  <div class="warns_tab2" v-if="item.order.status==3||item.order.status==4||item.order.status==71">
                    <div class="quxiao" @click.stop="removeOrder4C(item.order.uid)">删除订单</div>
                  </div>
                  <div class="warns_tab2" v-if="item.order.status==7">
                    <div class="quxiao" @click.stop="orderReturnmoney(item,item.order.uid)">退款</div>
                  </div>
                  <div class="warns_tab2" v-if="item.order.status==6">
                    <div class="quxiao" @click.stop="orderReturn(items,item.order.uid)">退货</div>
                  </div>
                </div>  
              </div>
            </div>
          </van-list>
          <!-- 退货退款订单回显内容 -->
           <van-list class="video-content" v-model="servicelistloading" :finished="servicelistfinished"  :finished-text="servicefinishedText" :error.sync="servicevanerror" error-text="请求失败，点击重新加载"
            :offset="10"
            @load="shouhouInfo"
            v-if="serviceorderlist_show"
          >
          
            <div @click.stop="checkorder(item,index)" class="order_body" v-for="(item,index) in serviceorderlist" :key="index"  v-show="serviceorderlist.length>0 && serviceorderlist_show">
              <div class="wares_list clearfix">
                <div class="time">
                  <div class="time_center">
                    <div class="lt">
                      <span class="icon-shops"><img src="../../../../assets/imgs/shopcart/icon-shops.png" alt /></span>
                      <span class="t">{{item.rorder.shopName}}</span>
                  <!-- <img style="margin-left:3px;" src="../../../assets/imgs/icons/dd-gengd@2x.png" alt=""> -->
                      <!-- <img style="margin-left:3px;" v-if="item.order.shopLogo" :src="item.order.shopLogo"> -->
                      <span class="gd"><img src="../../../../assets/imgs/follow/xiangqing@2x.png" alt /></span>
                    </div>
                    <p class="rt">{{item.rorder.type==0?'退款':item.rorder.type==1?'退货':''}}</p>
                   </div>
                </div>
                <div class="wares_list_center clearfix" v-for="(items,index) in item.items" :key="index" >
                  <span class="m">
                    <img :src="items.productPic" alt />
                  </span>
                  <div class="wares_list_right">
                    <p class="wares_list_right_p _txtov2">
                      {{items.productName}}
                    </p>
                    <span class="warns_price"><span class="ic">￥</span>{{items.productPrice}}</span>
                    <span class="warns_num">X {{items.productQuantity}}</span>
                    <div class="warns_tab">{{items.productAttr}}</div>
                    <div class="warns_tui"><p class="warns_text_info">支持七天无理由退货</p></div>
                  </div>
                  <div class="warns_tab1"><span class="n">共{{item.rorder.productCount}}件</span> 应付总额：￥{{item.rorder.productPrice}}</div>
                  <div class="warns_tab2" @click.stop="gomakethat(item)">
                    <div class="pay pay-gray" v-if="item.rorder.status==0">待处理</div>
                    <div class="pay" v-if="item.rorder.status==1">待发货</div>
                    <div class="pay" v-if="item.rorder.status==2">待收货</div>
                    <div class="pay" v-if="item.rorder.status==3">已同意</div>
                    <div class="pay" v-if="item.rorder.status==4">已完成</div>
                    <div class="pay" v-if="item.rorder.status==5">已拒绝</div>
                  </div>
                  <div class="warns_tab2">
                    <div class="pay" @click.stop="goreturndetail(item)">查看进度</div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
          <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
          <!-- 取消原因弹窗 -->
          <div class="returnyytc" v-if="thyyshow">
            <div class="returnyytc-inner">
              <div class="yytctit">请选择退货原因</div>
              <div class="yytctit__list" v-for="(item,index) in becauseList" :key=index  @click="select(index,item.name)">
                <div style=" display: flex;
                  justify-content: space-between;
                  align-items: center;">{{item.name}}
                  <img style="width:0.3rem;height:0.3rem;" :src="index==activebecause ? require('../img/return-select.png') : require('../img/return-unselect.png')" alt />
                  </div>
                <div style="font-size: .22rem;margin-top:.2rem;color: rgba(153,153,153,1);">{{item.platf_description}}</div>
              </div>
              <div class="yytctit_operation">
              <div class="yytctit__close close" @click="thyyshow=false">暂不取消</div>
              <div class="yytctit__close" @click="closeOrder()">确认取消</div>
              </div>
            </div>
          </div>

           <!-- 物流信息弹窗 -->
          <div class="returnyytc" v-if="wuliu_comfrom_show">
            <div class="wuliumsg-inner">
              <div class="kuaidi">快递名称：<span>{{wuliu_kuaidi_name}}</span> </div>
              <div class="kuaidi">运单号码：<span ref="kuaidimsg">{{wuliu_kuaidi_num}}</span> <span><span class="ic-fz" @click="copy_kuaidi_msg(wuliu_kuaidi_num)"><img src="../../../../assets/imgs/personal/orderfz.png" alt /></span></span> </div>
              <span class="btn-wl" @click="wuliu_comfrom_close">确认</span>
            </div>
          </div>

        </van-tab>
      </van-tabs>
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
    Toast
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import { copy } from "@/utils/copy.js";
import {
  setsessionStorage,
  getsessionStorage
} from "./../../../../utils/index.js";
import nodata from './../../../../components/nodata.vue'
// import base from "@/api/base.js";
// import axios from "axios";
export default {
  components: {
    nodata,
    vanTab : Tab,
    vanTabs : Tabs,
    vanList : List,
    vanToast : Toast  
  },
  data() {
    return {
      pagetypedata:"orderdata", //无订单时显示
      thyyshow: false,
      active: 0, //选中的tab下标
      status: 0,
      nodatashow : false,
      list: [
        {
          name: "全部",
          tabid: 0
        },
        {
          name: "待付款",
          tabid: 1
        },
        {
          name: "待发货",
          tabid: 2
        },
        {
          name: "待收货",
          tabid: 3
        },
        {
          name: "已完成",
          tabid: 4
        },
        {
          name: "售后",
          tabid: 5
        }
      ],
      orderlist: [],
      listloading: false, //默认是加载中。。。
      finishedText: "",
      listfinished: false,
      vanerror: false,
      nextPage: '',
      serviceorderlist: [],
      serviceorderlist_show : false,
      servicelistloading: false, //默认是加载中。。。
      servicefinishedText: "",
      servicelistfinished: false,
      servicevanerror: false,
      servicenextPage: '',
      becauseList: [],
      name: "", //取消原因namem
      activebecause: 0,
      closeId: "", //取消订单id
      wuliu_comfrom_show : false,
      wuliu_kuaidi_name : '', //物流快弟名称
      wuliu_kuaidi_num : '', 
      hasmorepage : 1 // 1为默认没数据，2为经过下拉后无数据显示无更多
    };
  },
  computed: {},
  watch: {
    
  },
  methods: {
    // 查看订单详情页
    checkorder(orderdata) {
      let that = this;
      let tabid = Number(this.$route.query.tabid);
      if(that.serviceorderlist_show){
        console.log(orderdata.items[0].productSkuId);
        // //售后跳转商品详情
        this.$router.push({
          name: "productdetails",
          params: {
            product_id: orderdata.items[0].productSkuId,
            webtype: 1
          }
        });
      }else{
        //跳详情
        var lastordermsg = {
            'amont' : orderdata.order.payAmount,
            'orderId' : orderdata.order.uid,
            'tabid' : this.$route.query.tabid
        }
        setsessionStorage("lastpaymsg",lastordermsg);

        localStorage.setItem(
          "confirmpageorder",
          JSON.stringify({
            payfundata: {
              amont : orderdata.order.payAmount,
              orderId : orderdata.order.uid
            },
            payfundatastatus: ""
            // paytype: that.paytypedata.currentindex
          })
        );

        this.$router.push({
          path: "/personalcenter/order/orderdetails",
          query: {
            orderId: orderdata.order.uid,
            tabid : tabid
          }
        });
      }
    },
    // 进入商城首页
    gotoshop() {
      this.$router.push({ name: "shopindex" });
    },
    //选择取消原因
    select(index, name) {
      this.activebecause = index;
      this.name = name;
    },
    //取消订单
    closeOrder() {
      let zs = this;
      zs.$toast.loading({
        // message:'正在取消订单',
        duration: 30000
      });
      console.log(zs.closeId);
      console.log(zs.$store.state.user.userid);
      console.log(zs.name);
      zs.api.personalcenter
        .getcancleorder(zs.closeId, "H5", zs.$store.state.user.userid, zs.name)
        .then(res => {
          if (res.data.code == 1) {
            zs.$toast.clear();
            zs.thyyshow = false;
            // zs.tabListInfo();
            window.location.reload();
          }
        })
    },
    // 删除订单
    removeOrder4C(orderId) {
      let confirm = window.confirm("确定要删除订单吗?");
      if (confirm) {
        let zs = this;
        zs.$toast.loading({
          // message:'正在取消订单',
          duration: 30000
        });
        this.api.personalcenter
          .removeOrder4C({
            orderId: orderId,
            userId: zs.$store.state.user.userid
          })
          .then(res => {
            console.log(res.data.code);
            if (res.data.code == 1) {
              zs.$toast.clear();
              zs.$toast("订单删除成功");
              // zs.tabListInfo();
              window.location.reload();
            } else {
              zs.$toast.clear();
              zs.$toast(res.data.info);
            }
          })
      }
    },
    //原因列表
    cause() {
      let that = this;
      this.api.returngoods.cancleReason({ type: 0 }).then(data => {
        if (data.data.code == 1) {
          that.becauseList = data.data.data;
          // this.name = this.becauseList[0].name;
        }
      });
    },
    //确认收获
    // affirmGoods(item) {
    confirmgetgoods(item) {
      let confirm = window.confirm("确认收货吗?");
      if (confirm) {
        let zs = this;
        zs.$toast.loading({
          // message:'正在取消订单',
          duration: 30000
        });
        this.api.personalcenter
          .affirmGoods({
            orderId: item.uid,
            userId: zs.$store.state.user.userid,
            sourceType: 3
          })
          .then(res => {
            if (res.data.code == 1) {
              zs.$toast.clear();
              zs.$toast("确认成功");
              // zs.tabListInfo();
              window.location.reload();
            } else {
              zs.$toast.clear();
              zs.$toast(res.data.info);
            }
          })
      }
    },
    // 查看物流弹层打开
    checkwl(item_order) {
      var that = this;
      that.wuliu_comfrom_show = true;
      that.wuliu_kuaidi_name = item_order.deliveryCompany;
      that.wuliu_kuaidi_num = item_order.deliverySn;
    },
    //关闭查看物流弹层
    wuliu_comfrom_close(){
      this.wuliu_comfrom_show = false;
    },
    //复制快递单号：
    copy_kuaidi_msg(item){
      copy(item);
      this.$toast("已复制");
    },
    // 提醒发货
    sendtips() {
      this.$toast("提醒成功..");
    },
    // 取消订单
    gocancel(uid) {
      this.closeId = uid;
      this.thyyshow = true;
      // this.api.personalcenter
      //   .getcancleorder(orderid, "H5", this.$store.state.user.userid)
      //   .then(res => {
      //     console.log(res);
      //   });
    },
    //售后查看详情跳转
    goreturndetail(item){
      this.$router.push({
        path: "/returngoods/check",
        query: {
          uid: item.rorder.uid
        }
      });
    },
    //点击待处理跳转
    gomakethat(item){
      this.$router.push({
        path: "/returngoods/history",
        query: {
          uid: item.rorder.uid
        }
      });
    },
    //立即付款
    gopaymoney(item){
      let tabid = this.$route.query.tabid;
      var lastordermsg = {
          'amont' : item.order.payAmount,
          'orderId' : item.order.uid,
          'tabid' : tabid
      }
      localStorage.setItem(
        "confirmpageorder",
        JSON.stringify({
          payfundata: {
            amont : item.order.payAmount,
            orderId : item.order.uid
          },
          payfundatastatus: ""
          // paytype: that.paytypedata.currentindex
        })
      );
      console.log(item.order.orderSn);
      setsessionStorage("lastpaymsg",lastordermsg);
      this.$router.push({path:'/shop/paypage',query:{type: 'orderindex'}});
    },
    //退货跳转
    orderReturn(item, uid) {
      this.$router.push({
        path: "/returngoods/apply",
        query: {
          uid: uid,
          details: JSON.stringify(item)
        }
      });
    },
    //跳转退款页
    orderReturnmoney(item, uid){
      this.$router.push({
        path: "/returngoods/applymoney",
        query: {
          uid: uid,
          tabid : this.active,
          details: JSON.stringify(item)
        }
      });
    },
    goback() {
      this.$router.push({ path: "/personalcenter/index" });
    },
    // 页面数据请求与渲染
    tabListInfo() {
      let that = this;
      // 点击tab事件触发的加载
        that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });
    that.api.personalcenter
      .getpageorders(that.$store.state.user.userid,(that.active - 1), that.nextPage)
      .then(res => {
        // console.log(res.data.data.orders);
        that.$toast.clear();
        that.listloading = false;
        if(res.data.code == 1){
          if (res.data.data.orders && res.data.data.orders.length > 0) {
            // debugger;
            that.nodatashow = false;
            that.hasmorepage = 2;
            res.data.data.orders.forEach(e => {
              that.orderlist.push(e);
            });
          } 
          that.nextPage = res.data.data.nextPage;
          // debugger;
          if (that.nextPage != "") {
            that.listfinished = false;
            that.listloading = false;
          } 
          else {
            if(that.hasmorepage === 1){
              that.nodatashow = true;
            }else{
              that.listloading = false;
              that.finishedText = '亲~已经到底了';
            }
            that.listfinished = true;
          }
          that.$forceUpdate();
          that.$toast.clear();
        }else{
          that.$toast(res.data.info);
        }
      })
  
    },
    // 售后数据请求与渲染
    shouhouInfo() {
      let that = this;
        that.$toast.loading({
          message: "加载中...",
          duration: 200000
        });
    that.api.personalcenter
      .getaftersale({  
        userId : that.$store.state.user.userid,
        nextPage : that.servicenextPage
      })
      .then(res => {
        // console.log(res.data.data.rorders);
        that.servicelistloading = false;
        that.$toast.clear();
        if (res.data.data.rorders && res.data.data.rorders.length > 0) {
          // debugger;
          that.nodatashow = false;
          that.hasmorepage = 2;
          res.data.data.rorders.forEach(e => {
            that.serviceorderlist.push(e);
          });
        }
        that.servicenextPage = res.data.data.nextPage;
        // debugger;
        if (that.servicenextPage != "") {
          that.servicelistfinished = false;
          that.servicelistloading = false;
        } else {
          if(that.hasmorepage === 1){
              that.nodatashow = true;
          }else{
            that.servicelistloading = false;
            that.servicefinishedText = '亲~已经到底了';
          }
          that.servicelistfinished = true;  
        }
        that.$forceUpdate();
        that.$toast.clear();
      })
  
    },
    // tab点击事件 及 回调 tabListInfo
    tabindex(index) {
      let that = this;
      this.active = index;
      this.nextPage = 0;
      that.servicenextPage = 0;
      this.orderlist = [];
      this.serviceorderlist = [];
      this.nodatashow = false;
      that.finishedText = '';
      that.servicefinishedText = '';
      that.listloading = false;
      that.servicelistloading = false;
      that.hasmorepage = 1;
      this.$router.push({
        path: "/personalcenter/order/index?tabid=" + index
      });

      if(this.active == 5){
        //售后
        this.serviceorderlist_show = true;
        this.shouhouInfo(); 
      }else{
        this.serviceorderlist_show = false;
        this.tabListInfo();
      }
      
    }
  },
  mounted() {
    // console.log(this.$route.query.tabid);
    // debugger;
    if (this.$route.query.tabid != undefined) {
      let that = this;
      let tabid = Number(this.$route.query.tabid);
      that.active = tabid;
      that.cause();
      if(this.active == 5){
        //售后
        this.serviceorderlist_show = true;
        this.shouhouInfo(); 
      }else{
        this.serviceorderlist_show = false;
        this.tabListInfo();
      }
    }
    //移除订单详情页的数据存储
    window.localStorage.removeItem("confirmpageorder_orderdetails");
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
  },
  beforeDestroy() {
    document.querySelector('body').setAttribute('style', '')
  },
};
</script>
<style lang="less">
@import "./css/index.less";
</style>
<style lang="css">
.order .tab {
  padding-top: 1.15rem;
}
.order .van-tabs {
  /* margin-top: .2rem; */
}
.order .van-tabs--line .van-tabs__wrap{
  height: .58rem;
}
.order .tab .van-tab{
  line-height: .38rem;
  font-size: 0.26rem;
}
.order .van-tab--active  .tab-title{
  color: rgba(255, 189, 4, 1);
  font-size: .36rem;
  font-weight:bold;
  font-family:PingFang SC;
}
.order .tab .van-tabs__line{
  top:  .51rem;
}

.order [class*=van-hairline]::after{
  border-width : 0;
}
.order .tab .van-tabs__wrap--scrollable .van-tab {
  background: rgba(243, 243, 243, 1);
  color: black;
  flex-basis: 16.666% !important;
}
.order .order_body .wares_list {
  margin-top: 0.2rem;
}
.order .tab .van-tabs__wrap--scrollable .van-tab {
  background: #fff;
}
.order .isActive {
  color: red;
  font-size: 20px !important;
}
.order .van-tabs__line{
  width: .3rem !important;
  background:rgba(255,189,4,1);
}
.order .van-tabs__nav--line{
  padding-bottom: 0;
}
.order .van-tabs__content{
  margin-top: .2rem;
}
.order .van-toast--html, .van-toast--text{
 z-index: 10001 !important;
}
</style>