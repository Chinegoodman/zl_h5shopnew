<template>
  <!-- <div id="app" @mousemove="appmousemove" @mouseover="appmousemove"> -->
  <div id="app">
    <router-view/>

    <div class="bottomnav" v-show="bottomnavifshow">
      <router-link :to="{name:'shopindex'}">
        <div class="default">
          <img src="@/assets/imgs/bottomnav/shopactivenew.png" alt="" srcset="">
          <span>首页</span>
        </div>
        <div class="active homeicon">
          <img src="@/assets/imgs/bottomnav/shopnew.png" alt="" srcset="">
          <!-- <span>商城</span> -->
        </div>
      </router-link>
      <router-link :to="{name:'producttypelist'}">
        <div class="default">
          <img src="@/assets/imgs/bottomnav/search.png" alt="" srcset="">
          <span>分类</span>
        </div>
        <div class="active">
          <img src="@/assets/imgs/bottomnav/searchactive.png" alt="" srcset="">
          <span>分类</span>
        </div>
      </router-link>
      <!-- <router-link :to="{name:'videosindex'}">
        <div class="default">
          <img src="@/assets/imgs/bottomnav/videos.png" alt="" srcset="">
          <span>小视频</span>
        </div>
        <div class="active">
          <img src="@/assets/imgs/bottomnav/videosactive.png" alt="" srcset="">
          <span>小视频</span>
        </div>
      </router-link>
      <router-link class="shop" :to="{name:'shopindex'}">
        <div class="default">
          <img src="@/assets/imgs/bottomnav/shop.png" alt="" srcset="">
        </div>
        <div class="active">
          <img src="@/assets/imgs/bottomnav/shopactive.png" alt="" srcset="">
        </div>
      </router-link> -->
      <router-link :to="{name:'shopcart'}">
        <div class="default">
          <img src="@/assets/imgs/bottomnav/shopcarnew.png" alt="" srcset="">
          <span>购物车</span>
        </div>
        <div class="active">
          <img src="@/assets/imgs/bottomnav/shopcarnewactive.png" alt="" srcset="">
          <span>购物车</span>
        </div>
      </router-link>
      <router-link :to="{name:'personalcenterindex'}">
        <div class="default">
          <img src="@/assets/imgs/bottomnav/myself.png" alt="" srcset="">
          <span>我的</span>
        </div>
        <div class="active">
          <img src="@/assets/imgs/bottomnav/myselfactive.png" alt="" srcset="">
          <span>我的</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>

    import {remset} from './utils/remset.js';
    export default {
        metaInfo: {
          title: '抓周直播电商平台 - 黄金购物价格_今日黄金价格_最新黄金价格_黄金价格走势_24小时走势_历史走势_走势分析图_国际黄金价格_上交所_美元走势_美女直播_电商直播', // set a title
          meta: [{                 // set meta
            name: 'keywords',
            content: '黄金价格实时走势中心,黄金价格,今日黄金价格,最新黄金价格,黄金价格走势,24小时走势,历史走势,走势分析图,国际黄金价格,上交所,美女直播,电商直播'
          },{
            name:'description',
            content:'中国黄金投资网(中国黄金网)专业提供黄金价格,中国黄金,黄金期货,黄金投资,黄金交易所,金价,黄金公司,黄金网站,黄金开户,纸黄金,黄金外汇实时图形行情资讯及实时行情服务!'
          }],
          // link: [{                 // set link
          //   rel: 'asstes',
          //   href: 'https://assets-cdn.github.com/' 
          // }]
        },
        components: {
        
        },
        data () {
            return {
                // 响应式类别
                showtype:'normal',
                // 底部主导航是否显示，默认为显示
                bottomnavifshow:false,

                lastTime:'',
                currentTime:'',
                timeOut:29*60*1000,
                setIntervaltestTime:'',//检测操作状态的计时器
            };
        },
        computed: {

        },
        methods: {
          // 超时检测
          testTime:function(){
            // console.log('超时检测方法执行');
            let that = this;
            that.currentTime = new Date().getTime(); //更新当前时间
            if(that.currentTime - that.lastTime > that.timeOut){ //判断是否超时
                // console.log("超时");
                this.logout();
            }
          },
          appmousemove:function(){
            this.lastTime = new Date().getTime();
          },
          // 退出登录
          logout() {
            this.$store.commit("resetuserdata");
            this.$router.push({ path: "/regist" });
          },



          showtypeset:function(){
            let w = document.documentElement.offsetWidth || document.body.offsetWidth;
            // console.log(w);
            if(w >= 1190){
                this.showtype = 'normal';
                // console.log('大于等于1190的正常屏幕===参考1190设计稿')
            }else if(990 <= w && w < 1190){
                this.showtype = 'middle';
                // console.log('大于等于990小于1190的中等屏幕===参考990设计稿')
            }else if(w < 990){
                this.showtype = 'small'
                // console.log('小于990的小屏幕 用rem适配移动端===参考移动端设计稿')
            }
          }
        },
        created(){
        },
        mounted() {
            remset(750);
            let that = this;
            this.showtypeset();
            window.onresize = () => {
              that.showtypeset();
              remset(750);
            };
            
            
          // setTimeout(() => {
          //   that.currentTime = new Date().getTime();
          //   that.lastTime = new Date().getTime()+1*60*1000;
          //   window.clearInterval(that.setIntervaltestTime);
          //   that.setIntervaltestTime = window.setInterval(that.testTime, 1000);
          // }, 0);
        },
        watch:{
          $route(to,from){
            // console.log(to,+'-----',from);
            if(to.meta.navstatus==true){
              this.bottomnavifshow = true;
            }else{
              this.bottomnavifshow = false;
            }
          }
        }
        // beforeCreate() {
        // }, //生命周期 - 创建之前
        // beforeMount() {
        // }, //生命周期 - 挂载之前
        // beforeUpdate() {}, //生命周期 - 更新之前
        // updated() {}, //生命周期 - 更新之后
        // beforeDestroy() {}, //生命周期 - 销毁之前
        // destroyed() {}, //生命周期 - 销毁完成
        // activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>


<style lang="less" scoped>
@import url('./assets/css/reset.css');
@import './assets/css/common.less';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:7.5rem;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: 0 0 5px #ccc;
  .bottomnav{
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    height: 0.98rem;
    width: 7.5rem;
    background-color: #fff;
    z-index: 100;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 0 0 1px @bgcolor;
    a{
      position: relative;
      width: 1.1rem;
      &.shop{
        top: -0.27rem;
        width: 1.124rem;
        height: 1.124rem;
        .default,.active{
          padding: 0.1rem;
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-top: 1px solid @bgcolor;
          border-radius: 50%;
          img{
            margin: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
      .default,.active{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        img{
          height: 0.4rem;
          width: auto;
          display: block;
          margin: 0 auto 0.09rem;
        }
        span{
          font-size: 0.2rem;
          font-weight:500;
          color: #1F1F1F;
          line-height: 1em;
          display: block;
          text-align: center;
        }
      }
      .homeicon{
        width:0.8rem;
        height:0.8rem;
        img{
          width:auto;
          height:100%;
          margin:0 auto;
        }
      }
      .homeiconacitve{
        width:0.8rem;
        height:0.67rem;
        img{
          width:auto;
          height:100%;
          margin:0 auto;
        }
      }
      .active{
        display: none;
        span{
          color: #FFBD04;
        }
      }

      // &.router-link-exact-active{
      &.router-link-active{
        .default{
          display: none;
        }
        .active{
          display: block;
        }
      }
    }
  }
}
</style>
