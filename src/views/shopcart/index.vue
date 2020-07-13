<!-- 组件说明 -->
<template>
  <div class="shoppingcartwrap">
    <div class="header">
      <div class="in">
        <div class="title_shopcar">购物车</div>
        <!-- <span class="title_shopnum">共0件宝贝</span> -->
        <div class="bianbtn" v-show="iskong==1" @click="gotobian">{{bianbtn}}</div>
      </div>
    </div>
    <!-- 购物车为空时 -->
    <div class="order_body_null" v-show="iskong==0">
      <div class="banner" v-if="1">
        <img src="../../assets/imgs/shopcart/shopcart-nodata.png" alt />
      </div>
      <p class="banner_title">
        <span>哎呀，购物车竟然是空的,快去逛一逛吧。</span>
      </p>
      <button style="cursor:pointer;" @click="gotoshop">逛一逛</button>
    </div>
    <!-- 有商品时 -->
    <div class="car_body" v-show="iskong==1">
      <ul>
        <li class="car_list" v-for="(item,index) in list" :key="index">
          <div class="dianpu">
            <div class="checkall" @click="dianpucheckevery(index,item.isselect)">
              <img v-if="item.itemCount == '1' && (item.items[0].sp1==1 || item.items[0].sp1==2)" src="../../assets/imgs/shopcart/noclick.png" alt="">
              <van-checkbox v-model="item.isselect" v-else></van-checkbox>
            </div>
            <span @click="gotoshopowner(item)">
              <span   class="icon-shops" ><img src="../../assets/imgs/shopcart/icon-shops.png" alt /></span>
              <span class="tit">
                {{item.shopName}}
              </span>
              <span class="gd"><img src="../../assets/imgs/follow/xiangqing@2x.png" alt /></span>
            </span>  
          </div>
          <!-- <van-checkbox-group v-model="checklist" ref="checkbox"> -->
          <div class="car_list_items clearfix" v-for="(tab,i) in item.items" :key="i">
            <div class="car_list_check">
              <van-checkbox v-if="tab.sp1==0" v-model="tab.isselect" @click="checkone(tab,item)" :name="tab.productSkuId" ref="checkboxGroup"></van-checkbox>
              <img v-if="tab.sp1!=0" src="../../assets/imgs/shopcart/noclick.png" alt="">
            </div>
          <div class="car_list_banner">
            <span class="im">
              <img :src="tab.productPic" alt />
            </span>
            <div class="imMask" v-if="tab.sp1_status">
              <div v-if="tab.sp1_status==1">商品无效</div>
              <div v-else-if="tab.sp1_status==2">已售罄</div>
            </div>
            <div class="car_list_title">
              <h4 class="title _txtov2">{{tab.productName}}</h4>
              <div class="car_list_p">
                <!-- <span>颜色： jins</span> -->
                <span>规格：{{tab.productAttr}}</span>
              </div>
              <div class="car_list_price"><span>￥</span>{{tab.price}}</div>
              <div class="car_num">
                <!-- <button @click="jian(index,tab,item)">-</button>
                <span>{{tab.quantity}}</span>
                <button @click="jia(index,tab,item)">+</button> -->
                <span :class="{grew:tab.quantity==1}" @click="jian(index,tab,item)">-</span>
                <span class="show">{{tab.quantity}}</span>
                <span @click="jia(index,tab,item)">+</span>
              </div>
            </div> 
          </div>
          </div>
          <!-- </van-checkbox-group> -->
        </li>
      </ul>
    </div>
    <div class="bottom" v-show="iskong==1">
      <div class="bottom_left">
        <van-checkbox v-model="allchecked" @click="checkalll"></van-checkbox>
        <span>全选</span>
      </div>
      <div class="bottom_right" v-if="bobtn">
        <span class="price">
          合计：<span style="font-size:0.35rem">￥{{allprice.toFixed(2)}}</span>
        </span>
        <button @click="checkmoney">结算({{past_pay_nums}})件</button>
      </div>
      <div class="bianji_right" v-else>
        <!-- <button class="add" @click="addlist">添加关注</button> -->
        <button class="deleted" @click="deleted">删除</button>
      </div>
    </div>
    <van-loading v-if="loadingstatus" type="spinner" color="#1989fa" />

    <!-- 投资金及其他商品分开结算弹层 start-->
    <div class="openappbtnsbox" v-if="judgementType">
        <div class="box-cover"></div>
        <div class="box-content">
            <h3>请分开结算以下商品</h3>
            <ul>
              <li>
                <div class="ck" @click="inveClick">
                  <!-- <van-checkbox v-model="check_tzj" ></van-checkbox> -->
                  <img src="../../assets/imgs/address/dd-weixuanz@2x.png" alt="" v-if="inves==false">
                  <img src="../../assets/imgs/address/gwcxz.png" alt="" v-if="inves==true">
                </div>
                <div class="rt">
                  <span class="n">投资金类商品</span>
                  <div class="type">(购物车内含<span class="t">融通金</span>购物车内含)</div> 
                  <div class="num">共<span>{{invesLeng}}</span> 件</div>
                </div> 
              </li>
              <li>
                <!-- <van-checkbox v-model="check_tzj" class="ck"></van-checkbox> -->
                <div class="ck" @click="otherClick">
                  <!-- <van-checkbox v-model="check_tzj" ></van-checkbox> -->
                  <img src="../../assets/imgs/address/dd-weixuanz@2x.png" alt="" v-if="other==false">
                  <img src="../../assets/imgs/address/gwcxz.png" alt="" v-if="other==true">
                </div>
                <div class="rt">
                  <span class="n">其他商品</span>
                  <div class="num">共<span>{{otherLeng}}</span> 件</div>
                </div> 
              </li>
            </ul>
            <div class="btn">
                <span class="rn" @click="goToShop">返回购物车</span>
                <span class="go" @click="goToSettlement">去结算</span>
            </div>
        </div>
    </div>
    <!-- 投资金及其他商品分开结算弹层 end-->
  </div>
