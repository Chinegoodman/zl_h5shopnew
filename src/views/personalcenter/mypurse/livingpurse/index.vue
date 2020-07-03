<template>
  <div class="purseliving_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>我的钱包</span>
      <div class="mydiscount-path"  @click="mydiscountguild">账单</div>
    </div>
    <div class="purseliving-content">
      <div class="purse-banner">
        <div class="lis">
          <div class="top">
            <span class="jin">
              <span class="ic"><img src="../../../../assets/imgs/personal/jijbi.png" alt="金币"></span>
              <span class="t">金币</span>
            </span>
            <span class="num">452236</span>
          </div>
          <div class="btm">充值</div>
        </div>
        <div class="lis">
          <div class="top">
            <span class="jin">
              <span class="ic"><img src="../../../../assets/imgs/personal/jindou.png" alt="皇冠"></span>
              <span class="t">金豆</span>
              <span class="turn">豆转币<span class="gd"><img src="../../../../assets/imgs/personal/livingpurse-gd.png" alt="金豆"></span></span>
            </span>
            <span class="num">452236</span>
          </div>
          <div class="btm btm-color">充值</div>
        </div>
      </div>
      <div class="top-up"> 
        <h3>金币充值</h3>
        <div class="list">
          <div class="lis">
            <div class="top">
              <span class="ic"><img src="../../../../assets/imgs/personal/jbsc.png" alt="金币"></span>
              <span class="pr">600</span>
            </div>
            <div class="btm">
              <span class="ic">￥</span>
              <span class="pr">50</span>
            </div>
          </div>
          <div class="lis">
            <div class="top">
              <span class="ic"><img src="../../../../assets/imgs/personal/jbsc.png" alt="金币"></span>
              <span class="pr">600</span>
            </div>
            <div class="btm">
              <span class="ic">￥</span>
              <span class="pr">50</span>
            </div>
          </div>
          <div class="lis">
            <div class="top">
              <span class="ic"><img src="../../../../assets/imgs/personal/jbsc.png" alt="金币"></span>
              <span class="pr">5000</span>
            </div>
            <div class="btm">
              <span class="ic">￥</span>
              <span class="pr">50</span>
            </div>
          </div>
          <div class="lis">
            <div class="top">
              <span class="ic"><img src="../../../../assets/imgs/personal/jbsc.png" alt="金币"></span>
              <span class="pr">9800</span>
            </div>
            <div class="btm">
              <span class="ic">￥</span>
              <span class="pr">50</span>
            </div>
          </div>
          <div class="lis">
            <div class="top">
              <span class="ic"><img src="../../../../assets/imgs/personal/jbsc.png" alt="金币"></span>
              <span class="pr">28800</span>
            </div>
            <div class="btm">
              <span class="ic">￥</span>
              <span class="pr">50</span>
            </div>
          </div>
          <div class="lis">
            <div class="top">
              <span class="ic"><img src="../../../../assets/imgs/personal/jbsc.png" alt="金币"></span>
              <span class="pr">58800</span>
            </div>
            <div class="btm">
              <span class="ic">￥</span>
              <span class="pr">588</span>
            </div>
          </div>
        </div>
      </div>
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
    Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
