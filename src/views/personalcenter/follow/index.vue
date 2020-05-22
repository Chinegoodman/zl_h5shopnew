<!-- 组件说明 -->
<template>
  <div class="follow">
    <!-- 头部 -->
    <div class="header">
      <p
        @click="changeadn"
        :style="{'color': (!ifadn ? '#5388AC':'black')}"
        class="btn1"
        v-if="!ifnull"
      >{{adn}}</p>
      <img class="back" @click="goback" src="../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>关注商品</span>
    </div>
    <!-- 商品为空时 -->
    <div class="body_null" v-if="ifnull">
      <div class="banner">
        <img src="../../../assets/imgs/follow/shucairen.png" alt />
      </div>
      <p class="banner_title">
        <span>空空如也好伤心</span>
        <br />
        <span>快去逛逛吧</span>
      </p>
      <button>逛一逛</button>
      <div class="translate">
        <span style="color:#E26321">—</span>
        <img src="../../../assets/imgs/follow/zan.jpg" alt /> 为您推荐
        <span style="color:#E26321">—</span>
      </div>
      <ul class="recommend">
        <li>
          <img src="../../../assets/imgs/follow/shucairen.png" alt />
          <p class="recommend_title">美国进口莫桑石D色18K金莫桑钻石吊坠牛头款</p>
          <div class="price">
            <span>$</span>1159
            <span>.99</span>
            <p class="tab">包邮</p>
            <div class="icon">赠</div>
          </div>
        </li>
        <li>
          <img src="../../../assets/imgs/follow/shucairen.png" alt />
          <p class="recommend_title">
            美国进口莫桑石D色18K金
            莫桑钻石吊坠牛头款罗子
          </p>
          <div class="price">
            <span>$</span>1159
            <span>.99</span>
            <p class="tab">包邮</p>
            <div class="icon">赠</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 商品不为空时 -->
    <div class="body_full" v-if="!ifnull">
      <div class="header_full">
        <ul class="header_ul">
          <li>
            热门
            <img class="icon" style="width:0.26rem;height:0.26rem" src="../../../assets/imgs/follow/close-area.png" alt />
          </li>
          <li>
            价格
            <img class="icon" src="../../../assets/imgs/follow/follow-updown.png" alt />
          </li>
          <li @click="filter" :style="{'color': (ifshow ? 'red':'black')}">
            筛选
            <img class="icon" src="../../../assets/imgs/follow/follow-filter.png" alt />
          </li>
        </ul>
      </div>
      <!-- 隐藏部分 -->
      <div class="check" v-show="ifshow">
        <div>
          <p>材质</p>
          <ul>
            <li>黄金</li>
            <li>纯金</li>
            <li>千足金</li>
            <li>铂金</li>
          </ul>
        </div>
        <div>
          <p>部位</p>
          <ul>
            <li>颈部</li>
            <li>手部</li>
            <li>腰部</li>
            <li>胸部</li>
          </ul>
        </div>
      </div>
      <ul class="body_list">
        <li v-for="(item,index) in list" :key="index">
          <div class="body_list_center">
            <div v-if="!ifadn" ref="chtitle" class="checked" @click="checktitle(index)"></div>
            <img class="banner1" src="../../../assets/imgs/follow/shucairen.png" alt />
            <div class="body_title">
              <p class="title_master">绳奇公母貔貅黄金手链男款硬足金999转运珠六字真言皮丘…</p>
              <p />
              <p class="title_people">
                <span>6725人收藏</span>
                <img src="../../../assets/imgs/follow/xiangqing@2x.png" />
              </p>
              <p class="price">
                <span>$1159</span>
                <span style="font-size:0.12rem">.99</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="footer" v-if="!ifadn">
        <div class="clickicon" ref="clickicon"></div>
        <span v-if="clickall" class="allcheck" @click="checkall">全选</span>
        <span v-else class="allcheck" @click="clearall">全选</span>
        <div class="delete">删除</div>
        <span class="title">已选 1 件</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ifnull: 0,
      ifshow: 0,
      ifadn: 1,
      adn: "管理",
      list: [0, 1],
      checked: [],
      clickall: true
    };
  },
  computed: {},
  methods: {
    // 多选
    checktitle(index) {
      var idx = this.checked.indexOf(index);
      if (this.$refs.chtitle[index].className == "checked") {
        this.$refs.chtitle[index].className = "checked addcheck";
        if (this.checked.length < 2) {
          this.checked.push(index);
        }
        if (this.checked.length == 2) {
          var len = this.list.length;
          for (var i = 0; i < len; i++) {
            this.$refs.chtitle[i].className = "checked addcheck";
          }
          this.$refs.clickicon.className = "clearcheck";
          this.clickall = false;
        }
      } else {
        this.$refs.chtitle[index].className = "checked";
        this.$refs.clickicon.className = "clickicon";
        this.checked.splice(idx, 1);
        this.clickall = true;
      }
    },
    changeadn() {
      this.ifadn = !this.ifadn;
      if (this.ifadn) {
        this.adn = "管理";
      } else {
        this.adn = "完成";
      }
    },
    goback() {
      this.$router.go(-1);
    },
    filter() {
      this.ifshow = !this.ifshow;
    },
    // 全选
    checkall() {
      var len = this.list.length;
      for (var i = 0; i < len; i++) {
        this.$refs.chtitle[i].className = "checked addcheck";
        this.checked.push(i);
      }
      this.$refs.clickicon.className = "clearcheck";
      this.clickall = false;
    },
    // 取消全选
    clearall() {
      var len = this.list.length;
      for (var i = 0; i < len; i++) {
        this.$refs.chtitle[i].className = "checked";
      }
      this.checked = [];
      this.$refs.clickicon.className = "clickicon";
      this.clickall = true;
    }
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>