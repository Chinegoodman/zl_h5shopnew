<!-- 组件说明 -->
<template>
  <div class="videoswrap">
    <div class="video">
      <video
        x5-video-orientation="portraint"
        loop
        autoplay
        controls
        muted
        x-webkit-airplay="allow"
        playsinline="true"
        x5-video-player-fullscreen="true"
        style="object-fit: contain; width: 100%; min-height: 100%; display: block;"
        preload="auto"
        poster="shareImg/videoImg.jpg"
        webkit-playsinline="true"
      >
        <source src="http://playback.17biyi.com/a6fa91ce0a439c50a3376e430cc15852" type="video/mp4" />
      </video>
    </div>
    <!-- 视频信息部分 -->
    <div class="video-content">
      <router-link :to="{name:'videosindex'}">
        <div class="videoback">
          <img src="./../../../assets/imgs/video/fanhui@2x.png" alt />
        </div>
      </router-link>
      <div class="videocon-left">
        <div class="videobq">最美新疆</div>
        <div class="videozuoz">
          <span>@</span>
          <span>短腿的桃子</span>
        </div>
        <div
          class="videomassage _txtov5"
        >和田玉，"中国四大名玉"之一 (其三为陕西蓝田玉、辽宁岫玉 和河南独山玉)。传统狭义范畴 特指新疆和田地区出产的玉石， 以和田"子料"为代表闻名于</div>
        <div class="videomusic clearfix">
          <div class="music-pic">
            <img src="./../../../assets/imgs/video/yinyue@2x.png" alt />
          </div>
          <span class="music-name">新疆人民欢迎你</span>
        </div>
      </div>
      <div class="videocon-right">
        <div class="videotx">
          <div class="videotx-pic">
            <img src="./../../../assets/imgs/video/xiaopshipintouxaing@2x.png" alt />
          </div>
          <div class="videotx-bk">
            <img src="./../../../assets/imgs/video/zbq@2x.png" alt />
          </div>
          <template>
            <div v-if="videomass.videogz == 0" class="videoygz">
              <img src="./../../../assets/imgs/video/guanzhuxihuan@2x.png" alt />
            </div>
            <div v-if="videomass.videogz == 1" class="videowgz">
              <img src="./../../../assets/imgs/video/weiguanzhuxiaoshipin@2x.png" alt />
            </div>
          </template>
        </div>
        <div class="videodz">
          <div class="videodz-pic">
            <img src="./../../../assets/imgs/video/xihuan@2x.png" alt />
          </div>
          <div class="videodz-num">1420</div>
        </div>
        <div class="videopl">
          <div class="videopl-pic">
            <img src="./../../../assets/imgs/video/liuyan@2x.png" alt />
          </div>
          <div class="videopl-num">2563</div>
        </div>
        <div class="videofx">
          <div class="videofx-pic">
            <img src="./../../../assets/imgs/video/zhuanfa@2x.png" alt />
          </div>
          <div class="videofx-num">0</div>
        </div>
        <div class="videoyiny">
          <div class="videoyiny-dp">
            <div class="videoyiny-pic">
              <img src="./../../../assets/imgs/video/tx@2x.png" alt />
            </div>
          </div>
          <div class="yiny1">
            <img src="./../../../assets/imgs/video/yy1@2x.png" alt />
          </div>
          <div class="yiny2">
            <img src="./../../../assets/imgs/video/yy2@2x.png" alt />
          </div>
          <div class="yiny3">
            <img src="./../../../assets/imgs/video/yy3@2x.png" alt />
          </div>
          <div class="yiny4">
            <img src="./../../../assets/imgs/video/yy4@2x.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      videomass: {
        videoser: "",
        videoname: "",
        videogz: 0
      }
    };
  },
  computed: {},
  methods: {},
  mounted() {},
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
//@import url();
</style>