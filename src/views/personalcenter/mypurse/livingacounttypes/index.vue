<template>
  <div class="purseliving-acount-type">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>账单类型</span>
    </div>
    <div class="acount-type-list">
      <div class="typetitle">请选择账单类型</div>
      <ul v-if="billTypelist.length > 0">
        <li v-for="(item,index) in billTypelist" :key="index" :id="item.id" @click="gotocountlist(item)">
          <span class="im">
            <img :src="item.icon" alt="问号">
          </span>
          <div class="com">
            <span class="tit">{{item.name}}</span>
            <div class="look-gd">
              <span class="look">立即查看</span>
              <span class="gd"><img src="../../../../assets/imgs/personal/livingpurse-gd.png" alt="问号"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    components :{
    },
    data(){
        return{
          billTypelist : []
        }
    },
    mounted(){
      var that = this;
      that.getWalletBillType();
    },
    methods:{
      // 进入商城首页
        gotocountlist(item) {
          this.$router.push({
            path: "/personalcenter/mypurse/livingacountlist",
            query : {
              id : item.id,
              name : item.name
          } });
        },
        goback() {
          this.$router.push({ path: "/personalcenter/mypurse/livingpurse" });
        },
        //获取充值列表
        getWalletBillType(){
          var that = this;
          that.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 200000
          }); 
          that.api.personalcenter.walletBillType({}).then(res => {
              that.$toast.clear();
              if(!res.data.code)return;
              if(res.data.code == 1){
                that.billTypelist = res.data.data.userWalletBillTypes;
              }
          });
        }
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:rgba(247,247,247,1)');
    }
}
</script>
<style lang="less">
  .purseliving-acount-type {
    height:100vh;
    background:rgba(247,247,247,1);
    .header {
          width: 7.5rem;
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
              cursor: pointer;
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
    .acount-type-list{
      padding-top: 1.1rem;
      .typetitle{
        font-size: .32rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(31,31,31,1);
        padding: .4rem 0 0 .3rem;
      }
      ul{
        padding: .4rem .3rem;
        display: flex;
        flex-wrap: wrap;
        li{
          width: 3.3rem;
          height: 1.58rem;
          background:rgba(255,255,255,1);
          border-radius: .12rem;
          display: flex;
          margin-bottom: .3rem;
          cursor: pointer;
          .im{
            display: inline-block;
            width: .68rem;
            height: .68rem;
            padding: .45rem 0 0 0.3rem;
            img{
              width: 100%;
            }
          }
          .com{
            width: 2.02rem;
            padding: .35rem 0 0 .3rem;
            display: flex;
            flex-direction: column;
            .tit{
              font-size: .34rem;
              font-family:PingFang SC;
              font-weight:bold;
              color:rgba(31,31,31,1);
            }
            .look-gd{
              margin-top: .1rem;
              display: flex;
              .look{
                font-size: .24rem;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(191,191,191,1);
              }
              .gd{
                display: inline-block;
                width: .12rem;
                height: .22rem;
                margin: 0.06rem 0 0 .05rem;
                img{
                  width: 100%;
                }
              }
            }
          }
        }
        li:nth-child(2n){
          margin-left: .3rem;
        }
      }

    }  
  }  
</style>





