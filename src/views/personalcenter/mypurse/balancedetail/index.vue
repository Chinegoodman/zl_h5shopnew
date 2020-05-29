<!-- 组件说明 -->
<template>
    <div class="wrap-balance">
        <!-- <topbanner :title="'余额明细'" v-if="$route.query.webtype==1"></topbanner> -->
        <topbanner :title="'余额明细'" v-if="$route.query.webtype==0"></topbanner>
        <div class="balance-detail">
          <div class="shaiyuantan">
            <div class="shai_cover" v-if="shai_cover_show"></div>
            <van-collapse v-model="activeNames" @change="changecollapse">
              <van-collapse-item>
              <div slot="title" class="shaiyuan-title">筛选 <van-icon/></div>
              <ul v-if="balance_detail_types.length > 0" class="det-list" >
                  <li v-for="(item,index) in balance_detail_types" :key="index" :class="{'active' : type_actvie==index}" @click="change_type(item,index)">
                    {{item.value}}
                  </li>
              </ul>
              <div>
                <span>选择时间</span>
                <span class="current-time" @click="datatimeevent">{{psot_time}}</span>
                <div class="box-time-picker">
                  <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :formatter="formatter"
                    v-if="datatime_show"
                    @confirm="confirm_time"
                    @cancel="cancel_time"
                  />
                </div>
              </div>
              <span class="btn" @click="save_search">确定</span> 
            </van-collapse-item>
          </van-collapse>
          </div> 
        </div>
        <div class="detail_list_con">
          <van-list
          class="goodslist"
          v-model="listloading"
          :finished="listfinished"
          :finished-text="finished_text"
          :error.sync="vanerror"
          error-text="请求失败，点击重新加载"
          :offset="10"
          @load="getlistinfo"
        >
          <div class="box_list">
            <div v-for="(item,index) in balance_detail_list" :key="index" class="lis-items">
              <div class="lt">
                <span class="nm">{{item.type}}</span>
                <span class="date">{{item.date}}</span>
              </div>
              <div class="rt">
                <span class="change-num">{{item.money.toFixed(2)}}</span>
                <!-- <span class="wallet">余额: {{item.source}}</span> -->
                <!-- <span class="type">{{item.desc}}</span> -->
              </div>
            </div>
          </div>
        </van-list>
        </div>
        <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
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
      Collapse,
      CollapseItem,
      Icon,
      DatetimePicker,
    //   Dialog,
      // DropdownItem,
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
    List
    // Lazyload,
    // Search
    // ====项目中可能用到的===
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
import topbanner from "@/components/topbanner";
import nodata from './../../../../components/nodata.vue'
export default {
  components: {
    topbanner,
    nodata,
    vanCollapse : Collapse,
    vanCollapseItem : CollapseItem,
    vanIcon : Icon,
    vanDatetimePicker : DatetimePicker,
    vanList : List
  },
  data() {
    return {
      nodatashow:true,
      pagetypedata:"searchdata",
      listloading: true,
      listfinished: false,
      finished_text :'加载中...',
      hasmorepage : 1,
      vanerror: false,
      nextpage : 1,
      userid:
        this.$route.query.webtype == 0
          ? this.$route.query.userid
          : this.$store.state.user.userid,

      yu_e: 0, //账户余额，
      type_actvie : 0,
      balance_detail_types : [],
      balance_detail_list :[],
      activeNames: ['1'],
      shai_cover_show : false,
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2020, 10, 1),
      currentDate: new Date(),
      datatime_show : false,
      post_type : 1,
      psot_time :  new Date().getFullYear() + '-' + ( new Date().getMonth() + 1).toString().padStart(2,'0')

    };
  },
  computed: {},
  methods: {
    //初始化配置时间picker
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    changecollapse(val){
      let that = this;
      if(val.length != ''){
        that.shai_cover_show = true;
      }else{
        that.shai_cover_show = false;
      }
      console.log(val);
    },
    //打开时间插件弹层
    datatimeevent(){
      let that = this;
      that.datatime_show = true; 
    },
    change_type(item,index){
      let that = this;
      that.type_actvie = index;
      that.post_type = item.key; 
    },
    //确认时间插件选定时间
    confirm_time(val){
      let that = this;
      let year = val.getFullYear()
      let month = (val.getMonth() + 1);
      if (month >= 1 && month <= 9) { month = `0${month}` }
      this.className = 'timeClass'
      this.timeValue = `${year}-${month}`
      that.datatime_show = false; 
      that.psot_time = this.timeValue;
      console.log(this.timeValue);
    },
    //关闭时间插件弹层
    cancel_time(){ //getwalletmoneytype
      let that = this;
      that.datatime_show = false; 
    },
    getwallettype(){
      let that = this;
      that.api.personalcenter.getwalletmoneytype({}).then(res => {
        if (res.data.code == 1) {
          that.balance_detail_types = res.data.data;
        } else {
          that.$toast(res.data.info);
        }
      });
    },
    //点击确定按钮
    save_search(){
      let that = this;
      that.balance_detail_list = [];
      that.getlistinfo();
    },
    getlistinfo(){
      let that = this;
      that.$toast.loading({
        message: "加载中...",
        duration: 200000
      }); 
      that.api.personalcenter.getwalletmoneydetail({
        userId : that.userid,
        type : that.post_type,
        beginDate : that.psot_time,
        nextPage : that.nextpage
      }).then(res => {
        console.log(res);
        that.$toast.clear();
        that.listloading = false;
        if (res.data.code == 1) {

          console.log(res.data.data.count);

          if(res.data.data.count == 0){
            that.nodatashow = true;
            that.finished_text = '';
            that.activeNames = [];
            that.shai_cover_show = false;
            that.listfinished = true;
            return;
          }

          if(res.data.data.detail && res.data.data.detail.length > 0){
            that.hasmorepage = 2;
            that.nodatashow = false;
            that.balance_detail_list = res.data.data.detail;
            that.activeNames = [];
            that.shai_cover_show = false;
          }
          console.log(that.nextpage);

          if(that.nextpage >= res.data.data.count){
            that.listloading = false;
            that.finished_text = '亲~已经到底了';
            that.activeNames = [];
            that.shai_cover_show = false;
            that.listfinished = true;
            return;
          }

          if(that.nextpage != res.data.data.count) {
            that.listfinished = false;
            that.listloading = false;
          }
          that.nextpage = that.nextpage + 1;
        } else {
          that.$toast(res.data.info);
          that.activeNames = [];
          that.shai_cover_show = false;
        }
      });
    }
  },
  mounted() {
    let that = this;
    // document.title = "我的余额";
    that.getwallettype();
    that.save_search();
  },
  beforeCreate() {
    // document.title = "我的余额";
    document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
  }, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    document.querySelector('body').setAttribute('style', '')
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
.wrap-balance {
  width: 7.5rem;
  margin: 0 auto;
  .balance-detail{
    .shai_cover{
      background: rgba(0,0,0,0.5);
      position: fixed;
      left: 0;
      right: 0;
      top: 1rem;
      bottom : 0;
    }
    .shaiyuantan{
      max-width : 7.5rem;
      background: #fff;
      position: fixed;
      left: 0;
      right: 0;
      top: 1rem;
      z-index: 100;
    }
    padding: .3rem .2rem;
    .current-time{ 
      display: block;
      width: 1.2rem; 
      padding: .08rem;
      color : #3c3c3c;
      background : #eaeaea;
      margin: .2rem .2rem .2rem 0;
      border-radius: .12rem;
      text-align: center;
    }
    .box-time-picker{
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 100;
    }
    .det-list{
      li{
        display: inline-block;
        min-width: 2.16rem;
        height: .6rem;
        line-height : .6rem;
        color : #3c3c3c;
        background : #eaeaea;
        margin: 0 .3rem .2rem 0;
        border-radius: .12rem;
        text-align: center;
      }
      li:nth-child(3n){
        margin: 0 0 .2rem 0;
      }
      li.active{
        background: rgba(255, 189, 4, 1);
        color: #fff;
      }
    }
    .btn{
      display: block;
      width: 3.2rem;
      height: .7rem;
      line-height: .7rem;
      font-size: .32rem;
      text-align: center;
      color: #fff;
      margin: .5rem auto .3rem;
      border-radius: .35rem;
      background:linear-gradient(90deg,rgba(255,207,10,1),rgba(255,188,4,1));
    }
  }
  .detail_list_con{
    padding-top: .45rem;
    .box_list{
      padding: 0 .2rem;
      .lis-items{
        min-height: 1.3rem;
        border-bottom: 1px solid rgba(0,0,0,.2);
        font-family:PingFang SC;
        position: relative;
        z-index: 1;
        font-weight:500;
        color:rgba(31,31,31,1);
        span{
          display: block;
        }
        .lt{
          position: absolute;
          left: .2rem;
          top: .23rem;
          .nm{
            font-size: .28rem;
          }
          .date{
            color:rgba(117,117,117,1);
            margin-top: .12rem;
          }
        }
        .rt{
          position: absolute;
          right: .2rem;
          top: 50%;
          z-index: 2;
          transform: translateY(-50%);
          .change-num{
            font-size: .28rem;
          }
          .wallet{
            font-size: .24rem;
            color:rgba(117,117,117,1);
            margin-top: .12rem;
          }
          .type{
            font-size: .24rem;
            color:rgba(255,189,4,1);
            margin-top: .12rem;
          }

        }  
      }
    }
  }    
}
</style>

<style lang='less'>
.wrap-balance{
  .van-cell{
    padding : .2rem;
  }
  .van-collapse-item__content{
    padding : .2rem;
  }
  .van-cell--clickable{
    position : relative;
  }
  .van-cell__right-icon{
    position: absolute;
    left: .8rem;
  }
}

//@import url()
</style>