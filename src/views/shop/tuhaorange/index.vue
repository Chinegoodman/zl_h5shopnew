<!-- 组件说明 -->
<template>
  <div class="tuhaorangewrap" :style="{'height':innerHeight}">
    <div class="tuhaorange-con">
      <div class="toparea"  ref="toparea">
        <div class="header">
          <img class="back" @click="shopback" src="../../../assets/imgs/shop/returnprev.png" alt />
          <span>土豪榜</span>
        </div>
        <div class="topnav">
          <ul>
            <li :class="{'active' : navactive===index}" v-for="(datanav,index) in dateNavlist" :key="index" @click="dateNavClick(index)">
              <span>{{datanav.name}}</span>
            </li>
          </ul>
        </div>
        <div class="notice">
          <span><img src="../../../assets/imgs/shop/tz-tips.png" alt=""></span>
          <div>土豪榜按用户打赏花费的金币进行排行，每日0点结算。</div>
        </div>
      </div>
      <div class="list-area" ref="listarea" :style="{'height' : pageBottomHieght}">
         <div class="area-cover" ref="areaCover" :style="{'height' : areaCoverHeight}"></div>
         <div class="area-box"  ref="areaBox" :style="{'height' : pageBottomHieght}">
           <div class="topthree">
              <ul>
                <li>
                  <span class="range">
                    <img src="../../../assets/imgs/icons/hg.png" alt="">           
                    </span>
                  <span class="hd">
                    <img :src="ShowGiftTopByDateList[0] && ShowGiftTopByDateList[0].avatar?ShowGiftTopByDateList[0].avatar:default_img_head" alt="">
                  </span>
                  <span class="nm">{{ShowGiftTopByDateList[0] && ShowGiftTopByDateList[0].nickName?ShowGiftTopByDateList[0].nickName:'虚伪以待'}}</span>
                  <span class="level"><viplevel :lv_num="ShowGiftTopByDateList[0] && ShowGiftTopByDateList[0].level?ShowGiftTopByDateList[0].level:'1'"></viplevel></span>
                  <span class="jb">
                    <span class="j"><img src="../../../assets/imgs/icons/gcjg.png" alt=""></span>
                    <span class="n">{{ShowGiftTopByDateList[0]&& ShowGiftTopByDateList[0].price?ShowGiftTopByDateList[0].price:''}}</span>
                  </span>
                </li>
                <li>
                  <span class="range">
                    <img src="../../../assets/imgs/icons/by.png" alt="">           
                    </span>
                  <span class="hd">
                    <img :src="ShowGiftTopByDateList[1] && ShowGiftTopByDateList[1].avatar?ShowGiftTopByDateList[1].avatar:default_img_head" alt="">
                  </span>
                  <span class="nm">{{ShowGiftTopByDateList[1] && ShowGiftTopByDateList[1].nickName?ShowGiftTopByDateList[1].nickName:'虚伪以待'}}</span>
                  <span class="level"><viplevel :lv_num="ShowGiftTopByDateList[1] && ShowGiftTopByDateList[1].level?ShowGiftTopByDateList[1].level:'1'"></viplevel></span>
                  <span class="jb">
                    <span class="j"><img src="../../../assets/imgs/icons/gcjg.png" alt=""></span>
                    <span class="n">{{ShowGiftTopByDateList[1] && ShowGiftTopByDateList[1].price ? ShowGiftTopByDateList[1].price:''}}</span>
                  </span>
                </li>
                <li>
                  <span class="range">
                    <img src="../../../assets/imgs/icons/jt.png" alt="">                  
                    </span>
                  <span class="hd">
                    <img :src="ShowGiftTopByDateList[2] && ShowGiftTopByDateList[2].avatar?ShowGiftTopByDateList[2].avatar:default_img_head" alt="">
                  </span>
                  <span class="nm">{{ShowGiftTopByDateList[2] && ShowGiftTopByDateList[2].nickName ? ShowGiftTopByDateList[2].nickName:'虚伪以待'}}</span>
                  <span class="level"><viplevel :lv_num="ShowGiftTopByDateList[2] && ShowGiftTopByDateList[2].level?ShowGiftTopByDateList[2].level:'1'"></viplevel></span>
                  <span class="jb">
                    <span class="j"><img src="../../../assets/imgs/icons/gcjg.png" alt=""></span>
                    <span class="n">{{ShowGiftTopByDateList[2] && ShowGiftTopByDateList[2].price ? ShowGiftTopByDateList[2].price :''}}</span>
                  </span>
                </li>
              </ul>
           </div>
           <hr/>
           <div class="from-four">
              <div class="list-wrap">
                <van-list
                class="list"
                v-model="listloading"
                :finished="listfinished"
                :finished-text="finished_text"
                :error.sync="vanerror"
                error-text="请求失败，点击重新加载"
                :immediate-check="false"
                :offset="10"
                @load="getShowGiftTopListByDate"
                >
                  <div class="li"
                        v-for="(item,index) in ShowGiftTopByDateList"
                        :key="index"
                        :id="item.liveId"
                        v-if="item.sort > 3"
                  >
                      <span class="sort-num">{{item.sort?item.sort:1}}</span>
                      <span class="hd">
                        <img :src="item.avatar" alt />
                      </span>
                      <div class="rt">
                        <span class="tit">{{item.nickName}}</span>
                        <span class="lv">
                          <viplevel :lv_num="item.level?item.level:'01'"></viplevel>
                        </span>
                      </div>
                      <span class="jb">
                          <span class="j"><img src="../../../assets/imgs/icons/gcjg.png" alt=""></span>
                          <span class="n">{{item.price}}</span>
                      </span>
                  </div>
                  </van-list>
                </div>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import viplevel from '@/components/viplevel.vue';
