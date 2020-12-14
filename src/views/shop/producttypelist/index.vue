<!-- 组件说明 -->
<template>
  <div class="productsearchwrap">
    <div class="header">
      <div class="header-icon">
        <img src="./../../../assets/imgs/icons/massicon.png" alt="">
      </div>
      <div class="header-tit">
        <img src="./../../../assets/imgs/search/findtit.png" alt="">
      </div>
      <!-- <van-icon name="search" class="search" /> -->
      <div class="header_back">
        <div class="header_inp" @click="gotosearch">输入宝贝名称或关键词</div>
      </div>
    </div>
    <div class="body">
      <div class="body_left">
        <ul class="left-one">
          <li v-for="(item,index) in titlelist" :key="index" @click="titlechange(item.category_id,index)" ref="titlep"
            class="left-one-tit">
            <p ref="titleleft" class="left-one-mass">{{item.category_name}}</p>
          </li>
        </ul>
      </div>
      <div class="body_right">
        <div class="body_right_content">
          <!-- <div class="banner_sw">
            <van-swipe :autoplay="3000" indicator-color="red">
              <van-swipe-item v-for="(image, index) in images" :key="index" @click="imageurl(image)">
                <img :src="image.img_url" />
              </van-swipe-item>
            </van-swipe>
          </div> -->
          <div class="body_right_list" style="border-bottom:0.16rem solid #F7F7F7">
            <!-- <div class="body_right_header" >
              <span class="title">{{item.two_category_name}}</span>
              <span class="title_btn">
                全部
                <van-icon name="arrow" style="position: relative;
            top: 0.01rem;" />
              </span>
            </div> -->
            <ul class="right-two">
              <li v-for="(item,index) in list" :key="index" @click="twoCategoryId(item)" class="right-two-mass">
                <img :src="item.two_category_image" alt class="right-two-img" />
                <p class="right-two-tit">{{item.two_category_name}}</p>
              </li>
            </ul>
            <nodata :pagetype="pagetypedata" v-if="nodatashow"></nodata>
          </div>
          <!-- 三级分类 -->
          <!-- <div
            v-for="(item,index) in list"
            :key="index"
            class="body_right_list"
            style="border-bottom:0.16rem solid #F7F7F7" @click="twoCategoryId(item)"
          > -->
          <!-- <div class="body_right_header">
              <span class="title">{{item.two_category_name}}</span>
              <span class="title_btn">
                全部
                <van-icon name="arrow" style="position: relative;
            top: 0.01rem;" />
              </span>
            </div> -->
          <!-- <ul>
              <li v-for="(tab,index) in item.threeCategoryInfo" :key="index" @click="threeCategoryId(tab)">
                <img :src="tab.three_category_image" alt />
                <p>{{tab.three_category_name}}</p>
              </li>
            </ul>
          </div> -->
        </div>
        <!-- <div class="bottom">
          <img src="../../../assets/imgs/shop/top.png" alt />
          上拉继续浏览
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  //import x from ''
  import nodata from './../../../components/nodata.vue'
  export default {
    components: {
      nodata
    },
    data() {
      return {
        nodatashow: false,
        pagetypedata: "classifydata",
        shleid: "",
        value: "",
        titlelist: [],
        list: [],
        images: []
      };
    },
    computed: {},
    methods: {
      goback() {
        this.$router.go(-1);
      },
      gotosearch() {
        this.$router.push({
          name: "livingsearch"
        });
      },
      titlechange(id, index) {
        console.log('id');
        console.log(id);
        let json = JSON.parse(sessionStorage.getItem("searchtitle"));
        this.titlelist = json;
        for (let i = 0; i < this.titlelist.length; i++) {
          this.$refs.titlep[i].style.background = "white";
          this.$refs.titlep[i].style.color = "#757575";
          this.$refs.titleleft[i].style.borderLeft = "0.06rem solid transparent";
        }
        this.$refs.titlep[index].style.background = "#F6F6F6";
        this.$refs.titleleft[index].style.borderLeft = "0.06rem solid #FFBD04";
        this.$refs.titlep[index].style.color = "#FFBD04";
        let that = this;
        that.api.productsearch
          .getshelves({
            oneCategoryId: id
          })
          .then(function (res) {
            console.log('res');
            console.log(res.data.code);
            if(res.data.code == 1){
              that.list = res.data.data.goodsCategoryPojo;
              if (res.data.data.goodsCategoryPojo.length > 0) {
                that.nodatashow = false;
              } else {
                that.nodatashow = true;
              }
            }else{
              that.nodatashow = true;
            }
          })
      },

      // 存储二级标题ID
      twoCategoryId(twoid) {
        let twoids = twoid.two_category_name;
        let twoidsid = twoid.two_category_id;
        sessionStorage.setItem("twoid", twoidsid);
        sessionStorage.setItem("searchname", twoids);
        this.$router.push({
          name: "searchresult"
        });
      },
      // 存储三级标题ID
      threeCategoryId(threeid) {
        let threeids = threeid.three_category_id;
        sessionStorage.setItem("threeid", threeids);
        this.$router.push({
          name: "shopindex"
        });
      },
      // banner图跳转
      imageurl(item) {
        let that = this;
        if (item.type == 1) {
          return;
        } else if (item.type == 2) {
          that.$router.push({
            name: "productdetails",
            params: {
              product_id: item.number,
              webtype: 1
            }
          });
        } else if (item.type == 3) {
          window.open(item.to_url);
        } else if (item.type == 4) {
          // 视频
          alert('视频暂未添加');
        }
      },
    },
    created() {
      let that = this;
      that.api.homedetails.bannerimg({
        flag: 1
      }).then(res => {
        if(res.data.code==1){
          that.images = res.data.data;
        }
      });
      that.api.productsearch
        .getshelves({
          oneCategoryId: that.shleid
        })
        .then(function (res) {
          if(res.data.code==1){
            that.titlelist = res.data.data.oneCategoryList;
            that.shleid = res.data.data.oneCategoryList[0].category_id;
            // console.log(that.titlelist);
            // let js = JSON.stringify(that.titlelist);
            // sessionStorage.setItem("searchtitle", js);
            // that.list = res.data.data.goodsCategoryPojo;//二级分类
            that.api.productsearch
              .getshelves({
                oneCategoryId: that.shleid
              })
              .then(function (res2) {
                if(res2.data.code==1){
                  // that.titlelist = res.data.data.oneCategoryList;
                  // console.log(that.titlelist);
                  let obj_titlelist = JSON.stringify(that.titlelist);
                  sessionStorage.setItem("searchtitle", obj_titlelist);
                  that.list = res2.data.data.goodsCategoryPojo; //二级分类
                }
                
              });
          }
        });
    },
    mounted() {
      sessionStorage.removeItem("twoid")
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

<style lang='css' scoped>
  /*
  .banner_sw
  >>>
  .van-swipe__indicators
  {
  position:
  absolute;
  left:
  85%;
  bottom:
  0.08rem;
  }
  .banner_sw
  >>>
  .van-swipe
  {
  width:
  90%;
  width:
  100%;
  width:
  5.25rem;
  }
  */
</style>

<style lang='less'>
  @import
  "./index.less";
</style>