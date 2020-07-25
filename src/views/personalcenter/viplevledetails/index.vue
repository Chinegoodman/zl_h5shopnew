<template>
  <div class="viplevelwrap">
    <div class="header">
        <img class="back" @click="goback" src="./../../../assets/imgs/follow/xiangqing@2x.png" alt />
        <span>会员等级</span>
    </div>
    <div class="viplevlebox">
        <div>设计中...</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {DatetimePicker} from 'vant'
import { Picker } from 'vant';
import 'vant/lib/index.css';
import {
  setsessionStorage,
  getsessionStorage
} from "@/utils/index.js";

Vue.use(DatetimePicker);
Vue.use(Picker);
export default {
    data(){
       return {}
    },
    mounted(){
        var that = this;
    },
    methods:{
        //返回个人中心首页
        goback() {
            this.$router.go(-1);
        }
    }    
}
</script>

<style lang="less" scope>
.viplevelwrap{
    .header {
        width: 7.5rem;
        border-bottom: 1px solid #DEDEDE;
        background: white;
        text-align: center;

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
            transform: translateX(-50%);
            font-size: 0.34rem;
            color: #333333;
        }
    }
    .viplevlebox{
        padding: 1rem;
        color:rgba(31, 31, 31, 1);
        text-align: center;
        font-size : .58rem;
        font-family:PingFang SC;
        font-weight:500;
    }
}    
</style>


