<!-- 组件说明 -->
<template>
  <div class="confirmorderwrap">
    <div class="header clearfix">
      <img
        @click="$router.go(-1)"
        style="transform:rotate(180deg);"
        src="./../../../assets/imgs/icons/sp-gengduo@2x.png"
        alt
      />
      <p>填写订单</p>
    </div>
    <div class="containerwrap">
      <!-- 收货地址 -->
      <div class="address clearfix" v-if="addressdata.id!=''">
        <img src="./../../../assets/imgs/icons/dd-shoujr-l@2x.png" alt />
        <div class="content">
          <div class="top clearfix">
            <span class="name">{{addressdata.name}}</span>
            <span class="phone">{{addressdata.phone}}</span>
            <span class="tags red">收件人</span>
            <span class="tags default" v-show="addressdata.is_default==1">默认</span>
          </div>
          <div class="details _txtov2">
            {{addressdata.province+' '+addressdata.city+' '+addressdata.area+' '+addressdata.street+' '+addressdata.address}}
          </div>
          <p @click="addressclick" class="gd"><img src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt /></p>
        </div>
      </div>
      <div class="address clearfix" v-else>
        <img src="./../../../assets/imgs/icons/dd-shoujr-l@2x.png" alt />
        <div class="content">
          <div class="top clearfix">
            <span class="name">&nbsp;</span>
          </div>
          <p @click="addressclick" class="gd"><img src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt /></p>
          <div class="details _txtov2">
            &nbsp;
          </div>
        </div>
      </div>

      <!-- 商品数据及支付方式和配送方式 -->
      <div class="product_paytype_transptype">
        <div class="product clearfix" v-for="(item,index) in listshow" :key="index">
          <div class="shopnamebox clearfix">
            <div class="shopicon">
              <img :src="item.shopIcon" alt />
            </div>
            <span class="shopname">{{item.shopName}}</span>
            <p class="gd"><img src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt /></p>
          </div>
          <div class="rongtong-cn">
            <span class="nm">融通金实时金价：</span>
            <span class="pr">￥744.34/克</span>
          </div>
          <div class="goodbox clearfix" v-for="(iteminner,indexs) in item.items" :key="indexs">
            <img :src="iteminner.productPic" alt="商品" />
            <div class="details">
              <p class="title _txtov2">{{iteminner.productName}}</p>
              <!-- <p class="tips">&nbsp;</p> -->
              <div class="options _txtov1">{{iteminner.productAttr}}</div>
              <!-- <p class="tips">不支持七天无理由退货</p> -->
            </div>
            <div class="price_number">
              <p>￥{{iteminner.price}}</p>
              <span>x{{iteminner.quantity}}</span>
            </div>
          </div>

          <!-- 费用明细 -->
          <div class="paydetails" v-if="fymx_item.shopId == item.shopId" v-for="(fymx_item,fymx_index) in fymx_listdata" :key="fymx_index+'title'">
            <a href="http://web.zhulihr.com/fysm.html" target="_blank">
              <div class="title clearfix">
                <p v-if="fymx_item2.type==0" v-for="(fymx_item2,fymx_index2) in fymx_item.content" :key="fymx_index2">{{fymx_item2.chineseName}}</p>
                <!-- <img src="./../../../assets/imgs/icons/dd-wenda@2x.png" al="聚美金品" /> -->
              </div>
            </a>
            <div class="pd_list">
              <!-- 配送方式 -->
              <div class="li peisong" v-if="fymx_item20.type==1" v-for="(fymx_item20,fymx_index20) in fymx_item.content" :key="fymx_index20+'peisong'">
                <p class="commontitle">{{fymx_item20.chineseName}}</p>
                <div class="li_price" v-if="freightstatus" @click="mbopen(item.order,item.order.freightAmounttype,item.order.freightAmountname,index);">{{fymx_item20.expressName}} <span class="gd"><img src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt /></span></div>
                <div class="li_price" v-if="!freightstatus" style="color:red;">请先选择顶部的收货地址 ></div>
                <div class="peisongsmall">
                  {{fymx_item20.detailName}}<i class="c">￥{{fymx_item20.price}}</i>
                </div>
              </div>
              <div class="li" v-if="!freightstatus">
                <p class="commontitle">快递费</p>
                <div class="li_price" style="color:red;">请先选择顶部的收货地址</div>
              </div>
              <div class="li" v-else>
                <p class="commontitle">快递费(含保价费)</p>
                <div class="li_price">￥{{item.order.freightAmount}}</div>
              </div>

              <div class="li" v-if="fymx_item21.type==2" v-for="(fymx_item21,fymx_index21) in fymx_item.content" :key="fymx_index21+'li'">
                <p class="commontitle">{{fymx_item21.chineseName}}</p>
                <span></span>
                <div class="li_price">￥{{fymx_item21.price}}</div>
              </div>
              <div class="li" v-if="fymx_item23.type==3" v-for="(fymx_item23,fymx_index23) in fymx_item.content" :key="fymx_index23+'libz'">
                <p class="commontitle">{{fymx_item23.chineseName}}</p>
                <!-- <span>{{index}}</span> -->
                <span class="checkshowtxt">{{fymx_item23.detailName}}<span v-if="fymx_item23.price!=0" style="float:none;margin:0;color:red;">&nbsp;￥{{fymx_item23.price}}</span></span>

                  <!-- v-model="listshow[index].order.isPackage" -->
                  <!-- v-model="listshow[index].order.isPackagestatus" -->
                <!-- <van-switch
                  :value="listshow[index].order.isPackagestatus"
                  @input="switchchange(index,fymx_index)"
                  size="0.5rem"
                  inactive-color="white"
                  active-color="rgb(106,215,107)"
                /> -->
                <div class="checkboxwrap" @click="switchchange(index,fymx_index)">
                  <span class="radio" :class="{left:!listshow[index].order.isPackagestatus,right:listshow[index].order.isPackagestatus}"></span>
                </div>
              </div>
              <div class="li lizj" v-if="fymx_item27.type==7" v-for="(fymx_item27,fymx_index27) in fymx_item.content" :key="fymx_index27+'lizj'">
                <p class="commontitle">{{fymx_item27.chineseName}}</p>
                <div class="li_price c">
                  <span class="sy" v-if="couponList.length == 1" >{{fymx_item27.detailName}}</span> 
                  <!-- <span class="sy" v-else-if="couponList.length > 0" @click="opencouponshow">{{fymx_item27.detailName}}</span> -->
                  <span class="sy" v-else @click="opencouponshow">
                    <span v-if="!coupon_clicked_show">{{couponList.length - 1}}张可用</span>
                    <span v-else>{{fymx_item27.detailName}}</span>
                  </span>
                  <span class="gd"><img src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt /></span>
                </div>
              </div>
              <div class="li" v-if="fymx_item24.type==4" v-for="(fymx_item24,fymx_index24) in fymx_item.content" :key="fymx_index24+'lifp'">
                <p class="commontitle">{{fymx_item24.chineseName}}</p>
                <span></span>
                <div class="li_price">￥{{fymx_item24.price}}</div>
                <div class="li_price">H5端敬请期待</div>
              </div>
              <div class="li" v-if="fymx_item25.type==5" v-for="(fymx_item25,fymx_index25) in fymx_item.content" :key="fymx_index25+'lily'">
                <p class="commontitle">{{fymx_item25.chineseName}}</p>
                <span></span>
                <div class="li_price"><input type="text" v-model="leavemsg[index]" placeholder="选填,请输入您对订单或商品的一些要求或事宜"></div>
              </div>
              <div class="li lizj" v-if="fymx_item26.type==6" v-for="(fymx_item26,fymx_index26) in fymx_item.content" :key="fymx_index26+'lizj'">
                <p class="commontitle">{{fymx_item26.chineseName}}</p>
                <span></span>
                <div class="li_price c"><span class="sy">￥</span>{{fymx_item26.price}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 支付方式  平安银行支付 微信支付 支付宝支付-->
        <div class="paytypebox clearfix">
          <div class="paytype clearfix" v-for="(item,index) in paytypedata.arr" :key="index">
            <div class="left">
              <img :src="item.logo" alt="聚美金品">
              <div class="content">
                <p>{{item.name}}</p>
                <span>{{item.title}}</span>
              </div>
            </div>
            <div class="right" @click="selectpaytype(index)">
              <span class="raido" :class="{active:paytypedata.currentindex==index}"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 引入的底部模块 -->
    <xqbottom @_confirmorderfn="confirmorderfn" :allprice="zongfei" :pagetype="pagetypedata"></xqbottom>


    <!-- 优惠券弹层 -->
    <div class="coupontypebox" v-if="couponshow">
       <!-- 取消原因弹窗 -->
          <!-- <div class="returnyytc" v-if="thyyshow"> -->
            <div class="coupontype-inner">
              <div class="yytctit">优惠券</div>
              <div class="yytctit__list" v-for="(item,index) in couponList" :key=index  @click="selectCoupon(index,item)">
                <div style=" display: flex;justify-content: space-between;align-items: center;">{{item.name}}
                  <img style="width:0.3rem;height:0.3rem;" :src="index==activebecause ? require('@/assets/imgs/personal/return-select.png') : require('@/assets/imgs/personal/return-unselect.png')" alt />
                  </div>
                <div style="font-size: .22rem;margin-top:.2rem;color: rgba(153,153,153,1);">{{item.platf_description}}</div>
              </div>
              <div class="yytctit_operation">
              <div class="yytctit__close" @click="closeCoupon(couponList)">完成</div>
              </div>
            </div>
          <!-- </div> -->
    </div>
    
    <!-- 配送弹层 -->
    <div class="freighttypemb" v-if="mbstatus" @click.stop="mbclose">
      <div class="freighttype" @click.stop="stopfn">
        <p>请选择配送方式</p>
        <div class="typelist" v-for="(item,index) in freightAmountcurrent.arr" :key="index">
          <div class="left">
            <img v-if="item.type==801" src="./../../../assets/imgs/sf/jr.png" alt="聚美金品">
            <img v-if="item.type==802" src="./../../../assets/imgs/sf/cc.png" alt="聚美金品">
            <img v-if="item.type==803" src="./../../../assets/imgs/sf/cr.png" alt="聚美金品">
            <img v-if="item.type==804" src="./../../../assets/imgs/sf/gr.png" alt="聚美金品">
          </div>
          <div class="right" @click="selectfreighttype(item)">
            <p v-if="item.price == 0">收件地址不支持此服务</p>
            <div v-if="item.type == freightAmountcurrent.type && item.price > 0" class="select" :class="{active:item.type == freightAmountcurrent.type}">
              ￥{{item.price}} <span></span>
            </div>
            <div v-if="item.type != freightAmountcurrent.type && item.price > 0" class="select">
              ￥{{item.price}} <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import base from "@/api/base.js"; // 导入接口域名列表
import axios from "axios";
import {
  setsessionStorage,
  getsessionStorage
} from "./../../../utils/index.js";
import { constants } from "fs";
import { clearInterval } from "timers";
//import x from ''
export default {
  components: {},
  data() {
    return {
      activebecause: 0,
      couponshow : false,
      pagetypedata: "confirmorder", //底部按钮模块类别  此页面对应的是 确认订单
      goodsallprice: 0, //商品的总价格不包含运费
      // zongewaifei:0,//总得额外费用===>>快递费运费
      addressdata: {
        id: "",
        name: "",
        phone: "",
        province: "",
        city: "",
        area: "",
        address: "",
        is_default: "" //是否是默认地址 1:是/2:否
      },
      ajax_order: [],
      // 进入页面显示数据
      // listshow: [],
      totalPrice: "", //订单总价

      mbstatus: false, //快递选择模块蒙版
      confirmboxmbstatus: false, //支付状态模板
      mbfromindex: "", //对应的店铺下标
      freightAmountcurrent: {
        type: "",
        name: "",
        arr: []
      },
      // paytype 支付方式数据
      paytypedata: {
        currentindex: 0,
        arr: [
          {
            name: "支付宝支付",
            title: "支付宝安全支付",
            logo: require("./../../../assets/imgs/icons/dd-qzf-zhifub@2x.png"),
            payType: 1
          }
          // {
          //   name: "微信支付",
          //   title: "微信安全支付",
          //   logo: require("./../../../assets/imgs/icons/dd-qzf-weixin@2x.png"),
          //   payType: 2
          // }

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
      paystatus: false, //支付成功的状态：默认为false
      timeinterval: "", //进入页面后的 轮询事件

      freightfeestatus: false, //配送费状态

      fymx_listdata: [], //费用明细列表数据
      zongfei: 0, //展示的 总 费用

      createorderdataajax: [],
      // createorderdata:[
      createorderdata: {
        operator: this.$store.state.user.userid,
        order: {},
        orderItemList: [],
        source: "H5",
        isPackageFee: 0
      }, //创建订单需要的ajax数据
      // ],
      leavemsg: [], //买家留言信息
      listshow: [], //读取缓存拿到的商品数据
      couponList :[], //优惠券
      coupon_choose_id : 0, //选定的优惠券id
      coupon_choose_price : 0, //选定的优惠券价格
      cun_contentdata : {},  //存一下上次下单前计费的参数对象,选中优惠券后调用 回显接口时用更新过优惠券金额的参数对象
      coupon_clicked_show : false
    };
  },
  computed: {
    //无配送地址 时的状态false 有时为ture
    freightstatus() {
      if (
        this.addressdata.id == null ||
        this.addressdata.id == undefined ||
        this.addressdata.id == "" ||
        this.addressdata.id == 0
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    // 阻止冒泡
    stopfn() {
      return false;
    },
    // 蒙版点击关闭事件
    mbclose() {
      // console.log(ev);
      this.mbstatus = false;
    },
    // 蒙版点击关闭事件2  取消此功能
    confirmboxmbclose() {
      return;
      // this.confirmboxmbstatus = false;
    },
    // 支付方式选择事件 支付方式：1->支付宝；2->微信；3->银联；4->????
    selectpaytype(index) {
      let that = this;
      this.paytypedata.currentindex = index;
      // console.log('支付方式为:'+that.paytypedata.arr[index].name);
      for (let i = 0; i < that.ajax_order.length; i++) {
        that.ajax_order[i].order.payType = that.paytypedata.arr[index].payType;
      }
    },
    // 费用状态
    freightfeestatusfn() {
      let freightstatusfaildlength = 0;
      let that = this;
      for (let i = 0; i < that.listshow.length; i++) {
        if (that.listshow[i].order.freightAmount == 0) {
          freightstatusfaildlength++;
        }
      }
      if (freightstatusfaildlength > 0) {
        that.freightfeestatus = false;
      } else {
        that.freightfeestatus = true;
      }
    },

    // 运费类型选择模块 显示事件
    mbopen(itemorderdata, type, name, index) {
      this.freightAmountcurrent.arr = itemorderdata.freightAmountArr;
      this.freightAmountcurrent.type = type;
      this.freightAmountcurrent.name = name;
      this.mbstatus = true;
      this.mbfromindex = index;
    },
    // 运费类型选择模块==>>选择事件
    selectfreighttype(selectdata) {
      let that = this;
      // console.log(selectdata);
      if (selectdata.price == 0) {
        that.$toast("收件地址不支持此服务！请选择其他项。");
        return;
      } else {
        that.listshow[that.mbfromindex].order.freightAmount = selectdata.price; //显示数据
        // that.ajax_order[that.mbfromindex].order.freightAmount =
        //   selectdata.price; //ajax参数
        that.listshow[that.mbfromindex].order.freightAmountname =
          selectdata.name;
        that.listshow[that.mbfromindex].order.freightAmounttype =
          selectdata.type;
        that.mbclose();
        // that.fymx_listdata[that.mbfromindex].freight =selectdata.price;

        that.getshowPrice();
      }
    },
    // 选择包装 是否？
    switchchange(indexkey, innderindex) {
      // console.log(indexkey);
      // console.log(innderindex);
      let that = this;
      this.listshow[indexkey].order.isPackagestatus = !this.listshow[indexkey]
        .order.isPackagestatus;
      // console.log(that.listshow[indexkey].order.isPackagestatus);
      if (that.listshow[indexkey].order.isPackagestatus) {
        // that.listshow[index].order.isPackage=100;
        for (
          let a = 0;
          a < that.fymx_listdata[innderindex].content.length;
          a++
        ) {
          if (that.fymx_listdata[innderindex].content[a].type == 3) {
            // that.fymx_listdata[innderindex].content[a].price=100; //虚拟非0的值
            that.listshow[indexkey].order.isPackage = 1;
          }
        }
      } else {
        for (
          let aa = 0;
          aa < that.fymx_listdata[innderindex].content.length;
          aa++
        ) {
          if (that.fymx_listdata[innderindex].content[aa].type == 3) {
            that.fymx_listdata[innderindex].content[aa].price = 0;
            that.listshow[indexkey].order.isPackage = 0;
          }
        }
        // that.listshow[index].order.price=0;//如果为0 则为标准包装-免费  如果非0 则为 付费包装
      }
      that.getshowPrice();
      that.$forceUpdate();
      setTimeout(() => {}, 0);
    },

    //111数据从存储获取   同时判断地址状态===有地址获取配送费用 无地址设置配送费为0
    pagedatashow() {
      let that = this;
      var moduleList = that.$store.state.user;
      if (getsessionStorage("pagefrom") == "productdetails") {
        let ordermass = getsessionStorage("OrderImmediatelydata");
        console.log(ordermass);
        that.ajax_order = [
          {
            order: {},
            orderItemList: [{}]
          }
        ];
        that.ajax_order[0].order.shopId = Number(ordermass.shopId); //商铺ID
        that.ajax_order[0].order.shopName = ordermass.shopName; //商铺名称
        that.ajax_order[0].order.isPackage = 0; //是否 使用包装  1:包含包装费；0：不包含包装费
        // that.ajax_order[0].order.shopIcon=ordermass.shopIcon;//商铺icon
        that.ajax_order[0].order.userId = Number(moduleList.userid); //用户id是否会员
        that.ajax_order[0].source = "H5"; //用户名
        that.ajax_order[0].operator = Number(moduleList.userid); //用户id
        that.ajax_order[0].isPackageFee = 0; //默认无包装费  是否有包装费0:否；1：是
        // that.ajax_order[0].order.totalAmount = ordermass.totalAmount;
        that.ajax_order[0].order.totalAmount = "";
        that.ajax_order[0].order.totalQuantity = Number(
          ordermass.totalQuantity
        );
        // that.ajax_order[0].order.receiverId = ordermass.receiverId;
        that.ajax_order[0].order.receiverId = Number(that.addressdata.id);
        that.ajax_order[0].order.serviceFee = ordermass.serviceFee;
        that.ajax_order[0].order.designFee = ordermass.designFee;
        that.ajax_order[0].order.payAmount = "";
        that.ajax_order[0].order.sourceType = 3;
        that.ajax_order[0].order.freightAmount = 0.0;

        that.ajax_order[0].order.billHeaderId = 0;
        that.ajax_order[0].order.billReceiverEmail = 0;
        that.ajax_order[0].order.billReceiverPhone = 0;
        that.ajax_order[0].order.billType = 0;
        that.ajax_order[0].order.note = "";
        that.ajax_order[0].order.payType = "";
        // 回显数值
        that.listshow = [
          {
            order: {},
            items: [{}]
          }
        ];
        that.listshow[0].order = {};
        that.listshow[0].order.shopId = Number(ordermass.shopId); //商铺ID
        that.listshow[0].order.shopName = ordermass.shopName; //商铺名称
        that.listshow[0].order.isPackage = 0; //是否 使用包装  1:包含包装费；0：不包含包装费
        that.listshow[0].shopName = ordermass.shopName; //商铺名称
        that.listshow[0].order.shopIcon = ordermass.shopIcon; //商铺icon
        that.listshow[0].shopIcon = ordermass.shopIcon; //商铺icon
        that.listshow[0].order.userId = moduleList.userid; //用户id是否会员
        that.listshow[0].order.totalAmount = ordermass.totalAmount;
        that.listshow[0].order.totalQuantity = ordermass.totalQuantity;
        that.listshow[0].order.receiverId = ordermass.receiverId;
        that.listshow[0].order.serviceFee = ordermass.serviceFee;
        that.listshow[0].order.freightAmount = 0.0; //运费
        that.listshow[0].order.designFee = ordermass.designFee;
        that.listshow[0].order.manualFee = ordermass.manualFee; //单个商品的手工费费用
        that.listshow[0].order.insured_price = ordermass.insured_price; //单个商品的保价费费
        that.listshow[0].order.payAmount = ordermass.payAmount;

        that.ajax_order.shopId = ordermass.shopId;

        that.ajax_order[0].orderItemList[0].shopId = Number(ordermass.shopId); //商铺ID
        that.ajax_order[0].orderItemList[0].goldenPrice = ordermass.goldenPrice;
        that.ajax_order[0].orderItemList[0].manualFee = ordermass.manualFee; //单个商品的手工费费用 此处用不到
        that.ajax_order[0].orderItemList[0].productAttr = ordermass.productAttr;
        that.ajax_order[0].orderItemList[0].productName = ordermass.productName;
        that.ajax_order[0].orderItemList[0].productPic = ordermass.productPic;
        that.ajax_order[0].orderItemList[0].productPrice =
          ordermass.productPrice;
        that.ajax_order[0].orderItemList[0].productQuantity =
          ordermass.productQuantity;
        that.ajax_order[0].orderItemList[0].productSkuId =
          ordermass.productSkuId;
        that.ajax_order[0].orderItemList[0].productWeight =
          ordermass.productWeight;
        // 回显数值
        that.listshow[0].items[0].shopId = ordermass.shopId; //商铺ID
        that.listshow[0].shopId = ordermass.shopId; //商铺ID
        that.listshow[0].items[0].goldenPrice = ordermass.goldenPrice;
        that.listshow[0].items[0].manualFee = ordermass.manualFee;
        that.listshow[0].items[0].productAttr = ordermass.productAttr;
        that.listshow[0].items[0].productName = ordermass.productName;
        that.listshow[0].items[0].productPic = ordermass.productPic;
        that.listshow[0].items[0].price = ordermass.productPrice;
        that.listshow[0].items[0].quantity = ordermass.productQuantity;
        that.listshow[0].items[0].productSkuId = ordermass.productSkuId;
        that.listshow[0].items[0].productWeight = ordermass.productWeight;

        that.goodsallprice =
          Number(ordermass.productPrice) * Number(ordermass.productQuantity); //商品的总价格不包含运费
      } else if (getsessionStorage("pagefrom") == "shopcart") {
        // debugger;
        // console.log(getsessionStorage("orderListdata"));//购物车选中项的商品数据
        this.listshow = getsessionStorage("orderListdata");
        this.goodsallprice = getsessionStorage("allprice"); //商品的总价格不包含运费
        // 计算商品展示的数据
        for (let bb = 0; bb < that.listshow.length; bb++) {
          that.listshow[bb].order = {
            manualFee: 0,
            serviceFee: 0,
            insured_price: 0,
            freightAmount: 0,
            isPackage: 0 //是否 使用包装  1:包含包装费；0：不包含包装费
          };
          for (let cc = 0; cc < that.listshow[bb].items.length; cc++) {
            // debugger;
            that.listshow[bb].order.manualFee =
              that.listshow[bb].order.manualFee +
              that.listshow[bb].items[cc].manualFee *
                that.listshow[bb].items[cc].quantity;
            that.listshow[bb].order.serviceFee =
              that.listshow[bb].order.serviceFee +
              that.listshow[bb].items[cc].serviceFee *
                that.listshow[bb].items[cc].quantity;
            that.listshow[bb].order.insured_price =
              that.listshow[bb].order.insured_price +
              that.listshow[bb].items[cc].insuredFee *
                that.listshow[bb].items[cc].quantity;
          }
        }

        let ajaxlist = JSON.parse(JSON.stringify(that.listshow));
        for (let i = 0; i < ajaxlist.length; i++) {
          delete ajaxlist[i].invItems;
          delete ajaxlist[i].isselect;
          delete ajaxlist[i].itemCount;
          delete ajaxlist[i].shopIcon;
          delete ajaxlist[i].shopAvatar; //啥玩意啊？？
          ajaxlist[i].orderItemList = ajaxlist[i].items;
          for (let a = 0; a < ajaxlist[i].orderItemList.length; a++) {
            delete ajaxlist[i].orderItemList[a].createDate;
            delete ajaxlist[i].orderItemList[a].deleteStatus;
            delete ajaxlist[i].orderItemList[a].id;
            delete ajaxlist[i].orderItemList[a].isselect;
            delete ajaxlist[i].orderItemList[a].modifyDate;
            delete ajaxlist[i].orderItemList[a].nickname;
            ajaxlist[i].orderItemList[a].productPrice =
              ajaxlist[i].orderItemList[a].price;
            delete ajaxlist[i].orderItemList[a].price;
            delete ajaxlist[i].orderItemList[a].productBrand;
            ajaxlist[i].orderItemList[a].productQuantity =
              ajaxlist[i].orderItemList[a].quantity;
            ajaxlist[i].orderItemList[a].shopId = Number(
              ajaxlist[i].orderItemList[a].shopId
            );
            delete ajaxlist[i].orderItemList[a].quantity;
            delete ajaxlist[i].orderItemList[a].uid;
            delete ajaxlist[i].orderItemList[a].userId;

            delete ajaxlist[i].orderItemList[a].sp1;
            delete ajaxlist[i].orderItemList[a].sp2;
            delete ajaxlist[i].orderItemList[a].sp3;
            delete ajaxlist[i].orderItemList[a].productSn;
            delete ajaxlist[i].orderItemList[a].productSubTitle;
            delete ajaxlist[i].orderItemList[a].productSkuCode;
            delete ajaxlist[i].orderItemList[a].productCategoryId;
            delete ajaxlist[i].orderItemList[a].studioLiveId;
          }
          delete ajaxlist[i].items;

          ajaxlist[i].operator = Number(this.$store.state.user.userid);
          ajaxlist[i].source = "H5";
          ajaxlist[i].isPackageFee = 0; //默认无包装费  是否有包装费0:否；1：是
          // ajaxlist[i].source=this.$store.state.user.username+'H5';
          ajaxlist[i].order = {};
          // debugger;
          ajaxlist[i].order.billHeaderId = 0;
          ajaxlist[i].order.billReceiverEmail = 0;
          ajaxlist[i].order.billReceiverPhone = 0;
          ajaxlist[i].order.billType = 0;
          ajaxlist[i].order.freightAmount = 0;
          ajaxlist[i].order.note = "";
          ajaxlist[i].order.payAmount = "";
          ajaxlist[i].order.payType = "";
          ajaxlist[i].order.receiverId = Number(that.addressdata.id);
          ajaxlist[i].order.shopId = Number(ajaxlist[i].shopId);
          ajaxlist[i].order.sourceType = 3;
          ajaxlist[i].order.totalAmount = "";
          ajaxlist[i].order.totalQuantity = ajaxlist.length; //订单总数量？？
          ajaxlist[i].order.userId = Number(that.$store.state.user.userid);

          delete ajaxlist[i].shopId;
          delete ajaxlist[i].shopName;
        }
        that.ajax_order = ajaxlist;
      } else if (getsessionStorage("pagefrom") == "livingdetails") {
        let ordermass = getsessionStorage("orderListdata");
        // 商铺部分参数赋值开始
        // 传输数值
        that.ajax_order = [
          {
            order: {},
            orderItemList: [{}]
          }
        ];
        that.ajax_order[0].order.shopId = Number(ordermass.shopId); //商铺ID
        that.ajax_order[0].order.shopName = ordermass.shopName; //商铺名称
        // that.ajax_order[0].order.shopIcon=ordermass.shopIcon;//商铺icon
        that.ajax_order[0].order.userId = Number(moduleList.userid); //用户id是否会员
        that.ajax_order[0].source = "H5"; //用户名
        that.ajax_order[0].operator = Number(moduleList.userid); //用户id
        that.ajax_order[0].isPackageFee = 0; //默认无包装费  是否有包装费0:否；1：是
        // that.ajax_order[0].order.totalAmount = ordermass.totalAmount;
        that.ajax_order[0].order.totalAmount = "";
        that.ajax_order[0].order.totalQuantity = Number(
          ordermass.totalQuantity
        );
        // that.ajax_order[0].order.receiverId = ordermass.receiverId;
        that.ajax_order[0].order.receiverId = Number(that.addressdata.id);
        that.ajax_order[0].order.serviceFee = ordermass.serviceFee;
        that.ajax_order[0].order.designFee = ordermass.designFee;
        that.ajax_order[0].order.payAmount = "";
        that.ajax_order[0].order.sourceType = 10;
        that.ajax_order[0].order.freightAmount = 0.0;

        that.ajax_order[0].order.billHeaderId = 0;
        that.ajax_order[0].order.billReceiverEmail = 0;
        that.ajax_order[0].order.billReceiverPhone = 0;
        that.ajax_order[0].order.billType = 0;
        that.ajax_order[0].order.note = "";
        that.ajax_order[0].order.payType = "";
        // 回显数值
        that.listshow = [
          {
            order: {},
            items: [{}]
          }
        ];
        that.listshow[0].order = {};
        that.listshow[0].order.shopId = Number(ordermass.shopId); //商铺ID
        that.listshow[0].order.shopName = ordermass.shopName; //商铺名称
        that.listshow[0].shopName = ordermass.shopName; //商铺名称
        that.listshow[0].order.shopIcon = ordermass.shopIcon; //商铺icon
        that.listshow[0].shopIcon = ordermass.shopIcon; //商铺icon
        that.listshow[0].order.userId = moduleList.userid; //用户id是否会员
        that.listshow[0].order.totalAmount = ordermass.totalAmount;
        that.listshow[0].order.totalQuantity = ordermass.totalQuantity;
        that.listshow[0].order.receiverId = ordermass.receiverId;
        that.listshow[0].order.serviceFee = ordermass.serviceFee;
        that.listshow[0].order.freightAmount = 0.0; //运费
        that.listshow[0].order.designFee = ordermass.designFee;
        that.listshow[0].order.manualFee = ordermass.manualFee; //单个商品的手工费费用
        that.listshow[0].order.insured_price = ordermass.insured_price; //单个商品的保价费费
        that.listshow[0].order.payAmount = ordermass.payAmount;

        that.ajax_order.shopId = ordermass.shopId;

        that.ajax_order[0].orderItemList[0].shopId = Number(ordermass.shopId); //商铺ID
        that.ajax_order[0].orderItemList[0].goldenPrice = ordermass.goldenPrice;
        that.ajax_order[0].orderItemList[0].manualFee = ordermass.manualFee; //单个商品的手工费费用 此处用不到
        that.ajax_order[0].orderItemList[0].productAttr = ordermass.productAttr;
        that.ajax_order[0].orderItemList[0].productName = ordermass.productName;
        that.ajax_order[0].orderItemList[0].productPic = ordermass.productPic;
        that.ajax_order[0].orderItemList[0].productPrice =
          ordermass.productPrice;
        that.ajax_order[0].orderItemList[0].productQuantity =
          ordermass.productQuantity;
        that.ajax_order[0].orderItemList[0].productSkuId =
          ordermass.productSkuId;
        that.ajax_order[0].orderItemList[0].productWeight =
          ordermass.productWeight;
        // 回显数值
        that.listshow[0].items[0].shopId = ordermass.shopId; //商铺ID
        that.listshow[0].shopId = ordermass.shopId; //商铺ID
        that.listshow[0].items[0].goldenPrice = ordermass.goldenPrice;
        that.listshow[0].items[0].manualFee = ordermass.manualFee;
        that.listshow[0].items[0].productAttr = ordermass.productAttr;
        that.listshow[0].items[0].productName = ordermass.productName;
        that.listshow[0].items[0].productPic = ordermass.productPic;
        that.listshow[0].items[0].price = ordermass.productPrice;
        that.listshow[0].items[0].quantity = ordermass.productQuantity;
        that.listshow[0].items[0].productSkuId = ordermass.productSkuId;
        that.listshow[0].items[0].productWeight = ordermass.productWeight;

        that.goodsallprice =
          Number(ordermass.productPrice) * Number(ordermass.productQuantity); //商品的总价格不包含运费
      }

      that.leavemsg = [];
      for (let aaaa = 0; aaaa < that.listshow.length; aaaa++) {
        that.leavemsg.push("");
      }

      // console.log(that.listshow);
      if (that.checkaddressdata()) {
        //有配送地址 先调用配送地址 然后获取计价相关的
        that.computedFreight();
      } else {
        //没有配送地址 默认配送费用为0 计价相关的
        for (let bb = 0; bb < that.listshow.length; bb++) {
          that.listshow[bb].order.freightAmount = 0;
        }
        that.getshowPrice();
      }
    },
    //222检查是否有地址信息
    checkaddressdata() {
      let that = this;
      let addressdata = getsessionStorage("checkaddressitem");
      if (
        addressdata == null ||
        addressdata.id == 0 ||
        addressdata.id == null ||
        addressdata.id == undefined
      ) {
      } else {
        that.addressdata = addressdata;
      }
      // console.log(addressdata);
      if (addressdata == null || addressdata == undefined) {
        return false;
      } else {
        return true;
        // that.computedFreight();
      }
    },
    //333运价计算接口     获取运价后调用 自费展示的接口方法 getshowPrice
    computedFreight() {
      // alert('收货地址接口调用！');
      let that = this;
      that.$toast.loading({
        // message:'',
        duration: 30000
      });
      let ajaxdata = {
        addressId: that.addressdata.id,
        shops: []
      };
      for (let i = 0; i < that.listshow.length; i++) {
        // debugger;
        let shopdata = {
          shopId: that.listshow[i].shopId,
          goods: []
        };
        for (let k = 0; k < that.listshow[i].items.length; k++) {
          let goodsdata = {
            skuId: that.listshow[i].items[k].productSkuId,
            count: that.listshow[i].items[k].quantity,
            weight: that.listshow[i].items[k].productWeight
          };
          shopdata.goods.push(goodsdata);
        }
        ajaxdata.shops.push(shopdata);
      }
      that.api.shopcart
        .computedFreight({
          //post
          content: JSON.stringify(ajaxdata) //post
        })
        .then(res => {
          that.$toast.clear();
          //post
          console.log(res.data.data);
          let freightdata = res.data.data;
          // debugger;
          for (let cc = 0; cc < freightdata.length; cc++) {
            for (let bb = 0; bb < that.listshow.length; bb++) {
              if (freightdata[cc].shopId == that.listshow[bb].shopId) {
                that.listshow[bb].order.freightAmountArr = freightdata[cc].free;
                for (let dd = 0; dd < freightdata[cc].free.length; dd++) {
                  if (freightdata[cc].free[dd].cheep == 1) {
                    // debugger;
                    that.listshow[bb].order.freightAmount =
                      freightdata[cc].free[dd].price;
                    that.listshow[bb].order.freightAmounttype =
                      freightdata[cc].free[dd].type;
                    that.listshow[bb].order.freightAmountname =
                      freightdata[cc].free[dd].name;
                    that.ajax_order[bb].order.freightAmount =
                      freightdata[cc].free[dd].price; //初始化时设置ajax需要的运费的价格
                    // that.zongfeifn();
                  }
                }
              }
            }
          }
          this.getshowPrice();
        })
    },
    //获取下单用的优惠劵
    fetchorderusablecoupon(price){
      let that =  this;
      //get about msg
      if (getsessionStorage("pagefrom") == "productdetails") {
        let ordermass = getsessionStorage("OrderImmediatelydata");
        console.log(ordermass);

      that.$toast.loading({
        // message:'',
        duration: 30000
      }); 
      //下面that.zongfei 在下单前计费回显中取
       this.api.shopcart
        .getOrderUsAbleCoupon({
          uid : that.$store.state.user.userid,
          // uid : 9106,
          price : price, 
          shopId : ordermass.shopId,
          goodsSkuIdList :ordermass.productSkuId
        })
        .then(res => {
          console.log(res.data);
          that.$toast.clear();
          if (res.data.code == 1) {
            that.couponList = res.data.data;
          }
        })
      }    
    },
    //打开优惠券
    opencouponshow(){
      this.couponshow = true;
    },
    //选取优惠券
    selectCoupon(index,item){
       this.activebecause = index;
       this.coupon_choose_id = item.couponId;
       this.coupon_choose_price = item.price;
    },
     //确认优惠券并重新渲染-下单前计费回显
    closeCoupon(couponList){
      let that = this;
      if(this.coupon_choose_id == 0 && this.coupon_choose_price == 0){
         that.cun_contentdata[0].couponId = couponList[0].couponId;
         that.cun_contentdata[0].couponAmount = couponList[0].price;
      }else{
         that.cun_contentdata[0].couponId = this.coupon_choose_id;
        that.cun_contentdata[0].couponAmount = this.coupon_choose_price;
      }
      //选完优惠券后，计费再次回显
      that.getValutionFeemethod(that.cun_contentdata);
      this.coupon_clicked_show = true;
      this.couponshow = false;

    },
    //444计价相关的数据获取与展示   配送费数据  包装数据
    getshowPrice(psfdata, bzdata) {
      let that = this;
      that.$toast.loading({
        // message:'',
        duration: 30000
      });
      // console.log(that.ajax_order);
      console.log(that.listshow);
      let ajax_getshowPrice = JSON.parse(JSON.stringify(that.listshow));
      // {"goods":[{"skuId":1780661640987681260,"count":6}],"shopId":101763,"freight":18,"isPackage":0};
      let contentdata = [];

      for (let i = 0; i < ajax_getshowPrice.length; i++) {
        let goods = [];
        for (let o = 0; o < ajax_getshowPrice[i].items.length; o++) {
          goods.push({
            skuId: ajax_getshowPrice[i].items[o].productSkuId,
            count: ajax_getshowPrice[i].items[o].quantity
          });
        }

        let freight = 0;
        let isPackage = 0;
        freight = ajax_getshowPrice[i].order.freightAmount;
        isPackage = ajax_getshowPrice[i].order.isPackage;
        contentdata.push({
          shopId: ajax_getshowPrice[i].shopId,
          freight: freight,
          isPackage: isPackage,
          goods: goods,
          couponId :'',
          couponAmount : 0
        });
      }
      // console.log(psfdata);
      // console.log(bzdata);
      // console.log(contentdata);
      if (psfdata != undefined) {
        //配送费 数据
        contentdata[psfdata.index] = psfdata.price;
      }
      if (bzdata != undefined) {
        // 包装 数据
        contentdata[bzdata.index] = psfdata.status;
      }
      // that.contentdatanew = contentdata;
      // console.log(contentdata);

      that.cun_contentdata = contentdata;  //存参数对象 后面选中优惠券后调回显接口时用
      //下单前计费回显调用
      that.getValutionFeemethod(contentdata);
      
    },
    //下单前计费回显方法
    getValutionFeemethod(data){
      let that = this;
      this.api.shopcart
        .getValutionFee({
          content: JSON.stringify(data)
        })
        .then(res => {
          that.$toast.clear();
          console.log('下单前计费回显');
          console.log(res);
          if (res.data.code == 1) {
            let resedata = res.data.data;

            that.zongfei = resedata.allPrice;
            that.fymx_listdata = resedata.shops;
            //获取优惠券列表
            that.fetchorderusablecoupon(that.zongfei);
          }
        })
    },
    // 生成订单 //成功后拉起支付
    confirmorderfn() {
      this.freightfeestatusfn();

      let that = this;
      if (that.paytypedata.currentindex == -1) {
        that.$toast("请先选择好支付方式再操作");
        return;
      }
      if (!that.checkaddressdata()) {
        that.$toast("请选择收货地址后再支付下单");
        return;
      }
      if (!that.freightfeestatus) {
        that.$toast("请编辑并选择顺丰支持的配送地址再下单");
        return;
      }
      localStorage.removeItem("confirmpageorder");
      let createorderdatanew = JSON.parse(JSON.stringify(that.listshow));
      // console.log(createorderdatanew);

      let isPackageFee = 0;
      that.createorderdataajax = [];
      createorderdatanew.forEach(function(item, index) {
        // console.log(that.createorderdata);
        let currentgoodnew = that.fymx_listdata[index].content.filter(item => {
          return item.type == 6; //单个订单 的 商品总价
        });
        let createorderdatali = {
          operator: that.$store.state.user.userid,
          order: {},
          orderItemList: [],
          source: "H5",
          isPackageFee: 0
        };
        //创建订单需要的ajax数据
        createorderdatali.order = {
          billHeaderId: 0,
          payAmount: currentgoodnew[0].price,
          // payType : that.paytypedata.arr[that.paytypedata.currentindex].payType,//后台移除此字段了
          receiverId: that.addressdata.id,
          shopId: item.shopId,
          sourceType: 3,
          userId: that.$store.state.user.userid,
          orderType: getsessionStorage("pagefrom") == "livingdetails" ? 1 : 0,
          studioLiveId: item.items[0].studioLiveId
            ? item.items[0].studioLiveId
            : 0,
          note: that.leavemsg[index],
          freightAmount: item.order.freightAmount,
          deliveryProduct: item.order.freightAmountname,
          billType: 0,
          totalQuantity: 0
        };

        createorderdatali.orderItemList = [];
        for (let a = 0; a < item.items.length; a++) {
          let orderItemListli = {
            goldenPrice: item.items[a].goldenPrice,
            manualFee: item.items[a].manualFee,
            productAttr: item.items[a].productAttr,
            productPrice: item.items[a].price ? item.items[a].price : 0,
            productQuantity: item.items[a].quantity
              ? item.items[a].quantity
              : 0,
            productSkuId: item.items[a].productSkuId,
            productWeight: item.items[a].productWeight,
            serviceFee: item.items[a].serviceFee,
            shopId: item.items[a].shopId,
            studioLiveId: item.items[a].studioLiveId
              ? item.items[a].studioLiveId
              : 0
          };
          createorderdatali.orderItemList.push(orderItemListli);
        }
        if (item.order.isPackage == 1) {
          //是否有 包装费用  后台 暂时 只有一件的处理逻辑
          isPackageFee = 1;
        }
        createorderdatali.isPackageFee = isPackageFee; //是否有包装费 0:否；1：是

        that.createorderdataajax.push(createorderdatali);
      });
      // console.log(that.createorderdataajax);
      that.$toast.loading({
        // message:'',
        duration: 30000
      });
      that.api.shopcart
        .createOrderhl({
          orderParm: JSON.stringify(that.createorderdataajax)
        })
        .then(data => {
          that.$toast.clear();
          if (data.data.code == 1) {
            // that.$toast(data.data.info);
            let amont = data.data.data.totalPrice;
            let orderId = data.data.data.pay4Orders.join();
            // debugger;
            that.payfun(amont, orderId);
          } else {
            that.$toast(data.data.info);
          }
        })
    },
    // 查询一下订单支付状态接口
    checkorderstatus(order, amont) {
      let that = this;
      // console.log(orderId);
      that.$toast.loading({
        // message:'',
        duration: 30000
      });
      this.api.shopcart
        .paystatus({
          uid: that.$store.state.user.userid,
          order
          // amont,
        })
        .then(res => {
          that.$toast.clear();
          // console.log(res);
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
    // 支付接口
    payfun(amont, orderId) {
      let that = this;
      that.$toast.loading({
        // message:'',
        duration: 30000
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
            if (window.confirm("支付失败，是否重试?")) {
              that.payfun(amont, orderId);
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
    // 点击调用地址页面
    addressclick() {
      this.$router.push({ name: "addresscheck" });
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
        }
      }
    }
  },
  mounted() {
    let that = this;
    // debugger;
    // that.checkaddressdata();
    // 数据从存储获取并展示
    this.pagedatashow();

   

    // if (that.checkaddressdata()) {
    //   //有配送地址 先调用配送地址 然后获取计价相关的
    //   this.computedFreight();
    // } else {
    //   //没有配送地址 默认配送费用为0 计价相关的
    //   this.getshowPrice(false);
    // }
    that.userID = that.$store.state.user.userid;
    // that.$forceUpdate();

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
  created() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    let that = this;
    window.clearInterval(that.timeinterval);
    that.timeinterval = null;
  }, //生命周期 - 销毁之前
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