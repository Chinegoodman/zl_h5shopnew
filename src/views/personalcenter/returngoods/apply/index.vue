<template>
  <div class="returngoods">
    <div class="header">
      <img src="@/assets/imgs/icons/dd-gengd@2x.png" alt class="back"  @click="goback" />
      <span>退款/退货</span>
    </div>
    <!-- 商品信息部分 -->
    <div class="goodsmass clearfix">
      <div class="masspic">
        <img v-if="details.productPic" :src="details.productPic" alt="" />
        <img v-else src="../../../../assets/logo-gray.png" alt />
      </div>
      <div class="masscontent">
        <div class="shoptit _txtov2">{{details.productName}}</div>
        <div class="shopys">
          <span>{{details.productAttr}}</span>
        </div>
        <div class="shop">支持七天无理由退货</div>
      </div>
      <div class="massmoney clearfix">
        <div class="money"><span class="ic">￥</span>{{details.productPrice}}</div>
        <div class="shopnum clearfix">
          <span>-</span>
          <span class="show">{{details.productQuantity}}</span>
          <span>+</span>
        </div>
      </div>
    </div>
    <!-- 退货原因部分 -->
    <div class="content">
      <div class="contenttop clearfix">
        <div class="toptit">退货原因</div>
        <div class="topchose clearfix" @click="thyyshow=true">
          <span>{{name}}</span>
          <div class="chosepic">
            <img src="@/assets/imgs/icons/dd-gengd@2x.png" alt />
          </div>
        </div>
      </div>
      <div class="contentmoney">
        退款金额：
        <span><span class="sy" >￥</span>{{details.productPrice}}</span>
      </div>
      <div class="contentmoneyts">不可修改，最多￥{{details.productPrice}}，含发货邮费￥0.00</div>
      <div class="contentmass clearfix">
        <div class="masstit">退货说明：</div>
        <textarea name id cols="30" rows="10" placeholder="退货说明，100字以内..." v-model='textarea'></textarea>
      </div>
    </div>
    <!-- 上传凭证部分 -->
    <div class="bottom">
      <div class="bottomtit">上传凭证：</div>
      <!-- <uploadfile :uploaddatainit="uploaddatainit" @_upimglistchange="upimglistchange"></uploadfile> -->
      <uploadfile
          :canedit="true"
          :uploaddatainit="uploaddatainit"
          :defaultfileslist="fileList"
          @_upfileslistchange="upimglistchange"
      ></uploadfile>
    </div>
    <!-- 提交按钮 -->
    <div class="returnbtnbox">
      <div class="returnbtn" v-if="!subOk" @click="subReturnGoods">提交</div>
      <div class="returnbtnh"  v-if="subOk" >提交</div>
    </div>
    <!-- 退货原因弹窗 -->
    <div class="returnyytc" v-if="thyyshow">
      <div class="returnyytc-inner">
        <div class="yytctit" ref="choosed_current">请选择退货原因</div>
        <div class="yytctit__list" v-for="(item,index) in becauseList" :key=index @click="select(index,item.id,item.name)">
          <div style=" display: flex;
            justify-content: space-between;
            align-items: center;">{{item.name}}
             <img style="width:0.3rem;height:0.3rem;" :src="active==index? require('@/assets/imgs/personal/return-select.png'):require('@/assets/imgs/personal/return-unselect.png')" alt />
            </div>
          <div style="font-size: .22rem;margin-top:.2rem;color: rgba(153,153,153,1);">{{item.platf_description}}</div>
        </div>
        <div class="yytctit__close" @click="thyyshow=false">关闭</div>
      </div>
    </div>
    <!-- 二次退货原因弹窗 -->
       <div class="returnyytc" v-if="twoSelect" >
      <div class="returnyytc-inner">
        <div class="yytctit">选择原因:{{name}}</div>
        <div style="font-size:.28rem;">
          由于抓周平台出售商品均为贵重物品和定制物品，选择此 项仅退金料费与石料费，手工费、平台费、快递费与保价 费已经实际产生，无法退
        </div>
        <div class="two_show">
          <div class="two_show_cancel" @click="cancelTwo()"> 取消</div>
          <div class="two_show_confirm" @click="twoSelect=false">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Uploader } from "vant";
import base from "@/api/base.js"; // 导入接口域名列表
// import uploadfile from '@/components/uploadfile.vue'
Vue.use(Uploader);
export default {
  components: {
    // uploadfile
  },
  data() {
    return {
      thyyshow: false,
      active: 0,
      bacauseId: "", //取消原因id
      name: "请选择",
      twoSelect: false, //二次弹框
      becauseList: [
      ],
      fileList: [],
      uploaddatainit: {
        upfileslist: [],
        maxnumber: 5,
        issingle: false, //除了图片之外的资源设置为true(单文件上传模式)
        imgSize: [
          {
            w: "",
            h: "",
          },
        ],
        // filetype
        //'1':图片（只要常用的图片类型:image/gif,image/jp2,image/jpeg,image/png）
        //'1.all':图片 (所有)
        // '2':音频
        // '3':视频
        // '4':zip文件
        // '5':办公文件 MS 及 wps
        // '6':html css js相关
        filetype: "1",
        getwangsu_token_prams: 1, //云存储的存储目录
      },
      subOk:false,
      skuId:'',
      uid:'',
      textarea:'',
      details:''
    };
  },
  computed: {},
  mounted() {
    if(this.$route.query){
      this.uid=this.$route.query.uid,
      this.details=JSON.parse(this.$route.query.details)
      this.skuId=this.details.productSkuId;
      console.log(this.details)
    }
    this.cause();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    //原因列表
    cause(){
      let that = this;
      this.api.returngoods.cancleReason({type:1}).then(data=>{
       if(data.data.code==1){
         that.becauseList=data.data.data;
       }
        })
    },
    upimglistchange(listdata){
      this.fileList = listdata;
    },
    //提交退货
    subReturnGoods(){
      if(this.bacauseId!=''){
      let that = this;
      this.api.returngoods.
      returenOrder(
        {userId:that.$store.state.user.userid,
         orderUid:that.uid,
         quantity:this.details.productQuantity,
         skuId:that.skuId,
         returnReason:that.name,
         description:that.textarea,
         pictures: that.fileList.toString()
         }).then(data=>{
          if(data.data.code==1){
            this.$toast("退货成功");
            this.$router.go(-1);
          }else{
            this.$toast(data.data.info);
          }
        }) 
      }else{
        this.$toast("请选择原因");
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    //选择退货原因
    select(index, id, name) {
      this.active = index;
      this.thyyshow = false;
      if (id == 1011) {
        this.twoSelect = true;
        this.bacauseId = id;
        this.name = name;
      } else {
        this.name = name;
        this.active = index;
        this.bacauseId = id;
      }
    },
    //再次确认提交
    returnGoods() {
      this.twoSelect = false;
    },
    //再次确认取消
    cancelTwo() {
      this.twoSelect = false;
      this.name = "请选择";
      this.bacauseId = "";
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
@import "./css/index.less";
</style>
