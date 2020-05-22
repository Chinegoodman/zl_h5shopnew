<template>
  <div class="negotiate_list">
      <div class="header">
      <img class="back" @click="goback" src="@/assets/imgs/follow/xiangqing@2x.png" alt />
      <span>协商历史</span>
    </div>
    <div class="negotiate_list__item" v-for="(item,index) in negotiateList" :key="index" >
      <div class="negotiate_list__item__info">
        <img :src="item.face_url?item.face_url:''" alt="">
        <div>
          <div>{{item.nickName}}</div>
          <div class="create_time">{{item.createTime}}</div>
        </div>
      </div>
      <div class="negotiate_last" v-if="index!= 0">
        <div class="nm">买家({{item.nickName}})于{{item.createTime}}创建了退货申请</div>
        <div>退货原因：{{item.reason}}</div>
        <div>退货数量：{{item.productCount}}</div>
        <div>退货金额：{{item.returnAmount}}</div>
        <div>申请时间：{{item.createTime}}</div>
        <div>退货编号:{{item.uid}}</div>
      </div>
      <div class="negotiate_list__item__text">
        <div style="color: rgb(153, 153, 153); font-size: 0.22rem; margin-bottom: 0.2rem;">备注说明:</div>
        <div  style="font-size:.28rem;color:rgba(51,51,51,1);" >{{item.content}}</div>
        <div  style="font-size:.28rem;color:rgba(51,51,51,1);" v-if="index != 0" >{{item.description}}</div>
        <div class="negotiate_list__item__text__pic">
           <img :src="item.url?item.url:''" alt="">
        </div>
      </div>
    </div>
    <div class="msg_btu" @click="leaveJump()">留言</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      negotiateList: [],
      uId: "", //退单id
      details: ""
    };
  },
  computed: {},
  methods: {
        goback() {
      this.$router.go(-1);
    },
    //留言跳转
    leaveJump() {
      // console.log(
      //   this.$store.state.user.userdata,
      //   "this.$store.state.userdata"
      // );
      this.$router.push({
        path: "/returngoods/consult",
        query: {
          uid: this.uId
        }
      });
    }
  },
  mounted() {
    this.uId = this.$route.query.uid;
    this.api.returngoods
      .findReturnConsult({ returnId: this.uId, nextpage:'', pageSize: '20' })
      .then(res => {
        this.negotiateList = res.data.data.list;
        console.log(this.negotiateList);
      });

    // this.details = this.negotiateList.pop();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import "./css/index.less";
.negotiate_list {
  background: rgba(243, 243, 243, 1);
  width: 7.5rem;
  margin:0 auto;
  padding-bottom:0.5rem;
  box-sizing:border-box;
  min-height: 100vh;
      .header {
        width: 100%;
        border-bottom: 1px solid #DEDEDE;
        background: white;
        text-align: center;
        // position: fixed;
        z-index: 100;

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
    }
  &__item {
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    margin-top: 0.2rem;
    background: #fff;
    &__info {
      display: flex;
      img {
        width: 0.68rem;
        height: 0.68rem;
        border-radius: 50%;
        margin-right: 0.2rem;
        background: #f6f6f6;
      }
    }
  }
  .negotiate_list__item__text {
    &__pic {
      max-width: 1.68rem;
      max-height: 1.68rem;
      margin-top: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .negotiate_last {
    padding: 0.2rem 0;
    box-sizing: border-box;
    margin-top: 0.2rem;
    background: #fff;
    font-size: 0.24rem;
    color:rgba(117,117,117,1);
    .nm{
        font-size : .28rem;
        color:rgba(31, 31, 31, 1);
    }
  }
  .negotiate_last > div {
    margin-bottom: 0.2rem;
  }
  .create_time {
    color: rgba(153, 153, 153, 1);
    margin-top: 0.13rem;
  }
  .msg_btu {
    background: rgba(255, 189, 4, 1);
    border-radius: .39rem;
    color: #fff;
    font-size: .32rem;
    width: 3.2rem;
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    margin: 0.5rem auto 0;
    position: fixed;
    bottom: .33rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
