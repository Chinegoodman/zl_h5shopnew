<!-- 组件说明 -->
<template>
    <div class="wrap">
        <!-- 头部 返回按钮及标题 -->
        <div class="header">
            <img class="back" @click="goback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
            <span>订单详情</span>
        </div>
        <!-- 正式内容 -->
        <div class="container" v-show="pageshow">
          <!-- 订单状态 -->
          <!-- 未付款 -->
          <div class="orderstatus" v-if="orderStatuscode==0">
            <p>等待买家付款</p>
            <!-- <div>需支付&nbsp;&nbsp;&nbsp;剩<span></span>后自动关闭</div> -->
            <!-- <span v-if="fymx_item007.type==6" v-for="(fymx_item007,fymx_index007) in fymx_item.content" :key="fymx_index007+'lizj'">需支付 ￥{{fymx_item007.value.toFixed(2)}}&nbsp;&nbsp;&nbsp;剩<span></span>后自动关闭</span> -->
          </div>
          <!-- 待发货 -->
          <div class="orderstatus" v-if="orderStatuscode==1">
            <p>等待卖家发货</p>
            <!-- <span v-if="fymx_item007.type==6" v-for="(fymx_item007,fymx_index007) in fymx_item.content" :key="fymx_index007+'lizj'">需支付 ￥{{fymx_item007.value.toFixed(2)}}&nbsp;&nbsp;&nbsp;下单15分钟后自动关闭</span> -->
          </div>
          <!-- 待收货 -->
          <div class="orderstatus" v-if="orderStatuscode==2">
            <p>等待买家收货</p>
            <!-- <span v-if="fymx_item007.type==6" v-for="(fymx_item007,fymx_index007) in fymx_item.content" :key="fymx_index007+'lizj'">需支付 ￥{{fymx_item007.value.toFixed(2)}}&nbsp;&nbsp;&nbsp;下单15分钟后自动关闭</span> -->
          </div>
          <!-- 已完成 -->
          <div class="orderstatus" v-if="orderStatuscode==3">
            <p>订单已完成</p>
            <!-- <span v-if="fymx_item007.type==6" v-for="(fymx_item007,fymx_index007) in fymx_item.content" :key="fymx_index007+'lizj'">需支付 ￥{{fymx_item007.value.toFixed(2)}}&nbsp;&nbsp;&nbsp;下单15分钟后自动关闭</span> -->
          </div>
          <!-- 已关闭 -->
          <div class="orderstatus" v-if="orderStatuscode==4">
            <p>订单已关闭</p>
            <!-- <span v-if="fymx_item007.type==6" v-for="(fymx_item007,fymx_index007) in fymx_item.content" :key="fymx_index007+'lizj'">需支付 ￥{{fymx_item007.value.toFixed(2)}}&nbsp;&nbsp;&nbsp;下单15分钟后自动关闭</span> -->
          </div>
          <!-- 退款中 -->
          <div class="orderstatus" v-if="orderStatuscode==70">
            <p>退款正在处理中</p>
            <!-- <span v-if="fymx_item007.type==6" v-for="(fymx_item007,fymx_index007) in fymx_item.content" :key="fymx_index007+'lizj'">需支付 ￥{{fymx_item007.value.toFixed(2)}}&nbsp;&nbsp;&nbsp;下单15分钟后自动关闭</span> -->
          </div>
          <!-- 交易关闭 -->
          <div class="orderstatus" v-if="orderStatuscode==71">
            <p>交易已关闭</p>
            <!-- <span v-if="fymx_item007.type==6" v-for="(fymx_item007,fymx_index007) in fymx_item.content" :key="fymx_index007+'lizj'">需支付 ￥{{fymx_item007.value.toFixed(2)}}&nbsp;&nbsp;&nbsp;下单15分钟后自动关闭</span> -->
          </div>


          <!-- 配送地址 -->
          <div class="address clearfix">
            <img src="./../../../assets/imgs/icons/dd-shoujr-l@2x.png" alt />
            <div class="content">
              <div class="top clearfix">
                <span class="name">{{addressdata.reciverName}}</span>
                <span class="phone">{{addressdata.reciverPhone}}</span>
                <!-- <span class="tags red">收件人</span> -->
                <!-- <span class="tags default" v-show="addressdata.is_default==1">默认</span> -->
              </div>
              <div class="details _txtov2">
                <!-- {{addressdata.province+' '+addressdata.city+' '+addressdata.area+' '+addressdata.street+' '+addressdata.address}} -->
                {{addressdata.address}}
              </div>
            </div>
          </div>

          <!-- 商品数据及支付方式和配送方式 -->
          <div class="product_paytype_transptype">
            <!-- <div class="product clearfix" v-for="(item,index) in listshow" :key="index"> -->
            <div class="product clearfix">
              <div class="shopnamebox clearfix">
                <div class="shopicon">
                  <!-- <img :src="pagedata.shopIcon" alt /> -->
                  <img :src="pagedata.shopLogo?pagedata.shopLogo:default_img_shoplogo" alt />
                </div>
                <span class="shopname">{{pagedata.shopName}}</span>
              </div>
              <div class="goodbox clearfix" v-for="(iteminner,indexs) in pagedata.items" :key="indexs">
                <img :src="iteminner.productPic" alt="商品" />
                <div class="details">
                  <p class="title _txtov2">{{iteminner.productName}}</p>
                  <div class="options _txtov1">{{iteminner.productAttr}}</div>
                  <!-- <p class="tips">不支持七天无理由退货</p> -->
                </div>
                <div class="price_number">
                  <p>￥{{iteminner.productPrice}}</p>
                  <span>x{{iteminner.productQuantity}}</span>
                </div>
              </div>

              <!-- 费用明细 -->
              <div class="paydetails">
                <!-- <div class="paydetails" v-if="fymx_item.shopId == item.shopId" v-for="(fymx_item,fymx_index) in fymx_listdata" :key="fymx_index+'title'"> -->
                <a href="http://web.zhulihr.com/fysm.html" target="_blank">
                  <div class="title clearfix">
                    <p v-if="fymx_item2.type==0" v-for="(fymx_item2,fymx_index2) in fymx_item.content" :key="fymx_index2">{{fymx_item2.caption}}</p>
                    <img src="./../../../assets/imgs/icons/dd-wenda@2x.png" al="抓周" />
                  </div>
                </a>
                <div class="pd_list">
                  <!-- 配送方式 -->
                  <div class="li peisong" v-if="fymx_item20.type==1" v-for="(fymx_item20,fymx_index20) in fymx_item.content" :key="'peisong'+fymx_index20">
                    <p class="commontitle">{{fymx_item20.caption}}</p>
                    <div class="li_price">{{fymx_item20.display}}</div>
                    <div class="peisongsmall">
                      {{fymx_item20.detail}}<mark class="m">￥{{fymx_item20.value}}</mark>
                    </div>
                  </div>
                  <!-- <div class="li" v-if="!freightstatus">
                    <p class="commontitle">快递费</p>
                    <div class="li_price" style="color:red;">请先选择顶部的收货地址</div>
                  </div> -->
                  <!-- <div class="li" v-else> -->
                  <!-- <div class="li" v-if="fymx_item202.type==1" v-for="(fymx_item202,fymx_index202) in fymx_item.content" :key="fymx_index202+'peisong'">
                    <p class="commontitle">快递费(含保价费)</p>
                    <div class="li_price">￥{{fymx_item202.value}}</div>
                  </div> -->

                  <div class="li" v-if="fymx_item23.type==3" v-for="(fymx_item23,fymx_index23) in fymx_item.content" :key="fymx_index23+'libz'">
                    <p class="commontitle">{{fymx_item23.caption}}</p>
                    <!-- <span>{{index}}</span> -->
                    <span class="checkshowtxt">
                      {{fymx_item23.detail}}
                      <!-- <span v-if="fymx_item23.value!=0" style="float:none;margin:0;color:red;">&nbsp;￥{{fymx_item23.value}}</span> -->
                    </span>

                      
                    <!-- <span class="checkshowtxt">{{fymx_item23.detailName}}<span v-if="fymx_item23.price!=0" style="float:none;margin:0;color:red;">&nbsp;￥{{fymx_item23.price}}</span></span> -->
                    <!-- <div class="checkboxwrap" @click="switchchange(index,fymx_index)">
                      <span class="radio" :class="{left:!listshow[index].order.isPackagestatus,right:listshow[index].order.isPackagestatus}"></span>
                    </div> -->

                  </div>
                  <div class="li" v-if="fymx_item24.type==4" v-for="(fymx_item24,fymx_index24) in fymx_item.content" :key="fymx_index24+'lifp'">
                    <p class="commontitle">{{fymx_item24.caption}}</p>
                    <span></span>
                    <div class="li_price">{{fymx_item24.detail}}</div>
                  </div>
                  <div class="li" v-if="fymx_item28.type==8" v-for="(fymx_item28,fymx_index28) in fymx_item.content" :key="fymx_index28+'lifp'">
                    <p class="commontitle">{{fymx_item28.caption}}</p>
                    <div class="li_price">{{fymx_item28.detail}}</div>
                  </div>
                  <div class="li" v-if="fymx_item25.type==5" v-for="(fymx_item25,fymx_index25) in fymx_item.content" :key="fymx_index25+'lily'">
                    <p class="commontitle">{{fymx_item25.caption}}</p>
                    <span></span>
                    <div class="li_price">{{fymx_item25.detail==''?'无留言':fymx_item25.detail}}</div>
                    <!-- <div class="li_price"><input type="text" disabled v-model="fymx_item25.detail"></div> -->
                  </div>
                  <div class="li" v-if="fymx_item21.type==2" v-for="(fymx_item21,fymx_index21) in fymx_item.content" :key="fymx_index21+'li'">
                    <p class="commontitle">{{fymx_item21.caption}}</p>
                    <span></span>
                    <div class="li_price">￥{{fymx_item21.value}}</div>
                  </div>
                  <div class="li lizj" v-if="fymx_item26.type==6" v-for="(fymx_item26,fymx_index26) in fymx_item.content" :key="fymx_index26+'lizj'">
                    <p class="commontitle">{{fymx_item26.caption}}</p>
                    <span></span>
                    <div class="li_price" style="color:#FF2013;">￥{{fymx_item26.value.toFixed(2)}}</div>
                  </div>
                  <div class="li telbox" v-if="fymx_item27.type==7" v-for="(fymx_item27,fymx_index27) in fymx_item.content" :key="fymx_index27+'lizj'">
                    <a :href="'tel:'+fymx_item27.display">
                      <img src="./../../../assets/imgs/icons/sp-kf@2x.png" alt="抓周">
                      <span>{{fymx_item27.caption}}</span>
                    </a>
                    <!-- <p class="commontitle">{{fymx_item27.caption}}</p>
                    <span></span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 订单详情 -->
              <div class="bottomorderdetailmsg">
                 <div class="title" ><span class="ic"></span> 订单详情</div>
                 <ul>
                   <li>订单编号：{{fymx_item.orderSn}}</li>
                   <li>支付方式：{{fymx_item.payType==0?'支付宝':'微信'}}</li>
                   <li>支付交易号：{{fymx_item.paySerailNo}}</li>
                   <li>创建时间：{{fymx_item.createTime}}</li>
                   <li>付款时间：{{fymx_item.paymentTime}}</li>
                 </ul>
              </div>
        <!-- 底部操作按钮 -->
        <div class="bottombtnbox" v-show="pageshow">
          <!-- {{$route.query.orderId}} -->
          <p @click="paynow" class="redbtn" v-if="orderStatuscode==0">立即付款</p>
          <p @click="confirmgetgoods" class="redbtn" v-if="orderStatuscode==2">确认收货</p>
          <p @click="sendtips" v-if="orderStatuscode==1">提醒发货</p>
          <p @click="checkwl" v-if="orderStatuscode==2">查看物流</p>
          <p @click="ordercancel" v-if="orderStatuscode==0">取消订单</p>
          <p @click="returncash" v-if="orderStatuscode==70">退款中</p>
          <p @click="removeOrder4C" v-if="orderStatuscode==3||orderStatuscode==4||orderStatuscode==71">删除订单</p>
          <p @click.stop="orderReturnmoney(details)" v-if="details && details.order.confirmStatus==7">退款</p>
        </div>

        
        <!-- 取消原因弹窗 -->
        <div class="returnyytc" v-if="thyyshow">
          <div class="returnyytc-inner">
            <div class="yytctit">请选择退货原因</div>
            <div class="yytctit__list" v-for="(item,index) in becauseList" :key=index  @click="select(index,item.name)">
              <div style=" display: flex;
                justify-content: space-between;
                align-items: center;">{{item.name}}
                <img style="width:0.3rem;height:0.3rem;" :src="index==activebecause ? require('./../order/img/return-select.png') : require('./../order/img/return-unselect.png')" alt />
                </div>
              <div style="font-size: .22rem;margin-top:.2rem;color: rgba(153,153,153,1);">{{item.platf_description}}</div>
            </div>
            <div class="yytctit_operation">
            <div class="yytctit__close close" @click="thyyshow=false">暂不取消</div>
            <div class="yytctit__close" @click="closeOrder()">确认取消</div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {
  setsessionStorage,
  getsessionStorage
} from "../../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      thyyshow: false, //取消原因弹窗
      becauseList: [], //取消订单原因
      name: "", //取消原因name
      activebecause: 0,

      pageshow: false,
      pagedata: "",
      fymx_item: "", //和pagedata一样。代码复用过来所以不改了
      orderamont: 0, //总费用（总价格）

      addressdata: "", //地址信息

      //订单状态 caption: "已关闭"(描述文本) status: 4 订单状态状态码 共七种
      // 0待付款：取消订单，立即付款
      // 1待发货：提醒发货
      // 2待收货：查看物流，确认收货
      // 3已完成：删除订单
      // 4已关闭：删除订单
      // 70退款中：无
      // 71交易关闭：删除订单
      orderStatuscode: -100, //订单状态状态码 orderStatus.status
      orderStatus: "", //订单状态
      paystatus: false, //支付成功的状态：默认为false
      timeinterval: "", //进入页面后的 轮询事件
      default_img_shoplogo: require('../../../assets/imgs/shopcart/icon-shops.png'), //默认图片
      details : '' //订单页传到详情页的数据
    };
  },
  computed: {},
  methods: {
     //跳转退款页
    orderReturnmoney(item){
      let that = this;
      //save returnmoney data
      this.$router.push({
        path: "/returngoods/applymoney",
        query: {
          uid: item.orderUid,
          tabid : that.$route.query.tabid
        }
      });
    },
    //取消订单
    closeOrder() {
      let zs = this;
      zs.$toast.loading({
        // message:'正在取消订单',
        duration: 30000
      });
      this.api.personalcenter
        .getcancleorder(
          zs.$route.query.orderId,
          "H5",
          zs.$store.state.user.userid,
          zs.name
        )
        .then(res => {
          if (res.data.code == 1) {
            zs.$toast.clear();
            zs.thyyshow = false;
            zs.pagechecktype = 0;
            // zs.tabListInfo();
            window.location.reload();
          } else {
            zs.$toast.clear();
            zs.$toast(res.data.info);
          }
        })
    },
    //取消订单原因列表
    cause() {
      let that = this;
      this.api.returngoods.cancleReason({ type: 0 }).then(data => {
        if (data.data.code == 1) {
          that.becauseList = data.data.data;
          // this.name = this.becauseList[0].name;
        }
      });
    },
    //订单30分钟失效倒计时
    gotime(orderDate) {
        //orderDate是订单生效时间，后台的Date类型传到前端成了毫秒
        console.log(orderDate);
        var now = new Date();
        //提交订单的时间+30min就是订单失效时间，后台Date传过来变成了毫秒
        var end = new Date(orderDate + 10 * 60 * 1000);

        /*两个时间相减,得到的是毫秒ms,变成秒*/
        var result = Math.floor(end - now) / 1000; //result= 30*60s;
        console.log('result')
        console.log(result)
        var interval = setInterval(sub, 1000); //定时器 调度对象
        /*封装减1秒的函数*/
        function sub() {
            if (result > 1) {
                result = result - 1;
                var second = Math.floor(result % 60); // 计算秒 ，取余
                var minite = Math.floor((result / 60) % 60); //计算分 ，换算有多少分，取余，余出多少秒
                //var hour = Math.floor(result/1000/60/60%24);  //计算小时，这里最长只有30min，用不着
                //var day = Math.floor(result/1000/60/60/24);   //计算天，这里最长只有30min，用不着
                document.getElementById('time').innerHTML = "支付剩余时间：" + minite + "分" + second + "秒"
            } else {
                console.log("未在规定时间内支付，订单已失效！");
                window.clearInterval(interval);
                //取消订单
            }
        }    
    },
    //选择取消原因
    select(index, name) {
      this.activebecause = index;
      this.name = name;
    },
    // 立即付款
    paynow() {
      this.$router.push({path:'/shop/paypage',query:{type: 'orderdetails'}});
      // this.payfun(amont, orderId);
    },
    returncash(){
      
    },
    // 确认收货
    confirmgetgoods() {
      let confirm = window.confirm("确认收货吗?");
      if (confirm) {
        let zs = this;
        zs.$toast.loading({
          // message:'正在取消订单',
          duration: 30000
        });
        this.api.personalcenter
          .affirmGoods({
            // orderId: zs.pagedata.,
            // userId: zs.$store.state.user.userid,
            sourceType: 3,
            orderId: zs.$route.query.orderId,
            userId: zs.$store.state.user.userid
          })
          .then(res => {
            if (res.data.code == 1) {
              zs.$toast.clear();
              zs.$toast("确认成功");
            } else {
              zs.$toast.clear();
              zs.$toast(res.data.info);
            }
          })
      }
    },
    // 提醒发货
    sendtips() {
      this.$toast("提醒发货操作成功..");
    },
    // 查看物流
    checkwl() {
      // this.$toast('查看物流功能敬请期待');
      let zs = this;
      alert(zs.$route.query.orderId);
    },
    // 取消订单
    ordercancel() {
      this.thyyshow = true;
      // this.$toast('取消订单功能敬请期待');
    },
    // 删除订单
    removeOrder4C() {
      let confirm = window.confirm("确定要删除订单吗?");
      if (confirm) {
        let zs = this;
        zs.$toast.loading({
          // message:'正在取消订单',
          duration: 30000
        });
        this.api.personalcenter
          .removeOrder4C({
            orderId: zs.$route.query.orderId,
            userId: zs.$store.state.user.userid
          })
          .then(res => {
            console.log(res.data.code);
            if (res.data.code == 1) {
              zs.$toast.clear();
              zs.$toast("订单删除成功");
              // zs.tabListInfo();
              // window.location.reload();
              zs.$router.push({path:'/order',query:{tabid:0}});
            } else {
              zs.$toast.clear();
              zs.$toast(res.data.info);
            }
          })
      }
    },
    //返回上一页
    goback() {
      let tabid = this.$route.query.tabid;
      console.log(tabid);
      this.$router.push({
        path:'/personalcenter/order',
        query:{
          tabid :  tabid
        }
      });
    },
    //   获取订单详情
    getOrderDetail() {
      let that = this;
      that.$toast.loading({
        message: "加载中...",
        duration: 200000
      });
      that.api.personalcenter
        .getOrderDetail({
          orderId: that.$route.query.orderId,
          userId: that.$store.state.user.userid
        })
        .then(res => {
          console.log(res);
          // console.log(res.data.code);
          if (res.data.code == 1) {
            that.pageshow = true;
            that.pagedata = res.data.data;
            that.fymx_item = res.data.data;
            that.addressdata = res.data.data.address;
            that.orderStatus = res.data.data.orderStatus;
            that.orderStatuscode = res.data.data.orderStatus.status;

            let pagedatanew = JSON.parse(JSON.stringify(res.data.data));
            pagedatanew.content.filter(item => {
              if (item.type == 6) {
                that.orderamont = item.value;
              }
            });
            that.$toast.clear();
          }
        })
    },
    // 点击调用地址页面
    addressclick() {
      this.$router.push({ name: "addresscheck" });
    },
  },
  created() {
    this.cause();
  },
  mounted() {
    this.getOrderDetail();
    let that = this;
    that.userID = that.$store.state.user.userid;
    this.details = getsessionStorage("returnmoneydata");



  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import url("./../../../assets/css/common.less");
@import "./orderdetails.less";
</style>

<style lang='less'>
//@import url()
</style>