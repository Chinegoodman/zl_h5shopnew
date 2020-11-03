<template>
  <div class="introduction">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>我的介绍</span>
      <div :class="{'save' : true,'saved': btnstates}" @click="changeintroduction">保存</div>  
    </div>
    <div class="w-introduction">
        <textarea v-model="introduction" maxlength="200"></textarea>
        <p v-if="false">85/100个字</p>
    </div>
  </div>
</template>
<script>
import {
  setsessionStorage,
  getsessionStorage
} from "@/utils/index.js";

export default {
    data(){
        return{
            introduction : '',
            btnstates : false
        }
    },
    mounted(){
        var that = this;
        that.introduction = localStorage.getItem("introduction");
    },
    watch : {
        introduction(newName){
            if(newName != '' && newName != undefined){
                this.btnstates = true;
            }else{
                this.btnstates = false;
            }
        }
    },
    methods:{
        //返回我的资料首页
        goback() {
            this.$router.go(-1);
        },
        //修改个人简介
        changeintroduction(){
            let that = this;
            that.api.personalcenter
            .updateinfouser_new({
                userId : that.$store.state.nerUser.userid,
                introduction :  that.introduction
            }).then(res => {
                if(res.data.code === 1){
                    that.$router.go(-1);
                }else{
                    that.$toast(res.data.info);
                }
            })
            
        }
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    beforeDestroy() {
        document.querySelector('body').setAttribute('style', '')
    },
}
</script>
<style lang="less" scope>
.introduction{
    .header {
        width: 7.5rem;
        background: white;
        text-align: center;
        position: fixed;
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
        .save{
            display: inline-block;
            font-size: .26rem;
            color:rgba(31,31,31,1);
            font-family:PingFang SC;
            font-weight:500;
            position: absolute;
            top: 50%;
            right : .2rem;
            transform: translateY(-50%);
            cursor: pointer;
        }
        .saved{
            color:rgba(255,189,4,1);
        }
    }
    .w-introduction{
        background-color: #f6f6f6;
        padding: 1.2rem 0 0;
        textarea{
            display: block;
            width: 7.1rem;
            height: 2rem;
            padding:.2rem;
            background: #fff;
            border: none;
            margin-top: .2rem;
        }
        p{
            margin: .2rem 0 0 .2rem;
        }
    }
}    
</style>


