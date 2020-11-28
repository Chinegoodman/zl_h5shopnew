<!-- 组件说明 -->
<template>
  <div :class="{'sharedetails_box' : true,'sharedetails_boxapp' : bodypaddingtop}">
    <div class="header clearfix" :style="{paddingTop:bodypaddingtop+'px'}">
      <img
        @click="$router.go(-1)"
        style="transform:rotate(180deg);"
        src="./../../../../assets/imgs/icons/sp-gengduo@2x.png"
        alt
      />
      <p>{{persontype===1?'邀请主播明细':'邀请用户明细'}}</p>
    </div>
    <div class="section-con">
      <div class="yao-type-tit" v-if="detailsList.length > 0"> {{persontype===1?'时间为通过认证时间':'时间为注册时间'}}</div>
      <div class="list-content" id="listContent">
        <div class="content-inner">
          <div class="hd" v-if="detailsList.length > 0">
            <span class="lt">用户信息</span>
            <span  class="rt">ID账号</span>
          </div>
          <div ref="mescroll" class="mescroll">
            <ul class="news-list" v-if="detailsList.length > 0">
              <li v-for="(item,index) in detailsList"
                        :key="index"
                        :id="item.userId" v-if="item.userId">
                <div class="lt">
                  <h3>{{item.nickname}}</h3>
                  <div class="btm" v-if="persontype === 1">{{item.certificationTime}}</div>
                  <div class="btm" v-else>{{item.createTime}}</div>
                </div>
                <div class="rt">{{item.virtualId}}</div>
              </li>
            </ul>
          </div>  
        </div>  
      </div>
    </div>
</div>
</template>

<script>
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import {jsCallImmediatelySharefn,jsCallgoback} from './../../../../utils/appjh.js'
export default {
  components: {
  },
  data() {
    return {
      bodypaddingtop : 0, //客户端传来的top值 
      shareUserId : '', //用户ID
      mescroll: null,
      persontype : 1 , //标题类型0为主播 ，1为用户
      timetype : 0,
      detailsList : []
    };
  },
  computed: {},
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    },
    /* 下拉刷新的回调 */
    downCallback () {
      console.log('this.mescroll.version=' + this.mescroll.version);
      // 联网加载数据
      this.getShareInviteDetail(0, 1, (data) => {
        // 添加新数据到列表顶部
        this.detailsList = [];
        this.detailsList.push(data);
        this.mescroll.resetUpScroll();
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
      this.getShareInviteDetail(page.num, page.size, (curPageData) => {
        // 添加列表数据
        this.detailsList = this.detailsList.concat(curPageData)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess(curPageData.length)
        })
      }, () => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        this.mescroll.endErr()
      })
    },
    //获得个人、主播邀请明细
    getShareInviteDetail(pageNum, pageSize, successCallback, errorCallback){
      let that = this;
      that.$toast.loading({
            message: "加载中...",
            duration: 200000
          }); 
          that.api.personalcenter.shareInviteDetail({
            userId : that.shareUserId,
            type : that.persontype,
            statisticsType : that.timetype,
            pageNumber : 1,
            pageSize : 20,
            appType : 1
          }).then(res => {
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
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
    that.timetype = that.$route.query.timetype;
    that.persontype = that.$route.query.persontype;
    that.shareUserId = that.$route.query.shareUserId;
    that.bodypaddingtop = that.$route.query.paddingtop;
    that.webtype = that.$route.query.webtype;
    // 创建MeScroll对象:为避免配置的id和父组件id重复,这里使用ref的方式初始化mescroll
    that.mescroll = new MeScroll(that.$refs.mescroll, {// 在mounted生命周期初始化mescroll,以确保您配置的dom元素能够被找到.
      down: {
        // use : false,
        auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        callback: that.downCallback // 下拉刷新的回调
      },
      up: {
        auto: true, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: that.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: { // 配置回到顶部按钮
          src: '../assets/imgs/icons/ddkby.png'
        },
        empty: {
          warpId: 'listContent', // 父布局的id;
          tip: '您还没有邀请用户，去邀请吧！', // 提示
          btntext: '去邀请', // 按钮,默认""
          btnClick: function () { // 点击按钮的回调,默认null
            if(that.webtype==='0'){
                jsCallImmediatelySharefn();
                return;
            }else{
                setTimeout(() => {
                  window.location.href = "http://test.testh5.zhulihr.com/share/shareregist.html?shareUserId=" + that.$store.state.nerUser.userid + '&platform=1&sharetype=2';
                }, 800);
            }
          }
        },
      }
    })
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
  }
};
</script>

<style lang='less' scoped>
@import url("./css/index.less");
</style>

<style>
  /*以fixed的方式固定mescroll的高度*/
  .sharedetails_box .list-content .mescroll {
    width : 7.5rem;
    position: fixed;
    top:156px;
    bottom: 0;
    height: auto;
  }

  /* .sharedetails_box .header {
    z-index: 9990;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
  } */

  .sharedetails_box .list-content .mescroll .notice {
    font-size: 14px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    text-align: center;
    color: #555;
  }
  .sharedetails_box .list-content .mescroll-empty{
    background: none;
    padding: 3.6rem 0;
    position: fixed;
    z-index: 10600;
  }
  .sharedetails_box .list-content .mescroll-empty .empty-btn{
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
  .sharedetails_box .list-content .mescroll-empty .empty-tip{
    font-size: .28rem;
    color: #757575;
  }

  .sharedetails_boxapp .list-content .mescroll {
    top:176px;
  }

</style>