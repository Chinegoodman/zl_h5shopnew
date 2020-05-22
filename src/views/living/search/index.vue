<!-- 组件说明 -->
<template>
  <div class="search">
    <div class="search_inp">
      <form action="/">
        <van-search
          @search="enter"
          shape="round"
          v-model="homesearchmassage.keyword"
          placeholder="输入宝贝的名称或关键词"
          show-action
          @cancel="searchback"
        />
      </form>
    </div>
    <div class="search_body" v-if="searched">
      <div class="search_history clearfix">
        <span>搜索历史</span>
        <div class="searchdel" @click="searchclear">
          <img src="../../../assets/imgs/icons/sscsc.png" alt="">
        </div>
        <div class="history_table clearfix">
          <div class="history_list" v-for="(item,index) in searchold" :key="index" @click="enterold(item)">{{item}}</div>
          <div v-if="searchold.length==0" class="history_list">暂无搜索历史</div>
        </div>
      </div>
      <div class="search_history" v-if="false">
        <span>大家在搜</span>
        <div class="history_table">
          <div class="history_list">黄金</div>
          <div class="history_list">千足金</div>
          <div class="history_list">黄金</div>
          <div class="history_list">黄金</div>
          <div class="history_list">黄金</div>
          <div class="history_list">黄金</div>
        </div>
      </div>
    </div>
    <div class="search_recommend" v-if="searched&&false">
      <div class="search_recommend_title">
        <span style="color:#E26321">一</span>&nbsp;&nbsp;
        <img
          class="title_img"
          src="../../../assets/imgs/living/zhibosousuoyetuijian.png"
          alt
        />为您推荐
        <span style="color:#E26321">&nbsp; 一</span>
      </div>
      <ul class="search_table_list">
        <li>
          <img class="titleimg_top" src="../../../assets/imgs/living/zbz.png" alt />
          <div class="title_bottom">
            <img class="touxiang" src="../../../assets/imgs/living/sytx.png" alt />
            <span class="tname">短腿的橘子</span>
            <br />
            <span class="renshu">
              <img src="../../../assets/imgs/living/sygk.png" alt /> 2542
            </span>
            <img class="img_xin" src="../../../assets/imgs/living/wgzsy.png" alt />
          </div>
        </li>
        <li>
          <img class="titleimg_top" src="../../../assets/imgs/living/zbz.png" alt />
          <div class="title_bottom">
            <img class="touxiang" src="../../../assets/imgs/living/sytx.png" alt />
            <span class="tname">短腿的橘子</span>
            <br />
            <span class="renshu">
              <img src="../../../assets/imgs/living/sygk.png" alt /> 2542
            </span>
            <img class="img_xin" src="../../../assets/imgs/living/wgzsy.png" alt />
          </div>
        </li>
      </ul>
    </div>
    <div class="srarch_list" v-if="ifshow">
      <div id="list">
        <div class="goodslist">
          <div
            @click="gotodetails(item.sku_id)"
            class="goodsli"
            v-for="(item,index) in homelistmassage"
            :key="index"
          >
            <img :src="item.goods_image" alt="珠宝商品" />
            <div class="goodsli_title clearfix">
              <img :src="item.brand_logo" alt="icon" />
              <h2 class="_txtov2 indent">{{item.goods_title}}</h2>
            </div>
            <div class="goodsli_pricebox clearfix">
              <p>￥{{item.price}}</p>
              <span class="bytips" v-if="item.is_free_shipping=1">包邮</span>
              <span class="zstips" v-if="item.is_give=1">赠</span>
            </div>
            <div class="goodsli_numberbox">
              <span>{{item.evaluationNumber}}条评论</span>
              <span>{{item.percentageOfEvaluation}}好评</span>
            </div>
            <div class="goodsli_linksbox">
              <div class="shop">{{item.brand_name}}</div>
              <div class="details">详情</div>
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
    // Tab,
    // Tabs,
    // List,
    // Lazyload,
    Search
    // ====项目中可能用到的===
    // Toast,
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
export default {
  components: {
    vanSearch:Search
  },
  data() {
    return {
      value: "",
      searched: true,
      ifshow: false,
      homesearchmassage: {
        keyword: "", //关键字
        sort: 1, //排序 1:升序/2:降序
        hot: 0, //0:默认/1:热门/2:推荐/3:火爆
        oneCategoryId: 0, //一级分类ID 默认：0
        twoCategoryId: 0, //二级分类ID 默认：0
        threeCategoryId: 0 //三级分类ID 默认：0
      },
      homesearchlist: [],
      listloading: false,
      listfinished: false,
      vanerror: false,
      gold_type: 101,
      stylestatus: false, //默认类别选择样式：隐藏
      homelistmassage: [], //商品列表
      searchold: [], //搜索历史
      // searcholdhx: [] //搜索历史回显
    };
  },
  computed: {},
  methods: {
    enter() {
      // if (e.keyCode == 13) {
      if(this.homesearchmassage.keyword!=""){
        this.searchold.push(this.homesearchmassage.keyword)
        var arr = this.searchold;
        // eslint-disable-next-line no-inner-declarations
        function unique(arr) {
          return Array.from(new Set(arr));
        }
        sessionStorage.setItem("livingsearchdata", arr);
        this.searchold = unique(this.searchold);
        let searchname = this.homesearchmassage.keyword;
        sessionStorage.setItem("searchname", searchname);
        this.$router.push({ name: "searchresult" });
      }
      // if(this.searchold.push(this.homesearchmassage.keyword) && arr!=""){
      // }
      // }
    },
    // 搜索历史按钮搜索
    enterold(item){
      this.homesearchmassage.keyword=item;
      sessionStorage.setItem("searchname", item);
      this.$router.push({ name: "searchresult" });
    },
    // 返回上一页
    searchback(){
      let that = this;
      that.$router.go(-1);
    },
    // 清空历史搜索
    searchclear(){
      let that = this;
      that.searchold=[];
      sessionStorage.removeItem("livingsearchdata");
    },
    // 跳转到商品详情
    gotodetails(skuid) {
      let that = this;
      // this.$router.push({
      //   name: "productdetails",
      //   params: {
      //     product_id: skuid,
      //     webtype: 1
      //   }
      // });
      that.$router.push({
        path: `/shop/productdetails/${skuid}/1`,
        // query: { liveId: that.livinglidata.uid }
      });
    },
  },
  mounted() {
    if(sessionStorage.getItem("livingsearchdata")!=null){
      this.searchold=sessionStorage.getItem("livingsearchdata").split(",");
    }
    
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
@import "./index.less";
</style>