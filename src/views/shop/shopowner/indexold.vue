<!-- 组件说明 -->
<template>
  <div class="shopkeeperswrap">
    <div class="shopkeepermass-top">
      <div class="shopbanner">
        <img :src="shopmass.banner" alt />
      </div>
      <div class="masstop-pic">
        <div class="masstop-menu clearfix">
          <div class="menu-left" @click="shopback">
            <img src="@/assets/imgs/icons/sp-pic-fanh@2x.png" alt />
          </div>
          <div class="menu-right" v-if="false" @click="showlist=!showlist">
            <img src="./../../../assets/imgs/video/xspzbgdzk@2x.png" alt />
          </div>
          <div class="rightlist" v-if="showlist">
            <div class="rightsj"></div>
            <ul class="rightlistmass">
              <li class="rightlistly clearfix">
                <div>
                  <img src="./../../../assets/imgs/icons/xiaoxi.png" alt />
                </div>
                <span>留言</span>
              </li>
              <li class="rightlistfx clearfix">
                <div>
                  <img src="./../../../assets/imgs/icons/fx.png" alt />
                </div>
                <span>分享主播</span>
              </li>
              <li class="rightlistjb clearfix">
                <div>
                  <img src="./../../../assets/imgs/icons/jb.png" alt />
                </div>
                <span>举报主播</span>
              </li>
              <li class="rightlistbjbj clearfix">
                <div>
                  <img src="./../../../assets/imgs/icons/bjth.png" alt />
                </div>
                <span>编辑背景</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="shopkeepermass-content">
      <div class="content-top clearfix">
        <div class="contenttop-left">
          <div class="left-top clearfix">
            <div class="shopkeeperpic">
              <img :src="shopmass.face_url" alt />
            </div>
            <!-- <div class="shopkeeperdprz">
              <div class="pic">
                <img src="./../../../assets/imgs/video/weiguanzhuxiasohipin@2x.png" alt />
              </div>店铺认证
            </div>
            <div class="shopkeeperdzrz">
              <div class="pic">
                <img src="./../../../assets/imgs/video/weiguanzhuxiasohipin@2x.png" alt />
              </div>主播认证
            </div>-->
          </div>
          <div class="shopkeepertit">{{shopmass.shopName}}</div>
          <div class="leftmass">
            <input
              type="text"
              placeholder="个性签名填写处，点击编写"
              class="_txtov1"
              v-model="shopmass.introduction"
            />
            <span class="mass-box">
              <span>{{shopmass.funNumber}}</span> 粉丝&nbsp;
              <span>{{shopmass.praiseNumber}}</span> 获赞
            </span>
          </div>
        </div>
        <div class="contenttop-right cleafix">
          <div class="rightimg">
            <img src="./../../../assets/imgs/icons/kzb.png" alt />
          </div>
          <div class="rightimg">
            <img src="./../../../assets/imgs/icons/psp.png" alt />
          </div>
        </div>
      </div>
      <div class="shopkeeperlist">
        <ul class="clearfix">
          <li class="shoplist cleafix">
            <div v-if="show">
              <div class="img active">
                <img src="./../../../assets/imgs/video/liwucaise@2x.png" alt />
              </div>
              <span>{{shopmass.goodsNum}}</span>
            </div>
            <div v-if="!show" @click="splist">
              <div class="img">
                <img src="./../../../assets/imgs/icons/liwuzbwp.png" alt />
              </div>
              <span>{{shopmass.goodsNum}}</span>
            </div>
          </li>
          <li class="videolist clerfix">
            <div v-if="showzb">
              <div class="img active">
                <img src="./../../../assets/imgs/icons/shipin.png" alt />
              </div>
              <span>{{shopmass.videoNumber}}</span>
            </div>
            <div @click="zblist" v-if="!showzb">
              <div class="img">
                <img src="./../../../assets/imgs/video/shipinzhihui@2x.png" alt />
              </div>
              <span>{{shopmass.videoNumber}}</span>
            </div>
          </li>
          <li class="fenslist clearfix">
            <div v-if="showgz">
              <div class="img active">
                <img src="./../../../assets/imgs/icons/wguanzhudcaiswezhaungtai.png" alt />
              </div>
              <span>{{shopmass.attentionNum}}</span>
            </div>
            <div v-if="!showgz" @click="gzlist">
              <div class="img">
                <img src="./../../../assets/imgs/icons/guanzhudrenzhihui.png" alt />
              </div>
              <span>{{shopmass.attentionNum}}</span>
            </div>
          </li>
        </ul>
        <div class="shoplistbox">
          <!-- 商品列表部分 -->
          <div class="shoplistmass" v-if="show">
            <van-list
              class="goodslist"
              v-model="listloading"
              :finished="listfinished"
              finished-text="没有更多了"
              :error.sync="vanerror"
              error-text="请求失败，点击重新加载"
              :offset="10"
              @load="shoplist"
            >
              <div
                class="goodsli"
                v-for="(item,index) in shoplistmassage"
                :key="index"
                @click="gotodetails(item)"
              >
                <img :src="item.goods_image" alt="珠宝商品" />
                <div class="goodsli_title clearfix">
                  <h2 class="_txtov2 indent">{{item.goods_title}}</h2>
                </div>
                <div class="goodsli_pricebox clearfix">
                  <p>￥{{item.price}}</p>
                  <!-- <span class="bytips" v-if="item.is_free_shipping=1">包邮</span>
                  <span class="zstips" v-if="item.is_give=1">赠</span>-->
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
            </van-list>
          </div>
          <!-- 视频列表部分 -->
          <div class="shoplistmass" v-if="showzb">
            <van-list
              class="goodslist"
              v-model="listloading"
              :finished="listfinished"
              finished-text="没有更多了"
              :error.sync="vanerror"
              error-text="请求失败，点击重新加载"
              :offset="10"
              @load="videolist"
            >
              <div class="goodsli" v-for="(items,indexs) in videolistmassage" :key="indexs">
                <img :src="items.photoUrl" alt="珠宝商品" />
                <div class="dznumber clearfix">
                  <div class="dzimg">
                    <img src="./../../../assets/imgs/living/wgzsy.png" alt />
                  </div>
                  <span>{{items.likeNum}}</span>
                </div>
                <div class="goodsli_title clearfix">
                  <h2 class="_txtov2 indent">{{items.title}}</h2>
                </div>
              </div>
            </van-list>
          </div>
          <!-- 关注列表部分 -->
          <div class="peoplelistmass" v-if="showgz">
            <van-list
              class="peoplelist"
              v-model="listloading"
              :finished="listfinished"
              finished-text="没有更多了"
              :error.sync="vanerror"
              error-text="请求失败，点击重新加载"
              :offset="10"
              @load="peoplelist"
            >
              <div
                class="peopleli clearfix"
                v-for="(itemp,index) in peoplelistmassage"
                :key="index"
              >
                <div class="peoplepic">
                  <img :src="itemp.face_url" alt />
                </div>
                <div class="peoplemass">
                  <div class="masstit clearfix">
                    <span>{{itemp.nickname}}</span>
                    <span class="xhnpic" v-if="itemp.sex==0">
                      <img src="./../../../assets/imgs/icons/nan.png" alt />
                    </span>
                    <span class="xhvpic" v-if="itemp.sex==1">
                      <img src="./../../../assets/imgs/icons/nv.png" alt />
                    </span>
                  </div>
                  <div class="massfs">
                    <span>{{itemp.funNumber}}</span> 粉丝
                    <span>{{itemp.videoNumber}}</span> 视频
                    <span>{{itemp.praiseNumber}}</span>获赞
                  </div>
                  <input
                    type="text"
                    placeholder="个性签名填写处，点击编写"
                    class="_txtov1"
                    v-model="itemp.introduction"
                  />
                </div>
                <div class="peoplebtnbox">
                  <div class="gzbtn" v-if="itemp.is_attention==false">关注</div>
                  <div class="qxgzbtn" v-if="itemp.is_attention==true">取消关注</div>
                  <div class="hxgzbtn" v-if="itemp.is_attention==true">
                    <span class="clearfix">
                      <img src="./../../../assets/imgs/video/xiaoshiopinxainghujiaohuan@2x.png" alt />互相关注
                    </span>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
        </div>
      </div>
    </div>
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
    // Search
    // ====项目中可能用到的===
    Toast
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
export default {
  components: {
    vanTab : Tab,
    vanTabs : Tabs,
    vanList : List,
    vanToast : Toast 
  },
  data() {
    return {
      showlist: false,
      show: true,
      showzb: false,
      showgz: false,
      listloading: false,
      listfinished: false,
      vanerror: false,
      peopleloading: false,
      peoplefinished: false,
      peoplevanerror: false,
      type: 1,
      product_id: "",
      sex: 0,
      shopid: "",
      shopmass: {
        shopname: ""
      },
      shop_id: "",
      shoplistmassage: [],
      peoplelistmassage: [],
      videolistmassage: [],
      nxetpageshop: "",
      nxetpagepeople: "",
      nxetpagevideo: "",
      userIdss: "",
      stylestatus: false //默认类别选择样式：隐藏
    };
  },
  computed: {},
  methods: {
    splist() {
      let that = this;
      this.show = true;
      this.showzb = false;
      this.showgz = false;
      that.shoplistmassage = [];
      that.nxetpageshop = "";
      that.shoplist();
    },
    zblist() {
      let that = this;
      this.show = false;
      this.showzb = true;
      this.showgz = false;
      that.videolistmassage = [];
      that.nxetpagevideo = "";
      that.videolist();
    },
    gzlist() {
      let that = this;
      that.show = false;
      that.showzb = false;
      that.showgz = true;
      that.peoplelistmassage = [];
      that.nxetpagepeople = "";
      that.peoplelist();
    },
    // 返回上一页
    shopback() {
      let that = this;
      that.$router.go(-1);
    },
    // 跳转商品详情
    gotodetails(goodsid) {
      //   console.log(goodsid.sku_id);
      this.$router.push({
        name: "productdetails",
        params: {
          product_id: goodsid.sku_id,
          webtype: 1
        }
      });
    },
    // 获取店主信息
    shopdzmass() {
      let that = this;
      that.shop_id = this.$route.query.shop_id;
      // console.log(that.userId);
      // console.log(that.shop_id);
      that.api.productdetails
        .getStoreInfo({
          // myId:"",
          watchid: that.userId, //用户id
          shopId: that.shop_id
        })
        .then(res => {
          that.shopmass = res.data.data;
          // console.log(that.shopmass);
          // if(that.shopmass.attentionNum>10000){
          //   that.shopmass.attentionNum = that.shopmass.attentionNu/10000+"w";
          // }
          // console.log(res.data.data);
        });
    },
    // 获取商品列表
    shoplist() {
      let that = this;
      that.api.shopmassages
        .getStoreGoodsList({
          nextpage: that.nxetpageshop,
          // nextpage:"1573721043000",
          pageSize: "",
          brand_id: that.shop_id
        })
        .then(res => {
          that.nxetpageshop = res.data.data.nextpage;
          if (res.data.data.list != null) {
            let nextmass = res.data.data.list.forEach(function(item, index) {
              that.shoplistmassage.push(item);
            });
          } else {
            this.$toast("暂无数据");
          }
          // console.log(that.nxetpageshop);
          if (that.nxetpageshop != "") {
            that.listfinished = false;
            that.listloading = false;
          } else {
            that.listfinished = true;
            that.listloading = false;
          }
          // that.shoplistmassage=res.data.data.list;
          // if(that.shopmass.attentionNum>10000){
          //   that.shopmass.attentionNum = that.shopmass.attentionNu/10000+"w";
          // }
          // console.log(res.data.data.list);
        })
        .catch(err => {
          that.listloading = false;
          that.vanerror = true;
          that.$toast("数据错误");
        });
    },
    // 获取小视频列表
    videolist() {
      let that = this;
      console.log(that.userIdss);
      that.api.shopmassages
        .getStoreGoodsVideo({
          myId: 1, //店铺人的ID（不知道是那个）
          watchid: that.userIdss, //用户id
          nextpage: that.nxetpagevideo,
          pageSize: "",
          watchid: ""
        })
        .then(res => {
          // that.peoplelistmassage=res.data.data.list;
          if (res.data.data.list != null) {
            let nextmass = res.data.data.list.forEach(function(item, index) {
              that.videolistmassage.push(item);
            });
          } else {
            this.$toast("暂无数据");
          }
          that.nxetpagevideo = res.data.data.nextpage;
          // console.log(that.nxetpagevideo);
          if (that.nxetpagevideo != "") {
            that.listfinished = false;
            that.listloading = false;
          } else {
            that.listfinished = true;
            that.listloading = false;
          }
        })
        .catch(err => {
          that.listloading = false;
          that.lvanerror = true;
          that.$toast("数据错误");
        });
    },
    // 获取关注列表
    peoplelist() {
      let that = this;
      that.api.shopmassages
        .getStoreGoodsAttention({
          myId: 1, //店铺人的ID（不知道是那个）
          watchid: that.userIdss, //用户id
          nextpage: that.nxetpagepeople,
          pageSize: "",
          watchid: ""
        })
        .then(res => {
          console.log(res.data);
          // that.peoplelistmassage=res.data.data.list;
          if (res.data.data.list != null) {
            let nextmass = res.data.data.list.forEach(function(item, index) {
              that.peoplelistmassage.push(item);
            });
          } else {
            this.$toast("暂无数据");
          }
          that.nxetpagepeople = res.data.data.nextpage;
          // console.log(that.peoplelistmassage);
          if (that.nxetpagepeople != "") {
            that.listfinished = false;
            that.listloading = false;
          } else {
            that.listfinished = true;
            that.listloading = false;
          }
        })
        .catch(err => {
          that.listloading = false;
          that.listvanerror = true;
          that.$toast("数据错误");
        });
    }
  },
  // created() {
  //   let that = this;
  //   let user = localStorage.getItem("user-info");
  //   let userj = JSON.parse(user);
  //   that.userId = userj.userid;
  //   console.log(that.userId);
  // },
  mounted() {
    let that = this;
    let user = localStorage.getItem("user-info");
    let userj = JSON.parse(user);
    that.userIdss = userj.userid;
    that.shopdzmass();
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
// 商品列表模块加载更多提示框居中
.shopkeeperswrap .van-list__error-text,
.shopkeeperswrap .van-list__finished-text,
.shopkeeperswrap .van-list__loading {
  margin: 0 auto;
  line-height: 3em;
  width: 100%;
}
</style>