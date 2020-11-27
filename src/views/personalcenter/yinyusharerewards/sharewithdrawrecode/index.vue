<!-- 组件说明 -->
<template>
  <div :class="{'widthdrawrecodewrap' : true,'widthdrawrecodewrapapp' : bodypaddingtop}">
      <div class="top-all-wallet"  ref="topAllWallet" :style="{paddingTop:bodypaddingtop+'px'}">
        <div class="header">
          <img class="back" @click="goback" src="./../../../../assets/imgs/shop/white-gd.png" alt />
          <span>{{guildPageType&&guildPageType==4?'提现记录':'兑换记录'}}</span>
        </div>
        <div class="wallet-inner">
          <span class="t">{{guildPageType&&guildPageType==4?'累计提现金额':'累计通过奖励兑换金币'}}</span>
          <div class="num">
            <span v-if="guildPageType==4">￥</span>
            <span class="t">{{allTakeNum}}</span>
            <span v-if="guildPageType==3">个</span>
          </div>
        </div>  
      </div>
      <div class="box-listareabox" id="boxListAreaBox">
        <div ref="mescroll" :class="{'mescroll' : true}"  :style="{top : topAllWalletset +'px'}" >
          <div class="pub-tips recodepage-tip" v-if="guildPageType&&guildPageType==4">
            <p class="tips"><span>*</span>如您的支付宝信息填写错误，财务人员打款失败，将驳回您的提现 申请，您可以修改支付宝信息后重新申请提现。</p>
          </div>
          <ul class="uls">
            <li class="lis" v-for="(item,index) in recodesList" :key="index" :id="item.userId" v-if="item.date&&guildPageType&&guildPageType==4">
              <span class="tit">{{item.date}}</span>
              <ol>
                <li v-for="(items,childindex) in item.exchangeOrWithdrawalPojo" :key="childindex"> 
                  <h3>{{items.payType && items.payType==1?'支付宝':'微信'}}</h3>
                  <span class="tm">{{items.createTime}}</span>
                  <span class="apply" v-if="items.state && items.state==1">提现中</span>
                  <span class="apply yet" v-if="items.state && items.state==2">已提现</span>
                  <span class="apply bo" v-if="items.state && items.state==4">驳回</span>
                  <span class="price"><mark>&yen;</mark>{{items.expense}}</span>
                </li>
              </ol>
            </li>
            <li class="lis lis-ex" v-for="(item,index) in recodesList" :key="index" :id="item.userId" v-if="item.date&&guildPageType&&guildPageType==3">
              <span class="tit">{{item.date}}</span>
              <ol>
                <li v-for="(items,childindex) in item.exchangeOrWithdrawalPojo" :key="childindex"> 
                  <span class="im">
                    <img src="../../../../assets/imgs/personal/chongzhi.png" alt="">
                  </span>
                  <div class="con">
                    <h3>兑换{{(items.expense).toFixed(2)}}金币</h3>
                    <span class="tm">{{items.createTime}}</span>
                  </div>
                  <span class="price">分享奖励兑换</span>
                </li>
              </ol>
            </li>
          </ul>
        </div>  
      </div>
  </div>
</template>

