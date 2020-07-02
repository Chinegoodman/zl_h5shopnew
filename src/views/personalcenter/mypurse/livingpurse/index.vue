<template>
  <div class="purseliving_wrap">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>我的钱包</span>
      <div class="mydiscount-path"  @click="mydiscountguild">账单</div>
    </div>
    <div class="purseliving-content">
      <div class="purse_banner">
        <div class="lis">
          <span class="up">
            <span class="ic"><img src="../../../../assets/imgs/personal/jijbi.png" alt="皇冠" class="huang-guan"></span>
            <span class="t">金币</span>
          </span>
          <span class="down">452236</span>
        </div>
        <div class="lis">
          <span class="up">
            <span class="ic"><img src="../../../../assets/imgs/personal/jindou.png" alt="皇冠" class="huang-guan"></span>
            <span class="t">金豆</span>
          </span>
          <span class="down">452236</span>
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
      padding-top: 1.35rem;
      .purse_banner{
          // padding: .3rem;
          width: 7.5rem;
          height: 3.33rem;
          background: url('../../../../assets/imgs/personal/cardbg.png') no-repeat center center;
          background-size: cover;
          display: flex;
          font-family:PingFang SC;
          font-weight:500;
          .lis{
              flex: 1;
              padding: .65rem .96rem .75rem;
              text-align: center;
              font-size: .28rem;
              .up{
                  display: block;
                  text-align: center;
                  
                  color:rgba(255,255,255,1);
                  .ic{
                      display: inline-block;
                      width: .32rem;
                      height: .32rem;
                      margin-right: .1rem;
                      vertical-align: middle;
                      img{
                          display: block;
                          width: 100%;
                          height: 100%;
                      }
                  }
              }
              .down{
                  display: block;
                  margin-top: .25rem;
                  font-size: .28rem;
              }
          }
      }
    }  
  }  
</style>