</template>

<script>
import {
    //   AddressEdit,
    //   Area,
    //   Calendar,
      Checkbox,
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
    // Tab,
    // Tabs,
    // List,
    // Lazyload,
    // Search
    // ====项目中可能用到的===
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import {setsessionStorage} from './../../utils/index.js'
import { setTimeout } from 'timers';
export default {
  components: {
    vanCheckbox:Checkbox
  },
  data() {
    return {
      bianbtn: "编辑",
      allchecked: false,//全选  默认非全选
      checklist: [],
      radio: [],
      list: [],
      listindex: [],
      deleteindex: [],
      num: [],
      bobtn: true,
      gps: "",
      iskong: -1,
      check_tzj:'',
      allprice:0.00,//总价
      productSkuIdarr:[],//选中商品的skuid数组
      productarr:[],//选中商品的信息
      loadingstatus:true,
      check_pay_tzj : false, //分开结算弹层
      judgementType:false,
      arrayOrder:'',
      arrayOrders:'',
      invesLeng: '',
      otherLeng:'',
      inves: true,
      other: false,
      sp1_status : false, //商品的有效状态1为失效
      past_pay_nums : 0 //结算最终数
    };
  },
  watch: {
  },
  computed: {
  },
  methods: {
    // 进入商城首页
    gotoshop(){
      this.$router.push({name:'shopindex'});
    },
    allpricefn(){
      let that = this;
      let price = 0;
      let priceparamsarr = [];
      let productSkuIdarr = [];
      let productarr = [];
      if (that.list.length) {
        let goodsarr = [];
        for(let j=0;j<that.list.length;j++){
          for(let k=0;k<that.list[j].items.length;k++){
            if(that.list[j].items[k].sp1==0){
              goodsarr.push(that.list[j].items[k]);
            }
            
          }
        }

        for(let o=0;o<goodsarr.length;o++){
          if(goodsarr[o].isselect){
            price = (price*100)/100 + ((goodsarr[o].price*100)*goodsarr[o].quantity)/100;
            let pricenew = {
              skuId:goodsarr[o].productSkuId,
              goodsCount:goodsarr[o].quantity,
            }
            priceparamsarr.push(pricenew);
          }
        }
        for(let i=0;i<goodsarr.length;i++){
          if(goodsarr[i].isselect){
            productSkuIdarr.push(goodsarr[i].productSkuId);
            productarr.push(goodsarr[i]);
          }
        }
      }
      // debugger;
      // 获取服务器计算的 总 价格
      if(productarr.length>0){
        // that.loadingstatus = true;
        // that.api.shopcart.carsprice({
        //   params:JSON.stringify(priceparamsarr)
        // }).then(res=>{
        //   if(res.data.code==1){
        //     // console.log(res.data.data);
        //     that.allprice=res.data.data.toFixed(2)
        //   }
        //   that.loadingstatus = false;
        // }).catch(err=>{
        //   console.log(err);
        //   that.loadingstatus = false;
        // })

        // 134行代码
        // that.allprice = price.toFixed(2);
      }else{
        // that.allprice=(0).toFixed(2);
      }
      // that.allprice = price.toFixed(2);
      that.productSkuIdarr = productSkuIdarr;
      that.productarr = productarr;
      that.allprice = price
    },
    // 添加关注
    addlist() {
      let that = this;
      this.api.shopcart
        .addlist({
           uid: that.$store.state.user.userid, 
           goodsIds: that.productSkuIdarr.join(','),
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$toast(res.data.info);
            that.bianbtn = "编辑";
            that.bobtn = true;
          } else {
            this.$toast("关注失败");
          }
        });
    },
    // 跳转地址选择页面
    gotocheck() {
      this.$router.push("/address/check");
    },
    gotoshopowner(item){
      let that = this;
      if(item.shopId==null || that.$store.state.user.userid==null){
          this.$toast('数据错误，请刷新页面');
      }else{
        that.$router.push({path:'/shop/shopowner',query:{
            shop_userId : that.$store.state.user.userid,
            shop_id : item.shopId
        }})
      }
    },
    // 数量减
    jian(index,data,father,domselect) {
      // debugger;
      if (data.quantity > 1) {
        data.isselect =true;
        data.quantity--;
        this.additem(data.productSkuId,data.shopId,data.quantity,data,father);
      }else{
        data.isselect =true;
        this.$toast('至少选择一件商品');
        this.checkone(data,father);
      }
      // debugger;
      // this.checkone(data,father);
    },
    // 数量加
    jia(index,data,father,domselect) {
      // debugger;
      data.quantity++;
      data.isselect =true;
      // this.checkone(data,father);
      this.additem(data.productSkuId,data.shopId,data.quantity,data,father);
    },
    // 商品数量加减事件--存储 商品数量
    additem(skuId,shopId,quantity,data,father){
      let that = this;
      this.api.productdetails.additem({
          skuId,
          userId:that.$store.state.user.userid,
          shopId,
          quantity,
          isAdd:false,
      }).then(res=>{
          if(res.data.info=='请求执行成功'){
              that.$toast({
                  message: '操作成功',
                  duration: 810,
                  forbidClick: true
              });
              that.checkone(data,father);
          }else{
              that.$toast({
                  message: '加入购物车失败，请重试',
                  duration: 810,
                  forbidClick: true
              });
          }
      })
    },
    // 编辑与完成的切换事件
    gotobian() {
      let that = this;
      if (that.bobtn) {
        that.bianbtn = "完成";
        that.bobtn = false;
        //将所有过期商品设置为可选
        for(let a =0;a<that.list.length;a++){
           for(let i=0;i<that.list[a].items.length;i++){
            if(that.list[a].items[i].sp1 >= 0){
               that.list[a].items[i].sp1 = 0;
            }
          }
        }
      } else {
        that.bianbtn = "编辑";
        that.bobtn = true;
        for(let a =0;a<that.list.length;a++){
           for(let i=0;i<that.list[a].items.length;i++){
            if(that.list[a].items[i].sp1_status){
              that.list[a].items[i].sp1 = that.list[a].items[i].sp1_status;
            } 
          }
        }
      }
    },
    // 删除该商品
    deleted() {
      let that = this;
      if(that.productSkuIdarr.length>0){
        that.api.shopcart
          .removeitem({
            userId: that.$store.state.user.userid, 
            skuIds: that.productSkuIdarr.join(','),
          })
          .then(function(res) {
            // debugger
            if(res.data.code==1){
              
              that.bianbtn = "编辑";
              that.bobtn = true;
              that.listtable();
              that.$toast('删除成功');
            }else{
              that.$toast(res.data.info);
            }
          });
      }else{
        that.$toast('请选择要删除的商品');
      }
    },
    // 单选一个商品
    checkone(self,father) {
      // debugger;
      let that =this;
      if(self.isselect == true){
        that.allchecked = false;
      }
      setTimeout(() => {
        if(father.items.length == 1){
          father.isselect = self.isselect;
        }else{
          let noselect = 0;
          for(let a=0;a<father.items.length;a++){
            if(father.items[a].isselect == true){
              noselect++;
            }
          }
          if(noselect == father.items.length){
            father.isselect = true;
          }else{
            father.isselect = false;
          }
        }
        let fatherisselect = 0;
        for(let aa = 0; aa < that.list.length;aa++){
          // debugger;
          if(that.list[aa].isselect == true){
            fatherisselect++;
          }
          if(fatherisselect == that.list.length){
            that.allchecked = true;
          }else{
            that.allchecked = false;
          }
        }
        that.allpricefn();
        that.getjiesuanALL()
      }, 0);
    },
    // 店铺选中事件
    dianpucheckevery(index,currentstatus) {
      let that = this;
      if(currentstatus == true){
        that.getjiesuanALL();
        that.allchecked = false;
      }

      for(let i=0;i<that.list[index].items.length;i++){
        that.list[index].items[i].isselect = !currentstatus;
      }
      setTimeout(() => {
        that.allpricefn();
        that.getjiesuanALL();
      }, 0);
    },
    //全选
    checkalll() {
      let that = this;
      if(that.allchecked){
        for(let a =0;a < that.list.length; a++){
          if(that.list[a].isselect == false){
            that.list[a].isselect = true;
            that.dianpucheckevery(a,false);
          }
        }
      }else{
        for(let a =0;a<that.list.length;a++){
          if(that.list[a].isselect == true){
            that.list[a].isselect = false;
            that.dianpucheckevery(a,true);
          }
        }
      }
    },
    getjiesuanALL(){
      let that = this;
      
      let listnew = [];
      listnew = JSON.parse(JSON.stringify(this.list));//地址引用的解决
      let listindex=[];
      for(let i=0;i<that.productarr.length;i++){
        for(let a =0; a<listnew.length;a++){
          if(that.productarr[i].shopId == listnew[a].shopId){
            if(listindex.indexOf(a)<0){
              listindex.push(a);
            }
          }
        }
      }
      
      let listnewA = JSON.parse(JSON.stringify(this.list));//地址引用的解决
      for(let a = 0;a<listindex.length;a++){
         let listnewaitems = listnewA[listindex[a]].items.filter(itemmm => itemmm.isselect == true);
         listnewA[listindex[a]].items = listnewaitems;
      }
      // console.log('店铺列表');
      // console.log(listnewA);
      let listnew2 = [];
      for(let b=0;b<listnewA.length;b++){
        for(let c = 0;c<listindex.length;c++){
          if(b==listindex[c]){
            listnew2.push(listnewA[listindex[c]]);
          }
        }
      }

      let arrayOrder = [];
      let arrayOrders = [];
      let leng = [];
      let lengs = [];
      listnew2.forEach(e=>{
        let fatherItem;
        let childItem = [];
        e.items.forEach(items=>{
          //正常商品
          if(items.sp1 == '0'){
            //正常商品
            if(items.sp2=='0'){
              childItem.push(items);
              fatherItem = e;
              fatherItem.items = childItem;
              leng.push(items.quantity * 1);
              if (arrayOrder.indexOf(fatherItem) == -1) {
                arrayOrder.push(fatherItem);
              }
            }else{
              //投资金商品
              childItem.push(items);
                // console.log(childItem)
                fatherItem = e;
                // console.log(fatherItem)
                fatherItem.items = childItem;
                lengs.push(items.quantity * 1)
                    // fatherItem.items.push(childItem)
                    // console.log(fatherItem)
                if (arrayOrders.indexOf(fatherItem) == -1) {
                    arrayOrders.push(fatherItem);
              }
            }
          }
          // console.log(items)
        })
       
      })

      let current_num;
      if(arrayOrders.length){
        let newarr = arrayOrders.map((item) => {
          return item.items.map((e) => {
            // console.log('e.quantity');
            return e.quantity;
          });
        })

        let returnlastarr_tzj = [];
        newarr.map((itemarr)=>{
            returnlastarr_tzj = returnlastarr_tzj.concat(itemarr);
        })
        current_num = returnlastarr_tzj.reduce((n,m) => n + m);

      }else{
        current_num = 0;
      }
      
      // let currenttzj_num;
      let currentother_num;
      if(arrayOrder.length){
        let newothershops = arrayOrder.map((item) => {
          return item.items.map((e) => {
            return e.quantity;
          });
        })

        let returnlastarr = [];
        newothershops.map((itemarr)=>{
            returnlastarr = returnlastarr.concat(itemarr);
        })
        currentother_num = returnlastarr.reduce((n,m) => n + m);
      }else{
        currentother_num = 0;
      }
      that.past_pay_nums = current_num + currentother_num;
    },
    // 页面数据初始化
    listtable() {
      let that = this;
      let userid = that.$store.state.user.userid;
      let gps = JSON.parse(sessionStorage.getItem("checkaddressitem"));
      if (gps) {
        that.gps = gps.province + " " + gps.city;
      } else {
        that.gps = "无收货地址";
      }
      that.loadingstatus = true;
      that.api.shopcart.showcarcontent({ userId: userid }).then(function(res) {
        let resdata = res.data.data;
        that.loadingstatus = false;
        // if(that.list[index].items.length==1 && (that.list[index].items[0].sp1_status == 2 || that.list[index].items[0].sp1_status == 3)){
        //   console.log('该店铺只有一个商品且已售完');
        // }

        if(resdata.length>0){
          for(let i =0;i<resdata.length;i++){
            resdata[i].isselect = false;
            for(let k =0;k<resdata[i].items.length;k++){
              if(resdata[i].items[k].sp1 == 1){
                resdata[i].items[k].sp1_status = 1;
              }
              if(resdata[i].items[k].sp1 == 2){
                resdata[i].items[k].sp1_status = 2;
              }
              resdata[i].items[k].isselect = false;
            }
          }
          console.log('resdata');
          console.log(resdata);
        }
        that.list = resdata;//添加默认项 isselect:false
        if (that.list.length == 0) {
          that.iskong = 0;
        } else {
          that.iskong = 1;
        }
      })
    },
    // 结算
    checkmoney(){
      let that = this;
      if(that.productarr.length == 0){
        that.$toast('请最少选择一个商品后再点击结算');
      }else{
        that.getsaveOrderImmediatelydata();
      }
    },
    // 存储购物车选中项的数据
    getsaveOrderImmediatelydata(){
      let that = this;

      let listnew = [];
      listnew = JSON.parse(JSON.stringify(this.list));//地址引用的解决
      let listindex=[];
      for(let i=0;i<that.productarr.length;i++){
        for(let a =0; a<listnew.length;a++){
          if(that.productarr[i].shopId == listnew[a].shopId){
            // console.log(listindex.indexOf(a));
            if(listindex.indexOf(a)<0){
              listindex.push(a);
            }
          }
        }
      }
      let listnewA = JSON.parse(JSON.stringify(this.list));//地址引用的解决
      for(let a = 0;a<listindex.length;a++){
         let listnewaitems = listnewA[listindex[a]].items.filter(itemmm => itemmm.isselect == true);
         listnewA[listindex[a]].items = listnewaitems;
      }
      // console.log('店铺列表');
      // console.log(listnewA);
      let listnew2 = [];
      for(let b=0;b<listnewA.length;b++){
        for(let c = 0;c<listindex.length;c++){
          console.log(listnewA[listindex[c]])
          if(b==listindex[c]){
            listnew2.push(listnewA[listindex[c]]);
          }
        }
      }

      let arrayOrder = [];
      let arrayOrders = [];
      let leng = [];
      let lengs = [];
      listnew2.forEach(e=>{
        let fatherItem;
        let childItem = [];
        e.items.forEach(items=>{
          //正常商品
          if(items.sp1 == '0'){
            //正常商品
            if(items.sp2=='0'){
              childItem.push(items);
              fatherItem = e;
              fatherItem.items = childItem;
              leng.push(items.quantity * 1);
              if (arrayOrder.indexOf(fatherItem) == -1) {
                arrayOrder.push(fatherItem);
              }
            }else{
              //投资金商品
              childItem.push(items);
                // console.log(childItem)
                fatherItem = e;
                // console.log(fatherItem)
                fatherItem.items = childItem;
                lengs.push(items.quantity * 1)
                    // fatherItem.items.push(childItem)
                    // console.log(fatherItem)
                if (arrayOrders.indexOf(fatherItem) == -1) {
                    arrayOrders.push(fatherItem);
              }
            }
          }
          // console.log(items)
        })
       
      })
      //console.log(arrayOrders,arrayOrder)
      // debugger;
      var s = 0;
      var ind = 0;
      if (arrayOrder.length > 0 && arrayOrders.length > 0) {
          for (var x = 0; x < leng.length; x++) {
              s += leng[x]
              that.otherLeng=s
          }
          for (var j = 0; j < lengs.length; j++) {
              ind += lengs[j]
                  that.invesLeng= ind
              
          }
          that.judgementType=true,
          that.arrayOrder=arrayOrder,
          that.arrayOrders=arrayOrders
          // wx.navigateTo({
          //     url: '/pages/order/order-pay?form=shopping'
          // })
          // wx.setStorageSync('arrayOrder', arrayOrder)
          // console.log(arrayOrder, 'arrayOrder')
      } else if (arrayOrder.length > 0 && arrayOrders.length == 0) {
          that.$router.push({name:'confirmorder'})
          setsessionStorage('orderListdata', arrayOrder)
      } else if (arrayOrder.length == 0 && arrayOrders.length > 0) {
          that.$router.push({name:'confirmorder'})
          setsessionStorage('orderListdata', arrayOrders)

      }
      setsessionStorage("pagefrom","shopcart"); 
      // setsessionStorage("orderListdata",listnew2); 
      setsessionStorage("allprice",that.allprice); 
      // setsessionStorage("orderListdata",listnew); 
      // that.$router.push({name:'confirmorder'})
    },
    //点击单选框
    inveClick() {
      this.inves= true,
      this.other= false
            // wx.setStorageSync('arrayOrder', arrayOrders)
    },
    otherClick() {
      this.inves= false,
      this.other= true
            // wx.setStorageSync('arrayOrder', arrayOrder)
    },
    //回到购物车
    goToShop() {
        
            this.judgementType=false
        
    },
    //去结算
    goToSettlement() {
        if (this.inves == true) {
           this.$router.push({name:'confirmorder'})
            setsessionStorage('orderListdata', this.arrayOrders)
        } else if (this.other == true) {
            this.$router.push({name:'confirmorder'})
            setsessionStorage('orderListdata', this.arrayOrder)
        }
    },
  },
  
  created() {
    this.listtable();
  },
  mounted() {
    // 移除confirmpageorder 填写订单页的存储数据
    localStorage.removeItem('confirmpageorder');
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
  }, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    document.querySelector('body').setAttribute('style', '')
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import "./css/index.less";
</style>
<style lang="less">
.shoppingcartwrap .van-loading, .shoppingcartwrap .van-loading__spinner{
  position: fixed;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  height: 0.8rem;
}
.shoppingcartwrap .van-checkbox__icon{
  height: .35rem;
}
.shoppingcartwrap .van-checkbox__icon .van-icon{
  width: .35rem;
  height: .35rem;

}
.shoppingcartwrap .van-checkbox__icon--checked .van-icon-success{
  background:rgba(255,189,4,1);
  border-color : rgba(255,189,4,1);
}
</style>