<script>
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default {
  components: {

  },
  data() {
    return {
      default_img_head : require('../../../../assets/imgs/icons/default-head.png'),
      shareUserId : '', //用户ID
      bodypaddingtop : 0, //客户端传来的top值 
      guildPageType : '', //从哪个页跳来的标识
      allTakeNum : 0,
      recodesList : [],
      topAllWalletset : 0 //获取顶部部分高度
    };
  },
  computed: {

  },
  mounted() {
    let that = this;
    document.querySelector('body').setAttribute('style', 'background-color:#101118');
    that.bodypaddingtop = that.$route.query.paddingtop;
    that.guildPageType = that.$route.query.guildPageType;
    that.shareUserId = that.$route.query.shareUserId;
    that.getWalletStatisticalWithdrawlCount();
    this.$nextTick(() => {
        that.topAllWalletset = that.$refs.topAllWallet.offsetHeight - 40;
        console.log(that.topAllWalletset);
    });
    
    // that.getShareStatistics();
    // 创建MeScroll对象:为避免配置的id和父组件id重复,这里使用ref的方式初始化mescroll
    that.mescroll = new MeScroll(that.$refs.mescroll, {// 在mounted生命周期初始化mescroll,以确保您配置的dom元素能够被找到.
      down: {
        auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        callback: that.downCallback // 下拉刷新的回调
      },
      up: {
        auto: true, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: that.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 20 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: { // 配置回到顶部按钮
          src: '../assets/imgs/icons/ddkby.png'
        },
        empty: {
          warpId: 'boxListAreaBox', // 父布局的id;
          tip: '暂无记录！' // 提示
          // btntext: '去邀请', // 按钮,默认""
          // btnClick: function () { // 点击按钮的回调,默认null
          //   alert('点击了按钮,具体逻辑自行实现')
          // }
        },
      }
    });
  },
  methods: {
    // 返回上一页
    goback() {
      let that = this;
      that.$router.go(-1);
    },
    //获得累计奖励，可兑换奖励
    getWalletStatisticalWithdrawlCount(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.walletStatisticalWithdrawlCount({
            userId : that.shareUserId,
            // userId : 9512,
            type : that.guildPageType,//4为提现 3为兑换
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              that.allTakeNum = res.data.data; 
            }
          });
    },
    //获取相关余额
    getShareStatistics(){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.shareStatistics({
            type : that.timesection,
            userId : that.shareUserId
          }).then(res => {
            that.$toast.clear();
            if(res.data.code === 1){
              that.tongjidata = res.data.data; 
            }
          });
    },
    /* 下拉刷新的回调 */
    downCallback () {
      console.log('this.mescroll.version=' + this.mescroll.version);
      // 联网加载数据
      this.getUserWalletExchangeOrWithdrawalBill(0, 1, (data) => {
        // 添加新数据到列表顶部
        this.recodesList.unshift(data);
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess()// 结束下拉刷新,无参
        })
      }, () => {
        // 联网失败的回调,隐藏下拉刷新的状态
        this.mescroll.endErr()
      })
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page) {
      // 联网加载数据
      this.getUserWalletExchangeOrWithdrawalBill(page.num, page.size, (curPageData) => {
        // 添加列表数据
        this.recodesList = this.recodesList.concat(curPageData)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess(curPageData.length)
        })
      }, () => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        this.mescroll.endErr()
      })
    },
    //申请提现记录列表
    getUserWalletExchangeOrWithdrawalBill(pageNum, pageSize, successCallback, errorCallback){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 200000
          }); 
          that.api.personalcenter.userWalletExchangeOrWithdrawalBill({
            userId : that.shareUserId,
            // userId : 9512,
            type : that.guildPageType,
            appType : 3,
            page : pageNum,
            item : 20
          }).then(res => {
              console.log('res申请');
              console.log(res);
              that.$toast.clear();
            if (res.data.code == 1) {
              let objData = res.data.data.list;
                if(objData == null){
                  objData = [];
                }
                successCallback && successCallback(objData);
                that.$forceUpdate();
            }else{
              errorCallback && errorCallback();
            }
          });
    },
  },
  beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      if (vm.mescroll) {
        // 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
        // 滚动到之前列表的位置(注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
          setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
          }, 16)
        }
      }
    })
  },
  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true) // 允许bounce
      this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0)// 隐藏回到顶部按钮,无渐隐动画
    }
    next()
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
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
@import url("../index/css/sharecommon.less");
@import url("./css/index.less");
</style>

<style>
.box-listareabox .mescroll {
  width : 7.5rem;
  position: fixed;
  top: 180px;
  bottom: 0;
  height: auto;
  border-radius: .6rem;
  background: #101118;
}
.box-listareabox .mescroll-exchange{
  top: 135px;
}
.box-listareabox .mescroll .notice {
  font-size: 14px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  text-align: center;
  color: #555;
}
.box-listareabox .mescroll-empty{
  background: none;
  padding: 3.6rem 0;
}
.box-listareabox .mescroll-empty .empty-btn{
  width: 2.3rem;
  height: .7rem;
  line-height : .7rem;
  text-align: center;
  background: #ffbd04;
  border-radius: .35rem;
  color : #fff;
  border: none;
  padding: 0;
  margin-top : 2.56rem;
}
.box-listareabox .mescroll-empty .empty-tip{
  font-size: .28rem;
  color: #757575;
}

.widthdrawrecodewrapapp .box-listareabox .mescroll {
  position: fixed;
  top: 200px;
}
.widthdrawrecodewrapapp .box-listareabox .mescroll-exchange{
  top: 155px;
}
.mescroll-downwarp .downwarp-tip, .mescroll-upwarp .upwarp-tip{
  color: #fff;
}

</style>