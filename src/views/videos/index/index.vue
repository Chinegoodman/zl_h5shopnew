<!-- 组件说明 -->
<template>
  <div class="videoswrap">
    <div class="header">
      <img src="@/assets/imgs/icons/logo.png" alt="聚美金品" class="lefticon" />
      <div @click="searchtz" class="searchbtn">
        <img src="@/assets/imgs/video/fangdj@2x.png" alt="聚美金品" />
        <p class="_txtov1">大家都在搜“大美新疆”大家都在搜“大美新疆”大家都在搜“大美新疆”大家都在搜“大美新疆”</p>
      </div>
      <div class="rightbtn">
        <img src="@/assets/imgs/icons/xiaoxqp.png" alt="聚美金品 无消息" />
      </div>
    </div>
    <!-- <div class="video-search clearfix">
      <div class="search-box clearfix" @click="searchtz">
        <div class="search-pic">
          <img src="./../../../assets/imgs/video/fangdj@2x.png" alt />
        </div>
        <input type="text" class="search-inp" placeholder="工艺、好玩" />
      </div>
      <div class="xiaoxi">
        <img src="@/assets/imgs/icons/xiaoxqp.png" alt />
      </div>
    </div> -->
    <!-- 视频列表导航 -->
    <van-tabs @click="titleclick">
      <van-tab
        v-for="(tit, index) in titlistmassage"
        :title="tit.category_name"
        :name="tit.category_id"
        :key="index"
      >
        <!-- 标签对应的内容 {{ index }} -->
      </van-tab>
    </van-tabs>
    <!-- 视频列表  -->
    <van-list
      class="video-content"
      v-model="listloading"
      :finished="listfinished"
      finished-text="没有更多了"
      :error.sync="vanerror"
      error-text="请求失败，点击重新加载"
      :offset="10"
      @load="videolistjk"
    >
      <div class="video-box" v-for="(videoli,index) in videolist" :key="index">
        <router-link :to="{name:'videosdetails'}" class="videoa">
          <div class="video-pic">
            <img :src="videoli.photoUrl" alt />
          </div>
          <div class="video-tit">{{videoli.title}}</div>
        </router-link>
        <div class="video-mass clearfix">
          <router-link :to="{name:'personaldz'}" class="videoa">
            <div class="mass-pic">
              <img :src="videoli.faceUrl" alt />
            </div>
            <div class="mass-tit _txtov1">{{videoli.nickname}}</div>
          </router-link>
          <div class="videodz">
            <img src="./../../../assets/imgs/video/weiguanzhuxiasohipin@2x.png" alt />
          </div>
          <div class="videodz-num">{{videoli.likeNum}}</div>
        </div>
      </div>
      <!-- <div class="video-box">
      <router-link :to="{name:'videosdetails'}" class="videoa">
        <div class="video-pic">
          <img src="./../../../assets/imgs/video/xiaoshipintu2@2x.png" alt />
        </div>
        <div class="video-tit">游玩新疆，带你们看遍新疆的风采</div>
      </router-link>
      <div class="video-mass clearfix">
        <router-link :to="{name:'personaldz'}" class="videoa">
          <div class="mass-pic">
            <img src="./../../../assets/imgs/video/xiaopshipintouxaing@2x.png" alt />
          </div>
          <div class="mass-tit _txtov1">短腿的橘子</div>
        </router-link>
        <div class="videodz">
          <img src="./../../../assets/imgs/video/weiguanzhuxiasohipin@2x.png" alt />
        </div>
        <div class="videodz-num">20W</div>
      </div>
      </div>-->
    </van-list>
    <!-- 跳转按钮 -->
    <router-link :to="{name:'livingindex'}">
      <div class="videozbsp">
        <img src="./../../../assets/imgs/video/wyaopai@2x.png" alt />
      </div>
    </router-link>
  </div>
</template>

<script>
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

export default {
  components: {
    vanTab : Tab,
    vanTabs : Tabs,
    vanList : List 
  },
  data() {
    return {
      active: 1,
      activeName: 101,
      videolist: [], //视频列表
      titlistmassage: [], //头部导航数据
      nextpage: "",
      number: 0,
      listloading: false,
      listfinished: false,
      vanerror: false,
      gold_type: 101,
      stylestatus: false //默认类别选择样式：隐藏
    };
  },
  computed: {},
  methods: {
    // 搜索跳转
    searchtz(){
      this.$router.push({ name: "livingsearch" });
    },
    // 获取头部导航数据
    titlelistmass() {
      let that = this;
      that.api.homedetails.titlelist({}).then(res => {
        // console.log(res.data);
        that.titlistmassage = res.data.data;
      });
    },
    // 头部导航点击事件
    titleclick(name, title) {
      let that = this;
      that.activeName = name;
      // console.log(that.activeName);
      that.videolistjk();
    },
    // 视频列表接口
    videolistjk() {
      // debugger;
      let that = this;
      that.api.videodetails
        .getvideolist({
          nextpage: that.nextpage
          // topCategoryId: that.activeName
        })
        .then(res => {
          console.log(res.data);
          // that.videolist = [];
          if (res.data.data.list != null) {
            // debugger;
            let nextmass = res.data.data.list.forEach(function(item, index) {
              that.videolist.push(item);
            });
          } else {
            this.$toast("暂无数据");
          }
          that.nextpage = res.data.data.nextpage;
          // debugger;
          if (that.nextpage != "") {
            that.listfinished = false;
            that.listloading = false;
          } else {
            that.listfinished = true;
            that.listloading = false;
          }
        })
        .catch(err => {
          that.listloading = false;
          that.vanerror = true;
          that.$toast("数据错误");
        });
    }
  },
  mounted() {
    let that = this;
    that.titlelistmass();
  },
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
@import url("./css/index.less");
</style>

<style lang='less'>
.videoswrap .van-list__finished-text,
.videoswrap .van-list__loading {
  position: absolute;
  bottom: 0rem;
  width: 95%;
}
.videoswrap .van-tabs__wrap--scrollable .van-tabs__nav {
  margin: 0.06rem 0rem;
}
.videoswrap .van-tabs__nav--line {
  padding-bottom: 0.25rem;
}
.videoswrap .van-tab--active {
  font-weight: bold;
  font-size: 0.38rem;
}
.videoswrap .van-list__error-text{
  width:100%;
}
</style>