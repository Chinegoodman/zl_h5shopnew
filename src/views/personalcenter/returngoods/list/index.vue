<template>
  <div class="returngoods">
                <van-list
      class="video-content"
      v-model="listloading"
      :finished="listfinished"
      finished-text=""
      :error.sync="vanerror"
      error-text="请求失败，点击重新加载"
      :offset="10"
      @load="listLoad"
    >
        </van-list>
            <div class="header">
      <img class="back" @click="goback" src="@/assets/imgs/follow/xiangqing@2x.png" alt />
      <span>退货列表</span>
    </div>
              <div class="order_body" v-for="(items,index) in retreatList" :key="index">
                <!-- {{items}} -->
              <!-- <div class="order_body" v-for="(item,index) in retreatList" :key="index"  v-if="retreatList.length>0"> -->
            <div class="wares_list">
              <div class="time">
                <div class="time_center">
                  <!-- <span>{{item.order.createTime}}</span> -->
                  <span><img style="margin-right:7px;" :src="items.shopLogo?items.shopLogo:''" alt />
                  <span>{{items.shopName?items.shopName:''}}</span>
                 <img style="margin-left:3px;" src="@/assets/imgs/icons/dd-gengd@2x.png" alt="">
                  </span>
                  <p>退货</p>
                </div>
              </div>
              <div class="wares_list_center clearfix">
                <img :src="items.productPic" alt />
                <div class="wares_list_right">
                  <p class="wares_list_right_p _txtov2">
                    {{items.productName}}
                  </p>
                  <span class="warns_price">￥{{items.productPrice}}</span>
                  <span class="warns_num">*{{items.productCount}}</span>
                  <div class="warns_tab">规格:{{items.productAttr}}</div>
                  <div><p class="warns_text_info" v-if="false">支持七天无理由退货</p></div>
                  <!-- productAttr 添加 -->
                  <div class="warns_text_state">{{items.status==0?'您的退货申请提交成功，请耐心等待客服为您处理。':
                    items.status==1?'您的退货申请正在审核中，我们会随时与您取得联系':
                    items.status==2?'您的退货申请已经通过，请您尽快将商品与单据通过，谢谢。':
                    items.status==3?'您的退货申请已驳回，如有疑问请随时联系客服。':items.status==4?
                    '您退货的商品我们已经收到，我们将尽快为您处理退货流程。':
                    items.status==5?'您申请的退货商品我们正在检测。':items.status==6?
                    '您申请的退货商品正在向商家退货':items.status==7?'您申请的退货商品店铺已回收，我们将尽快为您处理退款事宜。':
                    items.status==8?'您申请的退货商品款项已经成功退到您的原支付渠道。'
                    :items.status==9?'您申请的退货已经完成，感谢您对抓周的支持。':'您有一条新消息，请点击查看'}}</div>
                  <div class="warns_tab2">
                    <div class="pay" @click="detailsReturn(items)">查看详情</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  </div>
</template>
<script>
import Vue from "vue";
import { List } from "vant";
Vue.use(List);
export default {
  components: {},
  data() {
    return {
      retreatList: [],
      orderlist: [],
      listloading: false,
      listfinished: false,
      vanerror: false,
      nextPage: ""
    };
  },
  computed: {},
  methods: {
    goback() {
      this.$router.push({ path: "/personalcenter/index" });
    },
    listLoad() {
      this.api.returngoods
        .pageReturnOrders(this.$store.state.user.userid, this.nextPage)
        .then(res => {
          if (res.data.data.orders.length > 0) {
            res.data.data.orders.forEach(e => {
              this.retreatList.push(e);
            });
          } else {
            this.$toast("暂无数据");
          }
          this.nextPage = res.data.data.nextPage;
          if (this.nextPage != "") {
            this.listfinished = false;
            this.listloading = false;
          } else {
            this.listfinished = true;
            this.listloading = false;
          }
          // window.location.href=window.location.host
          this.$forceUpdate();
        });
    },
    //跳转
    detailsReturn(item) {
      this.$router.push({
        path: "/returngoods/check",
        query: {
          uid: item.uid
        }
      });
    }
  },
  mounted() {},
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
    .header {
        width: 100%;
        border-bottom: 1px solid #DEDEDE;
        background: white;
        text-align: center;
        // position: fixed;
        z-index: 100;

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
    }
</style>