//import x from ''

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
    // ====项目中可能用到的===
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import {
  setsessionStorage
} from "./../../../utils/index.js";
export default {
  components: {
    vanTab: Tab,
    vanTabs: Tabs,
    vanList: List,
    viplevel 
  },
  data() {
    return {
      pageBottomHieght : 0,
      areaCoverHeight : 0,
      contentHeight : 0,
      navactive : 0,
      datetype : 1,
      dateNavlist : [
          {
            name : '日榜',
            type : 0
          },
          {
            name : '周榜',
            type : 1
          },
          {
            name : '月榜',
            type : 2
          }
      ],
      lv_num : 0,
      listloading: false, //在线用户vantlist加载
      listfinished: false,
      finished_text: '',
      vanerror: false,
      nextpage : 1,
      ShowGiftTopByDateList :[
        {
          avatar:'',
          nickName : '',
          level :'',
          price : ''
        },
        {
          avatar:'',
          nickName : '',
          level :'',
          price : ''
        },
        {
          avatar:'',
          nickName : '',
          level :'',
          price : ''
        }
      ],
      default_img_head : require('../../../assets/imgs/icons/default-head.png')
    };
  },
  computed: {
    innerHeight(){
      return window.innerHeight + 'px';
    }
  },
  methods: {
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.push(
        {
          path:'/shop/index',
          query : {
            tab : that.navactive
          }
      });
    },
    
    openinvoiceshellshell(){
      this.invoiceshellshow = true;
    },
    shutinvoiceshellshell(){
      this.invoiceshellshow = false;
    },
    /*时间选择 */
    dateNavClick(index){
      let that = this;
      that.navactive = index;
      that.datetype = index + 1;
      that.$router.push(
        {
          path:'/shop/tuhaorange',
          query : {
            tab : that.navactive
          }
      });
      that.ShowGiftTopByDateList = [];
      that.nextpage = 1;
      that.getShowGiftTopListByDate();

    },
    //在线人数列表
    getShowGiftTopListByDate() {
        let that = this;
        that.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 200000
        });
        this.api.homedetails
            .showGiftTopListByDate({
                cycleType: that.datetype,
                type: 1,
                appType : 1,
                page: that.nextpage,
                pageSize: 20
            })
            .then(res => {
                that.$toast.clear();
                that.listloading = false;
                if (res.data.code == 1) {
                    that.nextpage = res.data.data.page;
                    if (res.data.data.list && res.data.data.list.length > 0) {
                        // that.nodatashow = false;
                        that.hasmorepage = 2;
                        res.data.data.list.forEach(e => {
                            that.ShowGiftTopByDateList.push(e);
                        });
                    }

                    if (that.nextpage == res.data.data.totalPage) {
                        that.listfinished = true;
                        that.listloading = false;
                        that.finished_text = '亲~已经到底了';
                        return;
                    }

                  
                    if (that.nextpage != res.data.data.totalPage) {
                      that.listfinished = false;
                      that.listloading = false;
                      that.nextpage++
                    } 
                    // else {
                    //     if (that.hasmorepage === 1) {
                    //         // that.nodatashow = true;
                    //     } else {
                    //         that.listloading = false;
                    //         that.finished_text = '亲~已经到底了';
                    //     }
                    //     that.listfinished = true;
                    // }
                    that.$forceUpdate();
                    that.$toast.clear();
                }
            })
    }
  },
  // created() {
  //   let that = this;
  //   that.userId = that.$store.state.user.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
    that.userID = that.$store.state.user.userid;
    that.getShowGiftTopListByDate(); //上来加载默认发票
    
    let topAreaHeight = that.$refs.toparea.offsetHeight;
    that.pageBottomHieght = (window.innerHeight - topAreaHeight) + 'px';
    that.areaCoverHeight = (window.innerHeight - topAreaHeight - 130) + 'px';

    if(this.$route.query.tab != undefined){
      let tab = Number(this.$route.query.tab);
      that.dateNavClick(tab);
    }
    

  },
  beforeCreate() {
    // document.querySelector('body').setAttribute('style', 'background-color: #FFBD04')
  },
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
    // document.querySelector('body').setAttribute('style', '')
  },
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import url("./css/index.less");
</style>
<style lang='less'>
  .invoice-con ul li .van-radio__icon--checked .van-icon{
    background:rgba(255,189,4,1);
    border-color: rgba(255,189,4,1);
  }
  .invoice-con ul li .van-switch{
    width: .9rem;
    height: .3rem;
    border-width : 2px;
  }
  .invoice-con ul li .van-switch__node{
    width: .3rem;
    height: .3rem;
    border : 1px solid rgba(0,0,0,.1);
  }
</style>
