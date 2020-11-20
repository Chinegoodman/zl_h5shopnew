<template>
  <div class="listconpentsbox">
    <!--全部-->
    <mescroll-vue ref="mescroll0" v-show="tabType==0" :down="getMescrollDown(0)" :up="getMescrollUp(0)" @init="mescrollInit0">
      <!-- <ul id="dataList0">
        <li class="data-li" v-for="pd in tab0.list" :key="pd.id">
          <img class="pd-img" :src="pd.pdImg"/>
          <div class="pd-name">{{pd.pdName}}</div>
          <p class="pd-price">{{pd.pdPrice}} 元</p>
          <p class="pd-sold">已售{{pd.pdSold}}件</p>
        </li>
      </ul> -->
      <ul class="list onlinelist" id="dataList0">
          <li v-for="(item,index) in tab0.list"
                    :key="index"
                    :id="item.liveId">
            <div class="lt">
              <h3>想你的猫</h3>
              <div class="btm">2017-02-12  12:30:20</div>
            </div>
            <div class="rt">2351022</div>
          </li>
        </ul>
    </mescroll-vue>
  </div>
</template>

<script>
// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue';

export default {
  name: 'mescrollMore',
  props:['persontype','timetype'],
  components: {
    MescrollVue
  },
  data () {
    return {
      tab0: {mescroll: null, list: [], isListInit: false}, // 观众
      tabType: 0 // 菜单类型
    }
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit0 (mescroll) {
      mescroll.tabType = 0; // 加入标记,便于在回调中取到对应的list
      this.tab0.mescroll = mescroll;
    },
    // 多mescroll的配置,需通过方法获取,保证每个配置是单例
    getMescrollDown (tabType) {
      let isAuto = tabType === 0; // 第一个mescroll传入true,列表自动加载
      return {
        auto: isAuto,
        callback: this.downCallback
      }
    },
    getMescrollUp (tabType) {
      let emptyWarpId = 'dataList' + tabType;
      return {
        auto: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        noMoreSize: 4, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          warpId: emptyWarpId, // 父布局的id;
          icon: 'http://www.mescroll.com/img/mescroll-empty.png', // 图标,默认null
          tip: '暂无相关数据~', // 提示
          btntext: '', // 按钮,默认""
          btnClick: function () { // 点击按钮的回调,默认null
            alert('点击了按钮,具体逻辑自行实现')
          }
        },
        toTop: { // 配置回到顶部按钮
          src: 'http://www.mescroll.com/img/mescroll-totop.png' // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
        }
      }
    },
    /* 下拉刷新的回调 */
    downCallback (mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      if (mescroll.tabType === 0) {
        // loadSwiper();
      } 
      mescroll.resetUpScroll();// 触发下拉刷新的回调,加载第一页的数据
    },
    /* 上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    upCallback (page, mescroll) {
      if (mescroll.tabType === 0) {
        this.tab0.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
        this.getShareInviteDetail(mescroll.tabType, page.num, page.size, (curPageData) => {
          console.log('curPageData');
          console.log(curPageData.length);
          mescroll.endSuccess(curPageData.length);// 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num === 1) this.tab0.list = []; // 如果是第一页需手动制空列表
          this.tab0.list = this.tab0.list.concat(curPageData); // 追加新数据
        }, () => {
          if (page.num === 1) this.tab0.isListInit = false;
          mescroll.endErr();// 联网失败的回调,隐藏下拉刷新的状态
        })
      }
    },
    //获得个人、主播邀请明细
    getShareInviteDetail(tabType, pageNum, pageSize, successCallback, errorCallback){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.shareInviteDetail({
            userId : that.$store.state.nerUser.userid,
            type : that.persontype,
            statisticsType : that.timetype,
            pageNumber : 1,
            pageSize : 20
          }).then(res => {
            that.$toast.clear();
            console.log('res');
            console.log(res);
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
    }
  },
  beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      let curMescroll = vm.$refs['mescroll' + vm.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      curMescroll && curMescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    let curMescroll = this.$refs['mescroll' + this.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
    curMescroll && curMescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  }
}
</script>

<style>
  /*以fixed的方式固定mescroll的高度*/
  .listconpentsbox .mescroll {
    position: absolute;
    top: 140px;
    bottom: 0;
    height: auto;
  }
  .listconpentsbox .top-warp{
    z-index: 9990;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
  }
  .listconpentsbox .top-warp .head{
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .listconpentsbox .top-warp .nav{
    text-align: center;
    height: 50px;
    background: white;
  }
  .listconpentsbox .top-warp .nav > div{
    display: inline-block;
    width: 50%;
    line-height: 49px;
    font-size: 16px;
    font-weight : bold;
    cursor: pointer;
  }
  .listconpentsbox .top-warp .nav .active{
    border-bottom: 1px solid #FF6990;
    color: #FF6990;
  }
  .listconpentsbox .list .mescroll-empty img{
    display: block;
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
</style>
<style lang="less" scoped>

</style>

