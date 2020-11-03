<template>
  <div class="nickname">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>编辑昵称</span>
      <div class="save" @click="changefaceurl">保存</div>  
    </div>
    <div class="w-nickname">
        <input type="text" v-model="nickname" />
        <p>限制10个字</p>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            nickname : ''
        }
    },
    mounted(){
        var that = this;
        that.nickname = that.$route.query.nickname;
    },
    methods:{
        goback() {
            this.$router.go(-1);
        },
        // 地址管理页
        gotoaddresspage() {
            this.$router.push({ name: "personalcenteraddress" });
        },
        //修改昵称
        changefaceurl(){
            let that = this;
            that.api.personalcenter
            .updateinfouser_new({
                userId : that.$store.state.nerUser.userid,
                nickName :  that.nickname
            }).then(res => {
                if(res.data.code === 1){
                    that.$router.go(-1);
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
.nickname{
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
    }
    .w-nickname{
        background-color: #f6f6f6;
        padding: 1.2rem 0 0;
        input{
            display: block;
            width: 7.1rem;
            height: 1rem;
            padding: 0 .2rem;
            background: #fff;
            border-width: 1px 0;
            border-style: solid;
            border-color: rgba(215,215,215,1);
            margin-top: .2rem;
        }
        p{
            margin: .2rem 0 0 .2rem;
        }
    }
}    
</style>