export default {
    components :{
      vanTab : Tab,
      vanTabs : Tabs,
      vanList : List,
      vanToast : Toast 
    },
    data(){
        return{
          isActive : '',
          ifshow : false,
          listfinished :false,
          listloading : false,  //默认是加载中
          vanerror: false,
          finished_text : '',
          nextPage: "",
          pagechecktype: 0, //0表示初始化或下拉加载的  1表示点击事件触发的
          tab_lists : [
            {
               name : '满减券',
               tabid : 1
            },
            {
               name : '满赠券',
               tabid : 2
            },
             {
               name : '代金券',
               tabid : 3
            }
          ],
          discountlist : [], //优惠卷列表,
          discount_type : 0,
          discount_class_type : '', //用于li不一样的背景 
          discount_btn : ''  //判断按钮显示 使用 还是 领取
        }
    },
    mounted(){
      var that = this;
      let tabid = Number(this.$route.query.tabid);
      that.discount_type = tabid - 1;
      if(!that.discount_type){
        that.discount_type = 0;
      }
      that.isActive = tabid - 1;
      that.getListInfo();
    },
    methods:{
      // 进入商城首页
        gotoshop() {
          this.$router.push({ name: "shopindex" });
        },
        goback() {
          this.$router.push({ path: "/personalcenter/index" });
        },
        use_juan(index){
          this.$router.push({ name: "shopindex" });
        },
        get_juan(item,index){
          var that = this;
          that.api.personalcenter.getOneDiscountList({
            "uid" : that.$store.state.user.userid,
            "couponGroupId" : item.couponGroupId
          }).then(res => {
              console.log(res);
              if(!res.data.code)return;
              if(res.data.code == 1){
                item.is_geted = true;
                that.discountlist.splice(index,1,item);
                that.getListInfo();
              }else{
                that.$toast(res.data.info);
              }
          });
        },
        rule_show(item,index){
          var that = this;
          item.is_tips = !item.is_tips;
          that.discountlist.splice(index,1,item);
        },
        mydiscountguild(){
            let that = this;
            that.$router.push({
            path : "/personalcenter/discount/mydiscount",
            query : {
              tabid :  1
            }
          });
        },
        changeTab(index){
          let that = this;
          that.$router.push({
            path : "/personalcenter/discount",
            query : {
              tabid :  index
            }
          });
          that.discountlist = [];
          that.finished_text = '';
          that.ifshow = false;
          that.discount_type = index - 1;
          that.isActive = index;
          that.getListInfo();
        },
        getListInfo(){
          var that = this;
          if(that.pagechecktype == 1){
            that.$toast.loading({
              message: "加载中...",
              duration: 200000
            });
            that.api.personalcenter.getDiscountList({
              "uid" : that.$store.state.user.userid,
              "type" : that.discount_type
            }).then(res => {
                that.listloading = false;
                that.pagechecktype = 0;
                if(!res.data.code || !res.data.data)return;
                if(res.data.code === 1){
                  that.$toast.clear();
                  if(res.data.data.userCounpon && res.data.data.userCounpon.length > 0){
                    that.discount_class_type = res.data.data.type;
                    that.discountlist = res.data.data.userCounpon;
                    that.discountlist.forEach( (item) => {
                      item.is_tips= false;
                      item.is_geted= false;
                    }) 
                    // that.nextPage = res.data.data.nextPage;
                    that.ifshow = false;
                    // if(that.nextPage != ""){
                    //   that.listfinished = false;
                    //   that.listloading = false;
                    // }
                    that.listfinished = true;
                    that.finished_text = '';
                    that.$forceUpdate();
                  } else{
                    that.discountlist = [];
                    that.ifshow = true;
                    that.$toast.clear();
                  }
                }else{
                  throw "请求错误";
                }
            })
          }else{
            that.$toast.loading({
              message: "加载中...",
              duration: 200000
            });
            that.api.personalcenter.getDiscountList({
              "uid" : that.$store.state.user.userid,
              "type" : that.discount_type
            }).then(res => {
              if(!res.data.code || !res.data.data)return;
              if(res.data.code === 1){
                that.$toast.clear();
                if(res.data.data.userCounpon && res.data.data.userCounpon.length > 0){
                  that.discount_class_type = res.data.data.type;
                  that.discountlist = res.data.data.userCounpon;
                  that.discountlist.forEach( (item) => {
                    item.is_tips= false;
                    item.is_geted= false;
                  }) 
                  console.log(that.discountlist);
                  // that.nextPage = res.data.data.nextPage;
                  that.ifshow = false;
                  // if(that.nextPage != ""){
                  //   that.listfinished = false;
                  //   that.listloading = false;
                  // }
                  that.listfinished = true;
                  that.listloading = false;
                  that.finished_text = '';
                  that.$forceUpdate();
                }else{
                  that.discountlist = [];
                  that.ifshow = true;
                  that.$toast.clear();
                }
              }else{
                that.$toast('请求错误');
              }
            })
          }
        },
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:rgba(247,247,247,1)');
    }
}
</script>
<style lang="less">
  .purseliving_wrap {
    height:100vh;
    .header {
          width: 7.5rem;
          border-bottom: 1px solid #DEDEDE;
          background: white;
          text-align: center;
          position: fixed;
          z-index: 100;
          top: 0;

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

          .mydiscount-path{
              font-size: .26rem;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(31,31,31,1);
              position: absolute;
              right: .2rem;
              top: .46rem;
          }
    }
    
    .purseliving-content{
      width: 7.5rem;
      height: 100vh;
      padding-top: 1.15rem;
      position: relative;
      background:rgba(255,255,255,1);
      // display: flex;
      // flex-direction: column;
      // flex-wrap : wrap;
      .purse-banner{
          // padding: .3rem;
          // margin-top: 1.35rem;
          width: 7.5rem;
          height: 3.33rem;
          padding: .35rem 0;
          background: rgba(247,247,247,1) url('../../../../assets/imgs/personal/cardbg.png') no-repeat center .2rem;
          background-size: 7.29rem 3.33rem;
          display: flex;
          font-family:PingFang SC;
          font-weight:500;
          .lis{
              flex: 1;
              padding: .65rem 0 .75rem;
              text-align: center;
              font-size: .28rem;
              .top{
                .jin{
                    display: block;
                    text-align: center;
                    color:rgba(255,255,255,1);
                    .ic{
                        display: inline-block;
                        width: .32rem;
                        height: .32rem;
                        margin-right: .1rem;
                        vertical-align: middle;
                        margin-top: -.04rem;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .turn{
                      display: inline-block;
                      width: .93rem;
                      height: .3rem;
                      line-height:.3rem;
                      background:rgba(255,91,79,1);
                      border-radius: .15rem;
                      color:rgba(255,254,254,1);
                      font-size:.2rem;
                      margin-left : .06rem;
                      cursor: pointer;
                      .gd{
                        display: inline-block;
                        width : .07rem;
                        height : .13rem;
                        vertical-align : middle;
                        margin: -.04rem 0 0 .02rem;
                        img{
                          display: block;
                          width : 100%;
                          height : 100%;
                        }
                      }
                    }
                }
                .num{
                    display: block;
                    margin-top: .1rem;
                    font-size: .4rem;
                    color:rgba(255,255,255,1);
                    font-weight:bold;
                }
              }  
              .btm{
                width : 1.6rem;
                height : .52rem;
                line-height: .52rem;
                background:rgba(255,247,224,1);
                color:rgba(255,189,4,1);
                font-size : .24rem;
                border-radius:.26rem;
                margin:.42rem auto 0;
                cursor: pointer;
              }
              .btm-color{
                color:rgba(255,255,255,1);
                background:rgba(255,189,4,1);
              }
          }
      }
      .top-up{
        padding: .3rem .2rem;
        font-family:PingFang SC;
        font-weight:500;
        border-radius: .35rem;
        margin-top: .45rem;
        background:rgba(255,255,255,1);
        position: absolute;
        top: 4.5rem;
        h3{
          padding-left: .1rem;
          font-size: .3rem;
          color:rgba(31,31,31,1);
        }
        .list{
          padding-top: .3rem;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          flex-grow: 1;
          .lis{
            width: 2.08rem;
            height: 1.3rem;
            border: .02rem solid rgba(255,189,4,1);
            border-radius: .06rem;
            text-align: center;
            margin-bottom: .3rem;
            margin-right: .36rem;
            cursor: pointer;
            .top{
              padding-top: .3rem;
              .ic{
                display: inline-block;
                width: .29rem;
                height: .29rem;
                margin-right: .1rem;
                vertical-align: middle;
                margin-top: -.04rem;
                img{
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
              .pr{
                font-size: .28rem;
                color:rgba(31,31,31,1);
              }
            }
            .btm{
              color:rgba(255,189,4,1);
              font-size: .26rem;
              margin-top: .12rem;
            }
          }
          .lis:nth-child(3n){
            margin-right: 0;
          }
        }
      }
    }  
  }  
</style>





